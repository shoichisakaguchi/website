# Git Workflow

- Always pull before starting any work: `git pull --rebase`.
- Pull again if the user indicates remote changes have been made. Keystatic in production commits directly to GitHub,
  so the local clone goes stale without anyone editing it locally.
- Commit and push only when explicitly requested by the user.
- **Pushing `main` is the production deploy.** Cloudflare Pages auto-deploys every push to `main`. Treat a push as a
  release, not a save. This repo is the explicit exception to the lab-wide "local commits only, never push" default,
  which covers remote-less repos synced via Dropbox.
- `origin` is an HTTPS URL with no stored credential; push over SSH:
  `git push git@github.com:shoichisakaguchi/website.git main`
- Never leave the working tree dirty for long: the scheduled rebuild agent runs `git pull --rebase` here and skips its
  run while there are uncommitted changes (see AGENTS.md, Journal Club Operations).
