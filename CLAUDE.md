# CLAUDE.md

Laravel 7 (PHP 7.4-fpm) blog ("Diaro"), served as two containers: `victorotavio-php` (php-fpm) and `victorotavio-nginx`. Built and pushed by `.gitea/workflows/deploy.yml` to `registry.codelab.tec.br/vctrtvfrrr/blog` and `.../blog-nginx`, then deployed onto the CodeLab VPS as the `victorotavio` stack.

## Platform contract

- The deploy action must be a full Gitea URL. On deploy, the workflow builds and pushes both images, then calls the shared `deploy-stack` action. The action renders the host `.env`, rsyncs `compose.yml` to `/opt/compose/victorotavio/`, and runs `docker compose up -d`.
- `traefik-public` is external and platform-owned. Never invent a new network. A stack-local network can't reach Traefik.
- The project owns its own zone (`victorotavio.com.br`) and serves the apex, redirecting `www.` inline in `compose.yml`. It does not use the platform's wildcard-subdomain pattern.
- `.env.example` is the full env schema. Every variable the app reads, secret or not, each with a local-dev default. Non-secret production config is passed as `env-overrides` in `deploy.yml`; non-secret local-dev defaults stay here, not hoisted into `compose.yml`.
- Secrets (`APP_KEY`, mail credentials) live only in this stack's Vault collection (`victorotavio`). Declare the key with an empty default in `.env.example`; store the value in Vault.
- The **Laravel application env** comes from the deploy-stack-rendered host `.env` (`/opt/compose/victorotavio/.env`), not a hand-managed data file (ADR-0010 in codelab-infra). It is delivered via `env_file:` (injected as environment variables), not mounted as a file: the renderer writes the `.env` mode `600`, unreadable by the php-fpm worker (`www-data`), so the Dockerfile sets `clear_env = no` to propagate the container env to the workers. App config and secrets travel with the code: `.env.example` + the `victorotavio` Vault collection are the single source.
- Persistent data (`storage/`, `bootstrap/cache/`, `database/database.sqlite`) stays under `/opt/data/victorotavio/`, owned by the restic backup — the deploy never writes there.
- This repo carries the Gitea topic `codelab-stack` so it appears in the derived stack inventory.

Canonical contract (networks, middlewares, the deploy action, the stack template) lives in [codelab-infra](https://git.codelab.tec.br/codelab/infra) (`CONTEXT.md`, `docs/adr/`, `templates/stack/`). When in doubt, read codelab-infra.
