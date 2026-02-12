# [Versions](https://mui.com/versions/)

## 7.3.8

<!-- generated comparing v7.3.7..master -->

_Feb 12, 2026_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

### `@mui/material@7.3.8`

- [alert] Revert removing default icon mapping fallback (#47629) @ZeeshanTamboli
- [app-bar] Fix optional chaining in joinVars function (#47739) @sai6855
- [autocomplete] Fix scroll position resetting on reopen with `disableCloseOnSelect` (#47248) @ZeeshanTamboli
- [autocomplete] Pass fullWidth prop to input, with default as true (#47663) @silviuaavram
- [badge] Refactor variant styles generation (#47742) @sai6855
- [chip] Remove unnecessary `onDelete` check (#47753) @ZeeshanTamboli
- [switch][checkbox][radio] Remove `aria-disabled` from root span (#46318) @KirankumarAmbati
- [collapse] Remove unnecessary string concatenation (#47745) @sai6855
- [drawer] `persistent` and `permanent` variant Drawers should not override the styles via theme using `modal` class (#47581) @ZeeshanTamboli
- [tabs] Add ability to extend Tabs variant (#47590) @aditya1906
- [useAutocomplete] Add aria-multiselectable to listbox props when multiple is true (#47632) @silviuaavram
- [useAutocomplete] Use `React.Key` instead of `any` for `key` prop (#47619) @sonixx02

#### Core

- Revert "[docs-infra] Add Cookie Banner and Analytics Provider (#47445)" (868d23e) @dav-is
- Revert "[docs-infra] Update Cookie Consent Dialog styling and content (#47718)" (ae29d03) @dav-is
- [api-docs-builder] Validate slots prop and Slots interface export consistency (#47623) @Janpot
- [code-infra] Remove `window.muiDocConfig` (#47737) @Janpot
- [code-infra] Fix flaky Select test on Webkit (#47728) @Janpot
- [code-infra] Remove usage of NODE_ENV=test (#47692) @Janpot
- [code-infra] Prepare eslint rule rename (#47702) @Janpot
- [code-infra] Next.js 15.5.11 (security update) (#47697) @Janpot
- [code-infra] Fix Tooltip tests flakyness (#47669) @Janpot
- [code-infra] Improve instructions for error messages (#47668) @Janpot
- [code-infra] Add initial agent instructions (#47655) @Janpot
- [code-infra] Update broken links checker (#47633) @Janpot
- [code-infra] Improve Tooltip leaveDelay test (#47624) @Janpot
- [code-infra] Fix internal broken links (#47607) @Janpot
- [docs-infra] Resolve a few 301s in our docs (#47746) @Janpot
- [docs-infra] Update Cookie Consent Dialog styling and content (#47718) @dav-is
- [docs-infra] Add Cookie Banner and Analytics Provider (#47445) @dav-is
- [docs-infra] Make sure /customers page has a h1 (#47615) @Janpot
- [docs-infra] Fix privacy link (#47614) @Janpot
- [docs-infra] Resolve a few 301s (#47579) @Janpot
- [internal] Remove unused sponsor files (#47741) @oliviertassinari
- [markdown] Fix some broken hash links (#47609) @Janpot
- [test] Cleanup Table tests TODOs (#47656) @Ocheretovich

### Docs

- [website] unclickable banner in the pricing page (#47634) @aemartos
- [blog] Company Update: What we've been working on (and why) (#47626) @alelthomas
- [docs] Remove outdated notifications (#47743) @bernardobelchior
- [docs] Make Demo component product-agnostic (#47635) @Janpot
- [docs] Copyedit the Number Field doc (#47469) @mapache-salvaje
- [docs] Fix Roboto font not loading in iframe demos (#47660) @Janpot
- [docs] Replace Checkbox with Icons in Combobox examples (#47654) @silviuaavram
- [docs] Fix punctuation in TypeScript guide description (#47617) @nodirbekprogrammer

All contributors of this release in alphabetical order: @aditya1906, @aemartos, @alelthomas, @bernardobelchior, @dav-is, @Janpot, @KirankumarAmbati, @mapache-salvaje, @nodirbekprogrammer, @Ocheretovich, @oliviertassinari, @sai6855, @silviuaavram, @sonixx02, @ZeeshanTamboli

## 7.3.7

<!-- generated comparing v7.3.6..master -->

_Jan 8, 2026_

A big thanks to the 16 contributors who made this release possible.

### `@mui/material@7.3.7`

- [accordion] Remove unnecessary handling of `square` prop on Accordion Root (#47457) @ZeeshanTamboli
- [alert] Remove unnecessary default icon mapping fallback (#47460) @ZeeshanTamboli
- [appbar] Fix inherit color CSS variable not getting applied (#47518) @ZeeshanTamboli
- [autocomplete] Fix `ArrowLeft`, `Backspace` & `Delete` behavior for multiple and single-value rendering with proper caret handling (#47411) @jnbain
- [backdrop] Remove unnecessary passing of `classes` from root slot (#47519) @ZeeshanTamboli
- [button-group] Fix styles when variant is `contained` (#47499) @ZeeshanTamboli
- [card-action-area] Remove incorrect root ref being forwarded to focus highlight component (#47523) @ZeeshanTamboli
- [checkbox] Fix readonly checkboxes (#47503) @mj12albert
- [click-away-listener] Tighten the parameter type of createHandleSynthetic method (#47525) @ZeeshanTamboli
- [dialog] Fix backdrop theme style overrides (#47544) @ZeeshanTamboli
- [focus-trap] Compute `activeElement` inside `loopFocus` on every keydown (#47566) @ZeeshanTamboli
- [modal] Take non-integer padding-right into consideration when scroll locking (#47420) @Zache
- [select] Fix dropdown width does not match trigger width on window resize (#47526) @AarishMansur
- [tabs] Fix passing incorrect slot name props (scrollButton → scrollButtons) (#47215) @rithik56

### Docs

- [card] Fix key warning (#47524) @ZeeshanTamboli
- [dialog] Replace TranstionProps with slotProps.transition (#47569) @sai6855
- [number-field] Use stable Base UI package (#47504) @siriwatknp
- [snackbar] Replace TransitionComponent with slots.transition (#47570) @sai6855
- Fix incorrect indentation in migration guide (#47571) @sai6855
- Enable MUI chat on Material UI demos (#46837) @siriwatknp
- Add docs and website banner for Dev survey'25 (#47521) @prakhargupta1
- Update Tailwind CSS v4 + Next.js Pages Router docs (#47546) @atharva3333
- Add warning callout to Sync plugin doc (#47511) @mapache-salvaje
- Update typo in TailwindCSS v4 integration with Next.js docs (#47512) @TimKraemer
- Fix link to contributing guide (#47473) @oliviertassinari
- Improve description of Accordion props (#47459) @ZeeshanTamboli

### Core

- [blog] Whats new since MUI X v8 [DX-51] (#47140) @joserodolfofreitas
- [code-infra] Fix React@next CI job (#47493) @Janpot
- [code-infra] Move font loading to @mui/docs (#47385) @Janpot
- [code-infra] Fix CI for React 18 (#47560) @Janpot
- [code-infra] Prevent legacy browsers tests from updating (#47496) @Janpot
- [code-infra] Move `@mui/internal-test-utils` to code infra repo (#47422) @Janpot
- [code-infra] Fix React@next CI job (#47493) @Janpot
- [examples] Update Next.js versions to v16 in Next.js examples (DX-57) (#47453) @alelthomas
- [internal] Bump Next.js & React version to avoid security vulnerability (#47427) @oliviertassinari
- [test] Use plain playwright for e2e (#47410) @mj12albert
- [test] Fix react-18 tests (#47407) @Janpot

All contributors of this release in alphabetical order: @AarishMansur, @alelthomas, @atharva3333, @bricefrisco, @Janpot, @jnbain, @joserodolfofreitas, @mapache-salvaje, @mj12albert, @oliviertassinari, @prakhargupta1, @rithik56, @siriwatknp, @TimKraemer, @Zache, @ZeeshanTamboli

## 7.3.6

<!-- generated comparing v7.3.5..master -->

_Dec 3, 2025_

A big thanks to the 22 contributors who made this release possible.

### @mui/material@7.3.6

- [Accordion] Move properties to the AccordionOwnProps interface (#47348) @Aleksan4e3
- [Autocomplete] Remove unnecessary `filterSelectedOptions` dependency from `syncHighlightedIndex` useCallback (#47378) @ZeeshanTamboli
- [Autocomplete] Fix input caret not showing when focusing after chip navigation (#47249) @vrachuri28
- [Autocomplete] Fix ArrowLeft crash when value is not set with single-value rendering (#47214) @rithik56
- [Button] Fix running formAction when passed (#47185) @sai6855
- [Chip] Remove leftover closing parenthesis in CSS class key (#47345) @ZeeshanTamboli
- [ListItem] Add `secondaryAction` slot to `ListItem` (#47399) @sai6855
- [NumberField] Fix scroll behavior (#47397) @oliviertassinari
- [Select] Fix keyboard navigation while rendering in shadow DOM (#47380) @xBlizZer
- [Select] Fix cannot pass certain event handlers (#47366) @ZeeshanTamboli
- [Slider] Accept readonly array for `marks` prop (#47370) @pcorpet
- [Snackbar] Avoid unnecessary `ownerState` spread into `useSnackbar` (#47373) @ZeeshanTamboli
- [TextField] Allow custom props in slot props via TS module augmentation (#47367) @kumarvishwajeettrivedi
- [Tabs] Fix Arrow key navigation failing when component is rendered in shadow DOM (#47178) @sai6855
- Fix typings for theme `applyStyles` with custom color schemes (#47242) @akankshahu

### @mui/system@7.3.6

- Fix unwanted attribute on DOM from InitColorSchemeScript `class` attribute (#47200) @siriwatknp

### @mui/lab@7.3.6

- [Masonry] Fix layout flicker and single column issue (#43903) @Fanzzzd

### Docs

- Fix default theme viewer styling (#47400) @sai6855
- Remove repetitive words (#47384) @rifeplight
- Fix link to Portal API docs (#47383) @ZeeshanTamboli
- Remove mentions of MUI Base from Material UI docs (#47324) @mapache-salvaje
- Update CSP guidance (#47342) @rossdakin
- Fix pathname collision in LLMs docs generator (#47209) @siriwatknp
- Resolve redirected urls to their final location (#47193) @Janpot
- Document correct default values for `elevation` and `square` props (#47261) @Ad1tya-007
- Fix display of colors in dark mode in palette customization page (#47403) @sai6855
- Add Number Field component page (#47165) @siriwatknp
- Fix mcp schema change (#47171) @sai6855

### Core

- [code-infra] Add types for markdown loader (#47075) @Janpot
- [code-infra] Build test utils with code-infra pipeline (#47405) @Janpot
- [code-infra] Vitest test migration (#44325) @JCQuintas
- [code-infra] Revive docs bundle analyzer (#47401) @Janpot
- [code-infra] Update tests from vitest PR (#47344) @Janpot
- [code-infra] Use util from code-infra to fetch changelogs (#47350) @brijeshb42
- [code-infra] Enable production sourcemaps (#47352) @Janpot
- [code-infra] Use code-infra orb utils in circle ci (#47179) @brijeshb42
- [code-infra] Use `next/font` for local fonts (#47351) @Janpot
- [code-infra] New broken links checker (#47113) @Janpot
- [code-infra] Remove profiler (#47258) @Janpot
- [code-infra] Api doc optimizations (#47188) @Janpot
- [code-infra] Increase type check parallelism (#47192) @Janpot
- [code-infra] Remove deprecated baseUrl (#47210) @Janpot
- [code-infra] Disable next.js cache (#47233) @Janpot
- [code-infra] release:build for bundle checker (#47207) @Janpot
- [code-infra] Parallelize module augmentation tests (#47208) @Janpot
- [code-infra] Fix next.js parallelism at 2 for macos runner (#47201) @Janpot
- [code-infra] Fix bash escape (#46969) @oliviertassinari
- [code-infra] Utilise eslint cache in CI (#47194) @Janpot
- [code-infra] Enable Next.js build cache to improve CI performance (#47176) @Copilot
- [code-infra] Remove `apps` folder (#47183) @Janpot
- [code-infra] Migrate everything to getStaticProps (#47152) @Janpot
- [docs-infra] Migrate to `next/font` (#47347) @Janpot
- [docs-infra] Add some `ComponentLinkHeader` bottom margin (#47328) @Janpot
- [docs-infra] Exclude a few pages from llms-txt (#47111) @Janpot
- [examples] Add missing .gitignore to NextJS App Router example (#47251) @shamblonaut
- [examples] Migrate Next.js `next.config.js` to `next.config.mjs` (#44040) @albarv340
- [internal] Remove leftover testing-library libraries from `mui-material` package (#47392) @ZeeshanTamboli
- [internal] Remove unnecessary `clean-css` package from docs (#47314) @ZeeshanTamboli
- [internal] Fix typo `buidApiDocs` -> `buildApiDocs` (#47235) @Ad1tya-007
- [internal] Remove unused `@vitest/browser` and `@vitest/coverage-v8` (#47189) @ZeeshanTamboli
- [test] Update e2e test app (#47252) @Ad1tya-007
- [test] Fix flaky Virtualize Autocomplete regression test (#47199) @ZeeshanTamboli

All contributors of this release in alphabetical order: @Ad1tya-007, @akankshahu, @albarv340, @Aleksan4e3, @brijeshb42, @Copilot, @Fanzzzd, @Janpot, @JCQuintas, @kumarvishwajeettrivedi, @mapache-salvaje, @oliviertassinari, @pcorpet, @rifeplight, @rithik56, @rossdakin, @sai6855, @shamblonaut, @siriwatknp, @vrachuri28, @xBlizZer, @ZeeshanTamboli

## 7.3.5

<!-- generated comparing v7.3.4..master -->

_Nov 4, 2025_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@7.3.5`

- [Collapse] Add slots and slotProps props (#47168) @sai6855
- [l10n] Add missing Catalan (ca-ES) locale (#47156) @frncesc
- Fix regression on `theme.vars.shape` module augmentation (#47164) @siriwatknp

### `@mui/material-nextjs@7.3.5`

- Support Next.js 16 (#47134) @siriwatknp

### Docs

- [Autocomplete] Update virtualization example to use react-window v2 (#47054) @sai6855
- [autocomplete] Add note about unique key extraction for duplicate labels (#47010) @PossiblyAShrub
- [Snackbar] Fix typo in docs (#47038) @sai6855
- [Transition] Fix horizontal scroll in SimpleFade demo in mobile screens (#47169) @sai6855
- Replace deprecated `inputProps` with `slotProps.input` in checkbox demos (#47083) @CODEKRUNCH

### Core

- [code-infra] gitignore next-env.d.ts (#47167) @Janpot
- [code-infra] Migrate versions page to getStaticProps (#47151) @Janpot
- [code-infra] Fix breaking change for ci publish (#47147) @brijeshb42
- [code-infra] Remove React import requirement for jsx (#47146) @brijeshb42
- [code-infra] Update vitest usage detection in `@mui/internal-test-utils` (#47141) @bernardobelchior
- [code-infra] Setup eslint-plugin-compat (#47133) @brijeshb42
- [code-infra] Filter out @mui/joy and @mui/base from search results (#47076) @Janpot
- [code-infra] Fix hotfix instructions (#47015) @Janpot
- [code-infra] Disable pigment regression tests (#47045) @Janpot
- [code-infra] Fix moderate dependabot issue (#46946) @Janpot
- [code-infra] Enable testing-library eslint rules (#47074) @brijeshb42
- [code-infra] Lint json through eslint (#47056) @Janpot
- [code-infra] Support custom npm dist tags during release (#47021) @Janpot
- [code-infra] Remove tsconfig `baseUrl` (#47044) @Janpot
- [code-infra] Centralize stylelint (#46955) @Janpot
- [code-infra] Remove legacy feedback (#46981) @Janpot
- [code-infra] Remove repo build scripts (#47036) @brijeshb42
- [code-infra] Publish docs from upstream (#47018) @Janpot
- [code-infra] Migrate `lodash` to `es-toolkit` (#46974) @sukvvon
- [docs-infra] Do not escape pipes (`|`) inside code blocks (#47139) @ZeeshanTamboli
- [docs-infra] Fix broken link targets (#47104) @Janpot
- [docs-infra] Fix broken link for DOMRect docs (#47106) @Janpot
- [docs-infra] Use published netlify cache plugin package (#47071) @brijeshb42
- [examples] Remove Next.js text from React Router example (#47055) @HeinrichFilter

All contributors of this release in alphabetical order: @bernardobelchior, @brijeshb42, @CODEKRUNCH, @frncesc, @HeinrichFilter, @Janpot, @PossiblyAShrub, @sai6855, @siriwatknp, @sukvvon, @ZeeshanTamboli

## 7.3.4

<!-- generated comparing v7.3.3..master -->

_Oct 2, 2025_

A big thanks to the 3 contributors who made this release possible. Here are some highlights ✨:

Small update to revert a change that broke the `<Tabs>` component. Also publishing a beta version of `@mui/lab` which was accidentally published as a stable release.

### `@mui/material@7.3.4`

- [Tabs] Revert "Fix not scrolling to correct tab after refresh when auto scrollable (#46869)" (#47014) @ZeeshanTamboli

### Docs

- Sort package manager automatically (#46897) @Janpot

### Core

- Bring @mui/lab back to unstable version (#47012) @Janpot
- Fix `ThemeOptions` and `createTheme*` cyclic dependency (#47007) @siriwatknp

All contributors of this release in alphabetical order: @Janpot, @siriwatknp, @ZeeshanTamboli

## 7.3.3

<!-- generated comparing v7.3.2..master -->

_Sep 30, 2025_

A big thanks to the 14 contributors who made this release possible.

### `@mui/material@7.3.3`

- [Autocomplete] Sync highlighted index when popup is opened (#46894) @ZeeshanTamboli
- [CircularProgress] Add track slot via enableTrackSlot (#46907) @monam2
- [locale] Split locales into separate files (#46933) @christopherschroer
- [Tabs] Fix not scrolling to correct tab after refresh when auto scrollable (#46869) @Jayesh-11

### Docs

- Add a guide for building extensible themes (#46896) @siriwatknp
- Add v7 community course to resources page (#46944) @alelthomas
- Improve performance of Default Theme Viewer (#46841) @sai6855
- Fix typo in blog component MainContent (#46868) @jonyen
- [Steppers] Replace TransitionProps with slotProps.transition (#46898) @sai6855

### Core

- [blog] Fix year in Punta Cana retreat post (#46943) @mapache-salvaje
- [blog] Punta Cana retreat post (#46892) @mapache-salvaje
- [code-infra] Publish from CI (#46851) @Janpot
- [code-infra] Convert reportBrokenLink script to ts (#47002) @brijeshb42
- [code-infra] Update module resolution for typescript@next (#46940) @Janpot
- [code-infra] Run continuous releases during ci-check (#46948) @Janpot
- [code-infra] Fix github actions check for continuous release (#46941) @Janpot
- [code-infra] Address high/critical dependabot reports (#46937) @Janpot
- [code-infra] Update ci.yml triggers (#46860) @Janpot
- [code-infra] Exact match for renovate file name (#46916) @Janpot
- [code-infra] Disable dependency update for `@material-ui/core` in codemod (#46899) @Janpot
- [code-infra] Transpile `assertion-error` in karma tests (#46909) @Janpot
- [code-infra] Disable browserstack on circleci cron jobs (#46905) @Janpot
- [code-infra] Remove `copy-files` command usage from packages (#46902) @brijeshb42
- [code-infra] Low-hanging ts conversion (#46903) @Janpot
- [code-infra] Bring batch of changes from vitest PR (#46795) @Janpot
- [code-infra] Remove dependency on `fs-extra` (#46755) @bernardobelchior
- [code-infra] Make error code extraction independent of build (#46865) @brijeshb42
- [docs-infra] Fix markdown generation script to find correct files (#46954) @siriwatknp
- [docs-infra] Fix unnecessary redirects (#46951) @Janpot
- [docs-infra] Remove `dangerouslySetInnerHTML` for ad description (#46936) @Janpot
- [docs-infra] Display "View as Markdown" only on Material UI (#46861) @siriwatknp
- [infra] Fix JSON files not being imported in TS demos (#47000) @bernardobelchior
- [infra] Turn `literal | (string & {})` to `PropTypes.string` (#46934) @siriwatknp
- [infra] Bump node.js version and make local usage strict (#46834) @brijeshb42
- [infra] Remove "main" fields from publishable packages (#46856) @brijeshb42
- [internal] Refactor `useForkRef` TS types: tighten `cleanupRef` and simplify ref typing (#46967) @wo-o29
- [internal] Fix naming to match convention (2099cb0) @oliviertassinari
- [internal] Fix naming to match convention (29aad62) @oliviertassinari
- [internal] Use same option as other repositories (eabda77) @oliviertassinari
- [internal] Normalize <meta name='viewport' (9d1922a) @oliviertassinari
- [internal] Normalize charset='utf-8' (f1aae00) @oliviertassinari
- [test] Split infinitive (0237fda) @oliviertassinari

All contributors of this release in alphabetical order: @alelthomas, @bernardobelchior, @brijeshb42, @christopherschroer, @Janpot, @Jayesh-11, @jonyen, @mapache-salvaje, @monam2, @oliviertassinari, @sai6855, @siriwatknp, @wo-o29, @ZeeshanTamboli

## 7.3.2

<!-- generated comparing v7.3.1..master -->

_Sep 1, 2025_

A big thanks to the 16 contributors who made this release possible.

### `@mui/material@7.3.2`

- [Chip] Remove unnecessary optional chaining from key event handlers (#46752) @ZeeshanTamboli
- [Drawer] Add dialog role and aria-modal for `temporary` variant (#46690) @Yashkanekar
- [PaginationItem] Add slot descriptions and default components in API documentation (#46677) @sai6855
- [utils] Remove duplicate isHostComponent function (#46721) @frontman-git

### `@mui/codemod@7.3.2`

- Add codemod to convert top-level to path imports (#46657) @neemski

### Docs

- Remove outdated Next.js lint command (#46847) @oliviertassinari
- Add `View as Markdown` to component link header (#46835) @siriwatknp
- Add a link to open `llms.txt` (#46832) @siriwatknp
- Fix typos in Material UI API docs (#46787) @noritaka1166
- Fix typo extra "to" word (#46783) @danpeleg4
- Remove past employees from about page (#46780) @Janpot
- Fix typos in `docs/pages` folder (#46761) @noritaka1166
- Add clarification on `react-is` resolution with Material UI v6 and v7 for React 18 and below (#46633) @alisasanib
- Fix typos in `joy` and `utils` package (#46713) @noritaka1166
- [autocomplete] Fix console in unstyled demo (#46804) @oliviertassinari
- [autocomplete] Fix Google Maps brand attribution (#46803) @oliviertassinari
- [autocomplete] Fix header sentence case (#46805) @oliviertassinari
- [autocomplete] Fix Google Maps demo (#46793) @oliviertassinari
- [Select] Fix labeling issues in grouped select demo (#46722) @mj12albert
- [table] Remove outdated unstyled section (#46786) @mj12albert
- [TextField] Add note about removal of `sizeMedium` class from InputLabel in v7 upgrade guide (#46693) @checcoux

### Core

- Update `cipher-base` transitive dependency (#46800) @Janpot
- [charts] Marked Treemap chart as Pro (#46691) @prakhargupta1
- [code-infra] Remove some csbci references (#46797) @Janpot
- [code-infra] update build tool (#46801) @Janpot
- [code-infra] Align pkg.pr.new with other projects (#46467) @Janpot
- [code-infra] Prepare for incoming `execa` update (#46781) @Janpot
- [code-infra] Remove `@mui/internal-babel-plugin-resolve-imports` override config (#46754) @ZeeshanTamboli
- [core] Fix typo in `docs/mui-vale` folder (#46760) @noritaka1166
- [core] Fix typos in `docs/data/material` folder (#46757) @noritaka1166
- [core] Fix typos in `netlify` folder (#46756) @noritaka1166
- [core] Upgrade brace-expansion (#46747) @oliviertassinari
- [core] Fix typos in Joy UI docs and `test` folder (#46738) @noritaka1166
- [core] Upgrade KaTeX (#46731) @oliviertassinari
- [core] Avoid Polynomial regex backtracking (#46732) @oliviertassinari
- [core] Remove dead @toolpad/core dependency (#46730) @oliviertassinari
- [core] Fix typos in `markdown` and `system` packages (#46720) @noritaka1166
- [core] Fix typos in `api-docs-builder` package (#46719) @noritaka1166
- [core] Fix typos in `codemod` package (#46715) @noritaka1166
- [core] pnpm prettier:all (#46685) @oliviertassinari
- [docs-infra] Set origin to generated `llms.txt` (#46833) @siriwatknp
- [docs-infra] Fix AbortController error (#46408) @oliviertassinari
- [docs-infra] Block than more feedback submissions (#46824) @oliviertassinari
- [docs-infra] Fix ESLint references (#46680) @oliviertassinari
- [infra] Migrate away from airbnb's eslint config (#46794) @brijeshb42
- [infra] Remove `fs-extra` from docs scripts (#46749) @bernardobelchior
- [infra] Remove dependency on `react-spring` (but keep `@react-spring/web`) (#46748) @bernardobelchior
- [infra] Remove `fs-extra` from `mui-icons-material` (#46745) @bernardobelchior
- [infra] Remove `api-docs-builder` dependency on `fs-extra` (#46742) @bernardobelchior
- [infra] Migrate build command to code-infra (#46614) @brijeshb42
- [infra] move testBuiltTypes step (#46735) @Janpot
- [infra] Remove `fs-extra` from `netlify-plugin-cache-docs` (#46740) @bernardobelchior
- [infra] Supply `document` to `userEvent.setup()` (#46714) @Janpot
- [infra] Remove useless test step (#46679) @Janpot
- [infra] Stagger daily cron jobs to avoid browserstack timeouts (#46676) @Janpot
- [internal] Improve useControlled() strict mode handling (#46807) @oliviertassinari
- [internal] Sentence case (55a9d8f) @oliviertassinari
- [internal] Fix typos in code comments (#46784) @noritaka1166
- [internal] Fix console regression in dev mode (925f02b) @oliviertassinari
- [internal] Prettier all if dependencies changes (1f63b03) @oliviertassinari
- [internal] Fix renovate.json (84be632) @oliviertassinari
- [internal] Polish renovate schedule (#46727) @oliviertassinari
- [internal] Update link to GitHub labels (8ab4813) @oliviertassinari
- [internal] Bump brace-expansion (06de338) @oliviertassinari
- [internal] Normalize Action description (4a2fbcb) @oliviertassinari
- [toolpad] Remove it from website and docs (#46595) @prakhargupta1

All contributors of this release in alphabetical order: @alisasanib, @bernardobelchior, @brijeshb42, @checcoux, @danpeleg4, @frontman-git, @Janpot, @mj12albert, @neemski, @noritaka1166, @oliviertassinari, @prakhargupta1, @sai6855, @siriwatknp, @Yashkanekar, @ZeeshanTamboli

## 7.3.1

<!-- generated comparing v7.3.0..master -->

_Aug 6, 2025_

A big thanks to the 2 contributors who made this release possible.

### `@mui/material@7.3.1`

- [PaginationItem] Fix inheritance of component (#46666) @sai6855
- [Select] Revert - Implement pointer cancellation PR 45789 (#46672) @ZeeshanTamboli

All contributors of this release in alphabetical order: @sai6855, @ZeeshanTamboli

## 7.3.0

<!-- generated comparing v7.2.0..master -->

_Aug 5, 2025_

A big thanks to the 24 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Shipped `nativeColor` feature that eliminates JS color manipulation and unlocks support for all modern color spaces (#43942) @siriwatknp!

  To learn more, check out the [Native Color](https://mui.com/material-ui/customization/css-theme-variables/native-color/) guide.

### `@mui/material@7.3.0`

- Support native color without JS manipulation (#43942) @siriwatknp
- [Accordion] Add `region` slot (#46659) @sai6855
- [SpeedDial] Fix navigation with arrow keys when slotProps.fab is defined (#46508) @sai6855
- [Select] Improve `MenuProps.slotProps` implementation (#46612) @ZeeshanTamboli
- [Select] Implement pointer cancellation (#45789) @Kartik-Murthy
- [Switch] Add role="switch" (#46482) @ZeeshanTamboli
- [Autocomplete] Fix auto highlight when options change but not the length (#46489) @yafeng-c

### `@mui/codemod@7.3.0`

- Fix `v5.0.0/top-level-imports` codemod changing color imports (#46405) @AidanLDev

### Docs

- Add JetBrains IDEs MCP configuration (#46470) @bernardobelchior
- Add warning to array spacing section (#46542) @cherniavskii
- Add MCP server installation details for Claude Code (#46621) @saschabratton
- Fix incorrect command for MCP Inspector in mcp.md (#46630) @EndiM
- Fix incorrect Typography override example for responsive styles (#46558) @aditi291soni
- Improve MCP docs (#46557) @siriwatknp
- Fix displaying of components in dark mode (#46544) @sai6855
- Generate `template` entries about documented generics (#46540) @LukasTy
- Use fixed dates for stable CRUD dashboard screenshots (#46546) @apedroferreira
- Add "Edit in Mui Chat" button on demos (#46480) @siriwatknp
- Fix Menu customization demo (#46535) @siriwatknp
- Add dashboard with CRUD template based on Toolpad Core (#46376) @apedroferreira
- Clarify `createTheme` warning for future compatibility (#46476) @satendra03
- Remove typo in `_redirects` (#46463) @bharatkashyap
- Change API docs to stay inside Material UI (#46414) @bharatkashyap
- [Dialog] Fix Form dialog demo's actions button padding (#46506) @frontman-git
- [SpeedDial] Remove deprecated props from demos (#46485) @sai6855
- [Switch] Use `slotProps.input` instead of deprecated `inputProps` for accessible controlled switch (#46625) @adiitxa

### Core

- Fix ESLint reference name (80d32a2) @oliviertassinari
- Fix ESLint reference name (5fc166e) @oliviertassinari
- Add `@base-ui-components/*` to env info (#46539) @Janpot
- Remove dead property from routes (#46534) @oliviertassinari
- Fix unpinned version regression (#46438) @oliviertassinari
- [code-infra] Accomodate build requirements from mui-x (#46551) @brijeshb42
- [code-infra] Extend renovate preset from infra repo (#46483) @brijeshb42
- [code-infra] Use flat ESLint config (#46258) @brijeshb42
- [docs-infra] Remove comment saving in G-sheet option (#46617) @alexfauquette
- [docs-infra] Move `Open in MUI Chat` to Demo toolbar and adjust styles (#46579) @siriwatknp
- [docs-infra] Fix codeblock issues (#46323) @atharva3333
- [docs-infra] Handle white spaces and generate either TS or JS demo for llms files (#46494) @siriwatknp
- [examples] Rename PopOverMenu.tsx file to match its usage (#46532) @rjray
- [infra] Fix `test_types_next`, `test_react_18`, `test_react_next` jobs (#46182) @Janpot
- [infra] Remove package.json `module` field (#46620) @Janpot
- [infra] Upgrade form-data to >4.0.4 (#46618) @Janpot
- [infra] Use cpu option only in CI (#46588) @Janpot
- [infra] Update scripts to delete publishConfig.directory (#46563) @brijeshb42
- [infra] Remove `transform-runtime` from `next/babel` (#46552) @Janpot
- [infra] Revert nx update (#46538) @Janpot
- [infra] Replace Argos script with code-infra CLI and update deps (#46475) @Janpot
- [infra] Update node group in renovate config (#46474) @Janpot
- [infra] Move @playwright/test to peer deps in @mui/internal-test-utils (#46459) @Janpot
- [infra] Add instructions for patch release (#46382) @mnajdova

All contributors of this release in alphabetical order: @adiitxa, @aditi291soni, @AidanLDev, @alexfauquette, @apedroferreira, @atharva3333, @bernardobelchior, @bharatkashyap, @brijeshb42, @cherniavskii, @EndiM, @frontman-git, @Janpot, @Kartik-Murthy, @LukasTy, @mnajdova, @oliviertassinari, @rjray, @sai6855, @saschabratton, @satendra03, @siriwatknp, @yafeng-c, @ZeeshanTamboli

## 7.2.0

<!-- generated comparing v7.1.1..master -->

_Jun 26, 2025_

A big thanks to the 17 contributors who made this release possible. Here are the highlights ✨:

- ⚡️ Added `modularCssLayers` theme option for splitting styles into multiple CSS layers (#46001) @siriwatknp.
- 📖 Added example for using Material UI with React Router v7 (#46406) @siriwatknp.

### `@mui/material@7.2.0`

- [Backdrop] Fix handling of `component` prop (#46269) @sai6855
- [Chip] Explicitly define line-height (#46260) @DiegoAndai
- [Chip] Fix handling on event handlers (#46263) @sai6855
- [OutlinedInput][Input] Deprecate composed classes (#46316) @sai6855
- [Select] Pass MenuProps.slotProps.list alongside MenuListProps (#46274) @scousino
- [l10] Enable `labelDisplayedRows` translation for Romanian (#46377) @dhu-redwoodtech
- Skip generating `modularCssLayers` CSS var (#46329) @siriwatknp

### `@mui/system@7.2.0`

- Add `modularCssLayers` theme flag to split styles into multiple CSS layers (#46001) @siriwatknp

### `@mui/styled-engine@7.2.0`

- Do not reuse the emotion cache across SSR requests (#46276) @robbtraister

### `@mui/codemod@7.2.0`

- [Dialog] Add codemod for deprecated props (#46328) @sai6855

### Docs

- Don't forward `hasAiSuggestion` (#46415) @bharatkashyap
- Add introduction to MCP (#46224) @bharatkashyap
- Fallback for searchbar during SSR (#46364) @Janpot
- Update InitColorSchemeScript options to match colorSchemeSelector (#46302) @humble-barnacle001
- Add `ListItemButton` to make the deprecation clear (#46356) @siriwatknp
- Remove "Unstyled" section from component docs (#46272) @mapache-salvaje
- Add Testing section to Rating component doc (#46268) @0210shivam
- Fix fade modal demo (#46271) @brijeshb42
- [ai] Add suggestions to edit with MUI Chat (#46309) @bharatkashyap
- [Dialog] Fix form dialog uses ARIA roles on incompatible elements (#46307) @ZeeshanTamboli
- [Menu] Fix dark mode styling of grouped header demo (#46317) @sai6855
- [TextField] Removed type="number" demos (#46314) @KirankumarAmbati
- [examples] Add `material-ui-react-router-ts` example (#46406) @siriwatknp

### Core

- pnpm docs:sync-team (3641a0b) @oliviertassinari
- Add cross-env to ESLint script (#46358) @ZeeshanTamboli
- Support merging of className and style from theme (#45975) @sai6855
- [code-infra] Create bundle size package (#45911) @Janpot
- [docs-infra] Add a script to generate Material UI `llms.txt` and docs markdown. (#46308) @siriwatknp
- [docs-infra] Fix StackBlitz for js projects (#46220) @Janpot
- [infra] Add emotion as external for bundle monitor (#46372) @Janpot
- [infra] Create update PR on every canary publish for internal packages (#46367) @Janpot
- [infra] Remove deprecated esmExternals (#46365) @Janpot
- [infra] Support project-specific changelog in build scripts (#46425) @michaldudak
- [toolpad][website] Remove references to Toolpad (#46311) @prakhargupta1

All contributors of this release in alphabetical order: @0210shivam, @bharatkashyap, @brijeshb42, @dhu-redwoodtech, @DiegoAndai, @humble-barnacle001, @Janpot, @KirankumarAmbati, @mapache-salvaje, @michaldudak, @oliviertassinari, @prakhargupta1, @robbtraister, @sai6855, @scousino, @siriwatknp, @ZeeshanTamboli

## 7.1.2

_Jun 18, 2025_

A big thanks to the 2 contributors who made this release possible.

### `@mui/material@7.1.2`

- [Chip] Fix handling on event handlers (#46263) @sai6855

### Docs

- Fix fade modal demo (#46271) @brijeshb42

All contributors of this release in alphabetical order: @brijeshb42, @sai6855

## 7.1.1

<!-- generated comparing v7.1.0..master -->

_May 30, 2025_

A big thanks to the 15 contributors who made this release possible.

### `@mui/material@7.1.1`

- [Autocomplete] Fix label shrink issue when `renderValue` is used with empty array in multiple mode (#46047) @ZeeshanTamboli
- [Autocomplete] Prevent `renderValue` from being skipped when value is 0 (#46145) @LakshitAgarwal
- [Autocomplete] Add note in JSDoc for non-TextField components in `renderInput` (#46141) @khllbnomrn
- [Chip] Add slots and slotProps (#46098) @sai6855
- [Menu] Remove depreacted `MenuListProps` from demos (#46144) @sai6855
- [TablePaginationActions] Export TablePaginationActions as new component (#46149) @sai6855
- [SnackbarContent] Fix `square` prop not working (#46196) @0210shivam
- [SnackbarContent] Fix error when theme value is CSS variable (#46198) @0210shivam

### `@mui/codemod@7.1.1`

- Add package name option (#45977) @siriwatknp

### `@mui/system@7.1.1`

- Skip styled component from being transformed (#46129) @siriwatknp
- Update the type for borderRadius (#46154) @codiini

### `@mui/styled-engine@7.1.1`

- Fix variant props callback type to spread `ownerState` (#46187) @siriwatknp

### `@mui/stylis-plugin-rtl@7.1.1`

- Fix RTL does not work with CSS layer with a new package (#46230) @siriwatknp

### Docs

- [Dialog] Remove deprecated TransitionComponent from demo (#46185) @sai6855
- [Grid] Remove direction `column` and `column-reverse` from the demo (#46127) @0210shivam
- [Grid] Update grid migration guide (#46057) @sai6855
- [templates] Fix rendering of logos in dark mode (#46221) @sai6855
- [ToggleButtonGroup] Add spacing demo (#46058) @sai6855
- Fix typo in dark mode docs (#46229) @ZeeshanTamboli
- Clarify Next.js + Tailwind CSS v3 integration requirements (#46176) @chaitanyasharma1011
- Fix GridLegacy docs order (#46135) @oliviertassinari
- Update upgrade guide for resolution of `react-is` (#46002) @siriwatknp
- Remove oudated scaffoldhub ad (#46090) @oliviertassinari
- Show how to target global state classes with CSS Modules (#45992) @RubemMazzetto

### Core

- [code-infra] Add plugin to check for index file access (#46178) @Janpot
- [code-infra] Bump ESLint to v9 (#46222) @brijeshb42
- [code-infra] Move packages to mui/mui-public (#46155) @Janpot
- [code-infra] Move `chai` to peerDep (#46227) @JCQuintas
- [code-infra] Avoid loading barrel file during type checking (#46177) @Janpot
- [code-infra] Remove unnecessary ref from `HighlightedCode` component (#46151) @ZeeshanTamboli
- [code-infra] Import mocha type instead of global (#46108) @JCQuintas
- [code-infra] Dependabot also create branches (795a481) @oliviertassinari
- [code-infra] Avoid running continuous release on forks (#46103) @Janpot
- [code-infra] Remove checkout job altogether (#46100) @Janpot
- [code-infra] Remove required checkout workflows in circleci (#46099) @Janpot
- Run pnpm docs:sync-team (c8f1da5) @oliviertassinari
- Upgrade MUI X packages to v8 (#45990) @KenanYusuf
- Minor detail to reduce confusion (4c64b72) @oliviertassinari
- Update security.md (#45839) @DiegoAndai
- Apply yml convention, blank line only at top level (f273220) @oliviertassinari
- Add comment that lab should be in alpha (#45999) @oliviertassinari

All contributors of this release in alphabetical order: @0210shivam, @brijeshb42, @chaitanyasharma1011, @codiini, @DiegoAndai, @Janpot, @JCQuintas, @KenanYusuf, @khllbnomrn, @LakshitAgarwal, @oliviertassinari, @RubemMazzetto, @sai6855, @siriwatknp, @ZeeshanTamboli

## 7.1.0

<!-- generated comparing v7.0.2..master -->

_May 6, 2025_

A big thanks to the 21 contributors who made this release possible. Here are some highlights ✨:

- 🎉 Material UI now works with **Tailwind CSS v4**! Check out the [setup guide](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/).

### `@mui/material@7.1.0`

- [InputBase] Text cursor jumps several lines up when inserting text fragment with new line at the end (#45246) @yermartee
- [OutlinedInput] Add missing `notchedOutline` slot (#45917) @siriwatknp
- [Snackbar] Skip default `onClickAway` behavior when `defaultMuiPrevented` is provided (#45629) @sai6855
- [Avatar] Fix img slot types and add missing slots (#45483) @siriwatknp
- [Badge] Replace useSlotProps with useSlot hook (#45871) @sai6855
- [BottomNavigationAction] Add slots and slotProps (#45776) @sai6855
- [CardActionArea] Add slots and slotProps (#45866) @sai6855
- [useMediaQuery] Add warning and docs for using `useMediaQuery('print')` (#44790) @good-jinu
- Remove unnecessary clsx usages (#46084) @sai6855
- Corrected generic type definition in `SelectChangeEvent` (#45941) @SuyashShukla0007
- Fix theme object changes between renders (#45863) @siriwatknp

### `@mui/material-nextjs@7.1.0`

- Add option to enable CSS layers for pages router (#45596) @siriwatknp
- Do not wrap `@layer` order rules in App Router (#45864) @Nayeem-XTREME

### `@mui/system@7.1.0`

- Fix `@mui/system` types organization (#45860) @Janpot

### `@mui/styled-engine@7.1.0`

- Infer `ownerState` from props in `styled` (#46083) @siriwatknp
- Fix style overrides variants type (#45478) @siriwatknp

### Docs

- [Avatar] Add avatar upload demo (#45986) @Demianeen
- [Dialog] Remove deprecated props usage in demos (#45923) @sai6855
- [Menu] Update `paper` slot JSDoc default from `Paper` to `PopoverPaper` (#45722) @andreachiera
- [examples] Remove create-react-app usages (#45426) @CodeLeom
- Add `AccordionSummary` to the v5 breaking change migration (#45947) @siriwatknp
- Update CSS variable usage in migration guide for Pigment CSS (#46033) @sai6855
- Fix docs API dark mode color (#46086) @alexfauquette
- Add a guide for extending Material UI classes in Tailwind CSS (#46039) @siriwatknp
- Add `InitColorSchemeScript` docs and API (#45927) @siriwatknp
- Add Tailwind CSS v4 integration guide (#45906) @siriwatknp
- Fix 301 links to the system v6 (#45931) @oliviertassinari
- Add notification for MUI X v8 announcement (#45942) @joserodolfofreitas
- Fix som 301 redirections (ae84b35) @oliviertassinari
- Fix some 301 redirections (057384e) @oliviertassinari
- Fix logo is not centered on small screens (#45920) @crabsim
- Fix line break typo (a2a62d5) @oliviertassinari
- Fix markdown typo in templates.md (#45914) @scyzoryck
- Add Next.js App Router guide for custom classnames (#45852) @siriwatknp

### Core

- [code-infra] Give a stable name to dev tool app (3889ded) @oliviertassinari
- [code-infra] Normalize author package in org (8135638) @oliviertassinari
- [code-infra] Correct some manually curated .d.ts files (#46054) @Janpot
- [code-infra] Align deps versions (#46048) @Janpot
- [code-infra] Fix dynamic import in imports resolver (#46046) @Janpot
- [code-infra] Eliminate `@mui/utils` deep imports (#46004) @Janpot
- [code-infra] Expand renovate.json for react types (#45935) @Janpot
- [code-infra] Make Argos upload script reusable (#45883) @Janpot
- [code-infra] Disallow redundant window prefixes for globals (#45880) @Janpot
- [code-infra] Remove type generation of modern build (#45912) @Janpot
- [code-infra] Clean up bundle size checker (#45622) @Janpot
- [code-infra] Fix `StrictMode` effects not being called twice in React 19 tests (#45812) @bernardobelchior
- [code-infra] Convert `@mui/utils` to typescript (#45671) @Janpot
- [docs-infra] Improve export into sandbox package.json (#46044) @oliviertassinari
- [docs-infra] Update feedback Node.js to v22 (#46064) @oliviertassinari
- [docs-infra] Normalize netlify.toml in org (b101d5c) @oliviertassinari
- [docs-infra] Uniformize Vale between repositories (0f79796) @oliviertassinari
- [docs-infra] Fix Vale no longer working (#46029) @oliviertassinari
- [docs-infra] Remove demo styling switch (#45926) @Janpot
- [docs-infra] StackBlitz WebContainer demos (#45924) @Janpot
- [docs-infra] Fix feedback management (#45872) @alexfauquette
- [test] Replace `playwright` with `@playwright/test` (#45998) @ZeeshanTamboli
- Fix internal version duplication (#46051) @oliviertassinari
- Avoid the need for `@mui/material/themeCssVarsAugmentation` (#46053) @Janpot
- Add security label to dependabot PRs (0a5c027) @oliviertassinari
- Remove unecessary versions (#46034) @oliviertassinari
- Remove redundant overrides resolver (#45970) @romgrk
- Fix duplicate branch reference (#45915) @oliviertassinari
- Fix outdated <link rel="shortcut icon" (#45916) @oliviertassinari
- Fix redirection chains (#45930) @oliviertassinari
- Run pnpm docs:sync-team (beee09f) @oliviertassinari
- Add `pkg.pr.new` publishing (#42984) @Aslemammad
- Remove @mui/base from the master branch (#45857) @mnajdova

All contributors of this release in alphabetical order: @alexfauquette, @andreachiera, @Aslemammad, @bernardobelchior, @CodeLeom, @crabsim, @Demianeen, @good-jinu, @Janpot, @joserodolfofreitas, @mnajdova, @Nayeem-XTREME, @oliviertassinari, @renovate[bot], @romgrk, @sai6855, @scyzoryck, @siriwatknp, @SuyashShukla0007, @yermartee, @ZeeshanTamboli

## 7.0.2

_Apr 9, 2025_

A big thanks to the 12 contributors who made this release possible.

### `@mui/material@7.0.2`

- [Autocomplete] Add ability to render custom single value (#45387) @ZeeshanTamboli
- [Autocomplete] Prevent shrink animation in controlled Autocomplete when initial `value` is provided (#45734) @imadx
- [AvatarGroup] Fix `spacing` prop ignoring value `0` (#45799) @Kartik-Murthy
- [Dialog] Deprecate composed classes (#45418) @sai6855

### `@mui/material-nextjs@7.0.2`

- Fix nonce issues (#45794) @Janpot
- Add warnings to nextjs router integration (#45778) @Janpot

### `@mui/styled-engine@7.0.2`

- Added caching to `StyledEngineProvider` to improve performance for running tests with Jest (#45846) @siriwatknp

### Core

- [blog] Improve upvote video (0646444) @oliviertassinari
- [code-infra] Remove webpack aliases (#45841) @Janpot
- [code-infra] Remove .tsbuildinfo from build folder (#45727) @Janpot
- [code-infra] Stabilize theme viewer screenshot tests (#45768) @Janpot
- [code-infra] Remove modern bundles (#45808) @Janpot
- Update buildTypes script to optionally remove css imports (#45835) @brijeshb42
- Allow repo to be accepted as an argument for releaseTag (#45801) @brijeshb42
- Update scripts to support base-ui (#45784) @brijeshb42
- Sync scorecards.yml across codebase (4de5076) @oliviertassinari
- Remove baseUrl and skipLibCheck (#45806) @Janpot
- [docs-infra] Fix redirect styles pages (#45848) @siriwatknp
- [docs-infra] Remove false-positive Vale rules (#45843) @oliviertassinari
- [docs-infra] Make sure Next.js can find package.json through its aliases (#45840) @Janpot
- [docs-infra] Fix Next.js brand name coverage (6915f8d) @oliviertassinari
- [docs-infra] Fix layout shift between MIT and commercial pages (#45760) @oliviertassinari
- [docs-infra] Non breaking space for ESM (#45758) @oliviertassinari
- [support-infra] Remove dead 'workflow_call:' (#45736) @oliviertassinari
- [utils] Support cleanup callbacks in useForkRef (#45621) @DiegoAndai

### Docs

- Fix pigment vite integration example (#44746) @brijeshb42
- Update migration instructions and codemod references for deprecated APIs (#45793) @sai6855
- Add TanStack Router routing example (#44930) @vetledv
- Fix layout shifting in icons page (#45779) @sai6855
- Fix migration instructions (#45762) @oliviertassinari
- Fix wrong TypeScript support version (#45761) @oliviertassinari
- Fix link to mui-joy/src/styles/components.d.ts (#45763) @oliviertassinari
- Fix 301 link (ae94c40) @oliviertassinari
- Fix 301 links (abd8f63) @oliviertassinari
- Fix 301 redirection (c7658de) @oliviertassinari
- [nextjs] Migrate from deprecated "legacyBehavior" prop (#44871) @oliviertassinari
- [nextjs] Document CSP for Next.js Pages Router (#45798) @Grohden

All contributors of this release in alphabetical order: @brijeshb42, @DiegoAndai, @Grohden, @imadx, @Janpot, @Kartik-Murthy, @oliviertassinari, @renovate[bot], @sai6855, @siriwatknp, @vetledv, @ZeeshanTamboli

## 7.0.1

<!-- generated comparing v7.0.0..master -->

_Mar 28, 2025_

A big thanks to the 7 contributors who made this release possible.

### `@mui/material@7.0.1`

- Export ThemeProviderProps (#45701) @aarongarciah
- [Fab] Fix default variant text color when using CSS vars (#45714) @aarongarciah
- Remove mention of v7 in deprecation messages (#45708) @DiegoAndai
- [Popover] Allow `null` in `anchorEl` function return type (#45045) @eduter
- Fix missing CSSProperties/MixinOptions types (#45706) @Janpot

### `@mui/icons-material@7.0.1`

- [code-infra] Fix icon-material type resolution under `moduleResolution: "node"` (#45704) @Janpot
- Bring back individual icon dts (#45711) @Janpot

### Core

- Improve the release instructions (#45688) @mnajdova

### Docs

- Fix Masonry and Toolpad dark mode demos (#45721) @siriwatknp
- Update v7 related copy (#45716) @aarongarciah
- Avoid unwanted undefined in page title (#45718) @aarongarciah
- Fix joy templates error (#45715) @siriwatknp
- Rename GitHub icon import (#45709) @micttyoid
- Fix Safari issue in dark mode (#45696) @mnajdova
- Fix `Grid`, `GridLegacy`, `Stack`, `Badge`, `Select`, `Autocomplete` demos CSS variables (#45693) @DiegoAndai
- Add "Material UI v7 is here" to the notifications (#45694) @DiegoAndai
- Fix `Breadcrumbs`, `List`, `Divider`, and `Typography` dark mode demos (#45692) @siriwatknp
- Fix Material Icons page in dark mode (#45691) @mnajdova

All contributors of this release in alphabetical order: @aarongarciah, @DiegoAndai, @eduter, @Janpot, @micttyoid, @mnajdova, @siriwatknp

## 7.0.0

<!-- generated comparing v7.0.0-rc.0..master -->

_Mar 26, 2025_

🎉 We're happy to announce the stable release of v7.

- Read the [blog post](https://mui.com/blog/material-ui-v7-is-here/) about the announcement.
- Check out the [v7 upgrade guide](https://mui.com/material-ui/migration/upgrade-to-v7/).

### `@mui/material@7.0.0`

- [Autocomplete] Fix when `onHighlightChange` is called (#45438) @ZeeshanTamboli
- [Tabs] Fix modifier keys + Left/Right Arrow key from being consumed by tab navigation (#45345) @mushfiqbh
- Update minimum TypeScript support to 4.9 (#45535) @siriwatknp

### `@mui/system@7.0.0`

- [system] Fix palette mode does not change when not using CSS vars (#45660) @siriwatknp

### `@mui/lab@7.0.0-beta.9`

- [lab] Remove @mui/base dependency (#45602) @mnajdova

### Docs

- [docs] Fix unnecessary redirects for v7 (#45677) @Janpot
- [docs] Fix new React project link, CRA deprecated (#45362) @oliviertassinari
- [docs] Prepare the v7 upgrade guide for stable release (#45624) @DiegoAndai
- [docs] Fix grammatical errors in support.md (#45631) @letianpailove
- [docs] Update nextjs font optimization guide (#45600) @IshfaqAhmedProg
- [docs] Deprecate Toolpad Studio (#45613) @Janpot
- [docs] Sync the mode from page to demos #45661 @siriwatknp

### Core

- [blog] v7 stable release (#45623) @DiegoAndai
- [code-infra] Disable flaky masonry screenshot (#45678) @Janpot
- [code-infra] Migrate regression tests to vite (#44964) @Janpot
- [code-infra] Update rollup (#45666) @Janpot
- [code-infra] Support `React.ComponentType` in proptypes generation (#45664) @Janpot
- [code-infra] Ensure `translations.json` is present in all `@mui/docs` package builds (#45626) @LukasTy
- [code-infra] Improve Argos script debuggability (#45619) @Janpot
- [code-infra] Reconfigure `react-remove-properties` babel plugin (#45218) @Janpot
- [core] Prepare master for v7 stable (#45674) @DiegoAndai
- [core] Improve instructions on changing domain (#45637) @mnajdova
- [core] Deprecate `ponyfillGlobal` (#45606) @Janpot
- [docs-infra] Restructure docs theme context to CSS variables (#45386) @siriwatknp
- [styles] Remove code & docs (#45633) @mnajdova

All contributors of this release in alphabetical order: @DiegoAndai, @IshfaqAhmedProg, @Janpot, @letianpailove, @LukasTy, @mnajdova, @mushfiqbh, @oliviertassinari, @siriwatknp, @ZeeshanTamboli

## 7.0.0-rc.0

<!-- generated comparing v7.0.0-beta.4..master -->

_Mar 18, 2025_

A big thanks to the 4 contributors who made this release possible.

### `@mui/material@7.0.0-rc.0`

- [StepLabel] Add missing root slot (#45603) @sai6855
- [Switch] Add slots and slotProps (#45595) @siriwatknp
- [utils] Add merging function to `mergeSlotProps` utility (#45543) @siriwatknp

### Core

- [blog] Clarify the difference between the two Pro plans (#45266) @oliviertassinari
- [code-infra] Allow specifying a custom error formatter module for error minifcation (#45291) @Janpot
- [code-infra] Make `getVersionEnvVariables` reusable for other repos (#45562) @Janpot
- [code-infra] Update peer dependency of `@mui/utils` in `@mui/docs` (#45561) @Janpot
- Add StackBlitz template to issue template (#45504) @Janpot

All contributors of this release in alphabetical order: @Janpot, @oliviertassinari, @sai6855, @siriwatknp

## 7.0.0-beta.4

<!-- generated comparing v7.0.0-beta.3..master -->

_Mar 13, 2025_

A big thanks to the 10 contributors who made this release possible.
This release contains bug fixes 🐛 and improvements to the new package layout 🏗️.

### `@mui/material@7.0.0-beta.4`

- [Accordion] Add missing `root` slot (#45532) @sai6855
- [AccordionSummary] Add slots and slotProps (#45559) @sai6855
- [ListItemText] Add missing `root` slot (#45540) @sai6855
- [SpeedDial] Add missing `root` slot (#45541) @sai6855
- [Tooltip] Allow auto placement on tooltip (#45399) @Jtaks
- [useScrollTrigger] Do nothing if target is null (#45441) @vipierozan99
- [TextareaAutosize] Fix ResizeObserver causing infinite `selectionchange` loop (#45351) @mj12albert
- Fix negative input for CSS variables spacing array (#45550) @siriwatknp
- Add missing deprecations in deprecations-all file (#45505) @sai6855
- Rename some `@mui/material/styles/createTypography` exports (#45558) @Janpot

### `@mui/icons-material@7.0.0-beta.4`

- Remove unused icon names from the download script (#45453) @yermartee

### `@mui/system@7.0.0-beta.4`

- Prevent nested non-vars theme inheritance (#45545) @siriwatknp
- Disable theme recalculation as default behavior (#45405) @siriwatknp
- Fix package layout inconsistencies (#45491) @DiegoAndai

### `@mui/styled-engine@7.0.0-beta.4`

- Add `enableCssLayer` prop to StyledEngineProvider (#45428) @siriwatknp

### `@mui/types@7.3.0`

- [code-infra] Fix type resolution for @mui/types (#45513) @Janpot

### `@mui/utils@7.0.0-beta.4`

- Fix package layout inconsistencies (#45491) @DiegoAndai
- Use correct iri-reference homepage format (#45472) @dahiro

### Docs

- [Backdrop] Fix component name in migration guide (#45506) @sai6855
- [TextField] Add HTML input section to TextField page (#45439) @siriwatknp

### Core

- [code-infra] Convert a few docs modules to ts (#45548) @Janpot
- [code-infra] Remove more CJS modules from the docs (#45557) @Janpot
- [code-infra] Remove nested imports from theme augmentation (#45514) @Janpot
- [docs-infra] Add @ts-ignore to avoid type checking for MUI X (#45555) @siriwatknp
- [blog] Fix author end-of-year updates (#45533) @oliviertassinari

All contributors of this release in alphabetical order: @dahiro, @DiegoAndai, @Janpot, @Jtaks, @mj12albert, @oliviertassinari, @sai6855, @siriwatknp, @vipierozan99, @yermartee

## 7.0.0-beta.3

<!-- generated comparing v7.0.0-beta.2..master -->

_Mar 5, 2025_

A big thanks to the 3 contributors who made this release possible.

### `@mui/material@7.0.0-beta.3`

- Fix moduleResolution:node for icons (#45444) @Janpot
- [ThemeProvider] Add `storageManager` prop to `ThemeProvider` (#45136) @siriwatknp
- [Radio] Fix `inputProps` not forwarded (#45471) @siriwatknp

### `@mui/codemod@7.0.0-beta.3`

- [codemod] Fix codemods not found (#45473) @DiegoAndai

All contributors of this release in alphabetical order: @DiegoAndai, @Janpot, @siriwatknp

## 7.0.0-beta.2

<!-- generated comparing v7.0.0-beta.1..master -->

_Feb 27, 2025_

A big thanks to the 2 contributors who made this release possible.

### Core

- [code-infra] Add package.json export (#45433) @Janpot
- [blog] React 19 migration for MUI X (#45348) @arminmeh

All contributors of this release in alphabetical order: @arminmeh, @Janpot

## 7.0.0-beta.1

<!-- generated comparing v7.0.0-beta.0..master -->

_Feb 27, 2025_

This release fixes incorrect build output from the previous release (`beta.0`).

### Core

- [code-infra] Fix build:types script omitting folders with a dot in their name (#45422) @Janpot
- [release] Fix versions (#45420) @mj12albert

All contributors of this release in alphabetical order: @Janpot, @mj12albert

## 7.0.0-beta.0

<!-- generated comparing v7.0.0-alpha.2..master -->

_Feb 26, 2025_

A big thanks to the 8 contributors who made this release possible.

### `@mui/material@7.0.0-beta.0`

- [Modal][Dialog] Remove deprecated `onBackdropClick` (#45395) @DiegoAndai
- [Grid] Improve Grid2 upgrade experience (#45304) @DiegoAndai
- [Grid] Rename to GridLegacy (#45363) @DiegoAndai
- [Grid2] Rename to Grid (#45381) @DiegoAndai
- Remove SvgIcon data-testid in production (#45333) @Janpot
- Allow nested theme creation with `vars` (#45335) @siriwatknp
- [Rating] Deprecate \*Props and complete `slots`, `slotProps` (#45295) @harry-whorlow
- [Slider] Fix css class selector in migration guide (#45402) @sai6855
- [Slider] Fix spacings in .md files (#45388) @sai6855
- [styles] Remove deprecated exports (#45397) @DiegoAndai
- [Menu] Deprecate \*Props and complete `slots`, `slotProps` (#44913) @siriwatknp
- [StepButton] Remove StepIconButton type (#45396) @DiegoAndai

### Docs

- [Autocomplete] Remove unnecessary renderTags prop from Sizes demo (#45401) @ZeeshanTamboli
- Add `overriding-component-structure` doc to Material UI (#45186) @siriwatknp
- Fix typo in slider docs (#45390) @sai6855
- Fix Context Menu selection lost on Safari (#44903) @NooBat

### Core

- [code-infra] Fix types for @mui/styled-engine (#45413) @Janpot
- [docs-infra] Fix theme toggle call (#45400) @siriwatknp
- [docs-infra] Add `color-scheme` to document in iframe demos (#45406) @KenanYusuf
- [docs-infra] Revert to use deprecated `CssVarsProvider` for MUI X (#45371) @siriwatknp
- [docs-infra] Fix dark mode flicker for API pages (#45354) @siriwatknp
- [examples] Remove unnecessary comma in Material UI Vite JS example (#45370) @ZeeshanTamboli
- [test] Remove unused renderTags prop and fix key warning in Autocomplete regression test (#45410) @ZeeshanTamboli

All contributors of this release in alphabetical order: @DiegoAndai, @harry-whorlow, @Janpot, @KenanYusuf, @NooBat, @sai6855, @siriwatknp, @ZeeshanTamboli

## 7.0.0-alpha.2

<!-- generated comparing v7.0.0-alpha.1..master -->

_Feb 18, 2025_

A big thanks to the 9 contributors who made this release possible.

### `@mui/material@7.0.0-alpha.2`

- [Autocomplete] Remove legacy `aria-owns` attribute for combobox (#45302) @ZeeshanTamboli
- [Button] Apply id only if loading indicator is present (#45296) @aarongarciah
- [Hidden] Remove deprecated Hidden component (#45283) @DiegoAndai
- [InputBase] Deprecate composed classes (#45234) @sai6855
- [InputLabel] Changed size prop value from `normal` to `medium` (#45235) @perkrlsn
- Fix `slotProps.transition` types (#45214) @siriwatknp

### Docs

- Fix broken links to MUI X docs (#45145) @mapache-salvaje
- Add migration guide for package layout changes (#45222) @Janpot
- [icons] Fix typo in material-icons.md (#45334) @a-s-russo

### Core

- Disallow access to esm/modern barrel files (#45332) @Janpot
- [code-infra] Update `elliptic` (#45311) @Janpot
- Update release guide to specify package bumping rules (#45294) @DiegoAndai

All contributors of this release in alphabetical order: @a-s-russo, @aarongarciah, @DiegoAndai, @Janpot, @mapache-salvaje, @perkrlsn, @sai6855, @siriwatknp, @ZeeshanTamboli

## 7.0.0-alpha.1

<!-- generated comparing v7.0.0-alpha.0..master -->

_Feb 11, 2025_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@7.0.0-alpha.1`

- [Checkbox] Add slots and slotProps (#44974) @sai6855
- [LinearProgress][CircularProgress] Add variant overrides for module augumentation (#45163) @kingflamez
- [Drawer] Deprecate \*Props and complete `slots`, `slotProps` (#44960) @siriwatknp
- Fix wrong `slotProps` of `DetailsHTMLAttributes` types (#45215) @siriwatknp
- [MobileStepper] deprecate `LinearProgressProps` and complete `slots`, `slotProps` (#45033) @siriwatknp
- [Radio] Add slots and slotProps (#44972) @sai6855
- [Radio] Remove empty line (#45184) @sai6855
- [Slider] Deprecate composed classes (#45201) @sai6855
- [Snackbar] Fix generated proptypes (#45156) @siriwatknp
- [SpeedDialAction] Add slots and slotProps (#45065) @sai6855
- [SwitchBase] Fix spreading of `handlers` in getSlotProps (#45197) @sai6855
- [Tabs] Deprecate \*Props and complete `slots`, `slotProps` (#45012) @siriwatknp
- [TextField] Remove deprecated props from documentation (#45199) @sai6855

### `@mui/icons-material@7.0.0-alpha.1`

- Change icon source URL and add overrides (#45020) @siriwatknp

### `@mui/lab@7.0.0-beta.1`

- Remove components which were moved from lab to material (#45232) @DiegoAndai

### Docs

- [Autocomplete] Improve Google Maps search example (#44708) @oliviertassinari
- [Dialog] Removes deprecated PaperProps from docs (#45195) @sai6855
- [Menu] Add Grouped Menu demo (#45241) @noobDev31
- [material] Add disableInteractive on colorTool grid Tooltips (#37800) @Janpot
- [blog] Consistent Base UI terminology (#45264) @oliviertassinari
- A quick first step to update docs for Tailwind v4 (#45147) @oliviertassinari
- Fix `element.ref` accessing warning on docs (#45155) @DiegoAndai
- Mention Toolpad as experimental (#45273) @prakhargupta1
- [joy-ui] Update "Set up providers" section of integration with Material UI (#45183) @mateuseap

### Core

- Update branch switch tags (#45198) @DiegoAndai
- Fix double redirection to Base UI (#45146) @oliviertassinari
- Fix corepack and pnpm installation in CircleCI (#45185) @mj12albert
- Fix typo on Netlify script (#45278) @maximevtush
- [code-infra] Fix testing library resolution with custom react (#44061) @Janpot
- [code-infra] Update package layout for better ESM support (#43264) @Janpot
- Update `@typescript-eslint/*` packages and remove deprecated `eslint-config-airbnb-typescript` package (#45245) @ZeeshanTamboli
- [docs] Restore utility component docs from MUI Base to Material UI (#45213) @mapache-salvaje
- [docs] Sync active sponsors (#45204) @oliviertassinari
- [docs] Fix links in CONTRIBUTING.md (#45202) @bernardobelchior
- [docs-infra] Point to MUI X next docs (#45207) @cherniavskii
- [test] Fix React 18 tests (#45161) @DiegoAndai

All contributors of this release in alphabetical order: @bernardobelchior, @cherniavskii, @DiegoAndai, @Janpot, @kingflamez, @mapache-salvaje, @mateuseap, @maximevtush, @mj12albert, @noobDev31, @oliviertassinari, @prakhargupta1, @sai6855, @siriwatknp, @ZeeshanTamboli

## 7.0.0-alpha.0

<!-- generated comparing v6.4.1..master -->

_Jan 31, 2025_

A big thanks to the 9 contributors who made this release possible.
This is the first alpha release of Material UI v7 🎉.

### `@mui/material@7.0.0-alpha.0`

- [Autocomplete] Prevent shrink animation in uncontrolled Autocomplete when default value is set (#44873) @ZeeshanTamboli
- [Popover] Deprecate \*Props and complete `slots`, `slotProps` (#45035) @siriwatknp
- [Slider] Fix arrow keys past the end for Slider with custom marks (#45050) @joshkel
- [SwitchBase] Deprecate `inputProps` and complete slots, slotProps (#45076) @siriwatknp
- [TextareaAutosize] Temporarily disconnect ResizeObserver to avoid loop error (#44540) @mj12albert
- [Slider] Narrow onChange value type (#44777) @good-jinu
- [Snackbar] Add Slots and SlotProps (#45103) @harry-whorlow

### `@mui/utils@7.0.0-alpha.0`

- Merge `sx` instead of override when using `mergeSlotProps` (#45062) @siriwatknp

### Core

- [code-infra] a few fixes uncovered during ESM updates (#45031) @Janpot
- [code-infra] Remove rsc-builder (#45079) @Janpot
- [code-infra] Remove commonjs imports in docs (#44976) @Janpot
- [docs-infra] Move Ukraine banner to the bottom (#45135) @oliviertassinari
- Fix MUI Base vale rule (#45140) @oliviertassinari
- Fix missing store contributor renaming (b3d1be0) @oliviertassinari
- Fix 404 errors (#45137) @oliviertassinari
- Prepare libraries for first v7 alpha release (#45132) @DiegoAndai
- Fix CHANGELOG vale failure (#45151) @DiegoAndai

### Docs

- Fix `/base-ui` redirect and prune links (#45083) @mj12albert
- Add v6 to v7 migration guide (#45143) @DiegoAndai

All contributors of this release in alphabetical order: @DiegoAndai, @good-jinu, @harry-whorlow, @Janpot, @joshkel, @mj12albert, @oliviertassinari, @siriwatknp, @ZeeshanTamboli

## Older versions

Changes before 7.x are listed in our [changelog for older versions](https://github.com/mui/material-ui/blob/HEAD/CHANGELOG.old.md).
