#!/usr/bin/env python3
"""Configure CalypsoAI projects, scanners, and tokens for class 6."""

from __future__ import annotations

import datetime
import os
import sys
from typing import Any, Dict, Iterable, List, Optional

try:
    import requests
except ImportError:  # pragma: no cover - dependency guard
    print("Missing dependency: requests. Install it with 'pip install requests'.", file=sys.stderr)
    sys.exit(1)

BASE_URL = "http://10.1.1.8"
STORE_BASE_URL = "http://10.1.1.5:32100"
DEFAULT_API_KEY = "MDE5Yjc5MTItZDY0Mi03MDZjLThiNjQtNDI5ODkzODRkZWEz/ebw3mSJmxVffMt8KqbJrH0hPIwse40vXtCfyhdQMfYHC9NucqFKMw5YhJRR30TjS59nqyRUTQO9TGiHXkjiQ"
DEBUG = os.getenv("CALYPSO_DEBUG", "").lower() in {"1", "true", "yes", "on"}


def _debug(msg: str) -> None:
    if DEBUG:
        print(f"[debug] {msg}", file=sys.stderr)


def _require_api_key() -> str:
    api_key = os.getenv("CALYPSO_API_KEY") or DEFAULT_API_KEY
    if not api_key:
        print(
            "CALYPSO_API_KEY is not set and DEFAULT_API_KEY is empty.",
            file=sys.stderr,
        )
        sys.exit(1)
    return api_key


def _request(
    api_key: str,
    method: str,
    path: str,
    *,
    params: Optional[Dict[str, Any]] = None,
    json_body: Optional[Dict[str, Any]] = None,
    allow_not_found: bool = False,
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
    if allow_not_found and resp.status_code == 404:
        if DEBUG:
            _debug(f"Request {method} {path} returned 404; continuing.")
        return None
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
        if list_key not in data and DEBUG:
            _debug(f"Missing key '{list_key}' in response: {data}")
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


def _upsert_config_item(items: List[Dict[str, Any]], item_id: str, **fields: Any) -> None:
    for item in items:
        if item.get("id") == item_id:
            item.update({k: v for k, v in fields.items() if v is not None})
            return
    payload = {"id": item_id}
    payload.update({k: v for k, v in fields.items() if v is not None})
    items.append(payload)


def _remove_config_item(items: List[Dict[str, Any]], item_id: str) -> List[Dict[str, Any]]:
    return [item for item in items if item.get("id") != item_id]


def _remove_scanners_from_config(config: Dict[str, Any], scanner_ids: Iterable[str]) -> None:
    remove_ids = set(scanner_ids)
    if not remove_ids:
        return
    config["scanners"] = [
        item for item in config.get("scanners", []) if item.get("id") not in remove_ids
    ]


def _find_package(api_key: str, name: str) -> Dict[str, Any]:
    params = {"limit": 100, "source": "vendor"}
    packages = _get_all(
        api_key,
        "/backend/v1/scanner-packages",
        "packages",
        params=params,
    )
    if DEBUG:
        _debug(
            f"Scanner packages (source=vendor) returned: {[p.get('name') for p in packages]}"
        )
    name_lower = name.lower()
    for package in packages:
        if package.get("name", "").lower() == name_lower:
            return package
    if packages:
        names = ", ".join(p.get("name", "") for p in packages)
        print(
            f"Package '{name}' not found in vendor packages. Seen: {names}",
            file=sys.stderr,
        )
    else:
        print("No vendor scanner packages returned from API.", file=sys.stderr)
    sys.exit(1)


def _get_package_scanners(api_key: str, package_id: str) -> List[Dict[str, Any]]:
    scanners = _get_all(
        api_key,
        "/backend/v1/scanners",
        "scanners",
        params={"packageId": [package_id], "limit": 100, "source": "vendor"},
    )
    if not scanners and DEBUG:
        _debug(f"No scanners returned for package {package_id}.")
    return scanners


def _create_project(api_key: str, name: str, project_type: str) -> str:
    payload = {"name": name, "type": project_type}
    resp = _request(api_key, "POST", "/backend/v1/projects", json_body=payload)
    return resp["id"]


def _find_provider_by_name(api_key: str, name: str) -> Optional[Dict[str, Any]]:
    providers = _get_all(
        api_key,
        "/backend/v1/providers",
        "providers",
        params={"search": name, "limit": 100},
    )
    for provider in providers:
        if provider.get("name") == name:
            return provider
    return None


def _create_provider_from_system(
    api_key: str, name: str, system_provider: str, project_id: Optional[str] = None
) -> str:
    payload: Dict[str, Any] = {"name": name, "systemProvider": system_provider}
    if project_id:
        payload["projectId"] = project_id
    resp = _request(api_key, "POST", "/backend/v1/providers", json_body=payload)
    return resp["id"]


def _add_provider_to_project(
    api_key: str, project_id: str, provider_id: str, config: Dict[str, Any]
) -> None:
    if not any(item.get("id") == provider_id for item in config.get("providers", [])):
        _request(
            api_key,
            "POST",
            f"/backend/v1/projects/{project_id}/providers/{provider_id}",
        )
    _upsert_config_item(config.setdefault("providers", []), provider_id, enabled=True)


def _create_token(api_key: str, name: str, project_id: str) -> str:
    expires_at = (
        datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=365)
    ).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    payload = {
        "name": name,
        "expiresAt": expires_at,
        "machine": True,
        "projectId": project_id,
    }
    resp = _request(api_key, "POST", "/backend/v1/tokens", json_body=payload)
    return resp["token"]["value"]


