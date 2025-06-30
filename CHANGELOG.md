# [Versions](https://mui.com/versions/)

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
- [code-infra] Bump eslint to v9 (#46222) @brijeshb42
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
- Fix Material Icons page in dark mode (#45691) @mnajdova

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
