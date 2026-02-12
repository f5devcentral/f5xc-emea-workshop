#!/usr/bin/env python3
"""Cleanup resources created by class6_auto_config.py."""

from __future__ import annotations

import os
import sys
from typing import Any, Dict, Iterable, List, Optional

try:
    import requests
except ImportError:  # pragma: no cover - dependency guard
    print("Missing dependency: requests. Install it with 'pip install requests'.", file=sys.stderr)
    sys.exit(1)

BASE_URL = "https://us2.calypsoai.app"
STORE_BASE_URL = "http://10.1.1.5:32100"
DEPLOYMENT_API_URL = "http://localhost:8080/proxy-api/deployment"
DEBUG = os.getenv("CALYPSO_DEBUG", "").lower() in {"1", "true", "yes", "on"}

TARGET_PROJECT_NAMES = {"Test project", "request", "response", "MCP"}
TARGET_SCANNER_NAMES = {
    "Internal Projects",
    "Sensitive Topic",
    "Internal IPs",
    "Specific Salaries",
    "NeuroWeave components",
}
TOKEN_NAMES_BY_PROJECT = {
    "Test project": {"Test project token"},
    "request": {"response"},
    "response": {"response"},
    "MCP": {"MCP"},
}
PROMPT_PACKAGE_NAME = "Prompt injection package"


def _debug(msg: str) -> None:
    if DEBUG:
        print(f"[debug] {msg}", file=sys.stderr)


def _require_api_key() -> str:
    _debug(f"Request GET {DEPLOYMENT_API_URL}")
    try:
        resp = requests.get(DEPLOYMENT_API_URL, timeout=30)
    except requests.RequestException as exc:
        print(f"Request failed GET {DEPLOYMENT_API_URL}: {exc}", file=sys.stderr)
        sys.exit(1)

    if not resp.ok:
        if DEBUG:
            _debug(f"Response status={resp.status_code} headers={dict(resp.headers)}")
            _debug(f"Response body={resp.text}")
        print(f"Request failed GET {DEPLOYMENT_API_URL} ({resp.status_code}).", file=sys.stderr)
        sys.exit(1)

    try:
        data = resp.json()
    except ValueError:
        if DEBUG:
            _debug(f"Non-JSON response body={resp.text}")
        print(f"Non-JSON response from GET {DEPLOYMENT_API_URL}.", file=sys.stderr)
        sys.exit(1)

    api_key = data.get("apiKey")
    if not isinstance(api_key, str) or not api_key:
        if DEBUG:
            _debug(f"Deployment payload keys={list(data.keys())}")
        print(f"Missing 'apiKey' in response from {DEPLOYMENT_API_URL}.", file=sys.stderr)
        sys.exit(1)

    return api_key


def _request(
    api_key: str,
    method: str,
    path: str,
    *,
    params: Optional[Dict[str, Any]] = None,
    json_body: Optional[Dict[str, Any]] = None,
) -> Any:
    url = f"{BASE_URL}{path}"
    headers = {"Authorization": f"Bearer {api_key}"}
    _debug(f"Request {method} {url} params={params} json={json_body}")
    resp = requests.request(
        method,
        url,
        headers=headers,
        params=params,
        json=json_body,
        timeout=30,
    )
    if not resp.ok:
        if DEBUG:
            _debug(f"Response status={resp.status_code} headers={dict(resp.headers)}")
            _debug(f"Response body={resp.text}")
        print(f"Request failed {method} {path} ({resp.status_code}).", file=sys.stderr)
        sys.exit(1)
    if resp.status_code == 204 or not resp.text:
        return None
    try:
        data = resp.json()
    except ValueError:
        if DEBUG:
            _debug(f"Non-JSON response body={resp.text}")
        print(f"Non-JSON response from {method} {path}.", file=sys.stderr)
        sys.exit(1)
    _debug(f"Response {method} {path} -> keys={list(data.keys())}")
    return data


