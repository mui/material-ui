# [Versions](https://mui.com/versions/)

## 6.4.3

<!-- generated comparing v6.4.2..v6.x -->

_Feb 4, 2025_

A big thanks to the 3 contributors who made this release possible.

### `@mui/material@6.4.3`

- [LinearProgress][CircularProgress] Add variant overrides for module augmentation (#45191) @ZeeshanTamboli
- [TextField] Remove deprecated props from documentation (#45200) @sai6855

### Core

- Fix corepack and pnpm installation in CircleCI (#45194) @DiegoAndai

All contributors of this release in alphabetical order: @DiegoAndai, @sai6855, @ZeeshanTamboli

## 6.4.2

<!-- generated comparing v6.4.1..v6.x -->

_Jan 29, 2025_

A big thanks to the 5 contributors who made this release possible.

### `@mui/material@6.4.2`

- [Autocomplete] Prevent shrink animation in uncontrolled Autocomplete when default value is set (#44873) @ZeeshanTamboli
- [Slider] Fix arrow keys past the end for Slider with custom marks (#45050) @joshkel
- [TextareaAutosize] Temporarily disconnect ResizeObserver to avoid loop error (#44540) @mj12albert

### Core

- [code-infra] a few fixes uncovered during ESM updates (@Janpot) (#45100) @Janpot
- [code-infra] Remove rsc-builder (#45079) @Janpot
- [code-infra] Remove commonjs imports in docs (#44976) @Janpot
- Prepare stable release from the `v6.x` branch (#45133) @DiegoAndai

### Docs

- Fix `/base-ui` redirect and prune links (#45083) @mj12albert

All contributors of this release in alphabetical order: @DiegoAndai, @Janpot, @joshkel, @mj12albert, @ZeeshanTamboli

## 6.4.1

<!-- generated comparing v6.4.0..master -->

_Jan 21, 2025_

A big thanks to the 9 contributors who made this release possible.

### `@mui/material@6.4.1`

- [ButtonBase] Export types used in ButtonBase props (#43530) @Janpot
- [Dialog] Add slots and slotProps (#44792) @sai6855
- [Drawer] Deprecate composed classes (#44870) @yash49
- [IconButton] Set default loading to `null` (#45057) @siriwatknp
- [ListItem] Add codemod for deprecated props (#45022) @sai6855
- [Modal] Add migration guide and codemod for deprecated props (#45021) @sai6855
- [TextField] Fix filled state to be synced with autofill (#44135) @DiegoAndai

### `@mui/system@6.4.1`

- Fix dark mode flicker using `useEnhancedEffect` (#44812) @siriwatknp

### `@mui/utils@6.4.1`

- Do not deep merge React component (#45058) @siriwatknp

### Docs

- Fix typo (#45070) @Fullchee
- Improve Toolpad templates section (#44914) @bharatkashyap
- Fix expand / collapse icons orientation (#44989) @zanivan
- Rename "Base UI" to "MUI Base" in all text (#45060) @mj12albert
- Add @mui/base deprecation callout (#45030) @mj12albert
- Update @mui/base deprecation message (#45064) @mj12albert

### Core

- [code-infra] Add "use client" directive to files with React APIs (#45036) @Janpot
- [docs] 301 redirect `/base-ui` to `base-ui.com` (#45061) @mj12albert

All contributors of this release in alphabetical order: @bharatkashyap, @DiegoAndai, @Fullchee, @Janpot, @mj12albert, @sai6855, @siriwatknp, @yash49, @zanivan

## 6.4.0

<!-- generated comparing v6.3.1..master -->

_Jan 13, 2025_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- Added [`loading` prop](https://mui.com/material-ui/react-button/#loading-2) to the `Button` and `IconButton` components (#44637) @siriwatknp

### `@mui/material@6.4.0`

- [Alert] complete `slots` and `slotProps` (#44971) @siriwatknp
- [Autocomplete] Sync runtime and TS types for key in grouped options (#44862) @aarongarciah
- [Button] Add `loading` prop (#44637) @siriwatknp
- [CardHeader] Deprecate `*TypographyProps` and complete `slots`, `slotProps` (#44729) @siriwatknp
- [CircularProgress] Improve indeterminate animation to be symmetric and smooth (#44934) @yashdev16
- [LinearProgress] Deprecate composed classes (#44933) @headironc
- [Link] Fix error for using custom palette with underline (#44927) @siriwatknp
- [Select] Do not set `aria-controls` when closed (#44919) @siddhantantil39
- [Select] Add missing root class (#44928) @sai6855
- [Slider] Set onChangeCommitted to receive the last argument passed to onChange (#44795) @good-jinu
- Add `mergeSlotProps` for extending components (#44809) @siriwatknp
- Update `mergeSlotProps` to merge `style` (#44959) @siriwatknp
- Fix slots typing for Tooltip and StepLabel (#44985) @siriwatknp
- Remove unnecessary blank lines (#44980) @sai6855

### Docs

- [docs] Fix Dashboard sidenav sroll (#44876) @oliviertassinari
- [docs] Fix broken anchor link to w3.org (c51af8e) @oliviertassinari
- [docs] Add details on complementary Menu components (#44957) @samuelsycamore
- [docs] Remove misleading messaging on MD3 support (#44953) @mnajdova
- [docs] Fix code copy button obscuring on small screen sizes (#44861) @ZeeshanTamboli
- [docs] Remove more instances of Adobe XD (#44956) @samuelsycamore
- [docs] Remove Adobe XD chips, links, and mentions (#44909) @samuelsycamore
- [docs] Fix incorrect rendering in Typography docs (#44937) @iaziz11

### Core

- [core] Remove redundant screenshots (#44877) @oliviertassinari
- [core] Remove Suspense and clock mocking from regressions and e2e tests (#44935) @DiegoAndai
- [code-infra] Allow react@18 on `@mui/internal-test-utils` (#45023) @LukasTy
- [code-infra] Stabilize flaky pigment progressbar tests (#44969) @Janpot
- [example] Update the CDN example to adapt React 19. (#44979) @IceOfSummer
- [figma] Clarify that Material UI Sync plugin is experimental (#44975) @oliviertassinari

All contributors of this release in alphabetical order: @aarongarciah, @DiegoAndai, @good-jinu, @headironc, @iaziz11, @IceOfSummer, @Janpot, @LukasTy, @mnajdova, @oliviertassinari, @sai6855, @samuelsycamore, @siddhantantil39, @siriwatknp, @yashdev16, @ZeeshanTamboli

## 6.3.1

<!-- generated comparing v6.3.0..master -->

_Jan 3, 2025_

A big thanks to the 8 contributors who made this release possible.

### `@mui/material@6.3.1`

- [Autocomplete] Revert: Fix options list rendering in freeSolo mode (#44858) @ZeeshanTamboli
- [Tooltip] Warn instead of error when trigger is disabled (#44846) @yash49
- [TableSortLabel] Add slots and slotProps (#44728) @sai6855
- [Select] Deprecate composed classes (#44925) @sai6855

### Docs

- [material-ui][Accordion] Update `Anatomy` section in Accordion docs (#44849) @ZeeshanTamboli
- [material-ui][CardActionArea] Added demo in docs of cards for adding props to CardActionArea (#44789) @siddhantantil39
- [material-ui][Grid2] Add interactive demo for Grid v2 (#44820) @yash49
- [material-ui][Select] Update docs to reflect the omission of placeholder prop (#44856) @adityaparab
- [joy-ui] Fix Color mode button on Theme builder (#44864) @komkanit
- Fix 301 redirections @oliviertassinari

### Core

- [examples] Update Next.js examples Next.js and React versions (#44852) @DiegoAndai
- [code-infra] Prevent wrong nested imports in Base UI (#44426) @oliviertassinari
- [docs-infra] Add vale coverage for App Router and Page Router (060c55c) @oliviertassinari
- Sync with other repos (1b9300f) @oliviertassinari
- Fix docs:build to work in docs folder too (6b923a4) @oliviertassinari
- Setup React 18 CI tests (#44868) @DiegoAndai
- Update test to use public API (#44875) @oliviertassinari

All contributors of this release in alphabetical order: @adityaparab, @DiegoAndai, @komkanit, @oliviertassinari, @sai6855, @siddhantantil39, @yash49, @ZeeshanTamboli

## 6.3.0

<!-- generated comparing v6.2.1..master -->

_Dec 23, 2024_

A big thanks to the 11 contributors who made this release possible. Here are some highlights ✨:

- Fix invalid HTML structure in the Accordion component (#44408) @ZeeshanTamboli
  The HTML elements of the Accordion summary have been updated:
  - the root element is now button (previously div).
  - summary content and the icon wrapper are now span (previously div).
    This will only impact you if you used the HTML element as selectors in your styles.

### `@mui/material@6.3.0`

- [Accordion] Fix invalid HTML inside heading (#44408) @ZeeshanTamboli
- [useAutocomplete] Improve TS typing of `groupedOptions` prop (#44657) @lewxdev
- Prevent `ownerState` propagation for transition slots (#44401) @ZeeshanTamboli
- [StepContent] Add slots and slotProps (#44742) @sai6855
- [TablePagination] Add the rest of `slots` and `slotProps`. (#44570) @siriwatknp

### `@mui/system@6.3.0`

- Set `before` directly without using prepend for global styles (#44648) @siriwatknp

### Docs

- [material-ui] Improve `theme.applyStyles()` docs (#44658) @DiegoAndai
- [material-ui] Update MD callout (#43958) @aarongarciah

### Core

- Remove unnecessary conditional around `.muiName =` (#44071) @Janpot
- [blog] Material UI: 2024 EOY updates blog post (#44722) @alelthomas
- Fix quickstart command in pigment docs (#44806) @yash49
- [docs-infra] Remove Next.js production profiler (#44823) @romgrk
- [docs-infra] Remove no longer support `optimizeFonts` Next.js option (#44802) @LukasTy

All contributors of this release in alphabetical order: @aarongarciah, @alelthomas, @DiegoAndai, @Janpot, @lewxdev, @LukasTy, @romgrk, @sai6855, @siriwatknp, @yash49, @ZeeshanTamboli

## 6.2.1

<!-- generated comparing v6.2.0..master -->

_Dec 17, 2024_

A big thanks to the 10 contributors who made this release possible.

### `@mui/material@6.2.1`

- Update `overridesResolver` return from object to array of styles (#44752) @siddhantantil39
- [Pagination] Use correct `aria-current` value (#44753) @jacklaurencegaray
- [Select] Set `aria-required` & `aria-invalid` on `combobox` instead of hidden input (#44731) @ben-pomelo

### `@mui/system@6.2.1`

- Warns if the hex color contains trailing space (#44538) @siriwatknp

### Docs

- [material-ui][Dialog] Fix crashing of DraggableDialog demo (#44747) @sai6855
- [material-ui][TextField] Update `react-number-format` demo to use the recommended prop (#44743) @siriwatknp
- [material-ui][TextField] Add size default prop to api docs (#44714) @sai6855
- [material-ui][TextField] Add suffix shrink demo (#44744) @siriwatknp

### Core

- [api-docs-builder] Preserve multiline prop descriptions with `rawDescriptions` option (#44737) @vladmoroz
- Fix running mocha related scripts on Windows locally (#44664) @ChristopherJamesL
- Update `eslint-plugin-jsx-a11y` (#44701) @ZeeshanTamboli
- Add documentation to `useThemeProps`, `deepmerge` and `composeClasses` functions (#44703) @JCQuintas
- [examples] Add Theme Mode Switch to Next.js TS example (#43576) @TurtIeSocks

All contributors of this release in alphabetical order: @ben-pomelo, @ChristopherJamesL, @jacklaurencegaray, @JCQuintas, @sai6855, @siddhantantil39, @siriwatknp, @TurtIeSocks, @vladmoroz, @ZeeshanTamboli

## 6.2.0

<!-- generated comparing v6.1.10..master -->

_Dec 10, 2024_

A big thanks to the 9 contributors who made this release possible. Here are some highlights ✨:

- Material UI is now compatible with React 19 (#44672) @DiegoAndai
- Fixed incorrect `aria-orientation` for vertical sliders. <kbd>ArrowRight</kbd> now increases the value and <kbd>ArrowLeft</kbd> decreases the value in vertical sliders; they were reversed in prior versions. (#44537) @mj12albert

### `@mui/material@6.2.0`

- [Box] Add missing `component` to `BoxProps` type (#44643) @DiegoAndai
- [Grid] Fix spacing when using css variables (#44663) @DiegoAndai
- [ListItemText] Add `slots` and `slotProps` (#44571) @sai6855

### Docs

- Add Toolpad Core template link (#44415) @bharatkashyap

### Core

- [docs-infra] Allow custom annotations (#44707) @vladmoroz
- [Box] Fix `component` prop test (#44651) @DiegoAndai
- React 19 useRef cleanup (#44704) @DiegoAndai
- Remove obselete lerna options (#44676) @ZeeshanTamboli
- Fix Regular Expression Denial of Service (ReDoS) vulnerabilities (#44627) @SuperMaxine
- Fix number of contributors (#44650) @aarongarciah
- [docs-infra] Add support for data attributes in the API generation (#44709) @mnajdova
- [docs-infra] Fix RTL dark mode (#41803) @alexfauquette
- [Grid] Remove deeply nested imports (#43605) @Janpot

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @bharatkashyap, @DiegoAndai, @Janpot, @mj12albert, @mnajdova, @sai6855, @SuperMaxine, @vladmoroz, @ZeeshanTamboli

## 6.1.10

<!-- generated comparing v6.1.9..master -->

_Dec 3, 2024_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@6.1.10`

- [Avatar] Fix `slotProps.img` not spread to hook (#44536) @siriwatknp
- [FilledInput] Use `slotProps` instead of `componentsProps` (#44552) @siriwatknp
- [Grid2] Fix theme scoping error (#44599) @siriwatknp
- [Grid2] Add container styles from styleOverrides (#44598) @sai6855
- Skip `tonalOffset` from setting color channel (#44585) @siriwatknp
- Remove few more React.ReactElement<any> types (#44290) @sai6855
- [Tabs] Fix `ScrollbarSize` ref being overriden (#44593) @DiegoAndai
- [Select][TextField] Fix screen reader from saying `&ZeroWidthSpace` (#44631) @arishoham

### `@mui/system@6.1.10`

- [ThemeProvider] Optimize `theme` changes when enabling CSS theme variables (#44588) @siriwatknp

### Docs

- Notification for the MUI X v8 alpha zero announcement blog post (#44629) @joserodolfofreitas
- Bump React Router to ^7.0.1 (#44531) @oliviertassinari
- [material-ui] Replace testid with id in migration guide (#44636) @sai6855
- [material-ui][TextField] Update usage of `InputLabelProps` in docs (#44634) @sai6855
- [material-ui][ListItem] Add missing diffs in migration guide (#44638) @sai6855
- [examples] Use Next.js 14 on examples (#44486) @DiegoAndai
- Update links and sidebar nav for Base UI components in Material UI (#44581) @samuelsycamore

### Core

- Remove `getSlotOwnerState` from `useSlot` util (#44403) @ZeeshanTamboli
- Extract useRippleHandler outside of ButtonBase (#44591) @albarv340
- Update eslint config (#44586) @MBilalShafi
- [core-infra] Remove useless fragments (#44516) @oliviertassinari
- [docs-infra] Fix Banner CLS (#44632) @oliviertassinari
- [docs-infra] Change CSS vars generation to be extracted from Enum (#44587) @mnajdova
- [docs-infra] Automatically hide Black Friday banner (#44630) @oliviertassinari
- [docs-infra] Fix TOC RTL padding regression (#44535) @oliviertassinari
- [test-utils] Remove leftover React.ReactElement<any> from describeConformance.tsx (#44639) @sai6855

All contributors of this release in alphabetical order: @albarv340, @arishoham, @DiegoAndai, @joserodolfofreitas, @MBilalShafi, @mnajdova, @oliviertassinari, @sai6855, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 6.1.9

<!-- generated comparing v6.1.8..master -->

_Nov 27, 2024_

A big thanks to the 8 contributors who made this release possible.

### `@mui/material@6.1.9`

- [Select] Omit `placeholder` from props (#44502) @Juneezee
- [Grid2] Add container class to `Grid2Classes` (#44562) @sai6855

### `@mui/system@6.1.9`

- Add ThemeProvider `noSsr` to prevent double rendering (#44451) @siriwatknp

### `@mui/codemod@6.1.9`

- [codemod] Fix handling of computed `paragraph` props (#44195) @joshkel

### `@mui/material-pigment-css@6.1.9`

- Make @pigment-css/react as peer dependency (#44498) @brijeshb42

### Docs

- [material-ui] Add missing required dependencies in dashboard template README (#44476) @mesqueeb
- [material-ui] Add missing Roboto import to Next.js integration docs (#44462) @StaceyD22
- [material-ui][Dialog] Fix padding in SimpleDialog demo (#44467) @oliviertassinari
- Fix template page issues (#44466) @oliviertassinari
- [examples] Add dark mode example for Material UI + Pigment CSS (#44480) @mnajdova

### Core

- Remove TODO line in the changelog (#44484) @mnajdova
- Polish image display (418e888) @oliviertassinari
- [core-infra] Add no-relative-packages (#44489) @oliviertassinari
- [docs-infra] Support CSS variables API info (#44559) @mnajdova
- [docs-infra] Fix display when ad-block triggers (#44567) @oliviertassinari
- [docs-infra] Improve locator finding using visible option (#44541) @siriwatknp
- [docs-infra] Correctly flatten the pages tree (#44514) @oliviertassinari
- [docs-infra] Fix Sponsor design regression (#44515) @oliviertassinari
- [test] Remove React.ReactElement<any> from describeConformance.tsx (#44318) @sai6855
- [test] Do not enforce the presence of `ownerState.className` in `describeConformance` (#44479) @flaviendelangle

All contributors of this release in alphabetical order: @brijeshb42, @flaviendelangle, @joshkel, @Juneezee, @mesqueeb, @mnajdova, @oliviertassinari, @sai6855, @siriwatknp, @StaceyD22

## v6.1.8

<!-- generated comparing v6.1.7..master -->

_Nov 20, 2024_

A big thanks to the 10 contributors who made this release possible.

### `@mui/material@6.1.8`

- [Autocomplete] Use `ul` element for the listbox (#44422) @DiegoAndai
- [Grid2] Remove item and zeroMinWidth classes from grid2Classes (#44419) @sai6855
- [StepIcon] Add SvgIconOwnProps type to StepIcon props (#44337) @sai6855
- Add generic back to `useMediaQuery` to prevent a breaking change (#44455) @siriwatknp
- [Tooltip] Deprecate `*Component` and `*Props` for v6 (#44350) @siriwatknp

### `@mui/system@6.1.8`

- Warn when calling `setMode` without configuring `colorSchemeSelector` (#43783) @siriwatknp

### `@mui/styled-engine@6.1.8`

- Add back removed internal function (#44421) @mnajdova

### `@mui/utils@6.1.8`

- Skip deep clone React element (#44400) @siriwatknp
- Add documentation to `useForkRef` (#44410) @JCQuintas

### Docs

- [Accordion] Replace hardcoded classes with constants in demos (#44453) @ZeeshanTamboli
- [material-ui][Autocomplete] Fix virtualization demo (#44382) @DiegoAndai
- Revert #44388 (#44454) @prakhargupta1
- Add App starters in related-projects.md (#44315) @oliviertassinari
- Bring back `*Component` and `*Props` codemods and deprecation messages (#44383) @DiegoAndai
- [docs] Copyedit Templates page (#44461) @samuelsycamore

### Core

- Remove `stylis-plugin-rtl-sc` (#44447) @renovate[bot]
- [test][Autocomplete] Make virtualize regression screenshots deterministic (#44425) @DiegoAndai
- [blog] Fix reference to subdomain on MUI X v8 alpha zero post (#44416) @joserodolfofreitas
- [blog] MUI X v8 alpha zero blog post (#44377) @joserodolfofreitas
- [code-infra] Use vitest-compatible skip in `describeConformance` (#44412) @JCQuintas
- Keep OpenSSF badge up-to-date (aef2bf2) @oliviertassinari
- Polish useForkRef docs (#44424) @oliviertassinari
- [infra] Upgrade Cherry-pick workflow to latest (#44448) @oliviertassinari

All contributors of this release in alphabetical order: @DiegoAndai, @JCQuintas, @joserodolfofreitas, @mnajdova, @oliviertassinari, @prakhargupta1, @sai6855, samuelsycamore, @siriwatknp, @ZeeshanTamboli

## v6.1.7

<!-- generated comparing v6.1.6..master -->

_Nov 13, 2024_

A big thanks to the 13 contributors who made this release possible.
This release includes fixes as well as documentation improvements.

### `@mui/material@6.1.7`

- Fix default props theme scoping (#44340) @siriwatknp
- Support theme scoping in `useMediaQuery` (#44339) @siriwatknp
- [Grid] Fix regression spacing prop with string value (#44376) @siriwatknp

### `@mui/styled-engine-sc@6.1.7`

- Fix missing `@types/hoist-non-react-statics` causing `styled` returns any (#44397) @megos

### Docs

- Replace 'Experimental APIs - Toolpad' with 'Toolpad (Beta)' (#44388) @prakhargupta1
- Fix Pigment CSS install (#44353) @oliviertassinari
- Fix dashboard menu warning (#44317) @siriwatknp
- Add runtime theme section for Material Pigment CSS (#44137) @siriwatknp
- Add hash to `key` to remove noise from console (#44289) @sai6855
- Revise Example Projects and Related Projects pages (#44191) @samuelsycamore
- [material-ui] Fix typo in typography theme set up for templates (#44338) @navedqb
- [material-ui] Add StackBlitz/CodeSandbox buttons to template cards (#44253) @zanivan
- [material-ui] Fix Sign-in/Sign-up templates layout (#44281) @zanivan
- [material-ui] Remove noise in template (#44260) @oliviertassinari
- [material-ui][Rating] Add uncontrolled example to Basic Rating demo (#44386) @sai6855
- [material-ui][TextField] Replace InputProps with slotProps.input in demo (#44288) @sai6855

### Core

- [blog] Follow media asset guidelines (#44374) @oliviertassinari
- [code-infra] Changes for test util to work in `vitest` (#43625) @JCQuintas
- Remove old marked JS options (#44375) @ZeeshanTamboli
- Fix webpack capitalization (#44352) @oliviertassinari
- Fix Next.js link 404 (710cd95) @oliviertassinari
- Update Gold sponsoring backlinks (#44316) @oliviertassinari
- Fix tools-public.mui.com redirection (9196fa5) @oliviertassinari
- Remove blank AlertTitle test file (#44282) @ZeeshanTamboli
- [docs-infra] Fix ad in RTL (#44345) @oliviertassinari
- [docs-infra] Enforce punctuation on descriptions (#44292) @oliviertassinari
- [docs-infra] Add CodeSandbox and StackBlitz to vale vocab (6db477a) @oliviertassinari
- [docs-infra] Fix correct spelling of VS Code (#44277) @oliviertassinari
- [docs-infra] Add a `rawDescriptions` option (#44390) @vladmoroz
- [examples] Add missing `clsx` dependency (#43526) @Janpot
- [infra] Fix @renovate[bot] appearing in changelog (#44275) @mnajdova

All contributors of this release in alphabetical order: @Janpot, @JCQuintas, @megos, @mnajdova, @navedqb, @oliviertassinari, @prakhargupta1, @sai6855, @samuelsycamore, @siriwatknp, @vladmoroz, @zanivan, @ZeeshanTamboli

## v6.1.6

<!-- generated comparing v6.1.5..master -->

_Oct 30, 2024_

A big thanks to the 13 contributors who made this release possible.

### `@mui/material@6.1.6`

- [Autocomplete] Add missing `onMouseDown` type to AutocompleteRenderInputParams (#44183) @sai6855
- [Avatar] Fix AvatarGroup spacing (#44208) @aarongarciah
- [AvatarGroup] Fix spacing CSS variable (#44202) @navedqb
- [Divider] Fix CSS specificity order (#44204) @o-alexandrov
- [Slider] Fix value prop type warning (#44131) @joshkel
- Replace `useThemeProps` with `useDefaultProps` (#44193) @siriwatknp

### `@mui/material-nextjs@6.1.6`

- Support Next 15.0.0 (#42428) @nphmuller

### `@mui/lab@6.0.0-beta.14`

- [Tabs] Fix type of TabPanel component (#44207) @blackcow1987

### `@mui/codemod@6.1.6`

- Fix system props default import specifier (#44170) @siriwatknp

### `@mui/utils@6.1.6`

- Bring back useIsFocusVisible (#44256) @aarongarciah
- Bring back getReactNodeRef (#44248) @aarongarciah

### Docs

- [material-ui][Avatar] Add AvatarGroup spacing demo (#44209) @aarongarciah
- Fix a typo in CONTRIBUTING.md (#44200) @prakhargupta1
- Mark the Hidden component as deprecated in the sidenav (#44068) @jimmycallin
- Use () when referencing functions (#44184) @oliviertassinari
- Follow types description convention (#44187) @oliviertassinari

### Core

- Lock file maintenance (#43947)
- Run @mui/icon-material src:icons (#44097) @oliviertassinari
- [test][material-ui] Add tests for Pigment Grid and Stack (#44132) @DiegoAndai
- [test] Distinguish private with public tests API (#44188) @oliviertassinari
- [docs-infra] Add recursively the relative modules in the demos (#44150) @mnajdova

All contributors of this release in alphabetical order: @aarongarciah, @blackcow1987, @DiegoAndai, @jimmycallin, @joshkel, @mnajdova, @navedqb, @nphmuller, @o-alexandrov, @oliviertassinari, @prakhargupta1, @sai6855, @siriwatknp

## v6.1.5

<!-- generated comparing v6.1.4..master -->

_Oct 22, 2024_

A big thanks to the 9 contributors who made this release possible.

### `@mui/material@6.1.5`

- [Autocomplete] Fix bug with child chip button events propagating to parent (#43982) @snapwich
- [Autocomplete] Fix Autocomplete crashing if ownerState is used in styleOverrides (#43994) @sai6855
- [Checkbox] Fix disableRipple regression (#44099) @siriwatknp
- [Dialog] Add the aria-modal="true" by default (#44118) @mnajdova
- [IconButton] Fix disableRipple behavior when disableRipple is set in MuiButtonBase theme (#43714) @sai6855
- [pigment-css] Support project without enabling CSS variables (#44171) @siriwatknp
- Make the palette always return new light and dark object (#44059) @siriwatknp

### `@mui/system@6.1.5`

- Add `defaultMode` to `InitColorSchemeScript` (#44139) @siriwatknp

### `@mui/codemod@6.1.5`

- [Grid2] Add removal `zeroMinWidth` prop to codemod (#44178) @sai6855

### Docs

- [material-ui][FormControlLabel] Don't use unintuitive label position on chec… (#44119) @mnajdova
- [material-ui][TextField] Dynamically modify the eye password button aria-label (#44122) @ChinoUkaegbu
- [icons] Run pnpm docs:mdicons:synonyms (#44098) @oliviertassinari
- [joy-ui] Update Overview copy to match Readme (#44136) @samuelsycamore
- Add CodeSandbox/StackBlitz to the rest of the templates (#43708) @siriwatknp
- Update Figma link to fix 301 (a7b7d9c) @oliviertassinari
- Link Toolpad from Core repo (#44111) @prakhargupta1
- Remove HighlightedCode max-width (#43731) @Janpot

### Core

- [code-infra] Widen eslint file patterns (#44148) @Janpot
- [code-infra] Fix icon builder tests (#44143) @Janpot
- [code-infra] Fix dependabot vulnerabilities (#44124) @Janpot
- [core] Reference commits in changelog when no PR (#44115) @oliviertassinari
- [examples] Fix Pigment CSS Vite example (#44074) @oliviertassinari
- Fix fast-xml-parser vulnerability (#44121) @Janpot

All contributors of this release in alphabetical order: @ChinoUkaegbu, @Janpot, @mnajdova, @oliviertassinari, @prakhargupta1, @sai6855, @samuelsycamore, @siriwatknp, @snapwich

## v6.1.4

<!-- generated comparing v6.1.3..master -->

_Oct 15, 2024_

A big thanks to the 9 contributors who made this release possible.

### `@mui/material@6.1.4`

- [Checkbox] Fix disableRipple regression (#44099) @siriwatknp
- [IconButton] Fix disableRipple behavior when disableRipple is set in MuiButtonBase theme (#43714) @sai6855
- Make the palette always return new light and dark object (#44059) @siriwatknp
- Simplify createPalette (#44075) @oliviertassinari

### Docs

- Improve Toolpad Core docs (#43796) @bharatkashyap
- Tweak Joy UI section in README (#44103) @aarongarciah
- Fix 404 link to Next.js @oliviertassinari
- [toolpad core] In the sidebar, move 'new' label to the components (#44070) @prakhargupta1
- Fix small typo on Grid2 page (#44062) @zanivan
- Clarify suggestions to use `@mui/styles` in v5 migration docs (#44049) @samuelsycamore

### Core

- [code-infra] Link to production app for bundle size (#44076) @oliviertassinari
- [code-infra] Disable cron job for React 17 tests (#44065) @Janpot
- Remove [website] from changelog (#44069) @oliviertassinari
- Apply #44052 to the latest release as well @oliviertassinari
- Fix proptypes generation when multiple components per file (#44058) @Janpot
- Remove <-- from changelog (#44052) @oliviertassinari
- [examples] Avoid git diff when playing with examples @oliviertassinari
- [test] Remove dead code (#44056) @Janpot

All contributors of this release in alphabetical order: @aarongarciah, @bharatkashyap, @Janpot, @oliviertassinari, @prakhargupta1, @sai6855, @samuelsycamore, @siriwatknp, @zanivan

## v6.1.3

<!-- generated comparing v6.1.2..master -->

_Oct 9, 2024_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Improved performance on styled components by pre-serializing and caching the styles (#43412) @romgrk

### `@mui/material@6.1.3`

- Change React.ReactElement<any> to React.ReactElement<unknown> (#43402) @sai6855
- [Badge] Make keys in anchor origin partial (#43950) @sai6855
- [Grid2] Fix column spacing for nested containers (#43733) @Janpot
- [Grid2] Remove required `item` prop for `size` prop (#44027) @Janpot
- [Grid2] Add compatible props warning (#43801) @k-rajat19
- [Modal] Fix comment location (#44026) @oliviertassinari
- [OutlinedInput] Resolve border color issue on mobile (#43797) (#43879) @wojtek35

### `@mui/system@6.1.3`

- Make createGrid compatible with React 19 types (#44035) @aarongarciah
- Add empty interfaces to fix issue with typescript module augmentation (#43873) @yonatan0
- Pre-serialize & cache styles to improve performance (#43412) @romgrk
- [typescript] `SystemCSSProperties` should not have `SystemStyleObject` as value (#44029) @siriwatknp

### `@mui/utils@6.0.0-beta.11`

- [utils] Make getReactElementRef React 19 compatible (#44034) @aarongarciah

### `@mui/lab@6.1.3`

- [lab][Timeline] Fix types for React 19 (#44043) @aarongarciah

### Docs

- Update docs-infra role (#44032) @mnajdova
- Update Material Symbols plan to reflect Google development (#44000) @oliviertassinari
- Fix 301 redirections in docs @oliviertassinari
- Fix indentation @oliviertassinari
- Fix Live edit copies (#43835) @oliviertassinari
- Virtualize icons svg (#43939) @Janpot
- [Grid] Fix Grid2 gap description (#43967) @aarongarciah
- [icons] Index search synchronously (#44001) @oliviertassinari
- [material-ui] Incorrect React useState Example on Toggle Button (#43987) @barrownicholas
- [material-ui] Add theme setting for pigment-css migration (#43993) @effektsvk
- [material-ui] Fix incorrect `slotProp` name in the `TextField` deprecation note. (#43985) @Chee7ah
- [examples] Use CSS Variables (#43856) @Juneezee
- [material-ui] Improved documentation for indeterminateIcon prop (#43791) @marctaylor01

### Core

- Fix typo in useLocalStorageState (#44024) @hieunguyenduc696
- Amend changelog (#43968) @aarongarciah
- Remove `@mui/styled-engine-sc` dev dependency from `@mui/styled-engine-sc` (#44050) @Janpot
- [docs-infra] Add pointer cursor on hover for logo to improve UX (#43999) @Asin-Junior-Honore
- [blog] Migrate some .gif to <video> (#43945) @oliviertassinari
- [code-infra] Align `next` dependency specifier across project (#44036) @Janpot
- [code-infra] Move MuiError babel macro to babel plugin (#43904) @Janpot
- [code-infra] Forbid calling `Error` without `new` (#43963) @Janpot
- [docs-infra] Fix link in header regression (#43834) @oliviertassinari
- [infra] Fix line break in Stack Overflow message @oliviertassinari
- [test] Add missing async (#44028) @oliviertassinari
- [test] Fix Escape event firing event (#43961) @oliviertassinari
- [test] Fix flaky pigment-css screenshot (#43959) @Janpot

All contributors of this release in alphabetical order: @aarongarciah, @Asin-Junior-Honore, @barrownicholas, @Chee7ah, @effektsvk, @hieunguyenduc696, @Janpot, @Juneezee, @k-rajat19, @mnajdova, @oliviertassinari, @romgrk, @sai6855, @siriwatknp, @wojtek35, @yonatan0

## v6.1.2

<!-- generated comparing v6.1.1..master -->

_Oct 2, 2024_

A big thanks to the 13 contributors who made this release possible.

### `@mui/material@6.1.2`

- [Autocomplete] Fix listbox opens and closes on click when used with `limitTags` (#42494) @appleSimple
- [Button] Ignore `dark` and `contrastText` if not provided in the theme (#43861) @siriwatknp
- [Button] Fix regression for color `inherit` (#43862) @siriwatknp
- [LinearProgress] Fix background color (#43949) @sai6855
- Support CSS variables with shadow DOM (#43948) @siriwatknp
- [Rating] Use Rating `name` as prefix of input element ids (#43829) @yash49
- [Drawer] Fix issue with main window being used instead of iframe's window (#43818) @albarv340
- [ThemeProvider] Support setting default mode (#43951) @siriwatknp

### Docs

- Update theme toggle demo (#43956) @Janpot
- Add note about minimum required webpack version (#43864) @Janpot
- Format Pigment CSS docs (#43812) @oliviertassinari
- Fix visual bug on dashboard template (#43836) @oliviertassinari
- Fix pigment-css.md syntax error (#43837) @kdichev
- Fix Sign-in template form experience (#43838) @oliviertassinari
- Remove "To be continued" section from v0 –> v1 migration guide (#43832) @samuelsycamore
- Fix 301 to chromium (#43809) @oliviertassinari
- [joy-ui] Add missing ComponentLinkHeader components (#43865) @samuelsycamore
- [Modal] Remove unnecessary type assertion (#43825) @ZeeshanTamboli
- [Table] Stabilize random series in virtualized table demo (#43744) @Janpot
- [system] Add migration guide link to `@mui/styles` pages (#43833) @samuelsycamore

### Core

- [code-infra] Fix flaky dashboard screenshot - take 2 (#43937) @Janpot
- [code-infra] Replace all instances of `e` with `event` and add eslint rule (#43866) @samuelsycamore
- [code-infra] Fix and update bundling fixtures (#43709) @Janpot
- [code-infra] Update transitive dependencies with vulnerabilties (#43895) @Janpot
- [code-infra] Optimize regression tests (#43889) @Janpot
- [code-infra] Remove custom playwright installation steps (#43881) @Janpot
- [code-infra] Fix flaky dashboard screenshot (#43890) @Janpot
- [code-infra] Add new instanceof proptypes for toolpad (#43814) @Janpot
- Fix eslint-plugin-react-compiler issues in usePagination tests (#43946) @wilhelmlofsten
- Uniformity in version range @oliviertassinari
- Replace `toBeAriaHidden` matcher with `toBeInaccessible` in tests (#43870) @ZeeshanTamboli
- [docs-infra] Strengthen CSP (#43711) @oliviertassinari
- [docs-infra] Open CodeSandbox demo with fontsize=12 (#43860) @siriwatknp
- [icons] Reduce Material Icon page size (#43911) @oliviertassinari
- [test] Point Istanbul to correct URL (#43935) @sai6855
- [test] Sync React.version parse logic with codebase (#43820) @oliviertassinari
- Improve getReactElementRef() utils (#43022) @sai6855
- [Drawer] Refactor getScrollbarSize usages (#43828) @BrianWoolfolk
- [Modal] Replace `show` parameter name with `hide` in modal manager (#43868) @ZeeshanTamboli
- [Modal] Remove unnecessary `manager` prop handling (#43867) @ZeeshanTamboli

All contributors of this release in alphabetical order: @albarv340, @appleSimple, @BrianWoolfolk, @DanailH, @Janpot, @kdichev, @oliviertassinari, @sai6855, @samuelsycamore, @siriwatknp, @wilhelmlofsten, @yash49, @ZeeshanTamboli

## v6.1.1

<!-- generated comparing v6.1.0..master -->

_Sep 19, 2024_

A big thanks to the 18 contributors who made this release possible.

### `@mui/material@6.1.1`

- [Grid] Bring back `GridProps` and `GridTypeMap` (#43717) @DiegoAndai
- [Paper] Fix wrong background-image on Paper when elevation is 0 (#43723) @ZeeshanTamboli
- [Skeleton] Fix wave animation for styled-components (#43740) @siriwatknp
- [Modal] Fix event handlers overriding behavior (#43757) @sai6855

### `@mui/system@6.1.1`

- Pass the stylesheet directly to `GlobalStyles` (#43739) @siriwatknp

### `@mui/utils@6.1.1`

- Fix "useId" & "useSyncExternalStore" imports to not be statically analyzable (#43360) @yash49

### Docs

- [material-ui][Breadcrumbs] Document CondensedWithMenu option for Breadcrumbs (#42973) @Sergio16T
- [material-ui][CircularProgress] Add Circular size demo (#43734) @sai6855
- [material-ui][slider] Fix slider in color customization playground twitches when sliding (#43671) @Nashyn
- [material-ui][slider] Polish Music player demo (#43748) @oliviertassinari
- [material-ui] Document Typography color prop breaking change (#43735) @aarongarciah
- [material-ui] Add docs for complementary Table components (#43756) @Juneezee
- [material-ui] Improve minimizing bundle docs (#43781) @ZeeshanTamboli
- [pigment-css] Call out Pigment being in alpha (#43725) @aarongarciah
- [pigment-css] Fix typo globalCSS -> globalCss (#43754) @hiro0218
- [test] Improve demos for better regression screenshots (#43742) @aarongarciah
- Fix minor typo (#42899) @xconverge
- Revert icon search virtualization (#43569) @Janpot
- Fix MUI Treasury Layout broken links (#43752) @oliviertassinari
- Fix 301 link to design asset @oliviertassinari
- Update release schedule table after v6 stable (#43726) @sahil-ag
- Fix bundle size link regression @oliviertassinari

### Core

- [code-infra] Allow overriding all `options` of `useFakeTimers` function (#43729) @LukasTy
- [core] Fix 301 link to Next.js and git diff @oliviertassinari
- [core] Fix package.json repository rule @oliviertassinari
- [core] Remove redundant window @oliviertassinari
- [core] Fix some issues reported by eslint-plugin-react-compiler (#43117) @binsmyth
- [core] Replace more `indexOf` with `includes` (#43694) @Juneezee
- [core] Remove /.yarn (#43712) @oliviertassinari
- [docs-infra] Enable synthetic default imports in TypeScript config (#43747) @morozow
- [docs-infra] Fix Vale config for TypeScript references (#43751) @oliviertassinari
- [docs-infra] Fix toolbar arrow order (#43627) @oliviertassinari
- [docs-infra] Fix missing dependencies in multi-tab demos (#43713) @cherniavskii
- [docs-infra] Fix API search link regression (#43662) @oliviertassinari
- [test] Update font-awesome CSS file in regression tests fixture (#43745) @Janpot
- [test] Remove position:relative from regression container (#43743) @aarongarciah
- [test] Remove top-level inline-block from the regression tests (#43656) @Janpot

All contributors of this release in alphabetical order: @aarongarciah, @binsmyth, @cherniavskii, @DiegoAndai, @Janpot, @Juneezee, @LukasTy, @mnajdova, @morozow, @Nashyn, @oliviertassinari, @sahil-ag, @sai6855, @Sergio16T, @siriwatknp, @xconverge, @yash49, @ZeeshanTamboli

## v6.1.0

<!-- generated comparing v6.0.2..master -->

_Sep 10, 2024_

A big thanks to the 21 contributors who made this release possible. Here are the highlights ✨:

- **Minor version changes**: To solve longstanding ESM compatibility issues we added [package exports](https://nodejs.org/api/packages.html#exports) to `@mui/icons-material` (#43624). This change is backwards compatible with previously recommended setups. Bundlers that don't support the `exports` field won't be affected. If you discover any issues, please reach out by creating a GitHub issue.
- This release also includes several fixes and documentation improvements to support the Material UI v6 upgrade.

### `@mui/icons-material@6.1.0`

- Add exports field to package.json (#43624) @Janpot

### `@mui/material@6.1.0`

- [Autocomplete] Add custom props support via `slotProps` (#43613) @Michael-Hutchinson
- [Dialog] Fix broken scrolling in full screen mode (#43626) @LuseBiswas
- [Grid] Revert wrap deprecation (#42363) (#43459) @DiegoAndai
- Improve color map filter on styles (#43579) @DiegoAndai
- Return styles directly if the selector is `&` when using `applyStyles` (#43633) @siriwatknp
- [types] Make slots partial in `CreateSlotsAndSlotProp`type (#42077) @lhilgert9
- [Radio] Fix disabled state styling regression (#43592) @mnajdova
- Fix wrong import to type (#43584) @mnajdova
- Simplify version prerelease export (#43699) @DiegoAndai

### `@mui/system@6.1.0`

- Use a custom sheet to set prepend for `GlobalStyles` (#43632) @siriwatknp
- Simplify version prerelease export (#43699) @DiegoAndai

### Docs

- [material-ui][Autocomplete] Refactor asynchronous loading demo (#43630) @sai6855
- [material-ui][Autocomplete] Fix GitHubLabel demo input background color (#43599) @sai6855
- [material-ui] Update Next.js font optimization guide (#43196) @siriwatknp
- [material-ui] Fix getting started with CSS variables in theme example (#43658) @Designer023
- [material-ui][system] Edit "How to use components selector API" section to add about direct import (#43377) @IAluI
- [material-ui] Update @mui/material-nextjs import examples to v14 (#43698) @ohmsl
- Fix typo in Divider doc (#43691) @lokendra-reco
- Add Anima section to documentation (#43673) @GoOrit-Anima
- Add Integrations section to design resources page (#43612) @zanivan
- Fix versions URL @oliviertassinari
- Keep showing next under the subdomain @oliviertassinari
- Add Next.js font optimization section to Pigment CSS migration (#43631) @siriwatknp
- Update the Material UI readme post-v6 (#43504) @samuelsycamore
- Bring back v5 release changelogs (#43460) @oliviertassinari
- Fix use of absolute URLs (#43567) @oliviertassinari
- Remove explicit `date-fns` dependency (#40823) @renovate[bot]
- [pigment-css] Add guide for Pigment CSS quickstart (#43395) @alelthomas
- [system] Fix link to createCssVarsProvider (#43661) @oliviertassinari
- Add scrollbar to color picker demo (#43672) @sai6855

### Core

- [blog] Uniformalize version between projects @oliviertassinari
- [blog] Fix page layout shift @oliviertassinari
- [code-infra] Build size snapshots from installed packages (#43452) @Janpot
- [code-infra] Recreate lockfile (#43623) @Janpot
- [code-infra] Make the API docs builder more configurable (#43574) @michaldudak
- [code-infra] Update runners from node 18 to 20 for GHA (#43593) @JCQuintas
- [code-infra] Update runners from node 18 to 20 (#43591) @JCQuintas
- [docs-infra] Fix axe issue scroll-to-top without landmark (#43663) @oliviertassinari
- [docs-infra] Reduce Algolia index size, no need for lvl6 @oliviertassinari
- [docs-infra] Use embed as the default for opening CodeSandbox (#43618) @siriwatknp
- [docs-infra] Fix broken anchor button when header has a link (#43598) @cherniavskii
- [docs-infra] Open Sign-in and Dashboard template with CodeSandbox/StackBlitz (#43604) @siriwatknp
- [examples] Fix CDN live preview demo (#43641) @oliviertassinari
- Add Pigment CSS screenshot test (#43280) @mnajdova

All contributors of this release in alphabetical order: @alelthomas, @cherniavskii, @Designer023, @DiegoAndai, @GoOrit-Anima, @IAluI, @Janpot, @JCQuintas, @lhilgert9, @lokendra-reco, @LuseBiswas, @Michael-Hutchinson, @michaldudak, @mnajdova, @ohmsl, @oliviertassinari, @renovate[bot], @sai6855, @samuelsycamore, @siriwatknp, @zanivan

## v6.0.2

<!-- generated comparing v6.0.1..master -->

_Sep 3, 2024_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@6.0.2`

- Fix `createTheme()` with just color schemes (#43518) @siriwatknp
- [Menu,Popover] Fix Backdrop props descriptions (#43503) @Michael-Hutchinson
- [MenuList] Do not react to an event with modifier key pressed (#43505) @MateuszGroth

### `@mui/system@6.0.2`

- [InitColorSchemeScript] Use `let/const` instead of `var` (#43468) @ishon19
- Fix composeClasses v6 behavior change (#43537) @oliviertassinari

### `@mui/codemod@6.0.2`

- Skip `ListItemButton` import for unrelated files (#43532) @siriwatknp

### Docs

- [figma] Clarity state or Figma Plugin component export (#43543) @oliviertassinari
- [material-ui] Fix template shadow tokens (#43514) @zanivan
- Update version support range (#43565) @oliviertassinari
- Polish Material UI Sync plugin code format @oliviertassinari

### Core

- [blog] Update Material UI v6 blog post link to reflect correct section title (#43535) @Michael-Hutchinson
- [blog] Makes the v5 name change clearer @oliviertassinari
- [blog] Fix typo in Material UI v6 blog post (#43502) @iamandrewluca
- [code-infra] Add missing @babel/runtime dependency to @mui/material-pigment-css (#43473) @Janpot
- [code-infra] Remove permissions in publish-canaries.yml (#43491) @oliviertassinari
- [core] Fix CodeQL scan (#43547) @oliviertassinari
- [core] Fix CHANGELOG `@mui/material@6.0.1` version (#43516) @DiegoAndai
- [docs-infra] Reduce description max-length (#43562) @oliviertassinari
- [docs-infra] Crash on invalid callout type (#43546) @oliviertassinari
- [docs-infra] Fix GitHub source link redirection (#43534) @oliviertassinari
- [infra] Fixed workflow file path (#43528) @michelengelen
- [typescript] Fix missing `Theme` generic (#43523) @siriwatknp

All contributors of this release in alphabetical order: @DiegoAndai, @iamandrewluca, @ishon19, @Janpot, @joserodolfofreitas, @MateuszGroth, @Michael-Hutchinson, @michelengelen, @oliviertassinari, @siriwatknp, @zanivan

## v6.0.1

<!-- generated comparing v6.0.0..master -->

_Aug 29, 2024_

A big thanks to the 12 contributors who made this release possible. It contains bug fixes and documentation improvements.

### `@mui/material@6.0.1`

- Attach default light color scheme when enabling CSS theme variables (#43493) @siriwatknp
- [Skeleton] Apply the wave animation to the correct element (#43474) @mnajdova

### Docs

- [material-ui][Dialog] Update confirmation dialog description (#43488) @Michael-Hutchinson
- Add Material UI v6 is out! to the notifications (#43448) @oliviertassinari
- [material-ui] Dark scroll bars in templates (#43483) @aarongarciah
- [material-ui] Add TemplateFrame to templates (#43406) @zanivan
- [table] Make the data grid blend in (#43489) @oliviertassinari

### Core

- [blog] Update Toolpad Studio marketing page links in the blogs (#43407) @prakhargupta1
- [blog] Add missing social card to the blog post (#43465) @siriwatknp
- [code-infra] Fix typing issues with `@mui-internal/api-docs-builder` (#43498) @Janpot
- [code-infra] Fix nextjs build cache (#43467) @JCQuintas
- Remove `'use client'` from index files and useAutocomplete reexport (#41956) @DiegoAndai
- Replace relative links to absolute ones in JSDocs (#43472) @alexfauquette
- Upgrade babel runtime (#43243) @Janpot
- [docs-infra] Skip shadow DOM regression test (#43500) @aarongarciah
- [docs-infra] Fix use of process.env.DEPLOY_ENV (#43490) @oliviertassinari
- [docs-infra] Add comment about removing optimizeFonts Next.js config (#43469) @aarongarciah
- [examples] Use `latest` on all Material UI dependencies (#43494) @mnajdova
- [infra] fix workflow path (#43464) @michelengelen

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @DiegoAndai, @Janpot, @JCQuintas, @Michael-Hutchinson, @michelengelen, @mnajdova, @oliviertassinari, @prakhargupta1, @siriwatknp, @zanivan

## 6.0.0

<!-- generated comparing v6.0.0-rc.0..master -->

_Aug 27, 2024_

We are excited to announce the stable release of Material-UI v6 🎉, check out [the blog post](https://mui.com/blog/material-ui-v6-is-out/) to see all the updates.

### `@mui/material@6.0.0`

- Change React.ReactElement<any,any> type from any to unknown (#43358) @sai6855
- [Pagination] Update `getItemAriaLabel` page param type (#43399) @sydneyjodon-wk
- [Unstable_TrapFocus] Fix `getTabbable` function return type (#42237) @KalmarLorand

### `@mui/lab@6.0.0-beta.8`

- [button] Add missing customize points for span (#43436) @oliviertassinari

### Docs

- Fix broken links (#43144) @DiegoAndai
- Updated mui-x roadmap links with the new project URL (#43444) @michelengelen
- Update pnpm order, move to second (#42712) @ahmadnadeem6236
- Fix CSS theme variables section (#43439) @siriwatknp
- Add two Toolpad Core components to Material UI sidebar (#43391) @prakhargupta1
- Fix licensingModel -> licenseModel @oliviertassinari
- Fix Stack Overflow issue canned response @oliviertassinari
- Avoid referencing MUI Core @oliviertassinari
- Fix description of eslint-plugin-material-ui @oliviertassinari
- [docs-infra] Polish reportBrokenLinks.js to support Base UI @oliviertassinari
- [material-ui] Clarify RTL language support in localization guide (#41784) @bahmanworld
- [material-ui] Refine templates theme selector (#43396) @zanivan

### Core

- Prepare for v6 stable release (#43454) @siriwatknp
- [blog] Polish Upcoming changes to MUI X pricing in 2024 (#43438) @oliviertassinari
- [blog] Add Material UI v6 stable release (#41932) @siriwatknp
- [ci] Fix the release:changelog cmd (#43451) @mnajdova
- [core] Allow `^6.0.0` for `@mui/` dependencies in `@mui/docs` (#43445) @LukasTy
- [code-infra] Babel plugin to fully resolve imported paths (#43294) @Janpot
- [infra] Add closing message workflow (#43450) @michelengelen

All contributors of this release in alphabetical order: @ahmadnadeem6236, @bahmanworld, @DiegoAndai, @Janpot, @KalmarLorand, @LukasTy, @michelengelen, @mnajdova, @oliviertassinari, @prakhargupta1, @sai6855, @siriwatknp, @sydneyjodon-wk, @zanivan

## 6.0.0-rc.0

<!-- generated comparing v6.0.0-beta.6..next -->

_Aug 22, 2024_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- ⚡ Rendering performance improvements

### `@mui/material@6.0.0-rc.0`

#### Breaking changes

- [Box] Remove `component` from `BoxOwnProps` (#43384) @DiegoAndai

  The `component` prop has been removed from the `BoxOwnProps` as it is already included in the `Box` type.
  This might affect your code if you are using the `styled` function with the `Box` component.
  If this is the case, use a `div` element instead of `Box`:

  ```diff
  -const StyledBox = styled(Box)`
  +const StyledDiv = styled('div')`
     color: white;
   `;
  ```

  This yields the same end result.
  If this doesn't work for you, you can also cast the `styled` returned value to `typeof Box`:

  ```diff
   const StyledBox = styled(Box)`
     color: white;
  -`;
  +` as typeof Box;
  ```

#### Changes

- [ListItem] Remove unnecessary TypeScript test (#43359) @sai6855
- Skip generating CSS variables for a custom spacing function (#43389) @siriwatknp
- Revert visual regressions from #42283 (#43364) @ZeeshanTamboli

### `@mui/codemod@6.0.0-rc.0`

- Add Grid2 to removeSystemProps codemod (#43302) @DiegoAndai

### Docs

- [blog] Add video to the Pigment CSS blog post (#42500) @oliviertassinari
- Fix broken link to milestones (#43379) @oliviertassinari
- Update CSS theme variables related content (#43130) @siriwatknp
- Fix link to createTheme source (#43332) @oliviertassinari
- Add cache to avoid unnecessary jsx dynamic import and theme getting (#43139) @Vxee
- Fix broken link to Next.js docs @oliviertassinari
- [material-ui] Revamp `Composition` guide (#43266) @ZeeshanTamboli
- [material-ui][Menu] Replace `PaperProps` with `slotProps.paper` in demos (#43354) @sai6855

### Core

- [code-infra] Change docs:start script to serve the exports folder (#43375) @Janpot
- [core] Fix typescript-next CI workflow (#43394) @aarongarciah
- [core] Run `@mui/system` TypeScript module augmentation tests in CI (#43386) @ZeeshanTamboli
- [core] Enable manage-package-manager-versions pnpm flag (#43366) @aarongarciah
- [core] Replace `indexOf` with `includes` (#42883) @k-rajat19
- [docs-infra] Add GitHub source link to components (#43228) @Jay-Karia
- [docs-infra] Fix copy shortcut (#43361) @oliviertassinari
- [perf] Remove theme/styling allocations (#43372) @romgrk
- [perf] Improve `composeClasses` (#43363) @romgrk
- [perf] Remove system allocations (#43306) @romgrk

All contributors of this release in alphabetical order: @aarongarciah, @DiegoAndai, @Janpot, @Jay-Karia, @k-rajat19, @oliviertassinari, @rluzists1, @romgrk, @sai6855, @siriwatknp, @Vxee, @ZeeshanTamboli

## 6.0.0-beta.6

<!-- generated comparing v6.0.0-beta.5..next -->

_Aug 16, 2024_

A big thanks to the 18 contributors who made this release possible.

### `@mui/material@6.0.0-beta.6`

- [Autocomplete] Improve the `options` prop description (#41591) @pluvio72
- [Autocomplete] Remove autocomplete warning regarding value not equal to option (#43314) @ZeeshanTamboli
- [Divider] Add aria-orientation (#43241) @aarongarciah
- [IconButton] Fix hover background color behavior (#43271) @mnajdova
- [TypeScript] Refactor types so they're compatible with upcoming React 19 (#43276) @DiegoAndai
- [Typography] Replace dot notation color value to work with Pigment CSS (#43288) @siriwatknp
- [pigment-css] Fix `getSelector` prefers-color-scheme to be object (#43237) @siriwatknp
- Remove `display="block"` usage to work with Pigment CSS (#43307) @siriwatknp

### `@mui/codemod@6.0.0-beta.6`

- [codemod] Skip sx spread transformation (#43291) @siriwatknp

### `@mui/styles@6.0.0-beta.6`

- [styles] Fix issues reported by eslint-plugin-react-compiler (#43118) @jlewins

### Docs

- [material-ui] Audit and copyedit the v6 migration doc (#43073) @samuelsycamore
- [material-ui] Fix Material Icon search lag and other improvements (#41330) @anle9650
- [material-ui][Popover] Fix description and title of hover interaction section (#43290) @ZeeshanTamboli
- [material-ui] Refine and unify custom template themes (#43220) @zanivan
- [joy-ui] Fix data grid redirection (#43247) @sai6855
- [mui-system] Add import statement in docs (#43223) @sai6855
- Update babel config (#43286) @romgrk
- Fix outdated references to Materal UI version (#43321) @oliviertassinari
- Polish migration git diff experience @oliviertassinari
- Update LTS to match format (#43212) @oliviertassinari
- Fix Pigment CSS migration content (#43217) @siriwatknp

### Core

- [code-infra] Remove `userEvent` export from `@mui/internal-test-utils` (#43313) @LukasTy
- [code-infra] Remove unnecessary alias (#43320) @Janpot
- [code-infra] Fix utils bundle size entrypoint (#43304) @Janpot
- [core] missing and incorrect scripts (#43209) @Jay-Karia
- [core] Set Node 14 as minimum version in all browserslist envs (#43326) @aarongarciah
- [core] Add React 19 as peer dependency (#43216) @aarongarciah
- [core] Pin `eslint-plugin-jsx-a11y` version to 6.7.1 (#43292) @Janpot
- [core] Update supported Node.js version to 14 (#43315) @Janpot
- [core] Use fs instead of fs-extra in script utils (#43234) @DiegoAndai
- [core] Refactor system theme props (#43120) @romgrk
- [docs-infra] Fix some TS issues for X docs (#43285) @Janpot
- [docs-infra] Move API pages to TS (#43199) @alexfauquette
- [docs-infra] Fix broken sandboxes with relative module imports (#42767) @bharatkashyap
- [docs-infra] Simplify API sections typing (#43128) @alexfauquette
- [examples] Fix import (#43316) @aarongarciah
- [examples] Add material-ui-pigment-css for Next.js and Vite (#43065) @siriwatknp
- [examples] Replace wrong import with `@mui/material/styles` (#43236) @siriwatknp
- [useMediaQuery] Adapt test implementation for React 19 (#43269) @aarongarciah
- [test] Update `matchMedia` mocks (#43240) @cherniavskii
- [test] Remove unnecessary ref param (#43282) @aarongarciah

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @anle9650, @bharatkashyap, @cherniavskii, @DiegoAndai, @Janpot, @Jay-Karia, @jlewins, @mnajdova, @oliviertassinari, @pluvio72, @renovate[bot], @romgrk, @sai6855, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 6.0.0-beta.5

<!-- generated comparing v6.0.0-beta.4..next -->

_Aug 8, 2024_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- Remove some deprecated props from the ListItem component (#41566) @thathva
- Bumped the minimum supported version of TypeScript (#43116) @mnajdova

### `@mui/material@6.0.0-beta.5`

#### BREAKING CHANGES

- [material-ui][ListItem] Removing deprecated props (#41566) @thathva

  `ListItem`'s props `autoFocus`, `button`, `disabled`, and `selected`, deprecated in v5, have been removed. To replace the `button` prop, use `ListItemButton` instead. The other removed props are available in the `ListItemButton` component as well.

  ```diff
  -<ListItem button />
  +<ListItemButton />
  ```

  Use this codemod to migrate your project to the `ListItemButton` component:

  ```bash
  npx @mui/codemod@next v6.0.0/list-item-button-prop <path/to/folder>
  ```

  As the `ListItem` no longer supports these props, the class names related to these props were removed. You should use the `listItemButtonClasses` object instead.

  ```diff
  -import { listItemClasses } from '@mui/material/ListItem';
  +import { listItemButtonClasses } from '@mui/material/ListItemButton';

  - listItemClasses.button
  + listItemButtonClasses.root

  - listItemClasses.focusVisible
  + listItemButtonClasses.focusVisible

  - listItemClasses.disabled
  + listItemButtonClasses.disabled

  - listItemClasses.selected
  + listItemButtonClasses.selected
  ```

#### Changes

- [material-ui][Autocomplete] Fix default value for multiple mode getting redefined with React 19 (#43189) @DiegoAndai
- [material-ui] Merge `CssVarsProvider` into `ThemeProvider` (#43115) @siriwatknp
- [material-ui] Make tests compatible with React 19 (#43155) @DiegoAndai
- [material-ui] Refine Blog template (#42825) @zanivan
- [material-ui] Element ref access React 19 compatibility (#43132) @DiegoAndai
- [material-ui][mui-system] Add support for version runtime checks (#43190) @DiegoAndai

### `@mui/material-pigment-css@6.0.0-beta.5`

- Reexport Pigment CSS from index file (#43218) @siriwatknp

### `@mui/codemod@6.0.0-beta.5`

- Fix codemod crash on MuiDivider property (#43125) @Janpot

### Docs

- Fix resolution of @mui/material-ui in docs (#43108) @Janpot
- Refine and polish out Templates page (#43131) @zanivan
- Fix the link test script (#43195) @alexfauquette
- Fix alpha usage (#43194) @siriwatknp
- Link Toolpad Core components from Material UI docs (#43036) @prakhargupta1
- Link Toolpad core docs to the docs menu (#42952) @prakhargupta1
- Polish migration guide (#43021) @oliviertassinari
- Fix 404 link to migration pages @oliviertassinari
- Support inject dynamic theme (#42879) @Vxee
- Fix 301 @oliviertassinari
- [blog] Announcing pricing changes Sep 2024 (#43061) @joserodolfofreitas
- [material-ui][TextField] Remove mentions of `redux-form` from TextField documentation (#43176) @AbdurRahman2004

### Core

- [code-infra] Fix `@mui/internal-test-utils` `screen` export type (#43150) @LukasTy
- [code-infra] Do not look for changes with previous commit when releasing a canary version (#43129) @michaldudak
- [code-infra] Automate canary releases (#43066) @michaldudak
- [core] Apply top-level eslint rule to docs and fix violations (#43126) @Janpot
- [core] Patch styled-components to use React.JSX namespace (#43205) @aarongarciah
- [core] Replace JSX namespace usages with React.JSX (#43204) @aarongarciah
- [core] Remove `react-router` package from `pigment-css-vite-app` (#43201) @ZeeshanTamboli
- [core] Remove unnecessary types packages from `@mui/internal-babel-macros` (#43193) @ZeeshanTamboli
- [docs-infra] Move `ApiPage` to TS (#43149) @alexfauquette
- [test] Remove unnecessary prop type check in test (#43211) @aarongarciah
- [test] Make conformance tests work with async render function (#43156) @michaldudak
- [typescript] Update the minimum supported version (#43116) @mnajdova

All contributors of this release in alphabetical order: @aarongarciah, @AbdurRahman2004, @alexfauquette, @DiegoAndai, @Janpot, @joserodolfofreitas, @LukasTy, @michaldudak, @mnajdova, @oliviertassinari, @prakhargupta1, @samuelsycamore, @siriwatknp, @thathva, @Vxee, @zanivan, @ZeeshanTamboli

## 6.0.0-beta.4

<!-- generated comparing v6.0.0-beta.3..next -->

_Jul 30, 2024_

A big thanks to the 12 contributors who made this release possible.

### `@mui/material@6.0.0-beta.4`

- [Accordion] Render a heading wrapping `AccordionSummary` button per W3C Accordion Pattern standards (#42914) @ZeeshanTamboli
- [Divider] Enable borderStyle enhancement in divider with children (#42715) @anuujj
- [ImageListItemBar] Deprecate composed classes (#42905) @sai6855
- Attach selector for default color scheme (#43035) @siriwatknp
- Stabilize Grid v2 and deprecate Grid v1 (#43054) @DiegoAndai

### `@mui/system@6.0.0-beta.4`

- Make `createBreakpoints` independent for stringify theme (#43048) @siriwatknp

### `@mui/utils@6.0.0-beta.4`

- Fix issues reported by the React Compiler (#43051) @markliu2013

### Docs

- [material-ui] Replace deprecated `<ListItem button/>` with `ListItemButton` component in routing libraries list example (#43110) @aliharis99
- [material-ui][Card] Update CardMedia description (#43067) @shahzaibdev1
- [material-ui] Polish out data table demo (#43072) @zanivan
- [material-ui][Snackbar] Improve reason type in demos (#43077) @sai6855
- [pigment-css] Fix syntax in migrating-to-pigment-css guide (#43107) @KevinVandy
- Fix page description line break @oliviertassinari

### Core

- Fix event naming convention @oliviertassinari
- [docs-infra] Move ads to the `@mui/docs` package (#42944) @alexfauquette

All contributors of this release in alphabetical order: @alexfauquette, @aliharis99, @anuujj, @DiegoAndai, @KevinVandy, @markliu2013, @oliviertassinari, @sai6855, @shahzaibdev1, @siriwatknp, @zanivan, @ZeeshanTamboli

## 6.0.0-beta.3

<!-- generated comparing v6.0.0-beta.2..next -->

_Jul 24, 2024_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 🚀 New version of the free Dashboard template, now with more components and an improved layout.

### `@mui/codemod@6.0.0-beta.3`

- Fix Divider props codemod (#42919) @aarongarciah

### `@mui/material@6.0.0-beta.3`

- Fix Accessing element.ref (#42818) @sai6855
- Refine `extendTheme` and `CssVarsProvider` API (#42839) @siriwatknp
- [Typography] Deprecate `paragraph` prop (#42383) @walston
- [Rating] fix defaultLabelText a11y issue with undefine value input and hint (#42810) @ZouYouShun

### `@mui/material-nextjs@6.0.0-beta.3`

- [material-ui-nextjs] Add @emotion/react as peer dependency (#42885) @jeloagnasin
- [material-ui-nextjs] Remove @mui/material as peer dependency (#43041) @brijeshb42

### `@mui/utils@6.0.0-beta.3`

- [utils] Add dependency to @mui/types (#43029) @mnajdova

### Docs

- [material-ui][joy-ui][Autocomplete] Fix `Hint` demo (#42990) @ManthanGajjar
- [docs] Make `DemoSandbox` agnostic of `productId` (#43042) @Janpot
- [docs] Use slot variants over `theme.variants` (#42614) @siriwatknp
- [docs] Remove stringify theme import (#43032) @siriwatknp
- [docs] Bring v5.x changes to the CHANGELOG @oliviertassinari
- [docs] Fix migration typo (#42976) @mnajdova
- [material-ui] Add improvements to Dashboard template (#42445) @zanivan
- [material-ui] Fix broken image links in blog template (#42956) @navedqb

### Core

- [code-infra] Add toolpad npm scope to envinfo (#41942) @Janpot
- [code-infra] Fix pnpm lock file (#43030) @Janpot
- [code-infra] Run `react-17` and `react-next` workflows on the next branch (#42690) @cherniavskii
- [code-infra] Make `useReactVersion` script reusable in other repos (#42828) @cherniavskii
- [code-infra] Add toolpad npm scope to envinfo (#41942) @Janpot
- [core] Add pigment and Base UI scopes to envinfo (#43002) @Janpot
- [core] Update minimum version of Node.js to 14.0.0 (#42920) @DiegoAndai
- [core] Expose missing screen methods from Testing Library (#42968) @aarongarciah
- [docs-infra] Leave TODO for warnOnce to reduce bundle size @oliviertassinari
- [docs-infra] Remove `display: flex` from `SectionTitle` (#42979) @LukasTy
- [test][material-ui] Remove unnecessary async act calls (#42942) @aarongarciah

All contributors of this release in alphabetical order: @aarongarciah, @bharatkashyap, @brijeshb42, @cherniavskii, @DiegoAndai, @Janpot, @jeloagnasin, @LukasTy, @ManthanGajjar, @mnajdova, @navedqb, @oliviertassinari, @sai6855, @siriwatknp, @walston, @zanivan, @ZouYouShun

## 6.0.0-beta.2

<!-- generated comparing v6.0.0-beta.1..next -->

_Jul 16, 2024_

### `@mui/material@6.0.0-beta.2`

- [material] Add missing dependency (#42961) @mnajdova

### Docs

- [docs] Move feedback from Canny to GitHub @oliviertassinari

All contributors of this release in alphabetical order: @mnajdova, @oliviertassinari

## 6.0.0-beta.1

<!-- generated comparing v6.0.0-beta.0..next -->

_Jul 16, 2024_

A big thanks to the 6 contributors who made this release possible.

### `@mui/material@6.0.0-beta.1`

- Remove dependency on @mui/base (#42907) @mnajdova
- Set material-pigment-css to public (#42912) @siriwatknp

### `@mui/codemod@6.0.0-beta.1`

- Support sx conditional inside spread element (#42894) @siriwatknp

### Docs

- Fix 301 link @oliviertassinari
- [material-ui] Add script to generate template screenshots (#42903) @siriwatknp

### Core

- [core] Remove custom hooks from the `mui-name-matches-component-name` linting rule (#42773) @flaviendelangle
- [core] Normalize rest / other to match the most common used @oliviertassinari
- [docs-infra] Move Ads component to TS (#42842) @alexfauquette
- [docs-infra] Support code tabs overflow (#42913) @arminmeh

All contributors of this release in alphabetical order: @alexfauquette, @arminmeh, @flaviendelangle, @mnajdova, @oliviertassinari, @siriwatknp

## 6.0.0-beta.0

<!-- generated comparing v6.0.0-alpha.14..next -->

_Jul 11, 2024_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- 🎉 This is the first v6 beta release! A huge thanks to everyone who helped to make this happen! The target date for a stable release is the 28th of July. The next month will be used to polish v6, and ease the migration from v5. You can follow the [v6 stable milestone](https://github.com/mui/material-ui/milestone/42) for more details.
- 🚀 All planned breaking changes are completed.

### `@mui/material@v6.0.0-beta.0`

- Revert deprecation warnings for `*Components` and `*Props` for v6 (#42466) @lhilgert9
- Performance: lazy Ripple (#41061) @romgrk
- [AppBar] Fix inherit color is inconsistent between ThemeProvider and CssVarsProvider (#42714) @ZeeshanTamboli
- [Autocomplete] Add new AutocompleteInputChangeReason (#37301) @binh1298

### `@mui/material-pigment-css@v6.0.0-beta.0`

- Create a wrapper package over Pigment CSS (#42819) @brijeshb42

### `@mui/base@5.0.0-beta.53`

- [Autocomplete] Add new AutocompleteInputChangeReason (#37301) @binh1298

### Docs

- Replace v6 "alpha" mentions with "beta" (#42895) @DiegoAndai
- Fix typos (#42862) @omahs
- Fix issues reported by react compiler in docs folder (#42881) @sai6855
- Fix 301 @oliviertassinari
- [LinearProgress] Fix buffer demo (#42858) @mbrookes
- Adjust site to add Toolpad on the homepage (#38604) @bharatkashyap

### Core

- Fix imports in `Demo` component (#42857) @LukasTy
- Use @mui/docs/HighlightedCodeWithTabs in markdown (#42841) @Janpot
- Simpler pnpm dedupe error message to act on @oliviertassinari
- Fix split infinitive use in tests @oliviertassinari
- [lab] Fix issues reported by react-compiler in mui-lab (#42880) @sai6855

All contributors of this release in alphabetical order: @bharatkashyap, @brijeshb42, @DiegoAndai, @Janpot, @lhilgert9, @LukasTy, @mbrookes, @oliviertassinari, @omahs, @romgrk, @sai6855, @ZeeshanTamboli

## 6.0.0-alpha.14

<!-- generated comparing v6.0.0-alpha.13..next -->

_Jul 3, 2024_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- ✨ Updated Grid v2 to match PigmentGrid (#42742) @DiegoAndai

### `@mui/material@v6.0.0-alpha.14`

#### BREAKING CHANGES

- [Grid] Update Grid props to match PigmentGrid (#42742) @DiegoAndai

  Use the codemod below to migrate the props:

  ```bash
  npx @mui/codemod@next v6.0.0/grid-v2-props /path/to/folder
  ```

#### Changes

- [Alert] Add ability to override slot props (#42787) @alexey-kozlenkov
- [Dialog] Revert incorrect textAlign style removal (#42778) @DiegoAndai
- [theme] Support `CssVarsTheme` in `responsiveFontSizes` return type (#42786) @jxdp

### Docs

- [material-ui] Add some writing tweaks to v6 migration page (#42623) @danilo-leal
- [material-ui] Fix issues reported by react-compiler in docs folder (#42830) @sai6855
- [material-ui] Add some writing tweaks to v6 migration page (#42623) @danilo-leal
- [base-ui] Fix wrong description for `UseTabParameters.onChange` (#42749) @ohgree
- Fix 301 MDN redirections @oliviertassinari

### Core

- [core] Bump React to 18.3.1 (#42047) @renovate[bot]
- [core] Revert lint for `useThemeProps` (#42817) @siriwatknp
- [core] Remove useIsFocusVisible util (#42467) @DiegoAndai
- [core] Remove react-test-renderer (#42784) @aarongarciah
- [core][mui-utils] Remove remaining IE11 references (#42777) @DiegoAndai
- [code-infra] Move `HighlightedCode` test into `@mui/docs` package (#42835) @LukasTy
- [code-infra] Cleanup `@mui/docs` usage and legacy re-exports (#42833) @LukasTy
- [docs-infra] Fix React Compiler ESLint issues in website components (#42566) @aarongarciah
- [docs-infra] Add batch of design polish (#42823) @danilo-leal
- [test][mui-utils] Remove usages of deprecated react-dom APIs (#42780) @aarongarciah
- [test][joy-ui][Autocomplete] Fix spread key error in test (#42775) @aarongarciah

All contributors of this release in alphabetical order: @aarongarciah, @alexey-kozlenkov, @danilo-leal, @DiegoAndai, @Janpot, @jxdp, @LukasTy, @ohgree, @oliviertassinari, @renovate[bot], @sai6855, @siriwatknp

## 6.0.0-alpha.13

<!-- generated comparing v6.0.0-alpha.12..next -->

_Jun 27, 2024_

A big thanks to the 10 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Added layout components for Pigment CSS integration (#42693) @siriwatknp

### `@mui/material@6.0.0-alpha.13`

- [Autocomplete] Fix more React 18.3 key spread warnings in demos (#42639) @wbt
- [Container][Grid][Stack][Hidden] Export Pigment CSS layout components (#42693) @siriwatknp
- [Text Field] when click password visibility button, text caret position change to very front. (#42595) @appleSimple
- [Modal] migrate useSlotProps to useSLot (#42150) @sai6855

### `@mui/styles@6.0.0-alpha.13`

- [withStyles] Expect React defaultProps warning in test (#42752) @aarongarciah

### Docs

- Fix link in CONTRIBUTING.md (#42755) @Janpot
- Add documentation on migrating JSS's alternative, array-based syntax to syntax supported by Emotion (#42053) @cjl750
- Fix type error in virtualized table demo (#42757) @aarongarciah
- Add first batch of v6 migration (#42242) @siriwatknp
- Fix quotes on font-family dedeclaration in the Landing Page template theme (#42748) @joetats

### Core

- [code-infra] Refactor eslint `import/no-cycle` rule (#42705) @LukasTy
- [core] Target direct version for prerelease (#42768) @siriwatknp
- [test] Remove enzyme (#42706) @aarongarciah
- [test] Remove createMount test util (#42703) @aarongarciah

All contributors of this release in alphabetical order: @aarongarciah, @alelthomas, @appleSimple, @cjl750, @Janpot, @joetats, @LukasTy, @sai6855, @siriwatknp, @wbt

## 6.0.0-alpha.12

<!-- generated comparing v6.0.0-alpha.11..next -->

_Jun 24, 2024_

A big thanks to the 17 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.12`

- Add `InitColorSchemeScript` for Next.js App Router (#42247) @siriwatknp
- [Autocomplete] Fix renderOption props type (#42689) @DiegoAndai
- [Autocomplete] Fix React 18.3 key spread warnings in Autocomplete demos (#42691) @aarongarciah
- Support Pigment CSS for `CssBaseline`, `ScopedCssBaseline` and `Popper` (#42640) @siriwatknp
- Add `DefaultPropsProvider` for Pigment CSS integration (#42638) @siriwatknp
- [Stepper] Generate class for nonLinear prop (#42620) @alexismo
- [Tab] Fix failing test (#42686) @aarongarciah
- [Tab] Deprecate iconWrapper class for icon class (#42647) @sai6855
- [TableSortLabel] Deprecate composed classes (#42281) @sai6855
- [usePagination] Update pagination `siblingsEnd` calculation logic (#42667) @Mini-ghost

### `@mui/codemod@6.0.0-alpha.12`

- Support dynamic props styled transformation (#42683) @siriwatknp

### `@mui/system@6.0.0-alpha.12`

- Fix issues reported by react compiler in `mui-system` package (#42637) @sai6855
- [useMediaQuery] Remove deprecated types (#42560) @aarongarciah

### `@mui/joy@5.0.0-beta.45`

- Fix issues reported by the React Compiler (#42671) @anuujj
- [Autocomplete] Fix React spread key warning (#42741) @aarongarciah

### `@mui/lab@6.0.0-alpha.12`

- [LoadingButton] Apply wrapping element to prevent React crash on Google page translation (#35198) @BartJanvanAssen

### Docs

- Fix git diff format in migration to v6 (#42711) @oliviertassinari
- Use new email for sponsoring @oliviertassinari
- Fix 301 links (#42697) @alexfauquette
- Normalize the capitalization of Design Kit @oliviertassinari
- Recommend setting HTML attribute instead of DOM property for RTL (#42599) @aarongarciah
- [material-ui][Select] Fix the `SelectAutoWidth` demo menu item value (#42648) @Danielkhakbaz

### Core

- [code-infra] Try disabling animations when taking screenshots (#42537) @Janpot
- [code-infra] Fix benchmark package (#42553) @Janpot
- [core] Replace enzyme in describeConformance (#42447) @DiegoAndai
- [docs-infra] Fix layout shift demo toolbar (#42743) @oliviertassinari
- [docs-infra] Fix visual look of in-house ad (#42735) @oliviertassinari
- [docs-infra] Add stray design polish (#42646) @danilo-leal
- [docs-infra] Fix wrong migration (#42675) @siriwatknp
- [docs-infra] Fine tune markdown elements design (#42643) @danilo-leal
- [docs-infra] Revamp the product switcher design (#42603) @danilo-leal
- [docs-infra] Allow Link component to receive the `role` attribute (#42629) @danilo-leal
- [infra] Add support donation button (#42499) @oliviertassinari
- [infra] Raise `tsconfig`/`tsc` target to `es2022` (#42645) @LukasTy
- [test] Fix tests on CI (#42670) @michaldudak
- [test] Fix issues reported by react-compiler in test packages (#42626) @sai6855

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @alexismo, @anuujj, @arminmeh, @BartJanvanAssen, @Danielkhakbaz, @danilo-leal, @DiegoAndai, @Janpot, @LukasTy, @michaldudak, @Mini-ghost, @mnajdova, @oliviertassinari, @sai6855, @siriwatknp

## 6.0.0-alpha.11

<!-- generated comparing v6.0.0-alpha.10..next -->

_Jun 11, 2024_

A big thanks to the 18 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.11`

- [Autocomplete] Shouldn't resize when hovering (#42452) @ZeeshanTamboli
- [Chip] Fix focus issue related with the Escape event (#41578) @shrilsharma
- [Grid] Fix support for CSS variables (#42574) @oliviertassinari
- [InputBase] Use `globalCss` for Pigment integration (#42431) @siriwatknp
- Change React.ReactElement type from `any` to `unknown` (#42473) @sai6855
- Integrate `extendSxProp` adapter (#42543) @siriwatknp
- [Tab] Fix applying `iconWrapper` styles from theme and update its description (#42549) @sai6855
- [pigment-css] Add `stringifyTheme` for Pigment CSS integration (#42476) @siriwatknp

### `@mui/system@6.0.0-alpha.11`

- [Grid] Remove `disableEqualOverflow` by using `gap` (#42526) @DiegoAndai
- [useMediaQuery] Drop Safari < 14 support (#42464) @aarongarciah

### `@mui/utils@6.0.0-alpha.11`

- Allow passing `NaN` as `defaultValue` to `useControlled` (#41559) @iammminzzy

### `@mui/codemod@6.0.0-alpha.11`

- Improve styled and sx prop transformation (#42598) @siriwatknp
- Support more cases for sx-prop transformation (#42527) @siriwatknp

### `@mui/private-theming@6.0.0-alpha.11`

- Fix issues reported by react compiler in `mui-private-theming` components (#42619) @sai6855

### Docs

- Add `theme.applyStyles()` and migrate docs (#42498) @siriwatknp
- Fix dashboard template console error (#42594) @oliviertassinari
- Migrate system props to `sx` prop (#42475) @siriwatknp
- [material-ui]Fix duplicated sentence (#42521) @alexfauquette
- [Grid] Fix docs spacing (#42573) @oliviertassinari
- [joy-ui] Add Next.js App Router instructions on how to prevent flickering (#42514) @devnyxie
- [joy-ui] Fix HTML tag without preformatting (#42525) @jacobmoshipco
- [material-ui] Add docs for complementary stepper components (#41900) @anle9650
- [material-ui] Fix typo on Sign-in/Sign-up templates (#42605) @zanivan
- [material-ui] Add container queries docs (#42434) @siriwatknp
- [material-ui] Fix ESLint error in Stepper demo (#42559) @aarongarciah
- [material-ui] Shorten useMediaQuery subheading (#42561) @aarongarciah
- [material-ui] Add a Refine example project (#42461) @necatiozmen

### Core

- [core] Allow `for..of` loops (#42600) @michaldudak
- [core] Add comment about Object.js @oliviertassinari
- [core] Disable eslint-plugin-react-compiler for Base (#42563) @aarongarciah
- [core] Group Pigment CSS dependencies (#42174) @siriwatknp
- [core] Configure eslint-plugin-react-compiler (#42555) @aarongarciah
- [core] Skip charts animation for visual regression test (#42530) @alexfauquette
- [docs-infra] Simplify click header (#42593) @oliviertassinari
- [docs-infra] Add configurable jsdoc host variable (#42472) @tonygravell
- [docs-infra] Add the Base UI logo with copy functionality (#42446) @danilo-leal
- [docs-infra] Prevent link anchor when selecting text (#41994) @alexfauquette
- [docs-infra] Add the Base UI logo with copy functionality (#42446) @danilo-leal
- [examples] Remove Pigment CSS examples (#42471) @sai6855
- [test] Restore pnpm tc command (#42572) @oliviertassinari
- [test] Restore testing internal packages (#42519) @michaldudak

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @anle9650, @DanailH, @danilo-leal, @devnyxie, @DiegoAndai, @iammminzzy, @jacobmoshipco, @michaldudak, @necatiozmen, @oliviertassinari, @sai6855, @shrilsharma, @siriwatknp, @tonygravell, @zanivan, @ZeeshanTamboli

## 6.0.0-alpha.10

<!-- generated comparing v6.0.0-alpha.9..next -->

_Jun 4, 2024_

A big thanks to the 7 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.10`

- [Backdrop] Deprecate `components` and `componentsProps` (#42468) @DiegoAndai
- [Collapse] Bound max transition time (#42390) @oliviertassinari
- [FilledInput] Remove unapplied classes from filledInputClasses interface and add missing classes to root (#42082) @sai6855
- [InputBase] Deprecate components and componentProps props for v6 (#42093) @ChronicusUA
- Remove remaining IE11 code (#42283) @DiegoAndai
- [Modal] Deprecate `components` and `componentsProps` (#42469) @DiegoAndai
- [Popover] Migrate useSlotProps to useSlot (#42369) @sai6855
- [useMediaQuery] Remove unused useMediaQueryTheme (#42367) @aarongarciah

### `@mui/system@6.0.0-alpha.10`

- Remove IE11 code (#42436) @DiegoAndai

### Docs

- Reflect Base UI and MUI System in a different repository @oliviertassinari
- Update twitter.com to x.com @oliviertassinari
- Simplify Example projects page @oliviertassinari
- [icons] Update README and docs page (#41938) @danilo-leal
- [material-ui] Add changelog section to the design kits page (#42449) @danilo-leal
- [material-ui] Fix sentence in the All components page (#42336) @danilo-leal
- [material-ui] Update Figma design kit doc redirect link (#42448) @danilo-leal
- [system] Add "dynamic values" section to sx prop page (#42239) @aarongarciah

### Core

- [docs-infra] Update the OG card image design (#42470) @danilo-leal
- [docs-infra] Add small design polish (#42455) @danilo-leal
- [docs-infra] Update the Material logo + add copy functionality (#42435) @danilo-leal

All contributors of this release in alphabetical order: @aarongarciah, @ChronicusUA, @danilo-leal, @DiegoAndai, @erezstmn-doit, @oliviertassinari, @sai6855

## 6.0.0-alpha.9

<!-- generated comparing v6.0.0-alpha.8..next -->

_May 29, 2024_

A big thanks to the 23 contributors who made this release possible. Here are some highlights ✨:

- 🚀 `CssVarsProvider` and `extendTheme` are now stable (#42246) @siriwatknp

### `@mui/material@6.0.0-alpha.9`

- [AlertTitle] Enable extending Typography props (#42269) @lucasgmelo
- [AvatarGroup] deprecate `componentsProps` for v6 (#42122) @lhilgert9
- [Grid] Deprecate `wrap` prop (#42363) @fedirjh
- [ListItem] Document `*Component` and `*Props` props deprecations (#42263) @aarongarciah
- [ListItem] Deprecate ListItem's components and componentsProps (#42219) @aarongarciah
- [ListItemSecondaryAction] Deprecate component (#42251) @aarongarciah
- Stabilize `CssVarsProvider` and `extendTheme` (#42246) @siriwatknp
- [Popper] Deprecate components and componentProps props for v6 (#42111) @ChronicusUA
- [responsiveFontSizes] Handled undefined variants (#42412) @brijeshb42
- [Slider] Fix wrong CSS value (#42370) @mnajdova
- [Tooltip] Deprecate components and componentProps props for v6 (#42107) @ChronicusUA

### `@mui/system@6.0.0-alpha.9`

- [createStyled] Intercept `ownerState` coming from `props` and `ownerState` (#42358) @DiegoAndai

### `@mui/codemod@6.0.0-alpha.9`

- Add `sx` prop for v6 migration (#42153) @siriwatknp
- Add codemod for removing system props (#42282) @siriwatknp

### Docs

- Remove unused images (#42324) @danilo-leal
- Add Pigment CSS and Base UI logos SVGs (#42322) @danilo-leal
- [joy-ui] Fix template responsiveness (#42422) @j4marcos
- [material-ui] Add the Pashto locale (#42244) @sayoubiaf
- [material-ui] Remove duplicate Design Kits page (#42338) @danilo-leal
- [material-ui] Document callback to access theme in GlobalStyles (#42257) @aarongarciah
- [material-ui] Add minor modifications to the Vertical stepper demo (#42342) @mihilt
- [material-ui][Tabs] Improve the Basic Tabs demo (#42374) @MatheusEli
- [pigment-css] Polish redirection mention @oliviertassinari

### Core

- [blog] Add fixes and clean ups to the Blog page (#42311) @danilo-leal
- [blog] Add the "Product" tag to the Pigment CSS post (#42365) @danilo-leal
- [code-infra] Simplify .stylelintrc.js @oliviertassinari
- [code-infra] Fix stylelint locally (#42411) @oliviertassinari
- [code-infra] Run corepack enable on all CI jobs (#42331) @Janpot
- [code-infra] Create examples eslint rule (#42170) @oliviertassinari
- [core] Apply React 19 type changes that don't require upcoming `@types/` packages (#42346) @DiegoAndai
- [core] Remove `react-swipeable-views-utils` package from docs (#42378) @ZeeshanTamboli
- [core] Update `@testing-library/react` and `@testing-library/dom` packages (#42349) @ZeeshanTamboli
- [core] Remove `@types/prettier` package (#42339) @ZeeshanTamboli
- [core] Remove `WyW-in-JS` from Renovate config (#42335) @ZeeshanTamboli
- [docs-infra] Split feedback channels per product (#42413) @alexfauquette
- [docs-infra] Avoid cryptic errors when tests don't exist (#42356) @Janpot
- [docs-infra] Make menu styles consistent (#42387) @danilo-leal
- [docs-infra] Display deprecation messages in API pages (#42352) @aarongarciah
- [docs-infra] Standardize API pages Alert styles (#42386) @danilo-leal
- [docs-infra] Fix Toolpad Core API links (#42362) @apedroferreira
- [docs-infra] Tigthen up the header design (#42180) @danilo-leal
- [docs-infra] Add Toolpad to muiNpmOrgs for codesandbox demos (#42316) @Janpot
- [docs-infra] Allow JSDoc tags (#42337) @aarongarciah
- [test] Remove `userAgent` override in `jsdom` env (#42344) @cherniavskii
- [utils] Fix GitHub-reported prototype pollution vulnerability in `deepmerge` (#41652) @tjcouch-sil

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @apedroferreira, @brijeshb42, @cherniavskii, @ChronicusUA, @danilo-leal, @DiegoAndai, @fedirjh, @j4marcos, @Janpot, @KenanYusuf, @lhilgert9, @lucasgmelo, @MatheusEli, @mihilt, @mnajdova, @nikitaa24, @oliviertassinari, @sayoubiaf, @siriwatknp, @tjcouch-sil, @ZeeshanTamboli

## 6.0.0-alpha.8

<!-- generated comparing v6.0.0-alpha.7..next -->

_May 21, 2024_

A big thanks to the 7 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@6.0.0-alpha.7`

- [material-ui] Filter only valid theme palette for generating styles (#42147) @siriwatknp
- [material-ui] Remove UMD bundle (#42172) @ZeeshanTamboli
- [material-ui][TextField] Deprecate `*Props` props (#42062) @DiegoAndai

### Docs

- [docs] Remove Base UI from the README (#42307) @danilo-leal
- [docs][material-ui] Fix typo in style interoperability with Tailwind CSS docs (#42279) @ZeeshanTamboli
- [docs][material-ui] Add supported browsers section to migration guide (#42194) @DiegoAndai
- [docs][material-ui][Pagination] Clarify pagination `page` prop API (#42220) @Mandar-Pandya

### Core

- [blog] Update blog post OG image (#42270) @danilo-leal
- [blog] Update Pigment CSS post (#42266) @danilo-leal
- [docs] Remove LocalMonero (#42224) @oliviertassinari
- [docs-infra] Fix keyboard navigation on page tabs (#42152) @danilo-leal
- [code-infra] Remove raw-loader (#42275) @Janpot
- [core] Remove outdated Babel plugins (#42140) @ZeeshanTamboli
- [core] Fix a few more key spread issues (#42168) @oliviertassinari

All contributors of this release in alphabetical order: @danilo-leal, @DiegoAndai, @Janpot, @Mandar-Pandya, @oliviertassinari, @siriwatknp, @ZeeshanTamboli

## 6.0.0-alpha.7

<!-- generated comparing v6.0.0-alpha.6..next -->

_May 16, 2024_

A big thanks to the 14 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.7`

- [Autocomplete] Deprecate `componentsProps` props (#42179) @lhilgert9
- [Autocomplete] Improve design when there's a start adornment for small autocomplete (#41781) @TahaRhidouani
- [Autocomplete] deprecate `*Component` and `*Props` for v6 (#41875) @lhilgert9
- [CircularProgress] Deprecate composed classes (#42076) @sai6855
- [ToggleButtonGroup] Add missing `selected` class in ToggleButtonGroupClasses type (#42243) @tarunrajput

### `@mui/codemod@6.0.0-alpha.6`

- [Divider] Only apply codemod if light prop is present (#42098) @DiegoAndai

### Docs

- Fix 301 to Figma @oliviertassinari
- Fix use of deprecated React API (#42118) @oliviertassinari
- Remove the Base notification (#42191) @danilo-leal
- [material-ui] Improve descriptions for deprecated props (#42221) @aarongarciah
- [material-ui] Fix typo in composition docs (#42195) @aarongarciah

### Core

- [blog] Introducing Pigment CSS blog post (#42198) @samuelsycamore
- [core] Remove confusing comment @oliviertassinari
- [core] Match other repositories and convention @oliviertassinari
- [core] Fix React 18.3 warnings about spreading keys in the Material UI `Autocomplete` component (#42099) @heath-freenome
- [core] Remove unecessary quotes @oliviertassinari
- [docs-infra] Share code for section title (#42236) @alexfauquette
- [docs-infra] Limit the copy button to the visible code block (#42115) @danilo-leal
- [docs-infra] Make select components with two capital letters (#42004) @alexfauquette
- [docs-infra][toolpad] Fix Page title and SERP title mismatch (#41919) @bharatkashyap

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @arthurbalduini, @bharatkashyap, @danilo-leal, @DiegoAndai, @heath-freenome, @lhilgert9, @noraleonte, @oliviertassinari, @sai6855, @samuelsycamore, @TahaRhidouani, @tarunrajput

## 6.0.0-alpha.6

<!-- generated comparing v6.0.0-alpha.5..next -->

_May 8, 2024_

A big thanks to the 10 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.6`

- [Chip] Add colorDefault class to chipClasses (#42067) @sai6855
- Migrate components to support CSS extraction (#42001) @siriwatknp
- [SpeedDial] Deprecate TransitionComponent (#40698) @harry-whorlow

### `@mui/codemod@6.0.0-alpha.6`

- Add `theme-v6` migration (#42056) @siriwatknp

### `@mui/icons-material@6.0.0-alpha.6`

- Add the Emergency icon (#42080) @danilo-leal

### Docs

- [autocomplete] Fix duplicate autocomplete id (#42086) @oliviertassinari
- Fix SEO redirection issues @oliviertassinari
- [material-ui] Fix broken link (#42142) @aarongarciah
- [material-ui][docs] Fix link on the Sync page (#42088) @danilo-leal

### Core

- [blog] Shorten title to fit @oliviertassinari
- [blog] Update Sync post OG image (#42114) @danilo-leal
- [blog] A few tweaks in introducing-sync-plugin (#42092) @oliviertassinari
- [code-infra] Add canary release scripts (#41949) @michaldudak
- [code-infra] Move ComponentLinkHeader to @mui/docs (#42061) @Janpot
- [code-infra] Bump node image used by CI in docker (#42079) @LukasTy
- [core] Restrict import path with ESLint (#41970) @oliviertassinari
- [docs-infra] Add design and formatting improvements (#42063) @danilo-leal
- [docs-infra] Fix HTML structure violations (#42085) @oliviertassinari

All contributors of this release in alphabetical order: @aarongarciah, @danilo-leal, @harry-whorlow, @Janpot, @joserodolfofreitas, @LukasTy, @michaldudak, @oliviertassinari, @sai6855, @siriwatknp

## 6.0.0-alpha.5

<!-- generated comparing v6.0.0-alpha.4..next -->

_May 1, 2024_

A big thanks to the 9 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.5`

- [FormControlLabel] Deprecate `componentsProps` (#41767) @sai6855
- [PaginationItem] Deprecate components prop (#41777) @sai6855
- [SvgIcon] Convert to support CSS extraction (#41779) @aarongarciah

### `@mui/base@5.0.0-beta.43`

- [TextareaAutosize] Fix resizing instability (#41638) @ZeeshanTamboli

### Docs

- Fix small SEO issues @oliviertassinari
- [material-ui] Fix minor spelling error in the "About the lab" page (#42073) @ryanhartwig
- [material-ui] Update Figma plugin name (#41967) @danilo-leal
- [material-ui][templates] Fix input props attributes in Landing Page template (#42013) @5-tom
- [system] Update typo on the sx prop page (#42035) @bricker

### Core

- [docs-infra] Clean up branding theme file and improve font-face readibility (#42023) @danilo-leal
- [docs-infra] Simplify docs demo (#42016) @oliviertassinari
- [wesbite] Remove duplicate MarkdownElement component (#42028) @danilo-leal

All contributors of this release in alphabetical order: @5-tom, @aarongarciah, @bricker, @danilo-leal, @mnajdova, @oliviertassinari, @ryanhartwig, @sai6855, @ZeeshanTamboli

## 6.0.0-alpha.4

<!-- generated comparing v6.0.0-alpha.3..next -->

_Apr 24, 2024_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 🔥 Converted 3 more Material UI components to use Pigment CSS.
- ℹ️ Pigment CSS now lives in [its own repository](https://github.com/mui/pigment-css)! From now on, all future development will happen there.

### `@mui/material@6.0.0-alpha.4`

- [Checkbox] Convert to support CSS extraction (#41957) @lhilgert9
- [IconButton] Convert to support CSS extraction (#41850) @gijsbotje
- [Radio] Convert to support CSS extraction (#41840) @lhilgert9
- [Typography] Fix ownerState prop placement (#41903) @sai6855
- Generate typography tokens (#41703) @siriwatknp
- Move typography CSS variables to `font` (#42003) @siriwatknp
- Fix getOverlayAlpha type (#41995) @oliviertassinari
- Support CSS Extraction using codemod (#41935) @siriwatknp

### `@mui/icons-material@6.0.0-alpha.4`

- [icons] Update the icons package (#41937) @danilo-leal

### Docs

- [material-ui] Remove react-swipeable-views from demos as it's no longer maintained (#41912) @soler1212
- [material-ui] Add dark theme thumbnails for templates (#41947) @zanivan
- [material-ui] Remove links and interdependencies from free templates (#41941) @zanivan
- [material-ui] Add missing backticks to HTML tag in the installation page (#41972) @Miguelrom
- Fix 301 Toolpad links @oliviertassinari
- Fix 301 image redirections @oliviertassinari

### Core

- pnpm docs:zipRules && vale sync @oliviertassinari
- Remove @pigment-css/\* packages (#41965) @mnajdova
- [code-infra] Move the HighlightedCode component to @mui/docs (#41859) @Janpot
- [code-infra] Move the HighlightedCode component to @mui/docs (#41859) @Janpot
- [code-infra] Make Babel config path configurable in API docs builder (#41999) @michaldudak
- [docs-infra] Fix flex-shrink pro-plan (#41990) @oliviertassinari
- [docs-infra] Allow more value uses of MUI (#41706) @oliviertassinari
- [docs-infra] Move CPU to shared config (#41901) @oliviertassinari
- [docs-infra] Improve Twitter OG:image (#41860) @oliviertassinari
- [docs-infra] Adapt docs infra to Base UI docs needs (#41963) @michaldudak
- [docs-infra] Add demo container design refinements (#41948) @danilo-leal
- [docs-infra] Use the `getLayout` on the material demo pages (#41936) @alexfauquette
- [test] Update browser versions in karma config (#42008) @ZeeshanTamboli

All contributors of this release in alphabetical order: @alexfauquette, @danilo-leal, @gijsbotje, @Janpot, @lhilgert9, @michaldudak, @Miguelrom, @mnajdova, @oliviertassinari, @rluzists1, @sai6855, @siriwatknp, @soler1212, @zanivan, @ZeeshanTamboli

## 6.0.0-alpha.3

<!-- generated comparing v6.0.0-alpha.2..next -->

_Apr 17, 2024_

A big thanks to the 24 contributors who made this release possible. Here are some highlights ✨:

- 🔥 Converted 5 more Material UI components to use Pigment CSS.
- 🚀 Added container queries utility to the `@mui/system` package (#41674) @siriwatknp.

### `@mui/material@6.0.0-alpha.3`

- Convert `LinearProgress` to support Pigment CSS (#41816) @siriwatknp
- [Dialog] Prevent onClick on the root element from being overwritten (#41881) @ryanburr
- [FloatingActionButton] Convert to support CSS extraction (#41851) @gijsbotje
- Convert `CircularProgress` to support Pigment CSS (#41776) @siriwatknp
- [PaginationItem] Convert to support CSS extraction (#41848) @gijsbotje
- [StepConnector] deprecate composed classes (#41740) @sai6855
- [StepLabel] Deprecate `StepIconComponent`, `StepIconProps` (#41835) @sai6855
- [ToggleButton] Convert to support CSS extraction (#41782) @lhilgert9
- [ToggleButtonGroup] Deprecate composed classes (#41288) @sai6855
- [Typography] Fix Typography inherit variant styles (#41308) @kealjones-wk

### `@mui/system@6.0.0-alpha.3`

- Add container queries utility (#41674) @siriwatknp

### `@mui/codemod@6.0.0-alpha.3`

- Add styled v6 transformation (#41743) @siriwatknp

### `@mui/joy@5.0.0-beta.36`

- [Button] Disable text highlighting (#41902) @mithun522

### `@pigment-css/react@0.0.7`

- Patch WyW's WeakRef usage (#41909) @DiegoAndai
- Implement sx transform for system components (#41861) @brijeshb42

### Docs

- [material-ui] Add Connect-related content (#40848) @danilo-leal
- [material-ui] Fix credit comment typo (#41872) @aarongarciah
- [material-ui] Remove Data Grid v7 beta callout (#41839) @cherniavskii
- [material-ui] Add stray design tweaks to free templates (#41696) @zanivan
- [material-ui] Simplify components styling on templates (#41845) @zanivan
- [material-ui][Button] Add `onChange` event handler to file upload example (#41863) @aarongarciah
- [material-ui] Fix import statement in migration guide (#41852) @sai6855
- Fix 301 redirection @oliviertassinari
- Fix format git diff regression (#41882) @oliviertassinari
- Fix small SEO issues @oliviertassinari
- [pigment-css] Fix README typos (#41870) @MohammadShehadeh

### Core

- Begin removing IE 11-related code (#41709) @iammminzzy
- [blog] Add post to introduce the Connect plugin (#41763) @danilo-leal
- [code-infra] Fix require.context with aliases (#41682) @Janpot
- [code-infra] Allow customizing hooks imports in API docs generator (#41828) @michaldudak
- [codemod] Add utils for `*Component` and `*Props` props deprecations (#41685) @DiegoAndai
- Replace bundle size reporter filter (#38979) @Janpot
- [docs-infra] Make the whole header clickable (#39603) @MoazMirza-13
- [docs-infra] Improve demo container and related components design (#41827) @danilo-leal
- [docs-infra] Use edge function for card generation (#41188) (#41836) @alexfauquette
- [docs-infra] Fix code block layout shift (#41917) @oliviertassinari
- [docs-infra] Fine-tune the OG card image design (#41862) @danilo-leal
- [docs-infra] Fix markdown version for material (#41908) @alexfauquette
- [docs-infra] Support multiple tabs in demos (#40901) @bharatkashyap

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @bharatkashyap, @brijeshb42, @cherniavskii, @danilo-leal, @DiegoAndai, @EyaOuenniche, @gijsbotje, @iammminzzy, @Janpot, @kealjones-wk, @lhilgert9, @magnimarels, @michaldudak, @mithun522, @mnajdova, @MoazMirza-13, @MohammadShehadeh, @oliviertassinari, @ryanburr, @sai6855, @siriwatknp, @zanivan

## 6.0.0-alpha.2

<!-- generated comparing v6.0.0-alpha.1..next -->

_Apr 9, 2024_

A big thanks to the 5 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@6.0.0-alpha.2`

- [typescript][Select] Fix `muiName` property TypeScript error (#41726) @EyaOuenniche
- [l10n] Fix typo in is-IS locale (#41810) @magnimarels

### `@pigment-css/react@0.0.6`

- [core] Remove `muiName` during eval phase (#41811) @brijeshb42

### `@pigment-css/nextjs-plugin@0.0.6`

- [nextjs] Handle file references passed through imports (#41817) @brijeshb42
- [nextjs] Allow usage of url() CSS function (#41758) @brijeshb42

### Docs

- [docs] Fix 301 links @oliviertassinari
- [pigment-css][docs] Fix README typo (#41808) @aarongarciah
- [pigment-css][docs] Fix output on dynamic styles example (#41805) @aarongarciah
- [material-ui][docs] Fix Material 3 message typo (#41821) @aarongarciah
- [material-ui][docs] Add stray design tweaks to free templates (#41696) @zanivan

### Core

- [core] Remove unused files (#41818) @mnajdova
- [docs-infra] Fix analytics about inline ads (#41474) (#41819) @alexfauquette
- [docs-infra] Fix drawer performances (#41807) @alexfauquette

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @brijeshb42, @EyaOuenniche, @oliviertassinari

## 6.0.0-alpha.1

<!-- generated comparing v6.0.0-alpha.0..next -->

_Apr 5, 2024_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- 🔥 Converted 3 more Material UI components to use Pigment CSS. Current progress is 36%!
- 🚀 Added a spacing CSS variable to the Material UI and Joy UI themes.
- 💫 Added 3 redesigned free Material UI templates: [Sign-in](https://next.mui.com/material-ui/getting-started/templates/sign-in/), [Sign-in side](https://next.mui.com/material-ui/getting-started/templates/sign-in-side/), and [Sign-up](https://next.mui.com/material-ui/getting-started/templates/sign-up/).

### `@mui/material@6.0.0-alpha.1`

- [AppBar] Convert to support CSS extraction (#41247) @mnajdova
- [Badge] Deprecate components and componentsProps (#41655) @skmanoj322
- [Button] Convert to support CSS extraction (#41378) @siriwatknp
- [ButtonGroup] Convert to support CSS extraction (#41666) @zanivan
- [RadioGroup] Apply classnames (#41610) @ZeeshanTamboli
- [Slider] Move palette styles to the bottom (#41676) @siriwatknp
- Add the `spacing` theme token (#40224) @siriwatknp

### `@mui/system@6.0.0-alpha.1`

- Add the `spacing` theme token to be used in `theme.spacing()` (#40224) @siriwatknp

### `@mui/codemod@6.0.0-alpha.1`

- [codemod] Setup v6 codemod structure (#41668) @DiegoAndai

### `@mui/lab@6.0.0-alpha.1`

- [TabPanel] Add keepMounted prop to match Joy UI (#41651) @ppaskaris-plooto

### `@mui/joy@5.0.0-beta.34`

- Add `spacing` theme token (#40224) @siriwatknp

### `@pigment-css/react@0.0.5`

- Improve sx prop support (#41589) @brijeshb42
- Fix Emotion styled error (#41699) @siriwatknp
- Fix propTypes removal during eval stage (#41695) @brijeshb42
- Fix props forwarding (#41688) @siriwatknp
- Fix sx prop transformation on Box (#41705) @brijeshb42

### `@pigment-css/vite-plugin@0.0.5`

- Use constant filename for pigment styles (#41667) @brijeshb42

### `@pigment-css/nextjs-plugin@0.0.5`

- Add missing RTL implementation (#41751) @brijeshb42

### Docs

- [pigment-css] Update README.md installation to use the next tag (#41649) @mnajdova
- [pigment-css] Add "Building design system components" guide with Pigment CSS (#41635) @siriwatknp
- Continue migration of Base UI to sperate repository @oliviertassinari
- Stick to one way to write IE 11 @oliviertassinari
- Fix typo in CONTRIBUTING.md (#41670) @adriancuadrado
- Drop IE 11 official support (#41611) @iammminzzy
- [material-ui] Fix typo on the Accordion page (#41687) @connorshea
- [pigment-css] Add small edits on the README (#41646) @danilo-leal
- [pigment-css] Edit the example app's README files (#41639) @danilo-leal

### Core

- [code-infra] Move BrandingProvider/brandingTheme/InfoCard to @mui/docs (#41206) @Janpot
- [core] Automate cherry-pick of PRs from `next` -> `master` (#41741) @aarongarciah
- [core] Update the prettier script to use the next branch (#41637) @mnajdova
- [docs-infra] Skip loading source for non-editable modules (#41588) @bharatkashyap
- [docs-infra] Vale rule for M3 (#41737) @oliviertassinari
- [docs-infra] Allows to remove edit button (#41702) @alexfauquette
- [pigment-css][examples] Add example project with Remix (#41700) @brijeshb42
- [examples] Update MUI's packages to the next version (#41701) @mnajdova
- [material-ui] Refine the Sign-in and Sign-up templates (#41192) @zanivan
- [test] Add test to display options provided to the options prop even if loading is true. (#41675) @ZeeshanTamboli
- [blog] Refresh the design slightly (#41697) @danilo-leal

All contributors of this release in alphabetical order: @aarongarciah, @adriancuadrado, @alexfauquette, @bharatkashyap, @brijeshb42, @connorshea, @danilo-leal, @DiegoAndai, @iammminzzy, @Janpot, @JCQuintas, @levigunz, @mnajdova, @oliviertassinari, @ppaskaris-plooto, @siriwatknp, @skmanoj322, @zanivan, @ZeeshanTamboli

## 6.0.0-alpha.0

<!-- generated comparing v5.15.14..next -->

_Mar 26, 2024_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🔥 Converted 10+ Material UI components to support static CSS extraction
- ⬅️ Added RTL support in Pigment CSS (#41570) @brijeshb42

### `@mui/material@6.0.0-alpha.0`

- [BottomNavigation] Convert to support CSS extraction (#41612) @aacevski
- [AvatarGroup] Convert to support CSS extraction (#41485) @zanivan
- [Backdrop] Convert to support CSS extraction (#41581) @aacevski
- [Breadcrumbs] Convert to support CSS extraction (#41496) @aacevski
- [Card] Convert to support CSS extraction (#41580) @aacevski
- [Divider] Convert to support CSS extraction (#41366) @sai6855
- [FormControl] Convert to support CSS extraction (#41613) @aacevski
- [FormGroup] Convert to support CSS extraction (#41614) @aacevski
- [MobileStepper] Convert to support CSS extraction (#41533) @aacevski
- [Modal] Support CSS extraction (#41483) @sai6855
- [Popover] Convert to support CSS extraction (#41564) @aacevski
- [Stepper] Convert to support CSS extraction (#41546) @aacevski
- [Autocomplete] Display options provided to the `options` prop even if loading is true (#41634) @nekoya
- [Backdrop] Deprecate TransitionComponent (#40677) @harry-whorlow
- [ButtonGroup] Deprecate composed classes (#41259) @sai6855
- [StepLabel] Deprecate `componentProps` prop (#41321) @sai6855
- [Chip] Convert to support CSS extraction (#41592) @DiegoAndai

### `@pigment-css/react@0.0.4`

- Fix evaluation of undefined variables (#41569) @siriwatknp
- Fix react-modal demos location (#41560) @sai6855
- [react] RTL Support (#41570) @brijeshb42

### `@mui/system@6.0.0-alpha.0`

- [core] Standardize index pattern (#41574) @DiegoAndai
- Fix typo to avoid infinite recursion in function call (#41616) @michael-land
- Move stylesheet generator to `extendTheme` (#41446) @siriwatknp

### Docs

- [joy-ui] Refresh the marketing example on the Color Inversion page (#41497) @cipherlogs
- [material-ui] Add v5 to v6 migration guide (#41561) @DiegoAndai
- [system] Add v5 to v6 migration guide (#41575) @DiegoAndai
- [material-ui][Slider] Remove `valueLabelFormat` from restricted values demo so that the tooltip thumb label displays the same as the value text (#41567) @StylesTrip
- [pigment-css] Update the RTL section on the readme (#41576) @danilo-leal

### Core

- [blog] Update the callout (#41645) @cherniavskii
- [blog] Link to Romain's blog post in MUI X v7 announcement post (#41640) @cherniavskii
- [blog] Blog post with MUI X v7.0.0 annoucement (#41563) @joserodolfofreitas
- [blog] Add post about remote (#41565) @danilo-leal
- [core] Restore the pnpm-lock.yaml (#41643) @mnajdova
- [core] Fix failing CI steps (#41636) @mnajdova
- [core] Update browser support versions (#41568) @siriwatknp
- [core] Add instructions to deploying docs guide (#41582) @DiegoAndai
- [core] Add comment explaining the frequency of no-response action runs (#41555) @michaldudak
- [core] Init the next branch (#41552) @mnajdova
- [core] Lower the frequency of no-response action runs (#41553) @michaldudak
- [core] Update peerDependencies ranges to include v6 packages (#41662) @michaldudak
- [core] Run pnpm dedupe (#41658) @michaldudak
- [core] Fix dedupe check (#41657) @Janpot
- [pigment-css][demo] Add index page for material-ui (#41577) @brijeshb42
- [pigment-css][demo] Remove app specific pnpm workspace (#41393) @brijeshb42
- [docs] Add notification for MUI X v7 blog post (#41587) @cherniavskii
- [docs] MUI X v7 blog post annoucement followup (#41601) @joserodolfofreitas
- [docs] Update the installation guides to use the next tag (#41558) @mnajdova
- [docs][material-ui] Fix typo in CSS theme variables customization (#41632) @ZeeshanTamboli
- [material-ui][docs] Remove deleted page from the sidenav (#41594) @danilo-leal

All contributors of this release in alphabetical order: @aacevski, @brijeshb42, @cherniavskii, @cipherlogs, @danilo-leal, @DiegoAndai, @harry-whorlow, @Janpot, @joserodolfofreitas, @michael-land, @michaldudak, @mnajdova, @nekoya, @sai6855, @siriwatknp, @StylesTrip, @zanivan, @ZeeshanTamboli

## Older versions

Changes before 6.x are listed in our [changelog for older versions](https://github.com/mui/material-ui/blob/HEAD/CHANGELOG.old.md).
