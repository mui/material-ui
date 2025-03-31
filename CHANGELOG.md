# [Versions](https://mui.com/versions/)

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
