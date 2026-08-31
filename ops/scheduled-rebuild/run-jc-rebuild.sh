#!/bin/zsh
#
# Wrapper invoked by launchd every ~15 minutes. It loads the Deploy Hook URL
# from a secrets file kept OUTSIDE the repo, then runs the rebuild checker.
#
# The secrets file (default ~/.config/rdrp/deploy-hook.env) should contain:
#   export RDRP_DEPLOY_HOOK_URL="https://api.cloudflare.com/.../hooks/..."
# and may also select the clone the agent reads and pulls:
#   export RDRP_REPO_DIR="$HOME/ops/rdrp-website"
#
# Never commit that file or the URL.

set -euo pipefail

# launchd runs with a minimal PATH; add the locations node/git live in.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

# Source the secrets file FIRST: it may set RDRP_REPO_DIR, so it has to be read
# before REPO_DIR is resolved. (Sourcing it afterwards silently ignored that
# setting and always used the default clone.)
SECRETS_FILE="${RDRP_SECRETS_FILE:-$HOME/.config/rdrp/deploy-hook.env}"
if [[ -f "$SECRETS_FILE" ]]; then
  source "$SECRETS_FILE"
fi

# An RDRP_REPO_DIR already in the environment (e.g. launchd EnvironmentVariables)
# still wins over the secrets file only if the file does not set it; either way
# the value is resolved after sourcing.
REPO_DIR="${RDRP_REPO_DIR:-$HOME/Projects/website}"

SCRIPT="$REPO_DIR/scripts/check-journal-club-rebuild.mjs"
if [[ ! -f "$SCRIPT" ]]; then
  echo "ABORT: no rebuild script at $SCRIPT (RDRP_REPO_DIR=${RDRP_REPO_DIR:-<unset>})" >&2
  exit 1
fi

exec node "$SCRIPT" --pull
