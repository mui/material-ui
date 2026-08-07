---
name: ts-package-migration
description: >-
  Migrate a MUI monorepo package from hand-written `.js` + hand-written `.d.ts`
  source to true TypeScript (single `.ts`/`.tsx` source, declarations emitted by
  `tsc`), like `@mui/utils`. Use when asked to "convert <pkg> to TypeScript",
  "true TS like @mui/utils", or to remove a package's `--skipTsc` build. Hard
  requirement it always enforces: the package's exported type surface stays
  100% identical, verified by a bidirectional type-equivalence probe.
---

When this skill is invoked, follow this playbook to convert a MUI monorepo
package from hand-written `.js` + hand-written `.d.ts` to true TypeScript,
mirroring `@mui/utils`. Run it in the main conversation — it is interactive and
judgement-heavy: confirm destructive/outward actions, and surface trade-offs and
impossibilities to the user rather than guessing. Delegate only the noisy
read-only recon (step 0) to a throwaway `general-purpose`/`Explore` subagent and
keep just the findings.

The build pipeline is `@mui/internal-code-infra`'s `code-infra build`: Babel
emits the JS, `tsc -p tsconfig.build.json` emits the `.d.ts`. With `--skipTsc`
it instead copies hand-written `.d.ts` verbatim.

## The contract (in priority order)

1. **Exported types stay 100% identical** — this is the real, non-negotiable
   acceptance criterion. Prove it with a tsc probe (see Verification).
2. **Emitted JS stays byte-identical** modulo whitespace/comments/mangling.
3. `.d.ts` ideally identical; where true-TS emission forces a different *form*,
   it is acceptable **only if the resolved exported types are identical** —
   document each exact difference with its root cause.

A single `.ts` source feeds both Babel and `tsc`. When the original package
deliberately or sloppily diverged its hand `.js` from its hand `.d.ts` (e.g.
the `.d.ts` re-exports a third-party default while the `.js` has its own
runtime default), **byte-identical JS ∧ byte-identical `.d.ts` ∧ identical
types is mathematically unsatisfiable** from one source. Do not loop on it:
prioritize (1), then (2), document (3), and say so plainly.

## Procedure

### 0. Isolate & baseline FIRST
- Work in a git worktree; `pnpm install --frozen-lockfile` (fast, shared store).
- Build the package **unmodified** and snapshot every
  `build/**/*.{js,mjs,d.ts,d.mts}` to a scratch dir. This is the parity oracle.
- If sources are already edited, `git stash -u`, build, snapshot, `git stash pop`.

### 1. Convert source (per `.js`+`.d.ts` pair → one `.ts`/`.tsx`)
- `.tsx` for files with JSX, else `.ts`. `git mv` the `.js` so history shows a
  rename; fold the hand-written `.d.ts`'s types into the same file; delete the
  `.d.ts`. (Barrels: `export { default } from './X'; export type * from './X';`)
- Port the hand-written type block **verbatim**; only adjust what's required to
  compile. Add casts that Babel strips (`as any`, `as unknown as T`) rather than
  restructuring runtime logic — runtime JS must not change.
- Convert test `.js` → `.ts`/`.tsx` too (required: `allowJs:false`). Typical
  fixes: `let x;`→ explicit type; theme callbacks → `(theme: any)`;
  `delete obj.prop` needs `prop?:` optional.

### 2. Build config
- `package.json`: build script drop `--skipTsc`; `exports` `.js`→`.ts`
  (`"." : "./src/index.ts"`, `"./*": "./src/*/index.ts"`); add
  `@types/prop-types` (devDep, exact, e.g. `15.7.15`) if any file uses propTypes.
- `tsconfig.json`: `compilerOptions: { allowJs: false, skipLibCheck: true,
  types: [ … ] }`. **A package must never pull in `node` types.** Do not
  inherit the repo-root `types` (it contains `node`) and never list `"node"` —
  set `types` *explicitly* to either `[]` or only what the package actually
  needs. For a React package with Vitest tests that use `process.env`:
  `"types": ["react", "vitest/globals", "@mui/internal-code-infra/build-env"]`.
  `skipLibCheck: true` is **required**: trimming `types` exposes unrelated
  errors inside third-party `.d.ts` (e.g. `@vitest/spy` references the
  `Disposable` global `@types/node` used to supply) — mui-x sets
  `skipLibCheck:true` for exactly this. `@mui/internal-code-infra/build-env`
  makes `process.env` resolve without `node`.
