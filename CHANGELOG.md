# [Versions](https://mui.com/material-ui/getting-started/versions/)

## 9.0.0

<!-- generated comparing v9.0.0-beta.1..master -->

_Apr 7, 2026_

A big thanks to the 7 contributors who made this release possible.

🥳 We're excited to announce the stable release of Material UI v9! This major release focus on accessibility improvements, sx prop performance, and cleanup of deprecated APIs.

For more details, check out the [upgrade guide](https://mui.com/material-ui/migration/upgrade-to-v9/).

### `@mui/material@9.0.0`

- [slider] Use pointer events instead of mouse events (#48164) @mj12albert
- [switch] Add border to make it visible in high contrast mode (#48180) @silviuaavram
- [transitions] Performance improvements & misc fixes (#48151) @mj12albert
- Remove unnecessary overridesResolvers from styled components (#48204) @sai6855

### Core

- [code-infra] Setup workflow to publish internal packages (#47952) @brijeshb42
- [core-docs] Add `x-scheduler` to `MuiProductId` type (#48185) @rita-codes
- [docs-infra] Add scheduler to product switcher (#48208) @rita-codes
- [internal] Prepare libraries for v9 stable release (#48206) @siriwatknp

All contributors of this release in alphabetical order: @brijeshb42, @mj12albert, @noraleonte, @rita-codes, @sai6855, @silviuaavram, @siriwatknp

## 9.0.0-beta.1

<!-- generated comparing v9.0.0-beta.0..master -->

_Apr 2, 2026_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@9.0.0-beta.1`

#### Breaking Changes

- [grid] Remove 'column' and 'column-reverse' options from `direction` prop (#47564) @sai6855
- [icons] Remove legacy `*Outline` icons (#48116) @mj12albert
- [list-item-icon] Use theme spacing instead of hardcoded minWidth (#46597) @adiitxa

#### Changes

- [all components] Fix `slotProps.transition` types (#48153) @mj12albert
- [alert][dialog] Accessibility improvements (#48113) @silviuaavram
- [autocomplete] Fix helper text focusing input when clicked (#48156) @mj12albert
- [button-base] Add `nativeButton` prop (#47989) @mj12albert
- [input] Fix high contrast cutoff on first character (#48150) @silviuaavram
- [menu] Fix empty roving focus container (#48114) @mj12albert
- [utils] Explicitly register roving tab items with parent (#48122) @mj12albert

### Docs

- Fix HTML validation errors (#48107) @Janpot
- Fix duplicate IDs and HTML validation issues (#48095) @Janpot
- Fix the dark mode footer row shadow for the Data Grid on the advanced components page (#48149) @arminmeh
- Improve jsdom section (#48098) @oliviertassinari
- Update "Deprecated APIs removed" section to h2 in "Upgrade to v9" docs (#48115) @ZeeshanTamboli
- [docs][progress] Label all demo components (#48143) @mj12albert
- [docs-infra] Add x-scheduler to component API URL resolver (#48097) @rita-codes
- [docs-infra] Resolve some redirects (#48165) @Janpot
- [docs-infra] Update v9 Search Index (#48028) @dav-is

### Core

- [code-infra] Discover exports for bundle size report (#48170) @Janpot
- [internal] Fix use of ellipsis (#48096) @oliviertassinari
- [test] Add screenshot test for Virtualized Table (#47947) @mnajdova
- [test] Remove `componentsProp` from `describeConformance` tests (#48142) @ZeeshanTamboli
- [theme] Do not create channel tokens for custom colors when `nativeColor` is used (#47765) @ZeeshanTamboli

All contributors of this release in alphabetical order: @adiitxa, @arminmeh, @dav-is, @Janpot, @mj12albert, @mnajdova, @oliviertassinari, @rita-codes, @sai6855, @silviuaavram, @ZeeshanTamboli

## 9.0.0-beta.0

<!-- generated comparing v9.0.0-alpha.4..master -->

_Mar 25, 2026_

A big thanks to the 8 contributors who made this release possible.

### `@mui/material@9.0.0-beta.0`

#### Breaking Changes

- [linear-progress] Remove deprecated CSS classes (#48068) @mj12albert
- [list-item, list-item-text] Remove deprecated props (#48042) @siriwatknp
- [button-group] Remove deprecated classes (#48043) @siriwatknp
- [card] Remove deprecated CardHeader props (#47995) @silviuaavram
- [checkbox][radio][switch] Remove deprecated inputProps and inputRef (#48059) @siriwatknp
- [chip] Remove deprecated classes (#48046) @silviuaavram
- [dialog][modal][drawer][swipeabledrawer] Remove deprecated props and classes (#48039) @silviuaavram
- [divider] Remove deprecated CSS classes (#48075) @siriwatknp
- [drawer] Remove deprecated CSS classes (#48077) @siriwatknp
- [image-list-item-bar] Remove deprecated CSS classes (#48064) @siriwatknp
- [inputs] Remove deprecated props & classes (#48071) @mj12albert
- [material-ui] Remove unnecessary overridesResolvers from styled components (#48082) @ZeeshanTamboli
- [material-ui][system] Remove deprecated system props from Box, Stack, Typography (#48072) @siriwatknp
- [pagination-item] Remove deprecated CSS classes (#48076) @siriwatknp
- [pagination-item] Remove deprecated props (#48038) @siriwatknp
- [rating] Remove deprecated IconContainerComponent (#48019) @siriwatknp
- [select] Remove deprecated CSS classes (#48065) @mj12albert
- [slider] Remove deprecated CSS classes (#48074) @siriwatknp
- [step-connector][step-content][step-label] Remove deprecated props and classes (#48058) @siriwatknp
- [tabs][tab] Remove deprecated CSS classes (#48078) @siriwatknp
- [table-pagination][table-sort-label] Remove deprecated props and classes (#48060) @siriwatknp
- [toggle-button-group] Remove deprecated classes (#48061) @siriwatknp

#### Changes

- [system] Improve performance when using sx prop (#44254) @romgrk

### `@mui/codemod@9.0.0-beta.0`

- [codemod] Add missing codemod links in upgrade guide (#48069) @silviuaavram

### Docs

- Mention all breaking changes in changelog (#48091) @silviuaavram
- Fix link to upgrade-to-v9 docs in release CHANGELOG (#48081) @ZeeshanTamboli

### Core

- Update browserslistrc (#48085) @silviuaavram
- [code-infra] Prevent major version updates of bundler/framework packages in bundling fixtures (#48062) @Copilot
- [code-infra][icons-material] Avoid material utils barrel in createSvgIcon (#48029) @anchmelev
- [docs-infra] Migrate more leaf components to mui-docs (#48018) @brijeshb42

All contributors of this release in alphabetical order: @anchmelev, @brijeshb42, @Copilot, @mj12albert, @romgrk, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.0.0-alpha.4

<!-- generated comparing v9.0.0-alpha.3..master -->

_Mar 20, 2026_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@9.0.0-alpha.4`

#### Breaking Changes

- [accordion] Remove deprecated props (#47963) @silviuaavram
  - `TransitionComponent`
  - `TransitionProps`
- [accordionsummary] Remove deprecated CSS class (#48006) @silviuaavram
  - `contentGutters`
- [alert] Remove deprecated CSS classes (#48011) @silviuaavram
  - `standardSuccess`
  - `standardInfo`
  - `standardWarning`
  - `standardError`
  - `outlinedSuccess`
  - `outlinedInfo`
  - `outlinedWarning`
  - `outlinedError`
  - `filledSuccess`
  - `filledInfo`
  - `filledWarning`
  - `filledError`
- [alert] Remove deprecated props (#47965) @silviuaavram
  - `components`
  - `componentsProps`
- [autocomplete] Remove deprecated props (#47864) @ZeeshanTamboli
  - `ChipProps`
  - `componentsProps`
  - `ListboxComponent`
  - `ListboxProps`
  - `PaperComponent`
  - `PopperComponent`
  - `renderTags`
- [avatar] Remove deprecated props (#47966) @silviuaavram
  - `imgProps`
- [avatargroup] Remove deprecated props (#47968) @silviuaavram
  - `componentsProps`
- [backdrop] Remove deprecated props (#47991) @silviuaavram
  - `components`
  - `componentsProps`
  - `TransitionComponent`
- [badge] Remove deprecated props (#47993) @silviuaavram
  - `components`
  - `componentsProps`
- [button] Remove deprecated CSS classes (#48012) @silviuaavram
  - Color variant classes: `textInherit`, `outlinedPrimary`, `containedSecondary`, etc.
  - Size classes: `textSizeSmall`, `iconSizeMedium`, etc.
- [circularprogress] Remove deprecated CSS classes (#48014) @silviuaavram
  - `circleDeterminate`
  - `circleIndeterminate`
- [divider] Remove deprecated prop (#48013) @atharva3333
  - `light`
- [formcontrollabel] Remove deprecated props (#48032) @atharva3333
  - `componentsProps`
- [menu] Remove deprecated props (#48021) @siriwatknp
  - `MenuListProps`
  - `PaperProps`
  - `TransitionProps`
- [mobilestepper] Remove deprecated props (#48041) @siriwatknp
  - `LinearProgressProps`
- [popover] Remove deprecated props (#48021) @siriwatknp
  - `BackdropComponent`
  - `BackdropProps`
  - `PaperProps`
  - `TransitionComponent`
  - `TransitionProps`
- [popper] Remove deprecated props (#48020) @siriwatknp
  - `components`
  - `componentsProps`
- [select] Remove deprecated props passed via `MenuProps` (#48021) @siriwatknp
  - `MenuListProps`
  - `PaperProps`
  - `TransitionProps`
- [slider] Remove deprecated props (#47996) @siriwatknp
  - `components`
  - `componentsProps`
- [speeddial] Remove deprecated props (#47998) @siriwatknp
  - `TransitionComponent`
  - `TransitionProps`
- [speeddialaction] Remove deprecated props (#47998) @siriwatknp
  - `FabProps`
  - `tooltipTitle`
  - `tooltipPlacement`
  - `tooltipOpen`
  - `TooltipClasses`
- [tabs] Remove deprecated props (#48017) @siriwatknp
  - `ScrollButtonComponent`
  - `TabIndicatorProps`
  - `TabScrollButtonProps`
  - `slots.StartScrollButtonIcon`
  - `slots.EndScrollButtonIcon`
- [textfield] Remove deprecated props (#47878) @ZeeshanTamboli
  - `InputProps`
  - `inputProps`
  - `SelectProps`
  - `InputLabelProps`
  - `FormHelperTextProps`
- [tooltip] Remove deprecated props (#47988) @siriwatknp
  - `components`
  - `componentsProps`
  - `PopperComponent`
  - `PopperProps`
  - `TransitionComponent`
  - `TransitionProps`
- [typography] Remove deprecated prop (#47986) @siriwatknp
  - `paragraph`
- [buttonbase] Key handlers should not run on a disabled non-native button (#48003) @mj12albert
- [tablepagination] Format pagination numbers according to locale (#47803) @siriwatknp
- [textfield] Use non-native label for `<TextField select/>` (#47958) @mj12albert

Check out the [v9 upgrade guide](https://mui.com/material-ui/migration/upgrade-to-v9/).

#### Changes

- [autocomplete] Optimize selected option lookup (#47953) @anchmelev
- [buttonbase] Fix native button detection (#47985) @mj12albert
- [inputbase] Fix test using removed InputProps on TextField (#48000) @siriwatknp
- [popper] Add missing classes export (#48031) @mj12albert
- [select] Fix focus visible always set on menu item (#47912) @silviuaavram
- [slider] Fix focus visible styles incorrectly applied by pointer (#47894) @mj12albert
- [slider] Accept readonly array for the value prop (#47936) @pcorpet

### `@mui/codemod@9.0.0-alpha.4`

- [codemod] Add slot key rename to `tabs-props` codemod and add to README (#48035) @siriwatknp
- [codemod] Add card-header-props migration guide (#48005) @siriwatknp

### Docs

- [blog] Lowercase 2026-MUI-X-price-changes blog post URL (#47871) @Janpot
- [docs] Wide docs layout (#47950) @noraleonte
- [docs] Mention the list of props removed in upgrade guide (#48010) @silviuaavram
- [docs] Update Autocomplete deprecated props removal migration guide docs (#47990) @ZeeshanTamboli
- [docs-infra] Extract shared App component from \_app into @mui/docs (#47933) @brijeshb42
- [docs-infra] Expose global theme object (#47964) @Janpot
- [docs][system] Update `styled` API docs for easier understanding (#47957) @olivier-lxo

### Core

- [code-infra] Add pkg-pr-new as dev dependency (#47992) @Janpot
- [code-infra] Remove CI coverage collection and upload to Codecov (#47930) @Janpot
- [core] Migrate to ESLint 10 (#47872) @brijeshb42
- [core] Remove GridLegacy component (#47956) @siriwatknp

All contributors of this release in alphabetical order: @anchmelev, @atharva3333, @brijeshb42, @Janpot, @mj12albert, @noraleonte, @olivier-lxo, @pcorpet, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.0.0-alpha.3

<!-- generated comparing v9.0.0-alpha.2..master -->

_Mar 12, 2026_

A big thanks to the 10 contributors who made this release possible. Here are some highlights ✨:

- 📖 A new [Menubar](https://mui.com/material-ui/react-menubar/) component page integrated with [Base UI](https://base-ui.com/react/components/menubar)
- ♿️ Improved the Roving TabIndex keyboard navigation for the Stepper, Tabs and MenuList components.

### `@mui/material@9.0.0-alpha.3`

#### Breaking Changes

- [stepper][menulist][tabs] Improve accessibility (#47687) @silviuaavram

#### Changes

- [autocomplete] Add `root` slot (#47852) @GerardasB
- [autocomplete] Fix popup reopening on window focus regain with openOnFocus (#47790) @aman44444
- [autocomplete] Support full slots for clearIndicator and popupIndicator (#47891) @silviuaavram
- [material-ui] Partially revert "[material-ui] Clean up duplicated CSS rules (#47838)" (#47927) @sai6855

### Docs

- [docs][codemod] Add v7 migration docs for deprecated Autocomplete APIs and Autocomplete codemod (#47945) @ZeeshanTamboli
- [docs] Update faq about vendor chunks (#47747) @Janpot
- [docs] Use direct palette vars in Tailwind v4 snippet (#47940) @Ahmad-Alaziz
- [docs][menubar] Add Menubar component page (#47616) @siriwatknp

### Core

- [core] Fix the release prepare steps (#47951) @silviuaavram
- [core] Remove Joy UI code and docs (#47939) @mnajdova
- [code-infra] Add previously missed export of themeCssVarsAugmentation (#47918) @brijeshb42
- [docs-infra] Import font module for nextjs transpilation (#47935) @brijeshb42
- [docs-infra] Migrate simpler modules from docs to mui-docs (#47897) @brijeshb42
- [test] Fix detached anchorEl elements in tests (#47929) @Janpot

All contributors of this release in alphabetical order: @Ahmad-Alaziz, @aman44444, @brijeshb42, @GerardasB, @Janpot, @mnajdova, @sai6855, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.0.0-alpha.2

<!-- generated comparing v9.0.0-alpha.1..master -->

_Mar 5, 2026_

A big thanks to the 4 contributors who made this release possible.

### @mui/material@9.0.0-alpha.2

- Clean up duplicated CSS rules (#47838) @sai6855

### @mui/system@9.0.0-alpha.2

- Refactor sortContainerQueries to define regex outside of sort function (#47817) @sai6855

### Docs

- Move shared components to @mui/docs package (#47672) @Janpot
- Fix small typo in NumberField page (#47877) @arthur-plazanet

### Core

- [code-infra] Reduce paths for attw checks (#47896) @brijeshb42
- [docs-infra] Run syncTeamMembers (#47900) @Janpot

All contributors of this release in alphabetical order: @arthur-plazanet, @brijeshb42, @Janpot, @sai6855

## 9.0.0-alpha.1

<!-- generated comparing v9.0.0-alpha.0..master -->

_Feb 26, 2026_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

### @mui/material@9.0.0-alpha.1

#### Breaking Changes

- [Autocomplete] Prevents Autocomplete menu from opening on right click (#47797) @silviuaavram
- [Backdrop] Remove aria-hidden by default (#47798) @silviuaavram
- [ButtonBase] Ensure that onClick propagates when non-native button is clicked (#47800) @silviuaavram
- [Dialog][Modal] Remove `disableEscapeKeyDown` prop (#47695) @silviuaavram
- [Grid] Remove system props support (#47846) @siriwatknp
- [theme] Remove MuiTouchRipple from theme component types (#47849) @siriwatknp
- [useAutocomplete] Improve isOptionEqualToValue value argument type (#47801) @silviuaavram

#### Changes

- [TableCell][theme] Apply `alpha` before color mixing to border bottom color when nativeColor + cssVariables is used (#47762) @ZeeshanTamboli
- [Tooltip] Fix error is thrown when wrapping an input which is disabled while focused (#47684) @ZeeshanTamboli

### Docs

- [docs] Add updated community theme resource (#47847) @PeterTYLiu
- [docs] Few copy fixes (#47806) @pavan-sh
- [docs] Fix IPA reader link in blog post (#47796) @pavan-sh
- [docs] Fix JSX in Overriding component structure docs (#47799) @ZeeshanTamboli
- [docs] Fix the keyboard navigation in GroupedMenu example (#47842) @silviuaavram
- [docs] Fix Theme builder video (#47835) @oliviertassinari
- [docs] Update pricing sankey as done (#47795) @alexfauquette
- [docs][system] Update sizing docs to clarify `(0, 1]` behavior. (#47845) @matthias-ccri

### Core

- [blog] Blogpost for upcoming price changes for MUI X (#47748) @DanailH
- [code-infra] Detect browser envs that don't support layout (#47813) @Janpot
- [code-infra] Enable undefined addition to optional properties (#47750) @brijeshb42
- [code-infra] Exclusively enable test mode in jsdom (#47812) @Janpot
- [code-infra] Fix console.warn during test (#47802) @Janpot
- [code-infra] Remove vale as a workspace dependency (#47860) @brijeshb42
- [code-infra] Setup flat build for packages (#47670) @brijeshb42
- [code-infra] Upgrade react-docgen to v8 (#47685) @JCQuintas
- [docs-infra] Reapply Cookie Banner with Design Fixes (#47744) @dav-is
- [internal] Remove legacy MUI Base API docs (#47804) @ZeeshanTamboli

All contributors of this release in alphabetical order: @alexfauquette, @brijeshb42, @DanailH, @dav-is, @Janpot, @JCQuintas, @matthias-ccri, @oliviertassinari, @pavan-sh, @PeterTYLiu, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.0.0-alpha.0

<!-- generated comparing v7.3.8..master -->

_Feb 17, 2026_

A big thanks to the 3 contributors who made this release possible.

### @mui/material@9.0.0-alpha.0

- [theme] Generate `color-mix` value on top of default generated Material UI CSS variables (#47767) @ZeeshanTamboli

### Docs

- [docs] Make tooltips describe their visible text triggers (#47658) @silviuaavram
- [docs][theme] Fix `nativeColor` docs (#47759) @ZeeshanTamboli

### Core

- [blog] A pattern for opt-in type-only breaking changes in minor versions (#47622) @bernardobelchior
- [internal] Prepare libraries for first v9 alpha release (#47756) @silviuaavram

All contributors of this release in alphabetical order: @bernardobelchior, @silviuaavram, @ZeeshanTamboli

## Older versions

Changes before 9.x are listed in our [changelog for older versions](https://github.com/mui/material-ui/blob/HEAD/CHANGELOG.old.md).

Note: v8 is skipped to align the release version with MUI X v9.
