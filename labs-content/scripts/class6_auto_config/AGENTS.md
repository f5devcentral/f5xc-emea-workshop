# AGENTS.md

## Approach
- Uses the CalypsoAI API to create projects, scanners, providers, and tokens for class 6.
- Hardcodes the base URL to the provided UDF host.
- Reads the API key from `CALYPSO_API_KEY` (not hardcoded) to avoid leaking secrets.
- Adds a debug mode via `CALYPSO_DEBUG=1` to log request/response details on failures.
- Publishes vendor scanners before enabling them in project configs where required by API validation.
- Fails fast if required vendor packages (Prompt injection/PII) are missing or empty.

## Implementation Notes

- Base URL: `http://10.1.1.8`
- Debug mode: `CALYPSO_DEBUG=1` prints HTTP request/response details to stderr.
- `class6_auto_config.py`:
  - Enables the vendor `Prompt injection package` on the global project and enables all scanners from that package (publishes them first).
  - Creates projects: `Test project` (type `app`), `request` (agentic), `response` (agentic), and `MCP` (agentic).
  - Creates machine tokens for each project (expires in 365 days) and prints them at the end.
  - Ensures provider `llama3-2` exists (creates from system if missing) and attaches it to `Test project`.
  - Creates custom scanners: `Internal Projects` (keyword), `Internal IPs` (regex), `Specific Salaries` (genai), and `NeuroWeave components` (genai, published).
  - Attaches only `NeuroWeave components` to the `response` project and removes prompt-injection scanners/packages from that project.
  - For `MCP`, removes the PII package, then enables only the email scanner from the vendor `PII package` (publishes vendor scanners first).
- `class6_auto_config_cleanup.py`:
  - Disables/removes prompt-injection scanners/packages from the global project when present.
  - Deletes non-vendored scanners by name (`Internal Projects`, `Sensitive Topic`, `Internal IPs`, `Specific Salaries`, `NeuroWeave components`).
  - Deletes projects and machine tokens by name, then removes provider `llama3-2` if unused by other projects.

## Troubleshooting
- If `python` is not found, use `python3`.
- If enabling scanners fails with “Scanners must be published,” ensure vendor scanners are published (script does this automatically).
- If the script exits with "Package not found" or "No vendor scanner packages returned", confirm the vendor packages exist on the UDF host.
- If `requests` is missing, install it with `pip install requests`.