- Add `tsconfig.build.json`: `extends: "./tsconfig.json"`, `composite,
  declaration, emitDeclarationOnly, noEmit:false, outDir:"build",
  rootDir:"./src"`, include `src/**/*.ts*`, exclude `*.test.ts*`/`*.spec.ts*`.
  Add `references` only if it depends on another workspace package's types. Add
  `stripInternal: true` (paired with `/** @internal *​/` on the relevant
  declarations) when an existing runtime-only export was intentionally hidden
  from the hand-written `.d.ts` — but treat this as a judgement call (see the
  `@internal` finding below; the omission may also be a bug worth surfacing
  rather than formalizing). **Also wire the reverse direction:** every *downstream* package that
  builds via `tsc` and imports this one must add
  `{ "path": "../<this-pkg-dir>/tsconfig.build.json" }` to *its*
  `tsconfig.build.json` `references` (see Verification step 6 — skipping this is
  a guaranteed CI failure). **`tsconfig.build.json` is mandatory** once
  `--skipTsc` is gone or
  the build throws.
- **`types` in `tsconfig.build.json` — never `node` for a browser package.**
  Declaration emit still type-checks, so build-time `process.env.NODE_ENV`
  must be typed; `types:["react"]` alone fails with `TS2591 Cannot find name
  'process'`, but pulling `@types/node` into a non-Node package is wrong.
  The shared infra package already ships this ambient: reference
  **`@mui/internal-code-infra/build-env`** (its `./build-env` export →
  `src/build-env.d.ts`, which declares a minimal global `process.env`). No
  custom file to create or maintain:
  `"types": ["@mui/internal-code-infra/build-env", "react"]`
  (drop `"react"` only if the source imports `React` explicitly everywhere;
  keep it if any `.ts` uses the global `React.*` namespace without importing,
  e.g. in a folded type block — adding `import * as React` instead would add a
  namespace import to the emitted JS). `@mui/internal-code-infra` is a
  repo-wide build dependency, so the subpath resolves from any package with
  `moduleResolution: bundler`/`node16` (no per-package dependency needed).
- The same no-`node` rule applies to **both** configs, both pointing at
  `@mui/internal-code-infra/build-env` for `process.env`. `tsconfig.build.json`'s
  `types` (above) covers declaration emit; the package's `tsconfig.json`
  (dev/test typecheck) additionally needs `vitest/globals` for the test files
  but still **no `node`** —
  `["react", "vitest/globals", "@mui/internal-code-infra/build-env"]` — plus
  `skipLibCheck:true`. Neither config may inherit the repo-root `types` (it
  contains `node`); both set `types` explicitly.

### 3. Build, diff, fix; iterate until parity is at the proven optimum.

### 4. Quality gates — run all four from the repo root and fix every issue
- **Build:** `pnpm -F <pkg> build`
- **Prettier:** `pnpm exec prettier --check "packages/<dir>/src/**/*.{ts,tsx}" --ignore-path .lintignore`
  then `pnpm exec prettier --write …` to fix. (Prettier reformats source only —
  it does not change emitted JS beyond whitespace; re-confirm with the diff.)
- **ESLint:** `pnpm exec eslint packages/<dir> --report-unused-disable-directives --max-warnings 0`
  (repo runs flat-config ESLint with `--max-warnings 0`; warnings fail CI).
- **Typecheck:** `pnpm -F <pkg> typescript` (covers converted tests + `.spec.tsx`).
Re-run the type-equivalence probe after any lint/format fix that touches source.

## Hard-won findings (apply directly — these are the traps)

