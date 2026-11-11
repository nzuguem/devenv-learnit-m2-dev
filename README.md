# devenv-learnit-m2-dev

A ready-to-use development environment that runs in a Docker container.
Everyone gets the same tools, with the same versions, and you only need
Docker and mise on your own machine.

## What's inside

- **Languages**: Node 26, Python 3.15 (with uv), Java 25 (Temurin) and Maven 3.10
- **Tools**: git hooks with prek and gitleaks (blocks commits that contain secrets),
  `gh`, `jq`, `yq`, `fzf`, `watchexec`, Neovim (LazyVim), and Docker inside the container
- **AI assistants (CLI)**: Claude Code, GitHub Copilot CLI and Antigravity CLI.
  Each one needs its own account.
- **herdr**: the terminal workspace you land in when you open the environment
- **VS Code in your browser** (Code Server), with the course extensions already installed

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (Docker Desktop, or Docker Engine on Linux), running
- [mise](https://mise.jdx.dev/getting-started.html)
- git
- macOS, Linux, or Windows with WSL2

## Quick start

1. Clone the repository:

   ```bash
   git clone https://github.com/nzuguem/devenv-learnit-m2-dev.git && cd devenv-learnit-m2-dev
   ```

2. Install the host tools (the devcontainer CLI):

   ```bash
   mise trust && mise install
   ```

3. Start the environment. This builds and starts the container, then opens herdr inside it:

   ```bash
   mise run devenv:open
   ```

The first start takes a while: the image is built, then all the tools are installed
in the container. The next starts are much faster, because the tools are kept in the
`mise-data-volume` Docker volume.

> **VS Code Desktop users**: you can also open this folder in VS Code with the
> *Dev Containers* extension, then run **Dev Containers: Reopen in Container**.

## Code in your browser

From a terminal inside the container, start Code Server:

```bash
mise run devenv:code-server:start
```

Then open <http://localhost:8088/?folder=/workspaces/devenv-learnit-m2-dev>.

- Files are saved automatically about one second after you type.
- Click **Trust** on the *Restricted Mode* banner, otherwise the extensions stay disabled.
- Code Server is only reachable from your own machine (`127.0.0.1`).

## Ports

When you start a course project inside the container, open it from your own browser
at `http://localhost:<port>`:

| Port | Project |
| ---- | ------- |
| 8080 | Quarkus HTTP: `calculator-rest`, `calculator-soap`, Dev UI at `/q/dev/` |
| 9000 | Quarkus gRPC: `calculator-grpc` |
| 4000 | GraphQL Yoga, Apollo Federation gateway, `graphql-beers` server |
| 4001 | graphql-http, `users` subgraph, Ruru (`graphql-beers`) |
| 4002 | Ruru (`graphql-js`), `products` subgraph |
| 4003 | Apollo Server, `reviews` subgraph |
| 3000 | Grafana (federation `compose.yml`) |
| 8088 | Code Server |

These ports are only reachable from your own machine. If one of them is already used
on your machine (3000 and 8080 often are), the container does not start: stop the
program that uses it, then run `mise run devenv:open` again.

## Everyday tips

- List the available tasks:

  ```bash
  mise tasks
  ```

- Add a tool for everyone. It is written to `.devcontainer/config/tools.toml`:

  ```bash
  mise use -g <tool>@<version>
  ```

- Set local environment variables. The `.env` file is ignored by git:

  ```bash
  cp .env.example .env
  ```

## Good to know

- `mise run devenv:open` recreates the container every time. Your project folder
  (`/workspaces/devenv-learnit-m2-dev`, shared with your machine) and the mise tools
  are kept. Anything else you change in the container (home folder, `apt` packages)
  is lost.

## Repository layout

```text
.
├── mise.toml                 # Host tools and tasks (devenv:open)
├── mise.devcontainer.toml    # Tasks available inside the container
├── prek.toml                 # Git hooks (gitleaks)
├── .editorconfig             # Shared editor settings (indentation, line endings)
└── .devcontainer/
    ├── devcontainer.json     # Container definition, VS Code settings and extensions
    ├── config/
    │   ├── tools.toml        # Tools and versions installed in the container
    │   └── bashrc.sh         # Shell setup
    └── scripts/              # Container lifecycle scripts
```
