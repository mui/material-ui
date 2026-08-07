# Stage 2 — Merge the PR, then publish the packages

Requires stage 1 complete. Before merging, verify the PR still has the `release` label — the publish tooling finds the release PR by it.

1. Just before merging, the user announces a **merge freeze** on the team's Slack channel so nothing else lands until the release and docs deploy are done — as an agent, remind them of this step.
2. Merge the release PR.
3. Trigger the publish. It always runs through the repo's `publish.yml` GitHub Actions workflow, never from a local machine:
   - **CLI:** `pnpm release:publish` (maps to `code-infra publish`) finds the latest merged release PR, asks for confirmation, and dispatches the workflow. To publish from the exact release commit, pass the release PR's merge commit SHA on the default branch: `pnpm release:publish --sha <merge-commit-sha>` (get it with `gh pr view <number> --json mergeCommit`).
   - **GitHub UI:** open the publish workflow → "Run workflow", supplying the release commit SHA and options.

   Common options either way: a dry-run mode for debugging (also as `pnpm release:publish:dry-run`), an npm dist-tag for legacy/canary versions, and whether to auto-create the GitHub release.

4. The run pauses on the `npm-publish` environment: click "Review deployments" and approve it. **Never approve workflow runs you didn't initiate.**

**Stage complete when:** the workflow has published the packages to npm and created a **draft** GitHub release from the changelog.

## Troubleshooting

- **Publish reports "no new packages to publish":** you're likely pointed at the wrong npm registry (e.g. a leftover local-registry config from dry runs) — `npm config delete registry`.
- **Tagging step fails:** create the tag manually and **annotated**: `git tag -a v<X.Y.Z> -m "Version <X.Y.Z>" && git push upstream --tag`.
