#!/bin/zsh
#
# Wrapper invoked by launchd every ~15 minutes. It loads the Deploy Hook URL
# from a secrets file kept OUTSIDE the repo, then runs the rebuild checker.
#
# The secrets file (default ~/.config/rdrp/deploy-hook.env) should contain:
#   export RDRP_DEPLOY_HOOK_URL="https://api.cloudflare.com/.../hooks/..."
#
# Never commit that file or the URL.

set -euo pipefail

# launchd runs with a minimal PATH; add the locations node/git live in.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

REPO_DIR="${RDRP_REPO_DIR:-$HOME/Projects/website}"
SECRETS_FILE="${RDRP_SECRETS_FILE:-$HOME/.config/rdrp/deploy-hook.env}"

if [[ -f "$SECRETS_FILE" ]]; then
  source "$SECRETS_FILE"
fi

exec node "$REPO_DIR/scripts/check-journal-club-rebuild.mjs" --pull
