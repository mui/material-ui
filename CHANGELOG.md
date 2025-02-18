# [Versions](https://mui.com/versions/)

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
