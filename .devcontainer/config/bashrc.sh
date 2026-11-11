# DevEnv shell configuration, sourced from ~/.bashrc (see `mise run env:shell:configure`).
# Keep this file idempotent: it is evaluated by every new shell.

export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"

command -v mise >/dev/null && eval "$(mise activate bash)" && source <(mise completion bash)
command -v fzf >/dev/null && source <(fzf --bash)

# Per-component environment written by install tasks
for f in "$HOME"/.devenv.d/*.sh; do
  [ -r "$f" ] && source "$f"
done
unset f
