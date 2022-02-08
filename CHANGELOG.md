# [Versions](https://mui.com/versions/)

## 5.4.1

<!-- generated comparing v5.4.0..master -->

_Feb 8, 2022_

A big thanks to the 24 contributors who made this release possible. Here are some highlights ✨:

- ♿️ Snackbar messages are now announced by NVDA when using Firefox (#30774) @eps1lon
- Several 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.4.1`

- &#8203;<!-- 37 -->[AvatarGroup] Enable targeting of additional Avatar when max props is passed (#30794) @mogrady88
- &#8203;<!-- 36 -->[Badge] Fix showzero and invisible condition (#30899) @alisasanib
- &#8203;<!-- 35 -->[ButtonBase] Expose ref to TouchRipple (#30901) @m4theushw
- &#8203;<!-- 15 -->[Fab] Add support for the default theme colors (#30846) @alisasanib
- &#8203;<!-- 11 -->[SelectInput] Only attach click handler to label if a labelId is passed (#30239) @johsunds
- &#8203;<!-- 09 -->[Snackbar] Ensure messages are announced in NVDA+FF (#30774) @eps1lon

### `@mui/base@5.0.0-alpha.68`

- &#8203;<!-- 10 -->[SelectUnstyled] Improve exported types (#30895) @michaldudak

### `@mui/lab@5.0.0-alpha.68`

- &#8203;<!-- 12 -->[Pickers] Fix `onDismiss` handler in `MobileDatePicker` (#30768) @Ashish2097
- &#8203;<!-- 06 -->[TimePicker] Add font family for clock numbers (#30738) @alisasanib

### `@mui/joy@5.0.0-alpha.14`

- &#8203;<!-- 14 -->[Joy] Add `IconButton` component (#30864) @siriwatknp
- &#8203;<!-- 13 -->[Joy] Use icon inside a Button (#30803) @siriwatknp

### Docs

- &#8203;<!-- 16 -->[examples] Fix vitejs example and improve HMR (#30897) @mihailgaberov
- &#8203;<!-- 33 -->[docs] Improve autocomplete "limit tags" demo (#30910) @danilo-leal
- &#8203;<!-- 34 -->[docs] Sync translations with Crowdin (#30950) @l10nbot
- &#8203;<!-- 38 -->[docs] Improve description of the disableRestoreFocus prop of the `TrapFocus` (#30912) @flaviendelangle
- &#8203;<!-- 32 -->[docs] Remove ul with div children and replace with nav element (#30534) @joeframbach
- &#8203;<!-- 31 -->[docs] Add Saleor to showcase (#30924) @cherniavskii
- &#8203;<!-- 30 -->[docs] Include JSS in styling solution interoperability guide (#30736) @garronej
- &#8203;<!-- 29 -->[docs] Fix contents of link-underline-hover (#30904) @pppp606
- &#8203;<!-- 28 -->[docs] Fix markdown table format (#30947) @oliviertassinari
- &#8203;<!-- 27 -->[docs] Add missing import to RTL guide (#30891) @CFarhad
- &#8203;<!-- 26 -->[docs] Fix WithStyles import statement for @mui/styles (#30942) @altruity
- &#8203;<!-- 25 -->[docs] Fix broken roadmap table (#30943) @cherniavskii
- &#8203;<!-- 24 -->[docs] Fix broken URL in "Edit this page" button (#30923) @cherniavskii
- &#8203;<!-- 23 -->[docs] Migrate content to the new location (#30757) @siriwatknp
- &#8203;<!-- 22 -->[docs] Fix the link to the Vite.js example project (#30872) @GneyHabub
- &#8203;<!-- 21 -->[docs] Clarify the minimum configuration for TypeScript (#30790) @mnajdova
- &#8203;<!-- 20 -->[docs] Clarify what the name of @mui/material is (#30866) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Remove migration from the releases page (#30863) @mnajdova
- &#8203;<!-- 18 -->[docs] Update Instructions for Google Maps Autocomplete (#30849) @kjschabra
- &#8203;<!-- 17 -->[docs] Hotfix notification <b> (#30862) @siriwatknp
- &#8203;<!-- 04 -->[website] Sample GA to avoid hit limit (#30919) @oliviertassinari
- &#8203;<!-- 03 -->[website] Hide scrollbars of hero containers (#29474) @theiliad
- &#8203;<!-- 02 -->[website] Polishing spacing and other small things (#30828) @danilo-leal
- &#8203;<!-- 01 -->[website] Close the Developer Advocate role (#30867) @oliviertassinari

### Core

- &#8203;<!-- 37 -->[core] Batch small fixes (#30952) @oliviertassinari
- &#8203;<!-- 34 -->[core] Rename the GitHub org (#30944) @oliviertassinari
- &#8203;<!-- 33 -->[core] Fix propTypes in components where OverridableStringUnion is used (#30682) @paales
- &#8203;<!-- 08 -->[test] Codify the difference between keyup and keydown in SelectUnstyled (#30857) @eps1lon
- &#8203;<!-- 07 -->[test] Fix typo (#30841) @caioagiani
- &#8203;<!-- 05 -->[utils] Use built-in hook when available for useId (#30654) @eps1lon

All contributors of this release in alphabetical order: @alisasanib, @altruity, @Ashish2097, @caioagiani, @CFarhad, @cherniavskii, @danilo-leal, @eps1lon, @flaviendelangle, @garronej, @GneyHabub, @joeframbach, @johsunds, @kjschabra, @m4theushw, @michaldudak, @mihailgaberov, @mnajdova, @mogrady88, @oliviertassinari, @paales, @pppp606, @siriwatknp, @theiliad

## 5.4.0

<!-- generated comparing v5.3.1..master -->

_Feb 1, 2022_

A big thanks to the 22 contributors who made this release possible. Here are some highlights ✨:

- 🛠 @goncalovf added an example project using [MUI with Vite.js](https://github.com/mui/material-ui/tree/master/examples/vitejs) (#28241)
- Number of 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.4.0`

#### Breaking changes

- &#8203;<!-- 27 -->[core] Do not reexport Base from Material (#30853) @michaldudak

  All Base components were exported from the `@mui/material` package and treated as stable even though the `@mui/base` package is in development. It could create a lot of confusion if developers start using Base components, depend on them, and demand quality found in "proper" Material components. We admit it was a mistake to reexport these components without marking them as unstable.

  Developers are still encouraged to evaluate the Base components, but they should do so by explicitly installing the `@mui/base` package.

  This is technically a breaking change as it removes a number of components from the `@mui/material` package. However, we believe that removing the components now and potentially breaking the codebases will do less harm than introducing "silent" breaking changes to Base components while continuing reexporting them from `@mui/material`.

  Note: the utility components, such as ClickAwayListener, NoSsr, Portal, and TextareaAutosize continue to be exported from both `@mui/material` and `@mui/base`.

  If you're encountering build errors after upgrading @mui/material, do the following:

  1. Install @mui/base: npm install @mui/base or yarn add @mui/base
  2. Make sure the version of @mui/base match the version of @mui/material
  3. Change the import paths of unstyled components from @mui/material to @mui/base, e.g.:

  ```diff
  - @import ButtonUnstyled from '@mui/material/ButtonUnstyled';
  + @import ButtonUnstyled from '@mui/base/ButtonUnstyled';
  ```

#### Changes

- &#8203;<!-- 30 -->[Autocomplete] Add `readOnly` prop (#30706) @ZeeshanTamboli
- &#8203;<!-- 29 -->[Autocomplete] Fix typos in the page (#30737) @austinewuncler
- &#8203;<!-- 14 -->[FormControlLabel][formgroup] add Mui-error class (#30656) @alisasanib
- &#8203;<!-- 13 -->[Grid] Fix prop check for applying wrap-reverse (#30813) @Hubbz
- &#8203;<!-- 07 -->[TextField] Remove notch when no label is added (#30560) @alisasanib
- &#8203;<!-- 06 -->[TextField] Remove usage of dangerouslySetInnerHTML (#30776) @Jack-Works
- &#8203;<!-- 05 -->[TreeView] Select node when key `Enter` is pressed (#30795) @dryrainbow
- &#8203;<!-- 04 -->[useMediaQuery] Ensure no tearing in React 18 (#30655) @eps1lon

### `@mui/base@5.0.0-alpha.67`

- &#8203;<!-- 11 -->[SelectUnstyled] Create unstyled select (+ hook) (#30113) @michaldudak

### `@mui/lab@5.0.0-alpha.67`

- &#8203;<!-- 23 -->[DateTimePicker] Fix month view highlight wrong tab (#30773) @DiegoYungh
- &#8203;<!-- 12 -->[pickers] Enable the sx props on all components (#30749) @boutahlilsoufiane

### Docs

- &#8203;<!-- 28 -->[blog] Introducing callback support in style overrides (#30668) @siriwatknp
- &#8203;<!-- 23 -->[docs] Add notifications for the blog posts (#30852) @siriwatknp
- &#8203;<!-- 22 -->[docs] Improve the interoperability guide (#30785) @mnajdova
- &#8203;<!-- 21 -->[docs] Improve the Getting Started documentation content (#30808) @mnajdova
- &#8203;<!-- 20 -->[docs] Fix typo in ad fallback (#30823) @cherniavskii
- &#8203;<!-- 19 -->[docs] Change ThemeProvider API links (#30705) @atakanzen
- &#8203;<!-- 18 -->[docs] Retain vendor prefixing in rtl example (#30710) @ryancogswell
- &#8203;<!-- 17 -->[docs] Fix typo in the Popper ScrollPlayground demo (#30780) @tanyabouman
- &#8203;<!-- 16 -->[docs] Small fixes on the jss-to-tss migration guide (#30734) @garronej
- &#8203;<!-- 15 -->[examples] Add Vite.js example (#28241) @goncalovf

### Core

- &#8203;<!-- 29 -->[core] Clarify the label, to match with MUI X (#30831) @oliviertassinari
- &#8203;<!-- 26 -->[core] Remove none code related instructions from git (#30843) @oliviertassinari
- &#8203;<!-- 25 -->[core] Fix typos in comments for scripts (#30809) @aefox
- &#8203;<!-- 24 -->[core] Fix 301 link in the blog @oliviertassinari
- &#8203;<!-- 10 -->[test] Fix tests on Node 16 (#30819) @michaldudak
- &#8203;<!-- 09 -->[test] Add explicit types to support noImplicityAny=false (#30798) @m4theushw
- &#8203;<!-- 08 -->[test] Support React.useId format in \*DescriptionOf (#30657) @eps1lon
- &#8203;<!-- 03 -->[website] Fix SEO issues (#30829) @oliviertassinari
- &#8203;<!-- 02 -->[website] Add designer position page (#30708) @danilo-leal
- &#8203;<!-- 01 -->[website] Polish /about page (#30747) @oliviertassinari

All contributors of this release in alphabetical order: @aefox, @alisasanib, @atakanzen, @austinewuncler, @boutahlilsoufiane, @cherniavskii, @danilo-leal, @DiegoYungh, @dryrainbow, @eps1lon, @garronej, @goncalovf, @Hubbz, @Jack-Works, @m4theushw, @michaldudak, @mnajdova, @oliviertassinari, @ryancogswell, @siriwatknp, @tanyabouman, @ZeeshanTamboli

## 5.3.1

<!-- generated comparing v5.3.0..master -->

_Jan 24, 2022_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- 🛠 @mnajdova added interoperability guide for using Tailwind CSS (#30700)
- A meaningful number of 🐛 bug fixes and 📚 documentation improvements.

### `@mui/icons-material@5.3.1`

- &#8203;<!-- 04 -->[icons] Fix naming typos (#30512) @MrHBS
- &#8203;<!-- 03 -->[icons] Makes material-icons work with Joy (#30681) @siriwatknp

### `@mui/base@5.0.0-alpha.66`

- &#8203;<!-- 02 -->[SliderUnstyled] Improve typings on some internal utils (#30614) @mnajdova

### Core

- &#8203;<!-- 24 -->[core] Batch small changes (#30690) @oliviertassinari
- &#8203;<!-- 23 -->[core] Add new structure to ignore list crowdin (#30608) @siriwatknp
- &#8203;<!-- 22 -->[core] Correct version in package.json (#30677) @michaldudak
- &#8203;<!-- 01 -->[test] Fix buildApiUtils tests on Windows (#30698) @michaldudak

### Docs

- &#8203;<!-- 26 -->[blog] Enable blog index (#30724) @siriwatknp
- &#8203;<!-- 25 -->[blog] Introducing the Row Grouping feature (#30598) @alexfauquette
- &#8203;<!-- 21 -->[docs] Fix SEO crawl errors (#30733) @oliviertassinari
- &#8203;<!-- 20 -->[docs] Update migration-v4.md (#30721) @ddecrulle
- &#8203;<!-- 19 -->[docs] Fix migration issues detected by `ahrefs` (#30751) @siriwatknp
- &#8203;<!-- 18 -->[docs] Add interoprability guide for using Tailwind CSS (#30700) @mnajdova
- &#8203;<!-- 17 -->[docs] Fix typo in containedSizeMedium class (#30723) @aaneitchik
- &#8203;<!-- 16 -->[docs] Hotfix the wrong URL in X marketing page (#30729) @siriwatknp
- &#8203;<!-- 15 -->[docs] Post migration preparation fix (#30716) @siriwatknp
- &#8203;<!-- 14 -->[docs] Update remix example to restore from error pages (#30592) @mnajdova
- &#8203;<!-- 13 -->[docs] Use new URLs when enable_redirects is true (#30704) @siriwatknp
- &#8203;<!-- 12 -->[docs] Add a missing bracket in the migration-v4 guide (#30616) @chaosmirage
- &#8203;<!-- 11 -->[docs] Add Checkbox color prop change (#30697) @aaneitchik
- &#8203;<!-- 10 -->[docs] Fix migration to have singular urls (#30695) @siriwatknp
- &#8203;<!-- 09 -->[docs] Update UXPin link to new landing page (#30691) @Evomatic
- &#8203;<!-- 08 -->[docs] Close user menu on click in the responsive app bar demo (#30664) @NoahYarian
- &#8203;<!-- 07 -->[docs] Clear the difference between UI and React components (#29930) @oliviertassinari
- &#8203;<!-- 06 -->[docs] Make Autocomplete docs gender neutral (#30679) @exequielbc
- &#8203;<!-- 05 -->[docs] Update doc structure for X components (#30684) @siriwatknp

All contributors of this release in alphabetical order: @aaneitchik, @alexfauquette, @chaosmirage, @ddecrulle, @Evomatic, @exequielbc, @michaldudak, @mnajdova, @MrHBS, @NoahYarian, @oliviertassinari, @siriwatknp

## 5.3.0

<!-- generated comparing v5.2.8..master -->

_Jan 17, 2022_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 🛠 @siriwatknp added support for callbacks in styleOverrides (#30524)
- 🧩 @ZeeshanTamboli and @VicHofs improved customization of components (#30515, #30212)
- 🛠 @hbjORbj fixed the use of ResizeObserver in Masonry component (#29896)
- 📄 @danilo-leal and @siriwatknp created our own blog home page (#30121)

### `@mui/material@5.3.0`

- [Autocomplete] Add ability to pass props to `Paper` component (#30515) @ZeeshanTamboli
- [Select] Add defaultOpen prop (#30212) @VicHofs

### `@mui/system@5.3.0`

- [system][box, grid, typography] `textTransform` prop should work directly on component (#30437) @hbjORbj
- [system] Support callback value in `styleOverrides` slot (#30524) @siriwatknp

### `@mui/lab@5.0.0-alpha.65`

- [Masonry] Observe every masonry child to trigger computation when needed (#29896) @hbjORbj
- [MobileDatePicker] Fix calling onOpen when readOnly is true (#30561) @alisasanib

### `@mui/codemod@5.3.0`

- [codemod] Bump `jscodeshift` to remove `colors` dependency (#30578) @siriwatknp

### `@mui/styled-engine-sc@5.3.0`

- [styled-engine-sc] Add the withConfig API to enable using the babel plugin for styled-comonents (#30589) @mnajdova

### `@mui/joy@5.0.0-alpha.11`

- [Joy] Add `SvgIcon` component (#30570) @hbjORbj

### `@mui/base@5.0.0-alpha.65`

- [SliderUnstyled] Add useSlider hook and polish (#30094) @mnajdova

### Docs

- [docs] End code block in test/README.md (#30531) @yaboi
- [docs] Remove redundant grouping in /components/radio-buttons/ (#30065) @eps1lon
- [docs] Update migration scripts and e2e tests (#30583) @siriwatknp
- [docs] Fix migration guides for versions older than v4 (#30595) @kkirsche
- [docs] Inform about specific files for DataGrid locales (#30411) @alexfauquette
- [docs] jss-to-tss migration advise to drop clsx in favor of cx (#30527) @garronej
- [docs] Fix integration with MUI X (#30593) @oliviertassinari
- [docs] Adding peer dependencies explanation on @mui/lab README.md (#30532) @glaucoheitor
- [docs] Add missing quote in migration docs (#30587) @Atralbus
- [docs] Update link to Doit sponsor (#30586) @oliviertassinari
- [docs] Add products identifier and drawer (#30283) @siriwatknp
- [website] Fix code button with installation command (#30622) @danilo-leal
- [website] Add a Blog index page (#30121) @danilo-leal
- [website] Migrate Twitter from @MaterialUI to @MUI_hq @oliviertassinari
- [website] Add Andrii to the About Us page (#30581) @cherniavskii

### Core

- [core] Revert changes to peer dependencies (#30662) @oliviertassinari
- [core] Renovate should not try to update node (#30659) @oliviertassinari
- [core] Remove dead files (#30663) @oliviertassinari
- [core] Fix outdated TypeScript template (#30596) @oliviertassinari
- [core] Remove extra `</p>` from header of README.md (#30530) @yaboi
- [core] Fix `docs:api` script for Windows OS (#30533) @ZeeshanTamboli

All contributors of this release in alphabetical order: @alexfauquette, @alisasanib, @Atralbus, @cherniavskii, @danilo-leal, @eps1lon, @garronej, @glaucoheitor, @hbjORbj, @kkirsche, @mnajdova, @oliviertassinari, @siriwatknp, @VicHofs, @yaboi, @ZeeshanTamboli

## 5.2.8

<!-- generated comparing v5.2.7..master -->

_Jan 10, 2022_

A big thanks to the 10 contributors who made this release possible. Here are some highlights ✨:

- A meaningful number of 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.2.8`

- &#8203;<!-- 05 -->[TextField][inputlabel] Remove `pointer-events: none` property (#30493) @hbjORbj
- &#8203;<!-- 02 -->[Slider] Add `input` slot to components and componentsProps (#30362) @alexandre-lelain

### `@mui/joy@5.0.0-alpha.10`

- &#8203;<!-- 04 -->[Joy] Add `Typography` component (#30489) @siriwatknp
- &#8203;<!-- 03 -->[Joy] Add functional `Switch` component (#30487) @siriwatknp

### Docs

- &#8203;<!-- 18 -->[docs] Update markdown parser to remove backticks from description (#30495) @aefox
- &#8203;<!-- 17 -->[docs] Fix the crash when applying custom colors (#30563) @siriwatknp
- &#8203;<!-- 16 -->[docs] Location change of Sebastian (#30528) @eps1lon
- &#8203;<!-- 15 -->[docs] Lint markdown in the CI (#30395) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Fix `componentsProps` API docs and PropTypes (#30502) @ZeeshanTamboli
- &#8203;<!-- 13 -->[docs] Codemod doc for overriding styles using tss (#30499) @garronej
- &#8203;<!-- 12 -->[docs] fix edge case when replacing data-grid url for migration (#30505) @siriwatknp
- &#8203;<!-- 11 -->[docs] fix replace url for migration (#30503) @siriwatknp
- &#8203;<!-- 10 -->[docs] Prepare scripts for migrating to new structure (#30386) @siriwatknp
- &#8203;<!-- 09 -->[docs] Adjust RTL Guide demos to fully support RTL (#30387) @noam-honig
- &#8203;<!-- 08 -->[docs] Move @eps1lon to community (#30473) @oliviertassinari
- &#8203;<!-- 07 -->[docs] Fix typo and spelling in the-sx-prop.md (#30482) @aefox
- &#8203;<!-- 06 -->[docs] More general docs polishing (#30371) @danilo-leal
- &#8203;<!-- 01 -->[website] Add José on the /about page (#30492) @danilo-leal

All contributors of this release in alphabetical order: @aefox, @alexandre-lelain, @danilo-leal, @eps1lon, @garronej, @hbjORbj, @noam-honig, @oliviertassinari, @siriwatknp, @ZeeshanTamboli

## 5.2.7

<!-- generated comparing v5.2.6..master -->

_Jan 3, 2022_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 📓 Improvements on the Vietnamese (vi-VN) and Finnish (fi-FI) locales (#30426, #30442) @hckhanh @Certificate
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.2.7`

- &#8203;<!-- 14 -->[Autocomplete] Fix calling onChange for duplicate values (#30374) @alisasanib
- &#8203;<!-- 13 -->[Avatar] Fix TypeScript error on imgProps (#30255) @ahmad-reza619
- &#8203;<!-- 12 -->[Badge] Fix `classes` prop TypeScript type (#30427) @ZeeshanTamboli
- &#8203;<!-- 03 -->[SvgIcon] Allow viewBox to inherit from Component through inheritViewBox prop (#29954) @alex-dikusar
- &#8203;<!-- 04 -->[SvgIcon] Correct API docs and code style (#30470) @michaldudak

### Docs

- &#8203;<!-- 11 -->[blog] 2021 (#30425) @oliviertassinari
- &#8203;<!-- 15 -->[docs] Fix typo on the Grid docs page (#30446) @abhi45
- &#8203;<!-- 07 -->[docs] Fix `useMediaQuery` SSR example to v5 theme API (#30454) @ValentinH
- &#8203;<!-- 11 -->[docs] Improve the migration guide and add examples for transforming to `tss-react` (#30388) @mnajdova
- &#8203;<!-- 09 -->[docs] Make the reference to the select clearer (#30460) @boazrymland
- &#8203;<!-- 08 -->[docs] Sync translations with Crowdin (#30385) @l10nbot
- &#8203;<!-- 06 -->[example] Avoid double rendering in the Remix example (#30366) @mnajdova
- &#8203;<!-- 05 -->[i18n] improve viVN locale (#30426) @hckhanh
- &#8203;<!-- 04 -->[l10n] Improve fiFI locale (#30442) @Certificate
- &#8203;<!-- 02 -->[website] Add new batch of open roles (#30282) @oliviertassinari
- &#8203;<!-- 01 -->[website] Refactor page context with next router (#30020) @siriwatknp

### Core

- &#8203;<!-- 13 -->[core] Automatically close issues that are incomplete and inactive (#30459) @oliviertassinari
- &#8203;<!-- 10 -->[core] Remove contrib tweet (#30455) @oliviertassinari

All contributors of this release in alphabetical order: @abhi45, @ahmad-reza619, @alex-dikusar, @alisasanib, @boazrymland, @Certificate, @hckhanh, @l10nbot, @michaldudak, @mnajdova, @oliviertassinari, @siriwatknp, @ValentinH, @ZeeshanTamboli

## 5.2.6

<!-- generated comparing v5.2.5..master -->

_Dec 27, 2021_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 📓 The Norwegian Bokmål (nb-NO) locale was added (#27520) @wogsland
- 🛠 Introduced a new `useBadge` hook in the `@mui/base` package (#30246) @mnajdova
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.2.6`

- &#8203;<!-- 24 -->[ButtonGroup] Fix typo in ButtonGroupContext's interface (#30376) @kealjones-wk
- &#8203;<!-- 03 -->[l10n] Add Norwegian Bokmål (nb-NO) locale (#27520) @wogsland

### `@mui/base@5.0.0-alpha.62`

- &#8203;<!-- 26 -->[BadgeUnstyled] Add useBadge hook (#30246) @mnajdova

### `@mui/joy@5.0.0-alpha.8`

- &#8203;<!-- 04 -->[Joy] Button API (#29962) @siriwatknp

### Docs

- &#8203;<!-- 27 -->[docs] Fix color coercion (#30319) @Janpot
- &#8203;<!-- 25 -->[blog] Fix file import conflict resolution (#30391) @oliviertassinari
- &#8203;<!-- 21 -->[docs] Fix crash on Safari because of unsupported lookahead feature (#30345) @cherniavskii
- &#8203;<!-- 20 -->[docs] Update to new website domain (#30396) @ryota-murakami
- &#8203;<!-- 19 -->[docs] Fix text from material-ui to @mui to reflect v5 name changes (#30393) @pupudu
- &#8203;<!-- 18 -->[docs] Fix a11y in Menu demos (#30378) @ZeeshanTamboli
- &#8203;<!-- 17 -->[docs] Document how to unmount transition child (#30382) @oliviertassinari
- &#8203;<!-- 16 -->[docs] The current standard for quotes is QUOTATION MARK @oliviertassinari
- &#8203;<!-- 15 -->[docs] Fix 404 links (#30380) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Fix Breadcrumb description (#30307) @jamesmelzer
- &#8203;<!-- 13 -->[docs] Modify injection order for Gatsby and SSR examples (#30358) @ShuPink
- &#8203;<!-- 12 -->[docs] Improve the translation experience (#30373) @oliviertassinari
- &#8203;<!-- 11 -->[docs] Sync translations with Crowdin (#30176) @l10nbot
- &#8203;<!-- 10 -->[docs] Fix link to /size-snapshot (#30363) @oliviertassinari
- &#8203;<!-- 09 -->[docs] Fix incorrect aria label in SpeedDial demo (#30354) @chwallen
- &#8203;<!-- 08 -->[docs] Fix incorrect number of breakpoint helpers (#30353) @chwallen
- &#8203;<!-- 07 -->[docs] Update outdated links (#30260) @oliviertassinari
- &#8203;<!-- 06 -->[docs] Support redirects from old urls to /material/\* (#30286) @siriwatknp
- &#8203;<!-- 05 -->[examples] Fix CSS modules integration (#30381) @oliviertassinari
- &#8203;<!-- 02 -->[website] Fix SEO issues (#30372) @oliviertassinari
- &#8203;<!-- 01 -->[website] Sync sponsors (#30259) @oliviertassinari

### Core

- &#8203;<!-- 28 -->[core] Rename Material-UI to MUI (#30338) @ZeeshanTamboli
- &#8203;<!-- 23 -->[core] Fix warning in dev mode (#30368) @oliviertassinari
- &#8203;<!-- 22 -->[core] Update `buildApi` script to support new structure (#30245) @siriwatknp

All contributors of this release in alphabetical order: @cherniavskii, @chwallen, @jamesmelzer, @Janpot, @kealjones-wk, @l10nbot, @mnajdova, @oliviertassinari, @pupudu, @ryota-murakami, @ShuPink, @siriwatknp, @wogsland, @ZeeshanTamboli

## 5.2.5

<!-- generated comparing v5.2.4..master -->

_Dec 20, 2021_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- 🛠 This release mostly improves what's behind the scenes: infrastructure and tests
- 📓 Danish (da-DK) locale was added (#29485) @mikk5829
- 🖌 Polished the design of Base components (#30149) and the docs in general (#29994) @danilo-leal
- 📚 Many additions and improvements to the documentation were made

### `@mui/material@5.2.5`

- [l10n] Add Danish (da-DK) locale (#29485) @mikk5829
- [LoadingButton] Label progressbar by the LoadingButton (#30002) @eps1lon
- [Tabs] Remove unnecessary `Partial<>` type around TabIndicatorProps type (#30254) @ZeeshanTamboli

### `@mui/system@5.2.5`

- [system] Use `useEnhancedEffect` to prevent flicker (#30216) @hbjORbj

### `@mui/lab@5.0.0-alpha.61`

- [pickers] Fix the wrong MuiClockPicker's ArrowSwitcher slot name (#30226) @rejetto

### Docs

- [docs] Run JS compiler on markdown output (#29732) @Janpot
- [Badge] Add tests for `anchorOrigin` prop (#30147) @daniel-sachs
- [docs] Add cssmodule injection order comments to Nextjs example (#30213) @ShuPink
- [docs] Remove extra word in Select component code example comments (#30281) @KThompso
- [docs] Improve the description of the Accordion (#30253) @jamesmelzer
- [docs] Heading capitalization convention @oliviertassinari
- [docs] Rename remaining 'unstyled' references to 'base' (#30206) @michaldudak
- [docs] Add to migration doc about ref type specificity (#30114) @hbjORbj
- [docs] Add script to clone pages (#30107) @siriwatknp
- [docs] Correct colors in breakpoints documentation (#30219) @michaldudak
- [docs] Sync icon search UI state with the url (#30075) @Janpot
- [docs] Base components demos design polish (#30149) @danilo-leal
- [docs] General documentation polish (#29994) @danilo-leal
- [examples] Fix typo in the remix example's README (#30289) @lemol
- [website] Remove expired gold sponsor (#30222) @oliviertassinari
- [website] Remove broken showcase links (#30217) @mnajdova

### Core

- [test] Reduce bundle size comparison memory consumption (#30195) @Janpot
- [core] make snapshot comparison more resilient (#30183) @Janpot
- [core] update formatted ts demo to support new structure (#30248) @siriwatknp
- [core] cache dependencies in github actions (#30211) @siriwatknp
- [core] fix root package version (#30204) @siriwatknp
- [core] Fail the build when the dangerjs script errors (#30186) @Janpot
- [test] Add E2E website tests (#30128) @siriwatknp

All contributors of this release in alphabetical order: @daniel-sachs, @danilo-leal, @eps1lon, @hbjORbj, @jamesmelzer, @Janpot, @KThompso, @lemol, @michaldudak, @mikk5829, @mnajdova, @oliviertassinari, @rejetto, @ShuPink, @siriwatknp, @ZeeshanTamboli

## 5.2.4

<!-- generated comparing v5.2.3..master -->

_Dec 14, 2021_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- ✨ Add `not` operator to `theme.breakpoints` (#29311) @Philipp000

  ```js
  const styles = (theme) => ({
    root: {
      backgroundColor: 'blue',
      // Match [xs, md) and [md + 1, ∞)
      //       [xs, md) and [lg, ∞)
      //       [0px, 900px) and [1200px, ∞)
      [theme.breakpoints.not('md')]: {
        backgroundColor: 'red',
      },
    },
  });
  ```

- And many more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.2.4`

- &#8203;<!-- 14 -->[esm] Correct a styles imports (#29976) @Janpot
- &#8203;<!-- 12 -->[GlobalStyles] Fix `theme` type (#30072) @mnajdova
- &#8203;<!-- 11 -->[Grid] Fix grid items to respond to the container's responsive columns (#29715) @kkorach
- &#8203;<!-- 04 -->[TextField] Fix missing space before asterisk in `OutlinedInput`'s label (#29630) @alisasanib
- &#8203;<!-- 03 -->[Transition] Allow any valid HTML attribute to be passed (#29888) @Janpot
- &#8203;<!-- 02 -->[types] Fix discrepancy between core and system `ThemeOptions` (#30095) @fmeum
- &#8203;<!-- 09 -->[InputBase] Add prop for disabling global styles (#29213) @bryan-hunter
- &#8203;<!-- 08 -->[Select] Improve multiple logic (#30135) @ladygo93

### `@mui/system@5.2.4`

- &#8203;<!-- 06 -->[system] Don't transition when re-appearing (#30108) @eps1lon
- &#8203;<!-- 05 -->[system] Add `not` operator to `breakpoints` (#29311) @Philipp000

### `@mui/base@5.0.0-alpha.60`

- &#8203;<!-- 25 -->[BadgeUnstyled] Make it conformant with other base components (#30141) @mnajdova

### `@mui/icons-material@5.2.4`

- &#8203;<!-- 10 -->[icons] Correct location of icon download folder (#29839) @yaboi

### Docs

- &#8203;<!-- 22 -->[docs] Explain the use of Select's label in FormControl (#30189) @michaldudak
- &#8203;<!-- 21 -->[docs] Don't run nprogress on shallow routing (#30087) @Janpot
- &#8203;<!-- 20 -->[docs] Add Data Driven Forms to related projects (#30078) @rvsia
- &#8203;<!-- 19 -->[docs] Sync translations with Crowdin (#30067) @l10nbot
- &#8203;<!-- 18 -->[docs] Fix link on "Custom variables" section in the Theming page #30100 @danilo-leal
- &#8203;<!-- 17 -->[docs] Fix justifyContent option in the Grid interactive demo (#30117) @danilo-leal
- &#8203;<!-- 16 -->[docs] Add tip to help access the docs of a previous version when finding answers in StackOverflow (#30101) @danilo-leal
- &#8203;<!-- 15 -->[docs] Fix import example inside Unstyled Backdrop section (#30098) @TheodosiouTh
- &#8203;<!-- 01 -->[website] Column pinning and Tree data are out (#30136) @oliviertassinari
- &#8203;<!-- 07 -->[survey] Remove survey promotion items (#30122) @danilo-leal

### Core

- &#8203;<!-- 23 -->[core] Fix link to Open Collective @oliviertassinari
- &#8203;<!-- 26 -->[core] Update snapshots and s3 fallback (#30134) @Janpot
- &#8203;<!-- 24 -->[ci] Update CI bucket (#30080) @Janpot
- &#8203;<!-- 13 -->[fix] size:snapshot for mui-material-next and mui-joy components (#30106) @Janpot

All contributors of this release in alphabetical order: @alisasanib, @bryan-hunter, @danilo-leal, @eps1lon, @fmeum, @Janpot, @kkorach, @l10nbot, @ladygo93, @michaldudak, @mnajdova, @oliviertassinari, @Philipp000, @rvsia, @TheodosiouTh, @yaboi

## 5.2.3

<!-- generated comparing v5.2.2..master -->

_Dec 6, 2021_

A big thanks to the 25 contributors who made this release possible. Here are some highlights ✨:

- ✨ We have introduced a new unstyled component in `@mui/base`: `TablePagination` (#29759) @mnajdova

  <a href="https://mui.com/components/tables/#unstyled-table"><img width="800" alt="unstyled table" src="https://user-images.githubusercontent.com/4512430/144862194-584356ef-7d9d-462c-a631-186a7e716193.png"></a>

  You can follow our progress with unstyled components at https://github.com/mui/material-ui/issues/27170.

- 🎉 We have added an example of how to use MUI with [Remix](https://remix.run/) (#29952) @mnajdova

- And many more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.2.3`

- &#8203;<!-- 33 -->[Accordion] Add a test for handling `square` prop (#29972) @daniel-sachs
- &#8203;<!-- 32 -->[Alert] Fix `square` Paper prop (#30027) @ZeeshanTamboli
- &#8203;<!-- 31 -->[AvatarGroup] Allow specifying total number of avatars (#29898) @eduardomcv
- &#8203;<!-- 29 -->[Button] Fix regression from context API (#29982) @siriwatknp
- &#8203;<!-- 13 -->[Grid] Fix generated classes for `spacing` prop when the value is object (#29880) @jayeclark
- &#8203;<!-- 10 -->[Select] Should not crash when an empty array is passed with `multiple` enabled (#29957) @Domino987

### `@mui/system@5.2.3`

- &#8203;<!-- 06 -->[system] Fix return type of `createBox` (#29989) @mnajdova
- &#8203;<!-- 05 -->[system] Support boolean values in typescript for the `sx` prop when used as array (#29911) @tasugi

### `@mui/utils@5.2.3`

- &#8203;<!-- 03 -->[utils] Add typings for `@mui-material/styles/cssUtils` (#29621) @Semigradsky

### `@mui/icons-material@5.2.1`

- &#8203;<!-- 12 -->[icons] Consolidate ignored icons into one list (#29843) @chao813

### `@mui/base@5.0.0-alpha.59`

- &#8203;<!-- 30 -->[base] Fix missing ClickAwayListener barrel index export (#30000) @oliviertassinari
- &#8203;<!-- 04 -->[TablePaginationUnstyled] Introduce new component (#29759) @mnajdova

### `@mui/lab@5.0.0-alpha.59`

- &#8203;<!-- 27 -->[DateRangePicker] Fix `DateRangePickerDayProps` interface (#29067) @jonathanrtuck
- &#8203;<!-- 10 -->[Pickers] Remove propagation of custom props to the `MonthPicker` component's DOM element (#30021) @ZeeshanTamboli
- &#8203;<!-- 08 -->[StaticDatePicker] Add className and slot to PickerStaticWrapper (#29619) @kkorach

### `@mui/joy@5.0.0-alpha.5`

- &#8203;<!-- 11 -->[Joy] Theme setup (#29846) @siriwatknp

### Docs

- &#8203;<!-- 34 -->[docs] Fix link in TypeScript doc page (#30044) @genzyy
- &#8203;<!-- 26 -->[docs] Remove the 'WIP' icon from the 'Group & Pivot' page title (#30077) @flaviendelangle
- &#8203;<!-- 25 -->[docs] Add warning that `@mui/styled-engine-sc` does not work in SSR (#30026) @mnajdova
- &#8203;<!-- 24 -->[docs] Add section for CSS specificity in the migration guide (#30008) @hbjORbj
- &#8203;<!-- 28 -->[docs] Clarify comment in migration doc (#30076) @hbjORbj
- &#8203;<!-- 23 -->[docs] Sync translations with Crowdin (#30041) @l10nbot
- &#8203;<!-- 22 -->[docs] Explain how Paper changes shade in dark mode (#30003) @michaldudak
- &#8203;<!-- 21 -->[docs] Update nextjs-typescript-example (#29974) @huydhoang
- &#8203;<!-- 20 -->[docs] Add missing global state classes to API docs generator (#29945) @michaldudak
- &#8203;<!-- 19 -->[docs] Fix benchmarks folder link (#29981) @fourjr
- &#8203;<!-- 18 -->[docs] Improve wording in StackOverflow section of support page (#29956) @ronwarner
- &#8203;<!-- 17 -->[docs] Remove Black Friday sale notification (#29936) @mbrookes
- &#8203;<!-- 16 -->[examples] Fix typos in the Remix example (#30071) @MichaelDeBoey
- &#8203;<!-- 15 -->[examples] Add Remix example (#29952) @mnajdova
- &#8203;<!-- 14 -->[examples] Fix lint issue for displayName missing in the Next.js examples (#29985) @ZeeshanTamboli
- &#8203;<!-- 09 -->[Stack] Document system props in Stack API (#30069) @ThewBear
- &#8203;<!-- 07 -->[survey] Add a banner and card for promoting the 2021 survey (#29950) @danilo-leal
- &#8203;<!-- 02 -->[website] Correct the Careers page description (#30073) @michaldudak
- &#8203;<!-- 01 -->[website] Fix 301 links (#30040) @oliviertassinari

### Core

- &#8203;<!-- 31 -->[core] Batch small changes (#30042) @oliviertassinari
- &#8203;<!-- 28 -->[core] Transition to a new StackOverflow tag (#29967) @oliviertassinari

All contributors of this release in alphabetical order: @chao813, @daniel-sachs, @danilo-leal, @Domino987, @eduardomcv, @flaviendelangle, @fourjr, @genzyy, @hbjORbj, @huydhoang, @jayeclark, @jonathanrtuck, @kkorach, @l10nbot, @mbrookes, @MichaelDeBoey, @michaldudak, @mnajdova, @oliviertassinari, @ronwarner, @Semigradsky, @siriwatknp, @tasugi, @ThewBear, @ZeeshanTamboli

## 5.2.2

<!-- generated comparing v5.2.1..master -->

_Nov 29, 2021_

A big thanks to the 9 contributors who made this release possible. Here are some highlights ✨:

- ♿️ Improved accessibility of `Snackbar` and `TextField` in `@mui/material` (#29782) (#29850) (#29852) @eps1lon.
- 🎉 Added support for `sx` syntax inside `styled()` utility (#29833) @mnajdova.
- 🎉 Added support for more options for `createCssVarsProvider` in `@mui/system` (#29845) (#29857) @hbjORbj.
- And many more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.2.2`

- &#8203;<!-- 14 -->[MenuList] Add component prop (#29882) @Harshikerfuffle
- &#8203;<!-- 13 -->[Snackbar] Interrupt auto-hide on keyboard interaction (#29852) @eps1lon
- &#8203;<!-- 12 -->[Snackbar] Dismiss on Escape press (#29850) @eps1lon
- &#8203;<!-- 06 -->[TextField] Associate accessible name and description by default (#29782) @eps1lon

### `@mui/joy@5.0.0-alpha.4`

- &#8203;<!-- 15 -->[Joy] Add `Button` - 1st iteration (#29464) @siriwatknp

### `@mui/codemod@5.2.1`

- &#8203;<!-- 28 -->[codemod] Fix alias import for box-sx-prop (#29902) @siriwatknp

### `@mui/system@5.2.2`

- &#8203;<!-- 11 -->[system] CSSVarsProvider cleans up `html[style]` when unmounting (#29946) @eps1lon
- &#8203;<!-- 10 -->[system] Add support for `disableTransitionOnChange` in `createCssVarsProvider` (#29857) @hbjORbj
- &#8203;<!-- 09 -->[system] Add support for `enableColorScheme` in `createCssVarsProvider` (#29845) @hbjORbj

### `@mui/utils@5.2.2`

- &#8203;<!-- 05 -->[useId] Trade random collisions for collisions on overflow (#29781) @eps1lon
- &#8203;<!-- 04 -->[useIsFocusVisible] Convert to TypeScript (#29779) @eps1lon

### Docs

- &#8203;<!-- 24 -->[docs] Fix v5-beta confusing example description (#29932) @oliviertassinari
- &#8203;<!-- 23 -->[docs] Apply the z-index on the right DOM element (#29934) @oliviertassinari
- &#8203;<!-- 22 -->[docs] Improve git diff format (#29935) @oliviertassinari
- &#8203;<!-- 21 -->[docs] Fix typo (#29866) @sinclairity
- &#8203;<!-- 20 -->[docs] Fix key display (#29933) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Fix outdated link to next/link docs (#29937) @radlinskii
- &#8203;<!-- 18 -->[docs] Add how to pass `sx` prop (#29905) @siriwatknp
- &#8203;<!-- 17 -->[docs] Fix typo in notifications @mbrookes
- &#8203;<!-- 16 -->[docs] Black Friday sale notification @mbrookes
- &#8203;<!-- 03 -->[website] Fix canonical links (#29938) @oliviertassinari
- &#8203;<!-- 02 -->[website] Fix SEO issues (#29939) @oliviertassinari
- &#8203;<!-- 01 -->[website] Improvements to the /x product page (#28964) @danilo-leal

### Core

- &#8203;<!-- 27 -->[core] Remove dead code (#29940) @oliviertassinari
- &#8203;<!-- 26 -->[core] Move benchmark CI job from AZP to CircleCI (#29894) @eps1lon
- &#8203;<!-- 25 -->[core] Fix PR detection pattern in test_bundle_size_monitor (#29895) @eps1lon
- &#8203;<!-- 08 -->[test] Fix browser tests (#29929) @eps1lon
- &#8203;<!-- 07 -->[test] Reject shorthand properties in style matchers (#29893) @eps1lon

All contributors of this release in alphabetical order: @danilo-leal, @eps1lon, @Harshikerfuffle, @hbjORbj, @mbrookes, @oliviertassinari, @radlinskii, @sinclairity, @siriwatknp

## 5.2.1

<!-- generated comparing v5.2.0..master -->

_Nov 25, 2021_

A big thanks to the 7 contributors who made this release possible. Here are some highlights ✨:

This is an early release to fix `export 'useId' (imported as 'React') was not found in 'react'` when bundling code depending on MUI Core.

- &#8203;<!-- 10 -->[AppBar][docs] Add a fully responsive demo to docs (#29829) @karakib2k18
- &#8203;<!-- 9 -->[core] Fix PR run detection in test_bundle_size_monitor (#29879) @eps1lon
- &#8203;<!-- 8 -->[core] Move bundle size monitoring to CircleCI (#29876) @eps1lon
- &#8203;<!-- 7 -->[docs] Add keys to Responsive AppBar demo (#29884) @mbrookes
- &#8203;<!-- 6 -->[docs] MUI's 2021 Developer survey (#29765) @newguy-123
- &#8203;<!-- 5 -->[docs] Smoother image loading UX (#29858) @oliviertassinari
- &#8203;<!-- 4 -->[Select] Fix select display value with React Nodes (#29836) @kegi
- &#8203;<!-- 3 -->[system] Add `experimental_sx` utility (#29833) @mnajdova
- &#8203;<!-- 2 -->[test] Ignore "detected multiple renderers" warning for now (#29854) @eps1lon
- &#8203;<!-- 1 -->[useMediaQuery][utils] Remove usage of React 18 APIs (#29870) @eps1lon

All contributors of this release in alphabetical order: @eps1lon, @karakib2k18, @kegi, @mbrookes, @mnajdova, @newguy-123, @oliviertassinari

## 5.2.0

<!-- generated comparing v5.1.1..master -->

_Nov 23, 2021_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🧪 Created another unstyled component: [TabsUnstyled](https://mui.com/components/tabs/#unstyled) (#29597) @mnajdova.
- 🎉 Updated the Material Icons set with the latest changes from Google (#29328) @michaldudak / (#29818) @chao813.
  This update adds 200 new icons and tweaks the appearance of many more.
  With it, we're getting close to having 2000 icons in our set.
- 🐛 Fixed bugs and improved the infrastructure and documentation 📚.

### `@mui/material@5.2.0`

- [IconButton] Remove on hover effect when `disableRipple` is set (#29298) @adamfitzgibbon
- [i18n] Add the amharic language (#29153) @NatiG100
- [material] Fix types for `variants.style` to accept callbacks (#29610) @mnajdova
- [Popper] Simplify prop types (#29680) @michaldudak
- [Select] Include aria-selected=false when option not selected (#29695) @michaldudak
- [useMediaQuery] Fix crash in Safari < 14 and IE 11 (#29776) @eps1lon
- [useMediaQuery] Ensure no tearing in React 18 (#28491) @eps1lon

### `@mui/codemod@5.2.0`

- [codemod] Fix `jss-to-styled` to support multiple withStyles (#29824) @siriwatknp

### `@mui/icons-material@5.2.0`

- [icons] Sync new Google Material Icons (#29818) @chao813
- [icons] Sync recent Material Icons from Google (#29328) @michaldudak

### `@mui/system@5.2.0`

- [Box] Fix `sx` prop runtime issue when used as function (#29830) @mnajdova
- [system] Fix `sx` throw error when value is `null` or `undefined` (#29756) @siriwatknp
- [system] Fix minor CssVars issues (#29747) @siriwatknp

### `@mui/styled-engine@5.2.0`

- [styled-engine] Fix props inference in styled-engine (#29739) @Janpot

### `@mui/base@5.0.0-alpha.56`

- [FormControlUnstyled] `focused` is always false unless explicitly set to `true` @mwilkins91
- [TabsUnstyled] Introduce new component (#29597) @mnajdova

### `@mui/lab@5.0.0-alpha.56`

- [DatePicker][timepicker] Add missing component declarations (#29517) @longzheng
- [Masonry] exports from root package (#29754) @abhinav-22-tech
- [pickers] Widen accepted `luxon` version range (#29761) @eps1lon

### Docs

- [blog] MUI X v5 blog post (#29590) @DanailH
- [blog] Polish the Benny Joo joins MUI post (#29697) @oliviertassinari
- [CHANGELOG] Explain why we do breaking changes @oliviertassinari
- [core] Update latest issue template for codesandbox CI (#29783) @eps1lon
- [core] Ensure `@mui/core` is an alias for `@mui/base` (#29762) @eps1lon
- [docs] Fix broken Next and Previous links (#29711) @scallaway
- [docs] Add a note that ToggleButton exclusive does not enforce selection (#29812) @mmacu
- [docs] Update the list of supported locales (#29831) @michaldudak
- [docs] Update tooltip doc to better define touch action (#29717) @gnowland
- [website] Standardize the background color from the MUI team photos (#29738) @danilo-leal
- [website] Add Bharat to the About Us Page (#29714) @bharatkashyap
- [website] Add about page entry for jan (#29701) @Janpot
- [website] Adding Prakhar to the about page (#29737) @danilo-leal

### Core

- [test] Allow debugging with Chrome and VSCode inspector (#29777) @eps1lon
- [test] Use renderer clock instead of custom useFakeTimers call (#29778) @eps1lon
- [test] Only mock Date in regression tests (#29763) @eps1lon
- [test] Disable nightly integration tests on `next` branch (#29748) @eps1lon
- [test] Allow configuring clock directly from `createRenderer` (#29684) @eps1lon
- [test] Accept backslashes as path separators in test CLI (#29694) @michaldudak
- [utils] Use built-in hook when available for useId (#26489) @eps1lon

All contributors of this release in alphabetical order: @abhinav-22-tech, @adamfitzgibbon, @bharatkashyap, @chao813, @DanailH, @danilo-leal, @eps1lon, @gnowland, @Janpot, @longzheng, @michaldudak, @mmacu, @mnajdova, @mwilkins91, @NatiG100, @oliviertassinari, @scallaway, @siriwatknp

## 5.1.1

<!-- generated comparing v5.1.0..master -->

_Nov 16, 2021_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 🛠 Renamed `@mui/core` to `@mui/base` (#29585) @michaldudak.
- And many more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.1.1`

- &#8203;<!-- 34 -->[Breadcrumbs][divider] Replace decimal spacing values with integers and css calc (#29526) @anikcreative
- &#8203;<!-- 10 -->[Select][nativeselect] Add `multiple` class (#29566) @aaronholla
- &#8203;<!-- 09 -->[Popper] Split into PopperUnstyled and Popper (#29488) @michaldudak
- &#8203;<!-- 08 -->[Select] Make it clear that `Select` is not a root component (#29593) @hbjORbj
- &#8203;<!-- 13 -->[l10n] Improved Dutch (nl-NL) locale (#29592) @flipvrijn
- &#8203;<!-- 10 -->[Table] Improve pagination range, use "en dash" over "hyphen" (#29579) @narekmal

### `@mui/base@5.0.0-alpha.55`

#### Breaking changes

- &#8203;<!-- 27 -->[core] Rename mui/core to mui/base (#29585) @michaldudak

  Based on the results of the [poll](https://twitter.com/michaldudak/status/1452630484706635779) and our internal discussions, we decided to rename the `@mui/core` package to `@mui/base`. The main rationale for this is the fact that we use the term "Core" to refer to the core components product family, the one that includes Material Design components, unstyled components, System utilities, etc. Therefore, @mui/core was effectively a subset of MUI Core. This was confusing.

  The new name better reflects the purpose of the package: it contains unstyled components, hooks, and utilities that serve as a **base** to build on.

  ```diff
  -import { useSwitch } from '@mui/core/SwitchUnstyled';
  +import { useSwitch } from '@mui/base/SwitchUnstyled';
  ```

### `@mui/lab@5.0.0-alpha.55`

- &#8203;<!-- 12 -->[LoadingButton] Text variant spacing fixed for both start and end (#29194) @joshua-lawrence
- &#8203;<!-- 11 -->[Masonry] Check if container or child exists to prevent error (#29452) @hbjORbj

### Docs

- &#8203;<!-- 25 -->[docs] Correct bundler configuration for using legacy MUI build (#29146) @petermikitsh
- &#8203;<!-- 24 -->[docs] Fix typo on autocomplete.md (#29570) @netizer
- &#8203;<!-- 23 -->[docs] Fix dark mode on branding pages (#29611) @alexfauquette
- &#8203;<!-- 22 -->[docs] Do not render CSS section in API docs navbar if there are no CSS classes (#29622) @ZeeshanTamboli
- &#8203;<!-- 21 -->[docs] Fix link locale handling (#29624) @oliviertassinari
- &#8203;<!-- 20 -->[docs] Fix Search navigation (#29623) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Fix broken link & update MUI packages explanation (#29583) @siriwatknp
- &#8203;<!-- 18 -->[docs] Do not repeat language snippet in url in Algolia search (#29483) @hbjORbj
- &#8203;<!-- 17 -->[docs] Update `ThemeProvider` API link (#29573) @siriwatknp
- &#8203;<!-- 16 -->[docs] Remove svg logos from the Support page (#29431) @oliviertassinari
- &#8203;<!-- 15 -->[docs] Link UXPin integration (#29422) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Link to the new public roadmap for the design kits (#29433) @oliviertassinari
- &#8203;<!-- 28 -->[docs] correct bundler configuration for using legacy MUI build (#29146) @petermikitsh
- &#8203;<!-- 01 -->[website] Fix premium plan release date (#29430) @oliviertassinari
- &#8203;<!-- 02 -->[website] Add GitHub icon button to the navbar (#29640) @danilo-leal
- &#8203;<!-- 39 -->[blog] Support many authors in markdown pages (#29633) @m4theushw

### Core

- &#8203;<!-- 33 -->[core] Add `experiments` index page (#29582) @siriwatknp
- &#8203;<!-- 32 -->[core] Move s3 bucket ownership to mui-org (#29609) @eps1lon
- &#8203;<!-- 31 -->[core] Improve support request message (#29614) @mnajdova
- &#8203;<!-- 30 -->[core] Use support request Github Action (#29594) @mnajdova
- &#8203;<!-- 29 -->[core] Remove unused `getJsxPreview` util (#29586) @ZeeshanTamboli
- &#8203;<!-- 28 -->[core] Use GitHub issue forms (#28038) @oliviertassinari
- &#8203;<!-- 26 -->[core] Add playground (#29423) @oliviertassinari
- &#8203;<!-- 07 -->[test] Correctly identify what the `raf` helper is for (#29683) @eps1lon
- &#8203;<!-- 06 -->[test] Verify a quilted ImageList is created as test title suggests (#29565) @daniel-sachs
- &#8203;<!-- 05 -->[test] Replace `createServerRender` with `createRenderer` (#29503) @eps1lon
- &#8203;<!-- 04 -->[test] Always ignore "useLayoutEffect has no effect on the server"-warning (#29502) @eps1lon
- &#8203;<!-- 03 -->[test] Restore StrictMode by default (#29589) @eps1lon
- &#8203;<!-- 02 -->[test] createPickerRender -> createPickerRenderer (#29575) @eps1lon
- &#8203;<!-- 09 -->[test] Allow experimental CLI to run exact test (#29685) @eps1lon

All contributors of this release in alphabetical order: @aaronholla, @alexfauquette, @anikcreative, @daniel-sachs, @eps1lon, @flipvrijn, @hbjORbj, @joshua-lawrence, @michaldudak, @mnajdova, @netizer, @oliviertassinari, @petermikitsh, @siriwatknp, @ZeeshanTamboli

## 5.1.0

<!-- generated comparing v5.0.6..master -->

_Nov 8, 2021_

A big thanks to the 33 contributors who made this release possible. Here are some highlights ✨:

- 🎉 Support custom elements under `ButtonGroup` (#28645) @ZeeshanTamboli
- 🛠 Add support for arrays in the `sx` prop (#29297) @siriwatknp
- And many more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.1.0`

- &#8203;<!-- 68 -->[Autocomplete] Fix `hiddenLabel` prop of `TextField variant={filled}` inside Autocomplete (#29234) @jatinsandilya
- &#8203;<!-- 67 -->[Box] Support generateClassName and defaultClassName (#29347) @siriwatknp
- &#8203;<!-- 66 -->[ButtonGroup] Fix variant outlined always has primary color borders on hover (#29487) @ZeeshanTamboli
- &#8203;<!-- 65 -->[ButtonGroup] Support different elements under ButtonGroup (#28645) @ZeeshanTamboli
- &#8203;<!-- 62 -->[CssBaseline] Add `enableColorScheme` prop so enable using `color-scheme` property to deal with dark mode (#29454) @alexfauquette
- &#8203;<!-- 29 -->[FormControlLabel] Narrow the label type (#29324) @michaldudak
- &#8203;<!-- 28 -->[Grid] Fix usage when columns > 12 (#29196) @tanay123456789
- &#8203;<!-- 27 -->[InputBase] Do not repeat the same classname (#29353) @hbjORbj
- &#8203;<!-- 30 -->[InputBase] Remove WebkitAppearance from search type (#29383) @nicbarajas
- &#8203;<!-- 25 -->[ListItem] Add missing exports (#29571) @robcaldecott
- &#8203;<!-- 22 -->[Pagination] Allow customization of icons (#29336) @mbeltramin
- &#8203;<!-- 11 -->[TextField] Fix bootstrap, normalize.css, sanitize.css conflicts (#28674) @ChrisClaude
- &#8203;<!-- 10 -->[TextField] Fix invisible wrap within notched inputs (#29088) @DASPRiD
- &#8203;<!-- 09 -->[Tooltip] `open` prop in `componentsProps.popper` can be optional (#29370) @ZeeshanTamboli
- &#8203;<!-- 08 -->[Tooltip] Fix `className` not getting applied from PopperProps (#29023) @ZeeshanTamboli
- &#8203;<!-- 07 -->[useRadioGroup] Convert to TypeScript (#29326) @eps1lon

### `@mui/system@5.1.0`

- &#8203;<!-- 21 -->[system] Introduce `mode` to CssVarsProvider (#29418) @siriwatknp
- &#8203;<!-- 20 -->[system] Improve breakpoints resolver function (#29300) @hbjORbj
- &#8203;<!-- 19 -->[system] Add array support for `sx` prop (#29297) @siriwatknp

### `@mui/codemod@5.1.0`

- &#8203;<!-- 64 -->[codemod] Add codemod parser flag (#29059) (#29229) @ElonVolo

### `@mui/lab@5.0.0-alpha.54`

- &#8203;<!-- 52 -->[DatePicker] Fix disabled/readOnly for view components (#28815) @adamfitzgibbon
- &#8203;<!-- 24 -->[Masonry] Fix crash on unmount when using React 18 (#29358) @eps1lon
- &#8203;<!-- 23 -->[Masonry] Improve height computation and detect changes in `children` (#29351) @hbjORbj

### `@mui/joy@5.0.0-alpha.0`

- &#8203;<!-- 28 -->[Joy] Update default theme (#29478) @siriwatknp
- &#8203;<!-- 26 -->[Joy] Export CssVarsProvider with default theme (#29150) @siriwatknp
- &#8203;<!-- 25 -->[Joy] Remove `private` to leverage CodeSandbox (#29280) @siriwatknp

### Docs

- &#8203;<!-- 51 -->[docs] Add differences between styled and sx (#28685) @eric-burel
- &#8203;<!-- 50 -->[docs] Track usage of dark mode in Google Analytics (#29419) @oliviertassinari
- &#8203;<!-- 49 -->[docs] Remove create-mui-theme as it is no longer working (#29472) @IPJT
- &#8203;<!-- 48 -->[docs] Fix warnings in AppSearch (#29459) @eps1lon
- &#8203;<!-- 47 -->[docs] Add framework example for ClassNameGenerator (#29453) @siriwatknp
- &#8203;<!-- 46 -->[docs] Fix layout shift when scrolling (#29436) @oliviertassinari
- &#8203;<!-- 45 -->[docs] Fix layout-shift on id='main-content' (#29425) @oliviertassinari
- &#8203;<!-- 44 -->[docs] Remove usage of `process.browser` (#29438) @oliviertassinari
- &#8203;<!-- 43 -->[docs] Add instruction on how to use the child selector API with emotion (#29350) @mnajdova
- &#8203;<!-- 42 -->[docs] Fix small typos (#29424) @oliviertassinari
- &#8203;<!-- 41 -->[docs] Fix TOC highlighting logic (#29435) @oliviertassinari
- &#8203;<!-- 40 -->[docs] Fix about page flags (#29314) @mbrookes
- &#8203;<!-- 39 -->[docs] Fix Box JS docs (#29282) @Pablion
- &#8203;<!-- 38 -->[docs] Update storybook section in migration to v5 docs (#28800) @siriwatknp
- &#8203;<!-- 37 -->[docs] Document how to enable color on dark mode (#29340) @Wimukti
- &#8203;<!-- 36 -->[docs] Display search functionality in all viewports (#28819) @eps1lon
- &#8203;<!-- 35 -->[docs] Query heading for ToC on demand (#29204) @eps1lon
- &#8203;<!-- 34 -->[docs] Add next.js styled-component guide and update links to example (#29118) @Jareechang
- &#8203;<!-- 33 -->[docs] Fix overriding `MuiTextField`'s default props in the migration guide (#29174) @tm1000
- &#8203;<!-- 32 -->[docs] Fix "clickable" and "deletable" typos (#28702) @jacklaurencegaray
- &#8203;<!-- 31 -->[docs] Update migration-v4 docs for wrong import path (#29042) @busches
- &#8203;<!-- 30 -->[docs] Add GitHub icon change to "Migration from v4 to v5" guide (#29182) @dan-mba
- &#8203;<!-- 06 -->[website] Benny Joo joining MUI (#29499) @mnajdova
- &#8203;<!-- 05 -->[website] Update the `Print export` feature info on the pricing page (#29484) @DanailH
- &#8203;<!-- 04 -->[website] Improve the dev rel role description (#29477) @oliviertassinari
- &#8203;<!-- 03 -->[website] Add customers section on Design Kits and Templates marketing pages (#29168) @danilo-leal
- &#8203;<!-- 02 -->[website] Improvements to the /core product page @danilo-leal
- &#8203;<!-- 01 -->[website] Fix typo on the About Page (#29286) @gssakash

### Core

- &#8203;<!-- 63 -->[core] Handle RecordType and FieldType in generatePropDescription.ts (#29467) @flaviendelangle
- &#8203;<!-- 61 -->[core] Convert a named color to lowercase (#29465) @ainatenhi
- &#8203;<!-- 60 -->[core] Allow to reuse functions from `docs:api` (#28828) @m4theushw
- &#8203;<!-- 59 -->[core] Commit new nextjs 12 tsconfig (#29458) @eps1lon
- &#8203;<!-- 58 -->[core] Settle on MUI X for the official name (#29420) @oliviertassinari
- &#8203;<!-- 57 -->[core] Add mui as a npm keyword (#29427) @oliviertassinari
- &#8203;<!-- 56 -->[core] Fix issue template redirection (#29432) @oliviertassinari
- &#8203;<!-- 55 -->[core] Remove unecessary destructuration (#29354) @oliviertassinari
- &#8203;<!-- 54 -->[core] Use cross-env to set env variables in material-icons scripts (#29327) @michaldudak
- &#8203;<!-- 53 -->[core] Don't bump peer dependency ranges on dependency updates (#29303) @eps1lon
- &#8203;<!-- 18 -->[test] Fix browser tests (#29505) @eps1lon
- &#8203;<!-- 69 -->[test] Fix missing act warnings in latest React 18 alpha (#29357) @eps1lon
- &#8203;<!-- 17 -->[test] Replace `createClientRender` with new `createRenderer` API (#29471) @eps1lon
- &#8203;<!-- 16 -->[test] Fix possible "missing act" warning (#29463) @eps1lon
- &#8203;<!-- 15 -->[test] Remove render#baseElement (#29462) @eps1lon
- &#8203;<!-- 14 -->[test] Expose `AbortController` on global (#29360) @eps1lon
- &#8203;<!-- 13 -->[test] Add internal test for uniqe `name` in `Rating` (#29329) @eps1lon
- &#8203;<!-- 12 -->[test] Fix browser tests (#29305) @eps1lon

All contributors of this release in alphabetical order: @adamfitzgibbon, @ainatenhi, @alexfauquette, @busches, @ChrisClaude, @dan-mba, @DanailH, @danilo-leal, @DASPRiD, @ElonVolo, @eps1lon, @eric-burel, @flaviendelangle, @gssakash, @hbjORbj, @IPJT, @jacklaurencegaray, @Jareechang, @jatinsandilya, @m4theushw, @mbeltramin, @mbrookes, @michaldudak, @mnajdova, @nicbarajas, @oliviertassinari, @Pablion, @robcaldecott, @siriwatknp, @tanay123456789, @tm1000, @Wimukti, @ZeeshanTamboli

## 5.0.6

<!-- generated comparing v5.0.5..master -->

_Oct 27, 2021_

A big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

- 🔧 Fix reported TypeScript issues on the `@mui/system` package because some packages were not released

### `@mui/material@5.0.6`

- &#8203;<!-- 4 -->[Autocomplete] Fix `clearOnBlur` prop (#29208) @hbjORbj
- &#8203;<!-- 2 -->[Rating] Remove z-index from decimal stars (#29295) @williamhaley

### `@mui/system@5.0.6`

- &#8203;<!-- 5 -->[system] Fix various issues reported by using @mui/styled-engine-sc (#29035) @mnajdova
- &#8203;<!-- 1 -->[system] Fix executing server-side Emotion component as function interpolation (#29290) @Andarist

### Docs

- &#8203;<!-- 3 -->[blog] Q3 2021 Update (#28970) @oliviertassinari

All contributors of this release in alphabetical order: @Andarist, @hbjORbj, @oliviertassinari, @williamhaley

## 5.0.5

<!-- generated comparing v5.0.4..master -->

_Oct 26, 2021_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- 🔧 Implement `Masonry` using Flexbox by @hbjORbj.
- 🧪 Add three components to `@mui/base` by @rebeccahongsf and @hbjORbj.

### `@mui/codemod@5.0.5`

- &#8203;<!-- 38 -->[codemod] Support new package name in `link-underline-hover` transformer (#29214) @siriwatknp

### `@mui/base@5.0.0-alpha.52`

- &#8203;<!-- 39 -->[ClickAwayListener] Move to the core package (#29186) @hbjORbj
- &#8203;<!-- 13 -->[Popper] Move from mui-material to mui-base (#28923) @rebeccahongsf
- &#8203;<!-- 04 -->[TextareaAutosize] Move to the core package (#29148) @hbjORbj

### `@mui/lab@5.0.0-alpha.52`

- &#8203;<!-- 16 -->[Masonry] Improve demo styles (#29218) @hbjORbj
- &#8203;<!-- 15 -->[Masonry] Implement Masonry using Flexbox (#28059) @hbjORbj

### `@mui/icons@5.0.5`

- &#8203;<!-- 19 -->[icons] Add TipsAndUpdates icon (#29004) @hbjORbj

### `@mui/material@5.0.5`

- &#8203;<!-- 40 -->[CardMedia] Apply specified `img` role instead of custom `image` role (#29172) @eps1lon
- &#8203;<!-- 32 -->[CSSBaseline] Remove incorrect @deprecated annotation (#29069) @adamfitzgibbon
- &#8203;<!-- 20 -->[Grid] Support custom columns with nested grid (#28743) @Devesh21700Kumar
- &#8203;<!-- 18 -->[InputBase] Remove wrong theme overriding with MUI's default theme (#29157) @hbjORbj
- &#8203;<!-- 17 -->[LoadingButton] Fix `fullWidth` styling (#28652) @nikitabobers
- &#8203;<!-- 16 -->[Popper] make Popper display:none whenever it's closed (#29233) @adamfitzgibbon
- &#8203;<!-- 14 -->[Menu] Reduce min-height & padding in menu-item with dense property (#29180) @jatinsandilya
- &#8203;<!-- 07 -->[Tab] `iconPosition` prop added in Tab (#28764) @deepanshu2506
- &#8203;<!-- 03 -->[Tooltip] Correct inconsistent prop precedence (#29132) @michaldudak

### `@mui/system@5.0.5`

- &#8203;<!-- 11 -->[system] Allow function type for `sx` prop (#29198) @hbjORbj
- &#8203;<!-- 10 -->[system] Fix various issues reported by using @mui/styled-engine-sc (#29035) @mnajdova
- &#8203;<!-- 09 -->[system] Fix `colorScheme` conflict between application (#29139) @siriwatknp
- &#8203;<!-- 08 -->[system] Add `unstable_createCssVarsProvider` api (#28965) @siriwatknp

### Documentation

- &#8203;<!-- 31 -->[docs] Fix path to `DataGrid` CSV export options page (#29220) @DanailH
- &#8203;<!-- 30 -->[docs] Give anonymous components a name (#29189) @eps1lon
- &#8203;<!-- 29 -->[docs] Add deploy context variables (#29195) @siriwatknp
- &#8203;<!-- 28 -->[docs] Add MUI packages explanation (#29073) @siriwatknp
- &#8203;<!-- 27 -->[docs] Fix typo in CSP policy (#29187) @JuliaNeumann
- &#8203;<!-- 26 -->[docs] Dark mode conditional content rendering (#28665) @michal-perlakowski
- &#8203;<!-- 25 -->[docs] Fix ClassNameGenerator introduced version #29177 @siriwatknp
- &#8203;<!-- 24 -->[docs] Add missing `justifyContent` values and update box styling (#29117) @omarmosid
- &#8203;<!-- 23 -->[docs] Make landing page hero section scrollable (#29141) @waxidiotic
- &#8203;<!-- 22 -->[docs] Discourage importing different bundles directly (#29133) @eps1lon
- &#8203;<!-- 21 -->[docs] Update module augmentation reference url (#29064) @gnowland
- &#8203;<!-- 12 -->[pricing] Add tooltip to pricing icon (#28959) @siriwatknp
- &#8203;<!-- 07 -->[Team] Add Alexandre in the about page (#29289)
- &#8203;<!-- 02 -->[website] Fix status label overflow in AdvancedShowcase (#29143) @LorenzHenk
- &#8203;<!-- 01 -->[website] Update legacy logos (#28908) @michaldudak

### Core

- &#8203;<!-- 37 -->[core] Order repro methods by preference (#29156) @eps1lon
- &#8203;<!-- 36 -->[core] Remove unnecessary usages of `useEventCallback` (#28910) @NMinhNguyen
- &#8203;<!-- 35 -->[core] add `unstable_ClassNameGenerator` API (#29051) @siriwatknp
- &#8203;<!-- 34 -->[core] Fix issues when using styled-components (#29048) @mnajdova
- &#8203;<!-- 33 -->[core] replace hard-coded classname with classes (#29070) @siriwatknp
- &#8203;<!-- 06 -->[test] Add documentation for visual regression tests (#29154) @eps1lon
- &#8203;<!-- 05 -->[test] Enable "missing act" warnings using new proposal (#29167) @eps1lon

All contributors of this release in alphabetical order: @adamfitzgibbon, @DanailH, @deepanshu2506, @Devesh21700Kumar, @eps1lon, @gnowland, @hbjORbj, @jatinsandilya, @JuliaNeumann, @LorenzHenk, @michal-perlakowski, @michaldudak, @mnajdova, @nikitabobers, @NMinhNguyen, @omarmosid, @rebeccahongsf, @siriwatknp, @waxidiotic

## 5.0.4

<!-- generated comparing v5.0.3..master -->

_Oct 14, 2021_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 🧪 Added `UnstyledInput` and `useInput` hook in the the first component in @mui/base package @michaldudak (#28053)
- 🐛 Fixed many bugs and improved the documentation 📚.

### `@mui/material@5.0.4`

- &#8203;<!-- 31 -->[Chip] disable ripple only if onDelete is present. (#29034) @mottox2
- &#8203;<!-- 06 -->[Pagination] Fix clicking on `...` triggering `onChange` with page value `null` (#28884) @ZeeshanTamboli
- &#8203;<!-- 04 -->[Tabs] Alternative way to disable ":first-child is unsafe" error (#28982) @hbjORbj
- &#8203;<!-- 03 -->[Tabs] Fix ":first-child is potentially unsafe" error (#28890) @hbjORbj
- &#8203;<!-- 01 -->[transitions] Mark `children` as required where nullish `children` would crash at runtime (#29028) @eps1lon

### `@mui/system@5.0.4`

- &#8203;<!-- 05 -->[system] Update typing for `style` function (#28744) @hbjORbj

### `@mui/base@5.0.0-alpha.51`

- &#8203;<!-- 07 -->[InputUnstyled] Create unstyled input and useInput hook (#28053) @michaldudak

### `@mui/lab@5.0.0-alpha.51`

- &#8203;<!-- 25 -->[DesktopDatePicker] add Paper props to pass down to Paper component (#28865) @amen-souissi

### Docs

- &#8203;<!-- 24 -->[docs] Add JSDoc to `theme.breakpoints` (#29039) @eps1lon
- &#8203;<!-- 23 -->[docs] Rename broken package names in docs pointing to `@mui/material` (#29006) @visualfanatic
- &#8203;<!-- 22 -->[docs] Add troubleshooting guide for unexpected styles (#28907) @mnajdova
- &#8203;<!-- 21 -->[docs] Fix issues reported by ahref (#28986) @mnajdova
- &#8203;<!-- 20 -->[docs] Remove json translations for dropped locales (#28987) @mnajdova
- &#8203;<!-- 19 -->[docs] Fix type signature of renderGroup in Autocomplete (#28876) @tanyabouman
- &#8203;<!-- 18 -->[docs] Minor typo in v4-v5 migration docs (#28995) @kgregory
- &#8203;<!-- 17 -->[docs] Add `mui-image` related project (#28621) @benmneb
- &#8203;<!-- 16 -->[docs] Update Getting Started Templates' Source URIs (#28929) @epodol
- &#8203;<!-- 15 -->[docs] Improve search experience (#28801) @siriwatknp
- &#8203;<!-- 14 -->[docs] Fix demo of the responsive drawer (#28226) @goncalovf
- &#8203;<!-- 13 -->[docs] Fix global theme link demo (#28974) @ZeeshanTamboli
- &#8203;<!-- 12 -->[docs] Update box example to use 'backgroundColor' rather than 'bgColor' (#28958) @Jareechang
- &#8203;<!-- 11 -->[docs] corrected `Box` import for `sx-prop` example (#28873) @phudekar
- &#8203;<!-- 10 -->[docs] Fix footnote ID links in CONTRIBUTING.md (#28849) @officialpiyush
- &#8203;<!-- 09 -->[docs] Fix color & density playground (#28803) @siriwatknp
- &#8203;<!-- 08 -->[docs] Improve visibility of styled engine configuration section in installation guide (#28903) @Jareechang

### Core

- &#8203;<!-- 30 -->[core] Prevent yarn cache growing infinitely (#29040) @eps1lon
- &#8203;<!-- 29 -->[core] Update browserslist (#29025) @eps1lon
- &#8203;<!-- 28 -->[core] Update `peerDependencies` to require `latest` instead of `next` (#29007) @eps1lon
- &#8203;<!-- 27 -->[core] Increase memory limit for size:snapshot (#29005) @eps1lon
- &#8203;<!-- 26 -->[core] Init `private` Joy package (#28957) @siriwatknp
- &#8203;<!-- 02 -->[test] Remove a11y snapshot tests (#28887) @eps1lon

All contributors of this release in alphabetical order: @amen-souissi, @benmneb, @epodol, @eps1lon, @goncalovf, @hbjORbj, @Jareechang, @kgregory, @michaldudak, @mnajdova, @mottox2, @officialpiyush, @phudekar, @siriwatknp, @tanyabouman, @visualfanatic, @ZeeshanTamboli

## 5.0.3

<!-- generated comparing v5.0.2..master -->

_Oct 7, 2021_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- 🧪 Created the first component in @mui/material-next - our v6 prototype package.
- 🐛 Fixed many bugs and improved the documentation 📚.

### `@mui/material@5.0.3`

- &#8203;<!-- 10 -->[Stack] Add props & variants types in the theme (#28843) @mnajdova
- &#8203;<!-- 12 -->[InputLabel] Fix condition for applying formControl overrides (#28707) @yevheniiminin
- &#8203;<!-- 05 -->[Tooltip] Allow overriding internal components and their props (#28692) @michaldudak
- &#8203;<!-- 04 -->[transitions] Fix `addEndListener` not being called with the DOM node (#28715) @eps1lon

### `@mui/codemod@5.0.3`

- &#8203;<!-- 37 -->[codemod] Fix `optimal-imports` to support v4 and v5-alpha, beta (#28812) @siriwatknp

### `@mui/system@5.0.3`

- &#8203;<!-- 09 -->[system] Add padding/margin-block/inline to spacing (#28813) @smmoosavi

### `@mui/styled-engine-sc@5.0.3`

- &#8203;<!-- 42 -->Don't allow styled-components APIs on mui styled function (#28807) @hbjORbj

### `@mui/base@5.0.0-alpha.50`

- &#8203;<!-- 38 -->[ButtonUnstyled] Don't set redundant role=button (#28488) @michaldudak
- &#8203;<!-- 43 -->[SliderUnstyled] Prevent unknown-prop error when using marks prop (#28868) @hbjORbj

### `@mui/lab@5.0.0-alpha.50`

- &#8203;<!-- 11 -->[pickers] Change view even if `onViewChange` is set (#28765) @eps1lon

### `@mui/material-next@6.0.0-alpha.4`

- &#8203;<!-- 39 -->[Button-next] Create Button in material-next (#28313) @michaldudak

### Docs

- &#8203;<!-- 34 -->[docs] Add alike v4 default button color in migration (#28881) @siriwatknp
- &#8203;<!-- 34 -->[docs] Use PNG instead of SVG for color preview (#28699) @eps1lon
- &#8203;<!-- 33 -->[docs] Use client-side navigation when activating docsearch results (#28750) @eps1lon
- &#8203;<!-- 32 -->[docs] Fluid icon size in icons search (#28747) @eps1lon
- &#8203;<!-- 31 -->[docs] Fix the wrong import in docs grid page (#28863) @taghi-khavari
- &#8203;<!-- 30 -->[docs] Fix typo in Pagination docs (#28864) @ZeeshanTamboli
- &#8203;<!-- 29 -->[docs] Fix 404 links (#28710) @mnajdova
- &#8203;<!-- 28 -->[docs] Fix typo in Mui CSS classname (#28725) @cacpgomes
- &#8203;<!-- 27 -->[docs] Match example to codesandbox demo and update ID link (#28762) @AnilSeervi
- &#8203;<!-- 26 -->[docs] Fix typo in system/box documentation (#28822) @iamsergo
- &#8203;<!-- 25 -->[docs] Use HTML standards for autocomplete attributes (#28827) @epodol
- &#8203;<!-- 24 -->[docs] Improve styled-components integration (#28713) @mnajdova
- &#8203;<!-- 23 -->[docs] Correct Select's menu placement description (#28748) @michaldudak
- &#8203;<!-- 22 -->[docs] AdapterDayJS -> AdapterDayjs (#28770) @veerreshr
- &#8203;<!-- 21 -->[docs] Theme documentation, typo fix (#28805) @saeedseyfi
- &#8203;<!-- 20 -->[docs] Add the last diamond sponsor (#28737) @hbjORbj
- &#8203;<!-- 19 -->[docs] Fix various links in CONTRIBUTING (#28751) @AnilSeervi
- &#8203;<!-- 18 -->[docs] Only add JSS to demos (#28698) @eps1lon
- &#8203;<!-- 17 -->[docs] Update v5 status in release schedule (#28700) @owais635
- &#8203;<!-- 16 -->[docs] Fix typo in /guides/styled-engine (#28720) @Sharry0
- &#8203;<!-- 15 -->[docs] Fix typo in chip documentation (#28641) @avranju94
- &#8203;<!-- 14 -->[docs] Fix versions page (#28682) @mnajdova
- &#8203;<!-- 13 -->[docs] Remove legacy team page (#28646) @mnajdova
- &#8203;<!-- 41 -->[website] add "React" to the hero description (#28830) @danilo-leal
- &#8203;<!-- 03 -->[website] Fix constantly reloading when Russian language is set (#28869) @mnajdova
- &#8203;<!-- 02 -->[website] Compress one avatar image on about us page (#28823) @hbjORbj
- &#8203;<!-- 01 -->[website] Hide 'become a diamond sponsor' box on landing page (#28814) @hbjORbj
- &#8203;<!-- 40 -->[website] Update Benny's profile on about us page (#28816) @hbjORbj

### Core

- &#8203;<!-- 36 -->[core] Remove `--exact` from `release:version` (#28840) @siriwatknp
- &#8203;<!-- 35 -->[core] Neglect framer from release flow (#28680) @siriwatknp
- &#8203;<!-- 08 -->[test] Add a test for not allowing styled-components' APIs on mui `styled` function (#28862) @hbjORbj
- &#8203;<!-- 07 -->[test] Fix instances where type tests were only passing due to object being part of ReactNode (#28804) @eps1lon
- &#8203;<!-- 06 -->[test] Move ByMuiTest to test/utils (#28509) @eps1lon

All contributors of this release in alphabetical order: @AnilSeervi, @avranju94, @cacpgomes, @danilo-leal, @epodol, @eps1lon, @hbjORbj, @iamsergo, @michaldudak, @mnajdova, @owais635, @saeedseyfi, @Sharry0, @siriwatknp, @smmoosavi, @taghi-khavari, @veerreshr, @yevheniiminin, @ZeeshanTamboli

## 5.0.2

<!-- generated comparing v5.0.1..master -->

_Sep 29, 2021_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 🔧 Improve `jss-to-styled` codemod to use new package names.
- And many more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.0.2`

- &#8203;<!-- 28 -->[Checkbox] Fix form submission with empty value (#28423) @garronej
- &#8203;<!-- 08 -->[Slider] Don't error on minimal changes with readonly value (#28472) @eps1lon
- &#8203;<!-- 07 -->[Switch] Fix style overrides on input (#28576) @praveenkumar-kalidass
- &#8203;<!-- 03 -->[useMediaQuery] Add types for `matchMedia` option and deprecate exported interfaces (#28413) @eps1lon

### `@mui/codemod@5.0.2`

- &#8203;<!-- 27 -->[codemod] Add MenuItem v.1.0.0 transform for primaryText property (#28640) @dmitry-yudakov
- &#8203;<!-- 26 -->[codemod] Update the imports in `jss-to-styled` to match the new package names (#28667) @mnajdova

### `@mui/system@5.0.2`

- &#8203;<!-- 06 -->[system] Fix types to support theme callbacks on pseudo and nested selectors (#28570) @mnajdova

### Docs

- &#8203;<!-- 23 -->[docs] Remove languages: fr, de, ja, es, ru (#28663) @mnajdova
- &#8203;<!-- 22 -->[docs] Improve old doc versions discoverability (#28651) @danilo-leal
- &#8203;<!-- 21 -->[docs] Make the Toggle Button size demo use default icon size (#28656) @danilo-leal
- &#8203;<!-- 20 -->[docs] Uniformize the code's font family (#28582) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Removed duplicate line in date-ranger-picker.md file (#28635) @naveen-bharathi
- &#8203;<!-- 18 -->[docs] Fix title MUI x2 (#28634) @oliviertassinari
- &#8203;<!-- 17 -->[docs] Polish email validation logic (#28255) @kiznick
- &#8203;<!-- 16 -->[docs] Improve migration-v4.md phrasing (#28253) @adamthewebguy
- &#8203;<!-- 15 -->[docs] Fix color in example (#28527) @alexeagleson
- &#8203;<!-- 14 -->[docs] Fix typo in generated class names section (#28549) @fxlemire
- &#8203;<!-- 13 -->[docs] Mention Premium pricing cap (#28581) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Update examples to use latest mui #28565 @siriwatknp
- &#8203;<!-- 11 -->[docs] Push the fixes on Next.js's Link to the examples (#28178) @oliviertassinari
- &#8203;<!-- 10 -->[docs] Fix wrong name for zIndex's property example in /system/ (#28541) @chetrit
- &#8203;<!-- 08 -->[examples] Nextjs Link missing passHref #28588 (#28661) @Brlaney
- &#8203;<!-- 02 -->[website] Iteration on the pricing page (#28406) @danilo-leal
- &#8203;<!-- 01 -->[website] Batch fixes (#28564) @siriwatknp

### Core

- &#8203;<!-- 25 -->[core] Improve Renovate groups (#28642) @eps1lon
- &#8203;<!-- 24 -->[core] Batch small changes (#28553) @oliviertassinari
- &#8203;<!-- 05 -->[test] Document where the value for SwitchBase#value comes from (#28638) @eps1lon
- &#8203;<!-- 04 -->[test] Make `seconds` `views` test pass in browsers (#28511) @eps1lon

All contributors of this release in alphabetical order: @adamthewebguy, @alexeagleson, @Brlaney, @chetrit, @danilo-leal, @dmitry-yudakov, @eps1lon, @fxlemire, @garronej, @kiznick, @mnajdova, @naveen-bharathi, @oliviertassinari, @praveenkumar-kalidass, @siriwatknp

## 5.0.1

<!-- generated comparing v5.0.0..master -->

_Sep 22, 2021_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 🔎 Improve the search on the documentation.
- 📚 Improve the v4 to v5 migration guide.
- And many more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.0.1`

- &#8203;<!-- 18 -->[Radio] Fix support for number value type (#26772) @sakura90
- &#8203;<!-- 12 -->[useMediaQuery] Reduce bundle size (#28412) @eps1lon

### `@mui/codemod@5.0.1`

- &#8203;<!-- 43 -->[codemod] Cover edge case for theme-spacing #28400 @siriwatknp

### `@mui/lab@5.0.0-alpha.48`

- &#8203;<!-- 36 -->[DateTimePicker] Support `seconds` `view` (#25095) @breitembach
- &#8203;<!-- 13 -->[TimePicker] Fire change event when meridiem changes (#26600) @coder-freestyle

### Docs

- &#8203;<!-- 35 -->[docs] Fix missing exit animation for transition Poppers (#28506) @eps1lon
- &#8203;<!-- 34 -->[docs] Fix migration v5 docs (#28530) @siriwatknp
- &#8203;<!-- 33 -->[docs] Avoid re-mounting the whole tree when switching theme direction (#28495) @eps1lon
- &#8203;<!-- 32 -->[docs] Fix html compliance (#28429) @oliviertassinari
- &#8203;<!-- 31 -->[docs] Use hyphen-case for CSS properties in /system/properties (#28489) @chetrit
- &#8203;<!-- 30 -->[docs] Update caret position in comments to match npm scope (#28426) @eps1lon
- &#8203;<!-- 29 -->[docs] Fix CONTRIBUTING to point out to master as targeted branch (#28396) @mnajdova
- &#8203;<!-- 28 -->[docs] Update examples to remove 'beta' (#28475) @oliviertassinari
- &#8203;<!-- 27 -->[docs] Fix 404 links to MUI X API (#28176) @oliviertassinari
- &#8203;<!-- 26 -->[docs] Fix broken/incorrect attributes links in Avatar and NativeSelect API pages (#28417) @xenostar
- &#8203;<!-- 25 -->[docs] Explain how `<Alert icon={false} />` behaves (#28348) @nguyenkhanhnam
- &#8203;<!-- 24 -->[docs] Fix typo in /system/the-sx-prop (#28393) @danwoods
- &#8203;<!-- 23 -->[docs] Correct the migration doc (#28391) @michaldudak
- &#8203;<!-- 22 -->[docs] Fix the notification display logic (#28389) @oliviertassinari
- &#8203;<!-- 21 -->[docs] Add notification for v5 @oliviertassinari
- &#8203;<!-- 20 -->[docs] Fix typo (#28521) @valse
- &#8203;<!-- 12 -->[website] Implement algolia redesign (#28252) @hbjORbj
- &#8203;<!-- 11 -->[website] Update data-grid dependencies #28531 @siriwatknp
- &#8203;<!-- 10 -->[website] Cleanup unused files after rebranding (#28505) @siriwatknp
- &#8203;<!-- 09 -->[website] Update /company pages to use marketing website Header and Footer (#28498) @danilo-leal
- &#8203;<!-- 08 -->[website] Optimize images (#28486) @michaldudak
- &#8203;<!-- 07 -->[website] Add components index page (#28485) @siriwatknp
- &#8203;<!-- 06 -->[website] Fix typo (#28478) @oliviertassinari
- &#8203;<!-- 05 -->[website] Fix crash (#28474) @oliviertassinari
- &#8203;<!-- 04 -->[website] Close the open engineering roles (#28428) @oliviertassinari
- &#8203;<!-- 03 -->[website] Fix 40x links (#28401) @mnajdova
- &#8203;<!-- 02 -->[website] Fix SEO issues reported by moz.com (#28402) @mnajdova
- &#8203;<!-- 01 -->[website] Fix production issues (#28384) @siriwatknp

### Core

- &#8203;<!-- 44 -->[core] Fix release:changelog base branch (#28533) @mnajdova
- &#8203;<!-- 42 -->[core] Remove code handling JSS components (#28421) @eps1lon
- &#8203;<!-- 41 -->[core] Remove unused dependencies (#28468) @eps1lon
- &#8203;<!-- 40 -->[core] Ensure both docs bundles are analyzeable (#28410) @eps1lon
- &#8203;<!-- 39 -->[core] Switch to webpack 5 (#28248) @eps1lon
- &#8203;<!-- 38 -->[core] Batch small changes (#28177) @oliviertassinari
- &#8203;<!-- 37 -->[core] Update publish tag to latest (#28382) @mnajdova
- &#8203;<!-- 19 -->[framer] Update @mui/\* dependencies (#28469) @eps1lon
- &#8203;<!-- 17 -->[test] Add custom queries to `screen` (#28507) @eps1lon
- &#8203;<!-- 16 -->[test] Run listChangedFiles against master (#28504) @eps1lon
- &#8203;<!-- 15 -->[test] Increase BrowserStack timeout for Firefox (#28476) @oliviertassinari
- &#8203;<!-- 14 -->[test] Use testing-library alpha when running React 18 tests (#28267) @eps1lon

All contributors of this release in alphabetical order: @breitembach, @chetrit, @coder-freestyle, @danilo-leal, @danwoods, @eps1lon, @hbjORbj, @michaldudak, @mnajdova, @nguyenkhanhnam, @oliviertassinari, @sakura90, @siriwatknp, @valse, @xenostar

## 5.0.0

<!-- generated comparing v5.0.0-rc.1..next -->

_Sep 16, 2021_

After over 400 days of development and over 40 canary releases, we are excited to introduce [MUI Core v5.0.0](https://mui.com/blog/mui-core-v5/)!

Some statistics with the released of v5.0.0 compared to the one of v4.0.0:

- 5,832 new commits
- From 2M downloads/month to 9.5M downloads/month on npm
- From 350k users/month to 700k users/month on the documentation

A big thanks to the 600+ contributors who made the release possible!

The 5.0.0 version includes all changes done in the alpha, beta, and rc releases listed below.
These are the changes done from the last release candidate version (5.0.0-rc.1):

### `@mui/material@5.0.0`

- &#8203;<!-- 15 -->[Autocomplete] Fix reset value on blur for freeSolo input (#28190) @praveenkumar-kalidass
- &#8203;<!-- 14 -->[ButtonBase] Revert to the pre-unstyled implementation (#28225) @michaldudak
- &#8203;<!-- 13 -->[Checkbox] Fix color proptype typo (#28265) @sydneyjodon-wk
- &#8203;<!-- 40 -->[Tooltip] Ensure user-select CSS property is reverted after touch end (#28372) @tholman

### `@mui/system@5.0.0`

- &#8203;<!-- 25 -->[system] Fix missing typings for createSpacing (#28361) @eps1lon

### `@mui/codemod@5.0.0`

- &#8203;<!-- 21 -->[codemod] Fix jss-to-styled to support other export class, function etc. (#28321) @jedwards1211

### `@mui/lab@5.0.0-alpha.46`

- &#8203;<!-- 09 -->[DateTimePicker] Change bottom position of AM/PM buttons (#27534) @nikitabobers
- &#8203;<!-- 02 -->[pickers] Add visual regression tests for open views (#28224) @eps1lon

### Docs

- &#8203;<!-- 38 -->[blog] Introducing MUI Core v5.0 (#27912) @oliviertassinari
- &#8203;<!-- 08 -->[docs] Fix quotes in font-face literal (#28260) @Aurelain
- &#8203;<!-- 07 -->[docs] Update redirects to X's docs (#28263) @m4theushw
- &#8203;<!-- 06 -->[docs] Change Material-UI to MUI in the console (#28270) @mbrookes
- &#8203;<!-- 05 -->[docs] Docs redesign adjustments (#28203) @mnajdova
- &#8203;<!-- 04 -->[docs] How to compose theme in steps (#28246) @goncalovf
- &#8203;<!-- 03 -->[docs] Fix DataGrid demo console warning in Table docs (#28235) @ZeeshanTamboli
- &#8203;<!-- 32 -->[docs] Fix typo in v4 to v5 migration guide (#28353) @zadeviggers
- &#8203;<!-- 17 -->[docs] Fix typo in transition docs (#28312) @tamboliasir1
- &#8203;<!-- 20 -->[docs] Use https for material-ui & reactcommunity links (#28304) @aghArdeshir
- &#8203;<!-- 22 -->[docs] Add IBM Plex font locally (#28325) @siriwatknp
- &#8203;<!-- 26 -->[docs] Fix failing client-side navigation for /api routes (#28356) @eps1lon
- &#8203;<!-- 29 -->[docs] Update the nav order (#28323) @mbrookes
- &#8203;<!-- 30 -->[docs] Compress images with ImageOptim @oliviertassinari
- &#8203;<!-- 34 -->[docs] Replace remaining unstyled package reference (#28351) @michaldudak
- &#8203;<!-- 35 -->[docs] No import from react-router (#28329) @eps1lon
- &#8203;<!-- 36 -->[website] Refine website before go-live (#28081) @siriwatknp
- &#8203;<!-- 31 -->[website] Update manifest to new logo (#28355) @siriwatknp
- &#8203;<!-- 01 -->[website] Add product-x page (#28106) @siriwatknp
- &#8203;<!-- 24 -->[website] Revert store URL to material-ui.com/store (#28365) @michaldudak
- &#8203;<!-- 33 -->[website] Rename domain to mui.com (#28332) @mnajdova

### Core

- &#8203;<!-- 12 -->[core] Replace Material-UI with MUI (#28243) @mnajdova
- &#8203;<!-- 11 -->[core] Prepare for v5 stable release (#28240) @mnajdova
- &#8203;<!-- 10 -->[core] Mark lines that needs to be changed with a major release (#28238) @mnajdova
- &#8203;<!-- 18 -->[core] Various updates to what we consider the default branch (#28328) @eps1lon
- &#8203;<!-- 23 -->[core] Remove experimental bundle size tracking page (#28334) @eps1lon
- &#8203;<!-- 27 -->[core] Support release:build with cmd.exe (#28318) @michaldudak
- &#8203;<!-- 28 -->[core] Remove unnecessary titleize warning (#28349) @eps1lon
- &#8203;<!-- 37 -->[core] Batch small fixes (#28381) @oliviertassinari
- &#8203;<!-- 16 -->[test] Recommend yarn t over test:watch (#28254) @eps1lon
- &#8203;<!-- 19 -->[test] Lazily import fixtures (#28239) @eps1lon
- &#8203;<!-- 39 -->[test] Assert on user-select that has the same value across browsers (#28378) @eps1lon

All contributors of this release in alphabetical order: @aghArdeshir, @Aurelain, @eps1lon, @goncalovf, @jedwards1211, @m4theushw, @mbrookes, @michald
udak, @mnajdova, @nikitabobers, @praveenkumar-kalidass, @siriwatknp, @sydneyjodon-wk, @tamboliasir1, @tholman, @zadeviggers, @ZeeshanTamboli

## 5.0.0-rc.1

<!-- generated comparing v5.0.0-rc.0..next -->

_Sep 8, 2021_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

- 📚 Improved the codemod and migration guide for upgrading to v5
- 🐛 Fixed some bugs and regressions

### `@mui/material@5.0.0-rc.1`

- &#8203;<!-- 46 -->[Autocomplete] Fix virtualization regression (#28129) @oliviertassinari
- &#8203;<!-- 45 -->[Button] Use deeper imports from unstyled, correct docs (#28074) @michaldudak
- &#8203;<!-- 44 -->[ButtonBase] Fix ripple persisting on blur (#28186) @michaldudak
- &#8203;<!-- 14 -->[Link] Infer `ref` type from `component` (#28101) @eps1lon
- &#8203;<!-- 11 -->[Popper] Fix bundle size regression (#27910) @oliviertassinari
- &#8203;<!-- 10 -->[Select] Merge `ref` of `Select` and `input` element (#28054) @DouglasPds
- &#8203;<!-- 07 -->[Tabs] Improve error message formatting for invalid `value` (#28172) @eps1lon

### `@mui/system@5.0.0-rc.1`

- &#8203;<!-- 47 -->[system] Change type of return value of overridesResolver (#28220) @hbjORbj
- &#8203;<!-- 09 -->[system] Fix zero value condition (#28219) @siriwatknp
- &#8203;<!-- 08 -->[system] Shorten class names in production (#27932) @oliviertassinari

### `@mui/codemod@5.0.0-rc.1`

- &#8203;<!-- 42 -->[codemod] Fix various reported issues on `preset-safe` (#28183) @mnajdova

### `@mui/lab@5.0.0-alpha.46`

- &#8203;<!-- 43 -->[ClockPicker] Fix to narrow hover area for am hours in am/pm clock (#28207) @eps1lon
- &#8203;<!-- 13 -->[Masonry] Improve the styling on the demos (#27957) @hbjORbj
- &#8203;<!-- 12 -->[MasonryItem] Fix crash on unmount when using React 18 (#28202) @eps1lon

### Docs

- &#8203;<!-- 33 -->[docs] Fixes makeStyles migration example (#28213) @RomarQ
- &#8203;<!-- 32 -->[docs] Fix some outdated migration guide (#28222) @siriwatknp
- &#8203;<!-- 31 -->[docs] Update previews (#28223) @eps1lon
- &#8203;<!-- 30 -->[docs] Demo how to use a specific slide direction for Snackbar (#28211) @goncalovf
- &#8203;<!-- 29 -->[docs] Improve docs for creating dark theme (#28104) @mnajdova
- &#8203;<!-- 28 -->[docs] Don't use Material theme in unstyled demos (#28073) @michaldudak
- &#8203;<!-- 27 -->[docs] Fix api doc import example (#28199) @siriwatknp
- &#8203;<!-- 26 -->[docs] Remove demo for re-creating Material-UI switches (#28042) @eps1lon
- &#8203;<!-- 25 -->[docs] Improve legibility of CTA on landing page (#28124) @akashshyamdev
- &#8203;<!-- 24 -->[docs] Fix Link outdated default underline prop (#28134) @outofgamut
- &#8203;<!-- 23 -->[docs] Fix branding theme leaking on the templates (#28120) @mnajdova
- &#8203;<!-- 22 -->[docs] Fix wrong package name in codemod (#28118) @aleccaputo
- &#8203;<!-- 21 -->[docs] Cancelled subscription @oliviertassinari
- &#8203;<!-- 20 -->[docs] Remove style duplication (#28087) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Fix migration guide typo (#28113) @paullaros
- &#8203;<!-- 18 -->[docs] Reorder app bar actions (#28089) @mnajdova
- &#8203;<!-- 17 -->[docs] Support Material design theme in MarkdownElement (#28109) @eps1lon
- &#8203;<!-- 16 -->[docs] Improve diamond sponsors in the navigation (#28090) @mnajdova
- &#8203;<!-- 15 -->[docs] Remove unnecessary comma (#28072) @michaldudak
- &#8203;<!-- 04 -->[website] Add new careers page (#28184) @hbjORbj
- &#8203;<!-- 03 -->[website] Disable Next.js font optimization (#28128) @michaldudak
- &#8203;<!-- 02 -->[website] Polish design-kits & templates (#28131) @siriwatknp
- &#8203;<!-- 01 -->[website] Update utm referral params #28040 @siriwatknp

### Core

- &#8203;<!-- 41 -->[core] Misc bundle size tracking improvements (#28205) @eps1lon
- &#8203;<!-- 40 -->[core] Ensure code preview is valid JavaScript (#28215) @eps1lon
- &#8203;<!-- 39 -->[core] Create @mui/material-next package (#28200) @michaldudak
- &#8203;<!-- 38 -->[core] Rename directories to match the new package names (#28185) @mnajdova
- &#8203;<!-- 37 -->[core] Remove unused include (#28187) @eps1lon
- &#8203;<!-- 36 -->[core] Fix PR detection mechanism for upstream PRs (#28171) @eps1lon
- &#8203;<!-- 35 -->[core] Simplify ResizeObserver logic (#28037) @oliviertassinari
- &#8203;<!-- 34 -->[core] Include TS modules in rollup import resolution (#28094) @michaldudak
- &#8203;<!-- 06 -->[test] Update test to consider unsuppressed double render logs in React 18 (#28068) @eps1lon
- &#8203;<!-- 05 -->[typescript] Make types of componentsProps consistent (#27499) @michaldudak

All contributors of this release in alphabetical order: @akashshyamdev, @aleccaputo, @DouglasPds, @eps1lon, @goncalovf,
@hbjORbj, @michaldudak, @mnajdova, @oliviertassinari, @outofgamut, @paullaros, @RomarQ, @siriwatknp

## 5.0.0-rc.0

<!-- generated comparing v5.0.0-beta.5..next -->

_Sep 1, 2021_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🎉 Renamed packages to `@mui/*` as part of rebranding the company, following the strategy of expanding the library scope beyond Material Design. For more details about it, check the [GitHub discussion](https://github.com/mui/material-ui/discussions/27803).
- 🛠 Added `mui-replace` codemod for migrating `@material-ui/*` to new packages `@mui/*`. Check out this [codemod detail](https://github.com/mui/material-ui/blob/next/packages/mui-codemod/README.md#mui-replace) or head to [migration guide](https://mui.com/guides/migration-v4/#preset-safe)
- 🧪 Added new `<Mansory>` component to the lab, [check it out](https://mui.com/components/masonry/). It has been crafted by our first intern, @hbjORbj 👏!

### `@mui/material@5.0.0-rc.0`

#### Breaking changes

- &#8203;<!-- 33 -->[core] Rename packages (#28049) @mnajdova

  replace `@material-ui/*` prefix with `@mui/*`:

  ```sh
  @material-ui/system -> @mui/system
  @material-ui/styles -> @mui/styles
  @material-ui/lab -> @mui/lab
  @material-ui/types -> @mui/types
  @material-ui/styled-engine -> @mui/styled-engine
  @material-ui/styled-engine-sc ->@mui/styled-engine-sc
  @material-ui/private-theming -> @mui/private-theming
  @material-ui/codemod -> @mui/codemod
  ```

  except these 3 packages that are renamed.

  ```sh
  @material-ui/core => @mui/material        // represents Material Design components.
  @material-ui/icons => @mui/icons-material // represents Material Design icons.
  @material-ui/unstyled => @mui/base        // fully functional components with minimum styles.
  ```

  > **Note**: `@mui/base` (previously `@material-ui/unstyled`) is not the same as `@material-ui/core`.

  We encourage you to use the [codemod](https://github.com/mui/material-ui/blob/next/packages/mui-codemod/README.md#mui-replace) for smooth migration.

#### Changes

- &#8203;<!-- 39 -->[Autocomplete] Update warning for `value` prop (#27977) @vedadeepta
- &#8203;<!-- 37 -->[ButtonGroup] Update PropTypes to match augmentable interface (#27944) @aaronlademann-wf
- &#8203;<!-- 36 -->[CardMedia] Add `image` role if `image` prop is specified but no image `component` is specified (#27676) @eps1lon
- &#8203;<!-- 10 -->[InputBase] Fix autofill issue (#28070) @mnajdova
- &#8203;<!-- 08 -->[Tabs] Fix indicator position when tab size changes (ResizeObserver) (#27791) @hbjORbj
- &#8203;<!-- 06 -->[TextareaAutosize] Sync height when the width of the textarea changes (#27840) @hbjORbj
- &#8203;<!-- 05 -->[ToggleButtonGroup] Add "disabled" prop (#27998) @chetas411
- &#8203;<!-- 34 -->[core] Export types for module augmentation (#28078) @m4theushw

### `@mui/base@5.0.0-alpha.45`

- &#8203;<!-- 38 -->[Button] Create ButtonUnstyled and useButton (#27600) @michaldudak

### `@mui/lab@5.0.0-rc.0`

- &#8203;<!-- 09 -->[Masonry] Add new component (#27439) @hbjORbj

### `@mui/codemod@5.0.0-rc.0`

- &#8203;<!-- 35 -->[codemod] Add `mui-replace` codemod transform (#28060) @siriwatknp

### Docs

- &#8203;<!-- 28 -->[docs] Fix preview for multiline JSX attributes (#28092) @eps1lon
- &#8203;<!-- 27 -->[docs] Add a recommendation for hoisting GlobalStyles to static constant (#28088) @mnajdova
- &#8203;<!-- 26 -->[docs] Update toolbar menu to behave closer to default (#28086) @oliviertassinari
- &#8203;<!-- 25 -->[docs] Markdown redesign polish (#27956) @mnajdova
- &#8203;<!-- 24 -->[docs] Fully translated /api/\* pages (#28044) @eps1lon
- &#8203;<!-- 23 -->[docs] Fix matchSorter import path in Autocomplete (#28063) @StefanBRas
- &#8203;<!-- 22 -->[docs] Fix Fab demo overflow on mobile (#28033) @rajzik
- &#8203;<!-- 21 -->[docs] Add notistack example compatible with v5.x.x (#27881) @iamhosseindhv
- &#8203;<!-- 20 -->[docs] Change sign-up template autocomplete to use "new-password" (#28028) @StefanTobler
- &#8203;<!-- 19 -->[docs] Improve the support expectations for developers (#27999) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Don't use nested ternary (#27986) @eps1lon
- &#8203;<!-- 17 -->[docs] Sync redirections from X into Core @oliviertassinari
- &#8203;<!-- 16 -->[docs] Fix typo '.MuiOutinedInput' -> '.MuiOutlinedInput' (#27997) @rsxdalv
- &#8203;<!-- 15 -->[docs] fix floating action button broken demo (#27976) @rajzik
- &#8203;<!-- 14 -->[docs] Update correct variable name (#27960) @bene-we
- &#8203;<!-- 13 -->[docs] Fix Performance typo (#27965) @tdmiller1
- &#8203;<!-- 12 -->[docs] Add GridExportCSVOptions page to documentation pages (#27951) @flaviendelangle
- &#8203;<!-- 04 -->[website] Add product core page (#27952) @siriwatknp
- &#8203;<!-- 03 -->[website] Make AppBar height and border consistent with nav header (#28085) @michaldudak
- &#8203;<!-- 02 -->[website] Fix typos in the rebranding (#28069) @oliviertassinari
- &#8203;<!-- 01 -->[website] Refine home, pricing and about pages (#27927) @siriwatknp

### Core

- &#8203;<!-- 11 -->[eslint-plugin-material-ui] Only require translation of word characters and not API (#28043) @eps1lon
- &#8203;<!-- 32 -->[core] Use lintable pattern for debounced callbacks (#27985) @eps1lon
- &#8203;<!-- 31 -->[core] Remove file-wide disables of `no-use-before-define` (#27984) @eps1lon
- &#8203;<!-- 30 -->[core] Improve `release:changelog` script (#27941) @eps1lon
- &#8203;<!-- 29 -->[core] Enforce curly braces for block statements (#27946) @eps1lon
- &#8203;<!-- 07 -->[test] Disable BrowserStack for PRs (#28041) @eps1lon

All contributors of this release in alphabetical order: @aaronlademann-wf, @bene-we, @chetas411, @eps1lon, @flaviendelangle, @hbjORbj, @iamhosseindhv, @m4theushw, @michaldudak, @mnajdova, @oliviertassinari, @rajzik, @rsxdalv, @siriwatknp, @StefanBRas, @StefanTobler, @tdmiller1, @vedadeepta

## 5.0.0-beta.5

<!-- generated comparing v5.0.0-beta.4..next -->

_Aug 24, 2021_

A big thanks to the 26 contributors who made this release possible. Here are some highlights ✨:

- 🐛 Fixed a lot of bugs and regressions to get us closer to the [v5 stable release milestone](https://github.com/mui/material-ui/milestone/44)
- 📚 Improved the docs and the migration guide for upgrading to v5

### `@material-ui/core@5.0.0-beta.5`

#### Breaking changes

- &#8203;<!-- 36 --> [core] Update `.browserslistrc` file (#27788) @DanailH

  The targets of the default bundle have changed:

  - Chrome 90 (up from 84)
  - Edge 91 (up from 85)
  - Safari 14 (macOS) (up from 13.1) and 12.4 (iOS) (up from 12.2)
  - Opera 76 (up from 70)

- &#8203;<!-- 43 --> [Autocomplete] Rename Value type to AutocompleteValue (#27804) @michaldudak

  The `useAutocomplete` hook used a type called `Value`. It was a very generic name for a type specific to the `Autocomplete` control, so it was removed to `AutocompleteValue`.

  ```diff
  -import { Value } from '@material-ui/core/useAutocomplete';
  +import { AutocompleteValue } from '@material-ui/core/useAutocomplete';
  ```

#### Changes

- &#8203;<!-- 42 --> [AppBar] Fix transparency issue on dark mode (#27281) @will-amaral
- &#8203;<!-- 29 --> Revert "[BottomNavigation] onClick does not fire if tapped while scrolling (#22524)" (#27690) @eps1lon
- &#8203;<!-- 68 --> [Autocomplete] Add verbose warning for defaultValue (#27925) @vedadeepta
- &#8203;<!-- 78 --> [Badge] Add missing classes to exported class object (#27943) @pvdstel
- &#8203;<!-- 41 --> [ButtonGroup] Allow `size` customization via module augmentation (#27834) @aaronlademann-wf
- &#8203;<!-- 67 --> [InputBase] Preserve host state when changing `rows` from undefined to defined (#27683) @eps1lon
- &#8203;<!-- 18 --> [InputLabel] Apply `asterisk` class when `required` (#27738) @alexile
- &#8203;<!-- 26 --> [Select] Fix NativeSelect propagating classes to the DOM element (#27797) @mnajdova
- &#8203;<!-- 28 --> [Stack] Match the customization standard (#27777) @oliviertassinari
- &#8203;<!-- 70 --> [SvgIcon] Apply custom color if defined in the theme (#27923) @eps1lon
- &#8203;<!-- 65 --> [Switch] Add optional `track` slot to SwitchUnstyled (#27916) @michaldudak
- &#8203;<!-- 52 --> [Tooltip] Fix broken arrow position in rtl (#27868) @mnajdova
- &#8203;<!-- 02 --> [transitions] Allow to run Slide into a custom container (#26623) @benny0642

### `@material-ui/system@5.0.0-beta.5`

#### Breaking changes

- &#8203;<!-- 40 --> [system] Rename `styleProps` to `ownerState` (#27830) @mnajdova

  The change was done in order to better reflect what they are, not what we think they will be used for.

  ```diff
   <SomeSlotComponent
  -  styleProps={propsAndState}
  +  ownerState={propsAndState}
   />
  ```

#### Changes

- &#8203;<!-- 63 --> [system] Remove dependency on `overridesResolver` for the `variants` (#27859) @mnajdova
- &#8203;<!-- 32 --> [system] Forward `classes` prop if no slot specified in the options (#27795) @mnajdova
- &#8203;<!-- 46 --> [system] Fix pseudo class overridden in variants (#27847) @hbjORbj

### `@material-ui/icons@5.0.0-beta.5`

- &#8203;<!-- 13 --> [icons] Improve GitHub size (#27740) @oliviertassinari

### `@material-ui/styled-engine@5.0.0-beta.5`

- &#8203;<!-- 27 --> [styled-engine] Remove unecessary aliases (#27779) @oliviertassinari
- &#8203;<!-- 14 --> [styled-engine] Drop withComponent support (#27780) @oliviertassinari

### `@material-ui/unstyled@5.0.0-alpha.44`

- &#8203;<!-- 07 --> [core] Utilize `CSS.supports` in `SliderUnstyled` component (#27724) @DanailH

### `@material-ui/lab@5.0.0-alpha.44`

- &#8203;<!-- 54 --> [DatePicker] Fix click-away logic requiring second click in some cases (#24877) @eps1lon
- &#8203;<!-- 05 --> [lab] Use the public API for module augmentation (#27735) @oliviertassinari
- &#8203;<!-- 25 --> [Timeline] Fix color="inherit" on TimelineDot (#27794) @mnajdova

### Docs

- &#8203;<!-- 77 --> [docs] Redesign on markdown page (#27860) @mnajdova
- &#8203;<!-- 76 --> [docs] Split changelog into current and old (#27942) @eps1lon
- &#8203;<!-- 74 --> [docs] Migration, emphasize theme structure change (#27935) @oliviertassinari
- &#8203;<!-- 72 --> [docs] Fix missing `href` for AppDrawerNavItems (#27936) @eps1lon
- &#8203;<!-- 71 --> [docs] Pass window of iframe to framed demos (#27924) @eps1lon
- &#8203;<!-- 69 --> [docs] Simplify Select Chip demo styling (#27864) @LorenzHenk
- &#8203;<!-- 60 --> [docs] Move from Redux to React Context (#27828) @eps1lon
- &#8203;<!-- 58 --> [docs] Correct the useAutocomplete import path (#27805) @michaldudak
- &#8203;<!-- 56 --> [docs] Fix Tooltip flicker when hovering between code icon and demo (#27841) @eps1lon
- &#8203;<!-- 55 --> [docs] Don't log if a request was aborted in ServerRequestDatePicker demo (#27843) @eps1lon
- &#8203;<!-- 53 --> [docs] Fix false-positive useToolbar warning when using the demo toolbar menu (#27842) @eps1lon
- &#8203;<!-- 51 --> [docs] Add missing import (#27850) @nguyenyou
- &#8203;<!-- 50 --> [docs] Fix circular integration demo (#27856) @LorenzHenk
- &#8203;<!-- 48 --> [docs] A few examples is enough (#27874) @mekouar-mehdi
- &#8203;<!-- 47 --> [docs] Improve README.md (#27852) @surajkumar016
- &#8203;<!-- 45 --> [docs] Fix rtl issue on the demos (#27865) @mnajdova
- &#8203;<!-- 44 --> [docs] Apply the new branding theme and do the AppBar redesign (#27789) @mnajdova
- &#8203;<!-- 39 --> [docs] Improve grammar in 'Align list items' section (#27730) @atorenherrinton
- &#8203;<!-- 38 --> [docs] Make API documentation tables horizontally scrollable (#27787) @jakeanq
- &#8203;<!-- 37 --> [docs] Fix typo on "Customized dialogs" section (#27827) @nomanoff
- &#8203;<!-- 33 --> [docs] Fix Autocomplete country layout shift (#27814) @oliviertassinari
- &#8203;<!-- 23 --> [docs] Improve accessible labels for Card demos (#27675) @eps1lon
- &#8203;<!-- 22 --> [docs] Run in StrictMode by default (#27693) @eps1lon
- &#8203;<!-- 21 --> [docs] Display TypeScript code of demo if requested (#27691) @eps1lon
- &#8203;<!-- 20 --> [docs] Use country image instead of emoji (#27723) @qiweiii
- &#8203;<!-- 17 --> [docs] Zero runtime themeAugmentation documentation (#27706) @eps1lon
- &#8203;<!-- 15 --> [docs] Fix MobileTextStepper example to match description (#27682) @nolastemgarden
- &#8203;<!-- 12 --> [docs] Document the transfer-list limitations (#27783) @oliviertassinari
- &#8203;<!-- 11 --> [docs] Move TypeScript docs in context (#27782) @oliviertassinari
- &#8203;<!-- 10 --> [docs] Prefer linking API source TypeScript (#27781) @oliviertassinari
- &#8203;<!-- 09 --> [docs] Improve the Modal onClose migration (#27775) @oliviertassinari
- &#8203;<!-- 08 --> [docs] Fix outdated styled-engine docs (#27778) @oliviertassinari
- &#8203;<!-- 06 --> [docs] Improve right to left guide (#27713) @mnajdova
- &#8203;<!-- 04 --> [docs] Consistent line break (#27728) @oliviertassinari
- &#8203;<!-- 03 --> [docs] Don't dispatch ignored "reset code variant" actions (#27712) @eps1lon
- &#8203;<!-- 01 --> [docs] Fix sentence to be more grammatically correct (#27733) @atorenherrinton
- &#8203;<!-- 16 --> [examples] Add code sandbox config with node version (#27798) @qiweiii
- &#8203;<!-- 59 --> Revert "[examples] Fix nextjs with styled-components example (#27583)" (#27921) @mnajdova
- &#8203;<!-- 57 --> Revert "[examples] Update create-react-app examples with styled-components to use package aliases (#27591)" (#27917) @mnajdova
- &#8203;<!-- 66 --> [I10n] Add Khmer (kh-KH) locale support (#27915) @teachhay
- &#8203;<!-- 62 --> [website] Add templates & design-kits page (#27811) @siriwatknp
- &#8203;<!-- 61 --> [website] Improve rebranding homepage performance (#27838) @siriwatknp
- &#8203;<!-- 49 --> [website] Honest a11y value proposition (#27826) @eps1lon
- &#8203;<!-- 35 --> [website] Improve homepage rebranding (#27663) @siriwatknp
- &#8203;<!-- 24 --> [website] A few polish (#27741) @oliviertassinari
- &#8203;<!-- 73 --> [website] Polish homepage (#27930) @oliviertassinari

### Core

- &#8203;<!-- 64 --> [core] Fix various flip: false regressions (#27920) @mnajdova
- &#8203;<!-- 31 --> [core] Fix typo in code comment (#27818) @hamidreza-nateghi
- &#8203;<!-- 19 --> [core] Fix typos in repository (#27785) @JEONGJIHUN
- &#8203;<!-- 75 --> [test] Current behavior when disabling components variants (#27376) @noviicee
- &#8203;<!-- 30 --> [tests Improve test for checking if classes is forwarded to any DOM element (#27815) @mnajdova
- &#8203;<!-- 34 --> [tests] Replace legacy `describeConformance` with `describeConformanceV5` (#27817) @mnajdova

All contributors of this release in alphabetical order: @aaronlademann-wf, @alexile, @atorenherrinton, @benny0642, @DanailH, @eps1lon, @hamidreza-nateghi, @hbjORbj, @jakeanq, @JEONGJIHUN, @LorenzHenk, @mekouar-mehdi, @michaldudak, @mnajdova, @nguyenyou, @nolastemgarden, @nomanoff, @noviicee, @oliviertassinari, @pvdstel, @qiweiii, @siriwatknp, @surajkumar016, @teachhay, @vedadeepta, @will-amaral

## 5.0.0-beta.4

<!-- generated comparing v5.0.0-beta.3..next -->

_Aug 13, 2021_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- 🐛 Grid's "auto" behavior has been fixed by @aaronlademann-wf (#27514)
- ♿ An important bug with the keyboard navigation in MenuList was fixed (#27526) @ryancogswell

### `@material-ui/core@5.0.0-beta.4`

#### Breaking changes

- &#8203;<!-- 07 -->[Grid] Fix "auto" behavior to match natural width of its content (#27514) @aaronlademann-wf

#### Changes

- &#8203;<!-- 30 -->[ButtonBase] Fix tabIndex type (#27684) @kylegach
- &#8203;<!-- 13 -->[MenuList] Fix text navigation (#27526) @ryancogswell
- &#8203;<!-- 01 -->[l10n] Add Arabic Sudan (ar-SD) locale (#27588) @YassinHussein
- &#8203;<!-- 23 -->[Radio] Fix size prop forwarding with custom icons (#27656) @DouglasPds
- &#8203;<!-- 10 -->[TextField] Password visibility icons ( "visibility" ⇔ "visibility-off" ) should be reversed (#27507) @tonextone
- &#8203;<!-- 18 -->[ToggleButton] Fix handling of color prop (#27635) @oliviertassinari

### `@material-ui/codemods@5.0.0-beta.4`

- &#8203;<!-- 20 -->[codemod] Fix filename case sensitive duplicate @oliviertassinari

### `@material-ui/system@5.0.0-beta.4`

- &#8203;<!-- 28 -->[StyledEngineProvider] Remove unnecessary emotion cache export (#27680) @garronej
- &#8203;<!-- 11 -->[system] Fix missing filterProps in compose type (#27618) @R-Bower

### `@material-ui/labs@5.0.0-alpha.42`

- &#8203;<!-- 27 -->[CalendarPicker] Improve contrast between enabled and disabled days (#27603) @nikitabobers
- &#8203;<!-- 32 -->[PickersDay] Render `children` if specified (#27462) @abriginets
- &#8203;<!-- 05 -->[TreeView] Fix TreeItem label overflow (#27585) @LorenzHenk

### Docs

- &#8203;<!-- 36 -->[docs] Update guides for @material-ui/styled-engine-sc installation (#27602) @mnajdova
- &#8203;<!-- 35 -->[docs] Document that @material-ui/styles is not strict mode compatible (#27639) @oliviertassinari
- &#8203;<!-- 34 -->[docs] Link to "Customization of Theme" from relevant theme interfaces (#27689) @eps1lon
- &#8203;<!-- 33 -->[docs] Update CSP page (#27627) @mnajdova
- &#8203;<!-- 29 -->[docs] Reorder and rename "enforce value" ToggleButton demo (#27678) @LorenzHenk
- &#8203;<!-- 12 -->[docs] Fix missing dependency in the DataGrid demo (#27597) @m4theushw
- &#8203;<!-- 04 -->[docs] img should have a src attribute (#27632) @oliviertassinari
- &#8203;<!-- 03 -->[docs] Add badges to Transfer List (#27634) @oliviertassinari
- &#8203;<!-- 02 -->[docs] Recommend the `direct-import` babel plugin over `transform-import` (#27335) @umidbekk
- &#8203;<!-- 37 -->[docs] Remove unused code (#27711) @eps1lon
- &#8203;<!-- 39 -->[docs] Improve virtualization demo (#27340) @vedadeepta
- &#8203;<!-- 31 -->[examples] Include a follow-up on the example (#27620) @matiasherranz
- &#8203;<!-- 26 -->[website] Add about page (#27599) @siriwatknp
- &#8203;<!-- 25 -->[website] Add pricing page (#27598) @siriwatknp

### Core

- &#8203;<!-- 16 -->[core] Batch small changes (#27636) @oliviertassinari
- &#8203;<!-- 06 -->[core] Change range strategy to bump (#27652) @oliviertassinari
- &#8203;<!-- 24 -->[core] Fix visual regression example images (#27660) @eps1lon
- &#8203;<!-- 38 -->[core] Remove diff when running yarn docs:dev (#27720) @eps1lon
- &#8203;<!-- 22 -->[core] Remove mocks of require.context in markdown loader (#27406) @eps1lon
- &#8203;<!-- 09 -->[core] Reduce use CSS when Checkbox disableRipple is set (#27568) @oliviertassinari
- &#8203;<!-- 08 -->[test] Add coverage for jss-to-styled prefix from filename (#27522) @eps1lon
- &#8203;<!-- 15 -->[test] Add current behavior for a11y name vs visible name for PickersDay (#27661) @eps1lon
- &#8203;<!-- 17 -->[test] Dodge double logging in dev mode (#27653) @oliviertassinari
- &#8203;<!-- 14 -->[test] Enable skipped test fixed by upstream React fix (#27615) @eps1lon
- &#8203;<!-- 19 -->[theme] Add missed variants in Components interface (#27453) @nikitabobers

All contributors of this release in alphabetical order: @aaronlademann-wf, @abriginets, @DouglasPds, @eps1lon, @garronej, @kylegach, @LorenzHenk, @m4theushw, @matiasherranz, @mnajdova, @nikitabobers, @oliviertassinari, @R-Bower, @ryancogswell, @siriwatknp, @tonextone, @umidbekk, @vedadeepta, @YassinHussein

## 5.0.0-beta.3

<!-- generated comparing v5.0.0-beta.2..next -->

_Aug 6, 2021_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- &#8203;<!-- 28 -->✨ `jss-to-styled` codemod has been improved to support `createStyles` and `<React.Fragment>` usage (#27578) @mnajdova

### `@material-ui/core@5.0.0-beta.3`

- &#8203;<!-- 33 -->[Modal] Restore `overflowX` and `overflowY` styles (#27487) @PCOffline
- &#8203;<!-- 07 -->[Modal] Remove unnecessary check for children.props.tabIndex (#27374) @noviicee
- &#8203;<!-- 14 -->[Select] Fix regression for icon not rotating (#27511) @mnajdova

### `@material-ui/system@5.0.0-beta.3`

- &#8203;<!-- 38 -->[system] Added top, left, right and bottom border color CSS properties to system (#27580) @R-Bower

### `@material-ui/codemod@5.0.0-beta.3`

- &#8203;<!-- 28 -->[codemod] Add support for `createStyles` usage in `jss-to-styled` (#27578) @mnajdova
- &#8203;<!-- 11 -->[codemod] Fix `jss-to-styled` PREFIX generation on Windows (#27491) @mnajdova
- &#8203;<!-- 39 -->[codemod] Fix `jss-to-styled` codemod to handle React.Fragment as root (#27495) @mnajdova

### `@material-ui/unstyled@5.0.0-alpha.42`

- &#8203;<!-- 13 -->[FormControl] Create FormControlUnstyled (#27240) @michaldudak
- &#8203;<!-- 23 -->[Autocomplete] Move useAutocomplete to the Unstyled package (#27485) @michaldudak

### Docs

- &#8203;<!-- 40 -->[docs] Fix layout shift when opening hash anchor (#27619) @oliviertassinari
- &#8203;<!-- 35 -->[docs] Add TypeScript guide for the `sx` prop (#27417) @mnajdova
- &#8203;<!-- 32 -->[docs] Hardcode listed colors in /customization/color/#playground (#27446) @eps1lon
- &#8203;<!-- 31 -->[docs] Bring back Select#onChange signature API (#27443) @eps1lon
- &#8203;<!-- 27 -->[docs] Remove backticks in the title (#27567) @oliviertassinari
- &#8203;<!-- 26 -->[docs] Fix 404 links (#27566) @oliviertassinari
- &#8203;<!-- 25 -->[docs] Use the same h2 for the customization demos (#27569) @oliviertassinari
- &#8203;<!-- 22 -->[docs] Fix syntax error in v5 migration `styled` api example (#27518) @kimbaudi
- &#8203;<!-- 21 -->[docs] Improve SSR configuration with emotion (#27496) @frandiox
- &#8203;<!-- 19 -->[docs] Change "pseudo-classes" to "state classes" (#27570) @michaldudak
- &#8203;<!-- 18 -->[docs] Add StackBlitz edit demo integration (#27391) @sulco
- &#8203;<!-- 12 -->[docs] Remove unnecessary generic argument (#27516) @bezpalko
- &#8203;<!-- 08 -->[docs] Add customization demos (#27411) @siriwatknp
- &#8203;<!-- 04 -->[docs] Restore initial descriptionRegExp logic (#27436) @oliviertassinari
- &#8203;<!-- 03 -->[docs] Polish jss-to-styled docs (#27457) @oliviertassinari
- &#8203;<!-- 34 -->[examples] Fix nextjs with styled-components example (#27583) @mnajdova
- &#8203;<!-- 29 -->[examples] Update create-react-app examples with styled-components to use package aliases (#27591) @mnajdova
- &#8203;<!-- 09 -->[examples] Improve integration examples with Next.js (#27331) @Harshita-Kanal
- &#8203;<!-- 37 -->[website] Add spicefactory as gold sponsor @oliviertassinari
- &#8203;<!-- 30 -->[website] Homepage rebranding (#27488) @siriwatknp
- &#8203;<!-- 24 -->[website] Add Flavien to team and about pages (#27575) @flaviendelangle
- &#8203;<!-- 17 -->[website] Add Ryan to Community contributors for Stack Overflow contributions (#27529) @ryancogswell
- &#8203;<!-- 02 -->[website] Add references section to home (#27444) @siriwatknp

### Core

- &#8203;<!-- 20 -->[core] rebaseWhen=auto does not seem to work (#27565) @oliviertassinari
- &#8203;<!-- 10 -->[core] Improve instructions for the @material-ui/styles migration (#27466) @mnajdova
- &#8203;<!-- 06 -->[core] Batch small changes (#27435) @oliviertassinari
- &#8203;<!-- 01 -->[core] Receive patch and minor dependency updates (#27455) @eps1lon
- &#8203;<!-- 16 -->[test] Update coverage to include all @material-ui packages (#27521) @eps1lon
- &#8203;<!-- 15 -->[test] Lint codemod tests (#27519) @eps1lon
- &#8203;<!-- 05 -->[test] Allow tests to run for 6s before timeout (#27456) @oliviertassinari

All contributors of this release in alphabetical order: @bezpalko, @eps1lon, @flaviendelangle, @frandiox, @Harshita-Kanal, @kimbaudi, @michaldudak, @mnajdova, @noviicee, @oliviertassinari, @PCOffline, @R-Bower, @ryancogswell, @siriwatknp, @sulco

## 5.0.0-beta.2

<!-- generated comparing v5.0.0-beta.1..next -->

_Jul 26, 2021_

A big thanks to the 20 contributors who made this release possible. Here are some highlights ✨:

- ✨ We introduced new codemod for converting JSS styles to emotion (#27292) @siriwatknp
  It should help adoption of v5, by making possible the removal of JSS sooner.

- 🐛 The majority of other changes in this release were bug fixes, test utilities and docs.

### `@material-ui/core@5.0.0-beta.2`

- &#8203;<!-- 54 -->[Autocomplete] Explain how the loading prop works (#27416) @michaldudak
- &#8203;<!-- 49 -->[Autocomplete] Update input value when the input changes (#27313) @turtleseason
- &#8203;<!-- 09 -->[Autocomplete] Popper is not closing when the Autocomplete is disabled (#27312) @Goodiec
- &#8203;<!-- 42 -->[Checkbox] Skip default hover styles with `disableRipple` (#27314) @faan234
- &#8203;<!-- 50 -->[Dialog] Fix override paper styles (#27423) @newsiberian
- &#8203;<!-- 17 -->[Grid] Remove width prop for rowSpacing (#27326) @sashkopavlenko
- &#8203;<!-- 33 -->[Input] Merge `componentsProps` correctly (#27371) @mnajdova
- &#8203;<!-- 55 -->[Pagination] Fixed usePagination requires @emotion in development mode (#27348) @ruppysuppy
- &#8203;<!-- 07 -->[Pagination] Fix :hover effect on previous/next button (#27304) @Aubrey-Li
- &#8203;<!-- 03 -->[Popper] Consistent timing of popper instance creation (#27233) @eps1lon
- &#8203;<!-- 45 -->[Select] Add `SelectChangeEvent` for accurate types for event in onChange prop (#27370) @eps1lon
- &#8203;<!-- 18 -->[Tabs] Use theme transition duration for the Tab animation (#27303) @florianbepunkt
- &#8203;<!-- 35 -->[TextField] Allow custom colors in FormLabel (#27337) @oliviertassinari
- &#8203;<!-- 14 -->[TextField] Fix name of componentsProps (#27338) @oliviertassinari
- &#8203;<!-- 04 -->[transitions] Make sure inline styles used for transition values if declared (#27140) @eps1lon

### `@material-ui/codemod@5.0.0-beta.2`

- &#8203;<!-- 57 -->[codemod] Add `optimal-imports` for v5 (#27404) @mnajdova
- &#8203;<!-- 48 -->[codemod] Add jss to emotion codemod (#27292) @siriwatknp
- &#8203;<!-- 34 -->[codemod] Fix running codemod CLI on Windows (#27395) @michaldudak
- &#8203;<!-- 32 -->[codemod] Fix published version (#27384) @eps1lon
- &#8203;<!-- 10 -->[codemod] Improve README.md (#27257) @mnajdova

### `@material-ui/unstyled@5.0.0-alpha.41`

- &#8203;<!-- 36 -->[NoSsr] Move NoSsr to the Unstyled package (#27356) @michaldudak

### `@material-ui/utils@5.0.0-beta.1`

- &#8203;<!-- 43 -->[utils] Convert createChainedFunction to TypeScript (#27386) @eps1lon

### `@material-ui/system@5.0.0-beta.2`

- &#8203;<!-- 39 -->[system] Compute display name of `styled` component if `name` isn't set (#27401) @eps1lon
- &#8203;<!-- 08 -->[system] Adds missing type for `shouldForwardProp` (#27310) @KLubin1

### `@material-ui/lab@5.0.0-alpha.41`

- &#8203;<!-- 58 -->[pickers] Only accept dates from adapters in min/max props (#27392) @eps1lon
- &#8203;<!-- 15 -->[pickers] Fallback to today if all possible dates are disabled (#27294) @eps1lon
- &#8203;<!-- 06 -->[pickers] Minify error when LocalizationProvider is missing (#27295) @eps1lon
- &#8203;<!-- 01 -->[pickers] Fix Fade animation behavior change (#27283) @oliviertassinari

### Docs

- &#8203;<!-- 56 -->[docs] Display Popper arrow correctly (#27339) @Patil2099
- &#8203;<!-- 53 -->[docs] Focus pickers introduction on Material-UI (#27394) @eps1lon
- &#8203;<!-- 51 -->[docs] Fix wrong import path in @material-ui/styles section (#27427) @WeldonTan
- &#8203;<!-- 47 -->[docs] Update color imports (#27321) @siriwatknp
- &#8203;<!-- 38 -->[docs] Sync params of callbacks between types and JSDoc description (#27366) @eps1lon
- &#8203;<!-- 37 -->[docs] Add migration note for synthetic native events in onChange (#27368) @eps1lon
- &#8203;<!-- 31 -->[docs] Improve unstyled docs (#27382) @oliviertassinari
- &#8203;<!-- 30 -->[docs] Update `Transitions` page (#27319) @siriwatknp
- &#8203;<!-- 29 -->[docs] Add Unstyled components docs page (#27158) @michaldudak
- &#8203;<!-- 28 -->[docs] Fix app bar regression (#27373) @mnajdova
- &#8203;<!-- 27 -->[docs] Update migration guide to have a section on nested classes (#27354) @mnajdova
- &#8203;<!-- 25 -->[docs] Convert App\* components to emotion (#27150) @eps1lon
- &#8203;<!-- 23 -->[docs] Fix duplicate "Theme" header (#27353) @eps1lon
- &#8203;<!-- 22 -->[docs] Remove horizontal scrollbar in MiniDrawer (#27055) @AlvesJorge
- &#8203;<!-- 21 -->[docs] Add `makeStyles` explanation in troubleshooting (#27322) @siriwatknp
- &#8203;<!-- 20 -->[docs] Fix ExpansionPanel migration notes (#27352) @eps1lon
- &#8203;<!-- 19 -->[docs] Transpile markdown files (#27349) @eps1lon
- &#8203;<!-- 12 -->[docs] Fix typo in the word typography (#27329) @tudi2d
- &#8203;<!-- 11 -->[docs] Use actual symbol of kilogram (#27332) @getsnoopy
- &#8203;<!-- 02 -->[docs] Make migration doc easier to follow (#26948) @siriwatknp
- &#8203;<!-- 46 -->[examples] Cleanup `gatsby` examples (#27375) @mnajdova
- &#8203;<!-- 41 -->[examples] Create nextjs example using styled-components (#27088) @hboylan
- &#8203;<!-- 26 -->[examples] Update gatsby example to use custom plugin (#27357) @mnajdova

### Core

- &#8203;<!-- 24 -->[core] Remove obsolete styles documentation (#27350) @eps1lon
- &#8203;<!-- 13 -->[core] Fix GitHub language detection (#27298) @oliviertassinari
- &#8203;<!-- 44 -->[test] Include coverage report of browser tests (#27389) @eps1lon
- &#8203;<!-- 40 -->[test] Add current behavior for getDisplayName with context components (#27402) @eps1lon
- &#8203;<!-- 05 -->[test] Enable skipped picker tests (#27268) @eps1lon
- &#8203;<!-- 52 -->[website] Add hero section to homepage (#27364) @siriwatknp

All contributors of this release in alphabetical order: @AlvesJorge, @Aubrey-Li, @eps1lon, @faan234, @florianbepunkt, @g
etsnoopy, @Goodiec, @hboylan, @KLubin1, @michaldudak, @mnajdova, @newsiberian, @oliviertassinari, @Patil2099, @ruppysupp
y, @sashkopavlenko, @siriwatknp, @tudi2d, @turtleseason, @WeldonTan

## 5.0.0-beta.1

<!-- generated comparing v5.0.0-beta.0..next -->

_Jul 14, 2021_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- ✨ We have introduced a new unstyled component: the Switch (#26688) @michaldudak
  You can find two new versions of the Switch. A component without any styles: [`SwitchUnstyled`](https://mui.com/components/switches/#unstyled), and a hook: [`useSwitch`](https://mui.com/components/switches/#useswitch-hook).

  <a href="https://mui.com/components/switches/#unstyled"><img width="832" alt="switch" src="https://user-images.githubusercontent.com/3165635/125192249-236f8a80-e247-11eb-9df9-17d476379a32.png"></a>

  You can follow our progress at https://github.com/mui/material-ui/issues/27170.

- 💄 We have updated the default `info` `success` `warning` color to be more accessible (#26817) @siriwatknp.
  You can find the new [default values](https://mui.com/customization/palette/#default-values) in the documentation.

  <a href="https://mui.com/customization/palette/#default-values"><img width="780" alt="colors" src="https://user-images.githubusercontent.com/3165635/125192657-4864fd00-e249-11eb-9dc1-44857b25b3b8.png"></a>

### `@material-ui/core@5.0.0-beta.1`

#### Breaking changes

- [Fab] Remove no longer necessary span wrapper (#27112) @siriwatknp
- [ToggleButton] Remove no longer necessary span wrapper (#27111) @siriwatknp

#### Changes

- [Autocomplete] Add componentsProps (#27183) @michal-perlakowski
- [Avatar] Fix support for crossOrigin (#27013) @ShirasawaSama
- [ButtonBase] Correct `disableRipple` API description (#27187) @michaldudak
- [ButtonGroup] Add color palette types (#27215) @ShirasawaSama
- [SwitchBase] Bring back `checked` and mark as deprecated (#27047) @siriwatknp
- [TextField] Remove redundant useFormControl implementation (#27197) @michaldudak
- [theme] Add missing MuiRating types to components.d.ts (#27086) @rajzik
- [theme] Remove `createV4Spacing` from `adaptV4Theme` (#27072) @siriwatknp
- [theme] Update default `info` `success` `warning` color (#26817) @siriwatknp
- [ToggleButton] Add color palette types (#27046) @ShirasawaSama
- [ToggleButton] Fix the api page (#27164) @oliviertassinari

### `@material-ui/unstyled@5.0.0-alpha.40`

- [Switch] Create SwitchUnstyled and useSwitch (#26688) @michaldudak

### `@material-ui/codemod@5.0.0-beta.1`

- [codemod] Add v5 important migration (#27032) @siriwatknp
- [codemod] Fix v5 codemods on Windows (#27254) @michaldudak

### `@material-ui/system@5.0.0-beta.1`

- [Box] Add breakpoint value support to maxWidth prop (#26984) @ansh-saini

### `@material-ui/lab@5.0.0-alpha.40`

- [CalendarPicker] Fix slide transition regression (#27273) @eps1lon
- [CalendarPicker] Use transition components from core instead of a custom implementation (#27043) @eps1lon
- [pickers] Fix default value of text keys (#26990) @oliviertassinari
- [TimePicker] Change default minutes and seconds to zero (#27037) @michal-perlakowski

### Docs

- [blog] Q2 2021 Update (#27089) @oliviertassinari
- [docs] Add information that the label prop in FormControlLabel is now @michal-perlakowski
- [docs] Don't crash page if an Ad crashes (#27178) @eps1lon
- [docs] Fix alt description of movavi backer @oliviertassinari
- [docs] Fix import source of hidden component (#27116) @vimutti77
- [docs] Fix layout regression (#27272) @oliviertassinari
- [docs] Fix syntax error in /styles/api markdown (#27176) @sahil-blulabs
- [docs] Fix the link for the sx props page (#27202) @mnajdova
- [docs] Fix theme context example code (#27053) @moshfeu
- [docs] Fix typo in CONTRIBUTING.md (#27218) Ayush Dubey
- [docs] Fix typos (#27074) @michaldudak
- [docs] Improve nav semantics (#27138) @eps1lon
- [docs] Migrate Ad\* components to emotion (#27159) @mnajdova
- [docs] Migrate rest of the docs to emotion (#27184) @mnajdova
- [docs] Move versions from \_app PageContext to page-specific context (#27078) @eps1lon
- [docs] Only bundle one version of the demos in production (#27020) @eps1lon
- [docs] Reduce layout shift on landing page (#27251) @eps1lon
- [docs] Remove Ethical Ads (#27173) @mbrookes
- [docs] Remove unused fs polyfill (#27069) @eps1lon
- [docs] Remove usage of `url` package (#27151) @eps1lon
- [docs] Replace react-text-mask with react-imask in integration example (#27071) @michal-perlakowski
- [docs] Sort the size in a more logical order (#27186) @oliviertassinari
- [docs] Use actual link to paperbase (#27063) @eps1lon
- [docs] Use custom markdown loader for landing page (#27065) @eps1lon
- [docs] Use webpack 5 (#27077) @eps1lon
- [examples] Fix CDN warning (#27229) @oliviertassinari
- [examples] Remove `StyledEngineProvider` as JSS is not used (#27133) @mnajdova
- [examples] Remove forgotten StyledEngineProvider (#27163) @oliviertassinari

### Core

- [core] Batch small changes (#26970) @oliviertassinari
- [core] Configure Renovate (#27003) @renovate[bot]
- [core] Migrate remaining mentions of Dependabot to Renovate (#27118) @eps1lon
- [core] Run yarn deduplicate on Renovate updates (#27115) @eps1lon
- [test] Document broken React 18 behavior of Autocomplete (#27242) @eps1lon
- [test] Increase BS timeout to 6min (#27179) @oliviertassinari
- [test] Migrate regressions to emotion (#27010) @vicasas
- [test] Narrow down React 18 compat issues (#27134) @eps1lon
- [test] Remove StyledEngineProvider usage from regressions and e2e test @mnajdova
- [test] Run React 18 integration tests with new createRoot API (#26672) @eps1lon
- [test] Update tests with latest state of StrictMode compatibility (#27042) @eps1lon
- [test] Use DOM events instead of mocked, partial events (#27198) @eps1lon
- [website] Open 4 new roles (#27123) @oliviertassinari
- [blog] Danilo Leal joins Material-UI (#27231) @oliviertassinari

All contributors of this release in alphabetical order: @eps1lon, @mbrookes, @michal-perlakowski, @michaldudak, @mnajdova, @moshfeu, @oliviertassinari, @rajzik, @renovate[bot], @sahil-blulabs, @ShirasawaSama, @siriwatknp, @vimutti77

## 5.0.0-beta.0

<!-- generated comparing v5.0.0-alpha.38..next -->

_Jul 01, 2021_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

- 🎉 This is the first beta release of v5! A huge thanks to everyone who helped to make this happen! We're targeting the 1st of September for a stable release, and will use the next two months to polish v5, and ease the migration from v4. You can follow [the v5 stable milestone](https://github.com/mui/material-ui/milestone/44) for more details. We now encourage any new projects to start on v5.
- 🚀 We have completed all the planned breaking changes.
- ⚒️ We added the codemod CLI to simplify migration to v5 (#26941) @eps1lon. You can find it at [`@material-ui/codemod`](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod).
- 🐛 The majority of other changes in this release were bug fixes, test utilities and docs.

### `@material-ui/core@5.0.0-beta.0`

#### Breaking changes

- [Tabs] Remove unnecessary wrapper from Tab (#26926) @siriwatknp

  `span` element that wraps children has been removed. `wrapper` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
  <button class="MuiTab-root">
  - <span class="MuiTab-wrapper">
      {icon}
      {label}
  - </span>
  </button>
  ```

- [BottomNavigation] Remove wrapper from BottomNavigationAction (#26923) @siriwatknp

  `span` element that wraps children has been removed. `wrapper` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
  <button class="MuiBottomNavigationAction-root">
  - <span class="MuiBottomNavigationAction-wrapper">
      {icon}
      <span class="MuiBottomNavigationAction-label">
        {label}
      </span>
  - </span>
  </button>
  ```

#### Changes

- &#8203;<!-- 19 -->[Box] Fix TypeScript error on maxWidth prop (#26859) @ansh-saini
- &#8203;<!-- 04 -->[Dialog] Automatically label by its DialogTitle (#26814) @eps1lon
- &#8203;<!-- 32 -->[Hidden] Bring back and mark as deprecated (#26908) @siriwatknp
- &#8203;<!-- 53 -->[List] Add button runtime deprecation warning (#26743) @siriwatknp
- &#8203;<!-- 03 -->[Modal] Type BackdropProps according to styled version (#26836) @eps1lon
- &#8203;<!-- 21 -->[Radio] Fix `defaultValue` to match the other value types (#26945) @oliviertassinari
- &#8203;<!-- 48 -->[Stepper] Add completed to global pseudo-classes (#26953) @michal-perlakowski
- &#8203;<!-- 25 -->[Stepper] Fix support for no connectors (#26874) @varandasi
- &#8203;<!-- 20 -->[TextField] Prevent `hiddenLabel` from spreading to DOM (#26864) @siriwatknp
- &#8203;<!-- 18 -->[TextField] Fix label disappearing when focusing a button (#26933) @michal-perlakowski

### `@material-ui/codemod@5.0.0-beta.0`

- &#8203;<!-- 37 -->[codemod] Add CLI (#26941) @eps1lon

### @material-ui/icons@5.0.0-beta.0

- &#8203;<!-- 29 -->[icons] Regenerate transpiled files (#26985) @eps1lon

### @material-ui/lab@5.0.0-alpha.39

#### Breaking changes

- [DatePicker] Remove helper text default value (#26866) @DouglasPds

  Make the default rendered text field closer to the most common use cases (denser).

  ```diff
  <DatePicker
    label="Helper text example"
    value={value}
    onChange={onChange}
    renderInput={(params) => (
  -    <TextField {...params} />
  +    <TextField {...params} helperText={params?.inputProps?.placeholder} />
    )}
  >
  ```

#### Changes

- &#8203;<!-- 12 -->[lab] Fix missing dependency on unstyled (#26937) @fishyFrogFace
- &#8203;<!-- 50 -->[pickers] Consider TDate in ToolbarComponent types (#27035) @michal-perlakowski

### `@material-ui/system@5.0.0-beta.0`

- &#8203;<!-- 14 -->[system] Support array overridesResolver (#26824) @siriwatknp

### Docs

- &#8203;<!-- 49 -->[docs] Add notes to Table demo about stableSort (#27025) @CarlosGomez-dev
- &#8203;<!-- 47 -->[docs] Add gold sponsor (#26968) @oliviertassinari
- &#8203;<!-- 42 -->[docs] Update unstyled demos to not depend on `@material-ui/core` (#26869) @mnajdova
- &#8203;<!-- 41 -->[docs] Fix demo paths in windows (#27004) @eps1lon
- &#8203;<!-- 40 -->[docs] Export all locales (#27002) @eps1lon
- &#8203;<!-- 38 -->[docs] Misc CONTRIBUTING.md changes (#26925) @eps1lon
- &#8203;<!-- 35 -->[docs] Fix /components/hidden merge conflict (#26997) @eps1lon
- &#8203;<!-- 26 -->[docs] Fix 404 links (#26963) @oliviertassinari
- &#8203;<!-- 24 -->[docs] Remove link that points to v4 blog post (#26960) @steveafrost
- &#8203;<!-- 16 -->[docs] Use custom webpack loader for markdown (#26774) @eps1lon
- &#8203;<!-- 11 -->[docs] Fix 301 links (#26942) @oliviertassinari
- &#8203;<!-- 01 -->[docs] Add page for the `sx` prop (#26769) @mnajdova
- &#8203;<!-- 52 -->[docs] pre-fill issue when a demo crashes (#27034) @eps1lon
- &#8203;<!-- 54 -->[docs] Move styled page under system (#26818)

### Core

- &#8203;<!-- 46 -->[core] Inline rollup-plugin-size-snapshot (#26986) @eps1lon
- &#8203;<!-- 43 -->[core] Remove unused props clone (#26992) @oliviertassinari
- &#8203;<!-- 36 -->[core] Fix tests on Windows (#26931) @michaldudak
- &#8203;<!-- 31 -->[core] Fix merge conflict between #26954 and #26874 @oliviertassinari
- &#8203;<!-- 22 -->[core] Upgrade issues-helper to v2 (#26955) @michal-perlakowski
- &#8203;<!-- 05 -->[core] Fix merge conflict (#26928) @eps1lon
- &#8203;<!-- 45 -->[test] Convert HiddenCSS tests to testing-library (#27019) @eps1lon
- &#8203;<!-- 44 -->[test] Convert NativeSelectInput tests to testing-library (#26952) @eps1lon
- &#8203;<!-- 39 -->[test] Add a default mount implementation to conformance tests (#26949) @eps1lon
- &#8203;<!-- 28 -->[test] Update tests to pass react@next (#26967) @eps1lon
- &#8203;<!-- 27 -->[test] Add types to describeConformanceV5 (#26954) @eps1lon
- &#8203;<!-- 17 -->[test] Use createPickerMount where appropriate (#26951) @eps1lon
- &#8203;<!-- 15 -->[test] Convert SwipeableDrawer tests to testing-library (#26916) @eps1lon
- &#8203;<!-- 13 -->[test] Convert Menu tests to testing-library (#26915) @eps1lon
- &#8203;<!-- 10 -->[test] Convert Popover tests to testing-library (#26913) @eps1lon
- &#8203;<!-- 08 -->[test] Convert Modal tests to testing-library (#26912) @eps1lon
- &#8203;<!-- 07 -->[test] Make remaining testing-library tests StrictMode compatible (#26924) @eps1lon
- &#8203;<!-- 51 -->[test] Only allow wrapping enzyme mount not creating (#27018) @eps1lon
- &#8203;<!-- 06 -->[typescript] Disallow spreading TransitionHandlerProps (#26927) @eps1lon

All contributors of this release in alphabetical order: @ansh-saini, @BC-M, @CarlosGomez-dev, @DouglasPds, @eps1lon, @fishyFrogFace, @michal-perlakowski, @michaldudak, @mnajdova, @oliviertassinari, @siriwatknp, @steveafrost, @varandasi

## 5.0.0-alpha.38

<!-- generated comparing v5.0.0-alpha.37..next -->

_Jun 23, 2021_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🚀 We have only 2 left in the [breaking changes](https://github.com/mui/material-ui/issues/20012). The plan to release 5.0.0-beta.0 is on July 1st and will start to promote its usage over v4.
- 🎨 We have updated `Slider` to match current [Material Design guidelines](https://material.io/components/sliders).

  <a href="https://mui.com/components/slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

- 💡 `IconButton` now supports 3 sizes (`small, medium, large`). [See demo](https://mui.com/components/buttons/#sizes-2).
- ♿️ We have improved the default style of the `Link` to be more accessible (#26145) @ahmed-28

  <a href="https://mui.com/components/links/"><img width="543" alt="" src="https://user-images.githubusercontent.com/3165635/123097983-ef1b6200-d430-11eb-97da-b491fba5df49.png"></a>

### `@material-ui/core@5.0.0-alpha.38`

#### Breaking changes

- &#8203;<!-- 05 -->[Menu] Use ButtonBase in MenuItem (#26591) @siriwatknp

  - Change the default value of `anchorOrigin.vertical` to follow the Material Design guidelines. The menu now displays below the anchor instead of on top of it. You can restore the previous behavior with:

    ```diff
     <Menu
    +  anchorOrigin={{
    +    vertical: 'top',
    +    horizontal: 'left',
    +  }}
    ```

  - The `MenuItem` component inherits the `ButtonBase` component instead of `ListItem`. The class names related to "MuiListItem-\*" are removed and theming `ListItem` is no longer affecting `MenuItem`.

    ```diff
    -<li className="MuiButtonBase-root MuiMenuItem-root MuiListItem-root">
    +<li className="MuiButtonBase-root MuiMenuItem-root">
    ```

  - The prop `listItemClasses` was removed, you can use `classes` instead.

    ```diff
    -<MenuItem listItemClasses={{...}}>
    +<MenuItem classes={{...}}>
    ```

- &#8203;<!-- 09 -->[theme] Improve default breakpoints (#26746) @siriwatknp

  The default breakpoints were changed to better match the common use cases. They also better match the Material Design guidelines. [Read more about the change](https://github.com/mui/material-ui/issues/21902).

  ```diff
  {
    xs: 0,
    sm: 600,
  - md: 960,
  + md: 900,
  - lg: 1280,
  + lg: 1200,
  - xl: 1920,
  + xl: 1536,
  }
  ```

  If you prefer the old breakpoint values, use the snippet below.

  ```js
  import { createTheme } from '@material-ui/core/styles';

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  ```

- &#8203;<!-- 10 -->[IconButton] Add size `large` and update styles (#26748) @siriwatknp

  The default size's padding is reduced to `8px` which makes the default IconButton size of `40px`. To get the old default size (`48px`), use `size="large"`. The change was done to better match Google's products when Material Design stopped documenting the icon button pattern.

  ```diff
  - <IconButton>
  + <IconButton size="large">
  ```

- &#8203;<!-- 08 -->[Slider] Adjust css to match the specification (#26632) @siriwatknp

  Rework the CSS to match the latest [Material Design guidelines](https://material.io/components/sliders) and make custom styles more intuitive. [See documentation](https://mui.com/components/slider/).

  <a href="https://mui.com/components/slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

  You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](https://mui.com/components/slider/#sizes).

  <a href="https://mui.com/components/slider/#sizes"><img width="330" alt="" src="https://user-images.githubusercontent.com/3165635/123076549-8aa0d880-d419-11eb-8835-06cd2b21b2d3.png" style="margin: auto"></a>

- &#8203;<!-- 14 -->[IconButton] Remove label span (#26801) @siriwatknp

  `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
  <button class="MuiIconButton-root">
  - <span class="MuiIconButton-label">
      <svg />
  - </span>
  </button>
  ```

- &#8203;<!-- 19 -->[core] Remove `unstable_` prefix on the `useThemeProps` hook (#26777) @mnajdova

  The following utilities were renamed to not contain the `unstable_` prefix:

  - `@material-ui/sytstem`

  ```diff
   import {
  -  unstable_useThemeProps,
  +  useThemeProps,
   } from '@material-ui/system';
  ```

  - `@material-ui/core`

  ```diff
   import {
  -  unstable_useThemeProps,
  +  useThemeProps,
   } from '@material-ui/core/styles';
  ```

#### Changes

- &#8203;<!-- 33 -->[Alert] Add support for custom colors (#26831) @varandasi
- &#8203;<!-- 32 -->[Button] Fix loading text invisible when disabled (#26857) @DanielBretzigheimer
- &#8203;<!-- 43 -->[ButtonBase] Consider as a link with a custom component and `to` prop (#26576) @shadab14meb346
- &#8203;<!-- 17 -->[ButtonBase] Derive state on render instead of in layout effects (#26762) @eps1lon
- &#8203;<!-- 37 --> [Drawer] Fix incorrect z-index (#26791) @michal-perlakowski
- &#8203;<!-- 28 -->[Drawer] Remove incorrect transition handler props (#26835) @eps1lon
- &#8203;<!-- 01 -->[Link] Improve accessibility support (#26145) @ahmed-28
- &#8203;<!-- 41 -->[Modal] Fix calculating scrollbar size when using custom scrollbar (#26816) @michal-perlakowski
- &#8203;<!-- 29 -->[Rating] Make input ids less predictable (#26493) @eps1lon
- &#8203;<!-- 27 -->[Stepper] Add componentsProps.label to StepLabel (#26807) @michal-perlakowski
- &#8203;<!-- 36 -->[Tabs] Show error when Tab has display: none (#26783) @michal-perlakowski
- &#8203;<!-- 46 -->[theme] Add base color palette type to components (#26697) @siriwatknp

### `@material-ui/system@5.0.0-alpha.38`

#### Breaking Changes

- &#8203;<!-- 35 -->[system] Normalize api for `createBox` (#26820) @mnajdova

  ```diff
   import { createBox } from '@material-ui/system';

  -const styled = createBox(defaultTheme);
  +const styled = createBox({ defaultTheme });
  ```

#### Changes

- &#8203;<!-- 12 -->[system] Add ThemeProvider component (#26787) @mnajdova

### Docs

- &#8203;<!-- 45 -->[docs] Fix misspelling of the word Typography (#26898) @dmrqx
- &#8203;<!-- 42 -->[docs] Instruct users to install @material-ui/icons with the next tag (#26873) @michal-perlakowski
- &#8203;<!-- 26 -->[docs] Sync translations (#26828) @l10nbot
- &#8203;<!-- 25 -->[docs] Improve grammar of autocomplete/autofill section (#26798) @dijonkitchen
- &#8203;<!-- 18 -->[docs] Explain "inherited props" better in the props table (#26778) @eps1lon
- &#8203;<!-- 16 -->[docs] Fix documentation for upgrading to v5 (#26812) @tungdt-90
- &#8203;<!-- 13 -->[docs] Improve notification color (#26796) @mnajdova
- &#8203;<!-- 11 -->[docs] Fix various a11y issues with /customization/color (#26757) @eps1lon
- &#8203;<!-- 04 -->[docs] Move custom theme to frame (#26744) @siriwatknp
- &#8203;<!-- 02 -->[docs] Fix small PT typo fix: inciar -> iniciar (#26775) @brunocavalcante
- &#8203;<!-- 03 -->[I10n] Add Chinese (Hong Kong) (zh-HK) locale (#26637) @kshuiroy
- &#8203;<!-- 44 -->[l10n] Add sinhalese (siLK) locale (#26875) @pavinduLakshan
- &#8203;<!-- 39 -->[examples] Rename nextjs typescript theme from tsx to ts (#26862) @Izhaki

### Core

- &#8203;<!-- 38 -->[test] Fix Drawer test API @oliviertassinari
- &#8203;<!-- 34 -->[test] Adjust expected useAutocomplete error messages for React 18 (#26858) @eps1lon
- &#8203;<!-- 30 -->[test] Convert Drawer tests to testing-library (#26837) @eps1lon
- &#8203;<!-- 23 -->[test] Convert remaining enzyme tests to testing-library (#26832) @eps1lon
- &#8203;<!-- 22 -->[test] Ignore ReactDOM.hydrate deprecation warnings (#26815) @eps1lon
- &#8203;<!-- 06 -->[test] Reduce flakiness (#26761) @eps1lon
- &#8203;<!-- 07 -->[useId] Reduce likelyhood of collisions (#26758) @eps1lon
- &#8203;<!-- 31 -->yarn deduplicate @oliviertassinari
- &#8203;<!-- 21 -->Fix running framer's prettier under pwsh (#26819) @michaldudak
- &#8203;<!-- 40 -->[core] Update babel-plugin-optimize-clsx (#26861) @oliviertassinari
- &#8203;<!-- 24 -->[core] Assume no document.all at runtime (#26821) @eps1lon
- &#8203;<!-- 20 -->[core] Remove dependency on `@material-ui/private-theming` (#26793) @mnajdova
- &#8203;<!-- 15 -->[core] Remove dependency on `@material-ui/styled-engine` (#26792) @mnajdova

All contributors of this release in alphabetical order: @ahmed-28, @brunocavalcante, @DanielBretzigheimer, @dijonkitchen, @dmrqx, @eps1lon, @Izhaki, @kshuiroy, @l10nbot, @michal-perlakowski, @michaldudak, @mnajdova, @oliviertassinari, @pavinduLakshan, @shadab14meb346, @siriwatknp, @tungdt-90, @varandasi

## 5.0.0-alpha.37

<!-- generated comparing v5.0.0-alpha.36..next -->

_Jun 15, 2021_

A big thanks to the 11 contributors who made this release possible. Here are some highlights ✨:

- 💄 Add support for responsive props on the Grid component (#26590) @likitarai1.
  This fixes a longstanding issue. You can now specify different values for each breakpoint.

  ```jsx
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={2} sm={4} md={4} />
    <Grid item xs={2} sm={4} md={4} />
    <Grid item xs={2} sm={4} md={4} />
  </Grid>
  ```

  Head to the [documentation](https://mui.com/components/grid/#responsive-values) for more details.

- ⚒️ We've introduced a new `useTheme` and `useThemeProps` hooks in the `@material-ui/system` package.
  We believe that this package can be used as a standalone styling solution for building custom design systems (#26649) @mnajdova.
- 💥 Made progress with the breaking changes. We have done 105 of the 109 changes [planned](https://github.com/mui/material-ui/issues/20012). We are getting closer to our goal of releasing 5.0.0-beta.0 on July 1st and start to promote its usage over v4. You can also follow [our milestone](https://github.com/mui/material-ui/milestone/35) for more details.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.37`

#### Breaking changes

- &#8203;<!-- 10 -->[Button] Remove label span (#26666) @siriwatknp

  The `span` element that wraps children has been removed. `label` classKey is also removed. The nested span was required for fixing a flexbox issue with iOS < 11.0.

  ```diff
  <button class="MuiButton-root">
  - <span class="MuiButton-label">
      children
  - </span>
  </button>
  ```

#### Changes

- &#8203;<!-- 08 -->[Button] Add missing color type (#26593) @sakura90
- &#8203;<!-- 07 -->[Grid] Add responsive direction and spacing props (#26590) @likitarai1
- &#8203;<!-- 05 -->[List] Add ListItemButton export to index (#26667) @chadmuro
- &#8203;<!-- 09 -->[theme] Fix missing exported Breakpoints types (#26684) @robphoenix

### `@material-ui/system@5.0.0-alpha.37`

#### Breaking changes

- &#8203;<!-- 26 -->[system] Remove `theme` & `isRtl` from `useThemeProps` (#26701) @mnajdova

  The `isRtl` and `theme` props are no longer added by the `useThemeProps` hook. You can use the `useTheme` hook for this.

  ```diff
  -import { unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
  +import { unstable_useThemeProps as useThemeProps, useTheme } from '@material-ui/core/styles';

   const Component = (inProps) => {
  -  const { isRtl, theme, ...props } = useThemeProps({ props: inProps, name: 'MuiComponent' });
  +  const props = useThemeProps({ props: inProps, name: 'MuiComponent' });

  +  const theme = useTheme();
  +  const isRtl = theme.direction === 'rtl';
     //.. rest of the code
  }
  ```

#### Changes

- &#8203;<!-- 16 -->[system] Add useThemeProps & useTheme hooks (#26649) @mnajdova
- &#8203;<!-- 15 -->[system] Add color manipulators (#26668) @mnajdova
- &#8203;<!-- 06 -->[system] Fix support of custom shape in createTheme (#26673) @varandasi

### `@material-ui/unstyled@5.0.0-alpha.37`

- &#8203;<!-- 04 -->[Slider] Improve TS definition (#26642) @mnajdova
- &#8203;<!-- 21 -->[TrapFocus] Capture nodeToRestore via relatedTarget (#26696) @eps1lon

### `@material-ui/icons@5.0.0-alpha.37`

- &#8203;<!-- 03 -->Revert "[icons] Only ship ES modules (#26310)" (#26656) @eps1lon

  The changes that we have tried in #26310 were breaking the integration with Next.js.

### `@material-ui/lab@5.0.0-alpha.37`

- &#8203;<!-- 29 -->[core] Remove unused useKeyDown (#26765) @eps1lon
- &#8203;<!-- 28 -->[DateTimePicker] Fix not visible selected tab icon (#26624) @nikitabobers

### Docs

- &#8203;<!-- 20 -->[blog] Michał Dudak joins Material-UI (#26700) @oliviertassinari
- &#8203;<!-- 27 -->[docs] Migrate onepirate premium template to emotion part2 (#26707) @vicasas
- &#8203;<!-- 24 -->[docs] Fix TextField demo layout (#26710) @vicasas
- &#8203;<!-- 19 -->[docs] Improve Paperbase demo (#26711) @oliviertassinari
- &#8203;<!-- 17 -->[docs] Migrate onepirate premium template to emotion part1 (#26671) @vicasas
- &#8203;<!-- 14 -->[docs] Migrate paperbase premium template to emotion (#26658) @vicasas
- &#8203;<!-- 25 -->[List] Fix demo to have correct semantic (#26742) @siriwatknp

### Core

- &#8203;<!-- 23 -->[core] Monitore size of key system modules (#26712) @oliviertassinari
- &#8203;<!-- 22 -->[core] Batch small changes (#26738) @oliviertassinari
- &#8203;<!-- 18 -->[core] Batch small changes (#26628) @oliviertassinari
- &#8203;<!-- 13 -->[test] Ignore ReactDOM.render deprecation warning (#26683) @eps1lon
- &#8203;<!-- 12 -->[test] Run e2e test with React 18 on a schedule (#26690) @eps1lon
- &#8203;<!-- 11 -->[test] Count profiler renders not passive effects (#26678) @eps1lon
- &#8203;<!-- 02 -->[test] Bundling fixtures should not override source build with published build (#26657) @eps1lon
- &#8203;<!-- 01 -->[test] Make tests oblivious to StrictMode (#26654) @eps1lon

All contributors of this release in alphabetical order: @chadmuro, @eps1lon, @likitarai1, @mnajdova, @nikitabobers, @oliviertassinari, @robphoenix, @sakura90, @siriwatknp, @varandasi, @vicasas

## 5.0.0-alpha.36

<!-- generated comparing v5.0.0-alpha.35..next -->

_Jun 8, 2021_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- ⚒️ We've introduced a new `ListItemButton` component that should prevent common mistakes when using `<ListItem button />` and help with customization and TypeScript support (#26446) @siriwatknp.
- 👩‍🎤 `experimentalStyled` is now available without the `experimental` prefix.
  We're confident that its API shouldn't receive any major changes until the stable release of v5 (#26558) @mnajdova.
- 📦 `@material-ui/icons` only ships ES modules and no longer CommonJS modules.
  This reduces the download size of the package from 1.7 MB to 1.2 MB and install size from 15.6 MB to 6.7 MB (#26310) @eps1lon.
- 💄 Add support for [row and column spacing](https://mui.com/components/grid/#row-amp-column-spacing) in the Grid component (#26559) @likitarai1.
  <img width="549" alt="grid spacing demo" src="https://user-images.githubusercontent.com/3165635/121089288-383fa500-c7e7-11eb-8c43-53457b7430f1.png">

  Note that this feature was already available for [CSS grid users](https://mui.com/components/grid/#css-grid-layout) with the `rowGap` and `columnGap` props.

### `@material-ui/core@5.0.0-alpha.36`

#### Breaking changes

- &#8203;<!-- 10 -->[AppBar] Fix background color on dark mode (#26545) @siriwatknp

  The `color` prop has no longer any effect in dark mode. The app bar uses the background color required by the elevation to follow the [Material Design guidelines](https://material.io/design/color/dark-theme.html). Use `enableColorOnDark` to restore the behavior of v4.

  ```jsx
  <AppBar enableColorOnDark />
  ```

- &#8203;<!-- 13 -->[core] Rename `experimentalStyled` to `styled` (#26558) @mnajdova

  Remove the experimental prefix, this module is going stable:

  ```diff
  -import { experimentalStyled as styled } from '@material-ui/core/styles';
  +import { styled } from '@material-ui/core/styles';
  ```

- &#8203;<!-- 03 -->[SwitchBase] Replace IconButton with ButtonBase (#26460) @siriwatknp
- &#8203;<!-- 25 -->[theme] Improve default `primary`, `secondary` and `error` theme palette (#26555) @siriwatknp

#### Changes

- &#8203;<!-- 17 -->[Box] Fix module 'clsx' not found in system (#26553) @coder-freestyle
- &#8203;<!-- 07 -->[Box] Fix runtime error when using styled-components without ThemeProvider (#26548) @mnajdova
- &#8203;<!-- 27 -->[Radio][checkbox] Don't forward `color` to DOM elements (#26625) @siriwatknp
- &#8203;<!-- 01 -->[Dialog] Flatten DialogTitle DOM structure, remove `disableTypography` (#26323) @eps1lon
- &#8203;<!-- 31 -->[Grid] Add rowSpacing and columnSpacing props (#26559) @likitarai1
- &#8203;<!-- 34 -->[List] extract button from ListItem to ListItemButton (#26446) @siriwatknp
- &#8203;<!-- 23 -->[Popover] Fix PaperProps.ref breaking positioning (#26560) @vedadeepta
- &#8203;<!-- 19 -->[Rating] onChangeActive shouldn't be fired on blur/focus (#26584) @coder-freestyle
- &#8203;<!-- 11 -->[Select] Fix custom font size centering arrow (#26570) @sarahannnicholson
- &#8203;<!-- 06 -->[styled] Convert implicit styleProps to explicit (#26461) @mnajdova@siriwatknp
- &#8203;<!-- 08 -->[Tabs] Fix RTL indicator (#26470) @siriwatknp
- &#8203;<!-- 02 -->[Tabs] Fix arrow rotation in vertical & RTL (#26527) @siriwatknp
- &#8203;<!-- 20 -->[TextField] Fix support for custom `size` prop value (#26585) @coder-freestyle
- &#8203;<!-- 04 -->[Tooltip] Finish exiting once started (#26535) @eps1lon

### `@material-ui/icons@5.0.0-alpha.36`

#### Breaking changes

- &#8203;<!-- 15 -->[icons] Only ship ES modules (#26310) @eps1lon

  The `require()` of `@material-ui/icons` is no longer supported.
  This should not affect you if you're using a bundler like `webpack` or `snowpack` or meta frameworks like `next` or `gatsby`.

### `@material-ui/lab@5.0.0-alpha.36`

#### Breaking changes

- &#8203;<!-- 29 -->[pickers] Remove `openPickerIcon` prop in favor of `components.OpenPickerIcon` (#26223) @vedadeepta

  ```diff
  <DateTimePicker
    components={{
      LeftArrowIcon: AlarmIcon,
      RightArrowIcon: SnoozeIcon,
  +   OpenPickerIcon: ClockIcon,
    }}
  - openPickerIcon={<ClockIcon />}
  ```

### `@material-ui/system@5.0.0-alpha.36`

- &#8203;<!-- 18 -->[system] Add createTheme util (#26490) @mnajdova

### Docs

- &#8203;<!-- 28 -->[docs] Migrate templates to emotion (#26604) @vicasas
- &#8203;<!-- 26 -->[docs] Remove custom primary & secondary color (#26541) @siriwatknp
- &#8203;<!-- 24 -->[docs] Don't escape prop descriptions for markdown table context (#26579) @eps1lon
- &#8203;<!-- 22 -->[docs] Prepare for data grid auto-generated docs (#26477) @m4theushw
- &#8203;<!-- 21 -->[docs] Fix typo sx !== xs (#26596) @onpaws
- &#8203;<!-- 16 -->[docs] Multiple select demos moving when selecting values (#26539) @itsnorbertkalacska
- &#8203;<!-- 14 -->[docs] Improve migration guide for `@material-ui/styles` (#26552) @mnajdova
- &#8203;<!-- 12 -->[docs] `Rating` `value` is nullable in `onChange` (#26542) @sakura90
- &#8203;<!-- 30 -->[example] Remove the dependency on @material-ui/styles (#26567) @garfunkelvila

### Core

- &#8203;<!-- 33 -->[core] Ignore latest prettier run in git-blame @eps1lon
- &#8203;<!-- 32 -->[core] Format @eps1lon
- &#8203;<!-- 05 -->[test] Add bundle fixtures (#23166) @eps1lon
- &#8203;<!-- 09 -->[website] Add Michał to the About Us page (#26557) @michaldudak

All contributors of this release in alphabetical order: @coder-freestyle, @eps1lon, @garfunkelvila, @itsnorbertkalacska, @likitarai1, @m4theushw, @michaldudak, @mnajdova, @onpaws, @sakura90, @sarahannnicholson, @siriwatknp, @vedadeepta, @vicasas

## 5.0.0-alpha.35

<!-- generated comparing v5.0.0-alpha.34..next -->

_May 31, 2021_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 We have completed the migration to emotion of all the components (`@material-ui/core` and `@material-ui/lab`) @siriwatknp, @mnajdova.
- 📦 Save [10 kB gzipped](https://bundlephobia.com/package/@material-ui/core@5.0.0-alpha.34) by removing the dependency on `@material-ui/styles` (JSS) from the core and the lab (#26377, #26382, #26376) @mnajdova.
- ⚒️ Add many new [codemods](https://github.com/mui/material-ui/blob/HEAD/packages/mui-codemod/README.md) to automate the migration from v4 to v5 (#24867) @mbrookes.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.35`

#### Breaking changes

- [styles] Remove `makeStyles` from `@material-ui/core` (#26382) @mnajdova

  The `makeStyles` JSS utility is no longer exported from `@material-ui/core`. You can use `@material-ui/styles` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core` instead.

  ```diff
  -import { makeStyles } from '@material-ui/core/styles';
  +import { makeStyles } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const theme = createTheme();
   const useStyles = makeStyles((theme) => ({
     background: theme.palette.primary.main,
   }));
   function Component() {
     const classes = useStyles();
     return <div className={classes.root} />
   }

   // In the root of your app
   function App(props) {
  -  return <Component />;
  +  return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
   }
  ```

- [styles] Remove `withStyles` from `@material-ui/core` (#26377) @mnajdova

  The `withStyles` JSS utility is no longer exported from `@material-ui/core`. You can use `@material-ui/styles` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, you should use the `ThemeProvider` component from `@material-ui/core` instead.

  ```diff
  -import { withStyles } from '@material-ui/core/styles';
  +import { withStyles } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const defaultTheme = createTheme();
   const MyComponent = withStyles((props) => {
     const { classes, className, ...other } = props;
     return <div className={clsx(className, classes.root)} {...other} />
   })(({ theme }) => ({ root: { background: theme.palette.primary.main }}));

   function App() {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={defaultTheme}><MyComponent /></ThemeProvider>;
   }
  ```

- [styles] Merge options in `experimentalStyled` (#26396) @mnajdova

  The options inside the `experimentalStyled` module are now merged under one object. In the coming weeks, we will rename ths module: `styled()` to signal that it's no longer experimental.

  ```diff
  -experimentalStyled(Button, { shouldForwardProp: (prop) => prop !== 'something' }, { skipSx: true })(...);
  +experimentalStyled(Button, { shouldForwardProp: (prop) => prop !== 'something', skipSx: true })(...);
  ```

- [Tabs] Update `min` & `max` width and remove `minWidth` media query (#26458) @siriwatknp

  Update the implementation to better match Material Design:

  - Tab `minWidth` changed from `72px` => `90px` (without media-query) according to [material-design spec](https://material.io/components/tabs#specs)
  - Tab `maxWidth` changed from `264px` => `360px` according to [material-design spec](https://material.io/components/tabs#specs)

#### Changes

- [ButtonBase] Fix role="button" attribute (#26271) @Gautam-Arora24
- [Dialog] Fix support for custom breakpoints (#26331) @jeferson-sb
- [Select] Open popup below button (#26200) @oliviertassinari
- [TextField] Add variants support, e.g. custom sizes (#26468) @siriwatknp
- [Tooltip] Improve handling of small vs. touch screens (#26097) @oliviertassinari

### `@material-ui/codemod@5.0.0-alpha.35`

- [codemod] Add multiple codemods to migrate components from v4 to v5 (#24867) @mbrookes
- [codemod] Correct path and add target placeholder (#26414) @mbrookes

### `@material-ui/icons@5.0.0-alpha.35`

- [icons] Use array children instead of React fragments (#26309) @eps1lon

  Reduce a bit the size of the package.

### `@material-ui/system@5.0.0-alpha.35`

We are progressively moving all modules that are relevant to styling custom design systems in this package. It's meant to be complementary with `@material-ui/unstyled`.

- [system] Add Box to system (#26379) @mnajdova
- [system] Add createStyled utility (#26485) @mnajdova

### `@material-ui/styled-engine-sc@5.0.0-alpha.35`

- [styled-engine] Fix styled() util to respect `options` (#26339) @pasDamola

### `@material-ui/lab@5.0.0-alpha.35`

#### Breaking changes

- [pickers] Remove allowKeyboardControl (#26451) @eps1lon
- [ClockPicker] Rework keyboard implementation (#26400) @eps1lon

  Remove the `allowKeyboardControl` prop from ClockPicker (and TimePicker and variants). Keyboard navigation now works by default.

#### Changes

- [Button] Migrate LoadingButton to emotion (#26370) @siriwatknp
- [ClockPicker] Selected option is the active descendant (#26411) @eps1lon
- [DatePicker] Migrate CalendarPicker to emotion (#26390) @siriwatknp
- [DatePicker] Migrate CalendarPickerSkeleton to emotion (#26335) @siriwatknp
- [DateRangePicker] Migrate DateRangePickerDay to emotion (#26368) @siriwatknp
- [DateRangePicker] Migrate internal components to emotion (#26326) @siriwatknp
- [pickers] Migrate PickersCalendarHeader to emotion (#26354) @siriwatknp
- [pickers] Migrate PickersModalDialog to emotion (#26355) @siriwatknp
- [pickers] Migrate PickersPopper to emotion (#26391) @siriwatknp
- [pickers] Migrate PickersTransition to emotion (#26353) @siriwatknp
- [TimePicker] Migrate ClockPicker to emotion (#26389) @siriwatknp
- [TreeView] Correctly select items in deeply nested trees (#26413) @Dru89

### Docs

- [docs] Add page for `experimentalStyled()` (#26361) @mnajdova
- [docs] Add TypeScript convention (#26259) @siriwatknp
- [docs] Add warning about git-blame-ignore-revs (#26487) @eps1lon
- [docs] Clarify migration from Hidden (#26348) @m4theushw
- [docs] Fix grammar for style library page (#26325) @mbrookes
- [docs] Persist copied state indefinitely or until the user moves their cursor (#26336) @eps1lon
- [docs] Typo in MultipleSelect (#26466) @wolfykey
- [docs] Update system installation for v5 (#26481) @mnajdova
- [template] Demo how to retreive form value (#26393) @akshitsuri

### Core

- [core] Batch small changes (#26434) @oliviertassinari
- [core] Fix peer dependencies declaration with yarn v2 (#26433) @oliviertassinari
- [core] Remove `@material-ui/styles` dependencies from declaration files too (#26376) @mnajdova
- [core] Revert Leverage CircleCI workspaces for jobs after checkout (#26444) @eps1lon
- [test] Don't hoist constant elements (#26448) @eps1lon
- [test] Fix prop-type warning (#26432) @oliviertassinari
- [test] Flush scheduled effects before user event returns (#26447) @eps1lon
- [test] Move ClockPicker tests to ClockPicker.test (#26407) @eps1lon
- [test] setProps from createPickerRender should set props on the rendered element (#26405) @eps1lon
- [utils] Convert useId to TypeScript (#26491) @eps1lon
- [website] Add Material-UI X page (#25794) @DanailH
- [website] Add open application section (#26501) @oliviertassinari
- [website] Add Siriwat to team page (#26406) @siriwatknp

All contributors of this release in alphabetical order: @akshitsuri, @DanailH, @Dru89, @eps1lon, @Gautam-Arora24, @jeferson-sb, @m4theushw, @mbrookes, @mnajdova, @oliviertassinari, @pasDamola, @siriwatknp, @wolfykey

## 5.0.0-alpha.34

_May 18, 2021_

<!-- generated comparing v5.0.0-alpha.33..next -->

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- 💥 Make progress with the breaking changes. We have done 89 of the 109 changes [planned](https://github.com/mui/material-ui/issues/20012). We will release 5.0.0-beta.0 on July 1st and start to promote its usage over v4. You can also follow [our milestone](https://github.com/mui/material-ui/milestone/35) for more details.
- 🚀 Make progress with components migration to emotion. We have done 153 of the 168 components (almost there!)
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.34`

#### Breaking change

- &#8203;<!-- 47 -->[Select][nativeselect] Polish CSS classes (#26186) @m4theushw

  **Select, NativeSelect**

  Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<NativeSelect classes={{ select: 'class1 class2 class3' }} />
  ```

  **TablePagination**

  Move the custom class on `input` to `select`. The `input` key is being applied on another element.

  ```diff
  <TablePagination
  - classes={{ input: 'foo' }}
  + classes={{ select: 'foo' }}
  />
  ```

- &#8203;<!-- 45 -->[core] Move `StyledEngineProvider` to `@material-ui/core/styles` (#26265) @mnajdova

  Change location of `StyledEngineProvider` import.

  ```diff
  -import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
  +import { StyledEngineProvider } from '@material-ui/core/styles';
  ```

- &#8203;<!-- 39 -->[Autocomplete] Apply .Mui-focused instead of data-focus on the focused option (#26181) @m4theushw

  The `data-focus` attribute is not set on the focused option anymore, instead, global class names are used.

  ```diff
  -'.MuiAutocomplete-option[data-focus="true"]': {
  +'.MuiAutocomplete-option.Mui-focused': {
  ```

- &#8203;<!-- 31 -->[Radio] Make color primary default (#26180) @vicasas
- &#8203;<!-- 03 -->[Switch] Make color primary default (#26182) @vicasas
- &#8203;<!-- 10 -->[pickers] Drop ResponsiveWrapper usage (#26123) @eps1lon

  When a responsive picker changes from mobile to desktop, it will now clear its entire state. To keep the original behavior you can implement a controlled picker:

  ```js
  function ResponsiveDateTimePicker(props) {
    const [open, setOpen] = React.useState(false);

    return (
      <DateTimePicker
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        {...props}
      />
    );
  }
  ```

- &#8203;<!-- 63 -->[Autocomplete] Rename getOptionSelected to isOptionEqualToValue (#26173) @m4theushw

  ```diff
  <Autocomplete
  -  getOptionSelected={(option, value) => option.title === value.title}
  +  isOptionEqualToValue={(option, value) => option.title === value.title}
  />
  ```

> Follow [this link](https://mui.com/guides/migration-v4/#main-content) for full migration from v4 => v5

#### Changes

- &#8203;<!-- 61 -->[TextField] Fix hiddenLabel type of FilledInput (#26290) @siriwatknp
- &#8203;<!-- 54 -->[TextField] Fix classes forward to InputBase (#26231) @arpitBhalla
- &#8203;<!-- 17 -->[Autocomplete] Fix missing 'createOption' in AutocompleteCloseReason type (#26197) @Gautam-Arora24
- &#8203;<!-- 30 -->[Autocomplete] Reduce CSS specificity by 1 (#26238) @Gautam-Arora24
- &#8203;<!-- 07 -->[ButtonBase] Omit aria-disabled if not disabled (#26189) @Gautam-Arora24
- &#8203;<!-- 18 -->[colors] Fix A inconsistencies (#26196) @oliviertassinari
- &#8203;<!-- 08 -->[examples] Fix dynamic global styles & global styles leak in the ssr examples (#26177) @mnajdova
- &#8203;<!-- 57 -->[Slider] Fix support for non primary colors (#26285) @davidfdriscoll
- &#8203;<!-- 56 -->[Slider] Center value label for disabled slider (#26257) @davidfdriscoll
- &#8203;<!-- 19 -->[styled-engine] Fix styled-components not supporting empty style (#26098) @ruppysuppy
- &#8203;<!-- 21 -->[styles] Fix overrides type issues (#26228) @mnajdova
- &#8203;<!-- 64 -->[Container] Fix support for custom breakpoints (#26328) @alanszp

### `@material-ui/lab@5.0.0-alpha.34`

- &#8203;<!-- 68 -->[pickers] Migrate TimePickerToolbar to emotion (#26274) @siriwatknp
- &#8203;<!-- 67 -->[pickers] Migrate DatePickerToolbar to emotion (#26292) @siriwatknp
- &#8203;<!-- 66 -->[DateTimePicker] Migrate DateTimePickerTabs and Toolbar to emotion (#26327) @siriwatknp
- &#8203;<!-- 33 -->[DatePicker] Migrate PickersYear to emotion (#25949) @siriwatknp
- &#8203;<!-- 35 -->[DateRangePicker] Migrate PickersToolbarText to emotion (#25983) @siriwatknp
- &#8203;<!-- 46 -->[pickers] Migrate StaticWrapper to emotion (#26275) @siriwatknp
- &#8203;<!-- 58 -->[pickers] Migrate Clock to emotion (#26278) @siriwatknp
- &#8203;<!-- 43 -->[pickers] Migrate PickersToolbar to emotion (#26273) @siriwatknp
- &#8203;<!-- 42 -->[pickers] Migrate ClockNumber to emotion (#26058) @siriwatknp
- &#8203;<!-- 41 -->[pickers] Migrate ClockPointer to emotion (#26057) @siriwatknp
- &#8203;<!-- 32 -->[pickers] Migrate PickersMonth to emotion (#26021) @siriwatknp
- &#8203;<!-- 26 -->[pickers] Migrate MonthPicker to emotion (#26025) @siriwatknp
- &#8203;<!-- 25 -->[pickers] Migrate PickersDay to emotion (#25995) @siriwatknp
- &#8203;<!-- 06 -->[pickers] Migrate PickersToolbarButton to emotion (#25989) @siriwatknp

### `@material-ui/icons@5.0.0-alpha.34`

- &#8203;<!-- 52 -->[icons] Remove extraneous React.Fragment (#26308) @eps1lon
- &#8203;<!-- 50 -->[icons] Synchronize icons (#26302) @eps1lon

  New DriveFileMove icon and its variants

### Docs

- &#8203;<!-- 16 -->[NProgressBar] Fix invalid ARIA and HTML (#26234) @eps1lon
- &#8203;<!-- 65 -->[docs] Simplify demos slider (#26324) @oliviertassinari
- &#8203;<!-- 48 -->[docs] Use transpiled icons directly (#26268) @eps1lon
- &#8203;<!-- 44 -->[docs] Remove dependency on withStyles from @material-ui/core/styles (#26269) @mnajdova
- &#8203;<!-- 40 -->[docs] Add Jalali date picker demo (#26243) @smmoosavi
- &#8203;<!-- 37 -->[docs] Remove last dependencies on `makeStyles` from `@material-ui/core/styles` (#26246) @mnajdova
- &#8203;<!-- 29 -->[docs] Polish the pickers demo (#26094) @oliviertassinari
- &#8203;<!-- 28 -->[docs] Fix broken overrides link on API pages (#26244) @mnajdova
- &#8203;<!-- 27 -->[docs] Improve documentation for Buttons (#26184) @arpitBhalla
- &#8203;<!-- 24 -->[docs] Emphasize on props for screen readers (#26222) @atisheyJain03
- &#8203;<!-- 23 -->[docs] Link third-party routing in Bottom Navigation (#26190) @arpitBhalla
- &#8203;<!-- 22 -->[docs] Migrate Select, Progress demos to emotion (#26178) @mnajdova
- &#8203;<!-- 20 -->[docs] Add accessibility section to Badges (#26009) @likitarai1
- &#8203;<!-- 15 -->[docs] Migrate Popper, Drawer demos to emotion (#26183) @mnajdova
- &#8203;<!-- 12 -->[docs] Use public next/router events API (#26233) @eps1lon
- &#8203;<!-- 11 -->[docs] Remove remnants Hidden component (#26191) @vicasas
- &#8203;<!-- 09 -->[docs] Ensure TreeView demos don't overflow demo container (#26161) @eps1lon
- &#8203;<!-- 05 -->[docs] Fix a typo in the import statement of LocalizationProvider (#26226) @huyenltnguyen
- &#8203;<!-- 04 -->[docs] Improve react-admin coverage in the showcase (#26169) @fzaninotto
- &#8203;<!-- 02 -->[docs] Fix Workbox that are causing infinite loading of site (#26193) @arpitBhalla

### Core

- &#8203;<!-- 60 -->[core] Skip sx prop in internal components (#26235) @mnajdova
- &#8203;<!-- 59 -->[core] Remove `withStyles` dependencies from `@material-ui/core/styles` (#26277) @mnajdova
- &#8203;<!-- 55 -->[core] Include human readable target in the BrowserStack build (#26322) @eps1lon
- &#8203;<!-- 53 -->[core] Fix NotchedOutlineProps type (#26305) @gnowland
- &#8203;<!-- 51 -->[core] Add file for git-blame --ignore-revs-file (#26295) @eps1lon
- &#8203;<!-- 49 -->[core] Ensure component class keys aren't missing (#25754) @eps1lon
- &#8203;<!-- 38 -->[core] Drop support for blocking mode (#26262) @eps1lon
- &#8203;<!-- 36 -->[core] Don't download monorepo packages (#26261) @eps1lon
- &#8203;<!-- 14 -->[core] Batch small changes (#26199) @oliviertassinari
- &#8203;<!-- 13 -->[core] Extract classes descriptions from TypeScript (#25933) @eps1lon
- &#8203;<!-- 34 -->[styled-engine] Fix test script (#26258) @ruppysuppy

All contributors of this release in alphabetical order: @arpitBhalla, @atisheyJain03, @davidfdriscoll, @eps1lon, @fzaninotto, @Gautam-Arora24, @gnowland, @huyenltnguyen, @likitarai1, @m4theushw, @mnajdova, @oliviertassinari, @ruppysuppy, @siriwatknp, @smmoosavi, @vicas

## 5.0.0-alpha.33

_May 9, 2021_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 💥 Make progress with the breaking changes. We have done 81 of the 109 changes [planned](https://github.com/mui/material-ui/issues/20012). We will release 5.0.0-beta.0 on July 1st and start to promote its usage over v4. You can also follow [our milestone](https://github.com/mui/material-ui/milestone/35) for more details.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.33`

#### Breaking changes

- &#8203;<!-- 09 -->[core] Remove deprecated innerRef prop (#26028) @m4theushw

  **withStyles**

  Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component.

  ```diff
  import * as React from 'react';
  import { withStyles } from '@material-ui/core/styles';
  const MyComponent = withStyles({
    root: {
      backgroundColor: 'red',
    },
  })(({ classes }) => <div className={classes.root} />);
  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```

  **withTheme**

  Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component.

  ```diff
  import * as React from 'react';
  import { withTheme  } from '@material-ui/core/styles';
  const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);
  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```

- &#8203;<!-- 10 -->[theme] Rename `createMuiTheme` to `createTheme` (#25992) @m4theushw

  Developers only need one theme in their application. A prefix would suggest a second theme is needed. It's not the case. `createMuiTheme` will be removed in v6.

  ```diff
  -import { createMuiTheme } from '@material-ui/core/styles';
  +import { createTheme } from '@material-ui/core/styles';

  -const theme = createMuiTheme({
  +const theme = createTheme({
  ```

- &#8203;<!-- 74 -->[theme] Remove MuiThemeProvider alias (#26171) @m4theushw

  The `MuiThemeProvider` is no longer exported. Use `ThemeProvider` instead. It was removed from the documentation during v4-beta, 2 years ago.

  ```diff
  -import { MuiThemeProvider } from '@material-ui/core/styles';
  +import { ThemeProvider } from '@material-ui/core/styles';
  ```

- &#8203;<!-- 20 -->[Box] Remove the `clone` prop (#26031) @m4theushw

  Its behavior can be obtained using the `sx` prop.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }} clone>
  -  <Button>Save</Button>
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

- &#8203;<!-- 51 -->[Box] Remove render prop (#26113) @m4theushw

  Its behavior can be obtained using the `sx` prop directly on the child if it's a Material-UI component. For non-Material-UI components use the `sx` prop in conjunction with the `component` prop:

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <Button {...props}>Save</Button>}
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <button {...props}>Save</button>}
  -</Box>
  +<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
  ```

- &#8203;<!-- 25 -->[Checkbox] Make color="primary" default (#26002) @vicasas

  This better matches the Material Design guidelines.

  ```diff
  -<Checkbox />
  +<Checkbox color="secondary />
  ```

- &#8203;<!-- 30 -->[Select] Remove `labelWidth` prop (#26026) @m4theushw

  The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined. The TextField already handles it by default.

  ```diff
  -<Select variant="outlined" labelWidth={20} />
  +<Select label="Gender" />
  ```

- &#8203;<!-- 50 -->[core] Remove `styled` JSS utility from `@material-ui/core/styles` (#26101) @mnajdova

  The `styled` **JSS** utility is no longer exported from `@material-ui/core/styles`. You can use `@material-ui/styles/styled` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` component from `@material-ui/core/styles` instead.

  ```diff
  -import { styled } from '@material-ui/core/styles';
  +import { styled } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const theme = createTheme();
   const MyComponent = styled('div')(({ theme }) => ({ background: theme.palette.primary.main }));

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
  ```

  For new components, you can instead use the `experimentalStyled()` helper powered by emotion/sc.

  ```jsx
  import { experimentalStyled as styled } from '@material-ui/core/styles';
  ```

- &#8203;<!-- 63 -->[Hidden] Remove component (#26135) @m4theushw

  Removed in favor of using the `sx` prop or the `useMediaQuery` hook.

  Use the `sx` prop to replace `implementation="css"`:

  ```diff
  -<Hidden implementation="css" xlUp><Paper /></Hidden>
  -<Hidden implementation="css" xlUp><button /></Hidden>
  +<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
  +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} />
  ```

  ```diff
  -<Hidden implementation="css" mdDown><Paper /></Hidden>
  -<Hidden implementation="css" mdDown><button /></Hidden>
  +<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
  +<Box component="button" sx={{ display: { xs: 'none', md: 'block' } }} />
  ```

  Use the `useMediaQuery` hook to replace `implementation="js"`:

  ```diff
  -<Hidden implementation="js" xlUp><Paper /></Hidden>
  +const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
  +return hidden ? null : <Paper />;
  ```

- &#8203;<!-- 64 -->[withWidth] Remove API (#26136) @m4theushw

  Removed in favor of the `useMediaQuery` hook. You can reproduce the same functionality creating a custom hook as described [here](https://mui.com/components/use-media-query/#migrating-from-withwidth).

- &#8203;<!-- 75 -->[Autocomplete] Rename values of the reason argument (#26172) @m4theushw

  Rename the values of the reason argument in `onChange` and `onClose` for consistency:

  1. `create-option` to `createOption`
  2. `select-option` to `selectOption`
  3. `remove-option` to `removeOption`

- &#8203;<!-- 28 -->[core] Remove `withTheme` from `@material-ui/core` (#26051) @mnajdova

  The `withTheme` utility has been removed from the `@material-ui/core/styles` package. You can use the `@material-ui/styles/withTheme` instead. Make sure to add a `ThemeProvider` at the root of your application, as the `defaultTheme` is no longer available. If you are using this utility together with `@material-ui/core`, it's recommended you use the `ThemeProvider` from `@material-ui/core/styles` instead.

  ```diff
   import * as React from 'react';
  -import { withTheme } from '@material-ui/core/styles';
  +import { withTheme } from '@material-ui/styles';
  +import { createTheme, ThemeProvider } from '@material-ui/core/styles';

  +const theme = createTheme();
   const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
  ```

- &#8203;<!-- 15 -->[core] Remove `createStyles` from `@material-ui/core` (#26018) @mnajdova

  - The `createGenerateClassName` module is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  ```diff
  -import { createGenerateClassName } from '@material-ui/core/styles';
  +import { createGenerateClassName } from '@material-ui/styles';
  ```

  - The `jssPreset` object is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  ```diff
  -import { jssPreset } from '@material-ui/core/styles';
  +import { jssPreset } from '@material-ui/styles';
  ```

  - The `ServerStyleSheets` component is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  ```diff
  -import { ServerStyleSheets } from '@material-ui/core/styles';
  +import { ServerStyleSheets } from '@material-ui/styles';
  ```

- The `StylesProvider` component is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  ```diff
  -import { StylesProvider } from '@material-ui/core/styles';
  +import { StylesProvider } from '@material-ui/styles';
  ```

- The `useThemeVariants` hook is no longer exported from `@material-ui/core/styles`. You should import it directly from `@material-ui/styles`.

  ```diff
  -import { useThemeVariants } from '@material-ui/core/styles';
  +import { useThemeVariants } from '@material-ui/styles';
  ```

- [FormControlLabel] The `label` prop is now required.

#### Changes

- &#8203;<!-- 47 -->[Dialog] Improve support for custom breakpoints (#26092) @oliviertassinari
- &#8203;<!-- 32 -->[IconButton] Fix default color prop (#26064) @Jack-Works
- &#8203;<!-- 27 -->[Radio] Migrate RadioButtonIcon to emotion (#26068) @mnajdova
- &#8203;<!-- 33 -->[SwipeableDrawer] Migrate SwipeArea to emotion (#26059) @mnajdova
- &#8203;<!-- 72 -->[Table] Synchronize horizontal sticky header position with body (#26159) @LiKang6688
- &#8203;<!-- 69 -->[Tabs] Fix support for null children in TabList (#26170) @hubertokf
- &#8203;<!-- 31 -->[Tabs] Fix keyboard traversal over disabled tabs (#26061) @anish-khanna
- &#8203;<!-- 55 -->[TextField] Fix missing `standard` variant classes in types (#26115) @siriwatknp
- &#8203;<!-- 54 -->[TextField] Allow to customize Typography in FormControlLabel (#25883) @mousemke
- &#8203;<!-- 17 -->[theme] Fix transition duration default value customization (#26054) @anshuman9999

### `@material-ui/lab@5.0.0-alpha.33`

#### Breaking changes

- &#8203;<!-- 08 -->[Timeline] Add support for position override on items (#25974) @simonecervini

  Rename the `align` prop to `position` to reduce confusion.

  ```diff
  -<Timeline align="alternate">
  +<Timeline position="alternate">
  ```

  ```diff
  -<Timeline align="left">
  +<Timeline position="right">
  ```

  ```diff
  -<Timeline align="right">
  +<Timeline position="left">
  ```

- &#8203;<!-- 56 -->[pickers] Remove customization of deep components (#26118) @eps1lon

#### Changes

- &#8203;<!-- 02 -->[DatePicker] Migrate YearPicker to emotion (#25928) @siriwatknp
- &#8203;<!-- 14 -->[DateRangePicker] Fix not being opened on click (#26016) @eps1lon
- &#8203;<!-- 48 -->[pickers] Fix ref types (#26121) @eps1lon
- &#8203;<!-- 43 -->[pickers] Rely on native behavior for disabled/readOnly behavior (#26055) @eps1lon
- &#8203;<!-- 29 -->[pickers] Remove unused components from mobile and desktop variants (#26066) @eps1lon
- &#8203;<!-- 23 -->[pickers] Document readonly/disabled pickers (#26056) @eps1lon
- &#8203;<!-- 19 -->[pickers] Remove unused components from static variants (#26052) @eps1lon
- &#8203;<!-- 13 -->[pickers] Toggle mobile keyboard view in the same commit as the view changes (#26017) @eps1lon
- &#8203;<!-- 11 -->[pickers] Remove redundant aria-hidden (#26014) @eps1lon
- &#8203;<!-- 04 -->[pickers] Ensure input value is reset in the same commit as the value (#25972) @eps1lon
- &#8203;<!-- 49 -->[internal][pickers] Pass desktop wrapper props explicitly (#26120) @eps1lon
- &#8203;<!-- 44 -->[internal][pickers] Move useInterceptProps into module (#26090) @eps1lon
- &#8203;<!-- 37 -->[internal][pickers] Explicit default toolbar components (#26075) @eps1lon
- &#8203;<!-- 35 -->[internal][pickers] Move validation from config to module (#26074) @eps1lon
- &#8203;<!-- 21 -->[internal][pickers] Minimal types for defaultizing in useInterceptProps (#26063) @eps1lon
- &#8203;<!-- 18 -->[internal][pickers] Don't validate inputFormat in production (#26053) @eps1lon
- &#8203;<!-- 12 -->[internal][pickers] Remove unused styles (#26023) @eps1lon
- &#8203;<!-- 03 -->[internal][pickers] Remove `AllSharedPickerProps` and `AllSharedDateRangePickerProps` (#26005) @eps1lon

### Docs

- &#8203;<!-- 77 -->[docs] Migrate Tabs, Table, Snackbar demos to emotion (#26175) @mnajdova
- &#8203;<!-- 73 -->[docs] Fix dynamic global styles (#25690) @mnajdova
- &#8203;<!-- 71 -->[docs] Fixed React.forwardRef missing display name ESLint error (#26160) @arpitBhalla
- &#8203;<!-- 70 -->[docs] Migrate Tooltip, Steppers demos to emotion (#26165) @mnajdova
- &#8203;<!-- 68 -->[docs] Migrate Dialog demos to emotion (#26162) @vicasas
- &#8203;<!-- 67 -->[docs] Remove `makeStyles` from landing pages (#26130) @mnajdova
- &#8203;<!-- 65 -->[docs] Add new customized switch examples (#26096) @DanielBretzigheimer
- &#8203;<!-- 62 -->[docs] Migrate Autocomplete demos (#26127) @mnajdova
- &#8203;<!-- 61 -->[docs] Remove `@material-ui/core/styles` from the styles pages (#26126) @mnajdova
- &#8203;<!-- 60 -->[docs] Update templates, premium-themes to use `makeStyles` from `@material-ui/styles` (#26131) @mnajdova
- &#8203;<!-- 59 -->[docs] Migrate TreeView demos (#26146) @mnajdova
- &#8203;<!-- 57 -->[docs] More explicit breakpoint documentation in `sx` (#26140) @eps1lon
- &#8203;<!-- 53 -->[docs] Explicitly describe how the media query affects the rendered version (#26129) @eps1lon
- &#8203;<!-- 45 -->[docs] Fix 301 link to store (#26095) @oliviertassinari
- &#8203;<!-- 42 -->[docs] Normalize name use for state in pickers demo (#26093) @oliviertassinari
- &#8203;<!-- 41 -->[docs] Consistent type name in docs (#26077) @jamesaucode
- &#8203;<!-- 38 -->[docs] Remove `makeStyles` dependency from core in modules (#26071) @mnajdova
- &#8203;<!-- 34 -->[docs] Add links for demo in different deploys (#26065) @eps1lon
- &#8203;<!-- 26 -->[docs] Add section for useFormControl (#25927) @t49tran
- &#8203;<!-- 24 -->[docs] Add Styled Engine page (#25911) @mnajdova
- &#8203;<!-- 16 -->[docs] Migrate Timeline demos to emotion (#26036) @vicasas
- &#8203;<!-- 07 -->[docs] Document all the colors available (#26015) @anshuman9999
- &#8203;<!-- 01 -->[docs] Avoid extracting classes twice (#25973) @oliviertassinari

### Core

- &#8203;<!-- 52 -->[test] Add test for behavior when picker variant changes (#26128) @eps1lon
- &#8203;<!-- 36 -->[test] testing-library patterns for playwright tests (#25860) @eps1lon
- &#8203;<!-- 22 -->[test] Remove scheduler/tracing (#26062) @eps1lon
- &#8203;<!-- 05 -->[test] Remove duplicate property (#26011) @eps1lon
- &#8203;<!-- 76 -->[core] Link to experimental size-comparison page (#26179) @eps1lon
- &#8203;<!-- 66 -->[core] Update typings for theme's components (#26125) @mnajdova
- &#8203;<!-- 58 -->[core] Improve `react@experimental` compat (#26116) @eps1lon
- &#8203;<!-- 46 -->[core] Remove more dependencies on `@material-ui/styles` (#26100) @mnajdova
- &#8203;<!-- 40 -->[core] Batch small changes (#26083) @oliviertassinari
- &#8203;<!-- 39 -->[core] ComponentType -> JSXElementConstructor (#26081) @eps1lon
- &#8203;<!-- 06 -->[core] Create new @material-ui/private-theming package (#25986) @mnajdova

All contributors of this release in alphabetical order: @anish-khanna, @anshuman9999, @arpitBhalla, @DanielBretzigheimer, @eps1lon, @hubertokf, @Jack-Works, @jamesaucode, @LiKang6688, @m4theushw, @mnajdova, @mousemke, @oliviertassinari, @simonecervini, @siriwatknp, @t49tran, @vicasas

## 5.0.0-alpha.32

<!-- generated comparing v5.0.0-alpha.31..next -->

_Apr 27, 2021_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 We have completed the migration to emotion of all components in `@material-ui/core`. We will focus on the components in `@material-ui/lab` next.
- 💥 Make progress with the breaking changes plan. We have done 38 out of 41 breaking changes that can be deprecated. We have done 21 out of the 39 that can't have deprecations. Once done, we will focus on updating the component for better following material design, and to improve the aesthetic.
- 💄 Support extending the theme for custom color and size values in all components.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.32`

#### Breaking changes

- &#8203;<!-- 46 --> [Table] Rename padding="default" to padding="normal" (#25924) @m4theushw

  ```diff
  -<Table padding="default" />
  -<TableCell padding="default" />
  +<Table padding="normal" />
  +<TableCell padding="normal" />
  ```

- &#8203;<!-- 29 -->[Button] Rename `pending` prop to `loading` in LoadingButton (#25874) @m4theushw

  ```diff
  -<LoadingButton pending pendingIndicator="Pending..." pendingPosition="end" />
  +<LoadingButton loading loadingIndicator="Pending..." loadingPosition="end" />
  ```

- &#8203;<!-- 25 -->[ButtonBase] Remove buttonRef prop (#25896) @m4theushw

  ```diff
  -<ButtonBase buttonRef={ref} />
  +<ButtonBase ref={ref} />
  ```

  ```diff
  -<Button buttonRef={ref} />
  +<Button ref={ref} />
  ```

- &#8203;<!-- 41 -->[Checkbox][switch] Remove checked argument from onChange (#25871) @m4theushw

  ```diff
  function MyCheckbox() {
  - const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  + const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +   const checked = event.target.checked;
    };
    return <Checkbox onChange={handleChange} />;
  }
  ```

  ```diff
  function MySwitch() {
  - const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  + const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +   const checked = event.target.checked;
    };
    return <Switch onChange={handleChange} />;
  }
  ```

- &#8203;<!-- 42 -->[theme] Remove theme.breakpoints.width helper (#25918) @m4theushw

  ```diff
  -theme.breakpoints.width('md')
  +theme.breakpoints.values.md
  ```

- &#8203;<!-- 32 -->[theme] Remove theme.typography.round helper (#25914) @m4theushw

  The `theme.typography.round` helper was removed because it was no longer used. If you need it, use the function below:

  ```js
  function round(value) {
    return Math.round(value * 1e5) / 1e5;
  }
  ```

#### Changes

- &#8203;<!-- 03 -->[Container] Fix maxWidth="false" resulting in incorrect css (#25869) @mnajdova
- &#8203;<!-- 49 -->[core] Improve support for extended props in theme (#25934) @vicasas
- &#8203;<!-- 45 -->[core] Fix various too wide `classes` types (AppBar, Card, Link, LoadingButton, MenuItem) (#25917) @eps1lon
- &#8203;<!-- 05 -->[Drawer] Fix classes forwarded to DOM node for docked drawer (#25870) @mnajdova
- &#8203;<!-- 21 -->[IconButton] Support custom colors and sizes (#25890) @Vikram710
- &#8203;<!-- 16 -->[l10n] Add Bengali (bnBD) locale (#25841) @Knoxo
- &#8203;<!-- 34 -->[Rating] Support custom sizes (#25922) @vicasas
- &#8203;<!-- 30 -->[Select] Fix classes leaking on the DOM (#25894) @siriwatknp
- &#8203;<!-- 43 -->[Stack] Fix support of spacing falsy values (#25937) @simonecervini
- &#8203;<!-- 22 -->[Table] Migrate TablePagination to emotion (#25809) @siriwatknp
- &#8203;<!-- 26 -->[Tabs] Migrate Tabs to emotion (#25824) @siriwatknp
- &#8203;<!-- 50 -->[TextField] Remove utlity class name for margin="none" (#25969) @oliviertassinari
- &#8203;<!-- 24 -->[TextField] Make the `position` prop required in InputAdornment (#25891) @m4theushw
- &#8203;<!-- 23 -->[theme] Remove fade color helper (#25895) @m4theushw

### `@material-ui/lab@5.0.0-alpha.32`

- &#8203;<!-- 53 -->[DateTimePicker] `date` is nullable in `onChange` (#25981) @eps1lon
- &#8203;<!-- 39 -->[internal][pickers] Remove unused TView type argument (#25936) @eps1lon
- &#8203;<!-- 48 -->[internal][pickers] Inline some BasePickerProps usages (#25971) @eps1lon
- &#8203;<!-- 44 -->[internal][pickers] Entangle what *Props vs All*Props means (#25938) @eps1lon
- &#8203;<!-- 19 -->[lab] Update slot components to use overridesResolver (#25906) @mnajdova
- &#8203;<!-- 40 -->[Timeline] Remove use of nth-child in favor of nth-of-type (#25915) @wellwellmissesanderson
- &#8203;<!-- 06 -->[Timeline] Migrate Timeline to emotion (#25838) @siriwatknp
- &#8203;<!-- 55 -->[TreeView] Migrate TreeItem to emotion (#25835) @siriwatknp

### `@material-ui/styled-engine@5.0.0-alpha.32`

- &#8203;<!-- 02 -->[styled-engine] Skip variants resolver for non root slots by default (#25865) @mnajdova

### `@material-ui/system@5.0.0-alpha.32`

- &#8203;<!-- 12 -->[system] Add missing `main` entry for styleFunctionSx (#25885) @eps1lon

### `@material-ui/types@6.0.0`

This package is just re-released since version 5.1.7 had a breaking change.

### Docs

- &#8203;<!-- 28 -->[Autocomplete] Fix tagSize class typo (#25908) @JanMisker
- &#8203;<!-- 51 -->[DataGrid] Update docs sections (#25980) @dtassone
- &#8203;<!-- 38 -->[docs] Batch small fixes (#25807) @m4theushw
- &#8203;<!-- 13 -->[docs] Explicitly list demos of unstyled components (#25900) @eps1lon
- &#8203;<!-- 04 -->[docs] Expose heading links in a11y tree (#25861) @eps1lon
- &#8203;<!-- 58 -->[docs] Fix minor typo (#26001) @onpaws
- &#8203;<!-- 09 -->[docs] Fix global styles leaking on different pages (#25855) @mnajdova
- &#8203;<!-- 31 -->[docs] Fix Typography api docs for `paragraph` prop (#25929) @DanailH
- &#8203;<!-- 17 -->[docs] Fix Slider's classes wrong description (#25907) @mnajdova
- &#8203;<!-- 37 -->[docs] Grammar correction in autocomplete API (#25910) @gruber76
- &#8203;<!-- 15 -->[docs] Require documentation of demos (#25811) @eps1lon
- &#8203;<!-- 36 -->[docs] Update minimum required TypeScript version (#25930) @eps1lon
- &#8203;<!-- 56 -->[Table] Improve description of TablePagination.rowsPerPageOptions (#25982) @kevinlul

### Core

- &#8203;<!-- 54 -->[core] Fix wrong imports to '@material-ui/styles' (#25984) @mnajdova
- &#8203;<!-- 52 -->[core] Ensure props spreading works as expected (#25939) @oliviertassinari
- &#8203;<!-- 47 -->[core] Batch small changes (#25968) @oliviertassinari
- &#8203;<!-- 35 -->[core] Enable trailing comma in TypeScript files (#25931) @eps1lon
- &#8203;<!-- 33 -->[core] Remove @typescript-to-proptypes-generate handlers (#25909) @eps1lon
- &#8203;<!-- 18 -->[core] Update slots components to enable flatten specificity for overrides (#25853, #25864, #25881, #25884, #25887, #25904, #25892) @mnajdova
- &#8203;<!-- 27 -->[test] Add current behavior of inverleaving elements on mousedown (#25903) @eps1lon
- &#8203;<!-- 20 -->[test] Add test validator to improve DX (#25854) @siriwatknp
- &#8203;<!-- 57 -->[test] Fix duplicate key in TreeItem test (#26000) @mnajdova

All contributors of this release in alphabetical order: @DanailH, @dtassone, @eps1lon, @gruber76, @JanMisker, @kevinlul, @Knoxo, @m4theushw, @mnajdova, @oliviertassinari, @simonecervini, @siriwatknp, @vicasas, @Vikram710, @wellwellmissesanderson

## 5.0.0-alpha.31

<!-- generated comparing v5.0.0-alpha.30..next -->

_Apr 20, 2021_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Migrate 4 components to emotion.
- 💥 Resume work on the breaking changes, aim for v5.0.0-beta.0 in the next coming months.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.31`

#### Breaking changes

- [FormControl] Change default variant from standard to outlined (#24895) @petyosi
  Standard has been removed from the Material Design guidelines. [This codemod](https://github.com/mui/material-ui/tree/next/packages/mui-codemod#variant-prop) will automatically update your code.

  ```diff
  -<FormControl value="Standard" />
  -<FormControl value="Outlined" variant="outlined" />
  +<FormControl value="Standard" variant="standard" />
  +<FormControl value="Outlined" />
  ```

- [Menu] The `selectedMenu` variant will not vertically align the selected item with the anchor anymore. (#25691) @m4theushw
- [Popover] Remove the `getContentAnchorEl` prop to simplify the positioning logic. (#25691) @m4theushw
- [Select] Change default variant from standard to outlined (#24895) @petyosi
  Standard has been removed from the Material Design guidelines. [This codemod](https://github.com/mui/material-ui/tree/next/packages/mui-codemod#variant-prop) will automatically update your code.

  ```diff
  -<Select value="Standard" />
  -<Select value="Outlined" variant="outlined" />
  +<Select value="Standard" variant="standard" />
  +<Select value="Outlined" />
  ```

#### Changes

- &#8203;<!-- 17 -->[Alert] Fix action to be aligned with the text (#25768) @mnajdova
- &#8203;<!-- 30 -->[Avatar] Fix onload event not firing when img cached (#25793) @npandrei
- &#8203;<!-- 35 -->[Box] Add utility mui class (#25802) @mnajdova
- &#8203;<!-- 24 -->[core] Don't call noop event.persist() (#25782) @eps1lon
- &#8203;<!-- 52 -->[Dialog] Fix support of custom breakpoint units (#25788) @Vikram710
- &#8203;<!-- 26 -->[List] Fix support for list item container style overrides (#25777) @mnajdova
- &#8203;<!-- 21 -->[Rating] Allow clearing ratings with arrow keys (#25645) @Vikram710
- &#8203;<!-- 05 -->[Rating] Fix focus visible regression (#25698) @oliviertassinari
- &#8203;<!-- 46 -->[Select] Fix specificity of style overrides (#25766) @robphoenix
- &#8203;<!-- 39 -->[Select] Fix className overwritten (#25815) @siriwatknp
- &#8203;<!-- 33 -->[Select] Fix overrides for slots (#25796) @mnajdova
- &#8203;<!-- 19 -->[Snackbar] Fix hidden overlay blocking interactions regression (#25739) @MieleVL
- &#8203;<!-- 13 -->[TextField] Fix InputAdornment classes (#25749) @mnajdova
- &#8203;<!-- 07 -->[theme] Avoid mutating args in createSpacing (#25745) @eps1lon

### `@material-ui/lab@5.0.0-alpha.31`

#### Breaking changes

- &#8203;<!-- 37 -->[Pickers] Rename DayPicker to CalendarPicker (#25810) @eps1lon

  ```diff
  -import DayPicker from '@material-ui/lab/DayPicker';
  +import CalendarPicker from '@material-ui/lab/CalendarPicker';

  createMuiTheme({
    components: {
  -   MuiDayPicker: {},
  +   MuiCalendarPicker: {},
    }
  })
  ```

- &#8203;<!-- 04 -->[Pickers] Rename PickersCalendarSkeleton to CalendarPickerSkeleton (#25679) @eps1lon

  ```diff
  -import PickersCalendarSkeleton from '@material-ui/lab/PickersCalendarSkeleton';
  +import CalendarPickerSkeleton from '@material-ui/lab/CalendarPickerSkeleton';
  ```

- &#8203;<!-- 06 -->[Pickers] Rename `date` `view` to `day` (#25685) @eps1lon

  ```diff
  -<DatePicker openTo="date" views={['date', 'month']} />
  +<DatePicker openTo="day" views={['day', 'month']} />
  ```

#### Changes

- &#8203;<!-- 16 -->[DateRangePicker] Add DateRangePickerDay to theme augmentation list (#25758) @ifndefdeadmau5
- &#8203;<!-- 38 -->[Pickers] Rename internal DayPickerView to CalendarPickerView (#25817) @eps1lon
- &#8203;<!-- 41 -->[Pickers] Remove `TView` generic in CalendarPicker (#25818) @eps1lon
- &#8203;<!-- 40 -->[Pickers] Use passive effect to attach close-on-escape listener (#25819) @eps1lon
- &#8203;<!-- 50 -->[Timeline] Migrate TimelineDot to emotion (#25830) @vicasas
- &#8203;<!-- 28 -->[Timeline] Migrate TimelineContent to emotion (#25781) @siriwatknp
- &#8203;<!-- 53 -->[Timeline] Migrate TimelineItem to emotion (#25822) @vicasas
- &#8203;<!-- 47 -->[Timeline] Migrate TimelineOppositeContent to emotion (#25816) @vicasas
- &#8203;<!-- 54 -->[TrapFocus] Make isEnabled and getDoc optional (#25784) @m4theushw

### `@material-ui/styled-engine@5.0.0-alpha.31`

- &#8203;<!-- 27 -->[styled-engine] Fix shouldForwardProp on slots (#25780) @mnajdova
- &#8203;<!-- 11 -->[styled-engine] Improve GlobalStyles props (#25751) @mnajdova

### `@material-ui/unstyled@5.0.0-alpha.31`

- &#8203;<!-- 14 -->[unstyled] Convert generateUtilityClass(es) to TypeScript (#25753) @eps1lon

### Docs

- &#8203;<!-- 31 -->[Avatar] Set backgroundColor from string (#25789) @Vikram710
- &#8203;<!-- 59 -->[docs] Add demos for public picker components (#25812) @eps1lon
- &#8203;<!-- 49 -->[docs] Add example with switch dark/light mode (#25823) @Vikram710
- &#8203;<!-- 01 -->[docs] Add package headings to 5.0.0-alpha.30 changelog (#25733) @eps1lon
- &#8203;<!-- 61 -->[docs] Add unstyled section to all components coming with the package (#25843) @mnajdova
- &#8203;<!-- 10 -->[docs] Breakdown Chip demos into smaller ones (#25750) @vicasas
- &#8203;<!-- 12 -->[docs] Document circular progress inherit (#25736) @oliviertassinari
- &#8203;<!-- 58 -->[docs] Fix /production-error crash (#25839) @eps1lon
- &#8203;<!-- 48 -->[docs] Fix ad duplication (#25831) @oliviertassinari
- &#8203;<!-- 09 -->[docs] Fix autocommplete disable event value (#25752) @oliviertassinari
- &#8203;<!-- 56 -->[docs] Fix inline-preview selection controls (#25834) @oliviertassinari
- &#8203;<!-- 29 -->[docs] Fix Horizontally centered demo (#25787) @viditrv123
- &#8203;<!-- 45 -->[docs] Improve pickers migration docs from v3 (#25813) @ahmed-28
- &#8203;<!-- 15 -->[docs] Move DataGrid editing nav link (#25769) @dtassone
- &#8203;<!-- 36 -->[docs] Replace Typography color values with system values (#25805) @oliviertassinari
- &#8203;<!-- 60 -->[docs] Remove one inline-style (#25671) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Use gender neutral pronoun for Swipeable Drawer (#25775) @catchanuj
- &#8203;<!-- 20 -->[examples] Add TypeScript for styled-components engine (#25675) @jqrun
- &#8203;<!-- 23 -->[l10n] zhTW refinement (#25786) @shakatoday
- &#8203;<!-- 44 -->[Tabs] Add demo for routing with Tabs (#25827) @ahmed-28
- &#8203;<!-- 57 -->[website] Add Matheus Wichman (#25801) @m4theushw

### Core

- &#8203;<!-- 42 -->[core] Batch small changes (#25804) @oliviertassinari
- &#8203;<!-- 02 -->[core] Document token permissions of release:changelog (#25732) @eps1lon
- &#8203;<!-- 34 -->[core] Error when installing in unsupported node environments (#25795) @eps1lon
- &#8203;<!-- 43 -->[core] Fix rgba to hex conversion (#25825) @saeedeyvazy
- &#8203;<!-- 08 -->[core] Normalize usage of pseudo classes selectors (#25748) @mnajdova
- &#8203;<!-- 51 -->[core] Remove unused public types (#25833) @oliviertassinari
- &#8203;<!-- 25 -->[core] Remove incorrect overridesResolver usages (#25778) @mnajdova
- &#8203;<!-- 03 -->[test] Use public imports (#25686) @vicasas
- &#8203;<!-- 22 -->[core] Use readonly arrays where possible (#25746) @eps1lon

All contributors of this release in alphabetical order: @ahmed-28, @catchanuj, @dtassone, @eps1lon, @ifndefdeadmau5, @jqrun, @m4theushw, @MieleVL, @mnajdova, @npandrei, @oliviertassinari, @petyosi, @robphoenix, @saeedeyvazy, @shakatoday, @siriwatknp, @vicasas, @viditrv123, @Vikram710

## 5.0.0-alpha.30

<!-- generated comparing v5.0.0-alpha.29..next -->

_Apr 12, 2021_

A big thanks to the 21 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Migrate 9 components to emotion.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.30`

- &#8203;<!-- 19 -->[Alert] Vertically align action on top (#25654) @xdshivani
- &#8203;<!-- 37 -->[Autocomplete] Fix text field standard visual regression (#25676) @oliviertassinari
- &#8203;<!-- 08 -->[CssBaseline] Fix @font-face rule broken in styleOverrides (#25583) @mnajdova
- &#8203;<!-- 45 -->[Grid] Support custom number of columns (#25636) @Avi98
- &#8203;<!-- 15 -->[InputBase] Fix autofill typo (#25651) @michal-perlakowski
- &#8203;<!-- 43 -->[LinearProgress] Add color="inherit" support (#25641) @itscharlieliu
- &#8203;<!-- 06 -->[Pagination] Allow to differentiate more item types (#25622) @ruppysuppy
- &#8203;<!-- 35 -->[Popover] Add popoverClasses export to type declarations (#25695) @tomasznguyen
- &#8203;<!-- 33 -->[Rating] Add highlight selected rating only (#25649) @Vikram710
- &#8203;<!-- 14 -->[Rating] Migrate to emotion (#25588) @natac13
- &#8203;<!-- 38 -->[Select] Migrate to emotion (#25653) @mnajdova
- &#8203;<!-- 17 -->[Select] Migrate NativeSelect to emotion (#24698) @duganbrett
- &#8203;<!-- 28 -->[SpeedDial] Fix broken aria reference issue (#25665) @RiyaNegi
- &#8203;<!-- 05 -->[Stepper] Migrate MobileStepper to emotion (#25589) @natac13
- &#8203;<!-- 13 -->[styles] Outdated warning message (#25637) @bhairavee23
- &#8203;<!-- 32 -->[Table] Remove legacy fix for JSS (#25692) @oliviertassinari
- &#8203;<!-- 10 -->[Table] Migrate TableSortLabel to emotion (#25638) @natac13
- &#8203;<!-- 16 -->[TabPanel] Migrate to emotion (#25646) @tomasznguyen
- &#8203;<!-- 11 -->[TextareaAutosize] Fix resizing bug on Firefox (#25634) @bhairavee23
- &#8203;<!-- 44 -->[TextField] Add textFieldClasses export to type declarations (#25696) @tomasznguyen
- &#8203;<!-- 39 -->[theme] Change default bgColor to white in light mode (#25730) @saleebm
- &#8203;<!-- 02 -->[ToggleButton] Add fullWidth prop (#25585) @hcz
- &#8203;<!-- 40 -->[typescript] Add muiName to declarations (#25689) @michal-perlakowski

### `@material-ui/lab@5.0.0-alpha.30`

- &#8203;<!-- 20 -->[Timeline] Migrate TimelineSeparator to emotion (#25666) @vicasas
- &#8203;<!-- 18 -->[Timeline] Migrate TimelineConnector to emotion (#25663) @vicasas
- &#8203;<!-- 42 -->[TimePicker] Use clock icon when editing in mobile mode (#25569) @alcwhite
- &#8203;<!-- 29 -->[TreeView] Migrate to emotion (#25673) @tomasznguyen

### Docs

- &#8203;<!-- 31 -->[blog] Fix typos @oliviertassinari
- &#8203;<!-- 41 -->[docs] Migrate TextField demos to emotion (#25626) @vicasas
- &#8203;<!-- 36 -->[docs] Bump stylis-plugin-rtl requirement (#25661) @mnajdova
- &#8203;<!-- 34 -->[docs] Ensure old api-docs translations are cleaned (#25680) @eps1lon
- &#8203;<!-- 25 -->[docs] Fix typo in v4 migration doc (#25678) @thameera
- &#8203;<!-- 23 -->[docs] Fix useLayoutEffect warning (#25670) @oliviertassinari
- &#8203;<!-- 22 -->[docs] Fix a11y issue in the SpeedDial docs (#25669) @RiyaNegi
- &#8203;<!-- 12 -->[docs] Cover TypeScript commands in codemod readme (#25640) @StuffByLiang
- &#8203;<!-- 09 -->[docs] Migrate Popover demos to emotion (#25620) @vicasas
- &#8203;<!-- 07 -->[docs] Fix typo in switches and checkboxes doc (#25639) @dimitropoulos
- &#8203;<!-- 03 -->[docs] Add interoperability section for Portal (#25575) @mnajdova
- &#8203;<!-- 01 -->[docs] Fix side nav scroll position (#25619) @misaka3
- &#8203;<!-- 30 -->[website] Q1 2021 Update (#25591) @oliviertassinari
- &#8203;<!-- 04 -->[website] Matheus Wichman joins Material-UI (#25590) @oliviertassinari

### Core

- &#8203;<!-- 27 -->[test] Use public api in lab (#25682) @vicasas
- &#8203;<!-- 26 -->[test] Test types of .spec lab files (#25684) @eps1lon
- &#8203;<!-- 24 -->[core] Fix build step for unstyled package (#25672) @oliviertassinari
- &#8203;<!-- 21 -->[core] Ensure react-is uses v17 (#25668) @eps1lon

All contributors of this release in alphabetical order: @alcwhite, @bhairavee23, @dimitropoulos, @duganbrett, @eps1lon, @hcz, @itscharlieliu, @michal-perlakowski, @misaka3, @mnajdova, @natac13, @oliviertassinari, @RiyaNegi, @ruppysuppy, @saleebm, @StuffByLiang, @thameera, @tomasznguyen, @vicasas, @Vikram710, @xdshivani

## 5.0.0-alpha.29

<!-- generated comparing v5.0.0-alpha.28..next -->

_Apr 4, 2021_

A big thanks to the 26 contributors who made this release possible. Here are some highlights ✨:

- 🙌 Add support in the Grid for any spacing value (#25503) @ZakMiller.
  For instance:

  ```jsx
  <Grid container spacing={1.5}>
  <Grid container spacing="30px">
  ```

  This feature was made possible by the recent migration to emotion.
  You can [find the other issues](https://github.com/mui/material-ui/issues?q=is%3Aopen+is%3Aissue+label%3A%22component%3A+Grid%22) unlocked by the migration to emotion on the Grid component that are left to be solved.

- 👩‍🎤 Convert 3 components to emotion (#25541, #25516, #25521) @rajzik, @praveenkumar-kalidass, @siriwatknp.
- 📚 Migrate 8 component demo pages to the `sx`, `Stack`, and `styled` API @vicasas.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.29`

- &#8203;<!-- 39 -->[AppBar] Fix type support of overridable component (#25456) @heleg
- &#8203;<!-- 26 -->[Autocomplete] Fix Async demo in docs (#25536) @kanish671
- &#8203;<!-- 23 -->[Autocomplete] Fix TypeScript wrapper example (#25530) @JanKaczmarkiewicz
- &#8203;<!-- 21 -->[Backdrop] Remove z-index: -1 (#25524) @silver-snoopy
- &#8203;<!-- 41 -->[Card] Add component prop support (#25537) @silver-snoopy
- &#8203;<!-- 31 -->[CssBaseline] Migrate ScopedCssBaseline to emotion (#25541) @rajzik
- &#8203;<!-- 03 -->[Divider] Support middle variant with vertical orientation (#25428) @vedadeepta
- &#8203;<!-- 16 -->[Grid] Support decimal spacing (#25503) @ZakMiller
- &#8203;<!-- 28 -->[List] Remove background inheritance of ListSubheader (#25532) @tanmoyopenroot
- &#8203;<!-- 40 -->[Paper] Support dark mode brightening based on elevation (#25522) @m4theushw
- &#8203;<!-- 43 -->[Select] Fix selection of non-options (#25567) @oliviertassinari
- &#8203;<!-- 34 -->[Select] Set aria-expanded to false when listbox is collapsed (#25545) @Harish-Karthick
- &#8203;<!-- 18 -->[SpeedDial] Call focus on escape (#25509) @tanmoyopenroot
- &#8203;<!-- 20 -->[Stack] Add component prop (#25526) @silver-snoopy
- &#8203;<!-- 07 -->[Stack] Fix the :not selector (#25484) @Andarist
- &#8203;<!-- 24 -->[Stepper] Migrate StepButton to emotion (#25516) @praveenkumar-kalidass
- &#8203;<!-- 22 -->[Stepper] Migrate Stepper to emotion (#25521) @siriwatknp
- &#8203;<!-- 01 -->[Tabs] Don't animate scroll on first render (#25469) @manziEric
- &#8203;<!-- 25 -->[Tooltip] Fix forwarded classes (#25535) @silver-snoopy

### `@material-ui/unstyled@5.0.0-alpha.29`

- &#8203;<!-- 38 -->[Slider] Allow disabling the left and right thumbs swap (#25547) @michal-perlakowski

### `@material-ui/lab@5.0.0-alpha.29`

- &#8203;<!-- 12 -->[DateRangePicker] Fix props naming in DatePicker components (#25504) @callmeberzerker
- &#8203;<!-- 04 -->[DateRangePickerInput][internal] Inline makeDateRangePicker calls (#25470) @eps1lon
- &#8203;<!-- 06 -->[StaticDateRangePicker] Fix inconsistent name for theme props (#25483) @eps1lon
- &#8203;<!-- 17 -->[Pickers] Move own internals from lab internals to dedicated file (#25498) @eps1lon

### Docs

- &#8203;<!-- 46 -->[docs] Provide an alternative to right-to-left (#25584) @dariusk
- &#8203;<!-- 45 -->[docs] Add note for typescript on the styled() customization guide (#25576) @mnajdova
- &#8203;<!-- 44 -->[docs] Replace incorrect instances of defined with define (#25572) @surajpoddar16
- &#8203;<!-- 42 -->[docs] Fix spelling error in roadmap.md file (#25570) @Brlaney
- &#8203;<!-- 37 -->[docs] Migrate Card demos to emotion (#25557) @vicasas
- &#8203;<!-- 36 -->[docs] Fix typo in data grid (#25561) @michael-001
- &#8203;<!-- 33 -->[docs] Migrate Menu demos to emotion (#25554) @vicasas
- &#8203;<!-- 32 -->[docs] Fix <kbd> style in dark mode (#25551) @m4theushw
- &#8203;<!-- 30 -->[docs] Document changing skeleton color (#25542) @ZakMiller
- &#8203;<!-- 29 -->[docs] Improve coverage of TypeScript theme augmentation (#25489) @ashishshuklabs
- &#8203;<!-- 27 -->[docs] Update minimizing-bundle-size.md (#25534) @nguyenyou
- &#8203;<!-- 15 -->[docs] Migrate Portal demos to emotion (#25505) @vicasas
- &#8203;<!-- 14 -->[docs] Migrate NoSSR demos to emotion (#25506) @vicasas
- &#8203;<!-- 13 -->[docs] Migrate ClickAwayListener demos to emotion (#25507) @vicasas
- &#8203;<!-- 10 -->[docs] Cover change of React support (#25487) @oliviertassinari
- &#8203;<!-- 09 -->[docs] Migrate Transitions demos to emotion (#25488) @vicasas
- &#8203;<!-- 08 -->[docs] Fix Stack divider demo (#25491) @oliviertassinari
- &#8203;<!-- 02 -->[docs] Migrate Icons demos to emotion (#25412) @vicasas

### Core

- &#8203;<!-- 19 -->[core] Use latest TypeScript in typescript-to-proptypes (#25512) @eps1lon
- &#8203;<!-- 11 -->[core] Update the codesandbox issue templates (#25501) @oliviertassinari
- &#8203;<!-- 05 -->[test] Wait on e2e server to start before starting runner (#25476) @eps1lon

All contributors of this release in alphabetical order: @Andarist, @ashishshuklabs, @Brlaney, @callmeberzerker, @dariusk, @eps1lon, @Harish-Karthick, @heleg, @JanKaczmarkiewicz, @kanish671, @m4theushw, @manziEric, @michael-001, @michal-perlakowski, @mnajdova, @nguyenyou, @oliviertassinari, @praveenkumar-kalidass, @rajzik, @silver-snoopy, @siriwatknp, @surajpoddar16, @tanmoyopenroot, @vedadeepta, @vicasas, @ZakMiller

## 5.0.0-alpha.28

_Mar 22, 2021_

A big thanks to the 34 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Convert 9 components to emotion (#25267, #25216, #25264, #25197, #25372, #25281, #25210, #25279, #2528) @natac13 @tomasznguyen @kayuapi.
  85% of the components have been migrated so far, thanks to the help of the community.
- 📚 Migrate 18 component demo pages to the `sx`, `Stack`, and `styled` API @vicasas.
  This was also an importunity to breakdown the existing large demos into smaller and more focuses ones.
- Add a new Stack component (#25149) @souporserious
  The component allows to workaround the lack of support for the CSS flexbox `gap` property across browsers.

  <img width="830" alt="stack" src="https://user-images.githubusercontent.com/3165635/112068427-29434200-8b6a-11eb-94e8-057535423b0f.png">

  See the documentation for [more details](https://mui.com/components/stack/).

- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.28`

#### Breaking changes

- [core] Drop support for React 16 (#25464) @eps1lon
- &#8203;<!-- 36 -->[core] Drop support for node 10 (#25306) @eps1lon

#### Changes

- &#8203;<!-- 70 -->[Autocomplete] Warn when the input didn't resolve in time (#25311) @LaneRamp
- &#8203;<!-- 26 -->[Autocomplete] Fix styleOverrides support (#25276) @manziEric
- &#8203;<!-- 68 -->[ButtonBase] Allow to customize the link component via theme (#25331) @vedadeepta
- &#8203;<!-- 43 -->[ButtonBase] Fix default type attribute (submit -> button) (#25323) @RTEYL
- &#8203;<!-- 73 -->[ButtonGroup] Support custom colors (#25413) @oliviertassinari
- &#8203;<!-- 13 -->[CircularProgress] Fix animation when disableShrink={true} (#25247) @duongdev
- &#8203;<!-- 29 -->[Dialog] Fix typo (#25287) @aheimlich
- &#8203;<!-- 22 -->[Dialog] Migrate DialogContentText to emotion (#25267) @tomasznguyen
- &#8203;<!-- 04 -->[Dialog] Migrate Dialog to emotion (#25216) @natac13
- &#8203;<!-- 79 -->[Drawer] Fix RTL support (#25453) @silver-snoopy
- &#8203;<!-- 50 -->[Menu] Migrate to emotion (#25264) @tomasz-crozzroads
- &#8203;<!-- 77 -->[Paper] Fix component prop type error (#25426) @heleg
- &#8203;<!-- 17 -->[Popover] Migrate to emotion (#25197) @tomasznguyen
- &#8203;<!-- 59 -->[Radio] Fix html structure (#25398) @oliviertassinari
- &#8203;<!-- 58 -->[Select] Fix focus background when variant="outlined" (#25393) @christiaan
- &#8203;<!-- 62 -->[Slider] Add `tabIndex` prop (#25388) @johnloven
- &#8203;<!-- 88 -->[Snackbar] Fix prop type error for 'key' prop (#25431) @jansedlon
- &#8203;<!-- 38 -->[SpeedDial] Reset tooltip state when the speed dial is closed (#25259) @m4theushw
- &#8203;<!-- 71 -->[Stack] Add new component (#25149) @souporserious
- &#8203;<!-- 81 -->[Stepper] Migrate StepLabel to emotion (#25372) @praveenkumar-kalidass
- &#8203;<!-- 27 -->[Stepper] Migrate StepIcon to emotion (#25281) @praveenkumar-kalidass
- &#8203;<!-- 08 -->[Stepper] Migrate StepContent to emotion (#25210) @praveenkumar-kalidass
- &#8203;<!-- 30 -->[SwipeableDrawer] Fix hideBackDrop support (#25275) @manziEric
- &#8203;<!-- 75 -->[Table] Fix duplicated keys in TablePagination rows per page (#25309) @martinfrancois
- &#8203;<!-- 72 -->[Table] Consistency with DataTable (#25414) @oliviertassinari
- &#8203;<!-- 76 -->[TextField] Size small for multiline (#25423) @julihereu
- &#8203;<!-- 48 -->[TextField] Migrate InputAdornment to emotion (#25279) @kayuapi
- &#8203;<!-- 47 -->[TextField] Migrate to emotion (#25286) @tomasznguyen
- &#8203;<!-- 74 -->[ToggleButton] Add color prop (#25390) @AlfredoGJ
- &#8203;<!-- 82 -->[Tooltip] Make `disableFocusListener` prop comment clearer (#25455) @jansedlon
- &#8203;<!-- 24 -->[Tooltip] Fix placement regression (#25255) @oliviertassinari
- &#8203;<!-- 25 -->[Transition] Add easing prop to override default timing function (#25245) @jeferson-sb

### `@material-ui/lab@5.0.0-alpha.28`

- &#8203;<!-- 85 -->[Pickers] Follow "private by default" in makeDateRangePicker (#25424) @eps1lon
- &#8203;<!-- 53 -->[Pickers] Simplify internals of \*Wrapper components (#25369) @eps1lon
- &#8203;<!-- 35 -->[Pickers] Remove `make*` HOCs (#25172) @eps1lon
- &#8203;<!-- 19 -->[Pickers] Remove propTypes in production for exotic components (#25261) @eps1lon
- [Pickers] Unify ref behavior (#25425) @eps1lon
- [Pickers] Sort properties (#25473) @eps1lon

### `@material-ui/utils@5.0.0-alpha.28`

- &#8203;<!-- 90 -->[utils] Fix useForkRef typings rejecting nullish (#25468) @eps1lon
- &#8203;<!-- 54 -->[utils] Allow functional updates in TypeScript declaration of useControlled (#25378) @MikhailTSE
- &#8203;<!-- 28 -->[utils] Add a new integer propType (#25224) @fayzzzm

### Docs

- &#8203;<!-- 56 -->[docs] Fix typo in migration-v4.md (#25384) @Tollwood
- &#8203;<!-- 86 -->[docs] Use defaultCodeOpen where appropriate (#25418) @eps1lon
- &#8203;<!-- 84 -->[docs] Support RTL with styled components (#25457) @silver-snoopy
- &#8203;<!-- 83 -->[docs] Improve the docs of the Grid component (#25429) @oliviertassinari
- &#8203;<!-- 80 -->[docs] Migrate Switch demos to emotion (#25366) @vicasas
- &#8203;<!-- 78 -->[docs] Use Stack in demos (#25419) @vicasas
- &#8203;<!-- 69 -->[docs] Migrate Checkbox demos to emotion (#25394) @vicasas
- &#8203;<!-- 67 -->[docs] Migrate Radio demos to emotion (#25396) @vicasas
- &#8203;<!-- 66 -->[docs] Update icon link to fonts.google.com (#25410) @BGehrels
- &#8203;<!-- 60 -->[docs] Migrate Avatar demos to emotion (#25375) @vicasas
- &#8203;<!-- 57 -->[docs] Fix multiline textfields docs to use minRows/maxRows (#25383) @saleebm
- &#8203;<!-- 55 -->[docs] Consolidate environment variables into next.config (#25386) @eps1lon
- &#8203;<!-- 52 -->[docs] Use `env` next config over DefinePlugin (#25373) @eps1lon
- &#8203;<!-- 49 -->[docs] Migrate SpeedDial to emotion (#25367) @vicasas
- &#8203;<!-- 46 -->[docs] Refine the used prop-type to discriminate number from integer (#25334) @fayzzzm
- &#8203;<!-- 45 -->[docs] Migrate AppBar demos to emotion (#25335) @m4theushw
- &#8203;<!-- 44 -->[docs] Migrate Grid demos to emotion (#25332) @vicasas
- &#8203;<!-- 42 -->[docs] Migrate Toggle Button demos to emotion (#25333) @vicasas
- &#8203;<!-- 41 -->[docs] Migrate Links demos to emotion (#25303) @vicasas
- &#8203;<!-- 40 -->[docs] Migrate Breadcrumbs demos to emotion (#25302) @vicasas
- &#8203;<!-- 34 -->[docs] Migrate Image List demos to emotion (#25301) @vicasas
- &#8203;<!-- 33 -->[docs] Bring clarity about the IE 11 support policy: it's partial (#25262) @oliviertassinari
- &#8203;<!-- 31 -->[docs] Add the new demo page for the data grid (#25284) @DanailH
- &#8203;<!-- 23 -->[docs] Migrate List demos to emotion (#25266) @vicasas
- &#8203;<!-- 21 -->[docs] Migrate Chip demos to emotion (#25268) @vicasas
- &#8203;<!-- 20 -->[docs] Add missing props to \*DatePicker API (#25254) @eps1lon
- &#8203;<!-- 18 -->[docs] Improve accessibility of the basic menu demo (#25207) @ee0pdt
- &#8203;<!-- 16 -->[docs] Migrate Fab demos to emotion (#25251) @vicasas
- &#8203;<!-- 15 -->[docs] Migrate Rating demos to emotion (#25252) @vicasas
- &#8203;<!-- 14 -->[docs] Migrate Transfer List demos to emotion (#25253) @vicasas
- &#8203;<!-- 07 -->[docs] Remove dead generatePropTypeDescription method (#25188) @fayzzzm
- &#8203;<!-- 06 -->[docs] Migrate Skeleton demos to emotion (#25212) @vicasas
- &#8203;<!-- 05 -->[docs] Migrate Paper demos to emotion (#25213) @vicasas
- &#8203;<!-- 03 -->[docs] Migrate Container demos to emotion (#25220) @vicasas
- &#8203;<!-- 01 -->[docs] Add GlobalStyles API (#25191) @eps1lon

### Core

- &#8203;<!-- 63 -->[benchmark] Set intended environment (#25402) @eps1lon
- &#8203;<!-- 11 -->[core] Remove .propTypes when the props are empty (#25193) @eps1lon
- &#8203;<!-- 91 -->[core] Fix allSettled usage (#25461) @eps1lon
- &#8203;<!-- 87 -->[core] Switch to React 17 (#25416) @eps1lon
- &#8203;<!-- 65 -->[core] Bump missed node versions (#25385) @eps1lon
- &#8203;<!-- 39 -->[core] Batch small changes (#25330) @oliviertassinari
- &#8203;<!-- 37 -->[core] Use Promise.allSettled over .all where appropriate (#25315) @eps1lon
- &#8203;<!-- 92 -->[test] Use fixture terminology in e2e and visual regression tests (#25466) @eps1lon
- &#8203;<!-- 89 -->[test] Create end-to-end testing CI job (#25405) @eps1lon
- &#8203;<!-- 64 -->[test] Transpile more similar to prod bundle (#25406) @eps1lon
- &#8203;<!-- 32 -->[test] Minor improvements to `describeConformance` (#25297) @eps1lon
- &#8203;<!-- 12 -->[test] Fix warnings in the demos (#25140) @oliviertassinari
- &#8203;<!-- 10 -->[test] Convert createClientRender to TypeScript (#25249) @eps1lon
- &#8203;<!-- 09 -->[test] Increase ttp setup timeout (#25248) @eps1lon
- &#8203;<!-- 02 -->[test] Improve typescript-to-proptypes test suite (#25209) @eps1lon

All contributors of this release in alphabetical order: @aheimlich, @AlfredoGJ, @BGehrels, @christiaan, @DanailH, @duongdev, @ee0pdt, @eps1lon, @fayzzzm, @heleg, @jansedlon, @jeferson-sb, @johnloven, @julihereu, @kayuapi, @LaneRamp, @m4theushw, @manziEric, @martinfrancois, @MikhailTSE, @natac13, @oliviertassinari, @praveenkumar-kalidass, @RTEYL, @saleebm, @silver-snoopy, @souporserious, @Tollwood, @tomasz-crozzroads, @tomasznguyen, @vedadeepta, @vicasas

## 5.0.0-alpha.27

<!-- generated comparing v5.0.0-alpha.26..next -->

_Mar 5, 2021_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Convert 8 components to emotion (#25091, #25158, #25146, #25142, #25166) @natac13, @mngu, @m4theushw, @praveenkumar-kalidass.
- 📚 Convert 5 components demos to emotion (#25164, #25183, #25180, #25145, #25138) @vicasas
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.27`

- &#8203;<!-- 16 -->[Autocomplete] Support readonly type for the options (#25155) @silver-snoopy
- &#8203;<!-- 13 -->[Drawer] Migrate to emotion (#25091) @natac13
- &#8203;<!-- 20 -->[LinearProgress] Migrate to emotion (#25158) @mngu
- &#8203;<!-- 06 -->[Pagination] Migrate Pagination and PaginationItem to emotion (#25146) @mngu
- &#8203;<!-- 21 -->[Radio] Migrate to emotion (#25152) @mngu
- &#8203;<!-- 10 -->[Snackbar] Migrate to emotion (#25142) @m4theushw
- &#8203;<!-- 25 -->[SpeedDial] Migrate to emotion (#25166) @m4theushw
- &#8203;<!-- 12 -->[Stepper] Migrate StepConnector to emotion (#25092) @praveenkumar-kalidass
- &#8203;<!-- 07 -->[styled] Fix override logic to support component without root (#25143) @niting143
- &#8203;<!-- 08 -->[Table] Remove default role logic in TableCell (#25105) @silver-snoopy
- &#8203;<!-- 27 -->[Table] Use primary cover over secondary for selected state (#25182) @beaudry
- &#8203;<!-- 23 -->[theme] Fix styleOverrides with nested selectors (#25156) @ruppysuppy

### `@material-ui/system@5.0.0-alpha.27`

- &#8203;<!-- 02 -->[system] Fix behavior of visuallyHidden when used with `sx` prop (#25110) @niting143

### `@material-ui/lab@5.0.0-alpha.27`

#### Breaking changes

- &#8203;<!-- 18 -->[Pickers] Remove `dateAdapter` prop (#25162) @eps1lon

The prop didn't solve any important problem better than any of its alternatives do.

```diff
-<DatePicker dateAdapter={x} />
+<LocalizationProvider dateAdapter={x}>
+  <DatePicker />
+</LocalizationProvider>
```

#### Changes

- &#8203;<!-- 19 -->[Pickers][internal] Use React.forwardRef instead of forwardedRef prop (#25173) @eps1lon

### `@material-ui/styles@5.0.0-alpha.27`

- &#8203;<!-- 03 -->[styles] Use capitalize from utils (#25136) @eps1lon

### Docs

- &#8203;<!-- 22 -->[docs] Migrate Bottom Navigation demos to emotion (#25180) @vicasas
- &#8203;<!-- 09 -->[docs] Migrate Button demos to emotion (#25138) @vicasas
- &#8203;<!-- 17 -->[docs] Migrate Divider demos to emotion (#25145) @vicasas
- &#8203;<!-- 24 -->[docs] Migrate Pagination demos to emotion (#25183) @vicasas
- &#8203;<!-- 26 -->[docs] Migrate Typography demos to emotion (#25164) @vicasas
- &#8203;<!-- 11 -->[docs] Remove CircleCI from backers (#24801) @mbrookes
- &#8203;<!-- 14 -->[docs] Update the used testing libraries (#25144) @oliviertassinari

### Core

- &#8203;<!-- 01 -->[CHANGELOG] Better document breaking changes @oliviertassinari
- &#8203;<!-- 05 -->[core] Modernize icons `builder:src` (#25137) @eps1lon
- &#8203;<!-- 04 -->[core] Properly use BABEL_ENV test and development (#25139) @eps1lon
- &#8203;<!-- 15 -->[test] Add (manual) visual regression test for icons (#25160) @eps1lon

All contributors of this release in alphabetical order: @beaudry, @eps1lon, @m4theushw, @mbrookes, @mngu, @natac13, @niting143, @oliviertassinari, @praveenkumar-kalidass, @ruppysuppy, @silver-snoopy, @vicasas

## 5.0.0-alpha.26

<!-- generated comparing v5.0.0-alpha.25..next -->

_Feb 27, 2021_

A big thanks to the 26 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Convert 11 components to emotion (#24696, #24631, #24857, #25048, #24693, #24663, #25007, #24688, #24665, #24878, #24571) @praveenkuma @natac13 @xs9627 @povilass @m4theushw @natac13 @natac13 @DanailH @duganbrett @duganbrett @praveenkumar-kalidass @vinyldarkscratch.
  75% of the components have been migrated so far, thanks to the help of the community.
- 🦴 Convert 4 components to the unstyled pattern (#24985, #24857, #24890, #24957) @povilass.
  This change doesn't introduce any breaking changes. Hence, most of the conversion effort will be done post v5-stable.
- 📚 Fix the generation of the API pages for the date pickers (#25101, #25100, #25086, #25089, #25085, #25084) @eps1lon.
  This is a follow-up effort after we have merged `material-ui-pickers`. The components are written in TypeScript which required us to upgrade our infra.
- 👌 Improve the Slider thumb and track animation (#24968) @remyoudemans.
  The thumb is now moving with a light transition between different values unless it's dragged.
  <img src="https://user-images.githubusercontent.com/3165635/109394906-b7405a00-7929-11eb-829a-3b5246c30c08.gif" width="412" height="110" />
- 💅 Convert 5 components with custom colors support (#25099, #25088) @mngu.
  This change makes it easier to leverage custom palettes
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@5.0.0-alpha.26`

#### Breaking changes

- &#8203;<!-- 089 -->[Tabs] Change the default indicatorColor and textColor prop values to "primary" (#25063) @Dripcoding

  This is done to match the most common use cases with Material Design. You can restore the previous behavior with:

  ```diff
  -<Tabs />
  +<Tabs indicatorColor="primary" textColor="inherit" />
  ```

#### Changes

- &#8203;<!-- 099 -->[AppBar][circularprogress][LinearProgress] Support custom colors (#25099) @mngu
- &#8203;<!-- 102 -->[Autocomplete] Prevent closing on no-option text click (#25103) @silver-snoopy
- &#8203;<!-- 101 -->[Autocomplete] Fix ListboxComponent slot regression (#25102) @oliviertassinari
- &#8203;<!-- 035 -->[Autocomplete] Fix the return type of AutocompleteGetTagProps (#24950) @joemaffei
- &#8203;<!-- 029 -->[Autocomplete] Migrate to emotion (#24696) @natac13
- &#8203;<!-- 091 -->[Button] Fix ripple stuck after displaying the context menu (#25004) @DanailH
- &#8203;<!-- 082 -->[Button] Fix forward classes to ButtonBase (#25072) @praveenkumar-kalidass
- &#8203;<!-- 034 -->[Chip] Normalize Material Design States (#24915) @oliviertassinari
- &#8203;<!-- 031 -->[Chip] Fix focus-visible regression (#24906) @oliviertassinari
- &#8203;<!-- 018 -->[CircularProgress] Make source easier to read (#24893) @oliviertassinari
- &#8203;<!-- 053 -->[Menu] Migrate MenuItem to emotion (#24631) @xs9627
- &#8203;<!-- 079 -->[Paper] Fix type support of overridable component (#25059) @mngu
- &#8203;<!-- 051 -->[Skeleton] Fix global theme customization (#24983) @glocore
- &#8203;<!-- 067 -->[Slider] Improve thumb and track animation (#24968) @remyoudemans
- &#8203;<!-- 009 -->[Slider] Fix override of event.target when preparing change events (#24782) @praveenkumar-kalidass
- &#8203;<!-- 097 -->[Snackbar] Migrate SnackbarContent to emotion (#25048) @m4theushw
- &#8203;<!-- 028 -->[SwipeableDrawer] Fix detection of native scroll container (#24903) @oliviertassinari
- &#8203;<!-- 059 -->[Switch] Migrate to emotion (#24693) @natac13
- &#8203;<!-- 050 -->[Switch] Update to follow current MD guidelines (#24954) @hxqlin
- &#8203;<!-- 016 -->[Table] Migrate TableCell to emotion (#24663) @natac13
- &#8203;<!-- 094 -->[TextField] Support custom color and size (#25088) @mngu
- &#8203;<!-- 093 -->[TextField] Fix input adornment color (#25090) @manziEric
- &#8203;<!-- 081 -->[TextField] Fix FilledInput AA contrast issue (#25046) @Dripcoding
- &#8203;<!-- 072 -->[TextField] Migrate FormControlLabel to emotion (#25007) @DanailH
- &#8203;<!-- 069 -->[TextField] Fix label wrap, display an ellipsis instead (#25012) @NekoApocalypse
- &#8203;<!-- 052 -->[TextField] Migrate OutlinedInput to emotion (#24688) @duganbrett
- &#8203;<!-- 048 -->[TextField] Fix focused={true} disabled={true} infinite render (#24961) @oliviertassinari
- &#8203;<!-- 019 -->[TextField] Migrate FormLabel and InputLabel to emotion (#24665) @duganbrett
- &#8203;<!-- 077 -->[theme] Update theme.palette.text.secondary to match the spec (#25060) @Dripcoding
- &#8203;<!-- 058 -->[ToggleButton] Migrate ToggleButtonGroup to emotion (#24878) @praveenkumar-kalidass
- &#8203;<!-- 098 -->[Tooltip] Migrate to emotion (#24571) @vinyldarkscratch

### `@material-ui/unstyled@5.0.0-alpha.26`

- &#8203;<!-- 033 -->[Portal] Migrate to unstyled (#24890) @povilass
- &#8203;<!-- 047 -->[TrapFocus] Migrate to unstyled (#24957) @povilass
- &#8203;<!-- 060 -->[Backdrop] Migrate to unstyled (#24985) @povilass
- &#8203;<!-- 078 -->[Modal] Migrate to emotion + unstyled (#24857) @povilass

### `@material-ui/lab@5.0.0-alpha.26`

- &#8203;<!-- 071 -->[Pickers] Fix scroll-jump when opening with a selected value (#25010) @eps1lon
- &#8203;<!-- 066 -->[Pickers] Rework keyboard navigation implementation (#24315) @eps1lon
- &#8203;<!-- 065 -->[Pickers] Fix picker components not opening on click in React 17 (#24981) @eps1lon
- &#8203;<!-- 013 -->[Pickers] Fix outdated link to PickersDay (#24883) @oliviertassinari

### `@material-ui/icons@5.0.0-alpha.26`

- &#8203;<!-- 087 -->[icons] Synchronize icons (#25055) @eps1lon

  The icons were synchronized with https://material.io/resources/icons/. This change increases the number of supported icons from 1,349 to 1,781 per theme (we support 5 themes). The breaking changes:

  ```diff
  // AmpStories -> Download
  -AmpStories
  +Download
  -AmpStoriesOutlined
  +DownloadOutlined
  -AmpStoriesRounded
  +DownloadRounded
  -AmpStoriesSharp
  +DownloadSharp
  -AmpStoriesTwoTone
  +DownloadTwoTone
  // Outbond -> Outbound
  -Outbond
  +Outbound
  -OutbondOutlined
  +OutboundOutlined
  -OutbondRounded
  +OutboundRounded
  -OutbondSharp
  +OutboundSharp
  -OutbondTwoTone
  +OutboundTwoTone
  ```

  We are getting closer to the maximum number of icons our infrastructure can support. In the future, we might remove the least popular icons in favor of the most frequently used ones.

### `@material-ui/system@5.0.0-alpha.26`

- &#8203;<!-- 057 -->[system] Fix gap, rowGap, columnGap, borderRadius reponsive support (#24994) @oliviertassinari

### `@material-ui/utils@5.0.0-alpha.26`

- &#8203;<!-- 025 -->[utils] Fix isMuiElement types (#24936) @oliviertassinari

### Docs

- &#8203;<!-- 100 -->[docs] Add DateRangePickerDay, PickersDay, PickersCalendarSkeleton, MontherPicker API (#25101) @eps1lon
- &#8203;<!-- 096 -->[docs] Add DayPicker API (#25100) @eps1lon
- &#8203;<!-- 095 -->[docs] Improve description of builderbook (#25086) @klyburke
- &#8203;<!-- 092 -->[docs] Add API of ClockPicker (#25089) @eps1lon
- &#8203;<!-- 090 -->[docs] Add API of \*DateRangePicker components (#25085) @eps1lon
- &#8203;<!-- 088 -->[docs] Add API of \*DateTimePicker components (#25084) @eps1lon
- &#8203;<!-- 084 -->[docs] Add graphql-starter to Example Projects (#25068) @koistya
- &#8203;<!-- 083 -->[docs] Migrate Alert demos to emotion (#25074) @m4theushw
- &#8203;<!-- 075 -->[docs] Add codesandbox example for styled-components (#25050) @jony89
- &#8203;<!-- 056 -->[docs] Wrong link @oliviertassinari
- &#8203;<!-- 049 -->[docs] Improve error message when GitHub API fail (#24976) @oliviertassinari
- &#8203;<!-- 037 -->[docs] Separate simple and nested modal demos (#24938) @ydubinskyi
- &#8203;<!-- 030 -->[docs] Remove under construction icons from DataGrid feature pages (#24946) @DanailH
- &#8203;<!-- 020 -->[docs] Fix prefers-color-scheme switch (#24902) @oliviertassinari
- &#8203;<!-- 001 -->[docs] Add yarn install step, safer @oliviertassinari
- &#8203;<!-- 055 -->[examples] Fix code sandbox link GitHub branch (#24996) @kevbarns

### Core

- &#8203;<!-- 086 -->[core] Prevent out-of-memory in test_types_next (#25079) @eps1lon
- &#8203;<!-- 085 -->[core] Pin playwright image to known working version (#25080) @eps1lon
- &#8203;<!-- 080 -->[core] Remove need to reinject backdrop (#25071) @oliviertassinari
- &#8203;<!-- 074 -->[core] Batch small changes (#25015) @oliviertassinari
- &#8203;<!-- 068 -->[core] More cleanup on Pickers code (#25020) @dborstelmann
- &#8203;<!-- 063 -->[core] Allow running full pipeline with various React versions (#25005) @eps1lon
- &#8203;<!-- 061 -->[core] Fix missing codecov report (#25006) @eps1lon
- &#8203;<!-- 040 -->[core] Fix release:tag pushing to first push remote (#24960) @eps1lon
- &#8203;<!-- 039 -->[core] Fix cache miss when using playwright docker images (#24942) @eps1lon
- &#8203;<!-- 023 -->[core] Prevent out-of-memory when type-checking in CI (#24933) @eps1lon
- &#8203;<!-- 022 -->[core] Disable page size tracking (#24932) @eps1lon
- &#8203;<!-- 021 -->[core] Extract linting into separate CI job (#24930) @eps1lon
- &#8203;<!-- 017 -->[core] Only clone props if needed (#24892) @oliviertassinari
- &#8203;<!-- 015 -->[core] listChangedFiles returns an empty list with no changed files (#24879) @eps1lon
- &#8203;<!-- 014 -->[core] Remove dead code in docs:dev (#24880) @oliviertassinari
- &#8203;<!-- 012 -->[core] Fix a few stylelint error (#24885) @oliviertassinari
- &#8203;<!-- 011 -->[core] Fix name of Safari target (#24881) @oliviertassinari
- &#8203;<!-- 010 -->[core] Prefer return over throw in chainPropTypes (#24882) @oliviertassinari
- &#8203;<!-- 006 -->[core] Support /r/issue-template back (#24870) @oliviertassinari
- &#8203;<!-- 003 -->[core] Simplify xxxClasses types (#24736) @oliviertassinari
- &#8203;<!-- 076 -->[test] Improve BrowserStack configuration (#25049) @oliviertassinari
- &#8203;<!-- 073 -->[test] Track bundle size of unstyled components (#25047) @oliviertassinari
- &#8203;<!-- 070 -->[test] Make `render` required with describeConformanceV5 (#25003) @oliviertassinari
- &#8203;<!-- 064 -->[test] Move a11y tree exclusion to appropriate document (#24998) @eps1lon
- &#8203;<!-- 062 -->[test] Test with ClickAwayListener mount on onClickCapture (#25001) @eps1lon
- &#8203;<!-- 045 -->[test] Improve various timer related issues (#24963) @eps1lon
- &#8203;<!-- 043 -->[test] Avoid Rate Limit Exceeded (#24931) @oliviertassinari
- &#8203;<!-- 042 -->[test] Remove internal icons smoke test (#24969) @eps1lon
- &#8203;<!-- 041 -->[test] Reduce compile time of test:karma in watchmode drastically (#24967) @eps1lon
- &#8203;<!-- 038 -->[test] Dedupe missing act warnings for HoC (#24949) @eps1lon
- &#8203;<!-- 036 -->[test] Consolidate on a single API (#24884) @oliviertassinari
- &#8203;<!-- 027 -->[test] Update react next patch (#24934) @eps1lon
- &#8203;<!-- 026 -->[test] Link CircleCI URL in BS (#24935) @oliviertassinari
- &#8203;<!-- 024 -->[test] Run more tests at the same time (#24886) @oliviertassinari
- &#8203;<!-- 008 -->[test] Dedupe missing act warnings by component name (#24871) @eps1lon
- &#8203;<!-- 007 -->[test] Enable type-unaware versions of disabled typed-aware lint rules (#24873) @eps1lon
- &#8203;<!-- 005 -->[test] Initial workspace definition (#24869) @eps1lon
- &#8203;<!-- 004 -->[test] Add current behavior of focus during mount in Popper (#24863) @eps1lon
- &#8203;<!-- 002 -->[test] Increase BrowserStack timeout to 6min (#24861) @oliviertassinari

All contributors of this release in alphabetical order: @DanailH, @dborstelmann, @Dripcoding, @duganbrett, @eps1lon, @glocore, @hxqlin, @joemaffei, @jony89, @kevbarns, @klyburke, @koistya, @m4theushw, @manziEric, @mngu, @natac13, @NekoApocalypse, @oliviertassinari, @povilass, @praveenkumar-kalidass, @remyoudemans, @silver-snoopy, @vinyldarkscratch, @xs9627, @ydubinskyi

## 5.0.0-alpha.25

<!-- generated comparing v5.0.0-alpha.24..next -->

_Feb 11, 2021_

A big thanks to the 30 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Convert 32 components to emotion. Around 64% of the components have been migrated so far, thanks to the help of the community. We aim to migrate them all before the end of Q1 2021.
  The podium of the most active community members in the migration 🏆:

  1. @natac13 x17
  2. @vicasas x5
  3. @kodai3 x4

- 📐 Add a subset of the system as flattened props on `Typography` (#24496) @mnajdova.
  Now, you can do:

  ```jsx
  <Typography padding={2} color="text.secondary" />
  ```

- 📅 Focus on the date pickers, 5 fixes and 3 docs improvements.
- 💅 Provide a new [`darkScrollbar()`](https://mui.com/components/css-baseline/#scrollbars) CSS utility to improve the native scrollbar in dark mode. The documentation uses it.

### `@material-ui/core@5.0.0-alpha.25`

#### Breaking changes

- Increase the minimum version of TypeScript supported from v3.2 to v3.5. (#24795) @petyosi

  We try to align with types released from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (i.e. packages published on npm under the `@types` namespace).
  We will not change the minimum supported version in a major version of Material-UI.
  However, we generally recommend to not use a TypeScript version older than the [lowest supported version of DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier).

#### Changes

- &#8203;<!-- 03 -->[ImageList] Migrate to emotion (#24615) @kodai3
- &#8203;<!-- 04 -->[Dialog] Migrate DialogTitle to emotion (#24623) @vicasas
- &#8203;<!-- 05 -->[TextField] Prepare removal of labelWidth prop (#24595) @oliviertassinari
- &#8203;<!-- 08 -->[ImageList] Migrate ImageListItem to emotion (#24619) @kodai3
- &#8203;<!-- 09 -->[Card] Migrate CardMedia to emotion (#24625) @natac13
- &#8203;<!-- 10 -->[Card] Migrate CardHeader to emotion (#24626) @natac13
- &#8203;<!-- 11 -->[TextField] Migrate FilledInput to emotion (#24634) @mnajdova
- &#8203;<!-- 12 -->[Fab] Migrate to emotion (#24618) @natac13
- &#8203;<!-- 14 -->[ClickAwayListener] Fix `children` and `onClickAway` types (#24565) @eps1lon
- &#8203;<!-- 15 -->[List] Migrate ListItemIcon to emotion (#24630) @vicasas
- &#8203;<!-- 17 -->[Card] Migrate CardActionArea to emotion (#24636) @natac13
- &#8203;<!-- 18 -->[DataTable] Add example in docs for data table (#24428) @DanailH
- &#8203;<!-- 19 -->[CircularProgress] Migrate to emotion (#24622) @natac13
- &#8203;<!-- 20 -->[ImageList] Migrate ImageListItemBar to emotion (#24632) @kodai3
- &#8203;<!-- 21 -->[TextField] Migrate Input component to emotion (#24638) @duganbrett
- &#8203;<!-- 22 -->[Tab] Migrate to emotion (#24651) @natac13
- &#8203;<!-- 24 -->[Table] Migrate to emotion (#24657) @natac13
- &#8203;<!-- 25 -->[List] Migrate ListItemAvatar to emotion (#24656) @vicasas
- &#8203;<!-- 26 -->[TextField] Migrate FormControl to emotion (#24659) @duganbrett
- &#8203;<!-- 27 -->[Table] Migrate TableContainer to emotion (#24666) @natac13
- &#8203;<!-- 28 -->[Tab] Migrate TabScrollButton to emotion (#24654) @natac13
- &#8203;<!-- 29 -->[Card] Warn on raised + outlined (#24648) @sumarlidason
- &#8203;<!-- 32 -->[TextField] Migrate FormHelperText to emotion (#24661) @duganbrett
- &#8203;<!-- 33 -->[Dialog] Migrate DialogContent to emotion (#24670) @vicasas
- &#8203;<!-- 36 -->[Typography] Add system props (#24496) @mnajdova
- &#8203;<!-- 38 -->[Paper] Improve warning on invalid combinations of variant and elevation (#24667) @eps1lon
- &#8203;<!-- 39 -->[Chip] Migrate to emotion (#24649) @natac13
- &#8203;<!-- 41 -->[ToggleButton] Migrate to emotion (#24674) @natac13
- &#8203;<!-- 42 -->[Step] Migrate to emotion (#24678) @natac13
- &#8203;<!-- 45 -->[Link] Fix CSS prefix property casing with emotion (#24701) @idanrozin
- &#8203;<!-- 50 -->[Card] Use the default elevation (#24733) @oliviertassinari
- &#8203;<!-- 53 -->[Typography] Remove align inherit noise (#24717) @oliviertassinari
- &#8203;<!-- 56 -->[Dialog] Convert role `none presentation` to `presentation` (#24500) @hallzac2
- &#8203;<!-- 64 -->[TextField] Improve baseline alignment with start adornment (#24742) @praveenkumar-kalidass
- &#8203;<!-- 65 -->[Popper] Fix usage of ownerDocument with anchorEl (#24753) @ruppysuppy
- &#8203;<!-- 75 -->[Table] Migrate TableBody to emotion (#24703) @natac13
- &#8203;<!-- 76 -->[Table] Migrate TableRow to emotion (#24687) @natac13
- &#8203;<!-- 77 -->[TextField] Migrate FormGroup to emotion (#24685) @vicasas
- &#8203;<!-- 82 -->[CssBaseline] Make dark mode scrollbar overrides an optional function (#24780) @dborstelmann
- &#8203;<!-- 83 -->[ButtonGroup] Migrate ButtonGroup to emotion (#24775) @mirefly
- &#8203;<!-- 87 -->[Checkbox] Migrate to emotion (#24702) @natac13
- &#8203;<!-- 89 -->[Table] Migrate TableHead to emotion (#24686) @natac13
- &#8203;<!-- 90 -->[Table] Migrate TableFooter to emotion (#24684) @natac13
- &#8203;<!-- 92 -->[Skeleton] Migrate to emotion (#24652) @kodai3

### `@material-ui/system@5.0.0-alpha.25`

#### Breaking changes

- &#8203;<!-- 78 -->[system] Use spacing unit in `gap`, `rowGap`, and `columnGap` (#24794) @ruppysuppy

  If you were using a number previously, you need to provide the value in `px` to bypass the new transformation with `theme.spacing`. The change was done for consistency with the Grid spacing prop and the other system spacing properties, e.g. `<Box padding={2}>`.

  ```diff
  <Box
  - gap={2}
  + gap="2px"
  >
  ```

### `@material-ui/styled-engine@5.0.0-alpha.25`

- &#8203;<!-- 34 -->[styled-engine] Fix GlobalStyles not to throw when no theme is available (#24671) @mnajdova

### `@material-ui/types@5.0.0-alpha.25`

#### Breaking changes

- &#8203;<!-- 91 -->[types] Rename the exported `Omit` type in `@material-ui/types`. (#24795) @petyosi
  The module is now called `DistributiveOmit`. The change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5. The built-in `Omit`, while similar, is non-distributive. This leads to differences when applied to union types. [See this StackOverflow answer for further details](https://stackoverflow.com/a/57103940/1009797).

```diff
-import { Omit } from '@material-ui/types';
+import { DistributiveOmit } from '@material-ui/types';
```

#### Changes

- &#8203;<!-- 61 -->[types] Remove implicit children from PropInjector (#24746) @eps1lon

### `@material-ui/lab@5.0.0-alpha.25`

- &#8203;<!-- 02 -->[Pickers] Fix role attribute (#24621) @EkaterinaMozheiko
- &#8203;<!-- 35 -->[Pickers] Fix `showTodayButton` not returning the current time (#24650) @anthonyraymond
- &#8203;<!-- 44 -->[Pickers] Ensure components have a display name in DEV (#24676) @eps1lon
- &#8203;<!-- 49 -->[Pickers] Fix more name inconsistencies (#24734) @oliviertassinari
- &#8203;<!-- 54 -->[Pickers] Dismiss on clickaway when using the desktop variant (#24653) @eps1lon
- &#8203;<!-- 69 -->[Pickers] Add missing periods at end of some descriptions (#24791) @fulin426
- &#8203;<!-- 81 -->[Pickers] Enable YearPicker documentation (#24830) @oliviertassinari
- &#8203;<!-- 88 -->[Pickers] Fix useState related console warnings in examples (#24848) @ydubinskyi

### Docs

- &#8203;<!-- 06 -->[docs] Add sorting section (#24637) @dtassone
- &#8203;<!-- 13 -->[docs] Include in docs directive to silence `eslint` erroneous warning (#24644) @silviot
- &#8203;<!-- 23 -->[docs] Clarifying the documentation about Chip behavior (#24645) @KarimOurrai
- &#8203;<!-- 30 -->[docs] Update Typography in migration guide (#24662) @mbrookes
- &#8203;<!-- 37 -->[examples] Update examples to use StyledEngineProvider (#24489) @mnajdova
- &#8203;<!-- 40 -->[docs] Add API documentation for \*DatePicker components (#24655) @eps1lon
- &#8203;<!-- 47 -->[docs] Add HoodieBees to sponsors (#24735) @mbrookes
- &#8203;<!-- 48 -->[docs] Fix indent @oliviertassinari
- &#8203;<!-- 55 -->[docs] Make <main> responsive to font size (#24531) @eps1lon
- &#8203;<!-- 59 -->[docs] Follow similar demo pattern for date and time pickers (#24739) @eps1lon
- &#8203;<!-- 66 -->[docs] Add information about local dev environment (#24771) @plug-n-play
- &#8203;<!-- 67 -->[docs] Add tcespal to Showcase (#24793) @ArnaultNouvel
- &#8203;<!-- 68 -->[docs] Fix CssBaseline typography description (#24802) @xiaoyu-tamu
- &#8203;<!-- 70 -->[docs] Add 'playlist' synonym to 'menu' (#24754) @Lagicrus
- &#8203;<!-- 71 -->[docs] Add more similar icons (#24799) @oliviertassinari
- &#8203;<!-- 72 -->[docs] Fix typo in the error message generated by createMuiTheme (#24827) @mbrookes
- &#8203;<!-- 73 -->[examples] Align more with the v5 recommended approach (#24798) @Tejaswiangotu123
- &#8203;<!-- 74 -->[docs] Update ButtonGroup demos to match v5 (#24797) @SCollinA
- &#8203;<!-- 84 -->[docs] Fix formatting of `mask` prop description (#24842) @eps1lon
- &#8203;<!-- 92 -->[docs] Add read synonym to drafts (#24854) @Lagicrus

### Core

- &#8203;<!-- 01 -->[core] Fix release:tag pushing to material-ui-docs (#24633) @eps1lon
- &#8203;<!-- 16 -->[core] Fix `next` using stale pages (#24635) @eps1lon
- &#8203;<!-- 31 -->[test] Skip JSDOM in style related conformance tests (#24668) @mnajdova
- &#8203;<!-- 43 -->[test] Conformance to handle wrapped elements (#24679) @natac13
- &#8203;<!-- 51 -->[core] Batch small changes (#24705) @oliviertassinari
- &#8203;<!-- 52 -->[test] Run more tests in Strict Mode (#24646) @oliviertassinari
- &#8203;<!-- 57 -->[test] Avoid visual flakiness (#24737) @oliviertassinari
- &#8203;<!-- 60 -->[core] Remove deprecated SimplifiedPropsOf/Simplify types (#24750) @petyosi
- &#8203;<!-- 62 -->[core] Disable type-checking of .propTypes (#24747) @eps1lon
- &#8203;<!-- 63 -->[test] Allow setting react-dist-tag via pipeline parameter (#24755) @eps1lon
- &#8203;<!-- 79 -->[test] Don't run dev CI for dependabot pushes (#24833) @eps1lon
- &#8203;<!-- 80 -->[test] Isolate Tooltip tests more (#24834) @eps1lon
- &#8203;<!-- 85 -->[test] Clear emotion cache between tests (#24837) @eps1lon
- &#8203;<!-- 86 -->[core] Save/restore actual yarn cache folder (#24844) @eps1lon
- &#8203;<!-- 91 -->[test] Increase timeout to 4000ms for screenshots (#24850) @oliviertassinari

All contributors of this release in alphabetical order: @anthonyraymond, @ArnaultNouvel, @DanailH, @dborstelmann, @dtassone, @duganbrett, @EkaterinaMozheiko, @eps1lon, @fulin426, @hallzac2, @idanrozin, @KarimOurrai, @kodai3, @Lagicrus, @mbrookes, @mirefly, @mnajdova, @natac13, @oliviertassinari, @petyosi, @plug-n-play, @praveenkumar-kalidass, @ruppysuppy, @SCollinA, @silviot, @sumarlidason, @Tejaswiangotu123, @vicasas, @xiaoyu-tamu, @ydubinskyi

## 5.0.0-alpha.24

<!-- generated comparing v5.0.0-alpha.23..next -->

_Jan 26, 2021_

A big thanks to the 23 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Convert 31 components to emotion. Around 40% of the components have been migrated so far thanks to the help of the community.
- 🐛 Fix two long-standing issues with the Grid. Solve the horizontal scrollbar as well as dimensions when nesting (#24332) @greguintow.
- 📚 Fix various display issues on API documentation pages (#24526, #24503, #24504. #24517, #24417).
- 📐 Add a subset of the system as flatten props on the CSS utility components (`Grid` and `Box` so far, `Typography` and `Stack` coming later) (#24485, #24499) @mnajdova.

  ```jsx
  <Box m={2}>
  ```

### `@material-ui/core@5.0.0-alpha.24`

- &#8203;<!-- 85 -->[Dialog] Migrate DialogActions to emotion (#24613) @vicasas
- &#8203;<!-- 84 -->[Toolbar] Migrate to emotion (#24567) @natac13
- &#8203;<!-- 83 -->[Hidden] Fix unsupported props warning when sx prop is used (#24624) @mnajdova
- &#8203;<!-- 82 -->[List] Migrate ListItemText to emotion (#24602) @natac13
- &#8203;<!-- 80 -->[List] Migrate ListItemSecondaryAction to emotion (#24593) @xs9627
- &#8203;<!-- 79 -->[BottomNavigation] Migrate to emotion (#24556) @vinyldarkscratch
- &#8203;<!-- 77 -->[CardActions] Fix wrong classes export name (#24609) @mnajdova
- &#8203;<!-- 76 -->[Card] Migrate CardContent to emotion (#24600) @vicasas
- &#8203;<!-- 75 -->[Card] Migrate to emotion (#24597) @povilass
- &#8203;<!-- 74 -->[TextField] Migrate InputBase to emotion (#24555) @duganbrett
- &#8203;<!-- 73 -->[Accordion] Allow to disable gutter/spacing (#24532) @TimonPllkrn
- &#8203;<!-- 72 -->[List] Migrate to emotion (#24560) @vinyldarkscratch
- &#8203;<!-- 71 -->[Card] Migrate CardActions to emotion (#24604) @vicasas
- &#8203;<!-- 69 -->[List] Migrate ListSubheader to emotion (#24561) @vinyldarkscratch
- &#8203;<!-- 68 -->[Breadcrumbs] Migrate to emotion (#24522) @vinyldarkscratch
- &#8203;<!-- 67 -->[Divider] Migrate to emotion (#24558) @vinyldarkscratch
- &#8203;<!-- 66 -->[Switch] Migrate SwitchBase to emotion (#24552) @vinyldarkscratch
- &#8203;<!-- 65 -->[Hidden] Migrate to emotion (#24544) @vinyldarkscratch
- &#8203;<!-- 64 -->[List] Migrate ListItem to emotion (#24543) @xs9627
- &#8203;<!-- 62 -->[TextField] Fix Google Translate zero-width space issue (#24563) @d3mp
- &#8203;<!-- 61 -->[Table] Separate classes for different labels (#24568) @tonysepia
- &#8203;<!-- 58 -->[Accordion] Migrate AccordionSummary to emotion (#24540) @vinyldarkscratch
- &#8203;<!-- 57 -->[IconButton] Migrate to emotion (#24542) @vinyldarkscratch
- &#8203;<!-- 54 -->[Accordion] Migrate AccordionActions to emotion (#24538) @vinyldarkscratch
- &#8203;<!-- 53 -->[Accordion] Migrate AccordionDetails to emotion (#24539) @vinyldarkscratch
- &#8203;<!-- 50 -->[Link] Migrate to emotion (#24529) @praveenkumar-kalidass
- &#8203;<!-- 49 -->[Accordion] Migrate to emotion (#24518) @vinyldarkscratch
- &#8203;<!-- 46 -->[Backdrop] Migrate to emotion (#24523) @vinyldarkscratch
- &#8203;<!-- 39 -->[Grid] Add system props (#24499) @mnajdova
- &#8203;<!-- 38 -->[Icon] Migrate to emotion (#24516) @vinyldarkscratch
- &#8203;<!-- 36 -->[Collapse] Migrate to emotion (#24501) @vinyldarkscratch
- &#8203;<!-- 33 -->[SvgIcon] Migrate to emotion (#24506) @oliviertassinari
- &#8203;<!-- 32 -->[Avatar] Migrate AvatarGroup to emotion (#24452) @praveenkumar-kalidass
- &#8203;<!-- 31 -->[Box] Add back system props (#24485) @mnajdova
- &#8203;<!-- 30 -->[Alert] Migrate AlertTitle to emotion (#24448) @povilass
- &#8203;<!-- 26 -->[Alert] Migrate to emotion (#24442) @kutnickclose
- &#8203;<!-- 21 -->[l10n] Improve Hebrew translation (#24449) @eladmotola
- &#8203;<!-- 19 -->[Checkbox][switch] Document defaultChecked (#24446) @praveenkumar-kalidass
- &#8203;<!-- 18 -->[AppBar] Migrate to emotion (#24439) @povilass
- &#8203;<!-- 16 -->[l10n] Improve German translation (#24436) @lukaselmer
- &#8203;<!-- 15 -->[Button][badge] Support custom colors and sizes (#24408) @mnajdova
- &#8203;<!-- 10 -->[Grid] Fix horizontal scrollbar and nested dimensions (#24332) @greguintow
- &#8203;<!-- 07 -->[Grid] Migrate to emotion (#24395) @mnajdova
- &#8203;<!-- 06 -->[Badge] Fix TS custom variants (#24407) @mnajdova

### `@material-ui/lab@5.0.0-alpha.24`

- &#8203;<!-- 48 -->[DatePicker] Remove unnecessary wrapping dom node (#24533) @mxsph
- &#8203;<!-- 12 -->[DateRangePicker] Remove variant prop override for Textfield (#24433) @praveenkumar-kalidass
- &#8203;<!-- 03 -->[lab] Reflect draft pattern of picker value in implementation (#24367) @eps1lon

### `@material-ui/styled-engine@5.0.0-alpha.24`

- &#8203;<!-- 13 -->[styled-engine] Rename StylesProvider to StyledEngineProvider (#24429) @mnajdova

### `@material-ui/system@5.0.0-alpha.24`

- &#8203;<!-- 44 -->[system] Fix handling of null-ish values (#24530) @oliviertassinari

### `@material-ui/unstyled@5.0.0-alpha.24`

- &#8203;<!-- 08 -->[unstyled] Convert composeClasses to TypeScript (#24396) @eps1lon

### `@material-ui/utils@5.0.0-alpha.24`

- &#8203;<!-- 60 -->[utils] `useEventCallback` `args` defaults to `unknown[]` (#24564) @eps1lon
- &#8203;<!-- 11 -->[utils] Fix requirePropFactory to merge validators (#24423) @mnajdova

### Docs

- &#8203;<!-- 86 -->[examples] Patch preact example not working (#24616)
- &#8203;<!-- 78 -->[docs] Add missing newline in component JSDoc (#24610) @eps1lon
- &#8203;<!-- 70 -->[docs] Add API of picker components (#24497) @eps1lon
- &#8203;<!-- 63 -->[examples] Add `locale` prop to the Nextjs Link component (#24596) @CyanoFresh
- &#8203;<!-- 52 -->[docs] List required props first in /api/\* (#24526) @eps1lon
- &#8203;<!-- 45 -->[docs] Mention the system props when available in the API pages (#24503) @mnajdova
- &#8203;<!-- 43 -->[docs] Improve system properties page (#24524) @mnajdova
- &#8203;<!-- 42 -->[docs] Fix malformed component API description (#24504) @eps1lon
- &#8203;<!-- 41 -->[docs] Fix ToC "Component name" fragment link on /api/\* (#24517) @eps1lon
- &#8203;<!-- 40 -->[docs] Fix ToC on /api pages linking to api-docs (#24515) @eps1lon
- &#8203;<!-- 37 -->[docs] Add comment explaining specificity bump on Select (#24509) @KarimMokhtar
- &#8203;<!-- 28 -->[docs] Compute spreadable from tests (#24490) @eps1lon
- &#8203;<!-- 27 -->[docs] Fix label bug in stepper vertical demo (#24491) @artola
- &#8203;<!-- 20 -->[docs] Update Divjoy URL (#24447) @mbrookes
- &#8203;<!-- 17 -->[docs] Improve packages description (#24330) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Fix content-layout-shift (#24418) @oliviertassinari
- &#8203;<!-- 09 -->[docs] Document default values of external props (#24417) @eps1lon
- &#8203;<!-- 02 -->[docs] Update in-house ads (#24410) @mbrookes @ewldev

### Core

- &#8203;<!-- 87 -->[core] Skip downloading browser binaries in codesandbox/ci (#24628) @eps1lon
- &#8203;<!-- 81 -->[core] Batch small changes (#24599) @oliviertassinari
- &#8203;<!-- 59 -->[test] Simplify DatePicker tests (#24545) @eps1lon
- &#8203;<!-- 51 -->[core] Improve pseudo classes overrides error (#24535) @mnajdova
- &#8203;<!-- 35 -->[core] Fix styleProps to always contain all props (#24505) @mnajdova
- &#8203;<!-- 34 -->[test] Fix AvatarGroup failing test (#24512) @mnajdova
- &#8203;<!-- 29 -->[pickers] Sort tests (#24481) @eps1lon
- &#8203;<!-- 25 -->[test] Split tests in describeConformanceV5 to isolate them (#24479) @mnajdova
- &#8203;<!-- 24 -->[core] Do not forward classes prop by default in experimentalStyled (#24451) @mnajdova
- &#8203;<!-- 23 -->[core] Pass styleProps on all slots in the styled() components (#24454) @mnajdova
- &#8203;<!-- 22 -->[core] Batch small changes (#24445) @oliviertassinari
- &#8203;<!-- 01 -->[core] Normalize generating declaration files (#24411) @eps1lon

All contributors of this release in alphabetical order: @artola, @CyanoFresh, @d3mp, @duganbrett, @eladmotola, @eps1lon, @ewldev, @greguintow, @KarimMokhtar, @kutnickclose, @lukaselmer, @mbrookes, @mnajdova, @mxsph, @natac13, @oliviertassinari, @povilass, @praveenkumar-kalidass, @TimonPllkrn, @tonysepia, @vicasas, @vinyldarkscratch, @xs9627

## 5.0.0-alpha.23

_Jan 14, 2021_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 📚 Only document public paths in module augmentation (#24267) @eps1lon
- 👩‍🎤 Migrate the Paper and CssBaseline to emotion (#24397, #24176) @povilass @mnajdova

  We have reached a point where we feel confident that the new approach should make it to v5 stable. An issue has been created to track the progress with the migration to emotion: #24405. Your contribution to this effort and the ones from the community are welcome 🙌.

- 📅 Various improvements on the date picker components (#24301, #24309, #24275, #24298, #24319) @m4theushw @eps1lon @huzaima @praveenkumar-kalidass
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.23`/`@material-ui/unstyled@v5.0.0-alpha.23`

- [Container] Fix disableGutters style not applied (#24284) @povilass
- [Paper] Migrate to emotion (#24397) @povilass
- [Slider] Allow mobile VO users to interact with Sliders (#23902) @CodySchaaf
- [SwipeableDrawer] Add bleeding demo (#24268) @vicasas
- [SwipeableDrawer] Fix overflow scroll computation logic (#24225) @yann120
- [Table] Fix "more than" translation in es-ES (#24356) @vicasas
- [TextField] Fix error color for form input with secondary color (#24290) @praveenkumar-kalidass
- [Button] Fix resolution of default props (#24253) @oliviertassinari

### `@material-ui/lab@v5.0.0-alpha.23`

#### Breaking changes

- [DateRangePicker] Remove DateRangDelimiter (#24298) @huzaima

  You can migrate away from it with:

  ```diff
  diff --git a/docs/src/pages/components/date-range-picker/BasicDateRangePicker.tsx b/docs/src/pages/components/date-range-picker/BasicDateRangePicker.tsx
  index 72a89f9a11..2742fa6811 100644
  --- a/docs/src/pages/components/date-range-picker/BasicDateRangePicker.tsx
  +++ b/docs/src/pages/components/date-range-picker/BasicDateRangePicker.tsx
  @@ -3,7 +3,7 @@ import TextField from '@material-ui/core/TextField';
  import DateRangePicker, { DateRange } from '@material-ui/lab/DateRangePicker';
  import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
  import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
  -import DateRangeDelimiter from '@material-ui/lab/DateRangeDelimiter';
  +import Box from '@material-ui/core/Box';

  export default function BasicDateRangePicker() {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  @@ -20,7 +20,7 @@ export default function BasicDateRangePicker() {
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} variant="standard" />
  -            <DateRangeDelimiter> to </DateRangeDelimiter>
  +            <Box sx={{ mx: 2 }}>to</Box>
              <TextField {...endProps} variant="standard" />
            </React.Fragment>
          )}
  ```

#### Changes

- [DatePicker] Fix out of range month selection (#24301) @m4theushw
- [DatePicker] Replace withDefaultProps with useThemeProps (#24309) @m4theushw
- [DatePicker] Simplify ExtendWrapper type (#24275) @eps1lon
- [DatePicker] Reduce coupling of parsing picker input value and props (#24319) @eps1lon
- [TimePicker] Add pointer cursor for clock in desktop (#24276) @praveenkumar-kalidass
- [lab] Drop usage of createStyles (#24158) @eps1lon
- [lab] Fix import paths in generated declaration files (#24380) @eps1lon
- [lab] Prevent possible null pointer in useValidation (#24318) @eps1lon

### `@material-ui/styled-engine@v5.0.0-alpha.23`/`@material-ui/styled-engine-sc@v5.0.0-alpha.23`

- [styled-engine] Add `GlobalStyles` component (#24176) @mnajdova

### Docs

- [docs] Add example performance Stepper vertical (#24292) @vicasas
- [docs] Change Link example from JS to TS (#24291) @vicasas
- [docs] Do not show 'Add' if user input matches existing option (#24333) @ramdog
- [docs] Focus docs search input when the shortcut is clicked (#24296) @eps1lon
- [docs] Further template the CSS API descriptions (#24360) @mbrookes
- [docs] Improve Next.js Link integration (#24258) @oliviertassinari
- [docs] Misc API fixes (#24357) @mbrookes
- [docs] Prevent kbd to wrap (#24269) @oliviertassinari
- [docs] Simplify icon button docs (#24317) @baharalidurrani
- [docs] Standardize some API descriptions (#24274) @mbrookes
- [docs] Sync AppSearch.tsx with AppSearch.js (#24363) @Lagicrus
- [docs] Update CONTRIBUTING being accepted (#24306) @vicasas
- [docs] Update right to left compatibility plugin version (#24370) @mnajdova
- [docs] Widen example datetime-local picker so it's not clipped (#24324) @ramdog
- [website] Add BrandingFooter (#24095) @mnajdova
- [website] Add Discover more (#24327) @oliviertassinari
- [website] Add newsletter (#24322) @oliviertassinari
- [website] Fix regressions @oliviertassinari
- [website] Improve typography theme (#24386) @oliviertassinari

### Core

- [core] Create issue labeled (#24283) @xrkffgg
- [core] Fix eslint @oliviertassinari
- [core] Skip downloading browser binaries when building docs (#24393) @eps1lon
- [core] Small changes (#24329) @oliviertassinari
- [core] Support public paths in module augmentation (#24267) @eps1lon
- [core] Update classes generation logic (#24371) @mnajdova
- [core] Update issue mark duplicate (#24311) @xrkffgg
- [core] Update issues helper version (#24379) @xrkffgg
- [test] Add pipeline task for performance monitoring (#24289) @eps1lon
- [test] Compensate for Circle CI's low performance (#24358) @oliviertassinari
- [test] Debug expensive GH actions still runing for l10nbot (#24392) @eps1lon
- [test] Move callback args to right side of assertion (#24366) @eps1lon
- [test] Persist new declaration files in CI cache (#24313) @eps1lon
- [test] Reduce download times of playwright binaries (#24364) @eps1lon
- [test] Skip expensive GitHub actions on l10nbot commits (#24303) @eps1lon
- [test] Test declaration files in TS nightly (#24391) @eps1lon
- [styles] Define useThemeProps as unstable and fix TS issues (#24383) @mnajdova

## 5.0.0-alpha.22

_Jan 4, 2021_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- ♿️ Fix major accessibility issue with the Autocomplete (#24213) @inform880
- 👩‍🎤 Migrate the Container to emotion (#24227) @oliviertassinari
- 🐛 Fix Next.js regression and other cross-platform issues with the build (#24200, #24223)
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.22`/`@material-ui/unstyled@v5.0.0-alpha.22`

- [Autocomplete] Fix VoiceOver not reading the correct activedescendant (#24213) @inform880
- [Autocomplete] Warn when value is invalid (#24202) @Sandeep0695
- [Button] Fix disableElevation regression (#24251) @oliviertassinari
- [Container] Migrate to emotion (#24227) @oliviertassinari
- [Pagination] Fix className forwarding when type is ellipsis (#24256) @andrelmlins
- [Select] Improve description on how it extends the Input components (#24180) @azza85
- [styled] Fix missing types for `sx` (#24211) @mnajdova
- [styled] Remove unused type parameters from StyledOptions (#24255) @eps1lon
- [styled] Support components without theme (#24214) @mnajdova
- [styles] Fix classes logic (#24250) @oliviertassinari
- [styles] Improve the classes structure (#24249) @oliviertassinari

### `@material-ui/lab@v5.0.0-alpha.22`

- [DatePicker] Fix year only view, hide the current month (#24205) @hyeonhong
- [DatePicker] Nested imports for better DX (#24147) @oliviertassinari
- [DatePicker] Remove unused type parameters (#24257) @eps1lon
- [TimePicker] Prevent conflicting type parameter in `ClockProps#getClockLabelText` (#24193) @eps1lon

### Docs

- [docs] Accept pages written in TypeScript (#24230) @oliviertassinari
- [docs] Document emotion migration breaking changes (#24229) @luminaxster
- [docs] Fix broken benchmark link (#24210) @jalaj-k
- [docs] Fix codesandbox datagrid demo (#24218) @brno32
- [docs] Fix iframe demos with emotion (#24232) @oliviertassinari
- [docs] Sync translations (#24161) @l10nbot

### Core

- [test] More granular progress tracking of relative type imports (#24233) @eps1lon
- [core] Add missing sx typings on the components migrated to emotion (#24208) @mnajdova
- [core] Batch small changes (#24224) @oliviertassinari
- [core] Create issue mark duplicate (#24184) @xrkffgg
- [core] Fix generation of package.json (#24223) @oliviertassinari
- [core] Fix relative import of types (#24248) @oliviertassinari
- [core] Platform agnostic build script for envinfo (#24200) @eps1lon
- [core] Remove unused generics from experimentalStyled (#24192) @eps1lon

## 5.0.0-alpha.21

_Dec 30, 2020_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Migrate the Avatar to emotion (#24114) @oliviertassinari
- 👩‍🎤 Migrate the Button to emotion (#24107, #24100) @mnajdova
- ♿️ Improve TrapFocus behavior, ignore the container as a tabbable element (#23364) @gregnb
  In rare cases, an element might not longer be tabbable when looping, e.g. overflow container in Firefox.
  You can work around the problem by adding a `tabIndex={0}` or customizing the `getTabbable` prop.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.21`/`@material-ui/unstyled@v5.0.0-alpha.21`

- [Avatar] Migrate to emotion (#24114) @oliviertassinari
- [ButtonBase] Migrate styles to emotion (#24100) @mnajdova
- [Button] Migrate styles to emotion (#24107) @mnajdova
- [unstyled] Add utils for generating utility classes (#24126) @mnajdova
- [TrapFocus] Fix trap to only focus on tabbable elements (#23364) @gregnb
- [Link] Improve integration with Next.js (#24121) @kelvinsanchez15
- [Select] Fix overflow showing scrollbar (#24085) @Segebre
- [Slider] Fix circular type reference in SliderValueLabel (#24190) @eps1lon
- [Skeleton] Fix default TypeScript component type (#24191) @eps1lon

### `@material-ui/system@v5.0.0-alpha.21`

- [system] Fix sx prop typings to support grid gap props (#24093) @mnajdova
- [system] Improve the SxProp typings structure, by splitting them in a separate module. (#24090) @mnajdova
- [system] Replace grid gap properties (#24094) @mnajdova

### `@material-ui/lab@v5.0.0-alpha.21`

- [DatePicker] Allow to customize icons (#24017) @jackcwu
- [DatePicker] Fix missing component for theme augmentation (#24092) @rajzik
- [DatePicker] Hide outline on container (#24108) @oliviertassinari
- [DatePicker] Fix accessibility issue with heading (#24183) @gracektay
- [TimePicker] Improve the design to fit on smaller screens (#23855) @marianayap
- [TreeView] Add preventScroll for tree focus (#24105) @praveenkumar-kalidass

### `@material-ui/styles@v5.0.0-alpha.21`

- [styles] Fix for supporting non string props in propsToClassKey (#24101) @mnajdova

### `@material-ui/styled-engine@v5.0.0-alpha.21`/`@material-ui/styled-engine-sc@v5.0.0-alpha.21`

- [styled-engine] Fix StylesProvider injectFirst with sc (#24104) @mnajdova

### Docs

- [docs] Add examples for adding and removing Typography variants (#24088) @mnajdova
- [docs] Fix typo (#24123) @ajonp
- [docs] Fix warning about wrong prop type (#24117) @mnajdova
- [docs] Rename "Customization > Theme > Global" to "Customization > Theme > Components" (#24115) @mnajdova
- [docs] Rename customization/components to customization/how-to-customize (#24089) @mnajdova
- [docs] Replace process.browser with typeof navigator (#24122) @softshipper
- [docs] Sync translations (#24152) @l10nbot
- [docs] Update Fontsource install instructions (#24120) @DecliningLotus
- [docs] Add system grid page (#24119) @mnajdova
- [blog] 2020 in review and beyond (#24130) @oliviertassinari
- [docs] Improve naming and structure of the Customization and Guide pages (#24175) @mnajdova

### Core

- [core] Batch small changes (#24131) @oliviertassinari
- [core] Fix overridesResolver on the core components and added tests (#24125) @mnajdova
- [core] Reduce number of files included in language server (#24165) @eps1lon
- [core] Reduce response time of initial PR bot comment (#24168) @eps1lon
- [core] Refactor styled() components to ease out the migration process (#24124) @mnajdova
- [test] Add more packages to browser test suite (#24155) @eps1lon
- [core] Monitor progress of fixing type imports (#24188) @eps1lon
- [core] Fix build on Windows (#24187) @oliviertassinari

## 5.0.0-alpha.20

_Dec 21, 2020_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Migrate the Typography to emotion (#23841) @DanailH

  This change allows to add typography variants in the theme and to use them directly:

  ```jsx
  const theme = createMuiTheme({
    typography: {
      poster: {
        color: 'red',
      },
    },
  });
  <Typography variant="poster">poster</Typography>;
  ```

  [A full demo](https://codesandbox.io/s/fontsizetheme-material-demo-forked-l9u05?file=/demo.tsx:725-773)

- 📚 Add a shortcut to open the Algolia search (#23959) @hmaddisb.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.20`/`@material-ui/unstyled@v5.0.0-alpha.20`

#### Breaking changes

- [CssBaseline] Change body font size to body1 (1rem) (#24018) @mbrookes

  The new default matches the variant used by the Typography component. To return to the previous size, you can override it in the theme:

  ```js
  const theme = createMuiTheme({
    typography: {
      body1: {
        fontSize: '0.875rem',
      },
    },
  });
  ```

#### Changes

- [Badge] Fix the classes description to reflect the correct component (#24035) @mnajdova
- [Select] Fix aria-describedby attribute (#24027) @HVish
- [Skeleton] Fix Circle border radius on Safari (#24054) @anatolzak
- [Slider][badge] Fix classes prop not working (#24034) @mnajdova
- [Typography] Migrate styles to emotion (#23841) @DanailH

### `@material-ui/styled-engine@v5.0.0-alpha.20`/`@material-ui/styled-engine-sc@v5.0.0-alpha.20`

- [styled-engine] Add name and slot options (#23964) @mnajdova
- [styled-engine] Add StylesProvider with injectFirst option (#23934) @mnajdova

### `@material-ui/system@v5.0.0-alpha.20`

- [system] Fix transform not firing when theme provided (#24010) @ZovcIfzm

### Docs

- [docs] Add a shortcut to access the search bar (#23959) @hmaddisb
- [docs] Animate component's mounting and unmounting (#24049) @cjoecker
- [docs] Fix collapse API docs description of 'hidden' style condition (#24053) @jaiwanth-v
- [docs] Improve color demo snippet spacing (#24009) @yukinoda
- [docs] Improve displayed versions (#24051) @oliviertassinari
- [docs] Show a better file on codesandbox (#24052) @oliviertassinari
- [docs] Update customization/components and customization/global pages (#24016) @mnajdova
- [docs] Update the CSS injection guide (#24020) @mnajdova

### Core

- [core] Batch small changes (#24038) @oliviertassinari
- [core] Track size of /unstyled (#24021) @eps1lon
- [core] Use consistent naming scheme for ttp annotations (#24022) @eps1lon

## 5.0.0-alpha.19

_Dec 13, 2020_

A big thanks to the 24 contributors who made this release possible. Here are some highlights ✨:

- 👩‍🎤 Migrate the Badge to emotion (#23745) @mnajdova.
- 🌏 Add infrastructure to translate the API pages (#23852) @mbrookes.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.19`

#### Breaking changes

- [Icon][svgicon] Change default fontSize from default to medium (#23950) @mbrookes

  The default value of `fontSize` was changed from `default` to `medium` for consistency.
  In the unlikey event that you were using the value `default`, the prop can be removed:

  ```diff
  -<SvgIcon fontSize="default">{iconPath}</SvgIcon>
  +<SvgIcon>{iconPath}</SvgIcon>
  ```

- [TextField] Add size prop for outlined and filled input (#23832) @mayralgr

  Rename `marginDense` and `inputMarginDense` classes to `sizeSmall` and `inputSizeSmall` to match the prop.

#### Changes

- [Autocomplete] Document onChange last `details` param (#23942) @natac13
- [Autocomplete] Fix useAutocomplete groupedOptions type (#23854) @ZachCMP
- [Autocomplete] Improve DX/UX when getOptionLabel is not configured correctly (#23884) @marianayap
- [Autocomplete] Improve getOptionSelected description (#23817) @smartshivkat
- [Badge] Create unstyled component & move to emotion (#23745) @mnajdova
- [Grid] Improve support for nested grid (#23913) @gbrochar
- [Grid] Fix side effects when direction="column" and xs={} is used (#23900) @Kai-W
- [Select] Fix description, value is not required (#23940) @natac13
- [Slider] Remove color prop in unstyled (#23840) @mnajdova
- [Slider] Replaced inlined isHostComponent with the utils (#23880) @mnajdova
- [SwipeableDrawer] Refactor internals (#23944) @eps1lon
- [TextField] Add documentation for hidden label (#23915) @Fredestrik
- [TextField] Fix the color leak of the textbox (#23912) @szabgab
- [useMediaQuery] Fix a false return at the first call (#23806) @marthaerm
- [utils] Fix minified errors throwing with \_formatMuiErrorMessage (#23828) @eps1lon

### `@material-ui/unstyled@v5.0.0-alpha.19`

- [core] Use Lerna to publish (#23793) @oliviertassinari

### `@material-ui/system@v5.0.0-alpha.19`

#### Breaking changes

- [system] Move visually hidden helper to utils (#23974) @eps1lon

  Only applies if you've installed v5.0.0-alpha.1

  ```diff
  -import { visuallyHidden } from '@material-ui/system';
  +import { visuallyHidden } from '@material-ui/utils';
  ```

#### Changes

- [core] Use Lerna to publish (#23793) @oliviertassinari

### `@material-ui/lab@v5.0.0-alpha.19`

- [core] Use Lerna to publish (#23793) @oliviertassinari

### `@material-ui/utils@v5.0.0-alpha.19`

- [core] Use Lerna to publish (#23793) @oliviertassinari

### `@material-ui/styles@v5.0.0-alpha.19`

- [core] Use Lerna to publish (#23793) @oliviertassinari

### Docs

- [example] Change Box to new sx prop (#23937) @natac13
- [example] Explain package choice (#23938, #23958) @mnajdova
- [example] Update nextjs examples to fix hydration (#23936) @mnajdova
- [docs] Add API tradeoff section for the sx prop (#23962) @mnajdova
- [docs] Add ELEVATOR to backers (#23977) @mbrookes
- [docs] Add eslint rule to docs (#23843) @jens-ox
- [docs] Add infrastructure to translate API pages (#23852) @mbrookes
- [docs] Add link to the sx docs page in the API description (#23967) @mnajdova
- [docs] Add prepend option on emotion caches to allow JSS style overrides (#23892) @mnajdova
- [docs] Add Vercel deploy config (#23910) @eps1lon
- [docs] Allow codesandbox deploy for demos in X (#23644) @oliviertassinari
- [docs] Copy icons to clipboard (#23850) @CodeWithGuruji
- [docs] Fix breakpoints typos (#23893) @mnajdova
- [docs] Fix color contrast of code within links (#23819) @eps1lon
- [docs] Fix duplicated styles generated from emotion (#23809) @mnajdova
- [docs] Fix icon alignment in /components/breadcrumbs (#23818) @eps1lon
- [docs] Fix production deploy (#23963) @eps1lon
- [docs] Fix source on Github links (#23821) @praveenkumar-kalidass
- [docs] Fix StickyHeaderTable round borders (#23882) @antoniopacheco
- [docs] Fix typo in date picker dayjs adapter name (#23935) @andresmrm
- [docs] Improve system properties page (#23961) @mnajdova
- [docs] Link module augmentation in TypeScript @oliviertassinari
- [docs] Make stable width of localization example (#23820) @sujinleeme
- [docs] Mention Adobe XD (#23978) @oliviertassinari
- [docs] Prefer system shorthands (#23970) @oliviertassinari
- [docs] Remove 'TODO' comment from buildApi script (#23973) @mbrookes
- [docs] Sync translations (#23742, #23842) @l10nbot
- [docs] Update Badge examples to use Box instead of makeStyles (#23927) @mnajdova

### Core

- [test] Add conformance tests for testing the `theme.components` options for the v5 components (#23896) @mnajdova
- [test] Include type path mappings in language server (#23905) @eps1lon
- [test] Make Popper tests StrictMode agnostic (#23838) @eps1lon
- [test] Run benchmarks in Azure Pipelines when approved (#23895) @eps1lon
- [test] Skip tests with cascading network requests (#23823) @eps1lon
- [core] All packages are published from /build (#23886) @oliviertassinari
- [core] Batch small changes (#23853) @oliviertassinari
- [core] Fix failing CI on HEAD (#23947) @oliviertassinari
- [core] Force LF for text files (#23932) @eps1lon
- [core] Improve envinfo instructions (#23918) @eps1lon
- [core] Replace fs-extra deprecated function (exists) (#23848) @leonardopliski
- [core] Use Lerna to publish (#23793) @oliviertassinari
- [core] Use playwright instead of puppeteer (#23906) @eps1lon
- [core] Add envinfo --json flag (#23883) @eps1lon
- [core] Ask for output from envinfo in issues (#23881) @eps1lon

## 5.0.0-alpha.18

_Dec 3, 2020_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- Fix most of the issues with the system (#23716, #23635, #23737, #23733, #23700, #23688) @mnajdova.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.18`

#### Breaking changes

- [Box] Remove deprecated props (#23716) @mnajdova
  All props are now available under the `sx` prop. A deprecation will be landing in v4.
  Thanks to @mbrookes developers can automate the migration with a [codemod](https://github.com/mui/material-ui/blob/next/packages/mui-codemod/README.md#box-sx-prop).

  ```diff
  -<Box p={2} bgColor="primary.main">
  +<Box sx={{ p: 2, bgColor: 'primary.main' }}>
  ```

#### Changes

- [Autocomplete] Add ability to override key down events handlers (#23487) @hessaam
- [Autocomplete] Better isolate test case (#23704) @oliviertassinari
- [Autocomplete] Fix highlight change event (#23718) @TakumaKira
- [Box] Fix TypeScript issue when component prop is used (#23686) @mnajdova
- [experimentalStyled] Make sx style fn optional (#23714) @mnajdova
- [l10n] Improve Brazilian (pt-BR) locale (#23707) @m4rcelofs
- [l10n] Improve Korean (ko-KR) locale (#23794) @sujinleeme
- [Select] Add disabled attribute in input element when disabled (#23778) @praveenkumar-kalidass
- [Switch] Add preventDefault check for state change (#23786) @praveenkumar-kalidass
- [Tabs] Remove duplicate styles (#23561) @cmfcmf

### `@material-ui/system@v5.0.0-alpha.18`

- [system] Allow values to use shorter string when the prop name is contained in the value (#23635) @mnajdova
- [system] Another round of perf improvements (#23737) @mnajdova
- [system] Fix transform return value to support CSSObject (#23733) @mnajdova
- [system] Make borderRadius multiply a theme's design token (#23700) @mnajdova
- [system] Various perf gain experiments (#23688) @mnajdova

### `@material-ui/styles@v5.0.0-alpha.18`

- [styles] Small performance gain (#23749) @oliviertassinari
- [styles] Update mergeClasses types to more closely match its implementation (#23705) @etrepum

### `@material-ui/utils@v5.0.0-alpha.18`

- [system] Another round of perf improvements (#23737) @mnajdova

### `@material-ui/lab@v5.0.0-alpha.18`

- [DatePicker] Found one prop that was renamed (#23676) @oliviertassinari
- [DateRangePicker] Allow same date selection (#23701) @hmaddisb

### `@material-ui/styled-engine@v5.0.0-alpha.18`/`@material-ui/styled-engine-sc@v5.0.0-alpha.18`

- [styled-engine] Fix tagged template syntax with multiple expressions (#23269) @eps1lon

### Docs

- [docs] Add settings panel to allow system mode (#23722) @mbrookes
- [docs] Add v5 peer dependencies in README (#23751) @johnrichardrinehart
- [docs] Document using codesandbox-ci (#23800) @brorlarsnicklas
- [docs] Fix link name for canadacasino (#23799) @eps1lon
- [docs] Fix various a11y issues reported by lighthouse (#23791) @eps1lon
- [docs] Improve prop descriptions (#23723) @oliviertassinari
- [docs] Improve SEO structure (#23748) @oliviertassinari
- [docs] Improve settings toggle button styling (#23754) @mbrookes
- [docs] Misc fixes (#23756) @mbrookes
- [docs] Move instructions for starting the docs earlier in the file (#23801) @brorlarsnicklas
- [docs] Prepare v5.0.0-alpha.17 (#23680) @oliviertassinari
- [docs] Remove unused abstraction (#23724) @oliviertassinari
- [docs] Sync translations (#23682) @l10nbot

### Core

- [benchmark] Improve printed results (#23729) @oliviertassinari
- [benchmark] Test styleFunctionSx vs. @styled-system/css (#23702) @mnajdova
- [benchmark] Update with latest (#23694) @oliviertassinari
- [core] Batch small changes (#23678) @oliviertassinari
- [core] Fix ci @oliviertassinari
- [core] Fix error handling on upload (#23734) @eps1lon
- [core] Fully clear composite TypeScript project state (#23805) @eps1lon
- [core] Remove unused classes (#23473) @jens-ox
- [test] Add conformance test suite for v5 (#23798) @mnajdova
- [test] Cleanup skipped tests (#23732) @eps1lon
- [test] Misc improvements to experimental and browser test runner (#23699) @eps1lon
- [test] Stay busy until document.fonts is ready (#23736) @eps1lon

## 5.0.0-alpha.17

_Nov 23, 2020_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 📚 Improve the IntelliSense support for the `sx` prop (#23599) @mnajdova.
  You should now get a description for each property of the system. For instance with `mx`:

  ![system TypeScript](https://user-images.githubusercontent.com/3165635/99920493-20f60a00-2d24-11eb-8748-c5dd7fe85cbd.png)

- 💅 Migrate the first core component to the v5 styling architecture (#23308) @mnajdova.
  We have spent the last few months iterating on the new styling approach in the lab, and are confident enough in the new approach to move it to the core, so we have migrated the Slider. We will wait a week or two to collect feedback on it, before scaling it to the rest of the codebase.
- 📅 Fix the first few issues on the date picker components since the migration in the lab.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.17`

#### Breaking changes

- [Slider] Migrate to emotion (#23308) @mnajdova

  By default, emotion injects its style after JSS, this breaks the computed styles. In order to get the correct CSS injection order until all the components are migrated, you need to wrap the root of your application with:

  ```jsx
  import * as React from 'react';
  import ReactDOM from 'react-dom';
  import { StylesProvider } from '@material-ui/core';
  import App from './App';

  ReactDOM.render(
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>,
    document.querySelector('#root'),
  );
  ```

  This enforces emotion being injected first. [More details](https://mui.com/guides/interoperability/#css-injection-order) in the documentation.

- [Autocomplete] Rename `closeIcon` prop with `clearIcon` to avoid confusion (#23617) @akhilmhdh.

  ```diff
  -<Autocomplete closeIcon={icon} />
  +<Autocomplete clearIcon={icon} />
  ```

- [Dialog] Remove the `disableBackdropClick` prop. It's redundant with the `reason` argument (#23607) @eps1lon.

  ```diff
  <Dialog
  - disableBackdropClick
  - onClose={handleClose}
  + onClose={(event, reason) => {
  +   if (reason !== 'backdropClick') {
  +     onClose(event, reason);
  +   }
  + }}
  />
  ```

- [Modal] Remove the `disableBackdropClick` prop. It's redundant with the `reason` argument (#23607) @eps1lon.

  ```diff
  <Modal
  - disableBackdropClick
  - onClose={handleClose}
  + onClose={(event, reason) => {
  +   if (reason !== 'backdropClick') {
  +     onClose(event, reason);
  +   }
  + }}
  />
  ```

- [Modal] Remove the `onEscapeKeyDown` prop. It's redundant with the `reason` argument. (#23571) @eps1lon

  ```diff
  <Modal
  -  onEscapeKeyDown={handleEscapeKeyDown}
  +  onClose={(event, reason) => {
  +    if (reason === "escapeKeyDown") {
  +      handleEscapeKeyDown(event);
  +    }
  +  }}
  />;
  ```

#### Changes

- [CircularProgress][linearprogress] Change components from div to span (#23587) @bruno-azzi
- [Grid] Improve warning when a prop is missing (#23630) @udayRedI
- [Icon] Allow customizing the 'material-icons' base class name (#23613) @rart
- [Select] Fix focus() call on ref (#23302) @reedanders
- [Slider] Add test case for triggering a specific value (#23642) @Thehambalamba
- [Slider] General cleanup and add classes prop for unstyled (#23569) @mnajdova
- [styles] Add support for TypeScript 4.1 (#23633) @eps1lon

### `@material-ui/codemod@v5.0.0-alpha.17`

- [codemod] Add moved-lab-modules (#23588) @eps1lon
  This codemod is part of our effort to make the migration from v4 to v5 as painless as possible.

### `@material-ui/utils@v5.0.0-alpha.17`

- [Grid] Improve warning when a prop is missing (#23630) @udayRedI

### `@material-ui/system@v5.0.0-alpha.17`

- [system] Improve the `sx` prop IntelliSense (#23599) @mnajdova

### `@material-ui/unstyled@v5.0.0-alpha.17`

- [Slider] Replace core Slider with SliderStyled (#23308) @mnajdova

### `@material-ui/lab@v5.0.0-alpha.17`

#### Breaking changes

- [DatePicker] Change the import path of the date adapters (#23568) @eps1lon.
  It better fits with the current import convention.

  ```diff
  -import AdapterDateFns from '@material-ui/lab/dateAdapter/date-fns';
  +import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
  ```

#### Changes

- [DatePicker] Add missing exports (#23621) @havgry
- [DatePicker] Add missing TypeScript definitions (#23560) @mbrookes
- [DatePicker] Fix false-positive when validating mask in Safari (#23602) @eps1lon
- [DatePicker] Fix missing manifest for typescript packages (#23564) @eps1lon
- [TimePicker] Prevent scroll when interacting with the clock (#23563) @knightss27

### Docs

- [docs] Add advanced page for the system (#23596) @mnajdova
- [docs] Add docs for typography in system (#23510) @oliviertassinari
- [docs] API pages i18n (#23214) @mbrookes
- [docs] Create pickers migration guide (#23605) @dmtrKovalenko
- [docs] Enable TS language service for docs/src (#23576) @eps1lon
- [docs] Explain the information listed on the system properties page (#23566) @mnajdova
- [docs] Fix /api client-side routing (#23586) @eps1lon
- [docs] Fix the Box section title on migration-v4 guide (#23679) @claudioldf
- [docs] Generate default values for docs from the unstyled components (#23614) @mnajdova
- [docs] Increase printWidth from 80 to 85(#23512) @eps1lon
- [docs] Prevent layout jumps from img loading in system demo (#23504) @eps1lon
- [docs] Remove controlled Tooltip example in Slider (#23625) @micsidoruk
- [docs] Remove dead demos in the system basics page (#23565) @mnajdova
- [docs] Replace emotion-server packages with @emotion/server (#23557) @numToStr
- [docs] Sync translations (#23648) @l10nbot

### Core

- [core] Add support for TypeScript 4.1 (#23633) @eps1lon
- [core] Batch small changes (#23554) @oliviertassinari
- [core] Cleanup emotion dependencies (#23556) @eps1lon
- [core] Fix formatting (#23567) @eps1lon
- [core] Fix tracked component size regression (#23516) @eps1lon
- [core] Fix transpilation target of UMD bundle (#23618) @eps1lon
- [test] Create chunks for Argos (#23518) @oliviertassinari
- [test] Debug argos-cli upload failures (#23623) @eps1lon
- [test] Enable experimental-timezone tests (#23595) @eps1lon
- [test] Misc visual regression flakiness improvements (#23619) @eps1lon
- [test] Use playwright instead of vrtest (#23500) @eps1lon

## 5.0.0-alpha.16

_Nov 14, 2020_

A big thanks to the 34 contributors who made this release possible. Here are some highlights ✨:

- 📅 Migrate the date picker to the lab (#22692) @dmtrKovalenko.
  We have integrated the components with the code infrastructure. Next we will migrate all the GitHub issues from [material-ui-pickers](https://github.com/mui/material-ui-pickers) and archive the repository. This migration will help provide first-class support for the date picker components. The component will stay in the lab as long as necessary to reach the high quality bar we have for core components. You can find the [new documentation here](https://mui.com/components/pickers/).

  While the source code is currently hosted in the [main repository](https://github.com/mui/material-ui), we might move it to the [x repository](https://github.com/mui/mui-x) in the future, depending on what is easier for the commercial date range picker. The date picker will stay open source no matter what.

- 📚 Revamp the documentation for [the system](https://mui.com/system/basics/). The System contains CSS utilities. The documentation now promotes the use of the `sx` prop. It's ideal for adding one-off styles, e.g. padding, but when pushed to its limits, it can be used to implement quickly a complete page.
- 👩‍🎨 Upgrade emotion to v11 (#23007) @mnajdova.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.16`

#### Breaking changes

- [TextField] Change default variant from standard to outlined (#23503) @mbrookes
  Standard has been removed from the Material Design guidelines. [This codemod](https://github.com/mui/material-ui/tree/next/packages/mui-codemod#variant-prop) will automatically update your code.

  ```diff
  -<TextField value="Standard" />
  -<TextField value="Outlined" variant="outlined" />
  +<TextField value="Standard" variant="standard" />
  +<TextField value="Outlined" />
  ```

- [Autocomplete] Remove `debug` in favor of `open` and dev tools (#23377) @eps1lon
  There are a couple of simpler alternatives: `open={true}`, Chrome devtools ["Emulate focused"](https://twitter.com/sulco/status/1305841873945272321), or React devtools props.

#### Changes

- [Autocomplete] Use Popper when `disablePortal` (#23263) @eps1lon
- [Box] Better DX for deprecated props (#23285) @eps1lon
- [codemod] Add a codemod for the Box sx prop (#23465) @mbrookes
- [CssBaseline] Add dark mode scrollbar support (#23407) @mmmols
- [Slider] Extract slots as standalone components (#22893) @mnajdova
- [Stepper] Fix the icon prop support in StepLabel (#23408) @randyshoopman
- [theme] Add htmlFontSize to Typography interface (#23412) @fergusmcdonald
- [Tooltip] Fix PopperProps popper modifiers not being merged properly (#23421) @dominique-mueller
- [Tooltip] Long press select text on iOS (#23466) @hmaddisb
- [Tooltip] Unexpected behaviour onOpen/onClose (#23482) @brorlarsnicklas

### `@material-ui/lab@v5.0.0-alpha.16`

- [DatePicker] Migrate to the lab #22692 @dmtrKovalenko

### `@material-ui/system@v5.0.0-alpha.16`

- [system] Add typography prop that will pull from theme.typography (#23451) @mnajdova
- [system] Create separate margin and padding functions (#23452) @mnajdova
- [system] Export styleFunctionSx and improve signature (#23397) @mnajdova
- [system] Merge breakpoints in correct order (#23380) @mnajdova
- [system] Remove css utility in favor of sx (#23454) @mnajdova
- [system] Warn for spacing when non integer value is used with theme.spacing array (#23460) @mnajdova

### `@material-ui/styled-engine@v5.0.0-alpha.16`

- [styled-engine] Upgrade emotion to 11 RC (#23007) @mnajdova

### `@material-ui/unstyled@v5.0.0-alpha.16`

- [Slider] Extract slots as standalone components (#22893) @mnajdova

### `@material-ui/codemod@v5.0.0-alpha.16`

- [TextField] Change default variant from standard to outlined (#23503) @mbrookes

### Docs

- [docs] Allow to host code in a different repo (#23390) @oliviertassinari
- [docs] CHANGELOG for v5.0.0-alpha.15 (#23383) @oliviertassinari
- [docs] Fix examples download URLs to match the correct branch name (#23467) @matchatype
- [docs] Fix links being opened when dismissing context menus (#23491) @eps1lon
- [docs] Fix the Netlify proxy for localization of X (#23387) @oliviertassinari
- [docs] Fix usage of palette.type instead of palette.mode in docs (#23414) @hubgit
- [docs] Improve documentation of the system (#23294) @mnajdova
- [docs] Improve feedback a11y (#23459) @eps1lon
- [docs] Improve formatting of the system (#23509) @oliviertassinari
- [docs] Improve migration guide for theme.palette (#23416) @hubgit
- [docs] Mention delay instead of transition twice (#23393) @benmneb
- [docs] Prepare Material-UI X (#1893) @oliviertassinari
- [docs] Redirect legacy GridList pages to ImageList (#23456) @eps1lon
- [docs] Remove redundant aria-label when wrapped in Tooltip (#23455) @eps1lon
- [docs] Sync translations (#23316) @l10nbot
- [docs] Update buildAPI script to handle the "styled" components (#23370) @mnajdova
- [docs] Update new components in the roadmap (#23507) @mbrookes
- [docs] Update translations (#23501) @l10nbot

### Core

- [core] Batch small changes (#23422) @oliviertassinari
- [core] Fix skipped ignore patterns (#23474) @eps1lon
- [core] Switch to globby and fast-glob (#23382) @eps1lon
- [test] Increase timeout threshold for slow Firefox tests (#23463) @eps1lon
- [test] Make sure system properties are in the same order when generating CSS (#23388) @mnajdova
- [test] Prefer longhand properties (#23445) @eps1lon
- [test] Remove data-mui-test from tests (#23498) @eps1lon
- [test] Remove keyDown#force (#23488) @eps1lon
- [test] Use adapter instead of native Date (#23475) @eps1lon
- [test] Use fake timers in visual regression tests (#23464) @eps1lon

## 5.0.0-alpha.15

_Nov 4, 2020_

A big thanks to the 20 contributors who made this release possible. Here are some highlights ✨:

- ⚛️ Add support for React 17 (#23311) @eps1lon.
  React 17 release is unusual because it doesn't add any new developer-facing features. It was released a couple of days ago. You can learn more about it in the [introduction post](https://reactjs.org/blog/2020/10/20/react-v17.html). Material-UI now supports `^16.8.0 || ^17.0.0`.
- 🛠 Introduce a new `@material-ui/unstyled` package (#23270) @mnajdova.
  This package will host the unstyled version of the components. In this first iteration, only the Slider is available. You can find it documented under the [same page](https://mui.com/components/slider-styled/#unstyled-slider) as the styled version.

  **Why an unstyled package?**

  While engineering teams are successfully building custom design systems by wrapping Material-UI, we [occasionally hear](https://github.com/mui/material-ui/issues/6218) that Material Design or our styling solution are something they don't need. Some teams prefer SASS, others prefer to customize the components starting from a pristine state. What all these teams have in common is that they value the features coming from the components, such as accessibility.

  The unstyled package goes one step down in the abstraction layer, providing more flexibility. Angular Material introduced this approach two years ago. Today their unstyled components account for [25% of the usage](https://npm-stat.com/charts.html?package=%40angular%2Fmaterial&package=%40angular%2Fcdk&from=2017-11-03&to=2020-11-03).

  Another reason for introducing this package is to prepare the groundwork for a [second theme](https://github.com/mui/material-ui/issues/22485) (not Material Design based).

  A note on the terminology: "unstyled" means that the components have the same API as the "styled" components but come without CSS. Material-UI also contains "headless" components that exposes a hook API, e.g. [useAutocomplete](https://mui.com/components/autocomplete/#useautocomplete) or [usePagination](https://mui.com/components/pagination/#usepagination).

  This change is part of our strategy to iterate on the v5 architecture with the `Slider` first. In the next alpha release, we plan to replace the v4 slider with the v5 slider. Once the new approach is stress-tested and validated, we will roll it out to all the components.

- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.15`

#### Breaking changes

- [AppBar] Fix z-index when position="static" (#23325) @sujinleeme
  Remove z-index when position static and relative
- [theme] Fix error message for augmentColor failure (#23371) @reedanders
  The signature of `theme.palette.augmentColor` helper has changed:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

#### Changes

- [Autocomplete] Fix unclickable area between text input and endAdornment (#23229) @sujinleeme
- [Autocomplete] Follow Material Design State spec (#23323) @sujinleeme
- [Avatar] Fix usage of srcset property (#23286) @matheuspiment
- [ClickAwayListener] Fix mounting behavior in Portals in React 17 (#23315) @eps1lon
- [core] Allow React 17 (#23311) @eps1lon
- [Icon] Fix translation, e.g Google Translate (#23237) @cbeltrangomez84
- [LinearProgress] Fix Safari's bug during composition of different paint (#23293) @montogeek
- [Radio] Fix dot misalignment in Safari (#23239) @anasufana
- [styled-engine] Fix tagged template syntax with multiple expressions (#23269) @eps1lon
- [Table] Fix empty row logic when displaying all (#23280) @JoaoJesus94
- [Table] Fix handling of rowsPerPage={-1} (#23299) @JoaoJesus94
- [TextareaAutosize] Fix container with no intrinsic height (#23273) @sujinleeme
- [TextField] Fix disabled color in Safari (#23375) @Morteza-Jenabzadeh
- [theme] Fix spacing string arguments (#23224) @GuilleDF
- [Tooltip] Fix excess spacing (#23233) @benneq

### `@material-ui/unstyled@v5.0.0-alpha.15`

- [unstyled] Create package and move SliderUnstyled there (#23270) @mnajdova
- [core] Allow React 17 (#23311) @eps1lon

### `@material-ui/lab@v5.0.0-alpha.15`

- [lab] Migrate Timeline to TypeScript (#23242) @oliviertassinari
- [core] Allow React 17 (#23311) @eps1lon

### `@material-ui/icons@v5.0.0-alpha.15`

- [core] Allow React 17 (#23311) @eps1lon

### `@material-ui/styles@v5.0.0-alpha.15`

- [core] Allow React 17 (#23311) @eps1lon

### `@material-ui/system@v5.0.0-alpha.15`

- [core] Allow React 17 (#23311) @eps1lon
- [theme] Fix spacing string arguments (#23224) @GuilleDF

### Docs

- [Transition] Document default appear value (#23221) @GuilleDF
- [blog] Danail Hadjiatanasov joins Material-UI (#23223) @oliviertassinari
- [docs] Add Material-UI Builder to in-house ads (#23342) @mbrookes
- [docs] Fix a few typos and add comma (#23284) @reedanders
- [docs] Fix few propTypes in Inputs (#23331) @youknowhat
- [docs] Fix language cookie (#23324) @mbrookes
- [docs] Fix typo in `README.md` (#23329) @mtsknn
- [docs] Guard against unknown value in userLanguage cookie (#23336) @mbrookes
- [docs] Make it clearer that custom router is supported (#23304) @Maxgit3
- [docs] Sync translations (#23080) @l10nbot
- [docs] Update homepage quotes (#23326) @mbrookes
- [docs] Update nav translations (#23234) @mbrookes
- [docs] Update system pages to use sx prop instead of deprecated Box props (#23368) @mnajdova
- [docs] Use present tense for bool prop descriptions (#23274) @mbrookes

### Core

- [utils] Add all @material-ui/core/utils to @material-ui/utils (#23264) @mnajdova
- [core] Batch small changes (#23327) @oliviertassinari
- [core] Fix implicit transitive 'csstype' dependency (#23301) @quinnturner
- [core] Move material-ui-benchmark into benchmark/server (#23271) @eps1lon
- [core] Replace temp package with node built-ins (#23262) @eps1lon
- [core] Restrict top level imports that target CJS modules (#23159) @eps1lon
- [test] Fix unexpected console warn/error spy swallowing unrelated messages (#23312) @eps1lon
- [test] Fix various issues with the new cli on windows (#23381) @eps1lon
- [test] Improve test debugging (#23372) @eps1lon
- [test] Introduce experimental CLI (#23369) @eps1lon
- [test] Prevent growing call stack in custom keyDown/keyUp (#23321) @eps1lon
- [test] Run with Safari 13 (#23292) @eps1lon

## 5.0.0-alpha.14

_Oct 23, 2020_

A big thanks to the 23 contributors who made this release possible.
Here are some highlights ✨:

- 💄 Introduce a new `sx` prop (#23053, #23205) @mnajdova
  We have resumed the work on Material-UI System. This is made possible by the latest progress on the new styling solution of v5.
  You can read the [introduction blog post](https://medium.com/material-ui/introducing-material-ui-design-system-93e921beb8df) that we did for the system two years ago.

  The system is meant to solve the following problems:

  1. Naming things is hard. How should a class name, JSS style rule, or styled component be named?
  2. Jumping between JS and CSS in the editor wastes time. This is particularly true as the complexity (LOCs/# of elements) of a component increases. It's still true when using the `styled()` API.
  3. Introducing a `makeStyles` for the first time in a component is daunting. For example, it's why https://github.com/vscodeshift/material-ui-codemorphs#add-usestyles-hook exists. What if we had less code to type, gaining velocity when writing styles?
  4. Pulling values out from the theme can be cumbersome. How can we make it less painful to increase the usage of design tokens?

  This new iteration of the system brings two major improvements:

  - It moves from the support of a subset of CSS to the support of a superset of CSS.
    Learning the shorthand is optional. It's no longer necessary to moving back to styled() when the system doesn't support a specific CSS property.
  - It moves from support on Box only to any core component (starting with the slider).

    ```jsx
    import Slider from '@material-ui/lab/SliderStyled';

    // Set the primary color and a vertical margin of 16px on desktop.
    <Slider sx={{ color: 'primary.main', my: { xs: 0, md: 2 } }} />;
    ```

- ✨ Upgrade Popper.js from v1 to v2 (#21761) @joshwooding
  The change reduces the bundle size (-1 kB gzipped) while fixing bugs at the same time.

- 🐛 Fix broken nested imports with the icons package (#23157) @eps1lon
  The revamp of the bundling strategy in #22814 has broken the nested imports.
  Imports such as the one below should work again with this release:

  ```jsx
  import CloseIcon from '@material-ui/icons/Close';
  ```

- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.14`

#### Breaking changes

- [Popper] Upgrade to popper.js to v2 (#21761) @joshwooding
  This third-party library has introduced a lot of changes.<br />
  You can read [their migration guide](https://popper.js.org/docs/v2/migration-guide/) or the following summary:

  - The CSS prefixes have changed:

    ```diff
    popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] $arrow': {
    + '&[data-popper-placement*="bottom"] $arrow': {
    ```

  - Method names have changed.

    ```diff
    -popperRef.current.scheduleUpdate()
    +popperRef.current.update()
    ```

    ```diff
    -popperRef.current.update()
    +popperRef.current.forceUpdate()
    ```

  - Modifiers' API has changed a lot. There are too many changes to be covered here.

- [withMobileDialog] Remove this higher-order component (#23202) @RDIL
  The hook API allows a simpler and more flexible solution than the HOC:

  ```diff
  -import withMobileDialog from '@material-ui/core/withMobileDialog';
  +import { useTheme, useMediaQuery } from '@material-ui/core';

  function ResponsiveDialog(props) {
  - const { fullScreen } = props;
  + const theme = useTheme();
  + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

  // ...

  -export default withMobileDialog()(ResponsiveDialog);
  +export default ResponsiveDialog;
  ```

#### Changes

- [Box] Add sx prop (#23053) @mnajdova
- [Box] Deprecate system props (#23206) @mnajdova
- [Card] Use flex display for CardHeader.avatar (#23169) @mordechaim
- [Container] Fix support of custom breakpoint units (#23191) @espipj
- [Container] Revert max-width change for xs @oliviertassinari
- [InputBase] Use ref prop instead of inputRef prop on input component (#23174) @GuilleDF
- [l10n] Add Kazakh (kz-KZ) locale (#23195) @abdulgafur24
- [Rating] Ensure hover and click are in sync (#23117) @redbmk
- [Select] Fix SelectDisplayProps className concat (#23211) @reedanders

### `@material-ui/styled-engine@v5.0.0-alpha.14`

- [styled] Add @babel/runtime dependency (#23175) @koistya

### `@material-ui/system@v5.0.0-alpha.14`

- [Box] Add sx prop (#23053) @mnajdova
- [core] Fix bundles for packages without subpackages (#23157) @eps1lon

### `@material-ui/icons@v5.0.0-alpha.14`

- [core] Fix bundles for packages without subpackages (#23157) @eps1lon

### `@material-ui/lab@v5.0.0-alpha.14`

#### Breaking changes

- [AvatarGroup] Move from lab to core (#23121) @mbrookes
  Move the component from the lab to the core. This component will become stable.

  ```diff
  -import AvatarGroup from '@material-ui/lab/AvatarGroup';
  +import AvatarGroup from '@material-ui/core/AvatarGroup';
  ```

#### Changes

- [Slider] Add sx prop in SliderStyled (#23205) @mnajdova

### `@material-ui/utils@v5.0.0-alpha.14`

- [utils] Fix types of chainPropTypes (#23123) @oliviertassinari
- [core] Fix bundles for packages without subpackages (#23157) @eps1lon

### `@material-ui/types@v5.2.0-alpha.14`

- [types] Add LICENSE files (#23162) @lielfr

### Docs

- [examples] Remove reason example project (#23158) @mnajdova
- [examples] Update cdn example to use @material-ui/core@next (#23153) @mnajdova
- [examples] Update preact to use the @material-ui/core@next (#23154) @mnajdova
- [examples] Update ssr example to use @material-ui/core@next (#23155) @mnajdova
- [examples] Updated nextjs-typescript example to use @material-ui/core@next (#23119) @numToStr
- [docs] Add Menu component example with explicit positioning prop values (#23167) @jaebradley
- [docs] Add page feedback (#22885) @mbrookes
- [docs] Add Performance section for Modal (#23168) @jaebradley
- [docs] Better document CardActionArea (#23196) @el1f
- [docs] Cleaner image of font-size equation (#23189) @CamDavidsonPilon
- [docs] Fix casing typo (#23148) @piperchester
- [docs] Fix typo in steppers (#23163) @AGDholo
- [docs] Fix typo on interoperability page (#23177) @SassNinja
- [docs] Improve migration v5 guide @oliviertassinari
- [docs] Lazy load demo toolbar (#23108) @eps1lon
- [docs] Remove unused style selectors `extendedIcon` (#23160) @MatejKastak
- [docs] Use Box sx prop on all Slider examples #23217 @mnajdova

### Core

- [benchmark] Add theme-ui and chakra-ui Box scenarios (#23180) @mnajdova
- [benchmark] Create separate workspace (#23209) @eps1lon
- [benchmark] Extracted Profiler & added output in readme (#23178) @mnajdova
- [core] Batch small changes (#23116) @oliviertassinari
- [core] Improve bundle size comment (#23110) @eps1lon
- [core] Prevent unstable chunks in size snapshot (#23181) @eps1lon

## 5.0.0-alpha.13

_Oct 17, 2020_

A big thanks to the 25 contributors who made this release possible.
Here are some highlights ✨:

- 📦 Ship modern bundle (#22814) @eps1lon.
  This is a significant update to the [browsers supported](https://mui.com/getting-started/supported-platforms/) by Material-UI.
  The previous policy was defined 2 years ago, and the landscape has evolved since then. The package now includes 4 bundles:

  1. `stable` (default, formerly `esm`) which targets a snapshot (on release) of `> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11"`
  2. `node` (formerly default) which targets a snapshot (on release) of `maintained node versions`
  3. `legacy` (new) which is `stable` + IE11
  4. `modern` (formerly `es`) which targets the last 1 version of evergreen browsers and active node (currently that is 14

  The change yields a 6% reduction in bundle size 📦 (Babel only).
  In the coming weeks, we will refactor the internals to take advantage of the new browser capabilities that dropping these older platforms allows. For instance, we might be able to remove the span we render inside the `<Button>` to work around [Flexbug #9](https://github.com/philipwalton/flexbugs/blob/master/README.md#flexbug-9).

  Check the updated [Supported platforms documentation](https://mui.com/getting-started/supported-platforms/) and [new "minimizing bundle size" guide](https://mui.com/guides/minimizing-bundle-size/).

  If you target IE11, you need to use the new bundle (`legacy`). We are treating IE11 as a second class-citizen, which is a continuation of the direction taken in #22873.

- 🚀 Improve the internal benchmark suite (#22923, #23058) @mnajdova.
  This was a prerequisite step to improve the [system](https://mui.com/system/basics/). We needed to be able to measure performance. After #22945, we have measured that the `Box` component is x3 faster in v5-alpha compared to v4.
- ✏️ A new blog post: [Q3 2020 Update](https://mui.com/blog/2020-q3-update/) (#23055) @oliviertassinari.
- 🐙 Migrate more tests to react-testing-library @deiga, @Morteza-Jenabzadeh, @nicholas-l.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.13`

#### Breaking changes

- [core] Ship modern bundle (#22814) @eps1lon

#### Change

- [Autocomplete] Fix autoHighlight synchronization (#23025) @Tubaleviao
- [Autocomplete] Ignore keydown event until IME is confirmed (#23050) @jiggum
- [Card] Fix action area hover style on touch devices (#23079) @giulianovarriale
- [Slider] Align value label text center (#23075) @LorenzHenk
- [SwipeableDrawer] Decorrelate swipeAreaWidth and initial jumping amount (#23042) @omidtajik
- [Tooltip] Fix followCursor preventing onMouseMove on children (#23104) @eps1lon
- [Tooltip] Refactor event handling (#23092) @eps1lon
- [theme] Add missing types for theme overrides (#23028) @povilass
- [l10n] Add Arabic (ar_EG) locale (#23006) @GoldenWings

### `@material-ui/lab@v5.0.0-alpha.13`

- [TreeView] Fix bundle size link and refactor array spreads (#22992) @joshwooding
- [TreeView] Fix `alpha` color utility instead of deprecated `fade` (#22978) @joshwooding
- [core] Ship modern bundle (#22814) @eps1lon

### `@material-ui/utils@v5.0.0-alpha.13`

- [core] Ship modern bundle (#22814) @eps1lon

### `@material-ui/system@v5.0.0-alpha.13`

- [core] Ship modern bundle (#22814) @eps1lon

### `@material-ui/styles@v5.0.0-alpha.13`

- [core] Ship modern bundle (#22814) @eps1lon

### `@material-ui/styled-engine@v5.0.0-alpha.13`

- [core] Ship modern bundle (#22814) @eps1lon

### `@material-ui/styled-engine-sc@v5.0.0-alpha.13`

- [core] Ship modern bundle (#22814) @eps1lon

### `@material-ui/icons@v5.0.0-alpha.13`

- [core] Ship modern bundle (#22814) @eps1lon

### Docs

- [blog] Allow to support card preview (#23087) @oliviertassinari
- [blog] Q3 2020 Update (#23055) @oliviertassinari
- [docs] Add a new demo to the showcase (#22949) @adonig
- [docs] Add demo for Link underline (#23074) @LorenzHenk
- [docs] Add logarithmic slider demo (#23076) @LorenzHenk
- [docs] Add react-admin in related projects page (#23097) @fzaninotto
- [docs] Change color to palette (#23046) @mockingjet
- [docs] Don't suggest putting a Switch inside a ListItemSecondaryAction (#23018) @sirlantis
- [docs] Fix docs:dev (#23023) @eps1lon
- [docs] Fix vertical alignment of Slider demo (#23059) @r0zar
- [docs] Fix wrong variable characters (#23066) @AGDholo
- [docs] Improve docs for Table sticky column grouping (#23100) @andre-silva-14
- [docs] Improve icon preview color contrast (#22974) @oliviertassinari
- [docs] Interoperability guide updates (#23030) @mnajdova
- [docs] Move outdated versions into a collapsible section (#23029) @NoNamePro0
- [docs] Point to material-ui-x/next instead of master @oliviertassinari
- [docs] Restore ButtonBases images (#23083) @eps1lon
- [docs] Slider demos clean up (#22964) @mnajdova
- [docs] Sync translations (#22888) @l10nbot
- [examples] Update gatsby example to use @material-ui/\* next (#23089) @mnajdova
- [examples] Update gatsby-theme example to use @material-ui/\* next #23093 @mnajdova
- [examples] Update nextjs example project to use @material-ui/\* next (#23094) @mnajdova

### Core

- [benchmark] Add browser benchmark (#22923) @mnajdova
- [benchmark] Fix benchmark scripts & moved scenarios to correct benchmark project (#23058) @mnajdova
- [test] Enable failing unexpected console warn|error in browser tests (#23063) @eps1lon
- [test] Fail each test on unexpected console logs in test:unit (#23064) @eps1lon
- [test] Introduce toHaveInlineStyle and toHaveComputedStyle matcher (#23054) @eps1lon
- [test] Migrate ButtonBase to react-testing-library (#23011) @deiga
- [test] Migrate IconButton to react-testing-library (#22972) @Morteza-Jenabzadeh
- [test] Migrate InputBase to react-testing-library (#23014) @deiga
- [test] Migrate SpeedDial to react-testing-library (#23021) @nicholas-l
- [test] Migrate TableCell to react-testing-library (#23095) @nicholas-l
- [test] Migrate TableRow to react-testing-library (#23105) @deiga
- [test] Move some work out of evaluation phase (#23112) @eps1lon
- [test] Supress 404 img warnings in browser tests (#23106) @eps1lon
- [test] Throw on console.(error|warn) outside of test (#22907) @eps1lon
- [test] Use dot reporter in CI (#23026) @eps1lon
- [core] Add support for iOS Safari 12 (#23068) @eps1lon
- [core] Also format dot files & folders (#22975) @oliviertassinari
- [core] Extend yarn size:why (#22979) @eps1lon
- [core] Fix react-next test (#23027) @oliviertassinari
- [core] Lint CSS (#22976) @oliviertassinari
- [core] Misc modules/\* cleanup (#22983) @eps1lon

## 5.0.0-alpha.12

_Oct 11, 2020_

A big thanks to the 45 contributors who made this release possible.
Here are some highlights ✨:

- 🧪 The promotion of 4 components from the lab to core: Autocomplete, Pagination, SpeedDial, and ToggleButton. These components have been in the lab for more than 10 months @mbrookes.
- 📦 Switch the style engine of the `Box` component from JSS to _@material-ui/styled-engine_ (use emotion by default) (#22945) @mnajdova.
  The early benchmark we have run shows that performance has improved. We will share more detailed results in #21657.
- 🐙 Migrate a large portion of the tests from enzyme to react-testing-library @eladmotola, @baterson, @bewong89, @devrasec, @guillermaster, @itamar244, @jeferson-sb, @The24thDS.
  Last month, react-testing-library had [more downloads](https://npm-stat.com/charts.html?package=enzyme&package=%40testing-library%2Freact&from=2019-10-10&to=2020-10-10) than enzyme in the ecosystem!
- 🏷 Add support for tooltips [following the cursor](https://mui.com/components/tooltips/#follow-cursor) (#22876) @xtrixia.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.12`

#### Breaking changes

- [Accordion] Remove `display:flex` from AccordionDetails (#22809) @croraf
  The style was too opinionated. Most developers expect `display: block`.
- [Accordion] Replace IconButton wrapper with div (#22817) @croraf
  Remove IconButtonProps prop from AccordionSummary.
  The component renders a `<div>` element instead of an IconButton.
  The prop is no longer relevant.
- [Box] Add mui styled usage (#22945) @mnajdova
  Change the style-engine powering the Box component from JSS to the style engine adatper (emotion by default).
- [CircularProgress] Drop IE11 wobbly workaround (#22873) @suliskh
  The IE11 workaround is harming performance on the latest browsers.
  This change is part of a best-effort strategy to keep IE11 support.
  We are degrading the UX and DX with IE11 where we can improve the components on modern browsers.
- [Table] Rename onChangeRowsPerPage and onChangePage (#22900) @eladmotola
  The change was done to match the API convention.

  ```diff
  <TablePagination
  - onChangeRowsPerPage={()=>{}}
  - onChangePage={()=>{}}
  + onRowsPerPageChange={()=>{}}
  + onPageChange={()=>{}}
  ```

- [theme] Rename fade to alpha (#22834) @mnajdova
  Better describe its functionality. The previous name was leading to confusion when the input color already had an alpha value. The helper **overrides** the alpha value of the color.

  ```diff
  - import { fade } from '@material-ui/core/styles';
  + import { alpha } from '@material-ui/core/styles';

  const classes = makeStyles(theme => ({
  -  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  +  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }));
  ```

- [Tooltip] Make `interactive` default (#22382) @eps1lon
  The previous default behavior failed [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus).
  To reflect the new default value, the prop was renamed to `disableInteractive`.
  If you want to restore the old behavior (thus not reaching level AA), you can apply the following diff:

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>
  # Interactive tooltips no longer need the `interactive` prop.
  -<Tooltip interactive>
  +<Tooltip>
  ```

#### Changes

- [Accordion] Remove incorrect demo which nests input in button (#22898) @croraf
- [Autocomplete] Fix filtering when value is already selected (#22935) @montelius
- [Autocomplete] Fix virtualization example in IE11 (#22940) @bearfromtheabyss
- [Autocomplete] Restrict component props in `renderInput` (#22789) @eps1lon
- [Box] Add types for `ref` (#22927) @lcswillems
- [Button] Fix invalid type value (#22883) @oliviertassinari
- [Button] Improve loading transition (#22884) @oliviertassinari
- [Grid] Clarify document about direction column limitation (#22871) @ThewBear
- [IconButton] Improve warning against non root onClick listeners (#22821) @pranjanpr
- [Popper] Use placement viewport instead of window (#22748) @maksimgm
- [Select] Add generic support for value (#22839) @AntoineGrandchamp
- [Skeleton] Fix importing with named export (#22879) @0prodigy
- [SpeedDial] Fix keyboard navigation when uncontrolled (#22826) @akharkhonov
- [styled] Specify emotion & styled-components as optional peer dependencies (#22808) @mnajdova
- [styled] Support default theme when none is available (#22791) @mnajdova
- [Tabs] Fix RTL scrollbar with Chrome 85 (#22830) @ankit
- [TextField] Pass minRows to InputComponent (#22831) @suliskh
- [ToggleButton] Fix vertical double border (#22825) @Avi98
- [ToggleButton] Match ToggleButtonGroup name and render function name (#22790) @jjoselv
- [Tooltip] Add placement `followCursor` (#22876) @xtrixia
- [Tooltip] Improve docs and warning for custom children (#22775) @brorlarsnicklas
- [Tooltip] Use label semantics (#22729) @eps1lon
- [useAutocomplete] Fix getXProps functions type (#22749) @kentaro84207

### `@material-ui/styled-engine@v5.0.0-alpha.12`

- [styled] Support default theme when none is available (#22791) @mnajdova

### `@material-ui/lab@v5.0.0-alpha.12`

#### Breaking changes

- [Autocomplete] Move from lab to core (#22715) @mbrookes
  Move the component from the lab to the core. This component will become stable.

  ```diff
  -import Autocomplete from '@material-ui/lab/Autocomplete';
  -import useAutocomplete from '@material-ui/lab/useAutocomplete';
  +import Autocomplete from '@material-ui/core/Autocomplete';
  +import useAutocomplete from '@material-ui/core/useAutocomplete';
  ```

- [Pagination] Move from lab to core (#22848) @mbrookes
  Move the component from the lab to the core. This component will become stable.

  ```diff
  -import Pagination from '@material-ui/lab/Pagination';
  -import PaginationItem from '@material-ui/lab/PaginationItem';
  -import { usePagination } from '@material-ui/lab/Pagination';
  +import Pagination from '@material-ui/core/Pagination';
  +import PaginationItem from '@material-ui/core/PaginationItem';
  +import usePagination from '@material-ui/core/usePagination';
  ```

- [SpeedDial] Move from lab to core (#22743) @mbrookes
  Move the component from the lab to the core. This component will become stable.

  ```diff
  -import SpeedDial from '@material-ui/lab/SpeedDial';
  -import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
  -import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
  +import SpeedDial from '@material-ui/core/SpeedDial';
  +import SpeedDialAction from '@material-ui/core/SpeedDialAction';
  +import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
  ```

- [ToggleButton] Move from lab to core (#22784) @mbrookes
  Move the component from the lab to the core. This component will become stable.

  ```diff
  -import ToggleButton from '@material-ui/lab/ToggleButton';
  -import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
  +import ToggleButton from '@material-ui/core/ToggleButton';
  +import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
  ```

- [TreeView] Improve customization of tree item (#22846) @joshwooding
  Remove `onLabelClick` and `onIconClick`.

#### Changes

- [AvatarGroup] Add variant prop (#22832) @hjades
- [SliderStyled] Fix mark label alignment on coarse pointer devices (#22849) @joshwooding

### Docs

- [docs] Add example for using styled-components as styled-engine (#22788) @mnajdova
- [docs] Add longhand system API props to docs (#22796) @possibilities
- [docs] Box & system cleanup (#22962) @mnajdova
- [docs] CONTRIBUTING.md only yarn is supported (#22754) @Yashvirani
- [docs] Document createSvgIcon() (#22843) @mbrookes
- [docs] Document inherited props (#22318) @oliviertassinari
- [docs] Document LoadingButton behavior (#22878) @eps1lon
- [docs] Fix dark theme for input field on autocomplete (#22711) @GauravKesarwani
- [docs] Fix material icon search details view (#22793) @skr571999
- [docs] Fix type vs. mode and capitalization of createMuiTheme (#22844) @joshwooding
- [docs] Fix typo in guides/typescript (#22806) @croraf
- [docs] Fix various typos (#22842) @kkirsche
- [docs] For non-SSR language, internal search fall back to English (#22902) @bicstone
- [docs] Improve CRA example (#22967) @spursbyte
- [docs] Improve FormControl duplication warning (#22823) @talgautb
- [docs] Improve perf when opening the drawer (#22781) @eps1lon
- [docs] Improve SEO on titles (#22742) @oliviertassinari
- [docs] Improve the left side-nav (#22780) @oliviertassinari
- [docs] Include peer deps in installation steps (#22889) @numToStr
- [docs] Link all the examples in docs (#22891) @Avi98
- [docs] More robust description matcher (#22836) @eps1lon
- [docs] Reduce risk of 404 when changing the default branch (#22801) @eps1lon
- [docs] Resolve .tsx first (#22315) @oliviertassinari
- [docs] Simplify locales example (#22747) @mbrookes
- [docs] Sync translations (#22752, #22851) @l10nbot
- [docs] Update installation guide to contain peer dependencies (#22787) @mnajdova
- [docs] Update ToggleButton import (#22971) @mbrookes
- [docs] Use demo name as codesandbox name (#22926) @eps1lon

### Core

- [benchmark] Add cross-env to fix window run issue (#22895) @mnajdova
- [core] Batch small changes (#22746) @oliviertassinari
- [core] Batch small changes (#22847) @oliviertassinari
- [core] Drop babel-plugin-transform-dev-warning (#22802) @eps1lon
- [core] Misc dependency fixes (#22909) @eps1lon
- [test] Apply lazy forwardRef fix (#22904) @eps1lon
- [test] Autocomplete drop "defaultProps" pattern (#22896) @eps1lon
- [test] Fix react-next patch (#22800) @eps1lon
- [test] Migrate Accordion to react-testing-library (#22952) @bewong89
- [test] Migrate Backdrop to react-testing-library (#22931) @itamar244
- [test] Migrate Container to react-testing-library (#22919) @eladmotola
- [test] Migrate CssBaseline to react-testing-library (#22920) @eladmotola
- [test] Migrate Fab to react-testing-library (#22959) @The24thDS
- [test] Migrate Fade to react-testing-library (#22918) @eladmotola
- [test] Migrate Grow to react-testing-library (#22917) @eladmotola
- [test] Migrate List to react-testing-library (#22929) @eladmotola
- [test] Migrate MenuList and ImageListItem to react-testing-library (#22958) @eladmotola
- [test] Migrate MobileStepper to react-testing-library (#22963) @devrasec
- [test] Migrate more components to react-testing-library (#22872) @baterson
- [test] Migrate more components to react-testing-library (#22874) @baterson
- [test] Migrate more components to react-testing-library (#22892) @baterson
- [test] Migrate NativeSelect to react-testing-library (#22970) @guillermaster
- [test] Migrate NativeSelectInput to react-testing-library (#22910) @baterson
- [test] Migrate RadioGroup to react-testing-library (#22953) @eladmotola
- [test] Migrate Slide to react-testing-library (#22913) @eladmotola
- [test] Migrate SpeedDialIcon to react-testing-library (#22965) @jeferson-sb
- [test] Migrate TabIndicator to react-testing-library (#22906) @eladmotola
- [test] Migrate TextField to react-testing-library (#22944) @The24thDS
- [test] Migrate useTheme,withTheme to react-testing-library (#22928) @eladmotola
- [test] Migrate Zoom to react-testing-library (#22914) @eladmotola
- [test] Prevent nextjs build cache to grow indefinitely (#22948) @eps1lon
- [test] Simplify usage of `yarn mocha` (#22899) @eps1lon
- [test] Solve 2000ms timeout (#22778) @oliviertassinari
- [test] Update react next patch (#22890) @eps1lon
- [test] Use appropriate templates for csb CI (#22943) @eps1lon
- [test] Verbose reporter in CI (#22924) @eps1lon

## 5.0.0-alpha.11

_Sep 26, 2020_

A big thanks to the 29 contributors who made this release possible.
Here are some highlights ✨:

- 👩‍🎨 A first iteration on the new styling solution.

  You can find a [new version](https://mui.com/components/slider-styled/) of the slider in the lab powered by [emotion](https://emotion.sh/).

  In the event that you are already using styled-components in your application, you can swap emotion for styled-components 💅. Check [this CodeSandbox](https://codesandbox.io/s/sliderstyled-with-styled-components-forked-olc27?file=/package.json) for a demo. It relies on aliases to prevent any bundle size overhead.

  The new styling solution saves 2kB gzipped in the bundle compared to JSS, and about 14 kB gzipped if you were already using emotion or styled-components.

  Last but not least, the change allows us to take advantage dynamic style props. We will use them for dynamic color props, variant props, and new style props (an improved [system](https://mui.com/system/basics/)).

  This change has been in our roadmap for more than a year.
  We announced it in the [v4 release blog post](https://mui.com/blog/material-ui-v4-is-out/) as a direction v5 would take.

- 🛠 A first iteration on the unstyled components.

  You can find a [new version](https://mui.com/components/slider-styled/#UnstyledSlider.tsx) of the slider in the lab without any styles.
  The unstyled component weighs 6.5 kB gzipped, compared with 26 kB for the styled version when used standalone. The component is best suited for use when you want to fully customize the look of the component without reimplementing the JavaScript and accessibility logic.

- ⚡️ A first alpha of the [DataGrid](https://mui.com/components/data-grid/) component.

  It has taken 6 months of development since the initial commit (March 15th, 2020) to make the first alpha release of the grid. The component comes in two versions:
  @material-ui/data-grid is licensed under MIT, while @material-ui/x-grid is licensed under a commercial license.

- 🪓 Keep working on the breaking changes.

  We aim to complete most of the breaking changes during the alpha stage of v5.
  We will move to beta once all the breaking changes we have anticipated are handled.
  As always, you should find a clear and simple upgrade path for each of them.
  You can learn more about the breaking changes left to be done in #22700.

- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.11`

#### Breaking changes

- [Chip] Rename `default` variant to `filled` (#22683) @mnajdova
  Rename `default` variant to `filled` for consistency.

  ```diff
  -<Chip variant="default">
  +<Chip variant="filled">
  ```

- [Tabs] Add allowScrollButtonsMobile prop for mobile view (#22700) @GauravKesarwani
  The API that controls the scroll buttons has been split it into two props:

  - The `scrollButtons` prop controls when the scroll buttons are displayed depending on the space available.
  - The `allowScrollButtonsMobile` prop removes the CSS media query that systematically hides the scroll buttons on mobile.

  ```diff
  -<Tabs scrollButtons="on" />
  -<Tabs scrollButtons="desktop" />
  -<Tabs scrollButtons="off" />
  +<Tabs scrollButtons allowScrollButtonsMobile />
  +<Tabs scrollButtons />
  +<Tabs scrollButtons={false} />
  ```

- [theme] Improve breakpoints definitions (#22695) @mnajdova
  Breakpoints are now treated as values instead of ranges.
  The behavior of `down(key)` was changed to define media query less than the value defined with the corresponding breakpoint (exclusive).
  The behavior of `between(start, end)` was also updated to define media query for the values between the actual values of start (inclusive) and end (exclusive).

  Find examples of the changes required defined below:

```diff
-theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
+theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
```

```diff
-theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, md + 1) => [sm, lg)
+theme.breakpoints.between('sm', 'lg') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, lg)
```

- [theme] Rename `type` to `mode` (#22687) @mnajdova
  Renames `theme.palette.type` to `theme.palette.mode`, to better follow the "dark mode" term that is usually used for describing this feature.

  ```diff
  import { createMuiTheme } from '@material-ui/core/styles';

  -const theme = createMuiTheme({palette: { type: 'dark' }}),
  +const theme = createMuiTheme({palette: { mode: 'dark' }}),
  ```

  The changes are supported by the `adaptV4Theme()` for easing the migration

#### Changes

- [Checkbox] Improve indeterminate UI (#22635) @oliviertassinari
- [Chip] Fix prop-type support for custom variants (#22603) @cansin
- [icons] Expose a data-test-id attribute on all svg icons (#22634) @jaebradley
- [Rating] Add form integration test suite (#22573) @eps1lon
- [Rating] Simpler customization of active "no value" styles (#22613) @eps1lon
- [Rating] Treat as input when readOnly (#22606) @eps1lon
- [Rating] Treat read-only as image (#22639) @eps1lon
- [Select] Improve docs for displayEmpty prop (#22601) @mihaipanait
- [Slider] Better tracking of mouse events (#22557, #22638) @chrisinajar, @oliviertassinari
- [Slider] Create unstyled version and migrate to emotion & styled-components (#22435) @mnajdova
- [Slider] Export components from lab and renamed to fit file names (#22723) @mnajdova
- [Slider] Fix value label display for custom value component (#22614) @NoNonsense126
- [Stepper] Add slight transition (#22654) @xtrixia
- [Tabs] Fix TabScrollButton using absolute path (#22690) @4vanger
- [Tabs] Only scroll the visible tabs (#22600) @quochuy
- [theme] convertLength does not work for fromUnit !== 'px' (#22739) @brorlarsnicklas
- [theme] Fix createSpacing.d.ts definition (#22645) @dabretin
- [theme] Fix Hidden breakpoints issues and updates the migration guide (#22702) @mnajdova

### `@material-ui/lab@v5.0.0-alpha.11`

#### Breaking changes

- [Alert] Move from lab to core (#22651) @mbrookes
  Move the component from the lab to the core. This component will become stable.

  ```diff
  -import Alert from '@material-ui/lab/Alert';
  -import AlertTitle from '@material-ui/lab/AlertTitle';
  +import Alert from '@material-ui/core/Alert';
  +import AlertTitle from '@material-ui/core/AlertTitle';
  ```

- [Rating] Move from lab to core (#22725) @mbrookes
  Move the component from the lab to the core. This component will become stable.

  ```diff
  -import Rating from '@material-ui/lab/Rating';
  +import Rating from '@material-ui/core/Rating';
  ```

- [Skeleton] Move from lab to core (#22740) @mbrookes
  Move the component from the lab to the core. This component will become stable.

  ```diff
  -import Skeleton from '@material-ui/lab/Skeleton';
  +import Skeleton from '@material-ui/core/Skeleton';
  ```

- [Autocomplete] Get root elements of options via renderOption (#22591) @ImanMahmoudinasab
  After this change, the full DOM structure of the option is exposed.
  It makes customizations easier.
  You can recover from the change with:

  ```diff
  <Autocomplete
  - renderOption={(option, { selected }) => (
  -   <React.Fragment>
  + renderOption={(props, option, { selected }) => (
  +   <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.title}
  -   </React.Fragment>
  +   </li>
    )}
  />
  ```

#### Changes

- [lab] Fix transitive dependencies in @material-ui/lab (#22671) @koistya
- [Autocomplete] Add "remove-option" to AutocompleteCloseReason type (#22672) @iansjk
- [Autocomplete] Don't close popup when Ctrl/Meta is pressed (#22696) @montelius
- [Autocomplete] Fix accessibility issue with empty option set (#22712) @tylerjlawson
- [Autocomplete] Update GitHub customization example (#22735) @hmaddisb

### `@material-ui/styled-engine@v5.0.0-alpha.11`

The new default style engine leveraging emotion.

### `@material-ui/styled-engine-sc@v5.0.0-alpha.11`

Allows developer to swap emotion with styled-components.
More documentation are coming.

### `@material-ui/icons@v5.0.0-alpha.11`

- [icons] Synchronize with Google (#22680) @delewis13

### `@material-ui/styles@v5.0.0-alpha.11`

- [Slider] Create unstyled version and migrate to emotion & styled-components (#22435) @mnajdova

### `@material-ui/system@v5.0.0-alpha.11`

- [core] Port createSpacing to TypeScript (#22720) @eps1lon

### Docs

- [blog] New posts (#22607) @oliviertassinari
- [docs] Add additional context to Autocomplete asynchronous documentation (#22621) @jaebradley
- [docs] Add emotion dependencies in codesandbox examples (#22736) @mnajdova
- [docs] Add props from Unstyled component to Styled API page (#22733) @mnajdova
- [docs] Add ui-schema in related projects (#22644) @elbakerino
- [docs] Avoid confusion between layout grid and data grid (#22681) @oliviertassinari
- [docs] Batch small changes (#22646) @oliviertassinari
- [docs] Configuring redirects for MUI X (#22632) @dtassone
- [docs] Customized hook at Autocomplete issue in dark mode (#22605) @hmaddisb
- [docs] Encourage DataGrid in /components/tables/ over alternatives (#22637) @oliviertassinari
- [docs] Fix emotion broken in SSR (#22731) @mnajdova
- [docs] Fix markdown metadata yaml (#22629) @oliviertassinari
- [docs] Fix static asset loading with X @oliviertassinari
- [docs] Improve Dashboard template (#22647) @pak1989
- [docs] Improve DX for docs generation (#22619) @eps1lon
- [docs] Migrate templates to TypeScript (#22650) @oliviertassinari
- [docs] New Crowdin updates (#22620) @mbrookes
- [docs] Prevent toolbar tooltips overlapping demos (#22732) @eps1lon
- [docs] Reduce indirections (#22642) @Arsikod
- [docs] Reference experimental slider demos correctly (#22738) @eps1lon
- [docs] Remove minimum-scale from meta viewport in docs (#22724) @barik
- [docs] Remove wrong migration instruction (#22710) @oliviertassinari
- [docs] Use codesandbox deploy for demos created from deploy previews (#22616) @eps1lon

### Core

- [core] Port createSpacing to TypeScript (#22720) @eps1lon
- [core] Replace ChangeEvent<{}> with SyntheticEvent (#22716) @eps1lon
- [core] Use ttp sources directly (#22706) @eps1lon
- [test] Add skip ci to Crowdin commit message (#22685) @mbrookes
- [test] Only run on push for master/next (#22624) @eps1lon
- [test] Run CircleCI anytime (#22676) @eps1lon

## 5.0.0-alpha.10

_Sep 15, 2020_

A big thanks to the 16 contributors who made this release possible.
Here are some highlights ✨:

- Keep working on the breaking changes before v5-beta.
  As always, you should find a clear and simple upgrade path for each of them.
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.10`

#### Breaking changes

- [Accordion] Normalize focusVisible logic (#22567) @oliviertassinari
  Rename `focused` to `focusVisible` for consistency with the other components:

  ```diff
  <Accordion
    classes={{
  -   focused: 'custom-focus-visible-classname',
  +   focusVisible: 'custom-focus-visible-classname',
    }}
  />
  ```

- [Stepper] Remove Paper and built-in padding (#22564) @mbrookes
  The root component (Paper) was replaced with a `<div>`. Stepper no longer has elevation, nor inherits Paper's props. This change is meant to encourage composition.

  ```diff
  -<Stepper elevation={2}>
  -  <Step>
  -    <StepLabel>Hello world</StepLabel>
  -  </Step>
  -</Stepper>
  +<Paper square elevation={2}>
  +  <Stepper>
  +    <Step>
  +      <StepLabel>Hello world</StepLabel>
  +    </Step>
  +  </Stepper>
  +<Paper>
  ```

  Remove the built-in 24px padding for consistency with the other components that avoid reserving space anytime it's possible.

  ```diff
  -<Stepper>
  -  <Step>
  -    <StepLabel>Hello world</StepLabel>
  -  </Step>
  -</Stepper>
  +<Stepper style={{ padding: 24 }}>
  +  <Step>
  +    <StepLabel>Hello world</StepLabel>
  +  </Step>
  +</Stepper>
  ```

- [theme] Always return default spacing value with px units (#22552) @mbrookes

  `theme.spacing` now returns single values with px units by default.
  This change improves the integration with styled-components & emotion (with the CSS template strings syntax).

  Before:

  ```sh
  theme.spacing(2) => 16
  ```

  After:

  ```sh
  theme.spacing(2) => '16px'
  ```

- [theme] Remove palette.text.hint key (#22537) @mbrookes

  The `theme.palette.text.hint` key was available but unused in Material-UI v4 components.
  You can use `adaptV4Theme()` to restore the previous behavior.

#### Changes

- [BottomNavigation] onClick does not fire if tapped while scrolling (#22524) @EliasJorgensen
- [Button] Remove dead code (#22566) @oliviertassinari
- [Chip] Fix focus visible style (#22430) @alexmotoc
- [ImageList] Refactor using CSS grid & React context (#22395) @mbrookes
- [Slider] Improve integration with form libraries (#22548) @NoNonsense126
- [StepIcon] Add className in render SvgIcon (#22559) @ZouYouShun
- [SwipeableDrawer] Avoid blocking events (#22525) @JadRizk
- [theme] Support spacing and border radius with CSS unit (#22530) @madmanwithabike
- [theme] Fix theme object global leak (#22517) @eps1lon
- [theme] Increase usage of the disabled design tokens (#22570) @LorenzHenk

### `@material-ui/lab@v5.0.0-alpha.10`

#### Breaking changes

- [Rating] Use different shape for empty and filled icons (#22554) @oliviertassinari
  Change the default empty icon to improve accessibility (1.4.1 WCAG 2.1).
  If you have a custom `icon` prop but no `emptyIcon` prop, you can restore the previous behavior with:

  ```diff
  <Rating
    icon={customIcon}
  + emptyIcon={null}
  />
  ```

#### Changes

- [Autocomplete] Improve TypeScript in the Google Maps demo (#22555) @L-U-C-K-Y
- [Rating] Explain some styles in code comments (#22571) @eps1lon

### Docs

- [docs] Improve Font Awesome integration (#22496) @chrislambe
- [docs] Clarify SSG acronym in Next.js example (#22558) @leerob
- [docs] Add redirection for links published on npm (#22575) @oliviertassinari
- [docs] Add LightyearVPN to showcase (#22568) @lightyearvpn
- [docs] Fix typo, extra 'you' (#22560) @jedsmit
- [docs] Option to disable ads (#22574) @oliviertassinari

### Core

- [core] Remove usage of deprecated event.keyCode (#22569) @oliviertassinari
- [core] Remove references to other objects from created theme (#22523) @eps1lon
- [core] Batch small changes (#22565) @oliviertassinari

## 5.0.0-alpha.9

_Sep 6, 2020_

A big thanks to the 14 contributors who made this release possible.
Here are some highlights ✨:

- 💎 A new diamond sponsor: [DoiT](https://www.doit-intl.com/), thank you!
- 📚 Include the default value of the props in IntelliSense (#22447) @eps1lon
- ⚛️ More source migrated to TypeScript and testing-library (#22441) @baterson
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.9`

#### Breaking changes

- [Modal] Remove `onRendered` prop from Modal and Portal (#22464) @eps1lon
  Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

#### Changes

- [Modal] Convert ModalManager to TypeScript (#22465) @eps1lon
- [Paper] Fix elevation warning when rendering (#22494) @nesso-pfl
- [Slider] Edge against swallowing of mouse up event (#22401) @motiejunas
- [Tabs] Add option to show scrollbar (#22438) @LogyLeo
- [Tabs] Document visibleScrollBar default value (#22475) @eps1lon
- [TextField] Remove excessive catching of hiddenLabel prop (#22444) @croraf

### `@material-ui/lab@v5.0.0-alpha.9`

- [docs] Include default values in IntelliSense (#22447) @eps1lon

### Docs

- [docs] Add DoiT diamond sponsor (#22436) @oliviertassinari
- [docs] Bump markdown-to-jsx (#22474) @eps1lon
- [docs] Change showcase approval process (#22398) @africanzoe
- [docs] Fix close context menu if repeated (#22463) @eps1lon
- [docs] Fix Next.js example (#22457) @bhati
- [docs] Fix TypeScript deps in CodeSandbox (#22346) @oliviertassinari
- [docs] Fix unresolved returntypes for props (#22459) @eps1lon
- [docs] Fix usage of overrides instead of styleOverrides (#22478) @discodanne
- [docs] Improve Backstage showcase (#22458) @stefanalund
- [docs] Improve styles basics.md section (#22440) @bxie
- [docs] Include default values in IntelliSense (#22447) @eps1lon

### Core

- [core] Batch small changes (#22461) @oliviertassinari
- [core] Fix useEventCallback type (#22448) @kodai3
- [core] Try out new JSX transform where available (#22455) @eps1lon
- [test] Migrate more components to react-testing-library (#22441) @baterson

## 5.0.0-alpha.8

_Aug 31, 2020_

A big thanks to the 19 contributors who made this release possible.
Here are some highlights ✨:

- 🎨 Inverse the customization API of the theme to be component-centric (#22347, #22293) @mnajdova.

```jsx
const theme = createMuiTheme({
  components: {
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        sizeSmall: {
          marginLeft: 4,
          marginRight: 4,
          padding: 12,
        },
      },
    },
  },
});
```

- ✨ Add [text in divider](https://mui.com/components/dividers/#dividers-with-text) support (#22285) @ShehryarShoukat96

  ```jsx
  <Divider>{'CENTER'}</Divider>
  ```

  <img width="530" alt="divider" src="https://user-images.githubusercontent.com/3165635/91740018-01cb5e80-ebb3-11ea-9a7f-6ddb48b3f496.png">

- ♿️ A bunch of accessibility fixes (#22366, #22374, #22377, #22340, #22376) @fakeharahman @alexmotoc @eps1lon @oliviertassinari
- ⚛️ Increase adoption of TypeScript in the codebase (#22389, #22367, #22282) @Luchanso, @oliviertassinari

### `@material-ui/core@v5.0.0-alpha.8`

#### Breaking changes

- [theme] Rename theme keys to defaultProps and styleOverrides (#22347) @mnajdova
- [theme] Restructure component definitions (#22293) @mnajdova
  The components' definition inside the theme were restructure under the `components` key, to allow people easier discoverability about the definitions regarding one component.

  1. `props`

  ```diff
  import { createMuiTheme } from '@material-ui/core/styles';

  const theme = createMuiTheme({
  -  props: {
  -    MuiButton: {
  -      disableRipple: true,
  -    },
  -  },
  +  components: {
  +    MuiButton: {
  +      defaultProps: {
  +        disableRipple: true,
  +      },
  +    },
  +  },
  });
  ```

  2. `overrides`

  ```diff
  import { createMuiTheme } from '@material-ui/core/styles';

  const theme = createMuiTheme({
  -  overrides: {
  -    MuiButton: {
  -      root: { padding: 0 },
  -    },
  -  },
  +  components: {
  +    MuiButton: {
  +      styleOverrides: {
  +        root: { padding: 0 },
  +      },
  +    },
  +  },
  });
  ```

  Note that if you don't have the time to upgrade the structure of the theme, you
  can use the `adaptV4Theme()` adapter.

- [GridList] Rename to ImageList (#22311) @mbrookes
- [GridList] Rename Tile to Item (#22385) @mbrookes
  Rename the `GridList` components to `ImageList` to align with the current Material Design naming.

  ```diff
  -import GridList from '@material-ui/core/GridList';
  -import GridListTile from '@material-ui/core/GridListTile';
  -import GridListTileBar from '@material-ui/core/GridListTileBar';
  +import ImageList from '@material-ui/core/ImageList';
  +import ImageListItem from '@material-ui/core/ImageListItem';
  +import ImageListItemBar from '@material-ui/core/ImageListItemBar';

  -<GridList>
  -  <GridListTile>
  +<ImageList>
  +  <ImageListItem>
      <img src="file.jpg" alt="Image title" />
  -    <GridListTileBar
  +    <ImageListItemBar
        title="Title"
        subtitle="Subtitle"
      />
  -  </GridListTile>
  -</GridList>
  +  </ImageListItem>
  +</ImageList>
  ```

#### Changes

- [Breadcrumbs] Fix wrong role usage (#22366) @fakeharahman
- [Breadcrumbs] More robust focus capture (#22374) @eps1lon
- [ButtonBase] Reset box-sizing to border-box (#22316) @su8ru
- [Dialog] Fix unexpected close when releasing click on backdrop (#22310) @danbrud
- [Divider] Add text in divider (#22285) @ShehryarShoukat96
- [Slider] Respect disabled property when already focused (#22247) @pireads
- [Tabs] Don't fire onChange if current value (#22381) @jjoselv
- [Tabs] Improve focus management on list with no active tabs (#22377) @alexmotoc
- [theme] Add theme.mixins.gutters() in adaptV4Theme (#22396) @mnajdova
- [Tooltip] Improve readability (#22340) @oliviertassinari
- [Tooltip] Meet dismissable WCAG criterion (#22376) @eps1lon
- [l10n] Improve th-TH locale (#22350) @vimutti77

### `@material-ui/lab@v5.0.0-alpha.8`

- [docs] Add IntelliSense for each class in the `classes` prop (#22312) @eps1lon

### `@material-ui/styles@v5.0.0-alpha.8`

- [theme] Restructure component definitions (#22293) @mnajdova

### `@material-ui/utils@v5.0.0-alpha.8`

- [core] Move utils package to TypeScript (#22367) @oliviertassinari

### Docs

- [docs] Add Content Security Policy guide (#22383) @tjg37
- [docs] Add IntelliSense for each class in the `classes` prop (#22312) @eps1lon
- [docs] Add links in the header (#22210) @oliviertassinari
- [docs] Fix Argos-ci 404 link (#22362) @brunocechet
- [docs] Fix test README typo @mbrookes
- [docs] Forward x data-grid (#22400) @oliviertassinari
- [docs] Transpile demo .ts files (#22388) @eps1lon
- [docs] Add Backstage to showcase (#22428) @stefanalund
- [docs] Update Fontsource installation instructions (#22431) @DecliningLotus

### Core

- [icons] Label them as vendored for GitHub (#22397) @oliviertassinari
- [test] DialogContent with testing-library (#22356) @baterson
- [test] DialogContentText with testing-library (#22357) @baterson
- [test] DialogTitle with testing-library (#22358) @baterson
- [test] Enable tests that weren't working in JSDOM (#22360) @eps1lon
- [test] Fix failing tests on Windows (#22369) @eps1lon
- [test] Update react 17 patch (#22391) @eps1lon
- [core] Add explicit dependency on `@types/yargs` (#22339) @eps1lon
- [core] Add useEnhancedEffect module (#22317) @oliviertassinari
- [core] Batch small changes (#22314) @oliviertassinari
- [core] Fix setRef types (#22389) @Luchanso
- [core] Include TypeScript definitions in GitHub source (#22282) @oliviertassinari
- [core] Refactor how we ignore default values in docs (#22355) @eps1lon
- [core] Update SECURITY.md to account for v5 @oliviertassinari

## 5.0.0-alpha.7

_Aug 22, 2020_

A big thanks to the 22 contributors who made this release possible.
Here are some highlights ✨:

- 💎 A new diamond sponsor: [Octopus](https://octopus.com/), thank you!
- ⚛️ Migrate parts of the codebase to TypeScript (#22295, #22280, #22179, #22195) @rothbart, @eps1lon, @oliviertassinari.
- 💅 Add support for custom variant to most of the components (9 new components in this release) @mnajdova
- ⚛️ Keep working on React 17 support (#22270, #22262) @eps1lon
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.7`

### Breaking changes

- [Menu] Remove transition onX props (#22212) @mbrookes
  The onE\* transition props were removed. Use TransitionProps instead.

  ```diff
  <Menu
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  >
  ```

- [Popover] Remove transition onX props (#22184) @mbrookes
  The onE\* transition props were removed. Use TransitionProps instead.

  ```diff
  <Popover
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

- [TextField] Improve line-height reset (#22149) @imnasnainaec
  Increase the line-height by 4px to support long descender on special alphabets.
  If you were overriding the input vertical padding, reduce it by 4px.

### Changes

- [Accordion] Fix scroll anchoring (#22292) @brickmaker17
- [colorManipulator] Add support for CSS Color Module Level 4 (#20790) @marcosvega91
- [Divider] Custom variant (#22182) @mnajdova
- [Fab] Custom variant (#22189) @mnajdova
- [l10n] Add Thai (th-TH) locale (#22242) @smoogi
- [l10n] Improve ja-JP locale (#22287) @chelproc
- [Link] Custom variant (#22204) @mnajdova
- [Paper] Custom variant (#22216) @mnajdova
- [Slider] Improve touch passive event handling (#22269) @mikhalev-im
- [Stepper] Fix spacing without StepContent (#22199) @Floriferous
- [SwipeableDrawer] Fix prevented inner scroll (#22254) @BramKaashoek
- [Tabs] Add aria-orientation of vertical (#22291) @eps1lon
- [Tabs] Document how to make scroll icons visible (#22255) @Sorgrum
- [TextField] Add hidden label to multi-line filled textfield (#22284) @fakeharahman
- [Toolbar] Custom variant (#22217) @mnajdova
- [TrapFocus] Entangle effects (#22155) @eps1lon
- [TrapFocus] Fix compatibility issues with React 17 (#22270) @eps1lon
- [TrapFocus] Prevent possible crash in React 17 (#22262) @eps1lon

### `@material-ui/icons@v5.0.0-alpha.7`

- [icons] Synchronize icons (#22186) @oliviertassinari

### `@material-ui/styles@v5.0.0-alpha.7`

- [core] Change children to be optional (#22134) @suliskh

### `@material-ui/lab@v5.0.0-alpha.7`

- [Alert] Custom variant (#22218) @mnajdova
- [Pagination] Custom variant (#22220, #22219) @mnajdova
- [Skeleton] Custom variant (#22243) @mnajdova
- [SpeedDial] Add support for uncontrolled open state (#22248) @akharkhonov
- [Timeline] Custom variant (#22244) @mnajdova

### Docs

- [docs] Add Design resources in installation (#22209) @oliviertassinari
- [docs] Add Octopus diamond sponsor (#22177) @oliviertassinari
- [docs] Better track usage of icons (#22187) @oliviertassinari
- [docs] Change property/properties to prop/props (#22271) @mbrookes
- [docs] Document TextField helperText height (#22146) @morgan-sam
- [docs] Fix `@global` being considered a class (#22297) @eps1lon
- [docs] Fix a typo on TextField components (#22300) @Renfrew
- [docs] Fix use of removed transition onE\* props (#22286) @mbrookes
- [docs] Improve codesandbox generation logic (#22221) @oliviertassinari
- [docs] Migrate Onepirate to TypeScript (#22295) @rothbart
- [docs] Migrate Dashboard template to TypeScript (#22280) @oliviertassinari
- [docs] Fix minimizing-bundle-size.md (#22298) @Primajin

### Core

- [core] Batch small changes (#22183) @oliviertassinari
- [core] Change children to be optional (#22134) @suliskh
- [test] Clear fake timers only in afterEach hook (#22307) @dmtrKovalenko
- [test] Convert initMatchers to TypeScript (#22179) @eps1lon
- [test] Improve toHaveVirtualFocus error message (#22185) @eps1lon
- [test] Lint fix the custom rules plugin for useThemeVariants (#22192) @mnajdova
- [test] Make all tests runnable with React 17 (#22290) @eps1lon
- [test] Prevent swallowing errors during setup (#22196) @eps1lon
- [test] Setup infra for tests in TypeScript (#22195) @eps1lon
- [test] Update react next patch (#22260) @eps1lon

## 5.0.0-alpha.6

_Aug 13, 2020_

A big thanks to the 26 contributors who made this release possible.
Here are some highlights ✨:

- 💅 Introduce a new dynamic variant API (#21648) @mnajdova.
  This API allows developers to add new variants on the Material-UI's components right from the theme, without having to wrap the components.
  For instance with the Button:

  ```tsx
  // Define the style that should be applied, for specific props.
  const theme = createMuiTheme({
    variants: {
      MuiButton: [
        {
          props: { variant: 'dashed', color: 'secondary' },
          styles: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  });

  // Retain type safety.
  declare module '@material-ui/core/Button/Button' {
    interface ButtonPropsVariantOverrides {
      dashed: true;
    }
  }

  // Enjoy!
  <Button variant="dashed" />;
  ```

  More details in [the documentation](https://mui.com/customization/components/#adding-new-component-variants) and [RFC](#21749).

- 👮 Add documentation for the [TrapFocus](https://mui.com/components/trap-focus/) component (#22062) @oliviertassinari.
- ⚛️ Prepare support for React v17 (#22093, #22105, #22143, #22111) @eps1lon.
- 🚧 We have undertaken breaking changes.

### `@material-ui/core@v5.0.0-alpha.6`

#### Breaking changes

- [Avatar] Rename variant circle -> circular for consistency (#22015) @kodai3
  Rename `circle` to `circular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Avatar variant="circle">
  +<Avatar variant="circular">
  ```

- [Badge] Rename overlap circle -> circular and rectangle -> rectangular for consistency (#22050) @kodai3
  Rename `circle` to `circular` and `rectangle` to `rectangular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Badge overlap="circle">
  -<Badge overlap="rectangle">
  +<Badge overlap="circular">
  +<Badge overlap="rectangular">
  ```

- [CircularProgress] Remove static variant, simplify determinate (#22060) @mbrookes
  The `static` variant has been merged into the `determinate` variant, with the latter assuming the appearance of the former.
  The removed variant was rarely useful. It was an exception to Material Design, and was removed from the specification.

  ```diff
  -<CircularProgress variant="determinate" />
  ```

  ```diff
  -<CircularProgress variant="static" classes={{ static: 'className' }} />
  +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  ```

- [Dialog] Remove transition onX props (#22113) @mbrookes
  The onE\* transition props were removed. Use TransitionProps instead.

  ```diff
  <Dialog
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

- [Fab] Rename round -> circular for consistency (#21903) @kodai3
  Rename `round` to `circular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Fab variant="round">
  +<Fab variant="circular">
  ```

- [List] Improve hover/select/focus UI display (#21930) @joshwooding
- [Pagination] Rename round -> circular for consistency (#22009) @kodai3
  Rename `round` to `circular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Pagination shape="round">
  -<PaginationItem shape="round">
  +<Pagination shape="circular">
  +<PaginationItem shape="circular">
  ```

- [RootRef] Remove component (#21974) @eps1lon
  This component was removed. You can get a reference to the underlying DOM node of our components via `ref` prop.
  The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which is [deprecated in `React.StrictMode`](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

  ```diff
  -<RootRef rootRef={ref}>
  -  <Button />
  -</RootRef>
  +<Button ref={ref} />
  ```

- [Snackbar] Change the default position on desktop (#21980) @kodai3
  The notification now displays at the bottom left on large screens.
  It better matches the behavior of Gmail, Google Keep, material.io, etc.
  You can restore the previous behavior with:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- [Snackbar] Remove transition onX props (#22107) @mbrookes
  The onE\* transition props were removed. Use TransitionProps instead.

  ```diff
  <Snackbar
  -  onEnter={onEnter}
  -  onEntered={onEntered},
  -  onEntering={onEntered},
  -  onExit={onEntered},
  -  onExited={onEntered},
  -  onExiting={onEntered}
  +  TransitionProps={{
  +    onEnter,
  +    onEntered,
  +    onEntering,
  +    onExit,
  +    onExited,
  +    onExiting,
  +  }}
  />
  ```

- [TextareaAutosize] Rename rowsMax->maxRows & rowsMin->minRows (#21873) @mhayk
  Rename `rowsMin`/`rowsMax` prop with `mi Rows`/`maxRows` for consistency with HTML attributes.

  ```diff
  -<TextField rowsMax={6}>
  -<TextareAutosize rowsMin={1}>
  -<TextareAutosize rowsMax={6}>
  +<TextField maxRows={6}>
  +<TextareAutosize minRows={1}>
  +<TextareAutosize maxRows={6}>
  ```

- [TextField] Better isolate static textarea behavior to dynamic one (#21995) @AxartInc
  Better isolate the fixed textarea height behavior to the dynamic one.
  You need to use the `rowsMin` prop in the following case:

  ```diff
  -<TextField rows={2} rowsMax={5} />
  +<TextField rowsMin={2} rowsMax={5} />
  ```

  Remove the `rows` prop, use the `rowsMin` prop instead.
  This change aims to clarify the behavior of the prop.

  ```diff
  -<TextareaAutosize rows={2} />
  +<TextareaAutosize rowsMin={2} />
  ```

- [theme] Remove theme.mixins.gutters (#22109) @joshwooding
  The abstraction hasn't proven to be used frequently enough to be valuable.

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]: {
  +  paddingLeft: theme.spacing(3),
  +  paddingRight: theme.spacing(3),
  +},
  ```

#### Changes

- [Avatar] Custom variant (#22139) @mnajdova
- [Badge] Add missing class key (#22095) @kodai3
- [Badge] Custom variant (#22140) @mnajdova
- [Button] Improved variant type names & cleanup tests (#22010) @mnajdova
- [ButtonBase] Forward type to other components than 'button' (#22172) @eps1lon
- [ButtonGroup] Custom variant (#22160) @mnajdova
- [Chip] Custom variant (#22161) @mnajdova
- [CssBaseline] Add text size adjust property (#22089) @Tolsee
- [l10n] Add Greek (el-GR) locale (#21988) @tmanolat
- [Table] Cell small's right padding is bigger than medium (#22017) @adamlaurencik
- [TrapFocus] Add documentation (#22062) @oliviertassinari
- [Typography] Add custom variants support (#22006) @mnajdova
- [useIsFocusVisible] Remove focus-visible if focus is re-targetted (#22102) @eps1lon
- [core] Fix various potential issues with multiple windows (#22159) @scottander
- [core] Improve hook dependencies in useControlled.js (#21977) @roth1002

### `@material-ui/lab@v5.0.0-alpha.6`

#### Breaking changes

- [Skeleton] Rename variant circle -> circular and rect -> rectangular for consistency (#22053) @kodai3
  Rename `circle` to `circular` and `rect` to `rectangular` for consistency. The possible values should be adjectives, not nouns:

  ```diff
  -<Skeleton variant="circle">
  -<Skeleton variant="rect">
  +<Skeleton variant="circular">
  +<Skeleton variant="rectangular">
  ```

#### Changes

- [Autocomplete] Add support for "{label: string}" data type as a default for "options" (#21992) @DanailH
- [TreeView] Add disabled prop (#20133) @netochaves
- [TreeView] Simplify focus logic (#22098) @eps1lon
- [TreeView] Test current behavior of active item removal (#21720) @eps1lon
- [TreeView] Test selection behavior (#21901) @joshwooding

### `@material-ui/system@v5.0.0-alpha.6`

- [core] Bump csstype to 3.0.0 (#22048) @eps1lon

### Docs

- [docs] Add 'size' prop to ToggleButton API docs (#22052) @zenje
- [docs] Add ClassKeys migration description for Renaming API (#22061) @kodai3
- [docs] Add a label to the TreeView demos (#21900) @joshwooding
- [docs] Add missing JSDoc for various props (#22005) @eps1lon
- [docs] Add the services that support MUI in readme (#22137) @naineet
- [docs] Add trailingSlash: true (#22008) @oliviertassinari
- [docs] Add visibility to TypeScript examples (#22013) @esemeniuc
- [docs] Avoid using any type in Tabs examples (#22091) @tacigar
- [docs] Bump next to 9.5.0 (#21975) @eps1lon
- [docs] Disallow undefined array members at runtime where they're unexpected (#21990) @eps1lon
- [docs] Improve Autocomplete GitHub demo (#22153) @aquibbaig
- [docs] Improve draggable dialog demo wording (#22021) @Sanskar95
- [docs] Improve transition props API descriptions (#21952) @maksimgm
- [docs] Port buildApi to TypeScript (#22055) @eps1lon
- [docs] Update build instructions for component API (#21970) @eps1lon
- [docs] Update grouped instruction of autocomplete (#22056) @yfng96
- [docs] Use `import * as React from 'react';` (#22058) @mbrookes
- [docs] Use pickers v4 (#22023) @eps1lon

### Core

- [core] Allow running prettier from material-ui-x (#22071) @oliviertassinari
- [core] Bump csstype to 3.0.0 (#22048) @eps1lon
- [core] Fix next and prevent future regressions (#22135) @eps1lon
- [core] Improve merge-conflict label automation (#22065) @eps1lon
- [core] Lint cleanup (#21972) @eps1lon
- [core] Resolve all dot-prop versions to 5.x (#22007) @eps1lon
- [core] Small changes (#22020) @oliviertassinari
- [Security] Bump elliptic from 6.5.0 to 6.5.3 (#21997) @dependabot-preview
- [test] Drop css-loader (#21999) @eps1lon
- [test] Lint framer workspace (#22002) @eps1lon
- [test] Lint useThemeVariants with custom rules plugin (#21963) @eps1lon
- [test] Run same tests in coverage and unit (#22092) @eps1lon
- [test] Type-check framerx package (#21868) @eps1lon
- [test] Work on React v17 (#22093, #22105, #22143, #22111) @eps1lon

## 5.0.0-alpha.5

_July 28, 2020_

A big thanks to the 18 contributors who made this release possible.

### `@material-ui/core@v5.0.0-alpha.5`

#### Breaking changes

- [Grid] Rename justify prop to justifyContent (#21845) @mnajdova

  Rename `justify` prop with `justifyContent` to be aligned with the CSS property name.

  ```diff
  -<Grid justify="center">
  +<Grid justifyContent="center">
  ```

#### Changes

- [Accordion] Add new classes key (#21920) @natac13
- [Accordion] Fix IconButtonProps spreading logic (#21850) @kgregory
- [Avatar] Fix group size (#21896) @natac13
- [Button] Custom variant (#21648) @mnajdova
- [CssBaseline] Export ScopedCssBaseline from barrel index (#21869) @mherczeg
- [Dialog] Fix body scrollbar close behavior (#21951) @maksimgm
- [Icon] Hide name placeholder while "Material Icons" font is loading (#21950) @maksimgm
- [Select] Ensure that onChange is called before onClose (#21878) @DanailH
- [Slider] Make `index` public in the ValueLabel props (#21932) @govardhan-srinivas

### `@material-ui/lab@v5.0.0-alpha.5`

- [TreeView] Change focus management to aria-activedescendant (#21695) @joshwooding
- [TreeView] Fix crash when shift clicking a clean tree (#21899) @joshwooding

### Framer

- [framer] Refactor as switch (#21885) @mhkasif
- [framer] Update with latest sources (#21888) @eps1lon

### Docs

- [blog] Q2 2020 Update (#21822) @oliviertassinari
- [docs] Add expand all and select all to controlled tree demo (#21929) @joshwooding
- [docs] Add useRadioGroup section (#21910) @kodai3
- [docs] Autocomplete is not showing options even though they exist (#21949) @maksimgm
- [docs] Change the destination branch for PRs (#21870) @DanailH
- [docs] Fix Skeleton inline example (#21918) @ppecheux
- [docs] Fix custom Snackbar width on mobile (#21948) @ruhci28
- [docs] Fix the type of the second argument of 'createMuiTheme' function (#21859) @DanailH
- [docs] Improve ad display @oliviertassinari
- [docs] Improve documentation of theme.breakpoints (#21922) @ruhci28
- [docs] Link react-hook-form (#21886) @jeffshek
- [docs] Mention @MuiContrib in CONTRIBUTING (#21891) @eps1lon
- [docs] Replace latests tags with next in the codesandbox (#21851) @mnajdova
- [docs] Update gold sponsor to Text-Em-All (formerly Call-Em-All) (#21897) @jonmiller0
- [docs] Update testing guide (#21863) @eps1lon

### Core

- [test] Enable more StrictMode tests (#21817) @eps1lon
- [test] Lint internal typescript-to-proptypes fork (#21876) @eps1lon
- [test] Pass didWarnControlledToUncontrolled between tests (#21875) @eps1lon
- [test] Unify import to `test/utils (#21856) @eps1lon
- [core] Add warnings where ref-forwarding components/elements are required (#21883) @eps1lon
- [core] Automatically tweet about good first issues (#21879) @eps1lon
- [core] Batch small changes (#21928) @oliviertassinari
- [core] Remove /test-utils (#21855) @eps1lon
- [core] Throw on unused `typescript-to-proptypes-ignore` directives (#21867) @eps1lon

## 5.0.0-alpha.4

_July 19, 2020_

A big thanks to the 11 contributors who made this release possible.

### `@material-ui/core@v5.0.0-alpha.4`

#### Breaking changes

- [core] Drop support for non-ref-forwarding class components (#21811) @eps1lon
  Support for non-ref-forwarding class components in the `component` prop or as an immediate `children` has been dropped. If you were using `unstable_createStrictModeTheme` or didn't see any warnings related to `findDOMNode` in `React.StrictMode` then you don't need to do anything.
  Otherwise check out the ["Caveat with refs" section in our composition guide](/guides/composition/#caveat-with-refs) to find out how to migrate.
  This change affects almost all components where you're using the `component` prop or passing `children` to components that require `children` to be elements (e.g. `<MenuList><CustomMenuItem /></MenuList>`)
- [Stepper] Use context API (#21613) @baterson
  Rely on the context over the `React.cloneElement()` API.
  This change makes composition easier.

### `@material-ui/icons@v5.0.0-alpha.4`

- [icons] Add Google brand icon (#21807) @bmg02

### Docs

- [docs] Break up Select demos (#21792) @cjoecker
- [docs] Change RMUIF info to new version (#21812) @phoqe
- [docs] Fix Spanish translation (#21800) @adamsr123
- [docs] Fix nav color (#21780) @mbrookes
- [docs] Update advanced-de.md (#21786) @jasonericdavis

### Core

- [core] Allow dist tag as argv in use-react-dist-tag (#21810) @eps1lon
- [core] Drop support for non-ref-forwarding class components (#21811) @eps1lon
- [core] Lint with typescript-eslint parser (#21758) @oliviertassinari
- [core] One label is enough @oliviertassinari
- [core] Remove lint:fix command @oliviertassinari
- [test] Enable "missing act()"-warnings (#21802) @eps1lon
- [test] Improve stack trace for unexpected errors (#21818) @eps1lon
- [test] Update react next patch (#21746) @eps1lon
- [test] Use testing-library in withStyles (#21804) @eps1lon

## 5.0.0-alpha.3

_July 12, 2020_

A big thanks to the 14 contributors who made this release possible.

### `@material-ui/core@v5.0.0-alpha.3`

- [Avatar] Avoid usage of z-index (#21685) @nvdai2401
- [GridList] Fix crash when loading images (#21741) @paradoxxxzero
- [List] Fix secondary action position when disableGutters={true} (#21732) @kgregory
- [TablePagination] Fix broken labelling if SelectProps provided ids (#21703) @eps1lon
- [theme] Fix custom breakpoint in CSS Media Queries (#21759) @nkrivous
- [TrapFocus] Fix disableAutoFocus prop (#21612) @oliviertassinari

### `@material-ui/lab@v5.0.0-alpha.3`

- [lab] Fix TypeScript theme overrides support (#21724) @cjoecker
- [Autocomplete] Fail form validation if required is filled when `multiple` (#21692, #21670) @weslenng, @eps1lon

### Docs

- [examples] Include troubleshooting for next.js (#21683) @ocavue
- [docs] Add ethicalads.io (#21752) @oliviertassinari
- [docs] Apply small fixes (#21754) @jaironalves
- [docs] Batch small changes (#21669) @oliviertassinari
- [docs] Bump next to 9.4.4 (#21690) @eps1lon
- [docs] Fix custom switch ripple color (#21729) @xanderoku
- [docs] Fix text from showcase (#21755) @cjoecker
- [docs] Improve customized timeline demo (#21739) @mageprincess
- [docs] Move more prop docs into IntelliSense (#21659) @eps1lon
- [docs] Move more prop docs into IntelliSense (#21687) @eps1lon
- [docs] Recommend default branch (#21719) @eps1lon
- [docs] Remove `@document` directive from IntelliSense (#21688) @eps1lon
- [docs] Track web-vitals (#21702) @eps1lon

### Core

- [test] Allow container + hydrate in render (#21747) @eps1lon
- [test] Bump url-loader (#21689) @eps1lon
- [test] Restore clock between each test (#21760) @eps1lon
- [test] Run lab unit tests in browser (#21691) @eps1lon
- [core] Allow generating markdown api docs for subset of components (#21731) @eps1lon
- [core] Batch small changes (#21756) @oliviertassinari
- [core] Don't bail out early if docs:api fails (#21726) @eps1lon
- [core] Remove dead code from docs:api (#21730) @eps1lon
- [core] Simplify debounce (#21666) @NMinhNguyen
- [core] Use common yarn version (#21779) @eps1lon

## 5.0.0-alpha.2

_July 4, 2020_

A big thanks to the 16 contributors who made this release possible.

### `@material-ui/core@v5.0.0-alpha.2`

#### Breaking changes

- [Button] Make primary the default color (#21594) @mbrookes
  The button `color` prop is now "primary" by default, and "default" has been removed. This makes the button closer to the Material Design specification and simplifies the API.

  ```diff
  -<Button color="default" />
  -<Button color="primary" />
  +<Button />
  +<Button />
  ```

- [ExpansionPanel] Remove component (#21630) @mnajdova
  This completes our effort on renaming the ExpansionPanel component Accordion
- [Collapse] Add orientation and horizontal support (#20619) @darkowic
  The `collapsedHeight` prop was renamed `collapsedSize` to support the horizontal direction.

  ```diff
  -<Collapse collapsedHeight={40}>
  +<Collapse collapsedSize={40}>
  ```

#### Changes

- [Card] Fix vertically center header action (#21646) @kgregory
- [l10n] Update cs-CZ and sk-SK locales (#21656) @char0n
- [l10n] Update sv-SE locale (#21631) @tbz
- [Menu] Remove overflow style in MenuItem (#21644) @tj3407
- [MenuItem] Add types for ListItemClasses (#21654) @eps1lon
- [Slider] Fix cannot read property 'focus' of null (#21653) @mageprincess
- [TextField] Fix CSS isolation issue (#21665) @Codetalker777
- [TrapFocus] Fix portal support (#21610) @mnajdova
- [TypeScript] Fix version support (#21640) @jakubfiglak

### `@material-ui/lab@v5.0.0-alpha.2`

- [TreeView] Improve node registration and fix other issues (#21574) @joshwooding

### Docs

- [blog] Post survey results 2020 (#21555) @mnajdova
- [docs] Add new showcase (#21637) @cjoecker
- [docs] CodeFund is shutting down (#21632) @oliviertassinari
- [docs] Document next version (#21591) @oliviertassinari
- [docs] Enable docs search on v5.0.0 & fix duplicate on master @oliviertassinari
- [docs] Fix ad issues @oliviertassinari
- [docs] Move more prop docs into IntelliSense (#21655) @eps1lon
- [docs] Remove in-context translation code & files (#21633) @mbrookes
- [example] Remove dead dependency from next-typescript (#21628) @StefanWerW

### Core

- [test] Add toWarnDev() and toErrorDev() matcher (#21581) @eps1lon

## 5.0.0-alpha.1

_June 27, 2020_

A big thanks to the 33 contributors who made this release possible. Here are some highlights ✨:

- 🔄 Introduce a new `LoadingButton` component in the lab (#21389) @mnajdova.
- 📍 Synchronize icons with Google, add 200 new icons (#21498) @alecananian
- 💥 Start working on breaking changes.

### `@material-ui/core@v5.0.0-alpha.1`

#### Breaking changes

- [Divider] Use border instead of background color (#18965) @mikejav.
  It prevents inconsistent height on scaled screens. For people customizing the color of the border, the change requires changing the override CSS property:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

- [Rating] Rename `visuallyhidden` to `visuallyHidden` for consistency (#21413) @mnajdova.

  ```diff
  <Rating
    classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
  ```

- [Typography] Replace the `srOnly` prop so as to not duplicate the capabilities of [System](https://mui.com/system/basics/) (#21413) @mnajdova.

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/utils';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">Create a user</Typography>
  +<Span>Create a user</Span>
  ```

- [TablePagination] Add showFirstButton and showLastButton support (#20750) @ShahAnuj2610.
  The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop. This increases consistency with the `Pagination` component.

  ```diff
  <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après
  + getItemAriaLabel={…}
  ```

- [ExpansionPanel] Rename to Accordion (#21494) @mnajdova.
  Use a more common the naming convention:

  ```diff
  -import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  -import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  -import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  -import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
  +import Accordion from '@material-ui/core/Accordion';
  +import AccordionSummary from '@material-ui/core/AccordionSummary';
  +import AccordionDetails from '@material-ui/core/AccordionDetails';
  +import AccordionActions from '@material-ui/core/AccordionActions';

  -<ExpansionPanel>
  +<Accordion>
  -  <ExpansionPanelSummary>
  +  <AccordionSummary>
       <Typography>Location</Typography>
       <Typography>Select trip destination</Typography>
  -  </ExpansionPanelSummary>
  +  </AccordionSummary>
  -  <ExpansionPanelDetails>
  +  <AccordionDetails>
       <Chip label="Barbados" onDelete={() => {}} />
       <Typography variant="caption">Select your destination of choice</Typography>
  -  </ExpansionPanelDetails>
  +  </AccordionDetails>
     <Divider />
  -  <ExpansionPanelActions>
  +  <AccordionActions>
       <Button size="small">Cancel</Button>
       <Button size="small" color="primary">Save</Button>
  -  </ExpansionPanelActions>
  +  </AccordionActions>
  -</ExpansionPanel>
  +</Accordion>
  ```

- [BottomNavigation] typescript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

- [Slider] typescript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Slider onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- [Tabs] typescript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Tabs onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- [Accordion] typescript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React.ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
  ```

#### Changes

- [Badge] Fix transition flicker (#21557) @mnajdova
- [ButtonGroup] Improve contained hover style (#21532) @alecananian
- [l10n] Improve Russian translation (#21480) @AntonLukichev
- [l10n] Improve zh-CN, add zh-TW (#21493) @Jack-Works
- [LinearProgress] High frequency updates (#21416) @dnicerio
- [Stepper] Fix optional label alignment (#21420) @curtislin7
- [Table] Move prop docs into IntelliSense (#21530) @oliviertassinari
- [TablePagination] Add showFirstButton and showLastButton support (#20750) @ShahAnuj2610
- [Tabs] Fix useCallback missing arguments (#21471) @KitsonBroadhurst
- [TextField] Fix FilledInput disable hover style when disabled (#21457) @tchmnn

### `@material-ui/lab@v5.0.0-alpha.1`

- [Autocomplete] Fix support for renderTags={() => null} (#21460) @matthenschke
- [LoadingButton] Introduce new component (#21389) @mnajdova
- [Pagination] Fix display when boundaryCount={0} (#21446) @guimacrf
- [Skeleton] Fix text border (#21543) @el1f
- [Timeline] Align dots with content (#21402) @mnajdova
- [TreeView] Minor styling changes (#21573) @joshwooding
- [TreeView] Simplify customization (#21514) @joshwooding

### `@material-ui/icons@v5.0.0-alpha.1`

- [icons] Synchronize icons with Google (#21498) @alecananian

### `@material-ui/system@v5.0.0-alpha.1`

- [system] Introduce visuallyHidden style utility (#21413) @mnajdova

### Docs

- [docs] Add CSP support section to docs (#21479) @razor-x
- [docs] Add explicit example for extending existing palette colors (#21458) @BennyHinrichs
- [docs] Add more details about breakpoint widths (#21545) @Muzietto
- [docs] Add new gold sponsor @oliviertassinari
- [docs] Add transitions customization page (#21456) @mnajdova
- [docs] Correct syntax errors to improve document readability (#21515) @AGDholo
- [docs] Document type="number" limitation (#21500) @IwalkAlone
- [docs] Entry for translations and fix grammar error (#21478) @jaironalves
- [docs] Fix broken "customization" anchor link (#21506) @connorads
- [docs] Fix typo in MultipleSelects.js (#21510) @ShiyuCheng2018
- [docs] Fix typo in SpeedDialIcon classes comment (#21398) @zachbradshaw
- [docs] Fix typo in TextField required prop (#21538) @HumbertoL
- [docs] Fix version in localized urls (#21442) @tchmnn
- [docs] Format english markdown files (#21463) @eps1lon
- [docs] Format some previously unformatted, untranslated files (#21558) @eps1lon
- [docs] Hide duplicate table borders (#20809) @marcosvega91
- [docs] Improve docs for useMediaQuery and breakpoint (#21512) @DDDDDanica
- [docs] Improve npm homepage links (#21452) @eps1lon
- [docs] Move more prop docs into IntelliSense (#21383) @eps1lon
- [docs] Restrict docs markdown and demos to 80ch (#21481) @eps1lon
- [docs] Reword palette intention and fix format (#21477) @DDDDDanica
- [docs] Update v4 migration guide (#21462) @eps1lon

### Core

- [typescript-to-proptypes] Integrate into monorepo @eps1lon
- [test] Add type test CardHeader title component (#21590) @eps1lon
- [test] Fix type tests not being type checked (#21539) @eps1lon
- [test] Ignore empty vrtests (#21450) @eps1lon
- [test] Improve makeStyles error coverage (#21568) @eps1lon
- [test] Migrate Typography to testing-library (#21534) @marcosvega91
- [test] Move size comparison details to separate page (#21504) @eps1lon
- [test] Use testing-library in MenuItem (#21391) @eps1lon
- [test] Use testing-library in StepButton (#21406) @baterson
- [test] Use testing-library in Stepper (#21400) @baterson
- [core] Batch small changes (#21419) @oliviertassinari
- [core] Batch small changes (#21553) @oliviertassinari
- [core] Disable caching for yarn proptypes permanently (#21414) @eps1lon
- [core] Extend env for build script (#21403) @eps1lon
- [core] Fix react next patch and prevent regression (#21495) @eps1lon
- [core] Fork typescript-to-proptypes (#21497) @eps1lon
- [core] Misc branch cleaning (#21459) @eps1lon
- [core] Misc prettier changes (#21484) @eps1lon
- [core] Run prettier on the JSON sources (#21556) @oliviertassinari
- [core] Type custom `onChange` implementations with a generic react event (#21552) @eps1lon

## Older versions

Changes before 5.x are listed in our [changelog for older versions](https://github.com/mui/material-ui/blob/HEAD/CHANGELOG.old.md).