- **Babel (`@babel/preset-typescript`, default opts) elides type-only *named*
  imports but NOT namespace `import * as X` nor `export *`/`export type *`
  statements.** Consequences:
  - Namespace type imports → use `import type * as X` (keeps JS clean; cost:
    `.d.ts` shows `import type * as X` vs `import * as X` — type-identical).
  - Named type imports → **always use an explicit `type` modifier** (inline
    `import { Value, type Foo } from 'pkg';` or a separate
    `import type { Foo } from 'pkg';`). Even though Babel elides type-only
    names today, relying on silent elision is fragile across tooling (different
    `verbatimModuleSyntax`/`onlyRemoveTypeImports` settings, other bundlers)
    and Copilot will flag a bare `import { TypeName }` as a potential
    "does not provide an export named" runtime hazard in ESM — exactly the
    review comment that landed on the `@mui/styled-engine` PR for
    `import { Global, Interpolation } from '@emotion/react'` (`Interpolation`
    is type-only). Fix: `import { Global, type Interpolation } from
    '@emotion/react'`. Inline `type` and separate `import type` are both
    erased identically by Babel (verified: JS output byte-identical).
  - Re-export of a type-only module (`export * from '@emotion/styled'`) → use
    `export type *` so no runtime re-export line is added to the JS (cost:
    `.d.ts` shows `export type *` — type-identical when the target's surface is
    all `export type` + a default).
- **`'use client'` forbids `export *` — including `export type *`.** The repo's
  `no-restricted-syntax` ESLint rule rejects any `ExportAllDeclaration` in a
  module with the `'use client'` pragma (Next.js limitation). It fires on
  `export type *` too (it is syntactically an `ExportAllDeclaration`, even
  though it is runtime-erased). When the entry has `'use client'`, re-export the
  third-party/barrel type surface with **explicit named** type re-exports
  instead: `export type { A, B, C } from 'pkg';`. Do **not** name-re-export a
  type you also locally declare (that is a duplicate-export error, whereas
  `export *` silently lets the local shadow) — only re-export the names the
  module does *not* redeclare. Verify the net surface is unchanged with the
  type-equivalence probe (it checks the exported-name set both ways).
