Title: Deprecate composed CSS classes for SpeedDial family (refs #41282)

Summary
-------
This PR deprecates composed CSS classes in the SpeedDial family (SpeedDial, SpeedDialAction, SpeedDialIcon) and adds the codemod + docs to help users migrate.

What I changed
- Added @deprecated JSDoc to composed class keys in:
  - `packages/mui-material/src/SpeedDial/speedDialClasses.ts`
  - `packages/mui-material/src/SpeedDialAction/speedDialActionClasses.ts`
  - `packages/mui-material/src/SpeedDialIcon/speedDialIconClasses.ts`
- Added migration guidance to the migration docs: `docs/data/material/migration/migrating-from-deprecated-apis/migrating-from-deprecated-apis.md`.
- Implemented a codemod for the composed-class replacements and tests at:
  - `packages/mui-codemod/src/deprecations/speed-dial-classes/`

Tests & validation
- The codemod package tests for SpeedDial (CSS + JS transforms) pass locally.
- I attempted a full workspace test run; most TypeScript builds passed, but the workspace coverage step failed locally with an Nx / Sqlite disk I/O error (SqliteFailure extended_code 522). This appears to be an environment/cache issue; the codemod tests themselves completed successfully.

How to run locally
-------------------
- Run the codemod package tests:

```bash
pnpm --filter @mui/codemod test
```

- To reproduce the codemod on a codebase (example):
  - See `packages/mui-codemod/` README for usage. The SpeedDial codemod is under `src/deprecations/speed-dial-classes` and has tests and test-cases.

Notes for maintainers
- If the CI experiences the same Sqlite error, a fresh Nx cache reset on the CI host (or skipping the coverage step) may be required. Locally, running `npx nx reset` then re-running the tests often clears the transient issue.

Why this PR should be accepted
- It follows the established deprecation workflow: JSDoc deprecation comments, migration docs, codemod to automate migration, and unit tests for the codemod.

Next steps I can take
- If you want, I can open the GitHub PR for this branch. I prepared this PR body; I pushed the branch so the PR can be created from it.
