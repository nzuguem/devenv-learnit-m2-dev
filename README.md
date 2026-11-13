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
- macOS, Linux, or Windows with WSL2: git and mise inside WSL
  (see [Windows (WSL2)](#windows-wsl2))

## Quick start

1. Clone the repository:

   ```bash
   git clone https://github.com/nzuguem/devenv-learnit-m2-dev.git && cd devenv-learnit-m2-dev
   ```

2. Install the host tools (the devcontainer CLI):

   ```bash
   mise trust && mise install
   ```

3. Create and open the environment. This builds and starts the container, then opens
   herdr inside it:

   ```bash
   mise run devenv:create
   ```

   The first time takes a while: the image is built, then all the tools are installed
   in the container. Later creations are much faster, because the tools are kept in the
   `mise-data-volume` Docker volume.

`devenv:create` and `devenv:open` run on your own machine, from the repository folder.
They are not available inside the container.

> **VS Code Desktop users**: you can also open this folder in VS Code with the
> *Dev Containers* extension, then run **Dev Containers: Reopen in Container**.

### Or open it in the cloud (GitHub Codespaces)

You can also run this Devenv in a cloud development environment such as GitHub Codespaces:
open <https://codespaces.new/nzuguem/devenv-learnit-m2-dev>, or on GitHub click
**Code → Codespaces → Create codespace on main**.

**Advantage**: nothing to install on your machine (no Docker, no mise). Everything runs
in the cloud and you work from your browser, even on a low-powered computer.

Codespaces uses the same `.devcontainer/devcontainer.json`, so you are already inside the
container: run `herdr` from the terminal. You do not need `devenv:create` or `devenv:open` there.

## Windows (WSL2)

On Windows, run the Devenv from WSL2 (a Linux system built into Windows). Every command
of the [Quick start](#quick-start) is then typed in the Ubuntu terminal, as on Linux.

> Native Windows (PowerShell, Git for Windows, a clone in `C:\`) is not supported:
> run git, mise and every Devenv command from the Ubuntu terminal.

### Set up WSL

1. In PowerShell, opened as administrator, install WSL2 and Ubuntu, then restart Windows:

   ```powershell
   wsl --install
   ```

   On the first start, Ubuntu asks you to create a Linux user name and password.

2. Open an Ubuntu terminal: **Ubuntu** in the Start menu, the **Ubuntu** tab of Windows
   Terminal, or `wsl` from PowerShell.

3. In Docker Desktop, turn on **Settings → General → Use the WSL 2 based engine**, then
   **Settings → Resources → WSL Integration**, and turn on your Ubuntu distribution.
   From the Ubuntu terminal, `docker version` must now work.

4. In the Ubuntu terminal, install git and [mise](https://mise.jdx.dev/getting-started.html):

   ```bash
   sudo apt update && sudo apt install -y git curl
   curl https://mise.run | sh
   echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc && source ~/.bashrc
   ```

5. Still in the Ubuntu terminal, go to your Linux home folder and follow the
   [Quick start](#quick-start):

   ```bash
   cd ~
   ```

**VS Code Desktop users**: install the *WSL* and *Dev Containers* extensions, run
`code .` from the repository folder in the Ubuntu terminal, then run
**Dev Containers: Reopen in Container**.

### How files are shared between Windows and WSL

- WSL has its own Linux disk. Your Linux home folder is `~` (`/home/<user>`).
- Your Windows drives are visible from WSL: `C:\` is `/mnt/c`. This link is slow, and
  file changes made through it are often not noticed by the tools.
- Your Linux files are visible from Windows: in File Explorer, open
  `\\wsl.localhost\Ubuntu\home\<user>`. From the Ubuntu terminal, `explorer.exe .`
  opens the current folder.
- Docker Desktop runs the containers in WSL2. A repository cloned in `~` is shared with
  the container (`/workspaces/devenv-learnit-m2-dev`) directly: it is fast, and tools that
  restart on file changes (`watchexec`, `tsx watch`, Quarkus dev mode) work.
  From `/mnt/c` (or `C:\`), `npm install` and Maven are much slower, and these
  tools may miss your changes.
- The mise tools are kept in the `mise-data-volume` Docker volume, wherever you cloned
  the repository.

> **Clone the repository in `~` from the Ubuntu terminal, never in `/mnt/c`.**

The container ports are reachable from your Windows browser, for example
<http://localhost:8088> for Code Server.

## Leave and come back

- **Leave the Devenv**: press **Ctrl+B**, then type **q**.
- **Come back**: from the repository folder on your machine, run:

  ```bash
  mise run devenv:open
  ```

  Your container is kept as it is. If it was stopped (for example after a restart
  of your machine or of Docker), it is started again.
- **Start over from scratch**: run `mise run devenv:create`. It recreates the container,
  then opens the Devenv again.

## Code in your browser

From a terminal inside the container, start Code Server:

```bash
mise run vevenv:code-server:start
```

Then open <http://localhost:8088/?folder=/workspaces/vevenv-learnit-m2-dev>.

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
program that uses it, then run `mise run devenv:create` again.

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

- `mise run devenv:open` keeps your container. `mise run devenv:create` recreates it:
  your project folder (`/workspaces/devenv-learnit-m2-dev`, shared with your machine)
  and the mise tools are kept, but anything else you changed in the container (home
  folder, `apt` packages) is lost.

## Repository layout

```text
.
├── mise.toml                 # Host tools and tasks (devenv:create, devenv:open)
├── mise.devcontainer.toml    # Tasks available inside the container
├── prek.toml                 # Git hooks (gitleaks)
├── .editorconfig             # Shared editor settings (indentation, line endings)
├── .gitattributes            # Line endings on checkout (LF, CRLF for Windows scripts)
└── .devcontainer/
    ├── devcontainer.json     # Container definition, VS Code settings and extensions
    ├── config/
    │   ├── tools.toml        # Tools and versions installed in the container
    │   └── bashrc.sh         # Shell setup
    └── scripts/              # Container lifecycle scripts
```