- **Runtime-wrapper-with-third-party-type default export** (e.g. local `styled`
  wrapper whose public type must be emotion's `CreateStyled`): annotate
  `export default localImpl as unknown as CreateStyled`. `tsc` emits
  `declare const _default: CreateStyled; export default _default;` — the
  resolved default type is identical to a `export { default } from '...'`
  re-export. Unavoidable JS cost: `export default function f(){}` becomes
  `function f(){}; export default f;` (same function, name, binding, semantics).
- **propTypes on a component creates a tsc expando** → emits
  `declare namespace X { var propTypes: any }` and splits
  `export default function X` into `declare function X; export default X;`.
  Two patterns exist; pick based on whether the file is processed by the
  repo's `pnpm proptypes` (`typescript-to-proptypes`) generator — which is
  **everything in `@mui/system`, `@mui/material`, `@mui/lab`, `@mui/joy` with
  a React component**.

  **Pattern A — `mui-material` convention** (used by `Portal.tsx`,
  `FocusTrap.tsx`; mandatory for any file in `typescript-to-proptypes`'s
  input list, since the script asserts the propTypes-assignment LHS object
  is an `Identifier` and rejects `TSAsExpression`):
  ```ts
  X.propTypes /* remove-proptypes */ = {
    /* ... */
  } as any;
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    (X as any)['propTypes' + ''] = exactProp((X as any).propTypes);
  }
  ```
  The `/* remove-proptypes */` trailing comment on the static LHS triggers
  `babel-plugin-transform-react-remove-prop-types` `forceRemoval` (keeps the
  `process.env.NODE_ENV !== "production" ? … : void 0` wrap). The `as any`
  on the RHS satisfies tsc — at the cost of allowing the expando
  `declare namespace X { var propTypes: any }` in the emitted `.d.ts`, which
  is benign and matches what `mui-material` ships. The dev-only `exactProp`
  reassignment uses a computed-key `['propTypes' + '']` LHS so
  `typescript-to-proptypes` doesn't try to inject into it; the marker
  comment is omitted because the `NODE_ENV` env-guard already dead-code-
  eliminates it in production.

  **Pattern B — `styled-engine` convention** (no expando in the emitted
  `.d.ts`, but **breaks `typescript-to-proptypes`** with `Expected type
  "Identifier", got "TSAsExpression"`):
  `(X as any).propTypes /* remove-proptypes */ = { ... };` with
  `(X as any).propTypes = exactProp((X as any).propTypes);` for the dev
  reassignment. Use **only** when the file is not in `pnpm proptypes`'s
  input list — e.g. a styling-only package with no React-component
  propTypes (where Pattern A would emit a needless expando but the script
  never runs anyway). The original skill commit (and `@mui/private-theming`
  PR #48565 review) recommended Pattern B globally; that bricked
  `test_static` (Generate PropTypes) on `@mui/system` PR #48578 for
  `Box.tsx` and `ThemeProvider.tsx`. Default to Pattern A.

  (Plain `X.propTypes = {}` without `as any` — no cast at all — keeps the
  guard but emits a propTypes type-mismatch error at the tsc step. `(X as
  any).propTypes = {}` without the `/* remove-proptypes */` comment drops
  the Babel guard — JS regression.)
- **Wildcard `package.json` `exports` resolve only the wildcard's literal
  extension.** A catch-all like `"./*": "./src/*/index.ts"` only resolves
  directories whose `index` file is `.ts`. If the conversion leaves any
  directory on `index.js` — e.g. a partial conversion or a revert of one
  dir mid-PR, as with `RtlProvider/` on `@mui/system` PR #48578 — that dir
  needs an explicit entry:
  `"./RtlProvider": "./src/RtlProvider/index.js"`. Otherwise rolldown (and
  any strict ESM resolver) fails at bundle time with
  `"./X" is not exported under the conditions [...]`. The package's own
  build won't catch this — only downstream bundling does (CI surfaces it
  as `test_bundle_size_monitor` failure). The set of explicit entries to
  keep around therefore mirrors the set of dirs still on `.js`.
- **`stripInternal: true` + `/** @internal *​/`** on a declaration removes
  runtime-only exports (e.g. `TEST_INTERNALS_DO_NOT_USE`) from emitted `.d.ts`.
  **An export that exists at runtime but is missing from the hand-written
  `.d.ts` is a judgement call, not a mechanical fix** — it can be either
  (a) intentionally private (the most-faithful conversion is to formalize that
  with `@internal` + `stripInternal`, keeping it out of the emitted `.d.ts`) or
  (b) a bug in the hand-written `.d.ts` (the most-faithful conversion is to
  let `tsc` emit the real declaration — an additive, non-breaking surface
  change that fixes the omission). Use the signals — naming (`_internal_*`,
  `*_DO_NOT_USE`, `TEST_*` strongly suggest private), prior intent in surrounding
  comments, whether external consumers reasonably need it — and **surface the
  call to the user with your recommendation before applying**; never silently
  mark a runtime export `@internal`. Note: `@internal` on an *expando
  assignment* does NOT propagate — only on the declaration itself.

  **Per-item triage for packages with many undeclared runtime exports.** On
  packages with a dozen-plus such leaks (e.g. `@mui/system` had ~26 across 7
  dirs), the judgement scales by shape: a runtime export that mirrors the
  *form* of declared siblings — `outline`/`outlineColor` next to `border`/etc.,
  or `displayPrint`/`displayRaw`/`overflow`/`textOverflow`/`visibility`/
  `whiteSpace` when the dir's compose-default treats them uniformly — is
  almost certainly an oversight-(b) case; let `tsc` emit it and call out the
  surface additions in the PR description. A runtime export that is a utility
  helper consumed cross-submodule but never style-function-shaped —
  `borderTransform`, `paletteTransform`, `sizingTransform`,
  `marginKeys`/`paddingKeys`, `styleFunctionMapping`, breakpoint-internal
  helpers like `createEmptyBreakpointObject` — is (a); annotate `@internal`.
  Surfaced on `@mui/system` PR #48578.

  **`stripInternal: true` strips every `@internal`-marked declaration in the
  package — including pre-existing ones you didn't add.** If a pre-existing
  `@internal` is referenced transitively in another emitted type (e.g. as a
  literal key in a `PartiallyRequired<T, K>` constraint, or anywhere `keyof`
  the stripped surface is consumed), turning on `stripInternal` will break the
  downstream consumer's declaration build — *not* the converted package's own
  build, which makes the failure easy to miss locally if Verification step 6
  is skipped. Before enabling: `git grep "@internal" packages/<pkg>/src/`,
  and for each match check whether the symbol is reachable through the
  public type surface anyway. If it is — as `Grid.unstable_level` was via
  `GridOwnerState` in `@mui/system` — the pre-existing `@internal` was
  lying; drop the tag rather than letting the strip break consumers.
- `tsc` always emits `declare` on function declarations in `.d.ts`; hand-written
  baselines often omit it. `export function f` vs `export declare function f`
  are identical in a declaration file — document, don't chase.
- A subpath component's props type may never be exported at the package root if
  the baseline `index.d.ts` had no `export *` for it — verify, don't assume.

## Verification (all must pass before claiming done)

1. `pnpm -F <pkg> build` succeeds.
2. Normalized diff every `build/**` file vs the baseline snapshot (strip
   comments, collapse whitespace). Enumerate every residual diff with root cause.
3. **Type-equivalence probe** — the proof that matters. Stage two copies of the
   built package (baseline snapshot, new build) with their `package.json`
   `exports`; write `probe.ts`:
   ```ts
   type Equal<X,Y> = (<T>()=>T extends X?1:2) extends (<T>()=>T extends Y?1:2) ? true : false;
   type Expect<T extends true> = T;
   import * as Base from './base'; import * as New from './new';
   import BaseDefault from './base'; import NewDefault from './new';
   // strict Equal for every exported type (instantiate generics with a
   // representative Props); bidirectional `const a: typeof Base.x = New.x`
   // for value exports; Equal<Exclude<keyof typeof Base, keyof typeof New>, never>
   // both ways for the exported-name set; repeat for each subpath export.
   ```
   `tsc -p` it with `strict`, `moduleResolution:bundler`. **Exit 0 = exported
   types provably identical.** A failure pinpoints the exact divergence.
4. `pnpm -F <pkg> typescript` (includes converted tests + `.spec.tsx`).
5. `pnpm -F <pkg> test` (node + browser projects).
6. **Build every downstream consumer, not just typecheck it.** `pnpm -F
   <consumer> typescript` uses `tsconfig.json` and will *not* catch the failure
   that matters here: once the converted package's `exports` point at
   `./src/index.ts`, a consumer's *declaration build*
   (`tsc -p <consumer>/tsconfig.build.json --rootDir <consumer>/src`) pulls the
   converted package's `.ts` **source** into its program and fails with
   `TS6059: File '…' is not under 'rootDir'` (previously it consumed the
   hand-written `.d.ts` as an external/ambient file). Run the real build of the
   full dependency chain in topological order, e.g. `pnpm -F @mui/types build
   && pnpm -F @mui/utils build && pnpm -F <pkg> build && pnpm -F <consumer>
   build`. CI (`release:build`) does this; a bare `typescript` check does not —
   this is exactly how the `@mui/styled-engine` PR's first CI run failed
   (`test-dev`, `pkg.pr.new`, `test_bundle_size_monitor`, `test_regressions`).
   **Fix:** add the converted package as a project reference in *every*
   downstream package that builds via `tsc` and imports it — add
   `{ "path": "../<pkg-dir>/tsconfig.build.json" }` to that consumer's
   `tsconfig.build.json` `references` array (the converted package's own
   `tsconfig.build.json` must have `composite: true`, which it does). This is
   the same wiring true-TS deps like `@mui/utils` already use; grep
   `grep -rl '"@mui/<pkg>"' packages/*/package.json` to find every consumer
   that needs it. `TS6305 "Output file … has not been built"` when verifying
   locally just means a referenced project's `build/` is stale — build deps
   first; it is not a defect.
7. Remove all scratch dirs/probes before finishing.

## Reporting

State which contract clauses hold, and for every residual JS/`.d.ts` difference
give the exact before→after and its root cause (from Findings above). If the
spec demands byte-identical JS *and* `.d.ts` *and* no hand `.d.ts` for a file
whose original diverged, state the impossibility, prove it, deliver the
type-identical optimum, and stop — do not loop.

## Reference: `@mui/styled-engine` migration (first application)

All of the above was derived from converting `@mui/styled-engine` (PR #48544,
branch `code-infra/styled-engine-typescript`). Outcome: 9/10 emitted JS files +
`StyledEngineProvider` declarations byte-identical; all exported types proven
strictly identical (probe exit 0); only `index`'s default-export form and
type-only `import type`/`export type *`/`declare` `.d.ts` forms differ, each a
documented, type-preserving consequence of single-source true-TS. Downstream
`@mui/system` typechecked unchanged.