def _create_scanner(api_key: str, name: str, config: Dict[str, Any], published: bool = False) -> str:
    payload = {"name": name, "config": config, "published": published}
    resp = _request(api_key, "POST", "/backend/v1/scanners", json_body=payload)
    return resp["id"]


def _publish_scanner(api_key: str, scanner_id: str) -> None:
    _request(
        api_key,
        "PATCH",
        f"/backend/v1/scanners/{scanner_id}",
        json_body={"published": True},
    )


def _get_project(api_key: str, project_id: str) -> Dict[str, Any]:
    resp = _request(api_key, "GET", f"/backend/v1/projects/{project_id}")
    return resp["project"]


def _get_global_project(api_key: str) -> Dict[str, Any]:
    resp = _request(api_key, "GET", "/backend/v1/project")
    return resp["project"]


def _patch_project_config(api_key: str, project_id: str, config: Dict[str, Any]) -> None:
    _request(
        api_key,
        "PATCH",
        f"/backend/v1/projects/{project_id}",
        json_body={"config": config},
    )


def _add_package_to_project(
    api_key: str, project_id: str, package_id: str, config: Dict[str, Any]
) -> None:
    if not any(item.get("id") == package_id for item in config.get("packages", [])):
        _request(
            api_key,
            "POST",
            f"/backend/v1/projects/{project_id}/scanner-packages/{package_id}",
        )
        config.setdefault("packages", []).append({"id": package_id, "enabled": True})
    else:
        _upsert_config_item(config["packages"], package_id, enabled=True)


def _remove_package_from_project(
    api_key: str,
    project_id: str,
    package_id: str,
    config: Dict[str, Any],
    *,
    force: bool = False,
) -> None:
    if force or any(item.get("id") == package_id for item in config.get("packages", [])):
        _request(
            api_key,
            "DELETE",
            f"/backend/v1/projects/{project_id}/scanner-packages/{package_id}",
            allow_not_found=force,
        )
    config["packages"] = _remove_config_item(config.get("packages", []), package_id)


def _add_scanner_to_project(
    api_key: str, project_id: str, scanner_id: str, config: Dict[str, Any], enabled: bool
) -> None:
    if not any(item.get("id") == scanner_id for item in config.get("scanners", [])):
        _request(
            api_key,
            "POST",
            f"/backend/v1/projects/{project_id}/scanners/{scanner_id}",
        )
    _upsert_config_item(config.setdefault("scanners", []), scanner_id, enabled=enabled)