def _get_all(
    api_key: str,
    path: str,
    list_key: str,
    params: Optional[Dict[str, Any]] = None,
) -> List[Dict[str, Any]]:
    items: List[Dict[str, Any]] = []
    cursor: Optional[str] = None
    while True:
        payload = dict(params or {})
        if cursor:
            payload["cursor"] = cursor
        data = _request(api_key, "GET", path, params=payload)
        items.extend(data.get(list_key, []))
        cursor = data.get("next")
        if not cursor:
            break
    return items


def _normalize_config(config: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    normalized = dict(config or {})
    normalized.setdefault("packages", [])
    normalized.setdefault("scanners", [])
    normalized.setdefault("providers", normalized.get("providers", []))
    return normalized


def _remove_config_item(items: List[Dict[str, Any]], item_id: str) -> List[Dict[str, Any]]:
    return [item for item in items if item.get("id") != item_id]


def _remove_scanners_from_config(config: Dict[str, Any], scanner_ids: Iterable[str]) -> None:
    remove_ids = set(scanner_ids)
    if not remove_ids:
        return
    config["scanners"] = [
        item for item in config.get("scanners", []) if item.get("id") not in remove_ids
    ]


def _disable_scanners_in_config(config: Dict[str, Any], scanner_ids: Iterable[str]) -> None:
    for scanner_id in scanner_ids:
        for item in config.get("scanners", []):
            if item.get("id") == scanner_id:
                item["enabled"] = False
                break
        else:
            config.setdefault("scanners", []).append({"id": scanner_id, "enabled": False})


def _patch_project_config(api_key: str, project_id: str, config: Dict[str, Any]) -> None:
    _request(
        api_key,
        "PATCH",
        f"/backend/v1/projects/{project_id}",
        json_body={"config": config},
    )


def _remove_package_from_project(
    api_key: str, project_id: str, package_id: str, config: Dict[str, Any]
) -> None:
    if any(item.get("id") == package_id for item in config.get("packages", [])):
        _request(
            api_key,
            "DELETE",
            f"/backend/v1/projects/{project_id}/scanner-packages/{package_id}",
        )
    config["packages"] = _remove_config_item(config.get("packages", []), package_id)


def _get_global_project(api_key: str) -> Dict[str, Any]:
    resp = _request(api_key, "GET", "/backend/v1/project")
    return resp["project"]


def _find_vendor_package(api_key: str, name: str) -> Optional[Dict[str, Any]]:
    packages = _get_all(
        api_key,
        "/backend/v1/scanner-packages",
        "packages",
        params={"limit": 100, "source": "vendor"},
    )
    for package in packages:
        if package.get("name", "").lower() == name.lower():
            return package
    return None


def _get_package_scanners(api_key: str, package_id: str) -> List[Dict[str, Any]]:
    return _get_all(
        api_key,
        "/backend/v1/scanners",
        "scanners",
        params={"packageId": [package_id], "limit": 100, "source": "vendor"},
    )


def _find_projects_by_name(api_key: str, name: str) -> List[Dict[str, Any]]:
    projects = _get_all(
        api_key,
        "/backend/v1/projects",
        "projects",
        params={"search": name, "limit": 100},
    )
    name_lower = name.lower()
    return [proj for proj in projects if proj.get("name", "").lower() == name_lower]


def _find_scanners_by_name(api_key: str, name: str) -> List[Dict[str, Any]]:
    scanners = _get_all(
        api_key,
        "/backend/v1/scanners",
        "scanners",
        params={"search": name, "limit": 100, "source": "internal"},
    )
    name_lower = name.lower()
    return [scanner for scanner in scanners if scanner.get("name", "").lower() == name_lower]


def _list_providers(api_key: str) -> List[Dict[str, Any]]:
    return _get_all(api_key, "/backend/v1/providers", "providers", params={"limit": 100})


def _projects_using_provider(api_key: str, provider_id: str) -> List[Dict[str, Any]]:
    return _get_all(
        api_key,
        "/backend/v1/projects",
        "projects",
        params={"providerId": provider_id, "limit": 100},
    )


def _delete_token(api_key: str, token_id: str) -> None:
    _request(api_key, "DELETE", f"/backend/v1/tokens/{token_id}")


def _delete_project(api_key: str, project_id: str) -> None:
    _request(api_key, "DELETE", f"/backend/v1/projects/{project_id}")


def _delete_scanner(api_key: str, scanner_id: str) -> None:
    _request(api_key, "DELETE", f"/backend/v1/scanners/{scanner_id}")


def _delete_provider(api_key: str, provider_id: str) -> None:
    _request(api_key, "DELETE", f"/backend/v1/providers/{provider_id}")


def _put_guardrails_store_cleanup() -> None:
    payload = {
        "version": 1,
        "hosts": ["__default__", "chat-app.lab"],
        "hostConfigs": {
            "__default__": {
                "inspectMode": "both",
                "redactMode": "both",
                "logLevel": "info",
                "requestForwardMode": "sequential",
                "backendOrigin": "https://api.openai.com",
                "requestExtractor": "",
                "responseExtractor": "",
                "requestExtractors": [],
                "responseExtractors": [],
                "extractorParallel": False,
                "responseStreamEnabled": True,
                "responseStreamChunkSize": 2048,
                "responseStreamChunkOverlap": 128,
                "responseStreamFinalEnabled": True,
                "responseStreamCollectFullEnabled": False,
                "responseStreamBufferingMode": "buffer",
                "responseStreamChunkGatingEnabled": False,
            },
            "chat-app.lab": {
                "inspectMode": "both",
                "backendOrigin": "http://10.1.10.100:22434",
                "requestExtractor": "",
                "responseExtractor": "",
                "requestExtractors": [],
                "responseExtractors": [],
                "logLevel": "debug",
                "responseStreamEnabled": False,
                "responseStreamBufferingMode": "buffer",
            },
        },
        "apiKeys": [],
        "patterns": [],
        "collector": {"entries": [], "total": 0, "remaining": 0},
    }

    url = f"{STORE_BASE_URL}/config/api/store"
    _debug(f"Request PUT {url}")
    resp = requests.put(url, json=payload, timeout=30)
    if not resp.ok:
        if DEBUG:
            _debug(f"Request PUT {url} json={payload}")
            _debug(f"Response status={resp.status_code} headers={dict(resp.headers)}")
            _debug(f"Response body={resp.text}")
        print(f"Request failed PUT {url} ({resp.status_code}).", file=sys.stderr)
        sys.exit(1)


def main() -> None:
    api_key = _require_api_key()

    prompt_package = _find_vendor_package(api_key, PROMPT_PACKAGE_NAME)
    if prompt_package:
        prompt_scanners = _get_package_scanners(api_key, prompt_package["id"])
        global_project = _get_global_project(api_key)
        global_config = _normalize_config(global_project.get("config"))
        _disable_scanners_in_config(
            global_config, [scanner["id"] for scanner in prompt_scanners]
        )
        _remove_package_from_project(
            api_key, global_project["id"], prompt_package["id"], global_config
        )
        _patch_project_config(api_key, global_project["id"], global_config)
    else:
        print(
            f"Prompt injection package '{PROMPT_PACKAGE_NAME}' not found; skipping.",
            file=sys.stderr,
        )

    for scanner_name in sorted(TARGET_SCANNER_NAMES):
        for scanner in _find_scanners_by_name(api_key, scanner_name):
            if scanner.get("vendored"):
                continue
            _delete_scanner(api_key, scanner["id"])

    projects_by_name: Dict[str, List[Dict[str, Any]]] = {}
    for project_name in sorted(TARGET_PROJECT_NAMES):
        projects_by_name[project_name] = _find_projects_by_name(api_key, project_name)

    for project_name, projects in projects_by_name.items():
        token_names = TOKEN_NAMES_BY_PROJECT.get(project_name, set())
        for project in projects:
            tokens = _get_all(
                api_key,
                "/backend/v1/tokens",
                "tokens",
                params={"machine": True, "projectId": project["id"], "limit": 100},
            )
            for token in tokens:
                if token.get("name") in token_names:
                    _delete_token(api_key, token["id"])

    for projects in projects_by_name.values():
        for project in projects:
            _delete_project(api_key, project["id"])

    _put_guardrails_store_cleanup()

    print("Cleanup completed.")


if __name__ == "__main__":
    main()
