---
description: Shared component that fixes open Dependabot security alerts with one PR per package.
import-schema:
  ignore-manifests:
    type: string
    default: ''
    description: >-
      Space-separated shell patterns of manifest paths whose alerts are skipped, for manifests that
      are deliberately pinned and never shipped (`*` matches across directories), e.g.
      'test/bundling/fixtures/*'.
permissions:
  contents: read
  pull-requests: read
  # Lets GITHUB_TOKEN read Dependabot alerts.
  security-events: read
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
network:
  allowed: [defaults, node]
steps:
  - name: Set up pnpm
    uses: pnpm/action-setup@73e46992e05b19abd31f2f3c20e0e7370d762115 # v6.1.1
  - name: Set up Node.js
    uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0
    with:
      node-version-file: package.json
      cache: pnpm
  - name: Install dependencies
    run: pnpm install --frozen-lockfile
  - name: Collect open Dependabot alerts
    env:
      GH_TOKEN: ${{ github.token }}
      IGNORE_MANIFESTS: ${{ github.aw.import-inputs.ignore-manifests }}
    run: |
      set -euo pipefail
      # The ignore patterns are matched against manifest paths, never expanded against the checkout.
      set -f
      out=/tmp/gh-aw/agent
      mkdir -p "$out"
      gh api "repos/$GITHUB_REPOSITORY/dependabot/alerts?state=open&per_page=100" --paginate \
        | jq -s 'add // []' > "$out/all-alerts.json"
      # Drop alerts on ignored manifests here rather than in the prompt, so the agent never sees them.
      jq -r '.[].dependency.manifest_path' "$out/all-alerts.json" | sort -u | while read -r manifest; do
        for pattern in $IGNORE_MANIFESTS; do
          # Unquoted on purpose: $pattern is a shell pattern.
          # shellcheck disable=SC2053
          if [[ "$manifest" == $pattern ]]; then
            echo "$manifest"
            break
          fi
        done
      done | jq -R . | jq -s . > "$out/ignored-manifests.json"
      jq --slurpfile ignored "$out/ignored-manifests.json" '
        [ .[] | select(.dependency.manifest_path as $m | $ignored[0] | index($m) | not) ]
        | group_by(.dependency.package.name)
        | map({
            package: .[0].dependency.package.name,
            ecosystem: .[0].dependency.package.ecosystem,
            alerts: map({
              number,
              ghsa: .security_advisory.ghsa_id,
              severity: .security_advisory.severity,
              summary: .security_advisory.summary,
              manifest: .dependency.manifest_path,
              relationship: .dependency.relationship,
              scope: .dependency.scope,
              vulnerable_range: .security_vulnerability.vulnerable_version_range,
              first_patched: .security_vulnerability.first_patched_version.identifier
            })
          })' "$out/all-alerts.json" > "$out/dependabot-alerts.json"
      echo "Open alerts: $(jq length "$out/all-alerts.json"), packages to consider: $(jq length "$out/dependabot-alerts.json"), ignored manifests: $(jq -c . "$out/ignored-manifests.json")"
      rm "$out/all-alerts.json"
safe-outputs:
  # PRs opened with GITHUB_TOKEN don't trigger GitHub Actions, and MUI repositories require Actions
  # checks. The code-infra Renovate App already opens dependency PRs in them.
  github-app:
    client-id: ${{ secrets.RENOVATE_APP_CLIENT_ID }}
    private-key: ${{ secrets.RENOVATE_APP_PRIVATE_KEY }}
  create-pull-request:
    max: 3
    title-prefix: '[security] '
    labels: [dependencies, security]
    draft: true
    # The job of this workflow is to change dependency manifests, which gh-aw protects by default.
    protected-files: allowed
    allowed-files:
      - package.json
      - '**/package.json'
      - pnpm-lock.yaml
      - pnpm-workspace.yaml
  create-issue:
    max: 1
    title-prefix: '[security] '
    labels: [dependencies, security]
    close-older-issues: true
source: mui/mui-public/.github/workflows/shared/dependabot-fix.md@0c4c6cf5d9f910af00ef1d5c88dd080727adac4b
source-sha: '0c4c6cf5d9f910af00ef1d5c88dd080727adac4b'
---

# Fix open Dependabot alerts

Follow the `mui-dependabot-fix` skill for this repository (`${{ github.repository }}`).

The open alerts are in `/tmp/gh-aw/agent/dependabot-alerts.json`, grouped by package. Alerts on
manifests the repository chose to ignore are already removed. Dependencies are installed.

Work through the packages, most severe first. Open at most three pull requests per run with
`create_pull_request`, one per package, each from its own branch off the default branch, so every
pull request contains only that package's fix. Packages left over are picked up by the next run.

When at least one package is held back, not fixable, should be dismissed, or was left for the next
run, create one issue with `create_issue` titled `Dependabot alerts that need a decision` that lists
them with the evidence from the skill's report. Leave out packages that have a pull request open.

When there are no alerts, or every package already has a pull request open, call `noop` with a
short reason.