def _put_guardrails_store(tokens: Dict[str, str]) -> None:
    def require_token(name: str) -> str:
        value = tokens.get(name)
        if not value:
            print(f"Missing API token for {name}.", file=sys.stderr)
            sys.exit(1)
        return value

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
                "requestExtractor": "pat_1767273197405_3mp1",
                "responseExtractor": "pat_1767273224093_2bui",
                "requestExtractors": ["pat_1767273197405_3mp1"],
                "responseExtractors": ["pat_1767273224093_2bui", "pat_1767273340580_57a3"],
                "logLevel": "debug",
                "responseStreamEnabled": False,
                "responseStreamBufferingMode": "buffer",
            },
        },
        "apiKeys": [
            {
                "id": "ak_1767273052283_77di",
                "name": "Request",
                "key": require_token("request"),
                "blockingResponse": {
                    "status": 200,
                    "contentType": "application/json; charset=utf-8",
                    "body": "{\"message\":{\"role\":\"assistant\",\"content\":\"F5 AI Guardrails blocked this request\"}}",
                },
                "created_at": "2026-01-01T13:10:52.283Z",
                "updated_at": "2026-01-01T13:10:52.283Z",
            },
            {
                "id": "ak_1767273073311_gxvr",
                "name": "Response",
                "key": require_token("response"),
                "blockingResponse": {
                    "status": 200,
                    "contentType": "application/json; charset=utf-8",
                    "body": "{\"message\":{\"role\":\"assistant\",\"content\":\"F5 AI Guardrails blocked this response\"}}",
                },
                "created_at": "2026-01-01T13:11:13.311Z",
                "updated_at": "2026-01-01T13:11:13.311Z",
            },
            {
                "id": "ak_1767273136186_55nq",
                "name": "MCP",
                "key": require_token("MCP"),
                "blockingResponse": {
                    "status": 200,
                    "contentType": "application/json; charset=utf-8",
                    "body": "{\"message\":{\"role\":\"assistant\",\"content\":\"F5 AI Guardrails blocked this due to bad MCP data\"}}",
                },
                "created_at": "2026-01-01T13:12:16.186Z",
                "updated_at": "2026-01-01T13:12:16.186Z",
            },
        ],
        "patterns": [
            {
                "id": "pat_1767273197405_3mp1",
                "name": "Prompt",
                "context": "request",
                "apiKeyName": "Request",
                "paths": [".messages[-1].content"],
                "matchers": [
                    {
                        "path": ".messages[-1].role",
                        "equals": "",
                        "contains": "user",
                        "exists": False,
                    }
                ],
                "notes": "",
                "created_at": "2026-01-01T13:13:17.405Z",
                "updated_at": "2026-01-01T13:13:17.405Z",
            },
            {
                "id": "pat_1767273224093_2bui",
                "name": "Response",
                "context": "response",
                "apiKeyName": "Response",
                "paths": [".message.content"],
                "matchers": [
                    {"path": "message", "equals": "", "contains": "", "exists": True}
                ],
                "notes": "",
                "created_at": "2026-01-01T13:13:44.093Z",
                "updated_at": "2026-01-01T13:13:44.093Z",
            },
            {
                "id": "pat_1767273257896_11z6",
                "name": "MCP tools definition",
                "context": "request",
                "apiKeyName": "MCP",
                "paths": [".tools"],
                "matchers": [
                    {"path": ".tools", "equals": "", "contains": "", "exists": True}
                ],
                "notes": "",
                "created_at": "2026-01-01T13:14:17.896Z",
                "updated_at": "2026-01-01T13:15:03.076Z",
            },
            {
                "id": "pat_1767273340580_57a3",
                "name": "Tools call",
                "context": "response",
                "apiKeyName": "MCP",
                "paths": [".message.tool_calls"],
                "matchers": [
                    {
                        "path": ".message.tool_calls",
                        "equals": "",
                        "contains": "",
                        "exists": True,
                    }
                ],
                "notes": "",
                "created_at": "2026-01-01T13:15:40.580Z",
                "updated_at": "2026-01-01T13:15:40.580Z",
            },
        ],
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
    tokens: Dict[str, str] = {}

    # 1. Enable prompt injection scanners for the global (main) config.
    prompt_package = _find_package(api_key, "Prompt injection package")
    prompt_scanners = _get_package_scanners(api_key, prompt_package["id"])
    for scanner in prompt_scanners:
        _publish_scanner(api_key, scanner["id"])
    global_project = _get_global_project(api_key)
    global_config = _normalize_config(global_project.get("config"))
    _add_package_to_project(api_key, global_project["id"], prompt_package["id"], global_config)
    for scanner in prompt_scanners:
        _upsert_config_item(global_config["scanners"], scanner["id"], enabled=True)
    _patch_project_config(api_key, global_project["id"], global_config)

    # 2. Create Test project and token.
    test_project_id = _create_project(api_key, "Test project", "app")
    tokens["Test project"] = _create_token(api_key, "Test project token", test_project_id)
    test_project = _get_project(api_key, test_project_id)
    test_config = _normalize_config(test_project.get("config"))
    provider_name = "llama3-2"
    provider = _find_provider_by_name(api_key, provider_name)
    if provider:
        provider_id = provider["id"]
    else:
        provider_id = _create_provider_from_system(
            api_key, provider_name, provider_name, project_id=test_project_id
        )
    _add_provider_to_project(api_key, test_project_id, provider_id, test_config)
    _patch_project_config(api_key, test_project_id, test_config)

    # 3. Keyword scanner.
    _create_scanner(
        api_key,
        "Internal Projects",
        {"type": "keyword", "words": ["Phoenix", "Scooby Doo"]},
    )

    # 4. Regex scanner.
    regex_pattern = (
        r"(?i)\bhttps?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|"
        r"10\.(?:\d\d?\d?\.)\d\d?\d?|"
        r"172\.(?:1[6-9]|2\d|3[0-1])\.(?:\d\d?\d?\.)\d\d?\d?|"
        r"192\.168\.(?:\d\d?\d?\.)\d\d?\d?)(?::\d+)?(?:\/[^\s]*)?"
    )
    _create_scanner(api_key, "Internal IPs", {"type": "regex", "pattern": regex_pattern})

    # 5. GenAI scanner.
    _create_scanner(
        api_key,
        "Specific Salaries",
        {"type": "genai", "input": "individual salary information"},
    )

    # 6. Agentic project 'request' with token named 'request'.
    request_project_id = _create_project(api_key, "request", "agentic")
    tokens["request"] = _create_token(api_key, "request", request_project_id)

    # 7. GenAI scanner 'NeuroWeave components' (published).
    neuroweave_scanner_id = _create_scanner(
        api_key,
        "NeuroWeave components",
        {"type": "genai", "input": "items or components of an electronic product"},
        published=True,
    )

    # 8. Agentic project 'response' with token named 'response'.
    response_project_id = _create_project(api_key, "response", "agentic")
    tokens["response"] = _create_token(api_key, "response", response_project_id)
    response_project = _get_project(api_key, response_project_id)
    response_config = _normalize_config(response_project.get("config"))
    _remove_package_from_project(
        api_key, response_project_id, prompt_package["id"], response_config, force=True
    )
    _remove_scanners_from_config(
        response_config, [scanner["id"] for scanner in prompt_scanners]
    )
    _add_scanner_to_project(
        api_key, response_project_id, neuroweave_scanner_id, response_config, enabled=True
    )
    _patch_project_config(api_key, response_project_id, response_config)

    # 9. Agentic project 'MCP' with token named 'MCP' (email-only PII scanner).
    mcp_project_id = _create_project(api_key, "MCP", "agentic")
    tokens["MCP"] = _create_token(api_key, "MCP", mcp_project_id)
    pii_package = _find_package(api_key, "PII package")
    pii_scanners = _get_package_scanners(api_key, pii_package["id"])
    for scanner in pii_scanners:
        _publish_scanner(api_key, scanner["id"])
    mcp_project = _get_project(api_key, mcp_project_id)
    mcp_config = _normalize_config(mcp_project.get("config"))
    _remove_package_from_project(api_key, mcp_project_id, pii_package["id"], mcp_config)

    email_scanner = next(
        (scanner for scanner in pii_scanners if "email" in scanner.get("name", "").lower()),
        None,
    )
    if not email_scanner:
        if DEBUG:
            _debug(f"PII scanners returned: {[s.get('name') for s in pii_scanners]}")
        print("No email scanner found in PII package.", file=sys.stderr)
        sys.exit(1)
    _remove_scanners_from_config(mcp_config, [scanner["id"] for scanner in pii_scanners])
    _add_scanner_to_project(
        api_key, mcp_project_id, email_scanner["id"], mcp_config, enabled=True
    )
    _patch_project_config(api_key, mcp_project_id, mcp_config)

    # 10. Store Guardrails API config using the created tokens.
    _put_guardrails_store(tokens)

    # 11. Output all created tokens.
    print("Created API tokens:")
    for label, value in tokens.items():
        print(f"- {label}: {value}")


if __name__ == "__main__":
    main()
