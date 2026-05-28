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
3. `.d.ts` ideally identical; where true-TS emission forces a different _form_,
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
  set `types` _explicitly_ to either `[]` or only what the package actually
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
  rather than formalizing). **Also wire the reverse direction:** every _downstream_ package that
  builds via `tsc` and imports this one must add
  `{ "path": "../<this-pkg-dir>/tsconfig.build.json" }` to _its_
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

- **Babel (`@babel/preset-typescript`, default opts) elides type-only _named_
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
  module does _not_ redeclare. Verify the net surface is unchanged with the
  type-equivalence probe (it checks the exported-name set both ways).
- **Runtime-wrapper-with-third-party-type default export** (e.g. local `styled`
  wrapper whose public type must be emotion's `CreateStyled`): annotate
  `export default localImpl as unknown as CreateStyled`. `tsc` emits
  `declare const _default: CreateStyled; export default _default;` — the
  resolved default type is identical to a `export { default } from '...'`
  re-export. Unavoidable JS cost: `export default function f(){}` becomes
  `function f(){}; export default f;` (same function, name, binding, semantics).
- **propTypes on a component → reach for the binding shape, not a cast.**
  When tsc sees `X.propTypes = …` on a `function X(){}` declaration and `X`'s
  declared type doesn't list `propTypes`, it synthesizes
  `declare namespace X { var propTypes: any }` in the emitted `.d.ts` and
  splits `export default function X` into `declare function X; export default
X;`. The two casts that suppress this both have failure modes:
  `X.propTypes = {…} as any` keeps the script happy but **does not** prevent
  the namespace (the `as any` is on the value, not the property — tsc still
  synthesizes); `(X as any).propTypes = {…}` does prevent the namespace but
  trips `typescript-to-proptypes` with
  `Expected type "Identifier", got "TSAsExpression"` because the script
  `assertIdentifier`s the LHS object. **PR #48578 hit both modes in sequence**
  (commit `a8f4580fd0` then `7083171`) — the cast-based options are a false
  dichotomy.

  **The fix is the binding shape: make the value receiving `.propTypes` either
  (a) already-typed-as-having-propTypes (via `React.ForwardRefExoticComponent`
  / `React.NamedExoticComponent`, supplied by `@types/react`), or
  (b) a const-bound function expression typed by an interface that lists
  `propTypes?: any`.** `function X(){}` declarations are the trap; `const X =
…` bindings are not. With (a) or (b) you can drop every `as any` from the
  assignment site — no LHS cast, no RHS cast, no computed-key
  `['propTypes' + '']` hack — and both the script and the declaration emit
  are clean.

  **Shape 1 — wrapped (`forwardRef` / `React.memo`).** Used by
  `mui-material/src/Portal/Portal.tsx`, `mui-x/packages/x-data-grid/src/components/GridRow.tsx`.
  The wrapper's return type already declares `propTypes?` (see `@types/react`),
  so plain assignment type-checks and tsc has no augmentation to capture:

  ```ts
  const Portal = React.forwardRef<Element, PortalProps>(function Portal(props, ref) { … });
  Portal.propTypes /* remove-proptypes */ = { … };
  ```

  Emitted: `declare const Portal: React.ForwardRefExoticComponent<…>`. No
  namespace.

  **Shape 2 — bare or generic function declaration in source → convert to
  typed const-bound function expression.** The bare-function shape (what
  hand-written `.js` for non-wrapped components like `ThemeProvider`,
  `GlobalStyles`, `DefaultPropsProvider` typically looks like) is the only
  one that forces an interface declaration. Declare the value-with-propTypes
  type explicitly; annotate the const; assign without casts:

  ```ts
  interface ThemeProviderType {
    <T = DefaultTheme>(props: ThemeProviderProps<T>): React.ReactElement<ThemeProviderProps<T>>;
    propTypes?: any;
  }

  const ThemeProvider: ThemeProviderType = function ThemeProvider<T = DefaultTheme>(
    props: ThemeProviderProps<T>,
  ): React.ReactElement<ThemeProviderProps<T>> { … };

  ThemeProvider.propTypes /* remove-proptypes */ = { … };
  if (process.env.NODE_ENV !== 'production') {
    ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes);
  }
  export default ThemeProvider;
  ```

  Emitted: `declare const ThemeProvider: ThemeProviderType`. No namespace.
  JS impact: `function X(){}` → `const X = function X(){}` — same identity,
  name, length, semantics; precedent already documented above for the
  `export default function f(){}` → `function f(){}; export default f;`
  case. Mirror the existing `.js` form: same `function X(…)` name in the
  expression, same parameter destructuring, same body.

  **Note: a same-name `interface X { propTypes?: any }` declaration-merged
  with `function X(){}` is NOT sufficient.** tsc still synthesizes the
  namespace even with the interface present — verified empirically. The
  const-binding is load-bearing; the interface alone is not.

  **Shape 3 — generic + wrapped (mui-x `DataGrid`).** `forwardRef`/`memo`
  don't preserve generic call signatures, so the exported wrapper needs an
  explicit interface, and `propTypes` lands on a non-exported inner const:

  ```ts
  const DataGridRaw = function DataGrid<R>(inProps, ref) { … };
  interface DataGridComponent {
    <R extends GridValidRowModel = any>(props): React.JSX.Element;
    propTypes?: any;
  }
  export const DataGrid = React.memo(forwardRef(DataGridRaw)) as DataGridComponent;
  DataGridRaw.propTypes = { … };
  ```

  Emitted: `interface DataGridComponent { …; propTypes?: any; }` and
  `export declare const DataGrid: DataGridComponent`. No namespace —
  `DataGridRaw` is not exported, so any synthesis on it never reaches the
  `.d.ts`. Cite `mui-x/packages/x-data-grid/build/DataGrid/DataGrid.d.ts` as
  the live reference.

  **Trailing `/* remove-proptypes */` comment is always required** —
  `babel-plugin-transform-react-remove-prop-types` `forceRemoval` keys on it
  to keep the `process.env.NODE_ENV !== 'production' ? … : void 0` runtime
  wrap. The dev-only `exactProp` reassignment doesn't need the comment
  (the `NODE_ENV` env-guard already dead-code-eliminates it in production)
  and doesn't need any hack — once the binding is shape 1/2/3, plain
  `X.propTypes = exactProp(X.propTypes)` type-checks and the script ignores
  the second assignment (it picks up the first one it sees per component).

  **Verification:** after conversion,
  `grep -l "declare namespace" packages/<pkg>/build/**/*.d.ts` must return
  empty for converted files, and `pnpm proptypes --pattern "<pkg>/src/(<files>)"`
  must exit 0 with no working-tree changes.

  **Legacy patterns still present in the tree** (mui-material, pre-PR-48578
  mui-system) used `X.propTypes = {…} as any` (script-compatible, but ships
  a `declare namespace` expando in the `.d.ts`) or `(X as any).propTypes =
{…}` (clean `.d.ts`, but script-incompatible). The latter pattern
  appeared in earlier revisions of this skill as the recommended default —
  it bricks `test_static` and should be replaced with the shape-based fix
  above whenever the file is touched. (Plain `X.propTypes = {}` without
  any cast on a `function X(){}` declaration emits a propTypes
  type-mismatch error at tsc; `(X as any).propTypes = {}` without the
  `/* remove-proptypes */` comment drops the Babel guard — JS regression.)

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
- **`stripInternal: true` + `/** @internal _​/`** on a declaration removes
runtime-only exports (e.g. `TEST*INTERNALS_DO_NOT_USE`) from emitted `.d.ts`.
**An export that exists at runtime but is missing from the hand-written
`.d.ts`is a judgement call, not a mechanical fix** — it can be either
(a) intentionally private (the most-faithful conversion is to formalize that
with`@internal`+`stripInternal`, keeping it out of the emitted `.d.ts`) or
(b) a bug in the hand-written `.d.ts`(the most-faithful conversion is to
let`tsc` emit the real declaration — an additive, non-breaking surface
change that fixes the omission). Use the signals — naming (`\_internal*_`,
`_*DO_NOT_USE`, `TEST*_`strongly suggest private), prior intent in surrounding
comments, whether external consumers reasonably need it — and **surface the
call to the user with your recommendation before applying**; never silently
mark a runtime export`@internal`. Note: `@internal` on an _expando
  assignment_ does NOT propagate — only on the declaration itself.

  **Per-item triage for packages with many undeclared runtime exports.** On
  packages with a dozen-plus such leaks (e.g. `@mui/system` had ~26 across 7
  dirs), the judgement scales by shape: a runtime export that mirrors the
  _form_ of declared siblings — `outline`/`outlineColor` next to `border`/etc.,
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
  downstream consumer's declaration build — _not_ the converted package's own
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
   type Equal<X, Y> =
     (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
   type Expect<T extends true> = T;
   import * as Base from './base';
   import * as New from './new';
   import BaseDefault from './base';
   import NewDefault from './new';
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
<consumer> typescript` uses `tsconfig.json` and will _not_ catch the failure
   that matters here: once the converted package's `exports` point at
   `./src/index.ts`, a consumer's _declaration build_
   (`tsc -p <consumer>/tsconfig.build.json --rootDir <consumer>/src`) pulls the
   converted package's `.ts` **source** into its program and fails with
   `TS6059: File '…' is not under 'rootDir'` (previously it consumed the
   hand-written `.d.ts` as an external/ambient file). Run the real build of the
   full dependency chain in topological order, e.g. `pnpm -F @mui/types build
&& pnpm -F @mui/utils build && pnpm -F <pkg> build && pnpm -F <consumer>
build`. CI (`release:build`) does this; a bare `typescript` check does not —
   this is exactly how the `@mui/styled-engine` PR's first CI run failed
   (`test-dev`, `pkg.pr.new`, `test_bundle_size_monitor`, `test_regressions`).
   **Fix:** add the converted package as a project reference in _every_
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
spec demands byte-identical JS _and_ `.d.ts` _and_ no hand `.d.ts` for a file
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
