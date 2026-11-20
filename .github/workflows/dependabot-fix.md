---
description: Fix open Dependabot security alerts in material-ui with one PR per package.
on:
  schedule: daily
  workflow_dispatch:
# What shared/dependabot-fix.md needs; gh-aw requires the importing workflow to grant it.
permissions:
  contents: read
  pull-requests: read
  security-events: read
  # Mints the GitHub OIDC token exchanged for a Claude token (engine.auth below).
  id-token: write
engine:
  id: claude
  # Keyless Workload Identity Federation, the same repository variables the Claude review and
  # triage workflows use.
  auth:
    type: github-oidc
    provider: anthropic
    audience: https://api.anthropic.com
    federation-rule-id: ${{ vars.ANTHROPIC_FEDERATION_RULE_ID }}
    organization-id: ${{ vars.ANTHROPIC_ORGANIZATION_ID }}
    service-account-id: ${{ vars.ANTHROPIC_SERVICE_ACCOUNT_ID }}
    workspace-id: ${{ vars.ANTHROPIC_WORKSPACE_ID }}
model: claude-opus-5-5
skills:
  - mui/mui-public/skills/mui-dependabot-fix@0c4c6cf5d9f910af00ef1d5c88dd080727adac4b
imports:
  # Maintained in mui/mui-public; refresh with `gh aw update`.
  - uses: shared/dependabot-fix.md
    with:
      # Bundling fixtures pin old framework majors on purpose and never ship. Repository
      # auto-triage rules dismiss their alerts; this keeps the agent away if one slips through.
      ignore-manifests: 'test/bundling/fixtures/*'
---

# Dependabot fix

Fix the open Dependabot security alerts in this repository.
