---
name: circleci-why-flaky
description: Classify recent CircleCI workflow failures into buckets so you can see what's flake vs what's a real bug. Use when CI on a branch is failing repeatedly and you want to know whether retries will fix it. Infers project + branch from the current git repo; defaults to last 7 days.
---

# CircleCI: why is it flaky?

Bucket recent CircleCI failures by root cause and tell the user which buckets are flake vs real issues.

## How to invoke

Run the bundled script and pass its stdout straight through to the user:

```bash
python3 .claude/skills/circleci-why-flaky/analyze.py
```

Common flags:

- `--branch <name>` — branch to analyze (default: current branch; pass `master`/`main` for the trunk)
- `--workflow <name>` — restrict to a single workflow name (default: all workflows on the branch)
- `--days <N>` — time window (default: 7)
- `--max <N>` — cap on failed workflows to deep-analyze (default: 200)
- `--org`, `--repo`, `--vcs` — override repo inference if not in a git repo
- `--token <token>` — explicit token (overrides `~/.circleci/cli.yml`)

The script writes progress to stderr and the final markdown report to stdout. Show the stdout to the user verbatim — it is already formatted as the requested bullet list.

## Public vs private projects

The script automatically tries unauthenticated access first. If that returns 401/403/404 it falls back to a token from `~/.circleci/cli.yml`.

If neither works, the script exits with setup instructions. Relay them to the user:

```
# macOS
brew install circleci

# Linux / other
curl -fLSs https://raw.githubusercontent.com/CircleCI-Public/circleci-cli/main/install.sh | bash

# Then authenticate (writes ~/.circleci/cli.yml):
circleci setup
```

## Output shape

The script outputs a markdown bullet list, one bucket per line, in this exact shape:

```
- N times, P%, short error description, [example](workflow url)
```

Real (non-flaky) failures — propTypes drift, type errors, lint errors, assertion failures — are intentionally **not** listed individually. They are summarized in a single trailing line: `- **N real issues (not flaky)** — …`.

## Notes for Claude

- Don't reimplement the fetching logic; just run the script. It paginates pipelines, parallel-fetches workflows / jobs / step logs, and classifies — already optimized.
- If the user asks for a different format (e.g. CSV, JSON), re-run with the raw data in `/tmp/circleci-why-flaky-cache/` (the script keeps the intermediate JSON files there for one run).
- The script's exit codes: `0` success, `2` bad input, `3` auth needed.
