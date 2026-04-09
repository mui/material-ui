# Plan: `code-infra version` Script

Reference issue: https://github.com/mui/mui-public/issues/921

## Context

The repo currently uses `lerna version --no-changelog --no-push --no-git-tag-version --no-private --force-publish=@mui/core-downloads-tracker` (see `release:version` in root `package.json`).

Public packages are versioned independently (`lerna.json`: `"version": "independent"`) but in practice almost all follow the same release line (currently `9.0.0-beta.0`). There are ~15 public packages across `packages/` and `packages-internal/`.

Existing infrastructure already used in `scripts/releaseChangelog.mjs`:

- `@mui/internal-code-infra/changelog` — `fetchCommitsBetweenRefs`, `findLatestTaggedVersion`

The new script should be placed in `scripts/releaseVersion.mts` (mirroring `canaryRelease.mts` and `releasePack.mts` style) and wired up as `release:version` in root `package.json`.

---

## Prompt

You are implementing a new `scripts/releaseVersion.mts` script for the MUI `material-ui` monorepo that replaces the existing `lerna version` command used in `release:version`.

### Goals

1. **Detect published state** — Check whether the current root version (`package.json#version`, e.g. `9.0.0-beta.0`) has already been published to npm by checking for a corresponding git release tag (reuse `findLatestTaggedVersion` from `@mui/internal-code-infra/changelog`).
   - If published → prompt user for a new version string.
   - If not published → ask whether to keep the current version or enter a new one.

2. **Stage detection (alpha/beta/stable)** — When moving between pre-release stages (alpha → beta, beta → stable) or bumping the major version, **all** public packages must be updated regardless of whether they have local changes. This prevents split states like half on `beta` and half on `alpha`.

3. **Find changed packages** — Use `pnpm list --recursive --filter ...[<baseline>] --depth -1 --only-projects --json` (pattern already used in `canaryRelease.mts`) to find packages changed since the last release tag. Then recursively collect all dependants of those packages within the workspace.

4. **Update versions** — Write the new version into `package.json` for:
   - Root `package.json` (always)
   - All changed packages and their recursive dependants
   - All packages if a stage change is detected (see goal 2)
   - Do **not** touch private packages

5. **Idempotency** — Running the script twice on the same git commit must produce identical output. Tie the version update to the commit SHA so re-runs are no-ops.

6. **`--verify` mode** — Add a `--verify` CLI flag that, instead of writing files:
   - Asserts the current root version is **not** yet published on npm.
   - Computes the expected version changes and asserts they match what is already written in each `package.json`.
   - Exits non-zero on any mismatch.
   - This mode is intended to run in CI on release PRs.

### CLI Interface

```
tsx scripts/releaseVersion.mts [options]

Options:
  --verify          Verification mode (CI): assert versions are correct, no writes
  --dry-run         Print what would change without writing files
  --yes             Skip interactive prompts, accept defaults
  --baseline <ref>  Git ref to diff against (default: latest release tag)
```

### Implementation Notes

- Model the script after `scripts/canaryRelease.mts`: use `execa` (`$`), `chalk`, `readline/promises`, `yargs`.
- Reuse `findLatestTaggedVersion` from `@mui/internal-code-infra/changelog` to determine the last release tag.
- To check if a version is published on npm, run `npm view <package>@<version> version` and treat a non-zero exit as "not published".
- To enumerate all workspace packages and their inter-dependencies, parse each `package.json` under `packages/` and `packages-internal/` (skip `private: true` where appropriate).
- The recursive dependant walk: build an adjacency map (package → packages that depend on it) by scanning `dependencies`/`peerDependencies`/`devDependencies` of all workspace packages, then do a BFS/DFS from the changed set.
- After updating `package.json` files, print a summary table of old version → new version per package.
- Wire it up in root `package.json`:
  ```json
  "release:version": "tsx scripts/releaseVersion.mts"
  ```

### Acceptance Criteria

- [ ] `pnpm release:version` in interactive mode prompts correctly for the two publish-state branches.
- [ ] All packages update when moving from `beta` → `stable` (stage change detected).
- [ ] Only changed packages + dependants update when staying within the same stage (e.g., `9.0.0-beta.0` → `9.0.0-beta.1`).
- [ ] Running the script twice on the same commit with the same target version is a no-op.
- [ ] `pnpm release:version --verify` exits 0 on a valid release PR and non-zero otherwise.
- [ ] `pnpm release:version --dry-run` prints a diff without writing files.
- [ ] `pnpm typescript` passes with the new script included.
- [ ] `pnpm eslint` passes on the new script.
