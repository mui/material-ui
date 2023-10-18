# [Versions](https://mui.com/versions/)

## 5.14.14

<!-- generated comparing v5.14.13..master -->

_Oct 17, 2023_

A big thanks to the 24 contributors who made this release possible. Here are some highlights ✨:
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.14.14`

- &#8203;<!-- 29 -->[material-ui][AppBar] Support all default palette colors in TypeScript (#39389) @BreakBB
- &#8203;<!-- 28 -->[material-ui][AvatarGroup] Add `renderSurplus` prop (#39283) @uuxxx
- &#8203;<!-- 25 -->[material-ui][Box] Fix system properties has incorrect `Theme` interface when applied directly (#39404) @Semigradsky
- &#8203;<!-- 04 -->[material-ui][Pagination] Update `type` parameter of `getItemAriaLabel` prop (#39390) @Simer13
- &#8203;<!-- 06 -->[material][tab] Show/hide scroll buttons for dynamically added children (#39415) @brijeshb42

### `@mui/base@5.0.0-beta.20`

- &#8203;<!-- 26 -->[base-ui][Menu] Do not reopen the menu after clicking on a trigger in Safari (#39393) @michaldudak

### `@mui/material-next@6.0.0-alpha.106`

- &#8203;<!-- 23 -->[Divider][material-next] Add Divider component (#39179) @Best-Sardar

### `@mui/joy@5.0.0-beta.11`

- &#8203;<!-- 08 -->[joy-ui][List] Add the `marker` prop (#39313) @siriwatknp
- &#8203;<!-- 07 -->[joy-ui][Skeleton] Fix semi-transparent scenario when with surface components and color inversion (#39400) @TheNatkat
- &#8203;<!-- 06 -->[joy-ui][Textarea] Fix focus ring for error state (#39391) @vineetjk

### `@mui/icons-material@5.14.14`

- &#8203;<!-- 09 -->[icons] Fix VoiceChatOutlined showing the wrong icon (#39418) @devuser200

### `@mui/system@5.14.14`

- &#8203;<!-- 03 -->[mui-system][style] bug fix for style value check color in nullable object (#39457) @DarhkVoyd

### `@mui/styled-engine-sc@6.0.0-alpha.2`

- &#8203;<!-- 05 -->[styled-engine-sc] Fix TS issues because of missing types (#39395) @mnajdova

### Docs

- &#8203;<!-- 27 -->[docs][base-ui] Renaming demos to BaseXxx (#39104) @christophermorin
- &#8203;<!-- 26 -->[docs] Accessibility in Base UI (#39264) @michaldudak
- &#8203;<!-- 22 -->[docs] Fix 301 redirection @oliviertassinari
- &#8203;<!-- 21 -->[docs] Improve Base UI table of contents for APIs (#39412) @ZeeshanTamboli
- &#8203;<!-- 20 -->[docs] Adjust design kits-related content (#39367) @danilo-leal
- &#8203;<!-- 19 -->[docs] Revise the Contributing Guide (#39190) @samuelsycamore
- &#8203;<!-- 12 -->[docs][joy-ui] Fix row hover prop name in the Table page (#39431) @adrienbrault
- &#8203;<!-- 11 -->[docs][joy-ui] Fix color inversion demos (#39403) @danilo-leal
- &#8203;<!-- 10 -->[docs][material-ui] Remove irrelevant TODO from Snackbar demo (#39396) @ZeeshanTamboli
- &#8203;<!-- 06 -->[docs][material-ui][Table] Bug in "Sorting & Selecting" demo (#39426) @codewithrabeeh
- &#8203;<!-- 05 -->[docs][joy-ui][typography] Update docs after lineHeight changes (#39366) @zanivan

### Core

- &#8203;<!-- 24 -->[core] Fix multiple typos across the repo (#39422) @parikshitadhikari
- &#8203;<!-- 18 -->[docs-infra] Add refinements to the API content design (#39425) @danilo-leal
- &#8203;<!-- 17 -->[docs-infra] Add a min height to the layout component (#39416) @danilo-leal
- &#8203;<!-- 16 -->[docs-infra] Prevent horizontal scroll in the TOC (#39417) @danilo-leal
- &#8203;<!-- 15 -->[docs-infra] Add a collapsible list & table views to the API content display (#38265) @alexfauquette
- &#8203;<!-- 14 -->[docs-infra] Adjust the `kbd` tag styles (#39397) @danilo-leal
- &#8203;<!-- 13 -->[docs-infra] Fix strong style regression (#39384) @oliviertassinari
- &#8203;<!-- 04 -->[website] Add the LinkedIn profile to the contributors section on the About page (#39455) @chhawinder
- &#8203;<!-- 03 -->[website] Update new role template (#39386) @oliviertassinari
- &#8203;<!-- 02 -->[website] Add stray design fine-tunning to the Pricing page (#39472) @danilo-leal
- &#8203;<!-- 01 -->[website] Fix career anchor link to perks & benefits @oliviertassinari

All contributors of this release in alphabetical order: @adrienbrault, @alexfauquette, @Best-Sardar, @BreakBB, @brijeshb42, @chhawinder, @christophermorin, @codewithrabeeh, @danilo-leal, @DarhkVoyd, @devuser200, @michaldudak, @mnajdova, @oliviertassinari, @parikshitadhikari, @samuelsycamore, @Semigradsky, @Simer13, @siriwatknp, @TheNatkat, @uuxxx, @vineetjk, @zanivan, @ZeeshanTamboli

## 5.14.13

<!-- generated comparing v5.14.12..master -->

_Oct 10, 2023_

A big thanks to the 22 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Added support for `styled-components` v6 (#39042) @mnajdova

### `@mui/material@5.14.13`

- [Checkbox] Fix checkbox hover bg with extendTheme (#39319) @brijeshb42
- [Chip] Outlined Chip variant is wider than the Filled counterpart (#39342) @chirag3003
- [Select] Add notice about select's a11y improvement on v5.14.12 changelog (#39310) @DiegoAndai
- [Typography] Color prop check for primitive type (#39071) @DarhkVoyd
- [Pagination] Fix background color on hover and keyboard focus when using CSS theme variables (#39220) @ValkonX33
- [Popper] Add missing `styleOverrides` Popper type in theme (#39154) @axelbostrom
- [Slider] Support all default palette colors in TypeScript (#39058) @gugudwt

### `@mui/base@5.0.0-beta.19`

- [Menu] Add the anchor prop (#39297) @michaldudak

### `@mui/material-next@6.0.0-alpha.105`

- [Menu] Copy v5 Menu components (#39301) @mnajdova

### `@mui/joy@5.0.0-beta.10`

- [Autocomplete] Add `type=button` to clear button (#39263) @brijeshb42
- [Button] Fix the text wrap issue (#38696) @atharva3333
- [Drawer] Apply color inversion to content slot instead (#39312) @siriwatknp
- [Switch] Fix missing class name (#39327) @Bestwebdesign

### `@mui/styled-engine-sc@6.0.0-alpha.1`

- &#8203;<!-- 03 -->[system] Add support for `styled-components` v6 (#39042) @mnajdova

### Docs

- [joy-ui] Adjust the templates page card design (#39369) @danilo-leal
- Rename the Data Grid "Quick filter" to "Search" (#37724) @alexfauquette
- Remove obsolete translations (#39221) @mbrookes
- Update link to add custom color in palette (#39359) @ZeeshanTamboli
- Denser code demo @oliviertassinari
- Set up MD3 experiments pages (#39323) @mj12albert
- [Drawer] Fix right anchored persistent drawer intercepts click when it is closed (#39318) @ZeeshanTamboli
- [joy-ui] Revise the Color Inversion page (#39306) @danilo-leal
- [joy-ui] Remove redundant `error` prop from input validation demo (#39280) @sai6855
- [material-ui] Rename themed components doc, fix typos (#39368) @samuelsycamore
- [material-ui] Adjust the Material You Chip section (#39325) @danilo-leal
- [system] Add documentation on how to augment custom theme types for the `sx` prop callback (#39259) @3xp10it3r
- [joy-ui][Input] Add debounce input demo (#39300) @sai6855

### Core

- [docs-infra] Improve the open diamond sponsor spot callout (#39332) @danilo-leal
- [docs-infra] Fix Code Sandbox download issue (#39317) @ARJ2160
- [docs-infra] Remove overflow: hidden for demo gradient bg (#39225) @oliviertassinari
- [website] Fix footer responsiveness (#39355) @danilo-leal
- [website] Host Figma redirections in the store for now @oliviertassinari

All contributors of this release in alphabetical order: @3xp10it3r, @alexfauquette, @ARJ2160, @atharva3333, @axelbostrom, @Bestwebdesign, @brijeshb42, @chirag3003, @danilo-leal, @DarhkVoyd, @DiegoAndai, @gugudwt, @mbrookes, @michaldudak, @mj12albert, @mnajdova, @oliviertassinari, @sai6855, @samuelsycamore, @siriwatknp, @ValkonX33, @ZeeshanTamboli

## 5.14.12

<!-- generated comparing v5.14.11..master -->

_Oct 3, 2023_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 🎨 Introduced color inversion utilities to Joy UI (#38916) @siriwatknp
- 🚀 Added Chip and related TextField components to Material You @DiegoAndai, @mj12albert
- 🏗️ Improve the Select's component a11y by adding the combobox role and aria-controls attribute (#38785) @xulingzhihou. If your tests require selecting the trigger element by the "button" role, then you'll have to change it to use the "combobox" role instead

### `@mui/material@5.14.12`

- [DialogActions] Apply margin-left when children is not of `button` type (#39189) @sai6855
- [Select] Improve a11y by adding combobox role and aria-controls attribute (#38785) @xulingzhihou
- [Select] Fix MenuProps slotProps forwarding (#39177) @DiegoAndai
- [TextField] Polish types in Textfield demo (#39140) @sai6855
- [ButtonGroup] Fix rendering with conditional elements (#38989) @ZeeshanTamboli

### `@mui/system@5.14.12`

- [system] Add support for `variants` in the styled() util (#39073) @mnajdova
- [Box] Add missing logical spacing property types (#39169) @Semigradsky

### `@mui/base@5.0.0-beta.18`

- [useSlider] Align externalProps handling (#38854) @mj12albert
- [useTabs] Align external props handling for useTab/useTabPanel/useTabsList (#39037) @mj12albert
- [test] Fix import paths in useTab tests (#39291) @mj12albert

### `@mui/material-next@6.0.0-alpha.104`

- [Chip] Add Material You Chip component (#38927) @DiegoAndai
- [Divider] Copy v5 Divider (#39197) @mj12albert
- [FilledInput] Copy v5 FilledInput (#39040) @mj12albert
- [FormControl] Add FormControl component (#39032) @mj12albert
- [Select] Copy Select files from v5 (#39188) @DiegoAndai
- [TextField] Copy v5 TextField's inner components (#39166) @mj12albert

### `@mui/joy@5.0.0-beta.9`

- Introduce color inversion utilities (#38916) @siriwatknp
- Replace margin with `gap` property (#39147) @siriwatknp
- [CssBaseline] use Joy `GlobalStyles` (#39278) @siriwatknp
- [Drawer] Apply content styles from theme to content slot (#39199) @sai6855
- [List] Add gap and missing active styles (#39146) @siriwatknp
- [Switch] Slight adjustments to the design (#39276) @danilo-leal

### Docs

- [docs] Update Autocomplete demo for React 18 (#39162) @oliviertassinari
- [docs-infra] Tweak feedback footer section design (#36556) @danilo-leal
- [docs-infra] Improve code syntax highlight (#39181) @oliviertassinari
- [docs][base] Add Tailwind CSS + plain CSS demo on the TextArea page (#39046) @alisasanib
- [docs][base-ui] Fix style for root div of multiline input (#39182) @ttlpta
- [docs][base-ui] Improve Select's country select demo (#38983) @oliviertassinari
- [docs][joy-ui] Add scrollable tabs example (#39260) @siriwatknp
- [docs][joy-ui] Match `Autocomplete` github label demo to actual github label dropdown (#39228) @sai6855
- [docs][joy-ui] Refine the Rental dashboard template (#39059) @zanivan
- [docs][joy-ui] Removed incomplete sentence in the Aspect Ratio page (#39227) @Erik-McKelvey
- [docs][joy-ui] Fix typo in the Accordion page (#39226) @Erik-McKelvey
- [docs][joy-ui] Update and standardize template Sidemenus (#39271) @zanivan
- [docs][joy-ui] Add a roadmap page (#39163) @danilo-leal
- [docs][material-ui] Replace `Box` with `Stack` in applicable demos (#39174) @sai6855
- [docs][material-ui] Add small polish to the Templates page (#39224) @danilo-leal
- [docs][material-ui] Small revision to the Icons page (#38840) @danilo-leal

### Core

- Add next lint config to eslint (#39183) @Janpot
- [core] Update eslint rules (#39178) @romgrk
- [core] Fix Greg GitHub slug @oliviertassinari
- [core] Priority Support casing normalization @oliviertassinari
- [website] Add Heat map in pricing page (#39269) @oliviertassinari
- [website] Update `React Engineer - xCharts` Ashby link (#39172) @DanailH
- [website] Add Charts to the pricing table (#38680) @alexfauquette
- [website] Polish career experience @oliviertassinari
- [website] Simplify the Core products file (#39194) @danilo-leal

All contributors of this release in alphabetical order: @alexfauquette, @brijeshb42, @DanailH, @danilo-leal, @DiegoAndai, @Erik-McKelvey, @Janpot, @mj12albert, @mnajdova, @oliviertassinari, @romgrk, @sai6855, @Semigradsky, @siriwatknp, @xulingzhihou, @zanivan, @ZeeshanTamboli

## 5.14.11

<!-- generated comparing v5.14.10..master -->

_Sep 26, 2023_

A big thanks to the 23 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.14.11`

- [Autocomplete] Re-export `AutocompleteValue` to make it available from path import (#38638) @vadimka123
- [Select][material-ui] Missing aria-multiselectable attribute on multiple Select component (#38855) @gitstart
- [l10n] labelDisplayedRows is added for trTR localization (#39056) @tebersefa

### `@mui/utils@5.14.11`

- Support RSC in `isMuiElement` util (#38129) @sai6855

### `@mui/base@5.0.0-beta.17`

- [NumberInput] Support adornments (#38900) @anle9650
- [Menu] Align external props handling for useMenu/MenuButton/MenuItem (#38946) @mj12albert
- [Select] Align external props handling (#39038) @mj12albert
- [TextareaAutosize] Simplify logic and add test (#38728) @oliviertassinari

### `@mui/joy@5.0.0-beta.8`

- [Button] Fix disabled button styling when component prop is provided (#38996) @sai6855
- [Drawer] Add missing `JoyDrawer` in theme components (#39074) @Studio384

### `@mui/material-next@6.0.0-alpha.103`

- [FormControl] Copy v5 FormControl (#39039) @mj12albert

### `@mui/lab@5.0.0-alpha.146`

- [TreeView] Fix JSDoc comments in TreeView and TreeItem (#38874) @jergason

### Docs

- Improve focus trap demo (#38985) @oliviertassinari
- Add Tailwind CSS + plain CSS demo on the Tabs page (#39000) @alisasanib
- Improve the default theme viewer design (#39049) @danilo-leal
- Add live demo with CssVarsProvider (#38792) @oliviertassinari
- Fix wrong hash on Card's page (#39151) @mnajdova
- Revise the Drawer page (#38988) @danilo-leal
- Simplify the button's loading indicator demo (#39082) @danilo-leal
- Fix the Templates link on the Overview page (#39086) @danilo-leal
- Refine the Sign in template (#38942) @zanivan
- Add `use-count-up` integration with the Circular Progress (#38952) @anon-phantom

### Core

- [blog] Add a company values blog post (#38802) @mikailaread
- [core] Downgrade lerna to 7.2.0 (#39149) @michaldudak
- [core] Simplify docs feedback interaction (#39075) @alexfauquette
- [core] Improve ref type definition (#38903) @oliviertassinari
- [core] Simplify career (#39112) @oliviertassinari
- [core] Update Babel types along with source packages (#39070) @michaldudak
- [core] Add a comment to explain `useEnhancedEffect` (#39035) @Janpot
- [docs-infra] Fix code removal in table of content (#39165) @alexfauquette
- [docs-infra] Improve callouts design (#39084) @danilo-leal
- [docs-infra] Fix key warning in Base UI Slider slots section (#38954) @ZeeshanTamboli
- [docs-infra] Fix error when redirecting to the root page (#38451) @maheshguntur
- [docs-infra] Open demo crash in the right repository (#39006) @oliviertassinari
- [test] Split the test package (#39061) @michaldudak
- [website] React Engineer - xCharts role (#38976) @DanailH
- [website] Improve the highlighter component colors (#39087) @danilo-leal
- [website] Fix Pricing page row hover (#39097) @danilo-leal
- [website] Fix typo with straight quote @oliviertassinari
- [website] Sync about page @oliviertassinari
- [website] Update the about page (#38733) @danilo-leal
- [website] Small fixes on the X marketing page (#38975) @flaviendelangle
- [website] Add stray design tweaks to the X page (#38589) @danilo-leal

All contributors of this release in alphabetical order: @alexfauquette, @alisasanib, @anle9650, @anon-phantom, @DanailH, @danilo-leal, @DiegoAndai, @flaviendelangle, @gitstart, @Janpot, @jergason, @maheshguntur, @michaldudak, @mikailaread, @mj12albert, @mnajdova, @oliviertassinari, @sai6855, @Studio384, @tebersefa, @vadimka123, @zanivan, @ZeeshanTamboli

## 5.14.10

<!-- generated comparing v5.14.9..master -->

_Sep 18, 2023_

A big thanks to the 16 contributors who made this release possible. This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.14.10`

- &#8203;<!-- 20 -->[Chip] Add cursor CSS property reset (#38984) @DiegoAndai

### `@mui/utils@5.14.10`

- &#8203;<!-- 05 -->[utils] Move @types/prop-types back to dependencies (#39030) @Methuselah96

### `@mui/base@5.0.0-beta.16`

- &#8203;<!-- 24 -->[NumberInput][base-ui] Warn when changing control mode with `useControlled` (#38757) @sai6855
- &#8203;<!-- 23 -->[Select][base-ui] Fix Select button layout shift, add placeholder prop (#38796) @mj12albert
- &#8203;<!-- 22 -->[useList][base-ui] Accept arbitrary external props and forward to root (#38848) @mj12albert
- &#8203;<!-- 25 -->[Autocomplete][base-ui] Added ref to getInputProps return value (#38919) @DarhkVoyd

### `@mui/joy@5.0.0-beta.7`

- &#8203;<!-- 26 -->[AccordionGroup][joy-ui] Fix console warning when using custom color (#38950) @sai6855
- &#8203;<!-- 07 -->[GlobalStyles][joy-ui] Ensure compatibility with RSC (#38955) @mateuseap

### Docs

- &#8203;<!-- 21 -->[docs][base] Add Tailwind CSS + plain CSS demo on the NumberInput page (#38928) @alisasanib
- &#8203;<!-- 13 -->[docs][Dialog] Add non-modal dialog docs & demo (#38684) @mnajdova
- &#8203;<!-- 12 -->[docs] Fix number input wrong demo @oliviertassinari
- &#8203;<!-- 11 -->[docs] Exclude joy-ui LinearProgressCountup from visual regression (#38969) @siriwatknp
- &#8203;<!-- 09 -->[docs][joy-ui] Revise the Overview page (#38842) @danilo-leal
- &#8203;<!-- 08 -->[docs][material-ui][Pagination] Add `TablePagination` to the API components list (#38486) @MonstraG

### Core

- &#8203;<!-- 19 -->[core] Add more context about useEventCallback @oliviertassinari
- &#8203;<!-- 18 -->[core] Allow deeper import of @mui/utils (#38806) @oliviertassinari
- &#8203;<!-- 17 -->[core] Remove react-dom from @mui/utils peerDependencies (#38974) @michaldudak
- &#8203;<!-- 16 -->[core] Remove react from styled-engine dependencies (#38971) @michaldudak
- &#8203;<!-- 15 -->[core] Fix image loading bug on Safari @oliviertassinari
- &#8203;<!-- 14 -->[core] Fix bundle size upload to S3 job (#38956) @Janpot
- &#8203;<!-- 20 -->[core] Move eslint to peer dependencies of eslint-plugin-material-ui (#39033) @michaldudak
- &#8203;<!-- 10 -->[docs-infra] Display markdown lists correctly in docs for props description (#38973) @ZeeshanTamboli
- &#8203;<!-- 04 -->[website] Improve lighthouse score (#39011) @oliviertassinari
- &#8203;<!-- 03 -->[website] Fix lighthouse issues @oliviertassinari
- &#8203;<!-- 02 -->[website] Create the `InfoCard` component (#38987) @danilo-leal
- &#8203;<!-- 01 -->[website] Small tweaks for performance @oliviertassinari
- &#8203;<!-- 06 -->[zero][next] Setup nextjs plugin package (#38852) @brijeshb42

All contributors of this release in alphabetical order: @alisasanib, @brijeshb42, @danilo-leal, @DarhkVoyd, @DiegoAndai, @Janpot, @mateuseap, @Methuselah96, @michaldudak, @mj12albert, @mnajdova, @MonstraG, @oliviertassinari, @sai6855, @siriwatknp, @ZeeshanTamboli

## 5.14.9

<!-- generated comparing v5.14.8..master -->

_Sep 13, 2023_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🎉 Added the [`Drawer` component](https://mui.com/joy-ui/react-drawer/) to Joy UI (#38169) @mnajdova
- ✨ Material UI's [`ButtonGroup` component](https://mui.com/material-ui/react-button-group/) now styles button elements within it correctly (#38520) @ZeeshanTamboli

### `@mui/material@5.14.9`

- &#8203;<!-- 44 -->[ButtonGroup] Determine first, last and middle buttons to support different elements with correct styling (#38520) @ZeeshanTamboli
- &#8203;<!-- 07 -->[Modal] Fix console warning when onTransitionEnter , onTransitionExit provided (#38868) @sai6855
- &#8203;<!-- 54 -->Revert "[Autocomplete] Type multiple values with readonly arrays." (#38827) @mnajdova
- &#8203;<!-- 57 -->[Tabs] Scrollable tabs shouldn't crash when customizing their styles in the theme with slot callbacks (#38544) @brentertz
- &#8203;<!-- 59 -->[AlertTitle][BreadCrumbs] Fix inheritance message in docs (#38876) @sai6855

### `@mui/base@5.0.0-beta.15`

- &#8203;<!-- 63 -->[useSnackbar] Align externalProps handling (#38935) @mj12albert
- &#8203;<!-- 48 -->[useInput] Align ExternalProps naming (#38849) @mj12albert
- &#8203;<!-- 13 -->[FocusTrap] Refactor & cleanup (#38878) @mnajdova
- &#8203;<!-- 12 -->[FocusTrap] Fix `disableEnforceFocus` behavior (#38816) @mnajdova
- &#8203;<!-- 06 -->[Switch] Simplify source (#38910) @oliviertassinari

### `@mui/joy@5.0.0-beta.6`

- &#8203;<!-- 15 -->[Drawer] Add Drawer component (#38169) @mnajdova
- &#8203;<!-- 11 -->Reduce height of some variants (#38527) @zanivan
- &#8203;<!-- 10 -->Refine the default theme color palette (#38416) @zanivan
- &#8203;<!-- 34 -->[Dialog] Add `DialogActions`, `DialogTitle` and `DialogContent` (#38382) @siriwatknp
- &#8203;<!-- 60 -->[AccordionGroup] Add missing `variant` and `color` classes (#38814) @sai6855

### `@mui/lab@5.0.0-alpha.144`

- &#8203;<!-- 09 -->Add TypeScript deprecations (#38833) @oliviertassinari
- &#8203;<!-- 08 -->Fix `@mui/x-tree-view` dependency (#38822) @flaviendelangle

### `@mui/system@5.14.9`

- &#8203;<!-- 05 -->Remove dead code (#38884) @oliviertassinari
- &#8203;<!-- 04 -->Remove getInitColorSchemeScript leading spaces (#38794) @oliviertassinari

### `@mui/zero-vite-plugin@0.0.1-alpha.0`

- &#8203;<!-- 02 -->[vite] Create a package for vite plugin (#38685) @brijeshb42

### Docs

- &#8203;<!-- 53 -->[docs][base-ui] Improve recommended usage guide (#38570) @oliviertassinari
- &#8203;<!-- 52 -->[docs][base-ui] Create hooks contribution guide (#38679) @michaldudak
- &#8203;<!-- 51 -->[docs][base-ui] Structure and style revisions for Component docs (#38826) @samuelsycamore
- &#8203;<!-- 50 -->[docs][base-ui] Add Number Input to the all components page (#38839) @danilo-leal
- &#8203;<!-- 49 -->[docs][base-ui] Mark Popup with the Preview tag (#38851) @michaldudak
- &#8203;<!-- 47 -->[blog] Polish component reference name @oliviertassinari
- &#8203;<!-- 46 -->[blog] Fix missing card (#38834) @oliviertassinari
- &#8203;<!-- 45 -->[Button][docs][material-ui] Update the file upload demo (#38823) @danilo-leal
- &#8203;<!-- 33 -->[docs][DialogTitle] Fix props docs doesn't mention it extends `Typography` props (#38856) @sai6855
- &#8203;<!-- 32 -->[docs] Improve npm experience (#38906) @oliviertassinari
- &#8203;<!-- 31 -->[docs] Fix redirection to Base UI URLs @oliviertassinari
- &#8203;<!-- 30 -->[docs] Fix use of callouts (#38747) @oliviertassinari
- &#8203;<!-- 29 -->[docs] Fix 301 links for SEO @oliviertassinari
- &#8203;<!-- 28 -->[docs] Remove flag from installation page @oliviertassinari
- &#8203;<!-- 27 -->[docs] Fix strange break line on mobile in between product name @oliviertassinari
- &#8203;<!-- 26 -->[docs] Clearer npm package homepages (#38864) @oliviertassinari
- &#8203;<!-- 25 -->[docs] enableColorScheme prop was removed (#38795) @oliviertassinari
- &#8203;<!-- 24 -->[docs] Fix a11y issues in tables demos (#38829) @michaldudak
- &#8203;<!-- 62 -->[docs][joy-ui] Refine the Messages template (#38807) @zanivan
- &#8203;<!-- 22 -->[docs][joy-ui] Fix copy on the Tutorial page (#38907) @danilo-leal
- &#8203;<!-- 21 -->[docs][joy-ui] Fix grammar and update Usage section in color inversion page (#38850) @ZeeshanTamboli
- &#8203;<!-- 20 -->[docs][joy-ui] Revise the Lists page (#36324) @LadyBluenotes
- &#8203;<!-- 19 -->[docs][joy-ui] Refine the Profile Dashboard template (#38599) @zanivan
- &#8203;<!-- 18 -->[docs][material-ui] Revise the Paper component docs (#38841) @danilo-leal
- &#8203;<!-- 17 -->[docs][material-ui] Revise the Typography page (#38543) @danilo-leal
- &#8203;<!-- 16 -->[docs][material-ui] Revise and split up "Styled engine" doc (#37774) @samuelsycamore
- &#8203;<!-- 03 -->[TextareaAutosize][docs] Fix component creation in render (#38577) @oliviertassinari

### Examples

- &#8203;<!-- 14 -->[examples] Add shortcut to open example in online IDE (#38572) @oliviertassinari
- &#8203;<!-- 61 -->[examples][base-ui] Add Base UI + Vite + Tailwind CSS example in TypeScript (#37595) @dvkam

### Core

- &#8203;<!-- 65 -->[core] Remove package declaration from same package dependencies (#38951) @DiegoAndai
- &#8203;<!-- 64 -->[core] Remove workspace dependencies from root package.json (#38940) @michaldudak
- &#8203;<!-- 43 -->[core] Fix prop-types generation (#38831) @flaviendelangle
- &#8203;<!-- 42 -->[core] Move types packages to docs' devDependencies (#38914) @michaldudak
- &#8203;<!-- 41 -->[core] Improve DX when browsing the package on npm and GitHub @oliviertassinari
- &#8203;<!-- 40 -->[core] TrapFocus was renamed to FocusTrap @oliviertassinari
- &#8203;<!-- 39 -->[core] Add types extension for clarity @oliviertassinari
- &#8203;<!-- 38 -->[core] Hoist rewriteImportPaths to parent scope @oliviertassinari
- &#8203;<!-- 37 -->[core] Bump aws-cli orb to 4.1 (#38857) @Janpot
- &#8203;<!-- 36 -->[core] Explicitly define package dependencies (#38859) @michaldudak
- &#8203;<!-- 35 -->[core] Fix yarn docs:create-playground script @oliviertassinari
- &#8203;<!-- 56 -->[docs-infra] Improve show code button affordance (#38824) @danilo-leal
- &#8203;<!-- 55 -->[docs–infra] Fix callout container width (#38880) @oliviertassinari
- &#8203;<!-- 23 -->[docs-infra] Catch duplicated trailing splashes in links (#38758) @oliviertassinari
- &#8203;<!-- 01 -->[website] add Michel Engelen to the about us page (#38818) @michelengelen
- &#8203;<!-- 58 -->[website] Add a templates & design kits section to the Material UI page (#38617) @danilo-leal

All contributors of this release in alphabetical order: @brentertz, @brijeshb42, @danilo-leal, @DiegoAndai, @dvkam, @flaviendelangle, @Janpot, @LadyBluenotes, @michaldudak, @michelengelen, @mj12albert, @mnajdova, @oliviertassinari, @sai6855, @samuelsycamore, @siriwatknp, @zanivan, @ZeeshanTamboli

## 5.14.8

<!-- generated comparing v5.14.7..master -->

_Sep 5, 2023_

A big thanks to the 25 contributors who made this release possible.

### `@mui/material@5.14.8`

- &#8203;<!-- 53 -->ImageItemList fix incorrect (below) rendering (#38452) @omriklein
- &#8203;<!-- 42 -->[Button] Add demo for file upload (#38786) @anle9650
- &#8203;<!-- 12 -->[Slider] Add missing classes for `Slider` `InputLabel` `InputBase` `Radio` (#38401) @sai6855
- &#8203;<!-- 11 -->[Select] Merge slotProps.paper with internal Paper props (#38703) @michaldudak
- &#8203;<!-- 09 -->[Tabs] Fix `ref` type (#38717) @ZeeshanTamboli
- &#8203;<!-- 08 -->[TabScrollButton] Extend ButtonBase types (#38719) @ZeeshanTamboli

### `@mui/base@5.0.0-beta.14`

- &#8203;<!-- 50 -->[Autocomplete] Type multiple values with readonly arrays. (#38253) @pcorpet
- &#8203;<!-- 07 -->[TextField] Fix unstable height of memoized multiline TextField component (#37135) @amal-qb

### `@mui/joy@5.0.0-beta.5`

- &#8203;<!-- 53 -->[Accordion] Fix incorrect display of classname (#38695) @sai6855
- &#8203;<!-- 51 -->[AspectRatio] Correct `ratio` prop description (#38743) @sai6855
- &#8203;<!-- 43 -->[Button] Fix disablity of button (#38673) @sai6855
- &#8203;<!-- 35 -->[design] Stray design tweaks to components (#38476) @zanivan
- &#8203;<!-- 05 -->[Typography] Added position only when Skeleton is a direct child (#38799) @siriwatknp

### `@mui/lab@5.0.0-alpha.143`

- &#8203;<!-- 06 -->[TreeView] Use Tree View from MUI X in the lab (#38261) @flaviendelangle
- &#8203;<!-- 13 -->[LoadingButton] Fix HTML rule button > div forbidden nesting (#38584) @oliviertassinari

### `@mui/system@5.14.8`

- &#8203;<!-- 11 -->[system] Fix the inconsistent types of the `mergeBreakpointsInOrder` function (#38749) @imevanc
- &#8203;<!-- 10 -->[system] Fix maxWidth incorrectly resolving breakpoints with non-pixel units (#38633) @mj12albert
- &#8203;<!-- 05 -->[typescript] Introduce \*OwnProps interfaces for components (#36798) @szalonna

### Docs

- &#8203;<!-- 52 -->Update changelog (#38704) @mj12albert
- &#8203;<!-- 49 -->[docs][Autocomplete] Require referentially stable value (#38734) @michaldudak
- &#8203;<!-- 48 -->[docs][base-ui] Add type parameter to the button in prepareForSlot demo (#38640) @michaldudak
- &#8203;<!-- 47 -->[docs][base-ui] Fix the broken image in the Tailwind CSS guide (#38721) @michaldudak
- &#8203;<!-- 46 -->[docs][base-ui]: Working With Tailwind Guide - revises example code to avoid import errors (#38693) @christophermorin
- &#8203;<!-- 45 -->[docs][base] Add Tailwind CSS + plain CSS demo on the Menu page (#38618) @alisasanib
- &#8203;<!-- 44 -->[blog] Clearer blog release title @oliviertassinari
- &#8203;<!-- 43 -->[blog] Add a post for the Tree View migration (#38407) @flaviendelangle
- &#8203;<!-- 34 -->[docs] Fix broken links to Next.js docs (#38764) @ruflair
- &#8203;<!-- 33 -->[docs] Trim trailing whitespace (#38793) @oliviertassinari
- &#8203;<!-- 32 -->[docs] Fix a typo in lab-tree-view-to-mui-x.md @mbrookes
- &#8203;<!-- 31 -->[docs] Clean up not used Usage files (#38715) @danilo-leal
- &#8203;<!-- 30 -->[docs] Improve theme builder exceptions (#38709) @jyash97
- &#8203;<!-- 29 -->[docs] Polish Slider demos (#38759) @oliviertassinari
- &#8203;<!-- 28 -->[docs] Fix Joy UI docs link regression (#38761) @oliviertassinari
- &#8203;<!-- 27 -->[docs] Fix typo @oliviertassinari
- &#8203;<!-- 26 -->[docs] Fix e.g. typo (#38748) @oliviertassinari
- &#8203;<!-- 25 -->[docs] Fix Next.js pages router example redirect link (#38750) @sai6855
- &#8203;<!-- 24 -->[docs] Fix SEO issue broken links @oliviertassinari
- &#8203;<!-- 23 -->[docs] Improve SSR example reference (#38651) @oliviertassinari
- &#8203;<!-- 17 -->[docs][joy-ui] Integrate a count-up feature to the Linear Progress (#38738) @anon-phantom
- &#8203;<!-- 16 -->[docs][joy-ui] Fix Link's `overlay` prop demo (#38702) @danilo-leal
- &#8203;<!-- 15 -->[docs][joy-ui] Polish the Stack page (#38623) @danilo-leal
- &#8203;<!-- 14 -->[docs][material-ui] Adjust simple Slide demo (#38646) @rajgop1

### Core

- &#8203;<!-- 43 -->[core] Re-add nx and setup build caching (#38752) @brijeshb42
- &#8203;<!-- 41 -->[core] Remove dead code seoTitle @oliviertassinari
- &#8203;<!-- 40 -->[core] Use immutable refs (#38762) @oliviertassinari
- &#8203;<!-- 39 -->[core] Rework `typescript-to-proptypes` to share the AST parsing with `parseStyles` (#38517) @flaviendelangle
- &#8203;<!-- 38 -->[core] Fix CI @oliviertassinari
- &#8203;<!-- 37 -->[core] Remove unnecessary `@types/webpack` package (#38720) @ZeeshanTamboli
- &#8203;<!-- 36 -->[core] Remove duplicate prop @oliviertassinari

- &#8203;<!-- 22 -->[docs-infra] Fix mobile display in CodeSandbox (#38767) @oliviertassinari
- &#8203;<!-- 21 -->[docs-infra] Remove legacy GA (#37579) @alexfauquette
- &#8203;<!-- 20 -->[docs-infra] Fix emotion :first-child console log (#38690) @oliviertassinari
- &#8203;<!-- 19 -->[docs-infra] Fix leaking callout content (#38712) @danilo-leal
- &#8203;<!-- 18 -->[docs-infra] Remove emoji from callouts (#38694) @danilo-leal

- &#8203;<!-- 04 -->[website] Fix out of date discount value @oliviertassinari
- &#8203;<!-- 03 -->[website] Fix out-of-date label on Toolpad (#38744) @bharatkashyap
- &#8203;<!-- 02 -->[website] Fine-tune branding buttons box shadows (#38731) @danilo-leal
- &#8203;<!-- 01 -->[website] Fix pricing table style (#38681) @alexfauquette

All contributors of this release in alphabetical order: @alexfauquette, @alisasanib, @amal-qb, @anle9650, @anon-phantom, @bharatkashyap, @brijeshb42, @christophermorin, @danilo-leal, @flaviendelangle, @imevanc, @jyash97, @mbrookes, @michaldudak, @mj12albert, @oliviertassinari, @omriklein, @pcorpet, @rajgop1, @ruflair, @sai6855, @siriwatknp, @szalonna, @zanivan, @ZeeshanTamboli

## 5.14.7

<!-- generated comparing v5.14.6..master -->

_Aug 29, 2023_

A big thanks to the 11 contributors who made this release possible. This release focuses primarily on 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.14.7`

- [Autocomplete] Fix listbox opened unexpectedly when component is `disabled` (#38611) @mj12albert
- [Select][material-ui] Fix select menu moving on scroll when disableScrollLock is true (#37773) @VishruthR

### `@mui/base@5.0.0-beta.13`

- [useButton][base-ui] Accept arbitrary props in getRootProps and forward them (#38475) @DiegoAndai

### `@mui/zero-runtime@0.0.1-alpha.1`

- [system][zero][tag] Add support for sx prop (#38535) @brijeshb42

### Docs

- [docs] Number Input docs fixes (#38521) @mj12albert
- [docs] Show all the code in the usage section (#38691) @oliviertassinari
- [docs][joy-ui] Change the customization and how-to guides docs tree (#38396) @danilo-leal
- [docs][lab][LoadingButton] Improve `loading` prop documentation (#38625) @sai6855
- [docs][material-ui] Format `key` prop JSDoc description in `Snackbar` component code correctly (#38603) @jaydenseric

### Core

- [core] Add use-client to custom icons (#38132) @mj12albert
- [core] Remove unnecessary `@types/jsdom` (#38657) @renovate[bot]
- [core] Improve sponsors GA labels (#38649) @oliviertassinari
- [core] Fix ESM issues with regression tests (#37963) @Janpot
- [core] Potential fix for intermittent ci crashes in e2e test (#38614) @Janpot
- [docs-infra] Mark unstable components with a chip in the nav drawer (#38573) @michaldudak
- [docs-infra] Adjust the Material You playground demo design (#38636) @danilo-leal
- [docs-infra] Hide the SkipLink button if user prefers reduced motion (#38632) @DerTimonius
- [website] Add tiny fixes the homepage Sponsors section (#38635) @danilo-leal

All contributors of this release in alphabetical order: @brijeshb42, @danilo-leal, @DerTimonius, @DiegoAndai, @Janpot, @jaydenseric, @mj12albert, @oliviertassinari, @renovate[bot], @sai6855, @VishruthR

## 5.14.6

<!-- generated comparing v5.14.5..master -->

_Aug 23, 2023_

A big thanks to the 21 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Added the [Popup](https://mui.com/base-ui/react-popup/) component to Base UI (#37960) @michaldudak
  It's intended to replace the Popper component, which uses the deprecated Popper JS library. The Popup is built on top of Floating UI and has a similar API to the Popper.
- 🚀 Added the [Accordion](https://mui.com/joy-ui/react-accordion/) component to Joy UI (#38164) @siriwatknp
- 🚀 Added InputBase and ButtonBase components to `material-next` (#38319) @DiegoAndai @mj12albert
- 🔋 First iteration on the zero-runtime styling engine compatible with Server Components (#38378) @brijeshb42

### `@mui/material@5.14.6`

- [Modal] Update it to use the useModal hook (#38498) @mnajdova
- [Select] Add `root` class to `SelectClasses` (#38424) @sai6855
- [Skeleton] Soften the pulse animation (#38506) @oliviertassinari
- [TextField] Fix onClick regressions handling changes (#38474) @mj12albert
- [TextField] Fix TextField onClick test (#38597) @mj12albert

### `@mui/base@5.0.0-beta.12`

- [Popup] New component (#37960) @michaldudak

### `@mui/joy@5.0.0-beta.3`

- [Accordion] Add Joy UI Accordion components (#38164) @siriwatknp
- [Select] Add `required` prop (#38167) @siriwatknp
- Miscellaneous fixes (#38462) @siriwatknp

### `@mui/material-next@6.0.0-alpha.98`

- [ButtonBase] Add ButtonBase component (#38319) @DiegoAndai
- [Input] Add InputBase component (#38392) @mj12albert

### `@mui/zero-runtime@0.0.1-alpha.0`

- Implementation of styled tag processor for linaria (#38378) @brijeshb42

### Docs

- [blog] Clarify tree view move @oliviertassinari
- [docs] Improve the "Understanding MUI packages" page images (#38619) @danilo-leal
- [docs][base-ui] Revise the structure of the Component docs (#38529) @samuelsycamore
- [docs][base-ui] Fix Menu Hooks demo (#38479) @homerchen19
- [docs][base-ui] Correct the MUI System quickstart example (#38496) @michaldudak
- [docs][base-ui] Add Tailwind & plain CSS demos for Autocomplete page (#38157) @mj12albert
- [docs][base-ui] Add Tailwind CSS + plain CSS demo on the Input page (#38302) @alisasanib
- [docs][base-ui] Add Tailwind CSS + plain CSS demo on the Snackbar, Badge, Switch pages (#38425) @alisasanib
- [docs][base-ui] Add Tailwind CSS + plain CSS demo on the Slider page (#38413) @alisasanib
- [docs][base-ui] Add Tailwind CSS + plain CSS demo on the Select page (#38367) @alisasanib
- [docs][joy-ui] Fix typo: Classname -> Class name for consistency (#38510) @alexfauquette
- [docs][joy-ui] Revise the theme color page (#38402) @danilo-leal
- [docs][joy-ui] Sort templates by popularity (#38490) @oliviertassinari
- [docs][joy-ui] Fix the `fullWidth` prop description for the Input (#38545) @0xturner
- [docs][joy-ui] Updated the List playground demo (#38499) @zanivan
- [docs][joy-ui] Changed bgcolor of the Playground demo (#38502) @zanivan
- [docs][material-ui] Fix key warning in SimpleDialog demo (#38580) @ZeeshanTamboli
- [docs][material-ui] Fixed Google Fonts link for material two-tone icons in CodeSandbox and Stackblitz (#38247) @ZeeshanTamboli
- [docs][material-ui] Fix the Drawer's `onClose` API docs (#38273) @johnmatthiggins
- [docs][material-ui] Improve nav link tab example (#38315) @oliviertassinari
- [docs][material-ui] Fix missing import in the styled engine guide (#38450) @codersjj
- [docs][material-ui][Dialog] Improve screen reader announcement of Customized Dialog (#38592) @ZeeshanTamboli
- [docs] Add 3rd party libraries integration examples for Joy Input (#38541) @siriwatknp
- [docs] Hide translation call to action (#38449) @cristianmacedo
- [docs] Fix codemod name in changelog of v5.14.4 (#38593) @GresilleSiffle
- [docs] More space for theme builder (#38532) @oliviertassinari
- [docs] Fix the math symbol of the width sx prop range @oliviertassinari
- [docs] Fix typo on a11y section of Tabs @oliviertassinari
- [docs] Clarify System peer dependencies @oliviertassinari
- [docs] Fix horizontal scrollbar @oliviertassinari
- [docs] Code style convention @oliviertassinari
- [docs] Fix typo in Base UI @oliviertassinari
- [docs] Update the backers page (#38505) @danilo-leal
- [docs] Add stray design adjustments to the docs (#38501) @danilo-leal
- [docs] Use IBM Plex Sans in Tailwind CSS demos (#38464) @mnajdova
- [docs] Fix SEO issues reported by ahrefs (#38423) @oliviertassinari

### Examples

- [examples] Start to remove Gatsby (#38567) @oliviertassinari
- [examples][joy-ui] Fix Joy UI example CLI (#38531) @oliviertassinari
- [examples][joy-ui] Improve example when using Next Font (#38540) @mwskwong

### Core

- [CHANGELOG] Fix issues in highlight @oliviertassinari
- [core] Remove redundant `@material-ui/` aliases from regression test webpack config (#38574) @ZeeshanTamboli
- [core] Fix CI error @oliviertassinari
- [core] Remove unnecessary Box (#38461) @oliviertassinari
- [core] Set GitHub Action top level permission @oliviertassinari
- [docs-infra][joy-ui] Polish the usage and CSS vars playgrounds (#38600) @danilo-leal
- [docs-infra] Support link title (#38579) @oliviertassinari
- [docs-infra] Fix ad layout shift (#38622) @oliviertassinari
- [docs-infra] Add light tweaks to the ad container (#38504) @danilo-leal
- [docs-infra] Fix anchor scroll without tabs (#38586) @oliviertassinari
- [docs-infra] Retain velocity animation speed (#38470) @oliviertassinari
- [docs-infra] Follow import and CSS token standard (#38508) @oliviertassinari
- [docs-infra] Add icon to callouts (#38525) @alexfauquette
- [docs-infra] Fix the anchor link on headings (#38528) @danilo-leal
- [docs-infra] Cleanup code on demo code block expansion (#38522) @ZeeshanTamboli
- [docs-infra] Improve the heading buttons positioning (#38428) @danilo-leal
- [docs-infra] Customize the blockquote design (#38503) @danilo-leal
- [docs-infra] Improve the alert before a negative feedback (#38500) @danilo-leal
- [docs-infra] Fix GoogleAnalytics missing event for code copy (#38469) @alexfauquette
- [docs-infra] Improve affordance on the code block expansion (#38421) @danilo-leal
- [website] Fine-tune the branding theme buttons (#38588) @danilo-leal
- [website] Improve the Base UI hero section demo (#38585) @danilo-leal
- [website] Add stray design improvements to the Material UI page (#38590) @danilo-leal
- [website] Fix mobile view Material UI page (#38568) @oliviertassinari
- [website] Fix reference to the data grid @oliviertassinari
- [website] Configure Apple Pay @oliviertassinari
- [website] Fix template link on the homepage (#38471) @danilo-leal

All contributors of this release in alphabetical order: @0xturner, @alexfauquette, @alisasanib, @brijeshb42, @codersjj, @cristianmacedo, @danilo-leal, @DiegoAndai, @GresilleSiffle, @homerchen19, @johnmatthiggins, @michaldudak, @mj12albert, @mnajdova, @mwskwong, @oliviertassinari, @sai6855, @samuelsycamore, @siriwatknp, @zanivan, @ZeeshanTamboli

## 5.14.5

<!-- generated comparing v5.14.4..master -->

_Aug 14, 2023_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- @mnajdova [made it easier to use third-party components in Base UI slots](https://mui.com/base-ui/getting-started/customization/#overriding-subcomponent-slots) with the introduction of the `prepareForSlot` utility (#38138)

### `@mui/material@5.14.5`

- &#8203;<!-- 04 -->[TextField] Fix to handle `onClick` on root element (#38072) @LukasTy

### `@mui/codemod@5.14.5`

- &#8203;<!-- 31 -->[codemod] Add v5.0.0/tree-view-moved-to-x codemod (#38248) @flaviendelangle

### `@mui/joy@5.0.0-beta.2`

- &#8203;<!-- 07 -->[Input][joy-ui] Fix the `FormHelperText` icon color (#38387) @TheNatkat
- &#8203;<!-- 06 -->[Skeleton][joy-ui] Soften the pulse animation (#38384) @zanivan
- &#8203;<!-- 05 -->[TabPanel][joy-ui] Add `keepMounted` prop (#38293) @decadef20

### `@mui/base@5.0.0-beta.11`

- &#8203;<!-- 30 -->[base-ui] Remove the legacy Extend\* types (#38184) @michaldudak
- &#8203;<!-- 29 -->[base-ui] Add `useModal` hook (#38187) @mnajdova
- &#8203;<!-- 28 -->[base-ui] Add `prepareForSlot` util (#38138) @mnajdova
- &#8203;<!-- 26 -->[useButton][base-ui] Fix tabIndex not being forwarded (#38417) @DiegoAndai
- &#8203;<!-- 25 -->[useButton][base-ui] Fix onFocusVisible not being handled (#38399) @DiegoAndai

### Docs

- &#8203;<!-- 32 -->[blog] Blog post for MUI X mid v6. Date Pickers, Data Grid, and Charts (#38241) @richbustos
- &#8203;<!-- 35 -->[docs][base-ui] Update number input API docs (#38363) @mj12albert
- &#8203;<!-- 29 -->[docs] Improve page transition speed (#38394) @oliviertassinari
- &#8203;<!-- 28 -->[docs] Improve examples (#38398) @oliviertassinari
- &#8203;<!-- 19 -->[docs][docs] Add `FileUpload` demo (#38420) @sai6855
- &#8203;<!-- 18 -->[docs][joy-ui] Refine the Order Dashboard template design (#38395) @zanivan
- &#8203;<!-- 17 -->[docs][material-ui][joy-ui] Simplify the Quickstart section on the Usage page (#38385) @danilo-leal
- &#8203;<!-- 16 -->[docs][Menu][joy] Explain how to control the open state (#38355) @michaldudak
- &#8203;<!-- 15 -->[docs][material] Revise the Support page (#38207) @samuelsycamore
- &#8203;<!-- 14 -->[docs][material-ui] Remove incorrect `aria-label`s in extended variant examples of Floating Action Button (#37170) @ashleykolodziej
- &#8203;<!-- 13 -->[docs][material-ui] Adjust slightly the installation page content (#38380) @danilo-leal
- &#8203;<!-- 12 -->[docs][Switch] Fix the readOnly class name in docs (#38277) @michaldudak
- &#8203;<!-- 11 -->[docs][TablePagination] Add Tailwind CSS & plain CSS introduction demo (#38286) @mnajdova

### Examples

- &#8203;<!-- 10 -->[examples] Add Joy UI + Vite.js + TypeScript example app (#37406) @nithins1

### Core

- &#8203;<!-- 30 -->[core] Consistent URL add leading / @oliviertassinari
- &#8203;<!-- 27 -->[docs-infra] Fix rebase issue @oliviertassinari
- &#8203;<!-- 26 -->[docs-infra] Fix typo in docs infra docs @oliviertassinari
- &#8203;<!-- 25 -->[docs-infra] Fix nested list margin (#38456) @oliviertassinari
- &#8203;<!-- 24 -->[docs-infra] Move the Diamond Sponsors to the TOC (#38410) @danilo-leal
- &#8203;<!-- 22 -->[docs-infra] Move imports into page data (#38297) @alexfauquette
- &#8203;<!-- 21 -->[docs-infra] Adjust heading styles (#38365) @danilo-leal
- &#8203;<!-- 20 -->[docs-infra] Fix info callout border color (#38370) @danilo-leal
- &#8203;<!-- 05 -->[website] Upgrade the homepage hero demos design (#38388) @danilo-leal
- &#8203;<!-- 04 -->[website] Improve Base UI hero section demo (#38255) @danilo-leal
- &#8203;<!-- 03 -->[website] Fix EmailSubscribe look (#38429) @oliviertassinari
- &#8203;<!-- 02 -->[website] Link Discord in footer (#38369) @richbustos
- &#8203;<!-- 01 -->[website] Clean up the `GetStartedButtons` component (#38256) @danilo-leal

All contributors of this release in alphabetical order: @alexfauquette, @ashleykolodziej, @danilo-leal, @decadef20, @DiegoAndai, @flaviendelangle, @LukasTy, @michaldudak, @mj12albert, @mnajdova, @nithins1, @oliviertassinari, @richbustos, @sai6855, @samuelsycamore, @TheNatkat, @zanivan

## 5.14.4

<!-- generated comparing v5.14.3..master -->

_Aug 8, 2023_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🎉 Added [Number Input](https://mui.com/base-ui/react-number-input/) component & [useNumberInput](https://mui.com/base-ui/react-number-input/#hook) hook in [Base UI](https://mui.com/base-ui/getting-started/) @mj12albert

### `@mui/material@5.14.4`

- &#8203;<!-- 25 -->[Checkbox][material] Add size classes (#38182) @michaldudak
- &#8203;<!-- 03 -->[Typography] Improve inherit variant logic (#38123) @ZeeshanTamboli

### `@mui/system@5.14.4`

- &#8203;<!-- 34 -->Revert "[Box] Remove `component` from TypeMap (#38168)" (#38356) @michaldudak

### `@mui/base@5.0.0-beta.10`

#### Breaking changes

- &#8203;<!-- 32 -->[base] Ban default exports (#38200) @michaldudak

  Base UI default exports were changed to named ones. Previously we had a mix of default and named ones.
  This was changed to improve consistency and avoid problems some bundlers have with default exports.
  See https://github.com/mui/material-ui/issues/21862 for more context.

  ```diff
  - import Button, { buttonClasses } from '@mui/base/Button';
  + import { Button, buttonClasses } from '@mui/base/Button';
  - import BaseMenu from '@mui/base/Menu';
  + import { Menu as BaseMenu } from '@mui/base/Menu';
  ```

  Additionally, the `ClassNameGenerator` has been moved to the directory matching its name:

  ```diff
  - import ClassNameGenerator from '@mui/base/className';
  + import { ClassNameGenerator } from '@mui/base/ClassNameGenerator';
  ```

  A codemod is provided to help with the migration:

  ```bash
  npx @mui/codemod v5.0.0/base-use-named-exports <path>
  ```

#### Changes

- &#8203;<!-- 31 -->[base] Create useNumberInput and NumberInput (#36119) @mj12albert
- &#8203;<!-- 28 -->[Select][base] Fix flicker on click of controlled Select button (#37855) @VishruthR
- &#8203;<!-- 09 -->[Dropdown] Fix imports of types (#38296) @yash-thakur

### `@mui/joy@5.0.0-beta.1`

- &#8203;<!-- 06 -->[joy-ui][MenuButton] Fix disable of `MenuButton` (#38342) @sai6855

### Docs

- &#8203;<!-- 33 -->[docs][AppBar] Fix `ResponsiveAppBar` demo logo href (#38346) @iownthegame
- &#8203;<!-- 30 -->[docs][base] Add Tailwind CSS + plain CSS demo on the Button page (#38240) @alisasanib
- &#8203;<!-- 29 -->[docs][Menu][base] Remove `Unstyled` prefix from demos' function names (#38270) @sai6855
- &#8203;<!-- 22 -->[docs] Add themeable component guide (#37908) @siriwatknp
- &#8203;<!-- 21 -->[docs] Fix Joy UI demo background color (#38307) @oliviertassinari
- &#8203;<!-- 20 -->[docs] Update API docs for Number Input component (#38301) @ZeeshanTamboli
- &#8203;<!-- 14 -->[docs][joy-ui] Revise the theme typography page (#38285) @danilo-leal
- &#8203;<!-- 13 -->[docs][joy-ui] Add TS demo for Menu Bar (#38308) @sai6855
- &#8203;<!-- 10 -->[docs][joy-ui] Updated Typography callout at getting started (#38289) @zanivan
- &#8203;<!-- 12 -->[docs][joy-ui] Fix the Inter font installation instructions (#38284) @danilo-leal
- &#8203;<!-- 11 -->[docs][material] Add note to Autocomplete about ref forwarding (#38305) @samuelsycamore
- &#8203;<!-- 05 -->[docs][Skeleton] Make the demos feel more realistic (#38212) @oliviertassinari

- &#8203;<!-- 08 -->[examples] Swap Next.js examples between App Router and Pages Router; update naming convention (#38204) @samuelsycamore
- &#8203;<!-- 07 -->[examples][material-ui] Add Material UI + Next.js (App Router) example in JS (#38323) @samuelsycamore
- &#8203;<!-- 27 -->[blog] Discord announcement blog (#38258) @richbustos
- &#8203;<!-- 26 -->[blog] Fix 301 links to Toolpad @oliviertassinari
- &#8203;<!-- 04 -->[website] Updating Charts demo with real charts usage for MUI X marketing page (#38317) @richbustos
- &#8203;<!-- 03 -->[website] Adjust styles of the Product section on the homepage (#38366) @danilo-leal
- &#8203;<!-- 02 -->[website] Add Nora teamMember card to 'About' (#38358) @noraleonte
- &#8203;<!-- 01 -->[website] Fix image layout shift (#38326) @oliviertassinari

### Core

- &#8203;<!-- 24 -->[core] Fix docs demo export function consistency (#38191) @oliviertassinari
- &#8203;<!-- 23 -->[core] Fix the link-check script on Windows (#38276) @michaldudak
- &#8203;<!-- 26 -->[core] Use @testing-library/user-event direct API (#38325) @mj12albert
- &#8203;<!-- 29 -->[core] Port GitHub workflow for ensuring triage label is present (#38312) @DanailH
- &#8203;<!-- 19 -->[docs-infra] Consider files ending with .types.ts as props files (#37533) @mnajdova
- &#8203;<!-- 18 -->[docs-infra] Fix skip to content design (#38304) @oliviertassinari
- &#8203;<!-- 17 -->[docs-infra] Add a general round of polish to the API content display (#38282) @danilo-leal
- &#8203;<!-- 16 -->[docs-infra] Make the side nav collapse animation snappier (#38259) @danilo-leal
- &#8203;<!-- 15 -->[docs-infra] New Component API design followup (#38183) @cherniavskii
- &#8203;<!-- 06 -->[test] Remove unnecessary `async` keyword from test (#38373) @ZeeshanTamboli

All contributors of this release in alphabetical order: @alisasanib, @cherniavskii, @DanailH, @danilo-leal, @iownthegame, @michaldudak, @mj12albert, @mnajdova, @noraleonte, @oliviertassinari, @richbustos, @sai6855, @samuelsycamore, @siriwatknp, @VishruthR, @yash-thakur, @zanivan, @ZeeshanTamboli

## 5.14.3

<!-- generated comparing v5.14.2..master -->

_Jul 31, 2023_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 🚀 [Joy UI](https://mui.com/joy-ui/getting-started/) is now in Beta
- ✨ Refine [Joy UI](https://mui.com/joy-ui/getting-started/)'s default theme @siriwatknp @zanivan
- 🎉 Added Dropdown higher-level menu component [Base UI](https://mui.com/base-ui/getting-started/) @michaldudak
- 💫 Added Material You [Badge](https://mui.com/material-ui/react-badge/#material-you-version) to `material-next` (#37850) @DiegoAndai

### `@mui/material@5.14.3`

- &#8203;<!-- 36 -->[Autocomplete][material][joy] Add default `getOptionLabel` prop in ownerState (#38100) @DSK9012
- &#8203;<!-- 26 -->[Menu][Divider][material] Do not allow focus on Divider when inside Menu list (#38102) @divyammadhok
- &#8203;<!-- 06 -->[typescript][material] Rename one letter type parameters (#38155) @michaldudak
- &#8203;<!-- 08 -->[Menu][material] Fixes slots and slotProps overriding defaults completely (#37902) @gitstart
- &#8203;<!-- 07 -->[Theme][material] Add missing styleOverrides type for theme MuiStack (#38189) @DiegoAndai
- &#8203;<!-- 04 -->[typescript][material] Add `component` field to `*Props` types (#38084) @michaldudak

### `@mui/base@5.0.0-beta.9`

#### Breaking changes

- &#8203;<!-- 11 -->[Dropdown][base][joy] Introduce higher-level menu component (#37667) @michaldudak

#### Other changes

- &#8203;<!-- 33 -->[typescript][base] Rename one letter type parameters (#38171) @michaldudak

### `@mui/joy@5.0.0-beta.0`

- &#8203;<!-- 10 -->[joy] Refine the default theme (#36843) @siriwatknp

### `@mui/material-next@6.0.0-alpha.95`

- &#8203;<!-- 35 -->[Badge][material-next] Add Badge component (#37850) @DiegoAndai
- &#8203;<!-- 30 -->[Chip][material-next] Copy chip component from material (#38053) @DiegoAndai
- &#8203;<!-- 09 -->[typescript][material-next] Rename one letter type parameters (#38172) @michaldudak

### `@mui/system@5.14.3`

- &#8203;<!-- 32 -->[Box][system] Remove `component` from TypeMap (#38168) @michaldudak
- &#8203;<!-- 05 -->[Stack][system] Fix CSS selector (#37525) @sai6855

### Docs

- &#8203;<!-- 49 -->[docs] Update Joy UI's package README (#38262) @ZeeshanTamboli
- &#8203;<!-- 48 -->[docs][base-ui] Add new batch of coming soon pages (#38025) @danilo-leal
- &#8203;<!-- 44 -->[docs] fix links to standardized examples (#38193) @emmanuel-ferdman
- &#8203;<!-- 43 -->[docs-infra] Small design polish to the Diamond Sponsor container (#38257) @danilo-leal
- &#8203;<!-- 42 -->[docs-infra] Show props in the table of content (#38173) @alexfauquette
- &#8203;<!-- 41 -->[docs-infra] Polish API page design (#38196) @oliviertassinari
- &#8203;<!-- 40 -->[docs-infra] Search with productCategory when product is missing (#38239) @oliviertassinari
- &#8203;<!-- 39 -->[docs][material] Revise and update Examples doc (#38205) @samuelsycamore
- &#8203;<!-- 38 -->[docs] Fix typo in notifications.json @mbrookes
- &#8203;<!-- 37 -->[docs-infra] Remove leftover standardNavIcon (#38252) @DiegoAndai
- &#8203;<!-- 34 -->[docs][base] Add Tailwind CSS & plain CSS demos on the Popper page (#37953) @zanivan
- &#8203;<!-- 31 -->[docs][Button][joy] Improve `loading` prop documentation (#38156) @sai6855
- &#8203;<!-- 25 -->[docs] Prepare docs infra for Tree View migration to X (#38202) @flaviendelangle
- &#8203;<!-- 24 -->[docs] Fix SEO issues reported by ahrefs @oliviertassinari
- &#8203;<!-- 23 -->[docs] Fix palette pages - live edit not working (#38195) @oliviertassinari
- &#8203;<!-- 22 -->[docs] Add Google Analytics action for the styling menu (#38085) @mnajdova
- &#8203;<!-- 21 -->[docs] Fix Discord redirection chain @oliviertassinari
- &#8203;<!-- 20 -->[docs] Cover pnpm in more places (#38161) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Avoid broken link (#38154) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Add notification for beta release of Toolpad (#38152) @prakhargupta1
- &#8203;<!-- 17 -->[docs-infra] Remove sidenav icons (#38174) @oliviertassinari
- &#8203;<!-- 16 -->[docs-infra] Fix search ranking when no productId (#38162) @oliviertassinari
- &#8203;<!-- 15 -->[docs-infra] Adjust the side nav for deeper nested items (#38047) @cherniavskii
- &#8203;<!-- 14 -->[docs][joy] Update TS file of adding more typography levels demo to match the corresponding JS file's styles (#38232) @ZeeshanTamboli
- &#8203;<!-- 13 -->[docs][joy] Add TS demo for reusable component section in approaches page (#38210) @sai6855
- &#8203;<!-- 12 -->[docs][joy] Add TS demo for theme typography new level customization (#38199) @sai6855

### Core

- &#8203;<!-- 47 -->[blog] Fix blog post slug Base UI (#38254) @oliviertassinari
- &#8203;<!-- 46 -->[core] Use native Node's fetch instead of node-fetch package (#38263) @michaldudak
- &#8203;<!-- 45 -->[core] Remove dead code @oliviertassinari
- &#8203;<!-- 29 -->[core] Polish Stack test to closer CSS injection order @oliviertassinari
- &#8203;<!-- 28 -->[core] Remove unnecessary `Required` utility type from Typography font style type (#38203) @ZeeshanTamboli
- &#8203;<!-- 27 -->[core] Fix generate Proptypes script skipping unstable items (#38198) @mj12albert
- &#8203;<!-- 03 -->[website] Adding Rich Bustos Twitter handle in bio (#38213) @richbustos
- &#8203;<!-- 02 -->[website] Prepare importing data from HiBob (#38238) @oliviertassinari
- &#8203;<!-- 01 -->[website] Sync team member with HiBob, add Raffaella (#38201) @rluzists1

All contributors of this release in alphabetical order: @cherniavskii, @DiegoAndai, @divyammadhok, @DSK9012, @flaviendelangle, @gitstart, @michaldudak, @mj12albert, @mnajdova, @oliviertassinari, @prakhargupta1, @richbustos, @rluzists1, @sai6855, @siriwatknp, @zanivan, @ZeeshanTamboli

## 5.14.2

<!-- generated comparing v5.14.1..master -->

_Jul 25, 2023_

A big thanks to the 23 contributors who made this release possible.

### @mui/material@5.14.2

- &#8203;<!-- 39 -->Revert "[core] Adds `component` prop to `OverrideProps` type (#35924)" (#38150) @michaldudak
- &#8203;<!-- 32 -->[Chip][material] Fix base cursor style to be "auto" not "default" (#38076) @DiegoAndai
- &#8203;<!-- 12 -->[Tabs] Refactor IntersectionObserver logic (#38133) @ZeeshanTamboli
- &#8203;<!-- 11 -->[Tabs] Fix and improve visibility of tab scroll buttons using the IntersectionObserver API (#36071) @SaidMarar

### @mui/joy@5.0.0-alpha.89

- &#8203;<!-- 15 -->[Joy] Replace leftover `Joy-` prefix with `Mui-` (#38086) @siriwatknp
- &#8203;<!-- 14 -->[Skeleton][joy] Fix WebkitMaskImage CSS property (#38077) @Bestwebdesign
- &#8203;<!-- 13 -->[Link][Joy UI] Fix font inherit (#38124) @oliviertassinari

### Docs

- &#8203;<!-- 37 -->[docs] Add listbox placement demo for Select (#38130) @sai6855
- &#8203;<!-- 36 -->[docs][base] Add Tailwind CSS & plain CSS demo on the Tabs page (#37910) @mnajdova
- &#8203;<!-- 35 -->[docs][base] Add Tailwind CSS & plain CSS demos on the Textarea page (#37943) @zanivan
- &#8203;<!-- 29 -->[docs] Fix Joy UI menu example (#38140) @harikrishnanp
- &#8203;<!-- 28 -->[docs] Remove translations section from contributing guide (#38125) @nikohoffren
- &#8203;<!-- 27 -->[docs] Fix Base UI Button Tailwind CSS padding @oliviertassinari
- &#8203;<!-- 26 -->[docs] Mention in hompage hero that Core is free (#38075) @mbrookes
- &#8203;<!-- 25 -->[docs] Fix a typo in notifications.json (#38078) @mbrookes
- &#8203;<!-- 24 -->[docs] Add Tailwind CSS & plain CSS demo on the table pagination page (#37937) @mnajdova
- &#8203;<!-- 23 -->[docs] Implement the new API display design (#37405) @alexfauquette
- &#8203;<!-- 22 -->[docs] Update migration installation code blocks (#38028) @danilo-leal
- &#8203;<!-- 21 -->[docs][joy] Revise the Joy UI Link page (#37829) @danilo-leal
- &#8203;<!-- 20 -->[docs][joy] Add playground for Card component (#37820) @Studio384
- &#8203;<!-- 19 -->[docs][joy] Add adjustments to the color inversion page (#37143) @danilo-leal
- &#8203;<!-- 18 -->[docs][material] Improve documentation about adding custom colors (#37743) @DiegoAndai
- &#8203;<!-- 17 -->[examples] Fix Joy UI Next.js App Router font loading (#38095) @IgnacioUtrilla
- &#8203;<!-- 16 -->[examples] Fix material-next Font Usage with next/font (#38026) @onderonur

### Core

- &#8203;<!-- 34 -->[blog] Update Discord invite link in Toolpad beta announcement (#38143) @samuelsycamore
- &#8203;<!-- 33 -->[blog] Update discord server link (#38131) @prakhargupta1
- &#8203;<!-- 31 -->[core] Fix rsc-builder removing the first line (#38134) @michaldudak
- &#8203;<!-- 30 -->[core] Remove the deprecation rule in tslint (#38087) @michaldudak
- &#8203;<!-- 09 -->[website] Mobile navigation: Toolpad to Beta (#38146) @bharatkashyap
- &#8203;<!-- 08 -->[website] Fix typo on pricing page @oliviertassinari
- &#8203;<!-- 07 -->[website] Fix a few regression (#38050) @oliviertassinari
- &#8203;<!-- 06 -->[website] Update Demo footers on MUI X landing page (#38027) @richbustos
- &#8203;<!-- 05 -->[website] Fix 301 redirection to base index page @oliviertassinari
- &#8203;<!-- 04 -->[website] Fix Cell selection feature name (#38029) @oliviertassinari
- &#8203;<!-- 03 -->[website] Improve button look (#38052) @oliviertassinari
- &#8203;<!-- 02 -->[website] Link new core page to new Base UI landing page (#38030) @mj12albert
- &#8203;<!-- 01 -->[website] Polish pricing page (#37975) @oliviertassinari
- &#8203;<!-- 10 -->[test] Fail the CI when new unexpected files are created (#38039) @oliviertassinari
- &#8203;<!-- 09 -->[test] Fix linting error by matching main component demo name to filename (#38122) @ZeeshanTamboli

All contributors of this release in alphabetical order: @alexfauquette, @Bestwebdesign, @bharatkashyap, @danilo-leal, @DiegoAndai, @harikrishnanp, @IgnacioUtrilla, @mbrookes, @michaldudak, @mj12albert, @mnajdova, @nikohoffren, @oliviertassinari, @onderonur, @prakhargupta1, @richbustos, @sai6855, @SaidMarar, @samuelsycamore, @siriwatknp, @Studio384, @zanivan, @ZeeshanTamboli

## 5.14.1

<!-- generated comparing v5.14.0..master -->

_Jul 19, 2023_

A big thanks to the 24 contributors who made this release possible. Here are some highlights ✨:

- 💫 Introducing some new components for Joy UI:
  - [Skeleton](https://mui.com/joy-ui/react-skeleton/) component (#37893) @siriwatknp
  - [ToggleButton](https://mui.com/joy-ui/react-toggle-button-group/) (#37716) @siriwatknp
- 🎉 Base UI has its own [landing page](https://www.mui.com/base-ui)!
- 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.14.1`

- &#8203;<!-- 14 -->[FormControlLabel] Fix misplaced asterisk when `labelPlacement` is provided (#37831) @ZeeshanTamboli
- &#8203;<!-- 11 -->[Slider][material] Fix type dependency on @types/prop-types (#37853) @Methuselah96
- &#8203;<!-- 10 -->[Menu] Add MuiMenuList to createTheme components key (#37956) @mj12albert
- &#8203;<!-- 09 -->[Modal] Remove deprecated `BackdropComponent` and `BackdropProps` from tests (#38018) @sai6855

### `@mui/material-next@6.0.0-alpha.93`

- &#8203;<!-- 54 -->[Slider][material-next] Add use client directive to useSliderElementsOverlap (#37955) @mj12albert
- &#8203;<!-- 47 -->[Button][material-next] Fix some event handlers being ignored (#37647) @DiegoAndai

### `@mui/base@5.0.0-beta.8`

- &#8203;<!-- 53 -->[Autocomplete] Make touch and click behavior on an option consistent (#37972) @divyammadhok

### `@mui/joy@5.0.0-alpha.88`

- &#8203;<!-- 13 -->[Joy][Select] Fix type error caused by custom variant (#37996) @OmPr366
- &#8203;<!-- 12 -->[ToggleButton][Joy] Add `ToggleButton` component (#37716) @siriwatknp
- &#8203;<!-- 07 -->[Skeleton] Add Joy UI `Skeleton` component (#37893) @siriwatknp

### `@mui/utils@5.14.1`

- &#8203;<!-- 06 -->[utils] Add function overload for `useEventCallback` (#37827) @cherniavskii

### Docs

- &#8203;<!-- 52 -->[docs][base] Add Tailwind CSS & plain CSS demo on the form control page (#37914) @mnajdova
- &#8203;<!-- 51 -->[docs][base] Make Base UI Select demos denser (#37836) @zanivan
- &#8203;<!-- 38 -->[docs] Link Material UI from the landing page (#37971) @oliviertassinari
- &#8203;<!-- 37 -->[docs] Fix the empty /components page (#38010) @brijeshb42
- &#8203;<!-- 36 -->[docs] Checkout template follows user's color scheme preference (#37928) @OndrejHj04
- &#8203;<!-- 35 -->[docs] Disable ad for onboarding pages (#37998) @oliviertassinari
- &#8203;<!-- 34 -->[docs] Fix broken link to Base UI Next.js App Router (#37973) @oliviertassinari
- &#8203;<!-- 33 -->[docs] Fix typo in next-js-app-router.md (#37974) @ericbrian
- &#8203;<!-- 32 -->[docs] Add pnpm commands to Material UI Installation page (#36650) @officialrajdeepsingh
- &#8203;<!-- 31 -->[docs] Link charts in the roadmap (#37944) @oliviertassinari
- &#8203;<!-- 30 -->[docs] Improve changelog @oliviertassinari
- &#8203;<!-- 29 -->[docs] Improve the Select docs (#37279) @michaldudak
- &#8203;<!-- 16 -->[docs][menu] Add Tailwind CSS & plain CSS demo on the Menu page (#37856) @mnajdova
- &#8203;<!-- 15 -->[example] Update EmotionCacheProvider to work with GlobalStyles (#37962) @siriwatknp

### Core

- &#8203;<!-- 50 -->[blog] Add blog post about support for Next.js App Router (#37929) @samuelsycamore
- &#8203;<!-- 49 -->[blog] Blog MUI X pro statement removed (#38015) @prakhargupta1
- &#8203;<!-- 48 -->[blog] Add Toolpad beta announcement blog (#37799) @prakhargupta1
- &#8203;<!-- 46 -->[core] Increase space available for sidenav @oliviertassinari
- &#8203;<!-- 45 -->[core] Adds `component` prop to `OverrideProps` type (#35924) @sai6855
- &#8203;<!-- 44 -->[core] Fix rsc build step in CI (#38019) @mj12albert
- &#8203;<!-- 43 -->[core] Remove nx dependency (#37964) @Janpot
- &#8203;<!-- 42 -->[core] Lock `@types/node` to v18 (#37965) @ZeeshanTamboli
- &#8203;<!-- 41 -->[core] Update priority support issue template and prompt (#37824) @DanailH
- &#8203;<!-- 40 -->[core] Remove warnings in docs:api (#37858) @alexfauquette
- &#8203;<!-- 39 -->[core] Make rimraf work after a major update (#37930) @michaldudak
- &#8203;<!-- 28 -->[docs-infra] Change the Diamond Sponsor block positioning on the side nav (#37933) @danilo-leal
- &#8203;<!-- 27 -->[docs-infra] Support backticks in the codeblocks (#37950) @cherniavskii
- &#8203;<!-- 26 -->[docs-infra] Improve performance hideToolbar: true (#37969) @oliviertassinari
- &#8203;<!-- 25 -->[docs-infra] Fix button label on mobile (#37997) @oliviertassinari
- &#8203;<!-- 24 -->[docs-infra] Square drawer corners (#37970) @oliviertassinari
- &#8203;<!-- 23 -->[docs-infra] Improve tab contrast in codeblock (#38000) @oliviertassinari
- &#8203;<!-- 22 -->[docs-infra] Fix API generation for Base UI (#37941) @oliviertassinari
- &#8203;<!-- 21 -->[docs-infra] Fix layout shift on xGrid (#37954) @oliviertassinari
- &#8203;<!-- 20 -->[docs-infra] Update installation commands to use the new tabs code component (#37927) @danilo-leal
- &#8203;<!-- 19 -->[docs-infra] Improve disableToc={true} support (#37931) @oliviertassinari
- &#8203;<!-- 18 -->[docs-infra] Remove icons and tweak the design of the side nav (#37860) @danilo-leal
- &#8203;<!-- 17 -->[docs-infra] Fix TypeScrit error in demo export (#37830) @oliviertassinari
- &#8203;<!-- 08 -->[notifications] Add notification for first Charts release (#37679) @joserodolfofreitas
- &#8203;<!-- 05 -->[website] Add Base UI marketing page (#36622) @siriwatknp
- &#8203;<!-- 04 -->[website] Update MUI X landing page (#37966) @cherniavskii
- &#8203;<!-- 03 -->[website] Fix a11y issues (#37999) @oliviertassinari
- &#8203;<!-- 02 -->[website] Make the Core page refer to group of products (#37608) @danilo-leal
- &#8203;<!-- 01 -->[website] Add perpetual option to pricing page (#35504) @joserodolfofreitas

All contributors of this release in alphabetical order: @alexfauquette, @brijeshb42, @cherniavskii, @DanailH, @danilo-leal, @DiegoAndai, @divyammadhok, @ericbrian, @Janpot, @joserodolfofreitas, @Methuselah96, @michaldudak, @mj12albert, @mnajdova, @officialrajdeepsingh, @oliviertassinari, @OmPr366, @OndrejHj04, @prakhargupta1, @sai6855, @samuelsycamore, @siriwatknp, @zanivan, @ZeeshanTamboli

## 5.14.0

<!-- generated comparing v5.13.7..master -->

_Jul 11, 2023_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 💫 Material UI, Joy UI, and Base UI are compatible with [Next.js App Router](https://nextjs.org/docs/app) (#37656) @mj12albert
- 📚 Added new guides for integrating with Next.js 13 App Router (#37656) @mj12albert
  - Ⓜ️ [Material UI guide](https://mui.com/material-ui/guides/next-js-app-router/)
  - 🅙 [Joy UI guide](https://mui.com/joy-ui/integrations/next-js-app-router/)
  - 🅱️ [Base UI guide](https://mui.com/base-ui/guides/next-js-app-router/)
- 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.14.0`

- [Autocomplete] Enable global customization of different options (#36971) @nicolas-ot

### `@mui/material-next@6.0.0-alpha.92`

- [Slider][material-next] Slider restructure and style improvements (#37644) @DiegoAndai

### `@mui/joy@5.0.0-alpha.87`

- [ButtonGroup] Fix style for single Button (#37692) @MaybePixem
- Fix theme typography fallback value (#37845) @siriwatknp

### `@mui/icons-material@5.14.0`

- [icons-material] Rebuild icons with `"use client"` (#37894) @mj12albert

### Docs

- [docs] Polish Ukraine banner (#37905) @oliviertassinari
- [docs] Reduce Ukraine banner size (#34795) @oliviertassinari
- [docs] Add callouts about controlled vs uncontrolled components in Core docs (#37849) @samuelsycamore
- [docs] Add missing Portal elements to Tailwind CSS interoperability guide (#37807) @enrique-ramirez
- [docs] Small pickers migration improvement (#37815) @alexfauquette
- [docs] Fix pickers product name (#37825) @LukasTy
- [docs][Joy][Link] Set `variant` and `color` defaults for the playground (#37817) @Studio384
- [docs][Joy][Table] Add `undefined` as an option to `stripe` (#37816) @Studio384
- [docs][base] Add Tailwind CSS & plain CSS demo on the Snackbar page (#37812) @mnajdova
- [docs][base] Add Tailwind CSS & plain CSS demo on Badge page (#37768) @mnajdova
- [docs][base] Fix Nested modal demo positioning (#37506) @gitstart
- [docs][base] Add Tailwind CSS & plain CSS demo on the Switch page (#37728) @mnajdova
- [docs-infra] Remove code tags in ToC (#37834) @cherniavskii
- [docs-infra] Fixes in API pages generation (#37813) @mnajdova
- [docs-infra] Add test case when using sh (#37818) @oliviertassinari
- [docs-infra] Use icons instead of words for the code copy button (#37664) @danilo-leal
- [docs-infra] Fix code parser (#37828) @alexfauquette
- [docs-infra] Fix `marked` deprecation warning (#37769) @alexfauquette
- [docs-infra] Allows to use codeblock in the docs (#37643) @alexfauquette
- [docs-infra][joy] Change Joy UI's playground variant selector (#37821) @danilo-leal

### Core

- [core] Prepend "use-client" directive + add docs and examples for using MUI libraries with Next.js App Router (#37656) @mj12albert
- [core] Fix imports to React (#37863) @oliviertassinari
- [core] Disambiguate eslint plugin name @oliviertassinari
- [core] Sync the lint script name with the other repositories @oliviertassinari
- [core] Point to Crowdin directly @oliviertassinari
- [website] Sync career page (#37847) @oliviertassinari

All contributors of this release in alphabetical order: @alexfauquette, @cherniavskii, @danilo-leal, @DiegoAndai, @enrique-ramirez, @gitstart, @LukasTy, @MaybePixem, @mj12albert, @mnajdova, @nicolas-ot, @oliviertassinari, @samuelsycamore, @siriwatknp, @Studio384

## 5.13.7

<!-- generated comparing v5.13.6..master -->

_Jul 4, 2023_

A big thanks to the 21 contributors who made this release possible.
This release focuses primarily on 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.13.7`

- [OutlinedInput] Fix form control properties in `ownerState` (#37668) @vonagam

### `@mui/system@5.13.7`

- [Stack] Fix spacing when there are `<style>` children (#34966) @cmd-johnson

### `@mui/icons-material@5.13.7`

- [icons] Add Microsoft logo (#37717) @zephyrus21

### `@mui/joy@5.0.0-alpha.86`

- [Autocomplete][joy] Fix Autocomplete and Modal components to work together (#37515) @saikathalderr
- [Menu][Joy] Improve UX of `Menu` usage demo (#37797) @sai6855

### `@mui/base@5.0.0-beta.6`

- [Slider][base][material][joy] Fix not draggable on the edge when `disableSwap={true}` (#35998) @sai6855
- [Slider][base] Provide slot state to Slider's thumb slot props callback (#37749) @mnajdova
- [Tabs] Wrap TabsList context creation in useMemo (#37370) @michaldudak
- [TextareaAutosize] Fix wrong height measurement (#37185) @bigteech

### `@mui/lab@5.0.0-alpha.135`

- [Timeline] Fix position `alternate-reverse` generated classname (#37678) @ZeeshanTamboli

### Docs

- [docs][base] Add demo for using the Button as a link (#37317) @AdamSundberg
- [docs][base] Add Tailwind CSS + plain CSS demo on the Select page (#37725) @mnajdova
- [docs][base] Make Base UI input demos denser (#37750) @zanivan
- [docs][base] Make Base UI button demos denser (#37689) @zanivan
- [docs][base] Add Tailwind CSS & plain CSS demos on the Input page (#37685) @mnajdova
- [docs][base] Fix horizontal scrolling on the mobile input page (#37688) @zanivan
- [docs] Improve Base UI index page (#37761) @oliviertassinari
- [docs] Fix incorrect package URL in README of example material-vite (#37755) @Dlouxgit
- [docs] Explain how to disable Base Select's portal (#37684) @michaldudak
- [docs] Shorten overview page URLs (#37660) @oliviertassinari
- [docs][material] Rename custom tab panel in Tabs demo to prevent confusion with @mui/lab (#37638) @MUK-Dev
- [docs][tabs] Document how to use routing with Tabs in Base UI (#37369) @michaldudak
- [docs] Rename product to productId (#37801) @siriwatknp
- [docs][base] Add Tailwind CSS & plain CSS demo on the Slider page (#37736) @mnajdova

### Core

- [docs–infra] Prevent displaying multiple ads (#37696) @oliviertassinari
- [blog] Fix mismatch between plan and link @oliviertassinari
- [core] Update yarn lockfile (#37802) @michaldudak
- [core] Add bundle size Toolpad app link to PRs (#36311) @Janpot
- [core] Fix priority support prompt action flow (#37726) @DanailH
- [core] Fix typo in priority support @oliviertassinari
- [core][docs] add Eslint rule to ensure main demo component match file… (#37278) @alexfauquette
- [docs-infra] Fix truncated TOCs scrollbar (#37770) @oliviertassinari
- [docs-infra] Adjust demo container to be glued to the toolbar (#37744) @danilo-leal
- [docs-infra] Fix layout shift ad (#37694) @oliviertassinari
- [docs-infra] Improve demos toolbar (#37762) @oliviertassinari
- [docs-infra] Make the GitHub link in the nav bar open in a new tab (#37766) @gateremark
- [docs-infra] Allow to persist icons in ToC (#37731) @cherniavskii
- [docs-infra] Improve product mapping (#37729) @oliviertassinari
- [docs-infra] Add design polish to the comment and anchor buttons (#37734) @danilo-leal
- [docs-infra] Tweak editable code blocks callout design (#37681) @danilo-leal
- [docs-infra] Improve the edit page experience (#37695) @oliviertassinari
- [docs-infra] Support rendering markdown outside of docs (#37691) @oliviertassinari
- [docs-infra] Polish demo toolbar button designs (#37680) @danilo-leal
- [docs-infra] Adjust demo component container design (#37659) @danilo-leal
- [test] Fix test:e2e local run (#37719) @oliviertassinari
- [test] Remove failing test in dev @oliviertassinari
- [website] Add no-op service worker to fix stale cache issue (#37607) @cherniavskii
- [website] Transition the Core page to be Material UI instead (#37583) @danilo-leal
- [website] Update the pricing page to reflect sales (#37751) @oliviertassinari
- [website] Match Copyright with the rest of the website @oliviertassinari
- [website] Support deep linking to pricing FAQ @oliviertassinari

All contributors of this release in alphabetical order: @AdamSundberg, @alexfauquette, @bigteech, @cherniavskii, @cmd-johnson, @DanailH, @danilo-leal, @Dlouxgit, @gateremark, @Janpot, @michaldudak, @mnajdova, @MUK-Dev, @oliviertassinari, @sai6855, @saikathalderr, @siriwatknp, @vonagam, @zanivan, @ZeeshanTamboli, @zephyrus21

## 5.13.6

_Jun 21, 2023_

A big thanks to the 25 contributors who made this release possible. Here are some highlights ✨:

- 💫 Added [Slider](https://mui.com/material-ui/react-slider/#material-you-version) component using the new Material You design language (#37520) @DiegoAndai.
- 📚 Added [examples](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts) showcasing how you can use Material UI with next.js's app directory (#37315) @smo043

### `@mui/material@5.13.6`

- &#8203;<!-- 45 -->[Autocomplete] Fixed autocomplete's existing option selection (#37012) @bencevoros
- &#8203;<!-- 44 -->[Autocomplete] Add hint demos to Material UI and Joy UI docs (#37496) @sai6855
- &#8203;<!-- 13 -->[Masonry] Fix ResizeObserver loop limit exceeded error (#37208) @hbjORbj
- &#8203;<!-- 11 -->[Tooltip][material] Improve warning when Tooltip receives string child (#37530) @DiegoAndai
- &#8203;<!-- 10 -->[Modal] Add missing members to ModalOwnProps (#37568) @ivp-dev
- &#8203;<!-- 09 -->[Slider] Arrow keys control does not work with float numbers (#37071) @gitstart
- &#8203;<!-- 08 -->[SvgIcon] allow `svg` as a child (#37231) @siriwatknp
- &#8203;<!-- 07 -->[Timeline] Add alternate reverse position (#37311) @abhinavkmrru
- &#8203;<!-- 06 -->[Tooltip] Fix type of sx prop in `slotProps` (#37550) @SuperKXT
- &#8203;<!-- 05 -->[TouchRipple] perf: avoid calling `clearTimeout()` (#37512) @romgrk

### `@mui/material-next@6.0.0-alpha.90`

- &#8203;<!-- 12 -->[Material You] Add Slider component with Material You design (#37520) @DiegoAndai

### `@mui/joy@5.0.0-alpha.85`

- &#8203;<!-- 37 -->[ButtonGroup][joy] Missing border when spacing is more than zero (#37577) @siriwatknp
- &#8203;<!-- 36 -->[CardActions][joy] Add `CardActions` component (#37441) @siriwatknp
- &#8203;<!-- 14 -->[Menu][joy] Fix closing of `Menu` in demos (#36917) @sai6855

### `@mui/base@5.0.0-beta.5`

- &#8203;<!-- 39 -->[Menu][base] Add the resetHighlight action (#37392) @michaldudak
- &#8203;<!-- 38 -->[Select][base] Expose the `areOptionsEqual` prop (#37615) @michaldudak

### `@mui/utils@5.13.2`

- &#8203;<!-- 04 -->[utils] Allow nested imports in @mui/utils to speed up build (#37586) @flaviendelangle

### Docs

- &#8203;<!-- 43 -->[docs][base] Improve Base UI all components images (#37590) @danilo-leal
- &#8203;<!-- 42 -->[docs][base] Add pages for coming soon components (#37575) @danilo-leal
- &#8203;<!-- 41 -->[docs][base] Add a Snackbar introduction demo (#37602) @danilo-leal
- &#8203;<!-- 40 -->[docs][base] Add page for all Base UI components (#37536) @danilo-leal
- &#8203;<!-- 33 -->[docs] Fix scrollbar on snackbar page (#37657) @oliviertassinari
- &#8203;<!-- 32 -->[docs] Switch order of snackbar buttons in demos (#37389) @Primajin
- &#8203;<!-- 31 -->[docs] Add support for Tailwind CSS and plain CSS demos (#37319) @mnajdova
- &#8203;<!-- 30 -->[docs] Tree view color fix for dark mode in Gmail example (#37051) @PunitSoniME
- &#8203;<!-- 29 -->[docs] Inline the Base UI demo (#37603) @oliviertassinari
- &#8203;<!-- 28 -->[docs] Fix typo in themed components page (#37598) @vinayr
- &#8203;<!-- 27 -->[docs] Fix render inline code in CSS description generation (#37448) @alexfauquette
- &#8203;<!-- 26 -->[docs] Add styles to styled argument list (#37558) @DiegoAndai
- &#8203;<!-- 25 -->[docs] Improve awkward wording in READMEs of example projects (#37110) @DIWAKARKASHYAP
- &#8203;<!-- 24 -->[docs] Fix small base -> base-ui migration issue (#37594) @oliviertassinari
- &#8203;<!-- 23 -->[docs] Fix GitHub typo (#37578) @oliviertassinari
- &#8203;<!-- 22 -->[docs] Improve release guide (#37547) @DiegoAndai
- &#8203;<!-- 21 -->[docs] Review fixes to the Material UI's "Example projects" page (#37444) @danilo-leal
- &#8203;<!-- 17 -->[docs][joy] Add a messages template (#37546) @sernstberger
- &#8203;<!-- 16 -->[docs][joy] Add pages for coming soon Joy UI components (#36920) @danilo-leal
- &#8203;<!-- 15 -->[docs][joy] Add design and consistency tweaks to the Playground (#37580) @danilo-leal
- &#8203;<!-- 37 -->[docs] Add and revise Base UI + Create React App examples (#36825) @samuelsycamore
- &#8203;<!-- 20 -->[docs-infra] Fix demos border radius (#37658) @oliviertassinari
- &#8203;<!-- 19 -->[docs-infra] Add analyticsTags to Algolia (#37600) @Janpot
- &#8203;<!-- 18 -->[docs-infra] Simplify product id handling (#37593) @oliviertassinari
- &#8203;<!-- 35 -->[CHANGELOG] Add missing release date for v5.13.5 @oliviertassinari
- &#8203;<!-- 16 -->[examples] Shell command fix in the readme file of material-next-ts example (#37675) @bablukpik
- &#8203;<!-- 15 -->[examples] Next.js v13 app router with Material UI (#37315) @smo043

### Core

- &#8203;<!-- 34 -->[core] Update to Node.js v18 for `test-dev` CI (#37604) @ZeeshanTamboli
- &#8203;<!-- 39 -->[core] Add priority support issue template (#37671) @DanailH
- &#8203;<!-- 03 -->[website] Update roadmap page (#37587) @cherniavskii
- &#8203;<!-- 02 -->[website] Add CSP to limit iframes to self @oliviertassinari
- &#8203;<!-- 01 -->[website] Link mui-x Stack Overflow in footer link (#37509) @richbustos

All contributors of this release in alphabetical order: @abhinavkmrru, @alexfauquette, @bencevoros, @cherniavskii, @danilo-leal, @DiegoAndai, @DIWAKARKASHYAP, @flaviendelangle, @gitstart, @hbjORbj, @ivp-dev, @Janpot, @michaldudak, @mnajdova, @oliviertassinari, @Primajin, @PunitSoniME, @richbustos, @romgrk, @sai6855, @sernstberger, @siriwatknp, @SuperKXT, @vinayr, @ZeeshanTamboli

## 5.13.5

_Jun 12, 2023_

A big thanks to the 9 contributors who made this release possible. Here are some highlights ✨:

- 💫 Added `ButtonGroup` component in Joy UI (#37407) @siriwatknp.
- 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.13.5`

- &#8203;<!-- 03 -->[Material][Popover] Add support for virtual element as anchorEl (#37465) @DiegoAndai

### `@mui/joy@5.0.0-alpha.84`

- &#8203;<!-- 20 -->[ButtonGroup][joy] Replace `detached` prop with `spacing`. (#37562) @siriwatknp
- &#8203;<!-- 19 -->[ButtonGroup][joy] Add `ButtonGroup` component (#37407) @siriwatknp
- &#8203;<!-- 04 -->[Input][joy] Simplify focus with `:focus-within` and add examples (#37385) @siriwatknp

### Docs

- &#8203;<!-- 17 -->[docs] Move Toolpad from alpha to beta (#37288) @bharatkashyap
- &#8203;<!-- 16 -->[docs] Add usage of createCssVarsProvider (#37513) @brijeshb42
- &#8203;<!-- 15 -->[docs] Update /base url references to /base-ui (#37412) @brijeshb42
- &#8203;<!-- 14 -->[docs] Skip components and hooks due to duplicate index (#37539) @siriwatknp
- &#8203;<!-- 13 -->[docs] Polish Sign in to your account joy demo (#37498) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Remove outdated Material UI FAQ @oliviertassinari
- &#8203;<!-- 11 -->[docs] Fix crash access to localStorage in Firefox (#37518) @brijeshb42
- &#8203;<!-- 10 -->[docs-infra] Enforce max length on description (#37565) @oliviertassinari
- &#8203;<!-- 09 -->[docs-infra] Mandatory versions (#37497) @oliviertassinari
- &#8203;<!-- 08 -->[docs-infra] Fix lighthouse img size issue (#37415) @oliviertassinari
- &#8203;<!-- 07 -->[docs][joy] Replace JoyInput with Input component in JoyUI Text Field documentation (#37548) @musama619
- &#8203;<!-- 06 -->[docs][joy] Add typography introduction demo component (#37553) @sernstberger
- &#8203;<!-- 05 -->[docs][joy] Add a rental dashboard template (#37453) @sernstberger

### Core

- &#8203;<!-- 21 -->Move the React Community Engineer - X in Open Roles (#37552) @DanailH
- &#8203;<!-- 18 -->[core] Update Node.js version to v18 on CircleCI, CodeSandbox, and Netlify (#37173) @ZeeshanTamboli
- &#8203;<!-- 02 -->[website] RIDI gold sponsorship end (#37517) @oliviertassinari
- &#8203;<!-- 01 -->[website] Update X landing page (#37387) @cherniavskii

All contributors of this release in alphabetical order: @brijeshb42, @cherniavskii, @DanailH, @DiegoAndai, @musama619, @oliviertassinari, @sernstberger, @siriwatknp, @ZeeshanTamboli

## 5.13.4

<!-- generated comparing v5.13.3..master -->

_Jun 5, 2023_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

### `@mui/material@5.13.4`

- &#8203;<!-- 20 -->[Autocomplete][material] Add missing `focusVisible` class in AutocompleteClasses (#37502) @sai6855
- &#8203;<!-- 04 -->[Menu][material] Fix MenuPaper class composition precedence (#37390) @DiegoAndai
- &#8203;<!-- 03 -->[MenuList] Fix to allow conditional rendering for a menu item under ListSubheader (#36890) @danielplewes
- &#8203;<!-- 02 -->[Stepper] Handle progress bar of mobile stepper when `steps` is one (#37079) @gitstart

### `@mui/base@5.0.0-beta.4`

- &#8203;<!-- 16 -->[Input][base] Fix calling slotProps event handlers (#37463) @sai6855

### `@mui/joy@5.0.0-alpha.82`

- &#8203;<!-- 19 -->[Avatar][joy] Fallback to `alt` when `src` or `srcSet` are not defined (#37469) @vishalthatipamula0219
- &#8203;<!-- 15 -->[Card][joy] Improve usability of card family (#37474) @siriwatknp

### Docs

- &#8203;<!-- 18 -->[docs][base] useAutocomplete demos & docs (#37029) @mj12albert
- &#8203;<!-- 17 -->[docs][base] Remove usage of `component` prop in docs (#37462) @sai6855
- &#8203;<!-- 13 -->[docs] Fix docs redirections @oliviertassinari
- &#8203;<!-- 12 -->[docs] Fix Fluent -> Fluent UI @oliviertassinari
- &#8203;<!-- 11 -->[docs] Fix MUI Base -> Base UI @oliviertassinari
- &#8203;<!-- 10 -->[docs] Add base-vite-tailwind example repo (#36994) @mj12albert
- &#8203;<!-- 09 -->[docs] Fix search bar layout shift (#37460) @oliviertassinari
- &#8203;<!-- 08 -->[docs] Tweak Material UI's "Showcase" page design (#37259) @danilo-leal
- &#8203;<!-- 07 -->[docs] Tweak Material UI's "Template" page design (#37260) @danilo-leal
- &#8203;<!-- 06 -->[docs] Fix "Language" page removal leftovers (#37408) @danilo-leal
- &#8203;<!-- 05 -->[docs] Move contents of css-variables to sibling pages (#37411) @brijeshb42

### Core

- &#8203;<!-- 14 -->[core] Do not let Renovate handle `examples` packages updates (#37386) @ZeeshanTamboli
- &#8203;<!-- 01 -->[website] Add header filters to the pricing table (#37455) @MBilalShafi

All contributors of this release in alphabetical order: @brijeshb42, @danielplewes, @danilo-leal, @DiegoAndai, @gitstart, @MBilalShafi, @mj12albert, @oliviertassinari, @sai6855, @siriwatknp, @vishalthatipamula0219, @ZeeshanTamboli

## 5.13.3

<!-- generated comparing v5.13.2..master -->

_May 29, 2023_

A big thanks to the 15 contributors who made this release possible.
This release focuses primarily on 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.13.3

- &#8203;<!-- 22 -->[Autocomplete] Accept external Listbox ref (#37325) @sai6855
- &#8203;<!-- 06 -->[Modal] Pass `className` from `BackdropProps` (#37399) @hbjORbj

### `@mui/base@5.0.0-beta.3`

- &#8203;<!-- 20 -->[base] Maintain nodes document order in compound components (#36857) @michaldudak
- &#8203;<!-- 19 -->[base][joy] Prevent persisting hover state styles onclick on mobile (#36704) @gitstart
- &#8203;<!-- 18 -->[Menu][base] MenuItem as a link does not work (#37242) @nicolas-ot
- &#8203;<!-- 17 -->[MenuItem][Base] Pass idGenerator function (#37364) @sai6855
- &#8203;<!-- 16 -->[Slider][Base] Add Vertical slider demo (#37357) @sai6855

### `@mui/joy@5.0.0-alpha.82`

- &#8203;<!-- 23 -->[Select][joy] Fix popup does not close (#37435) @siriwatknp
- &#8203;<!-- 21 -->[Badge][Joy] Fix `slots` element type in API docs (#37329) @zignis
- &#8203;<!-- 04 -->[Select] [joy] Handle long text content (#37289) @akash191095
- &#8203;<!-- 07 -->[Tooltip][Joy] Interactive doesn't work (#37159) @nicolas-ot

### `@mui/codemod@5.13.3

- &#8203;<!-- 05 -->[mui-codemod] Add missing script to README (#37377) @hbjORbj

### Docs

- &#8203;<!-- 14 -->[docs] Clarify Hidden down props as exclusive (#36927) @canac
- &#8203;<!-- 13 -->[docs] Add refine to Material UI "Related projects" and "More advanced example projects" pages (#37308) @necatiozmen
- &#8203;<!-- 12 -->[docs] Remove todo link from sidebar (#37373) @brijeshb42
- &#8203;<!-- 11 -->[docs] Clarify the peer dependency with react (#37360) @oliviertassinari
- &#8203;<!-- 10 -->[docs] Divider vertical middle prop migration (#36840) @JhonnK08
- &#8203;<!-- 09 -->[docs] Fix branding theme tabs and navigation bar regressions (#37362) @ZeeshanTamboli
- &#8203;<!-- 08 -->[docs-infra] Throw on incorrect internal links (#37326) @oliviertassinari

### Core

- &#8203;<!-- 15 -->[core] Include scoped JSX namespace when resolving props (#37404) @LukasTy
- &#8203;<!-- 03 -->[test][useMediaQuery] Change SSR test description (#37403) @zignis
- &#8203;<!-- 02 -->[website] Sync with Ashby @oliviertassinari
- &#8203;<!-- 01 -->[website] Add David to about page (#37379) @DavidCnoops

All contributors of this release in alphabetical order: @akash191095, @brijeshb42, @canac, @DavidCnoops, @gitstart, @hbjORbj, @JhonnK08, @LukasTy, @michaldudak, @necatiozmen, @nicolas-ot, @oliviertassinari, @sai6855, @ZeeshanTamboli, @zignis

## 5.13.2

<!-- generated comparing v5.13.1..master -->

_May 22, 2023_

A big thanks to the 12 contributors who made this release possible.
📚 This release focuses primarily on documentation improvements.

### `@mui/material@5.13.2

- [Slider] Tooltip positioning fixed for vertical slider (#37049) @PunitSoniME

### Docs

- [docs][base] Remove default annotations from useTabsList return type (#37324) @TinaSay
- [docs][base] Remove default annotations from useTabPanel return type (#37323) @TinaSay
- [docs][base] Remove default annotations from useSwitch return type (#37322) @TinaSay
- [docs][base] Remove default annotations from useInput return type (#37321) @TinaSay
- [docs][base] Remove default annotations from useAutocomplete return type (#37320) @TinaSay
- [docs][base] Remove default annotations from useBadge's return type (#37313) @TinaSay
- [docs][base] Remove default annotations from useButton's return type (#37312) @TinaSay
- [docs][base] Remove default annotations from useSlider's return type (#37309) @TinaSay
- [docs] Remove Material UI's "Languages" page (#37314) @danilo-leal
- [docs] Prefer to link GitHub repository @oliviertassinari
- [docs] Move product versions to page context (#35078) @m4theushw
- [docs] Fix v5 migration npm install instruction (#37293) @oliviertassinari
- [docs][Tab] Add vertical tabs demo (#37292) @sai6855
- [docs][Transitions] Fix typo in code sample (#37300) @alexfauquette
- [examples] Remove `@babel/plugin-proposal-class-properties` from Material-Express-SSR example (#37305) @ZeeshanTamboli
- [Website] Add Brijesh to About page (#37318) @brijeshb42
- [website] Update pricing table (#37290) @cherniavskii
- [website] Update core open roles (#37224) @mnajdova

### Core

- Revert "[core] Remove outdated babel proposal plugins (#36795)" (#37331) @michaldudak
- [core] Move esmExternals to the shared next config (#37332) @michaldudak

All contributors of this release in alphabetical order: @alexfauquette, @brijeshb42, @cherniavskii, @danilo-leal, @m4theushw, @michaldudak, @mnajdova, @oliviertassinari, @PunitSoniME, @sai6855, @TinaSay, @ZeeshanTamboli

## 5.13.1

<!-- generated comparing v5.13.0..master -->

_May 16, 2023_

A big thanks to the 25 contributors who made this release possible. Here are some highlights ✨:

- 🌏 Added Central Myanmar (my-MY), Malay (ms-MS), Nepali (ne-NP), Tagalog (tl-TL) locales (#37017) @cccEric
- 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.13.1`

- [Autocomplete] Allow tooltip text selection (#36503) @safeamiiir
- [Dialog] Fixed broken dialog when using maxWidth="xs" and custom breakpoint unit (#37237) @jguddas
- [l10n] Add Central Myanmar (my-MY), Malay (ms-MS), Nepali (ne-NP), Tagalog (tl-TL) locales (#37017) @cccEric

### `@mui/utils@5.13.1`

- [utils] Fix downstream bundlers remove React 17 useId compatibility (#37183) @nickiaconis

### `@mui/base@5.0.0-beta.1`

- [Select][base] Keep focus on the trigger element when listbox is open (#37244) @michaldudak

### `@mui/joy@5.0.0-alpha.80`

- [Autocomplete] Fixed scroll into view (#37217) @sai6855
- [AutocompleteOption][Avatar] js test replaced with ts test (#37088) @PunitSoniME
- [Breadcrumbs] Replace js-tests with ts-tests (#37107) @mauwaz
- [RadioGroup] Turn JS test to TS test (#37138) @uuxxx
- [SvgIcon] Turn JS test to TS test (#37151) @nicolas-ot
- [Tooltip] Turn JS test to TS test (#37149) @nicolas-ot
- [Typography] Convert Typography test to TypeScript (#37165) @DerTimonius
- [Sheet][Slider][Stack][Switch] Replace js-tests with ts-tests (#37139) @mauwaz
- Miscellaneous fixes (#37274) @siriwatknp

### Docs

- [docs] Remove upload button (#36844) @Bastian
- [docs] Update link to overriding component structure guide (#36870) @hbjORbj
- [docs] Fix Material Design templates (#37187) @oliviertassinari
- [docs] Fix link to Joy UI GitHub issues @oliviertassinari
- [docs] Show default value for `filterOptions` prop in Autocomplete's API docs (#37230) @ZeeshanTamboli
- [docs] Add summary and improve `test_static` CI doc in CONTRIBUTING readme file (#36711) @kriskw1999
- [docs] Update theme customization typescript (#35551) @siriwatknp
- [docs] Add Joy Frames X web blocks template (#37203) @siriwatknp
- [docs] Change Base UI `alpha` to `beta` in README (#37228) @ZeeshanTamboli
- [docs] Improve Base UI overview page (#37227) @mnajdova
- [docs] Update Joy + Material guide (#36911) @cherniavskii

### Core

- [core] Remove `toEqualDateTime` chai matcher (#37073) @flaviendelangle
- [core] Check dependency cycles inside packages directory only (#37223) @michaldudak
- [core] Remove outdated babel proposal plugins (#36795) @kkocdko
- [website] Add Diego to About Us page (#37284) @DiegoAndai
- [website] Add Victor teamMember card to 'About' (#37283) @zanivan
- [website] Add Rich to the 'About' page (#37221) @richbustos

All contributors of this release in alphabetical order: @Bastian, @binh1298, @cccEric, @cherniavskii, @DerTimonius, @DiegoAndai, @flaviendelangle, @hbjORbj, @jguddas, @kkocdko, @kriskw1999, @mauwaz, @michaldudak, @mnajdova, @nickiaconis, @nicolas-ot, @oliviertassinari, @PunitSoniME, @richbustos, @safeamiiir, @sai6855, @siriwatknp, @uuxxx, @zanivan, @ZeeshanTamboli

## 5.13.0

<!-- generated comparing v5.12.3..master -->

_May 10, 2023_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Base UI is now in beta - all planned breaking changes are now complete!
- 🗺 We have a new [project roadmap](https://github.com/orgs/mui/projects/18/views/1) on GitHub where you can learn about what's coming next.
- 🐛 Various bug fixes, 📚 documentation and 🧪 testing improvements

### `@mui/material@5.13.0`

- [Autocomplete] Support `ChipComponent` type (#37112) @sai6855
- [AppBar] Fix component type (#37172) @sai6855
- [Select] Simplify handleChange in SelectInput (#37040) @ulrichstark

### `@mui/joy@5.0.0-alpha.79`

- [Input][joy] Improve alignment on date fields (#37146) @wewakekumar
- [Alery][joy] Turn JS test to TS test (#37077) @hbjORbj
- [AspectRatio][joy] js test replaced with ts test (#37087) @PunitSoniME
- [Badge][AvatarGroup][joy] js test replaced with ts test (#37089) @PunitSoniME
- [Box][Card][MenuList][joy] Turn JS test to TS test (#37126) @uuxxx
- [List][Menu][joy] Turn JS test to TS test (#37123) @uuxxx
- [test][Joy] Remove duplicate Avatar test (#37201) @zignis
- [test][joy] js test cases converted to ts (#37117) @PunitSoniME
- [Button][joy] Convert Button test to typescript (#37181) @akash191095
- [CardContent][CardCover][CardOverflow][Chip][ChipDelete][joy] js text case converted to ts (#37116) @PunitSoniME
- [Radio][IconButton][Checkbox][Option][joy] Switch to TypeScript unit test (#37137) @DerTimonius

### `@mui/base@5.0.0-beta.0`

- [Select][base] Do not call onChange after initial render (#37141) @michaldudak
- [Select][base] Rename the `optionStringifier` prop (#37118) @michaldudak
- [typescript][base] Fix types of components callbacks parameters (#37169) @michaldudak
- [Select], [TablePagination] Use more descriptive parameter names (#37064) @michaldudak

### Docs

- [docs] Stray design tweaks to Base UI demos (#37003) @danilo-leal
- [docs] Move outdated CSS prefixing docs (#36710) @kriskw1999
- [docs] Improve "Example projects" page design (#37007) @danilo-leal
- [docs] Redirect NoSsr, Portal and TextareaAutosize to Base UI API page (#37175) @ZeeshanTamboli
- [docs] Demonstrate `TextField` customization using theme style overrides (#36805) @ZeeshanTamboli
- [docs] Tweak the "Edit this page" button icon (#37142) @danilo-leal
- [docs] Update links to the public roadmap (#36995) @mnajdova
- [docs] Improve Multiselect demo styling (#37120) @michaldudak
- [Stack] Fix import description @oliviertassinari

### Core

- [blog] Fix images using "MUI Base" instead of "Base UI" (#37044) @danilo-leal
- [core] Add VSCode extensions recommendations (#37166) @michaldudak
- [test] `e2e-website` related minor fixes (#37204) @ZeeshanTamboli
- [website] Update the active positions (#37075) @DanailH
- [website] Add Romain to the About page (#37124) @romgrk
- [website] Make Toolpad alpha labels consistent (#37125) @gerdadesign

All contributors of this release in alphabetical order: @akash191095, @DanailH, @danilo-leal, @DerTimonius, @gerdadesign, @hbjORbj, @kriskw1999, @michaldudak, @mnajdova, @oliviertassinari, @PunitSoniME, @romgrk, @sai6855, @ulrichstark, @uuxxx, @wewakekumar, @ZeeshanTamboli, @zignis

## 5.12.3

<!-- generated comparing v5.12.2..master -->

_May 2, 2023_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- all planned breaking changes for Base UI are done. The first beta release should come next week 🎉
- 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.12.3`

- &#8203;<!-- 43 -->[Accordion] Add missing `component` type (#37111) @sai6855
- &#8203;<!-- 23 -->[ButtonGroup] Should not retain divider color when it is disabled and variant is `text` (#36967) @DavidBoyer11
- &#8203;<!-- 21 -->[Divider] Fix styles on dividers with text (#35072) @maxdestors
- &#8203;<!-- 04 -->[TextField] Improve IntelliSense support for props (#36737) @sai6855
- &#8203;<!-- 03 -->[TextField] Fix running click event on disabled (#36892) @sai6855

### `@mui/joy@5.0.0-alpha.78`

- &#8203;<!-- 09 -->[Joy] Miscellaneous fixes and docs improvement (#37026) @siriwatknp

### `@mui/base@5.0.0-alpha.128`

#### Breaking changes

- The `component` prop is no longer supported because it can be replaced with the slots API. This is how the transformation will look like:

  ```diff
   <Button
  -  component="span"
  +  slots={{ root: "span" }}
   />
  ```

  If using TypeScript, the custom component type should be added as a generic on the `Button` component.

  ```diff
  -<Button
  +<Button<typeof CustomComponent>
     slots={{ root: CustomComponent }}
     customProp="foo"
   />
  ```

  There is codemod that you can run in your project to do the transformation:

  ```bash
  npx @mui/codemod v5.0.0/base-remove-component-prop <path>
  ```

  The full documentation about the codemod can be found [here](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#base-remove-component-prop).

  This is the list of PR related to this change:

  - &#8203;<!-- 40 -->[Button][base] Drop `component` prop (#36677) @mnajdova
  - &#8203;<!-- 42 -->[Badge][base] Drop `component` prop (#37028) @hbjORbj
  - &#8203;<!-- 37 -->[FormControl][base] Drop component prop (#37031) @hbjORbj
  - &#8203;<!-- 35 -->[Input][base] Drop component prop (#37057) @hbjORbj
  - &#8203;<!-- 34 -->[Menu][base] Drop component prop (#37033) @hbjORbj
  - &#8203;<!-- 33 -->[MenuItem][base] Drop component prop (#37032) @hbjORbj
  - &#8203;<!-- 32 -->[Modal][base] Drop component prop (#37058) @hbjORbj
  - &#8203;<!-- 31 -->[Option][base] Drop component prop (#37052) @hbjORbj
  - &#8203;<!-- 30 -->[OptionGroup][base] Drop component prop (#37055) @hbjORbj
  - &#8203;<!-- 31 -->[Popper][base] Drop component prop (#37084) @hbjORbj
  - &#8203;<!-- 29 -->[Select][base] Drop component prop (#37035) @hbjORbj
  - &#8203;<!-- 28 -->[Slider][base] Drop component prop (#37056) @hbjORbj
  - &#8203;<!-- 27 -->[Snackbar][base] Drop component prop (#37041) @nicolas-ot
  - &#8203;<!-- 26 -->[Switch][base] Drop component prop (#37053) @hbjORbj
  - &#8203;<!-- 25 -->[Tab][base] Drop component prop (#36768) @sai6855
  - &#8203;<!-- 24 -->[Tabs][base] Drop component prop (#36770) @sai6855
  - &#8203;<!-- 08 -->[TablePagination][base] Drop component prop (#37059) @sai6855
  - &#8203;<!-- 07 -->[TabPanel][base] Drop component prop (#37054) @sai6855
  - &#8203;<!-- 06 -->[TabsList][base] Drop component prop (#37042) @sai6855

- &#8203;<!-- 41 -->[base] Improve API consistency (#36970) @michaldudak

  Brought consistency to Base UI components and hooks' parameters and return values:

  1. Whenever a hook needs a ref, it's now called `<slot_name>Ref`, which matches the `get<slot_name>Props` in the return value.
  2. All hooks that accept external refs now return merged refs, making combining multiple hooks on one element easier. This was proven necessary in several compound components (like menuItem being both a button and a list item). The type of this value is `React.RefCallback` as using the more general `React.Ref` caused variance issues.
  3. Type of accepted refs is standardized to `React.Ref<Element>`
  4. Naming and typing of the forwarded ref in unstyled components were standardized - it's forwardedRef: React.ForwardedRef<Element> (unless a more specific type is needed).
  5. The shape of the definition of unstyled components was standardized - it's React.forwardRef(function Component(props: Props, forwardedRef: React.Ref<Element>) { ... });. Specifically, the generic parameters of forwardRef were removed as they are specified in function arguments.

#### Changes

- &#8203;<!-- 36 -->[FormControl][base] Do not use optional fields in useFormControlContext's return value (#37037) @michaldudak

### Docs

- &#8203;<!-- 39 -->[base][docs] Add Base UI Quickstart Guide (#36717) @mj12albert
- &#8203;<!-- 20 -->[docs] Fix Material UI's API linking to Base UI (#37121) @mnajdova
- &#8203;<!-- 19 -->[docs] Fix pagination in the DataGrid demo (#37114) @cherniavskii
- &#8203;<!-- 18 -->[docs] Add notification to the release of the new Time Picker UI (#37065) @joserodolfofreitas
- &#8203;<!-- 17 -->[docs] Specify "Material UI" (not "MUI") where appropriate throughout the docs (#37066) @samuelsycamore
- &#8203;<!-- 16 -->[docs] Use focus-visible instead of focus for Menu demos (#36847) @michaldudak
- &#8203;<!-- 15 -->[docs] Fix small regressions API pages (#36972) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Handle a few docs-feedback (#36977) @oliviertassinari
- &#8203;<!-- 13 -->[docs] Fix anchor link in customization (#37004) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Add a note about minimal required version for theme merging to the guides (#36973) @jakub-stastny
- &#8203;<!-- 11 -->[docs] smooth scrolling added for `back to top` (#37011) @PunitSoniME
- &#8203;<!-- 10 -->[docs] Remove `useFormControl` return values from demos page (#37036) @ZeeshanTamboli
- &#8203;<!-- 47 --> [docs][base] Move styles to the bottom of demos code for `SwitchUnstyled` (#36720) @varunmulay22
- &#8203;<!-- 46 --> [docs][base] Move styles to the bottom of demos code for `InputUnstyled` (#36724) @varunmulay22
- &#8203;<!-- 45 --> [docs][base] Move styles to the bottom of demos code for `SliderUnstyled` (#36721) @varunmulay22
- &#8203;<!-- 44 --> [docs][base] Move styles to the bottom of demos code for `Snackbar` (#36719) @varunmulay22
- &#8203;<!-- 38 -->[docs][base] Move styles to the bottom of demos code for `SelectUnstyled` (#36718) @varunmulay22
- &#8203;<!-- 05 -->[templates] Image not displayed in blog layout of React template. (#36991) @navedqb
- &#8203;<!-- 02 -->[website] Take the design role offline @oliviertassinari
- &#8203;<!-- 01 -->[website] Fix URL convention @oliviertassinari
- &#8203;<!-- 21 -->[docs] Turn off job banner on docs (#36080) @joserodolfofreitas

### Core

- &#8203;<!-- 22 -->[core] Allow type alias as well in hooks API docs generation (#37034) @ZeeshanTamboli

All contributors of this release in alphabetical order: @cherniavskii, @DavidBoyer11, @hbjORbj, @jakub-stastny, @joserodolfofreitas, @maxdestors, @michaldudak, @mj12albert, @mnajdova, @navedqb, @nicolas-ot, @oliviertassinari, @PunitSoniME, @sai6855, @samuelsycamore, @siriwatknp, @varunmulay22, @ZeeshanTamboli

## 5.12.2

<!-- generated comparing v5.12.1..master -->

_Apr 25, 2023_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- ⚠️ **[BREAKING CHANGE]** The `Unstyled` suffix has been removed from Base UI component names, including names of types and other related identifiers – a codemod script is provided to assist with the change.
- 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.12.2`

- &#8203;<!-- 10 -->[FormControl] Fix `filled` when value is set through `inputProps` (#36741) @sai6855
- &#8203;<!-- 07 -->[Slider] `onChange` handler should be called only when value has changed (#36706) @gitstart
- &#8203;<!-- 06 -->[Table] Fix `Sorting & Selecting` tables (#36898) @oliviertassinari

### `@mui/base@5.0.0-alpha.127`

#### Breaking changes

- &#8203;<!-- 27 -->[base] Remove unstyled suffix from Base components + Codemod script (#36873) @hbjORbj

  The `Unstyled` suffix has been removed from all Base UI component names, including names of types and other related identifiers.

  You can use this [codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/src/v5.0.0/base-remove-unstyled-suffix.js) to help with the migration:

  ```bash
  npx @mui/codemod v5.0.0/base-remove-unstyled-suffix <path>
  ```

#### Changes

- &#8203;<!-- 26 -->[codemod][base] Improve the removal of `component` prop codemod script (#36952) @hbjORbj
- &#8203;<!-- 25 -->[codemod][base] Write a migration script for removal of `component` prop from components (#36831) @hbjORbj
- &#8203;<!-- 24 -->[Base][useButton] Allow useButton params to be completely optional (#36922) @mj12albert

### `@mui/joy@5.0.0-alpha.77`

- &#8203;<!-- 23 -->[Joy][Chip] Chip button not showing up in Firefox browser (#36930) @TakhyunKim
- &#8203;<!-- 09 -->[Joy] Add `invertedColors` to Menu and Alert (#36975) @siriwatknp
- &#8203;<!-- 08 -->[joy][Select] Set focus visible on select options when navigating with arrow keys (#36689) @gitstart

### Docs

- &#8203;<!-- 21 -->[docs] Fix console error introduced by #36408 (#36980) @alexfauquette
- &#8203;<!-- 20 -->[docs] Add stray Joy UI documentation improvements (#36921) @danilo-leal
- &#8203;<!-- 19 -->[docs] Add Joy profile dashboard template (#36931) @siriwatknp
- &#8203;<!-- 18 -->[docs] Fix 404 links (#36969) @oliviertassinari
- &#8203;<!-- 17 -->[docs] Clarify when bundle size optimization is needed (#36823) @oliviertassinari
- &#8203;<!-- 16 -->[docs] Fix Chakra UI theme scoping typo (#36950) @mj12albert
- &#8203;<!-- 15 -->[docs] Add snackbar example using sonner (#36926) @PupoSDC
- &#8203;<!-- 14 -->[docs] Adjust the Material Icons page design and formatting (#36937) @danilo-leal
- &#8203;<!-- 13 -->[docs] Allows to customize menu with any icon (#36408) @alexfauquette
- &#8203;<!-- 12 -->[docs] Add info about passing ref to input element (#36913) @tomaskebrle
- &#8203;<!-- 11 -->[docs][material] Tabs API section cleanup (#36942) @mnajdova

### Core

- &#8203;<!-- 22 -->[core] Fix CI failure on `master` (#37016) @hbjORbj
- &#8203;<!-- 05 -->[typescript] Add the missing explicit component return types (#36924) @michaldudak
- &#8203;<!-- 04 -->[website] Update main data grid demo on X landing page (#37001) @cherniavskii
- &#8203;<!-- 03 -->[website] Design role updates (#36997) @danilo-leal
- &#8203;<!-- 02 -->[website] X component section improvements (#36598) @danilo-leal
- &#8203;<!-- 01 -->[website] Developer Advocate role filled @oliviertassinari

All contributors of this release in alphabetical order: @alexfauquette, @cherniavskii, @danilo-leal, @gitstart, @hbjORbj, @michaldudak, @mj12albert, @mnajdova, @oliviertassinari, @PupoSDC, @sai6855, @siriwatknp, @TakhyunKim, @tomaskebrle

## 5.12.1

<!-- generated comparing v5.12.0..master -->

_Apr 17, 2023_

A big thanks to the 16 contributors who made this release possible. This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.12.1`

- &#8203;<!-- 24 -->[Autocomplete] Fix autocomplete left padding (#36649) @mj12albert
- &#8203;<!-- 17 -->[Button] Fix contained with inherit prop not adapting on dark mode (#34508) @jesrodri
- &#8203;<!-- 07 -->[FormControlLabel] Add `required` prop (#34207) @emlai
- &#8203;<!-- 04 -->[Tabs] Fix null reference in ScrollbarSize after unmounting (#36485) @rkdrnf
- &#8203;<!-- 03 -->[TextField] Fix type error when using `inputTypeSearch` class for `outlined` and `filled` inputs (#36740) @sai6855
- &#8203;<!-- 02 -->[ThemeProvider] Fix theme proptypes (#36852) @siriwatknp

### `@mui/system@5.12.1`

#### Breaking changes

- &#8203;<!-- 06 -->[Grid2] Replace context with `cloneElement` (#36399) @siriwatknp

  `Grid2` now uses `React.cloneElement` instead of React context for passing the spacing and columns to the next container. The change is close to how CSS flexbox behaves.

#### Changes

- &#8203;<!-- 14 -->[CssVarsProvider] Always generate new `css` object (#36853) @siriwatknp

### `@mui/base@5.0.0-alpha.126`

#### Breaking changes

- &#8203;<!-- 23 -->[base] Refactor the compound components building blocks (#36400) @michaldudak
  Components affected by the changes are:
  - Menu
    - `MenuUnstyledContext` is replaced by `MenuProvider`. The value to pass to the provider is returned by the `useMenu` hook.
    - MenuUnstyled's `onClose` prop is replaced by `onOpenChange`. It has the `open` parameter and is called when a menu is opened or closed
  - Select
    - `SelectUnstyledContext` is replaced by `SelectProvider`. The value to pass to the provider is returned by the `useSelect` hook.
    - `SelectUnstyled`'s popup is permanently mounted.
    - The `defaultOpen` prop was added to the SelectUnstyled. The open/close state can now be controlled or uncontrolled, as a `value`.
  - Tabs
    - `TabsContext` is replaced by `TabsProvider`. The value to pass to the provider is returned by the `useTabs` hook.
    - To deselect all tabs, pass in `null` to Tabs' `value` prop, instead of `false`. This is consistent with how Select works.
    - The `value` prop is still technically not mandatory on TabUnstyled and TabPanel, but when omitted, the contents of the selected tab panel will not be rendered during SSR.

### `@mui/joy@5.0.0-alpha.76`

- &#8203;<!-- 05 -->[Table][Joy] Replace uses of css selector `*-child` to `*-of-type` (#36839) @keyvanm

### Docs

- &#8203;<!-- 25 --> [docs][base] Move styles to the bottom of demos code for `BadgeUnstyled` (#36723) @varunmulay22
- &#8203;<!-- 22 -->[docs][base] Mention that the hook does not accept any parameters in the `Parameters` section of the API docs (#36773) @ZeeshanTamboli
- &#8203;<!-- 21 -->[docs][base] Move styles to the bottom of demos code for `ModalUnstyled` (#36580) @gitstart
- &#8203;<!-- 20 -->[docs][base] Move styles to the bottom of demos code for `Tabs` (#36577) @gitstart
- &#8203;<!-- 19 -->[docs][base] Move styles to the bottom of demos code for `Popper` (#36578) @gitstart
- &#8203;<!-- 18 -->[docs][base] Move styles to the bottom of demos code for `TablePagination` (#36593) @gitstart
- &#8203;<!-- 13 -->[docs] Remove the incorrect info about useButton's ref parameter (#36883) @michaldudak
- &#8203;<!-- 12 -->[docs] Sync <Stack> between projects (#36785) @oliviertassinari
- &#8203;<!-- 11 -->[docs] Add guides to overriding component structure in Base UI and Joy UI docs (#34990) @samuelsycamore
- &#8203;<!-- 10 -->[docs] Content changed from 'row' to 'orientation=horizontal' (#36858) @navedqb
- &#8203;<!-- 09 -->[docs][Joy] `component`, `slots`, `slotProps` must be visible in Prop table in API docs (#36666) @hbjORbj
- &#8203;<!-- 08 -->[docs][Select] Fix duplicate ID in small size Select demo (#36792) @sai6855

### Core

- &#8203;<!-- 16 -->[core] Use glob to find the test files in parseTest (#36305) @flaviendelangle
- &#8203;<!-- 15 -->[core] Fix minor SEO issues @oliviertassinari
- &#8203;<!-- 01 -->[website] Fix visual bug appbar (#36875) @oliviertassinari

All contributors of this release in alphabetical order: @emlai, @flaviendelangle, @gitstart, @hbjORbj, @jesrodri, @keyvanm, @michaldudak, @mj12albert, @navedqb, @oliviertassinari, @rkdrnf, @sai6855, @samuelsycamore, @siriwatknp, @varunmulay22, @ZeeshanTamboli

## 5.12.0

<!-- generated comparing v5.11.16..master -->

_Apr 11, 2023_

A big thanks to the 9 contributors who made this release possible. Here are some highlights ✨:

- 💫 Added [theme scope](https://mui.com/material-ui/guides/theme-scoping/) for using multiple design systems (#36664) @siriwatknp
- 🐛 bug fixes and 📚 documentation improvements.

### `@mui/system@5.12.0`

- &#8203;<!-- 05 -->[system] Introduce theme scope for using multiple design systems (#36664) @siriwatknp

### `@mui/base@5.0.0-alpha.125`

- &#8203;<!-- 06 -->[PopperUnstyled] Do not merge internal `ownerState` with `ownerState` from props (#36599) @hbjORbj

### `@mui/joy@5.0.0-alpha.75`

- &#8203;<!-- 08 -->[Joy] Add tests for slots/slotProps for all components (#36828) @hbjORbj
- &#8203;<!-- 07 -->[Joy] Support `slots`/`slotsProps` for every component (components with only root slot too) (#36540) @hbjORbj

### Docs

- &#8203;<!-- 23 -->[docs][Backdrop] Improvements to the docs (#34244) @alirezahekmati
- &#8203;<!-- 20 -->[docs] Fix base API redirects (#36833) @mnajdova
- &#8203;<!-- 19 -->[docs] Improve perf on tab APIs (#36832) @mnajdova
- &#8203;<!-- 18 -->[docs] Revert CircularProgress component text to be proper noun instead (#36837) @ZeeshanTamboli
- &#8203;<!-- 17 -->[docs] Simplify language redirection @oliviertassinari
- &#8203;<!-- 16 -->[docs] Add missing `readOnly` state class in the list (#36788) @ZeeshanTamboli
- &#8203;<!-- 15 -->[docs] Improve side nav scroll into view (#36732) @oliviertassinari
- &#8203;<!-- 14 -->[docs][base & joy] Display "Classes" Section in API docs (#36589) @hbjORbj
- &#8203;<!-- 13 -->[docs] Fix 100+ typos throughout the Material UI docs (#36194) @Lioness100
- &#8203;<!-- 12 -->[docs] Change "coming soon" chip color (#36786) @danilo-leal
- &#8203;<!-- 11 -->[docs][Joy] Fix wrong prop descriptions (#36826) @hbjORbj
- &#8203;<!-- 10 -->[docs][material] Highlight global state classes in CSS table in API docs (#36633) @hbjORbj
- &#8203;<!-- 09 -->[examples] Fix `SliderUnstyled` slots `key` name (#36830) @sai6855
- &#8203;<!-- 04 -->[Tabs] Improve useTab() API page (#36725) @oliviertassinari

### Core

- &#8203;<!-- 22 -->[core] Increase margin to scroll @oliviertassinari
- &#8203;<!-- 21 -->[core] Replace MUI Base with Base UI (#36716) @mnajdova
- &#8203;<!-- 03 -->[website] Fix broken career website links @oliviertassinari
- &#8203;<!-- 02 -->[website] Fix backlinks to homepage (#36801) @oliviertassinari
- &#8203;<!-- 01 -->[website] Tweaks to the Designer position ad (#36771) @danilo-leal

All contributors of this release in alphabetical order: @alirezahekmati, @danilo-leal, @hbjORbj, @Lioness100, @mnajdova, @oliviertassinari, @sai6855, @siriwatknp, @ZeeshanTamboli

## 5.11.16

<!-- generated comparing v5.11.15..master -->

_Apr 4, 2023_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 💅 Added tabs on API pages of Base UI to switch between component and hook references (#35938) @mnajdova
- 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.16`

- [Autocomplete] Listen for click on the root element (#36369) @sai6855
- [Autocomplete] Fix navigation issue on mouse hover (#35196) @sai6855
- [Card] Fix Card focus effect overflowing parent card (#36329) @mj12albert
- [Grid] Missing slot (#36765) @siriwatknp
- [Select] Make error part of the `ownerState` to enable overriding styles with it in theme (#36422) @gitstart
- [Slider] Fix ValueLabel UI issues comes when size="small" and orientation="vertical (#36738) @yushanwebdev

### `@mui/icons-material@5.11.16`

- [icons] Do not ignore popular icons (#36608) @michaldudak

### `@mui/joy@5.0.0-alpha.74`

- [Joy] Add `ModalOverflow` component (#36262) @siriwatknp
- [Joy] Fix `Checkbox` custom color prop type warning (#36691) @amal-qb

### Docs

- [docs][base] Add return type for `useFormControlUnstyledContext` hook (#36302) @HeVictor
- [docs][base] Move styles to the bottom of demos code for `FormControl` (#36579) @gitstart
- [docs][base] Move styles to the bottom of demos code for `Menu` (#36582) @gitstart
- [docs][base] Move styles code to bottom in the `Button` demos (#36590) @sai6855
- [docs][base] Show components & hooks API on the components page (#35938) @mnajdova
- [docs] Describe slotProps in MUI Base customization doc (#36206) @michaldudak
- [docs] Fix double API page redirection (#36743) @oliviertassinari
- [docs] Remove hash property and leverage pathname (#36764) @siriwatknp
- [docs] Introduce markdown permalink to source (#36729) @oliviertassinari
- [docs] Tabs API add slots section (#36769) @mnajdova
- [docs] Update feedbacks management on slack (#36705) @alexfauquette
- [docs] Fix Joy UI URL to tokens (#36742) @oliviertassinari
- [docs] Add toggle-button coming soon page (#36618) @siriwatknp
- [docs] Fix typo on the Joy UI theme builder (#36734) @danilo-leal
- [docs] Fix small typo (#36727) @RBerthier
- [docs] Fix Joy UI template broken image loading @oliviertassinari
- [docs] Hide the default API column if it's empty (#36715) @mnajdova
- [docs] Update Material UI Related Projects page (#34203) @viclafouch
- [docs] Revise Joy UI "Circular Progress" page (#36126) @LadyBluenotes
- [docs] Revise Joy UI "Radio" page (#35893) @DevinCLane
- [docs] Support Google Analytics 4 (#36123) @alexfauquette
- [docs][material] Keep consistency in description of classes (#36631) @hbjORbj
- [docs] Remove redundant files and fix regression (#36775) @ZeeshanTamboli

### Core

- [blog] Compress images @oliviertassinari
- [core] Remove unused token (#36722) @oliviertassinari

All contributors of this release in alphabetical order: @alexfauquette, @amal-qb, @danilo-leal, @DevinCLane, @gitstart, @hbjORbj, @HeVictor, @LadyBluenotes, @michaldudak, @mj12albert, @mnajdova, @oliviertassinari, @RBerthier, @sai6855, @siriwatknp, @viclafouch, @yushanwebdev

## 5.11.15

<!-- generated comparing v5.11.14..master -->

_Mar 28, 2023_

A big thanks to the 10 contributors who made this release possible. We have one big highlight this week ✨:

- @siriwatknp made a [Theme Builder](https://mui.com/joy-ui/customization/theme-builder) for Joy UI 🎨 (#35741)

### `@mui/material@5.11.15`

- [Chip] Fix error when theme value is a CSS variable (#36654) @siriwatknp
- [Grid2] Support dynamic nested columns (#36401) @siriwatknp

### `@mui/system@5.11.15`

- [system] Enable regressions tests & fix regressions (#36611) @mnajdova
- [Stack] Add `useFlexGap` prop (#36404) @siriwatknp

### `@mui/base@5.0.0-alpha.122`

- [Autocomplete] Update `autoSelect` prop description (#36280) @sai6855
- [TablePagination][base] Improve `actions` type in `slotProps` (#36458) @sai6855
- [Base] Add JSDoc comments for classes of Base components (#36586) @hbjORbj
- [useSlider][base] Add API docs for the hook parameters and return type (#36576) @varunmulay22

### `@mui/joy@5.0.0-alpha.73`

- [Joy] Miscellaneous fixes (#36628) @siriwatknp
- [Joy] Add palette customizer (#35741) @siriwatknp

### Docs

- Revert "[docs] Use `theme.applyDarkStyles` for the rest of the docs" (#36602) @mnajdova
- [blog] Improvements on v6 announcement blog (#36505) @joserodolfofreitas
- [docs] Add `Snackbar` coming soon page (#36604) @danilo-leal
- [docs] Add accordion coming soon page (#36279) @siriwatknp
- [docs] Fix palette customizer theme augmentation (#36629) @siriwatknp
- [docs] Finish migration away from https://reactjs.org/ @oliviertassinari
- [docs] Remove duplicated slot descriptions (#36621) @hbjORbj
- [docs] Fix broken example link (#36607) @mnajdova
- [docs] Use `theme.applyDarkStyles` (#36606) @siriwatknp
- [docs] Improve API for theme default prop (#36490) @oliviertassinari
- [docs][Table] Refactor `Sorting & Selecting` table demo (#33236) @IFaniry

### Core

- [core] Use Netlify function for feedback management (#36472) @alexfauquette

All contributors of this release in alphabetical order: @alexfauquette, @danilo-leal, @hbjORbj, @IFaniry, @joserodolfofreitas, @mnajdova, @oliviertassinari, @sai6855, @siriwatknp, @varunmulay22

## 5.11.14

<!-- generated comparing v5.11.13..master -->

_Mar 21, 2023_

A big thanks to the 15 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.14`

- [Breadcrumbs] Add ability to change icon used in `BreadcrumbCollapsed` through slots (#33812) @pratikkarad
- [Stepper] Add aria-current to active StepButton (#36526) @michalak111
- [TabScrollButton] Add ability to change left and right icons (#33863) @pratikkarad
- [ListItemButton] Respect LinkComponent (#34159) @zaverden
- [l10n] Add Central Kurdish (ku-CKB) locale (#36592) @HediMuhamad

### `@mui/system@5.11.14`

- [system] Fix sx prop regression for fontWeight values (#36543) @mnajdova

### `@mui/base@5.0.0-alpha.121`

- [docs][base] Improve the Slots Table in API docs (#36330) @hbjORbj

### `@mui/joy@5.0.0-alpha.72`

- [Joy] Ensure new CSS variable naming is everywhere (#36460) @hbjORbj
- [Menu][joy] Classname listbox is missing (#36520) @hbjORbj
- [Joy] Fix `--List-decorator*` vars (#36595) @siriwatknp

### `@mui/lab@5.0.0-alpha.124`

- [Masonry] Include Masonry in theme augmentation interface (#36533) @hbjORbj

### Docs

- [blog] Post blog about Chamonix retreat to the website (#36517) @mikailaread
- [blog] Fix image layout shift (#36522) @oliviertassinari
- [docs] Use `theme.applyDarkStyles` for the rest of the docs (#36161) @siriwatknp
- [docs] Fix 301 and 404 links (#36555) @oliviertassinari
- [docs] Keep slot code order in API docs (#36499) @oliviertassinari
- [docs] Missing className on Migrating from JSS example (#36536) @gabrielnafuzi
- [docs] Fix function name for Joy templates (#36512) @hbjORbj
- [docs] Add multiline Chip example (#36437) @dav1app
- [docs] Add a new gold sponsor (#36518) @hbjORbj
- [docs][joy] Improve the Slots Table in API docs (#36328) @hbjORbj
- [docs] Fix virtualElement demo for Popper (#36320) @sai6855
- [docs] Fix typo in API docs (#36388) @RomanHotsiy
- [docs] Ensure classname displayed under Slots section in API docs exists (#36539) @hbjORbj
- [docs][joy] Build TS versions for Modal component demos (#36385) @varunmulay22
- [docs][joy] Build TS versions for Menu component demos (#36383) @varunmulay22
- [docs][joy] Build TS versions for Switch component demos (#36379) @varunmulay22
- [docs] Remove `shouldSkipGeneratingVar` usage (#36581) @siriwatknp
- [docs][material] Update Table's demo to show pointer cursor on clickable rows (#36546) @varunmulay22
- [website] Designer role changes (#36528) @danilo-leal
- [website] No association between showcase and MUI @oliviertassinari
- [website] Open Head of Operations role (#36501) @oliviertassinari
- [website] Limit sponsors description to two rows @oliviertassinari

### Core

- [core] Fix CI @oliviertassinari
- [core] Fix blank line @oliviertassinari
- [website] Simplify internal ops @oliviertassinari

All contributors of this release in alphabetical order: @danilo-leal, @dav1app, @gabrielnafuzi, @hbjORbj, @HediMuhamad, @michalak111, @mikailaread, @mnajdova, @oliviertassinari, @pratikkarad, @RomanHotsiy, @sai6855, @siriwatknp, @varunmulay22, @zaverden

## 5.11.13

<!-- generated comparing v5.11.12..master -->

_Mar 14, 2023_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

- @michaldudak added an option for [disabling the generation](https://mui.com/base-ui/getting-started/customization/#disabling-default-css-classes) of the default classes in Base UI (#35963)
- other 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.13`

- &#8203;<!-- 13 -->[core] Bump Base UI's version in Material UI (#36492) @hbjORbj
- &#8203;<!-- 17 -->[material] Export `shouldSkipGeneratingVar` from Material UI (#36489) @siriwatknp
- &#8203;<!-- 06 -->[Typography] Apply font properties to typography inherit variant (#33621) @oyar99

### `@mui/base@5.0.0-alpha.121`

- &#8203;<!-- 16 -->[base] Disable classes generation via a context (#35963) @michaldudak
- &#8203;<!-- 15 -->[useMenu][base] Add return interface for useMenu hook (#36376) @HeVictor
- &#8203;<!-- 05 -->[useBadge] Add interface for the return value (#36042) @skevprog
- &#8203;<!-- 04 -->[useMenuItem] Add explicit return type (#36359) @rayrw
- &#8203;<!-- 03 -->[useTabs] Add explicit return type (#36047) @sai6855

### Docs

- &#8203;<!-- 14 -->[blog] Update fields behavior on date pickers blog post (#36480) @joserodolfofreitas
- &#8203;<!-- 12 -->[docs] Info markdown not rendering in Contributing Guide README (#36487) @hbjORbj
- &#8203;<!-- 11 -->[docs] Remove 301 redirection to MUI X lab migration @oliviertassinari
- &#8203;<!-- 10 -->[docs] Fix a grammar error (#36486) @hbjORbj
- &#8203;<!-- 09 -->[docs] Add blog post notification for v6 release (#36446) @joserodolfofreitas
- &#8203;<!-- 08 -->[docs] Update link to v5 docs (#36421) @m4theushw
- &#8203;<!-- 07 -->[docs] Fix 404 in the API page links (#36419) @oliviertassinari
- &#8203;<!-- 08 -->[docs][joy] Error in the exemplary Codesandbox of using Material UI and Joy UI together (#36462) @hbjORbj
- &#8203;<!-- 06 -->[examples] Refactor to have better types in the Next.js + TypeScript examples (#36355) @erikian
- &#8203;<!-- 02 -->[website] Fix layout shift when loading /blog/mui-x-v6/ @oliviertassinari
- &#8203;<!-- 01 -->[website] Update stats (#36477) @hrutik7

All contributors of this release in alphabetical order: @erikian, @hbjORbj, @HeVictor, @hrutik7, @joserodolfofreitas, @m4theushw, @michaldudak, @oliviertassinari, @oyar99, @rayrw, @sai6855, @siriwatknp, @skevprog

## 5.11.12

<!-- generated comparing v5.11.11..master -->

_Mar 6, 2023_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- @michaldudak added the multiselect functionality to SelectUnstyled (#36274)
- @mnajdova updated `extendTheme` so that it can generate CSS variables with default values. This means that the `CssVarsProvider` is no longer required for Joy UI when using the default theme (#35739)
- other 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.12`

- &#8203;<!-- 30 -->[Autocomplete] Fix list scrolls to the top when new data is added on touch devices (#36231) @SaidMarar
- &#8203;<!-- 29 -->[Autocomplete] Add `Mui-expanded` class (#33312) @Osman-Sodefa
- &#8203;<!-- 24 -->[Dialog] Use the `id` prop provided to the `DialogTitle` component (#36353) @Kundan28
- &#8203;<!-- 07 -->[Menu] Fix Menu Paper styles overriding in the theme (#36316) @Paatus

### `@mui/lab@5.0.0-alpha.122`

- &#8203;<!-- 05 -->[TreeView] Fix Tree View inside shadow root crashes (#36225) @NoFr1ends

### `@mui/system@5.11.12`

#### Breaking changes

- &#8203;<!-- 26 -->[core] Generate vars in `extendTheme` (#35739) @mnajdova

  The `shouldSkipGeneratingVar` prop was moved from the `createCssVarsProvider`'s option to the `theme`. If the default theme does not use `extendTheme` from Material UI or Joy UI, it needs to be wrapped inside `unstable_createCssVarsTheme` - a util exported from the MUI System. Below is an example of how the migration should look like:

  ```diff
   import {
      unstable_createCssVarsProvider as createCssVarsProvider,
  +   unstable_createCssVarsTheme as createCssVarsTheme,
   } from '@mui/system';

   const { CssVarsProvider } = createCssVarsProvider({
  -  theme: {
  +  theme: createCssVarsTheme({
       colorSchemes: {
         light: {
           typography: {
             htmlFontSize: '16px',
             h1: {
               fontSize: '1rem',
               fontWeight: 500,
             },
           },
         },
       },
  +    shouldSkipGeneratingVar: (keys) => keys[0] === 'typography' && keys[1] === 'h1',
  -  },
  +  }),
     defaultColorScheme: 'light',
  -  shouldSkipGeneratingVar: (keys) => keys[0] === 'typography' && keys[1] === 'h1',
   });
  ```

  Or you can define it directly in the theme prop:

  ```diff
   <CssVarsProvider
  +   theme={createCssVarsProvider({
  +    // other theme keys
  +    shouldSkipGeneratingVar: (keys) => keys[0] === 'typography' && keys[1] === 'h1'
  +   })} />
  ```

  This breaking change **only** affects experimental APIs

### `@mui/base@5.0.0-alpha.120`

#### Breaking changes

- &#8203;<!-- 27 -->[Select][base] Add the multiselect functionality to SelectUnstyled (#36274) @michaldudak

  The MultiSelectUnstyled was removed. The `SelectUnstyled` component with the `multiple` prop should be used instead. Additionally, the SelectUnstyledProps received a second generic parameter: `Multiple extends boolean`. If you deal with strictly single- or multi-select components, you can hard-code this parameter to `false` or `true`, respectively. Below is an example of how the migration should look like:

  ```diff
  -import MultiSelectUnstyled from '@mui/base/MultiSelectUnstyled';
  +import SelectUnstyled from '@mui/base/SelectUnstyled';

   export default App() {
  -return <MultiSelectUnstyled />
  +return <SelectUnstyled multiple />
   }
  ```

#### Changes

- &#8203;<!-- 34 -->[useSnackBar] Add explicit return type (#36052) @sai6855
- &#8203;<!-- 04 -->[useMenu] Fix `import type` syntax (#36411) @ZeeshanTamboli
- &#8203;<!-- 03 -->[useSwitch] Add explicit return type (#36050) @sai6855

### `@mui/joy@5.0.0-alpha.70`

#### Breaking changes

- &#8203;<!-- 09 -->[Joy] Change CSS variables naming for components (#36282) @hbjORbj

  Joy UI has new naming standards of the CSS variables for its components. Below is an example of how the migration should look like:

  ```diff
  -<List sx={{ py: 'var(--List-divider-gap)' }}>
  +<List sx={{ py: 'var(--ListDivider-gap)' }}>
  -<Switch sx={{ '--Switch-track-width': '40px' }}>
  +<Switch sx={{ '--Switch-trackWidth': '40px' }}>
  ```

#### Changes

- &#8203;<!-- 28 -->[Autocomplete][joy] Add disabled class to the popup indicator (#36397) @hbjORbj
- &#8203;<!-- 08 -->[Joy] Fix broken loading button in Safari (#36298) @Kuba429

### Docs

- &#8203;<!-- 33 -->[docs][joy] Clarify when `CssVarsProvider` is required (#36410) @mnajdova
- &#8203;<!-- 32 -->MUI X v6 release announcement (#36398) @joserodolfofreitas
- &#8203;<!-- 23 -->[docs] Add instructions for deploying docs without a release (#36301) @cherniavskii
- &#8203;<!-- 22 -->[docs] Fix 301 redirections on the docs @oliviertassinari
- &#8203;<!-- 21 -->[docs] Update MUI X banner to reflect stable release (#36354) @MBilalShafi
- &#8203;<!-- 20 -->[docs] Clarify the future plan for integrating Base UI in Material UI (#36365) @mnajdova
- &#8203;<!-- 19 -->[docs] Improve visual look of loose lists (#36190) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Fix @mui/styles example links (#36331) @oliviertassinari
- &#8203;<!-- 17 -->[docs][joy] Build TS versions for List component demos (#36382) @sai6855
- &#8203;<!-- 16 -->[docs][joy] Build TS versions for Radio component demos (#36406) @sai6855
- &#8203;<!-- 15 -->[docs][joy] Build TS versions for Checkbox component demos (#36381) @sai6855
- &#8203;<!-- 14 -->[docs][joy] Build TS versions for Select component demos (#36380) @sai6855
- &#8203;<!-- 13 -->[docs][joy] Build TS versions for Typography component demos (#36378) @varunmulay22
- &#8203;<!-- 12 -->[docs][joy] Add typescript demos for `Divider` (#36374) @sai6855
- &#8203;<!-- 11 -->[docs][joy] Build TS versions for Textarea component demos (#36371) @varunmulay22
- &#8203;<!-- 10 -->[docs][joy] Build TS versions for Link component demos (#36366) @hbjORbj

### Core

- &#8203;<!-- 31 -->Revert "Bump rimraf to ^4.1.3" (#36420) @mnajdova
- &#8203;<!-- 25 -->[core] Fix test utils types and external `buildApiUtils` usage issues (#36310) @LukasTy
- &#8203;<!-- 06 -->[test] Remove duplicate `combobox` role queries in Autocomplete tests (#36394) @ZeeshanTamboli
- &#8203;<!-- 02 -->[website] Clarify redistribution @oliviertassinari
- &#8203;<!-- 01 -->[website] Sync /about page (#36334) @oliviertassinari

All contributors of this release in alphabetical order: @cherniavskii, @hbjORbj, @joserodolfofreitas, @Kuba429, @Kundan28, @LukasTy, @MBilalShafi, @michaldudak, @mnajdova, @NoFr1ends, @oliviertassinari, @Osman-Sodefa, @Paatus, @sai6855, @SaidMarar, @varunmulay22, @ZeeshanTamboli

## 5.11.11

<!-- generated comparing v5.11.10..master -->

_Feb 27, 2023_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 📚 added API documentation for the slots in Base UI and Joy UI by @hbjORbj, for e.g. [SliderUnstyled API](https://mui.com/base-ui/api/slider-unstyled/#slots)
- other 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.11`

- &#8203;<!-- 30 -->[Autocomplete] Adds `sx` prop to `ListboxProps` type (#36243) @sai6855
- &#8203;<!-- 11 -->[material] Add global CSS class for `readOnly` prop (#32822) @jrparish
- &#8203;<!-- 10 -->[Stack][material] Use createStack from the system (#33795) @mnajdova
- &#8203;<!-- 07 -->[Select] Fix incorrect selecting of first element (#36024) @michaldudak
- &#8203;<!-- 06 -->[Slider] Miscellaneous improvements (#35941) @ZeeshanTamboli
- &#8203;<!-- 05 -->[Slider] Remove unnecessary `data-focusvisible` attribute (#36091) @ZeeshanTamboli
- &#8203;<!-- 04 -->[Snackbar] Replace component logic with `useSnackbar` hook (#36272) @ZeeshanTamboli
- &#8203;<!-- 03 -->[TextField] Fix floating label position (#36246) @oliviertassinari
- &#8203;<!-- 13 -->[TextField] Fix floating label position (#36288) @oliviertassinari

### `@mui/base@5.0.0-alpha.119`

#### Breaking changes

- &#8203;<!-- 29 -->[base] Remove `classes` prop from the Base components that have it (#36157) @hbjORbj
  These are the components affected by this change: ModalUnstyled, SliderUnstyled, TablePaginationUnstyled and TablePaginationActionsUnstyled.
  You can replace the `classes` prop by providing the class name prop directly to the prop via `slotProps`. Below is an example of how the migration should look like:

  ```diff
   <TablePaginationUnstyled
  -   classes={{ toolbar: 'toolbar-classname', menuItem: 'menuItem-classname' }}
  +   slotProps={{ toolbar: { className: 'toolbar-classname' }, menuItem: { className: 'menuItem-classname'}}}
   />
  ```

- &#8203;<!-- 28 -->[base] Move hooks to their own directories (#36235) @hbjORbj
  Base hooks (e.g., `useSelect`) are no longer exported from `{Component}Unstyled` directories and instead they have their own directories.
  Below is an example of how the migration should look like:

  ```diff
  -import { useBadge } from '@mui/base/BadgeUnstyled';
  +import useBadge from '@mui/base/useBadge';
  ```

  You can use this [codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#base-hook-imports) to help with the migration.

#### Changes

- &#8203;<!-- 31 -->[Autocomplete] Add docs interface for the hook (#36242) @HeVictor
- &#8203;<!-- 09 -->[MenuUnstyled] Remove extra useMemo (#36265) @ivp-dev
- &#8203;<!-- 31 -->[base] Export all slot prop overrides interfaces (#36323) @michaldudak

### `@mui/codemod@5.11.11`

- &#8203;<!-- 35 -->[base] Codemod for hook directory migration (#36295) @hbjORbj

### `@mui/joy@5.0.0-alpha.69`

- &#8203;<!-- 15 -->[Joy] Able to remove default tokens from theme types (#36006) @siriwatknp
- &#8203;<!-- 14 -->[Joy] Fix modal dialog overflow viewport (#36103) @siriwatknp
- &#8203;<!-- 13 -->[Joy] Select popup should have max-height (#36156) @Vivek-Prajapatii
- &#8203;<!-- 12 -->[Joy] Fix `ListDivider` to change semantic based on `List` (#36266) @siriwatknp

### Docs

- &#8203;<!-- 27 -->[docs][base] List slots in API documentation (#36104) @hbjORbj
- &#8203;<!-- 26 -->[docs] Add missing sandbox adapter deps resolving (#36291) @LukasTy
- &#8203;<!-- 25 -->[docs] Allow to pass navigation bar banner from outside (#36299) @MBilalShafi
- &#8203;<!-- 24 -->[docs] Fix code on the Working with Tailwind CSS guide (#36090) @mnajdova
- &#8203;<!-- 23 -->[docs] Remove See Slots Section text from Material UI slots description (#36284) @hbjORbj
- &#8203;<!-- 22 -->[docs] Fix emotion warning `:first-child` (#36263) @siriwatknp
- &#8203;<!-- 21 -->[docs][joy] Improve the descriptions of props in API docs (#36307) @hbjORbj
- &#8203;<!-- 20 -->[docs][joy] List slots in API documentation (#36271) @hbjORbj
- &#8203;<!-- 19 -->[docs][joy] Build API documentations (#36008) @hbjORbj
- &#8203;<!-- 18 -->[examples] Update Next.js examples to use built-in font (#36315) @Juneezee
- &#8203;<!-- 17 -->[examples] Update curl link in `material-ui-nextjs-ts-v4-v5-migration` example README (#36321) @ZeeshanTamboli
- &#8203;<!-- 16 -->[examples] Convert Next.js \_document class components to function components (#36109) @ossan-engineer

### Core

- &#8203;<!-- 08 -->[Rating] Add a comment in Rating component to use `readOnly` state class (#36357) @ZeeshanTamboli
- &#8203;<!-- 02 -->[website] Fix broken links to role levels (#36333) @oliviertassinari
- &#8203;<!-- 01 -->[website] Sync gold sponsors (#36312) @oliviertassinari

All contributors of this release in alphabetical order: @hbjORbj, @HeVictor, @ivp-dev, @jrparish, @Juneezee, @LukasTy, @MBilalShafi, @michaldudak, @mnajdova, @oliviertassinari, @ossan-engineer, @sai6855, @siriwatknp, @Vivek-Prajapatii, @ZeeshanTamboli

## 5.11.10

<!-- generated comparing v5.11.9..master -->

_Feb 20, 2023_

A big thanks to the 11 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.10`

- &#8203;<!-- 22 -->[Avatar] Fix ownerState usage with styleOverrides when fallback is used (#36228) @sai6855
- &#8203;<!-- 21 -->[Badge][material] Replace `BadgeUnstyled` with `useBadge` hook (#36158) @hbjORbj
- &#8203;<!-- 03 -->[Switch] Fix DOM warning when `type` isn't `checkbox` or `radio` (#36170) @dani-mp
- &#8203;<!-- 02 -->[TextareaAutosize] Convert code to TypeScript (#35862) @sai6855
- &#8203;<!-- 01 -->[useMediaQuery] Fix behavior of noSsr with React 18 (#36056) @oliviertassinari

### `@mui/joy@5.0.0-alpha.68`

- &#8203;<!-- 05 -->[Joy] Add `zIndex` to theme (#36236) @siriwatknp
- &#8203;<!-- 04 -->[Joy] Remove transition from all components (#35952) @hbjORbj

### Docs

- &#8203;<!-- 20 -->[docs][base] Fix base Input demos for Safari (#36213) @mj12albert
- &#8203;<!-- 16 -->[docs] Fix 301 links @oliviertassinari
- &#8203;<!-- 15 -->[docs] Fix modal transition demos (#36137) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Update links to pt examples (#36237) @Aleff13
- &#8203;<!-- 13 -->[docs] Update custom Typography variants example (#36185) @mj12albert
- &#8203;<!-- 12 -->[docs] Change markdown numbering syntax (#36187) @mj12albert
- &#8203;<!-- 11 -->[docs] Fix switch alignment in `Disabled tree items` section in Tree View docs (#36217) @PunitSoniME
- &#8203;<!-- 10 -->[docs] Standardize example names (#36112) @samuelsycamore
- &#8203;<!-- 09 -->[docs] Fix typo @oliviertassinari
- &#8203;<!-- 08 -->[docs] Fix markdown table alignments (#36136) @oliviertassinari
- &#8203;<!-- 07 -->[docs] Small color tweaks to the docs search bar (#36160) @danilo-leal
- &#8203;<!-- 06 -->[docs][joy] Update class name prefixes in the `Anatomy` section (#36210) @ZeeshanTamboli

### Core

- &#8203;<!-- 19 -->[core] Migrate nprogress to emotion (#36181) @siriwatknp
- &#8203;<!-- 18 -->[core] Enforce namespace import for ReactDOM (#36208) @mj12albert
- &#8203;<!-- 17 -->[core] Fix deploy preview links (#36203) @siriwatknp

All contributors of this release in alphabetical order: @Aleff13, @dani-mp, @danilo-leal, @hbjORbj, @mj12albert, @oliviertassinari, @PunitSoniME, @sai6855, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 5.11.9

<!-- generated comparing v5.11.8..master -->

_Feb 14, 2023_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 🐛 @rangoo94, @sai6855, and @michaldudak fixed a couple of bugs in the Autocomplete component (#36116, #35640, #36076, #36088)
- many other 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.11.9`

- [AppBar] Fix joinVars() not handling undefined (#36128) @donaldnevermore
- [Autocomplete] Fix tag removal regression (#36116) @michaldudak
- [Autocomplete] Correct padding of filled Autocomplete (#35640) @michaldudak
- [Grid][Stack] classNames prefixed with Mui (#36167) @sai6855

### `@mui/styled-engine@5.11.9`

- [StyledEngineProvider] Fix issue with cache not being defined (#36162) @mnajdova

### `@mui/joy@5.0.0-alpha.67`

- [Joy] Add order dashboard template (#36081) @siriwatknp
- [Joy] Remove classes prop from the components that have it (#36159) @hbjORbj
- [Joy] Miscellaneous fixes (#36163) @siriwatknp

### `@mui/base@5.0.0-alpha.118`

- [base] Override the types of `slotProps` per slot (#35964) @hbjORbj
- [Select][base] Prevent unnecessary rerendering of Select options (#35946) @michaldudak
- [Select][base] Update the generated docs (#36183) @michaldudak
- [useAutocomplete] Pass only valid values for the getOptionLabel prop (#36088) @rangoo94
- [useAutocomplete] Fix `useAutocomplete` disabled prop not disabling the input (#36076) @sai6855
- [useInput] Add return value interface (#36036) @Shorifpatwary
- [UseTabPanel] Add explicit return type (#36053) @Shorifpatwary
- [useTabsList] Add explicit return type (#36048) @sai6855
- [Tab] Add explicit return type to useTab (#36046) @sai6855

### `@mui/material-next@6.0.0-alpha.75`

- [Material You] Use `md` as a CSS var prefix (#36177) @siriwatknp

### Docs

- [docs] Fix the prop type regression on the API pages (#36168) @mnajdova
- [docs] Fix virtualized table column resizing (#36066) @petyosi
- [docs] Fix react-spring demos (#36023) @oliviertassinari
- [docs] Fix classname mismatch on Joy docs (#36127) @siriwatknp
- [docs] Fix typo in the released version of @mui/styled-engine (#36121) @m4theushw
- [docs] Fix demos showing TypeScript instead of JavaScript (#35850) @mj12albert
- [docs] Update release instructions (#36113) @mj12albert
- [docs] Rename `v6-alpha` to `v6-next` in navigation (#36102) @LukasTy
- [docs] Revise Joy UI "Input" page (#35970) @LadyBluenotes
- [docs] Revise Joy UI "Typography" page (#35868) @LadyBluenotes

### Examples

- [examples][vitejs] Load Roboto font (#35678) @oliv37

### Core

- [blog] Fix the look and feel of the media description (#36069) @oliviertassinari
- [core] Add default preview url (#36118) @siriwatknp
- [core] Migrate all the internals exported by `tests/utils/index.js` to TypeScript (#35382) @flaviendelangle
- [core] Convert the waterfall module to an internal package (#35323) @michaldudak
- [website] Fix homepage MD theme demo (#36027) @oliviertassinari
- [website] Revise the Lead Designer role job ad (#35912) @danilo-leal
- [POC] Add deploy preview to PR body (#35995) @siriwatknp

All contributors of this release in alphabetical order: @danilo-leal, @donaldnevermore, @flaviendelangle, @hbjORbj, @LadyBluenotes, @LukasTy, @m4theushw, @michaldudak, @mj12albert, @mnajdova, @oliv37, @oliviertassinari, @petyosi, @rangoo94, @sai6855, @Shorifpatwary, @siriwatknp

## 5.11.8

<!-- generated comparing v5.11.7..master -->

_Feb 7, 2023_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- @siriwatknp added a new [`Sign In` template](https://mui.com/joy-ui/getting-started/templates/sign-in-side/) to Joy UI (#36019)
- 📚 Documentation improvements and 🐛 bug fixes as usual

### `@mui/material@5.11.8`

- &#8203;<!-- 10 -->[FormLabel] Export `FormLabelOwnProps` from `FormLabel` to fix type error (#36057) @yoskeoka

### `@mui/joy@5.0.0-alpha.66`

- &#8203;<!-- 09 -->[Joy] Miscellaneous fixes (#36073) @siriwatknp
- &#8203;<!-- 08 -->[Joy] Add sign-in side template (#36019) @siriwatknp
- &#8203;<!-- 07 -->[Joy] Add missing `Table` export from root (#36010) @sai6855

### `@mui/system@5.11.8`

- &#8203;<!-- 05 -->[System] Fix nested grid v2 (#35994) @siriwatknp

### `@mui/styled-engine@5.11.8`

- &#8203;<!-- 06 -->[styled-engine] Create cache only if `document` is available (#36001) @m4theushw

### Docs

- &#8203;<!-- 23 -->[blog] Fix dark mode support (#35969) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Add banner pointing to "Whats new" in MUI X page (#36074) @joserodolfofreitas
- &#8203;<!-- 18 -->[docs] Revert unintended change @oliviertassinari
- &#8203;<!-- 17 -->[docs] [Joy] Fixed a typo in `customizing theme tokens` (#36067) @badalsaibo
- &#8203;<!-- 16 -->[docs] Improve inline preview's information (#35974) @oliviertassinari
- &#8203;<!-- 15 -->[docs] Fix wrong v5 migration instructions (#36022) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Fix autocomplete render group key warning in the demo (#36025) @chuanyu0201
- &#8203;<!-- 13 -->[docs] Add hooks API pages for Base UI (#35828) @mnajdova
- &#8203;<!-- 12 -->[docs] Fix grammar typo (#36016) @alexownejazayeri
- &#8203;<!-- 11 -->[docs][joy] Add JSDoc for the `AutocompleteProps` type (#36039) @ArthurPedroti

### Core

- &#8203;<!-- 22 -->[core] Make it easier to find who is importing specific files (#35896) @oliviertassinari
- &#8203;<!-- 21 -->[core] Fix SEO redirections issues (#36041) @oliviertassinari
- &#8203;<!-- 20 -->[core] Fix a typo in the comment in setup test files (#36014) @ZeeshanTamboli
- &#8203;<!-- 04 -->[typescript] Explicitly define the component return types (#36013) @michaldudak
- &#8203;<!-- 03 -->[website] Fix layout shift (#36070) @oliviertassinari
- &#8203;<!-- 02 -->[website] Revise the Lead Designer role job ad (v1) (#36068) @oliviertassinari
- &#8203;<!-- 01 -->[website] Add Albert to the about page (#35954) @mj12albert

All contributors of this release in alphabetical order: @alexownejazayeri, @ArthurPedroti, @badalsaibo, @chuanyu0201, @joserodolfofreitas, @m4theushw, @michaldudak, @mj12albert, @mnajdova, @oliviertassinari, @sai6855, @siriwatknp, @yoskeoka, @ZeeshanTamboli

## 5.11.7

<!-- generated comparing v5.11.6..master -->

_Jan 31, 2023_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- @siriwatknp added `Table` component to Joy UI (#35872)
- many other 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.11.7`

- &#8203;<!-- 30 -->[Autocomplete] Prevent reset scroll position when new options are added (#35735) @sai6855
- &#8203;<!-- 24 -->[CssVarsProvider] Skip `unstable_sxConfig` variables (#35932) @siriwatknp
- &#8203;<!-- 10 -->[InputLabel] Add missing `component` type (#35852) @sai6855
- &#8203;<!-- 05 -->[Tooltip] Fix tooltip position (#35909) @marktoman

### `@mui/base@5.0.0-alpha.116`

- &#8203;<!-- 29 -->[ListboxUnstyled] Fix option state highlighted to prevent unnecessary focus (#35838) @SaidMarar

### `@mui/joy@5.0.0-alpha.65`

#### Breaking changes

- &#8203;<!-- 05 -->[Joy] Replace `Joy[Component]` classname with `Mui[Component]` classname for all slots of components (#35718) @hbjORbj

  - Renames the classname prefix of all Joy UI components from `'Joy'` to `'Mui'`.

  ```diff
   <Button
  -sx={{ '& .JoyButton-root': { '& .JoyButton-button': {} } }}
  +sx={{ '& .MuiButton-root': { '& .MuiButton-button': {} } }}
   />
  ```

  You can use this [codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#joy-rename-classname-prefix) to help with the migration.

- &#8203;<!-- 04 -->[Joy] Replace `row` prop with `orientation` prop in all Joy UI components (#35721) @hbjORbj

  - Transforms `row` prop to `orientation` prop across `Card`, `List` and `RadioGroup` components in Joy UI.

  ```diff
   <Card
  -row
  +orientation={"horizontal"}
   />
  ```

  You can use this [codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#joy-rename-row-prop) to help with the migration.

#### Changes

- &#8203;<!-- 26 -->[Joy][Checkbox] Display correct icon in checkbox (#35943) @sai6855
- &#8203;<!-- 09 -->[Joy] Add `Table` component (#35872) @siriwatknp
- &#8203;<!-- 08 -->[Joy] Miscellaneous fixes (#35953) @siriwatknp

### Docs

- &#8203;<!-- 28 -->[blog] Add RSS feed (#35777) @gorjiali
- &#8203;<!-- 27 -->[blog] Prevent horizontal scroll on blog posts (#35948) @oliviertassinari
- &#8203;<!-- 23 -->[docs] Add to codemod README about an added script (#35999) @hbjORbj
- &#8203;<!-- 22 -->[docs] Add a warning about to clear the local storage when `defaultMode` changes (#35937) @ArthurPedroti
- &#8203;<!-- 21 -->[docs] Fix Joy UI variables playground (#35950) @siriwatknp
- &#8203;<!-- 20 -->[docs] Fix typos in base components docs (#35985) @HeVictor
- &#8203;<!-- 19 -->[docs] Fix event's label reported to GA (#35930) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Standardize "no longer" / "not documented" callouts in Material UI docs (#35957) @samuelsycamore
- &#8203;<!-- 17 -->[docs] Revise and expand Joy UI Checkbox doc (#35817) @samuelsycamore
- &#8203;<!-- 16 -->[docs] Add docs notification to Date and Time Pickers revamped (#35935) @joserodolfofreitas
- &#8203;<!-- 15 -->[docs] Update community theme builder to forked updated one (#35928) @idebeijer
- &#8203;<!-- 14 -->[docs] Add Joy default theme viewer (#35554) @siriwatknp
- &#8203;<!-- 13 -->[docs][joy] Fixed a typo in `Using icon libraries` page (#35989) @badalsaibo
- &#8203;<!-- 12 -->[docs][joy] Removed Badge info from Chip docs (#35955) @Vivek-Prajapatii
- &#8203;<!-- 11 -->[docs][system] Fix border color of Boxes in demos of `Configure the sx prop` page in dark mode (#35961) @ZeeshanTamboli

### Core

- &#8203;<!-- 25 -->[core] Boolean props always have a default value of `false` in API docs (#35913) @hbjORbj
- &#8203;<!-- 04 -->[core] Improve types for usePreviousProps (#35833) @sai6855
- &#8203;<!-- 03 -->[website] Fix 404 link to store (#35973) @oliviertassinari
- &#8203;<!-- 02 -->[website] Fix 302 of diamond sponsor link @oliviertassinari
- &#8203;<!-- 01 -->[website] Fix outdated YouTube link @oliviertassinari

All contributors of this release in alphabetical order: @ArthurPedroti, @badalsaibo, @gorjiali, @hbjORbj, @HeVictor, @idebeijer, @joserodolfofreitas, @marktoman, @oliviertassinari, @sai6855, @SaidMarar, @samuelsycamore, @siriwatknp, @Vivek-Prajapatii, @ZeeshanTamboli

## 5.11.6

<!-- generated comparing v5.11.5..master -->

_Jan 23, 2023_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

- @ZeeshanTamboli improved the logic for handling the value label in the `SliderUnstyled` (#35805)
- many other 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.11.6`

- &#8203;<!-- 15 -->[Box] Fix usage of not supported features in TypeScript 3.5 (#35877) @mnajdova
- &#8203;<!-- 14 -->[Button] Fix border color for secondary disabled button (#35866) @SaidMarar
- &#8203;<!-- 03 -->[SwipeableDrawer] Add callback to customise touchstart ignore for swipeable drawer (#30759) @tech-meppem

### `@mui/base@5.0.0-alpha.115`

#### Breaking changes

- &#8203;<!-- 04 -->[SliderUnstyled] Improved logic for displaying the value label (#35805) @ZeeshanTamboli

  - The `valueLabelDisplay` prop is removed from `SliderUnstyled`. The prop was not working as intended in `SliderUnstyled` (See #35398). You can instead provide a `valueLabel` slot with the `slots` prop API to show the value label:

  ```diff
  - <SliderUnstyled valueLabelDisplay="on" />
  + <SliderUnstyled slots={{ valueLabel: SliderValueLabel }} />
  ```

  The following demo shows how to show a value label when it is hovered over with the thumb: https://mui.com/base-ui/react-slider/#value-label

  - The following classes are removed from `sliderUnstyledClasses` since they are not needed for the value label:

  ```diff
  - valueLabel
  - valueLabelOpen
  - valueLabelCircle
  - valueLabelLabel
  ```

  In the custom value label component, you can define your own classNames and target them with CSS.

  - The `SliderValueLabelUnstyled` component is removed from SliderUnstyled. You should provide your own custom component for the value label.

  - To avoid using `React.cloneElement` API in value label, the component hierarchy structure of the value label is changed. The value label is now inside the Thumb slot - `Thumb` -> `Input`, `ValueLabel`.

#### Changes

- &#8203;<!-- 05 -->[InputUnstyled] Fix externally provided `inputRef` is ignored (#35807) @sai6855

### `@mui/joy@5.0.0-alpha.64`

- &#8203;<!-- 17 -->[Avatar][joy] Remove `imgProps` prop and add Codemod script for migration (#35859) @hbjORbj

### Docs

- &#8203;<!-- 16 -->[blog] Date and time pickers revamped (#35486) @joserodolfofreitas
- &#8203;<!-- 10 -->[docs] Fix incorrect breakpoint use (#34948) @rosita-dmello
- &#8203;<!-- 09 -->[docs] Replace react-virtualized with react-virtuoso in Table (#35700) @petyosi
- &#8203;<!-- 08 -->[docs] Fix account menu demo not closing with keyboard. (#35870) @mj12albert
- &#8203;<!-- 07 -->[docs] Fix typos in the docs of Joy UI (#35876) @HeVictor
- &#8203;<!-- 06 -->[docs] Fix wording in `Color` page (#35873) @oliv37

### Core

- &#8203;<!-- 13 -->[core] Fix release changelog to handle commits with empty author field (#35921) @mnajdova
- &#8203;<!-- 12 -->[core] Revert `docs-utilities` migration to TypeScript and fix type (#35881) @ZeeshanTamboli
- &#8203;<!-- 11 -->[core] Migrate internal `docs-utilities` package to TypeScript (#35846) @ZeeshanTamboli
- &#8203;<!-- 02 -->[website] Designer don't spend their time writing code @oliviertassinari
- &#8203;<!-- 01 -->[website] Emphasis the technical background need for this role @oliviertassinari

All contributors of this release in alphabetical order: @HeVictor, @hbjORbj, @joserodolfofreitas, @mj12albert, @mnajdova, @oliv37, @oliviertassinari, @petyosi, @rosita-dmello, @sai6855, @SaidMarar, @tech-meppem, @ZeeshanTamboli

## 5.11.5

<!-- generated comparing v5.11.4..master -->

_Jan 17, 2023_

A big thanks to the 17 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.5`

- [Material UI] Custom channel token should suppress the warning (#35804) @siriwatknp
- [Autocomplete] Fix value type when `strictNullChecks` is `false` (#35367) @fenghan34
- [Slider] Replace `SliderUnstyled` with `useSlider` hook (#35770) @ZeeshanTamboli
- [l10n] Add Belarusian translation (#35742) @volhalink

### `@mui/system@5.11.5`

- [system] Improve the `createBox` types (#35532) @mnajdova

### `@mui/codemod@5.11.5`

- Add `joy-text-field-to-input` codemod (#35462) @hbjORbj

### `@mui/base@5.0.0-alpha.114`

- [base] Fix typos (#35802) @nnmax
- [Slider] Convert code to TypeScript (#35445) @sai6855

### `@mui/joy@5.0.0-alpha.63`

- [Tabs][joy] Don't apply `:hover, :active` styles when `selected` (#35750) @sai6855
- Remove `TextField` component and replace its usage in docs with `FormControl`/`FormLabel`/`Input` (#35462) @hbjORbj
- [TextField] Throw error with migration message (#35845) @siriwatknp
- Miscellaneous fixes (#35847) @siriwatknp

### Docs

- [docs] Improve pickers lab migration stressing `mui-x` usage (#35740) @LukasTy
- [docs] Fix incorrectly named AccessibleTable demo component (#35832) @HeVictor
- [docs] Clarify where to find docs for Base UI components in Material UI (#35799) @samuelsycamore
- [docs] Fix typos (#35814) @alexfauquette
- [docs] Revise and expand the Joy UI Card page (#35745) @samuelsycamore
- [docs] Fix navigation layout shift (#35679) @oliviertassinari
- [docs] Fix typo in the Composition page (#35774) @msoyka
- [docs][joy] Update Customization section code example to use the correct API (#35765) @pupudu
- [docs][joy] Fix grammar in `Typography` docs (#35796) @atrefonas
- [examples] Remove `next-env.d.ts` from Next.js examples (#35772) @Juneezee

### Core

- [website] Improve pricing page (#35767) @oliviertassinari
- [website] Add Greg in about page (#35816) @oliviertassinari
- [website] Update the Accessibility Engineer role (#35751) @oliviertassinari
- [website] Add docs for MUI for Figma @oliviertassinari

All contributors of this release in alphabetical order: @alexfauquette, @atrefonas, @fenghan34, @hbjORbj, @HeVictor, @Juneezee, @LukasTy, @mnajdova, @msoyka, @nnmax, @oliviertassinari, @pupudu, @sai6855, @samuelsycamore, @siriwatknp, @volhalink, @ZeeshanTamboli

## 5.11.4

<!-- generated comparing v5.11.3..master -->

_Jan 9, 2023_

A big thanks to the 14 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.4`

- [Autocomplete] Add index to renderOption's AutocompleteRenderOptionState (#35578) @CowDotDev
- [Autocomplete] Fix grammar in console.error in `useAutocomplete` (#35723) @hamirmahal
- [Modal] Fix can't override Backdrop Props using new Slots API (#35140) @ZeeshanTamboli
- [Select] Revert "Update `renderValue` prop's TypeScript type (#34177)" (#35733) @michaldudak
- [Tabs] Throw error only if individual `Tab` is hidden, not the whole `Tabs` (#34026) @Ryczko
- [TextField] Improve WCAG 2.4.7 with error={true} (#35687) @oliviertassinari
- [Tooltip] Remove `data-foo` attribute (#35736) @koolskateguy89

### `@mui/joy@5.0.0-alpha.62`

- [Autocomplete][joy] Specify `type` attribute for popup indicator (#35648) @hbjORbj
- [Joy] Miscellaneous improvements (#35769) @siriwatknp
- [Joy] Improve `onKeyDown` event handler for demo (#35642) @hbjORbj

### `@mui/base@5.0.0-alpha.113`

- [Portal][base] Convert code to TypeScript (#35657) @sai6855

### Docs

- [docs] Revise and expand Joy UI Button doc (#35737) @samuelsycamore
- [docs] Document the workaround for crashing a translated page (#35720) @michaldudak
- [docs] Fix API page for `MenuItem` to list all valid props (#35561) @mnajdova
- [docs] Fix ad exception in Joy UI (#35685) @oliviertassinari
- [docs] Fix content wider than screen regression @oliviertassinari
- [examples] Add `Vite.js with TypeScript` example (#35683) @miha53cevic

### Core

- [core] Close 2022 developer survey @oliviertassinari
- [core] Fix the product license reference name (#35703) @oliviertassinari
- [core] Use TypeScript AST instead of TTP for component doc building (#35379) @flaviendelangle
- [test] Always use & for nesting styles (#35702) @oliviertassinari
- [website] Improve Lead Designer role description (#35684) @oliviertassinari

All contributors of this release in alphabetical order: @CowDotDev, @flaviendelangle, @hamirmahal, @hbjORbj, @koolskateguy89, @michaldudak, @miha53cevic, @mnajdova, @oliviertassinari, @Ryczko, @sai6855, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 5.11.3

<!-- generated comparing v5.11.2..master -->

_Jan 2, 2023_

A big thanks to the 6 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.11.3`

- &#8203;<!-- 02 -->[Select] Update `renderValue` prop's TypeScript type (#34177) @ZeeshanTamboli

### `@mui/joy@5.0.0-alpha.61`

- &#8203;<!-- 14 -->[Autocomplete][joy] Export component (#35647) @mbranch

### Docs

- &#8203;<!-- 13 -->[blog] Fix handling of markdown links (#35628) @oliviertassinari
- &#8203;<!-- 09 -->[docs] Fix demo code selection through copy shortcut key on Firefox browser (#35670) @ZeeshanTamboli
- &#8203;<!-- 08 -->[docs] Fix layout shift when streaming the page (#35627) @oliviertassinari
- &#8203;<!-- 07 -->[docs] Fix switch name to reflect the color (#35052) @rjhcnf
- &#8203;<!-- 06 -->[docs] Fix anchor link in the card's docs and fix a typo (#35634) @ZeeshanTamboli
- &#8203;<!-- 05 -->[docs] Fix layout shift with modal (#35591) @oliviertassinari
- &#8203;<!-- 04 -->[Joy][docs] Add documentation for `Input` component (#35482) @hbjORbj
- &#8203;<!-- 03 -->[docs][joy] Improved readability on theme tokens page (#35639) @badalsaibo

### Core

- &#8203;<!-- 12 -->[core] Disable prefetch of footer links @oliviertassinari
- &#8203;<!-- 11 -->[core] A few SEO fixes (#35672) @oliviertassinari
- &#8203;<!-- 10 -->[core] Remove need for scopePathnames (#35584) @oliviertassinari
- &#8203;<!-- 01 -->[test] Fix Algolia noisy lvl1 anchor (#35686) @oliviertassinari

All contributors of this release in alphabetical order: @badalsaibo, @hbjORbj, @mbranch, @oliviertassinari, @rjhcnf, @ZeeshanTamboli

## 5.11.2

<!-- generated comparing v5.11.1..master -->

_Dec 26, 2022_

A big thanks to the 20 contributors who made this release possible. Here are some highlights ✨:

- ⚙️ Several Base UI components were converted to TypeScript by @trizotti, @leventdeniz and @danhuynhdev (#35005, #34793, #34771)
- Many other 🐛 bug fixes abd 📚 documentation improvements.

### `@mui/material@5.11.2`

- &#8203;<!-- 10 -->[l10n] Add displayed rows label to `faIR` locale (#35587) @hootan-rocky
- &#8203;<!-- 09 -->[l10n] Add Kurdish (Kurmanji) locale (#32508) @JagarYousef
- &#8203;<!-- 06 -->[Select] Accept non-component children (#33530) @boutahlilsoufiane
- &#8203;<!-- 05 -->[SelectInput] Update menu to use select wrapper as anchor (#34229) @EduardoSCosta
- &#8203;<!-- 03 -->[TableCell] Fix `scope` prop to be not set when a data cell is rendered within a table head (#35559) @sai6855

### `@mui/utils@5.11.2`

- &#8203;<!-- 02 -->[utils] `mergedeep` deeply clones source key if it's an object (#35364) @sldk-yuri

### `@mui/base@5.0.0-alpha.112`

- &#8203;<!-- 16 -->[FocusTrap][base] Convert code to TypeScript (#35005) @trizotti
- &#8203;<!-- 08 -->[Modal][base] Convert code to TypeScript (#34793) @leventdeniz
- &#8203;<!-- 07 -->[Popper][base] Convert code to TypeScript (#34771) @danhuynhdev
- &#8203;<!-- 04 -->[Slider] Exclude `isRtl` from Material UI's Slider props (#35564) @michaldudak

### `@mui/joy@5.0.0-alpha.60`

- &#8203;<!-- 15 -->[Joy] Fix radius adjustment (#35629) @siriwatknp
- &#8203;<!-- 14 -->[Joy] Apply color inversion to components (#34602) @siriwatknp
- &#8203;<!-- 13 -->[Joy] Improve cursor pointer and add fallback for outlined variant (#35573) @siriwatknp
- &#8203;<!-- 12 -->[Joy] Miscellaneous fixes (#35552) @siriwatknp
- &#8203;<!-- 11 -->[Radio][joy] Use precise dimensions for radio icon (#35548) @hbjORbj

### `@mui/material-next@6.0.0-alpha.68`

- &#8203;<!-- 36 -->[Material You] Update Button test & add active class name (#35497) @mnajdova

### Docs

- &#8203;<!-- 35 -->[docs] Fix GoogleMaps demo (#35545) @hbjORbj
- &#8203;<!-- 25 -->[docs] Remove flow, its legacy (#35624) @oliviertassinari
- &#8203;<!-- 24 -->[docs] Add a guide on using icon libraries with Joy UI (#35377) @siriwatknp
- &#8203;<!-- 23 -->[docs] Clarify comment about `sortStability()` use case (#35570) @frontendlane
- &#8203;<!-- 22 -->[docs] Improve the experimental API demos on the button page (#35560) @mnajdova
- &#8203;<!-- 21 -->[docs] Force `light` theme mode when `activePage` is null (#35575) @LukasTy
- &#8203;<!-- 20 -->[docs] Fix ListItem button deprecated use (#33970) @MickaelAustoni
- &#8203;<!-- 19 -->[docs] Fix typo in `Progress` docs (#35553) @jasonsturges
- &#8203;<!-- 18 -->[docs] Remove empty tags on the TransferList demos (#33127) @ekusiadadus
- &#8203;<!-- 17 -->[docs][joy] Add documentation for `Stack` component (#35373) @hbjORbj
- &#8203;<!-- 35 -->[docs][joy] Add documentation for `Grid` component (#35374) @hbjORbj
- &#8203;<!-- 01 -->[website] Update sponsor grid (#35452) @danilo-leal

### Core

- &#8203;<!-- 34 -->[core] Shorthand notation to remove outline (#35623) @oliviertassinari
- &#8203;<!-- 33 -->[core] Fix header link layout shift and clash (#35626) @oliviertassinari
- &#8203;<!-- 32 -->[core] Hide keyboard shortcut if no hover feature (#35625) @oliviertassinari
- &#8203;<!-- 31 -->[core] Fix confusing duplicated name in the log @oliviertassinari
- &#8203;<!-- 30 -->[core] Fix API demos callout spacing (#35579) @oliviertassinari
- &#8203;<!-- 29 -->[core] Fix a few title case (#35547) @oliviertassinari
- &#8203;<!-- 28 -->[core] Cleanup mention of test-utils (#35577) @oliviertassinari
- &#8203;<!-- 27 -->[core] Remove oudated pickers prop-type logic (#35571) @oliviertassinari
- &#8203;<!-- 26 -->[core] Exclude documentation of Base props not used in styled libraries (#35562) @michaldudak

All contributors of this release in alphabetical order: @boutahlilsoufiane, @danhuynhdev, @danilo-leal, @EduardoSCosta, @ekusiadadus, @frontendlane, @hbjORbj, @hootan-rocky, @JagarYousef, @jasonsturges, @leventdeniz, @LukasTy, @michaldudak, @MickaelAustoni, @mnajdova, @oliviertassinari, @sai6855, @siriwatknp, @sldk-yuri, @trizotti

## 5.11.1

<!-- generated comparing v5.11.0..master -->

_Dec 20, 2022_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 💅 @mnajdova added motion and shape design tokens to Material You package (#35384 and #35393).
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.11.1`

- [Chip] Fix hover and focus style with CSS Variables (#35502) @DimaAbr
- [InputLabel] Enable `size` prop overrides via TypeScript module augmentation (#35460) @MickaelAustoni
- [l10n] Change Kazakh locale name to match ISO-639-1 codes (#34664) @talgautb
- [TextField] Fix error focus style (#35167) @42tte
- [core] Bring `experimental_sx` back with error code (#35528) @siriwatknp

### `@mui/utils@5.11.1`

- [Theme] Merge components and slots props (#35477) @siriwatknp

### `@mui/material-next@6.0.0-alpha.67`

- [Material You] Add motion design tokens (#35384) @mnajdova
- [Material You] Add shape design tokens (#35393) @mnajdova

### `@mui/joy@5.0.0-alpha.59`

- [Tooltip] Fix arrow does not appear (#35473) @siriwatknp
- [Input] Fix autofill styles (#35056) @siriwatknp
- [ChipDelete] Add onDelete prop to ChipDelete (#35412) @sai6855

### `@mui/base@5.0.0-alpha.111`

- [Button][base] Set active class when a subcomponent is clicked (#35410) @michaldudak
- [Popper][base] Fix Tooltip Anchor Element Setter (#35469) @sydneyjodon-wk

### Docs

- [docs] Fixed the `Select` component `onChange` event type in the migration guide (#35509) @tzynwang
- [docs] Add missing comma to `Providing the colors directly` section (#35507) @cassidoo
- [docs] Add `CardMedia` example without `component="img"` prop (#35470) @lucasmfredmark
- [docs] Fix `unstable_sxConfig` typo (#35478) @siriwatknp
- [docs] List component introduction example default code is missing ListItemContent component (#35492) @Miigaarino
- [website] Close our first people role @oliviertassinari
- [website] Update product icons (#35413) @danilo-leal

### Core

- [test] Terminate BrowserStack after 5 minutes (#35454) @oliviertassinari
- [test] Fix broken master branch (#35446) @oliviertassinari

All contributors of this release in alphabetical order: @42tte, @cassidoo, @danilo-leal, @DimaAbr, @lucasmfredmark, @michaldudak, @MickaelAustoni, @Miigaarino, @mnajdova, @oliviertassinari, @sai6855, @siriwatknp, @sydneyjodon-wk, @talgautb, @tzynwang

## 5.11.0

<!-- generated comparing v5.10.17..master -->

_Dec 13, 2022_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- 🔥 @mnajdova enabled configuration of the `sx` prop in the `theme` (#35150)
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.11.0`

- [Alert] Update icon color in all variants (#35414) @danilo-leal
- [Select] Fix `MenuProps.PopoverClasses` being overriden (#35394) @vitorfrs-dev
- [SwipeableDrawer] Fixed typescript warning "prop open undefined" (#34710) @kraftware

### `@mui/icons-material@5.11.0`

- [icons] Restore the PhoneInTalk icons (#35409) @michaldudak

### `@mui/system@5.11.0`

#### BREAKING CHANGES

- [system] Enable configuring the `sx` prop in the `theme` (#35150) @mnajdova

  The breaking change is regarding an experimental API:

  ```diff
  -import { styled, experimental_sx } from '@mui/material/styles';
  +import { styled } from '@mui/material/styles';

  -const Component = styled('div)(experimental_sx({ p: 1 }});
  +const Component = styled('div)(({ theme }) => theme.unstable_sx({ p: 1 }});
  ```

### `@mui/joy@5.0.0-alpha.58`

- [Joy] Miscellaneous fixes (#35447) @siriwatknp

### `@mui/base@5.0.0-alpha.110`

- [PopperUnstyled] Update PopperTooltip to have correct width when closing with transition (#34714) @EduardoSCosta

### `@mui/material-next@6.0.0-alpha.66`

- [Material You] Add ripple on the button (#35299) @mnajdova

### Docs

- [docs] Simplify state management in Text Field demo page (#35051) @PratikDev
- [docs] Improve `Responsive App bar with Drawer` demo (#35418) @ZeeshanTamboli
- [docs] Improve line-height readability (#35387) @oliviertassinari
- [docs] Improve a bit the Composition docs (#35329) @oliviertassinari
- [docs] Refactor `ToggleButtonSizes` demo (#35375) @Armanio
- [docs] Standardize the usage of callouts in the MUI Core docs (#35361) @samuelsycamore
- [docs] Format feedback to add a link to the commented section (#35381) @alexfauquette
- [docs] Direct users from Material UI to Base UI for duplicated components (#35293) @samuelsycamore
- [docs] Fix typo in FormControl API docs (#35449) @Spanishiwa
- [docs] Update callouts design (#35390) @danilo-leal
- [website] New wave of open roles (#35240) @mnajdova
- [website] Developer survey 2022 (#35407) @joserodolfofreitas

### Core

- [core] Fix @mui/material package building (#35324) @timbset
- [core] Fix leaking theme color override (#35444) @oliviertassinari
- [typescript] Add null to return type of OverridableComponent (#35311) @tsollbach
- [website] Migrate X page to use CSS theme variables (#34922) @jesrodri
- [website] Migrate `/core` page to use CSS variables (#35366) @siriwatknp

All contributors of this release in alphabetical order: @alexfauquette, @Armanio, @danilo-leal, @EduardoSCosta, @flaviendelangle, @jesrodri, @joserodolfofreitas, @kraftware, @michaldudak, @mnajdova, @oliviertassinari, @PratikDev, @samuelsycamore, @siriwatknp, @Spanishiwa, @timbset, @tsollbach, @vitorfrs-dev, @ZeeshanTamboli

## 5.10.17

<!-- generated comparing v5.10.16..master -->

_Dec 6, 2022_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- ✨ @mnajdova added a [Material You Button playground](https://mui.com/material-ui/react-button/#material-you-version) (#35222)
- 🔧 @hbjORbj renamed `components` / `componentProps` to `slots` / `slotProps` prop in Joy UI to create consistency across products (#34997)
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.10.17`

- &#8203;<!-- 31 -->[Slider] Fix `markActive` theme class not getting applied (#35067) @ZeeshanTamboli
- &#8203;<!-- 30 -->[SwipeableDrawer] Fix missing close animation when initial open is true (#35010) @sai6855
- &#8203;<!-- 28 -->[material-ui] Add channel colors if possible (#35178) @siriwatknp
- &#8203;<!-- 10 -->[Fab] Increase disabled styles precedence (#35304) @Uzwername
- &#8203;<!-- 05 -->[Rating] Apply `labelEmptyValueActive` style overrides from theme (#35315) @sai6855

### `@mui/system@5.10.17`

- &#8203;<!-- 04 -->[system] Add support for nested CssVarsProvider (#35277) @siriwatknp

### `@mui/joy@5.0.0-alpha.57`

#### BREAKING CHANGE

- &#8203;<!-- 08 -->[Joy] Add `slots`/`slotProps` props to the typing of all components and apply `useSlot` to all components (#34997) @hbjORbj

  - Change all occurrences of `components` and `componentsProps` props in Joy UI components to `slots` and `slotProps`, respectively.

  ```diff
  -<Autocomplete components={{listbox: CustomListbox}} componentsProps={{listbox: { className: 'custom-listbox' }}} />
  +<Autocomplete slots={{listbox: CustomListbox}} slotProps={{listbox: { className: 'custom-listbox' }}} />
  ```

  You can use this [codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#joy-rename-components-to-slots) to help with the migration.

#### Changes

- &#8203;<!-- 07 -->[Joy] Miscellaneous fixes (#35345) @siriwatknp
- &#8203;<!-- 06 -->[Joy][textarea] Expose decorator classes (#35247) @zignis

### Docs

- &#8203;<!-- 29 -->[docs] Improve spacing with ul (#35302) @oliviertassinari
- &#8203;<!-- 23 -->[docs] Correct grammatically incorrect sentences in CONTRIBUTING.md (#34949) @Pandey-utkarsh
- &#8203;<!-- 22 -->[docs] Move the demo higher in the API TOC (#35202) @oliviertassinari
- &#8203;<!-- 21 -->[docs] Fix incorrect link in minimizing-bundle-size (#35297) @Juneezee
- &#8203;<!-- 20 -->[docs] Revise and expand Joy UI "Breadcrumbs" page (#35292) @samuelsycamore
- &#8203;<!-- 19 -->[docs] Fix wrong import in the unstyled tabs page (#35310) @guotie
- &#8203;<!-- 18 -->[docs] Disable translations (#34820) @mnajdova
- &#8203;<!-- 17 -->[docs] Fix typo (#35312) @flaviendelangle
- &#8203;<!-- 16 -->[docs] Add Material You Button playground (#35222) @mnajdova
- &#8203;<!-- 15 -->[docs] Fix experimental API page duplication (#35213) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Improve the autogenerated "Unstyled" and "API" text (#35185) @samuelsycamore
- &#8203;<!-- 13 -->[docs] Fix ad margin on API pages (#35201) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Revise and expand the Joy UI "Badge" page (#35199) @samuelsycamore
- &#8203;<!-- 11 -->[docs] Update Base UI docs with latest style conventions (#35034) @samuelsycamore
- &#8203;<!-- 09 -->[l10n] Improve Chinese (Taiwan) zh-TW locale (#35328) @happyincent
- &#8203;<!-- 02 -->[website] Update MUI stats: GitHub stars, Twitter followers, etc. (#35318) @nomandhoni-cs

### Core

- &#8203;<!-- 27 -->[core] Use componentStyles.name over componentName (#35303) @oliviertassinari
- &#8203;<!-- 26 -->[core] Fix warning leak in production (#35313) @oliviertassinari
- &#8203;<!-- 25 -->[core] Move the internal packages from docs/packages (#35305) @michaldudak
- &#8203;<!-- 24 -->[core] Clean up the API docs generation scripts (#35244) @michaldudak
- &#8203;<!-- 03 -->[test] Scope the tests to just Material UI components (#35219) @siriwatknp
- &#8203;<!-- 01 -->[website] Remove BlackFriday notification @oliviertassinari

All contributors of this release in alphabetical order: @flaviendelangle, @guotie, @happyincent, @hbjORbj, @Juneezee, @michaldudak, @mnajdova, @nomandhoni-cs, @oliviertassinari, @Pandey-utkarsh, @sai6855, @samuelsycamore, @siriwatknp, @Uzwername, @zignis

## 5.10.16

<!-- generated comparing v5.10.15..master -->

_Nov 28, 2022_

A big thanks to the 13 contributors who made this release possible. This release contains various 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.10.16`

- &#8203;<!-- 21 -->[Autocomplete] Fix inferred value type when `multiple` prop is `true` (#35275) @fenghan34
- &#8203;<!-- 19 -->[Chip] Add `skipFocusWhenDisabled` prop to not allow focussing deletable chip if disabled (#35065) @sai6855
- &#8203;<!-- 18 -->[Chip] Remove unnecessary handleKeyDown event handler (#35231) @ZeeshanTamboli
- &#8203;<!-- 05 -->[FormControl] Add missing types in `useFormControl` (#35168) @ZeeshanTamboli
- &#8203;<!-- 04 -->[IconButton] Add missing color classes (#33820) @Zetta56
- &#8203;<!-- 03 -->[SwipeableDrawer] Make paper ref accessible (#35082) @sai6855

### `@mui/system@5.10.16`

- &#8203;<!-- 02 -->[system] Remove unnecessary parsed theme (#35239) @siriwatknp
- &#8203;<!-- 01 -->[theme] Fix TypeScript type for custom variants in responsive font sizes (#35057) @ZeeshanTamboli

### `@mui/base@5.0.0-alpha.108`

- &#8203;<!-- 20 -->[Base] Allow useSlotProps to receive undefined elementType (#35192) @leventdeniz

### Docs

- &#8203;<!-- 13 -->[docs] Improve feedback precision (#34641) @alexfauquette
- &#8203;<!-- 12 -->[docs] Add Black Friday notification @oliviertassinari
- &#8203;<!-- 11 -->[docs] Fix migration feedback (#35232) @alexfauquette
- &#8203;<!-- 10 -->[docs] Improve the useSelect demo styling (#33883) @michaldudak
- &#8203;<!-- 09 -->[docs] Fix layout jump on first mistake (#35215) @oliviertassinari
- &#8203;<!-- 08 -->[docs] Support demos with side effect imports (#35177) @m4theushw
- &#8203;<!-- 07 -->[examples] Fix Next.js errors (#35246) @oliviertassinari
- &#8203;<!-- 06 -->[examples] Updated Remix examples with the lates changes using React 18 (#35092) @58bits

### Core

- &#8203;<!-- 17 -->[core] Remove unused pattern (#35165) @iamxukai
- &#8203;<!-- 16 -->[core] Fix Base version in changelog (#35224) @siriwatknp
- &#8203;<!-- 15 -->[core] Migrate `describeConformance` to TypeScript (#35193) @flaviendelangle
- &#8203;<!-- 14 -->[core] Skip CI for docs and examples paths (#35225) @siriwatknp

All contributors of this release in alphabetical order: @58bits, @alexfauquette, @fenghan34, @flaviendelangle, @iamxukai, @leventdeniz, @m4theushw, @michaldudak, @oliviertassinari, @sai6855, @siriwatknp, @ZeeshanTamboli, @Zetta56

## 5.10.15

<!-- generated comparing v5.10.14..master -->

_Nov 21, 2022_

A big thanks to the 9 contributors who made this release possible. Here are some highlights ✨:

- 🚀 @mnajdova added the button as the first component that implements [Material You](https://m3.material.io/) design (MD3)
- 🌐 @MBilalShafi added Urdu (Pakistan) localization
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.10.15`

- [Autocomplete] Fix keyboard navigation when using custom popover (#35160) @sai6855
- [typescript] Add `background.defaultChannel` to `CssVarsPalette` (#35174) @alexfauquette
- [l10n] Add Urdu (ur-PK) locale (#35154) @MBilalShafi

### `@mui/icons-material@5.10.15`

- [icons] Update the Material Design icons (#35194) @michaldudak

### `@mui/material-next@6.0.0-alpha.63`

- [Material You] Add theme structure & Button component (#34650) @mnajdova

### `@mui/base@5.0.0-alpha.107`

- [Select] Add attributes to conform with ARIA 1.2 (#35182) @michaldudak

### Docs

- [docs] Fix a couple documentation errors (#35217) @danilo-leal
- [docs] Change MUI -> Material UI in icons-material's readme (#35220) @michaldudak
- [docs] the pages have no <link rel=canonical so we need to tell Google to not index the staging envs @oliviertassinari
- [docs] Fix confusion in TOCs when reaching scroll bottom (#35214) @oliviertassinari
- [docs] Fix typos in section titles (#35025) @iamxukai
- [docs] Fix typo in legacy date picker migration guide @oliviertassinari
- [docs] Iterating on recent Joy UI Component page updates (#35162) @samuelsycamore
- [docs] Inform that pickers are in X repository (#35189) @alexfauquette
- [docs] Explain how the `error` prop works in the Unstyled Input (#35171) @michaldudak
- [docs] Hotfix missing styles in dark mode (#35179) @siriwatknp
- [docs] Add Joy UI theme typography page (#34811) @siriwatknp
- [docs] Fix undo/redo in live editor (#35163) @oliviertassinari
- [docs] Revise the Joy UI "Avatar" component page (#35152) @samuelsycamore
- [docs] Make navbar backdrop filter consistent with website (#35157) @danilo-leal
- [docs] Host CodeSandbox on MUI org (#35110) @oliviertassinari
- [docs] Uplift introduction demos & make consistent with Base (#34316) @danilo-leal
- [website] Add Security questionnaire in pricing (#35172) @oliviertassinari
- [website] Fix theme mode toggle state (#35216) @siriwatknp
- [website] Exclude experiment pages in production (#35180) @siriwatknp
- [website] Disable SEO for performance pages (#35173) @oliviertassinari

### Core

- [core] Convert icons scripts to ESM (#35101) @Janpot
- [core] Group renovate GitHub Action dependency updates @oliviertassinari
- [core] Upgrade eslint-config-airbnb-typescript (#34642) @Janpot
- [core] Ensure that prettier CI step fails when code is badly formatted (#35170) @michaldudak

All contributors of this release in alphabetical order: @alexfauquette, @danilo-leal, @iamxukai, @Janpot, @MBilalShafi, @michaldudak, @oliviertassinari, @samuelsycamore, @siriwatknp

## v5.10.14

<!-- generated comparing v5.10.13..master -->

_Nov 14, 2022_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 🚀 @siriwatknp added the Autocomplete component to the Joy UI (#34315)
- ♿ @sfavello improved the accessibility of the Material UI's Autocomplete by adding support for the Delete key (#33822)
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.10.14`

- [Material UI] Add `palette.background.defaultChannel` token (#35061) @siriwatknp
- [Autocomplete] Remove tags with the Delete key (#33822) @sfavello
- [IconButton] custom color causes type error (#34521) @kushagra010

### `@mui/system@5.10.14`

- [Unstable_Gridv2] sorted responsize keys based on breakpoint value (#34987) @sai6855

### `@mui/joy@5.0.0-alpha.54`

- [Joy] Export `FormControl`, `LinearProgress` and `ListSubheader` components from `@mui/joy` (#35003) @Studio384
- [Joy] Miscellaneous fixes (#35044) @siriwatknp
- [Joy] Add `Autocomplete` component (#34315) @siriwatknp
- [Joy] Saturate a bit the gray palette (#35148) @danilo-leal
- [Autocomplete][joy] Fix types (#35153) @siriwatknp

### Docs

- [blog] Fix font size of code blocks on iOS @oliviertassinari
- [docs] Accessibility - increase default contrastThreshold for WCAG AA compliance (#34901) @kennethbigler
- [docs] Correct the keepMounted section on the Drawer page (#35076) @michaldudak
- [docs] Fix code editor styles mismatches (#35108) @oliviertassinari
- [docs] Allows to access the next MUI-X (#34798) @alexfauquette
- [docs] Fix bugs with live edit demos (#35106) @oliviertassinari
- [docs] Fix `MarkdownElement` regression from adding CSS variables (#35096) @siriwatknp
- [docs] Add a new gold sponsor (#35089) @hbjORbj
- [docs] Fix scroll issue on expanded live demos (#35064) @bharatkashyap
- [docs] Improve alignment of the sponsors @oliviertassinari
- [docs] Improve code font family v2 (#35053) @oliviertassinari
- [docs] Upgrade to Next.js 13 (#35001) @mnajdova
- [docs] Fix typo in changelog @oliviertassinari
- [docs] Update Joy UI templates to use latest components (#35058) @siriwatknp
- [website] Fix design kits showcase throwing an error (#35093) @cherniavskii
- [website] Fix margin bug on CTA @oliviertassinari
- [website] Link respective repositories in product pages (#35046) @sidtohan
- [website] Migrate blog pages to use CSS theme variables (#34976) @siriwatknp
- [website] Update DoiT International logo and links with new brand (#35030) @ofir5300
- [website] Improve visual design app bar (#35111) @oliviertassinari

### Core

- [core] Convert scripts to ES modules (#35036) @michaldudak
- [core] Show the whole version to make blame easier @oliviertassinari
- [core] Polish GitHub Action version @oliviertassinari
- [core] Ignore icons to speed up CodeQL @oliviertassinari
- [core] Feedback on branch protection @oliviertassinari
- [core] Revert CI (#35098) @siriwatknp
- [core] Fix job name to match the CI (#35097) @siriwatknp
- [core] ESLint fixes for tests (#34924) @Janpot
- [core] Ignore unrelated folders from github actions (#35028) @siriwatknp
- [core] Use pretty-quick instead of custom script (#34062) @Janpot

All contributors of this release in alphabetical order: @alexfauquette, @bharatkashyap, @cherniavskii, @danilo-leal, @hbjORbj, @Janpot, @kennethbigler, @kushagra010, @michaldudak, @mnajdova, @ofir5300, @oliviertassinari, @sai6855, @sfavello, @sidtohan, @siriwatknp, @Studio384

## v5.10.13

<!-- generated comparing v5.10.12..master -->

_Nov 7, 2022_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- 🚀 The slots API has been introduced to the Material UI package by @michaldudak (#34873).
- 🔥 Live editing of demos is stabilized by @oliviertassinari (#34870).
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.10.13`

- &#8203;<!-- 08 -->[material-ui] Introduce the slots API (#34873) @michaldudak
- &#8203;<!-- 07 -->[NativeSelectInput] Support CSS theme variables (#34975) @siriwatknp

### `@mui/system@5.10.13`

- &#8203;<!-- 05 -->[system] Add a missing key attribute in getInitColorScheme to fix key issue (#34992) @akshaya-venkatesh8

### `@mui/base@5.0.0-alpha.105`

- &#8203;<!-- 26 -->[base] Avoid calling setState during renders (#34916) @Janpot

### `@mui/joy@5.0.0-alpha.53`

- &#8203;<!-- 06 -->[Select] Fix custom options menu not opening on Avatar click (#34648) @shivam1646

### Docs

- &#8203;<!-- 20 -->[docs] Add a guide for setting dark mode by default (#34839) @siriwatknp
- &#8203;<!-- 19 -->[docs] Improve code font family (#35027) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Revise and expand Joy UI "Alert" page (#34838) @samuelsycamore
- &#8203;<!-- 17 -->[docs] Live demos v2 (#34870) @oliviertassinari
- &#8203;<!-- 16 -->[docs] Fix 301 links in the docs @oliviertassinari
- &#8203;<!-- 15 -->[docs] Fix code display in RTL (#34951) @oliviertassinari
- &#8203;<!-- 14 -->[docs] New API design rule disabled > disable (#34972) @oliviertassinari
- &#8203;<!-- 13 -->[docs] Explain the usage of Select's onOpen/onClose in the uncontrolled mode (#34755) @michaldudak
- &#8203;<!-- 12 -->[docs] Add a new gold sponsor (#34984) @hbjORbj
- &#8203;<!-- 11 -->[docs] Add author and published_time meta tags (#34382) @alexfauquette
- &#8203;<!-- 10 -->[examples] Next.js examples v13 - fonts (#34971) @PetroSilenius
- &#8203;<!-- 09 -->[examples] Next.js examples v13 - links (#34970) @PetroSilenius
- &#8203;<!-- 04 -->[website] Update IPinfo.AI name @oliviertassinari
- &#8203;<!-- 03 -->[website] Remove date-io from the docs dependencies (#34748) @michaldudak
- &#8203;<!-- 02 -->[website] Migrate Design-kits page to use CSS theme variables (#34920) @jesrodri
- &#8203;<!-- 01 -->[website] Migrate Pricing page to use CSS theme variables (#34917) @trizotti

### Core

- &#8203;<!-- 25 -->[core] Remove default access to GitHub action scopes @oliviertassinari
- &#8203;<!-- 24 -->[core] Fix Pinned-Dependencies @oliviertassinari
- &#8203;<!-- 23 -->[core] Fix typos in the component name @oliviertassinari
- &#8203;<!-- 22 -->[core] Fix scorecard regression @oliviertassinari
- &#8203;<!-- 21 -->[core] Create the docs theme once (#34954) @oliviertassinari

All contributors of this release in alphabetical order: @akshaya-venkatesh8, @alexfauquette, @hbjORbj, @Janpot, @jesrodri, @michaldudak, @oliviertassinari, @PetroSilenius, @samuelsycamore, @shivam1646, @siriwatknp, @trizotti

## v5.10.12

<!-- generated comparing v5.10.11..master -->

_Oct 31, 2022_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- 🚀 The LinearProgress component has been added to Joy UI by @hbjORbj (#34514).
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements.

### `@mui/material@5.10.12`

- &#8203;<!-- 37 -->[Chip] Don't override icon color (#34247) @emlai
- &#8203;<!-- 09 -->[Radio] Skip default hover style when disableRipple is set (#34902) @VinceCYLiao
- &#8203;<!-- 08 -->[SwipeableDrawer] Fix React 18 issues (#34505) @mnajdova
- &#8203;<!-- 05 -->[Tooltip] Save a few bytes (#34853) @oliviertassinari

### `@mui/base@5.0.0-alpha.104`

- &#8203;<!-- 38 -->[ButtonUnstyled] Update to render as link when href or to is provided (#34337) @EduardoSCosta

### `@mui/joy@5.0.0-alpha.52`

- &#8203;<!-- 36 -->[Joy][circularprogress] Prevent new styles from being generated when `value` changes (#34897) @hbjORbj
- &#8203;<!-- 11 -->[Joy] Add color inversion feature (#32511) @siriwatknp
- &#8203;<!-- 10 -->[Joy] Add `LinearProgress` component (#34514) @hbjORbj

### Docs

- &#8203;<!-- 40 -->[blog] Add blog post for high-level overview of all MUI products (#34325) @samuelsycamore
- &#8203;<!-- 39 -->[blog] Fix hydration mistmatch (#34857) @oliviertassinari
- &#8203;<!-- 21 -->[docs] Revise the Joy UI "Aspect Ratio" page (#34858) @samuelsycamore
- &#8203;<!-- 20 -->[docs] Fix Safari code font size (#34859) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Fix spelling mistake (#34955) @punithnayak
- &#8203;<!-- 18 -->[docs] Fix 404 link of supported Material UI components @oliviertassinari
- &#8203;<!-- 17 -->[docs] Fix Safari button misalignment (#34861) @oliviertassinari
- &#8203;<!-- 16 -->[docs] Fix typo in docs title (#34926) @PunitSoniME
- &#8203;<!-- 25 -->[docs] Fix missing emotion prefixes (#34958) @oliviertassinari
- &#8203;<!-- 26 -->[docs] Improve UI display for copy code (#34950) @oliviertassinari
- &#8203;<!-- 15 -->[docs] Standardize all MUI Core "Usage" pages (#34183) @samuelsycamore
- &#8203;<!-- 14 -->[docs] Update templates' readme files to include required dependencies (#34757) @michaldudak
- &#8203;<!-- 13 -->[docs] Fix inconsistent theme colors when applying custom colors in playground (#34866) @cherniavskii
- &#8203;<!-- 12 -->[docs] Fix typo in bottom-navigation.md (#34884) @RoodyCode
- &#8203;<!-- 07 -->[website] Migrate about-us page to use CSS theme variables (#34919) @brianlu2610
- &#8203;<!-- 06 -->[website] Migrate Product-Templates page to use CSS theme variables (#34913) @EduardoSCosta
- &#8203;<!-- 05 -->[website] Migrate career page to use CSS theme variables (#34908) @the-mgi
- &#8203;<!-- 04 -->[website] Update MUI X open and future roles + about page (#34894) @DanailH
- &#8203;<!-- 03 -->[website] Remove one DOM node (#34960) @oliviertassinari
- &#8203;<!-- 02 -->[website] Use `span` for icon image (#34914) @siriwatknp
- &#8203;<!-- 01 -->[website] Fix subscribe input with Safari (#34869) @oliviertassinari

### Core

- &#8203;<!-- 35 -->[core] Ignore compiled icons in CodeQL @oliviertassinari
- &#8203;<!-- 34 -->[core] Add OSSF Scorecard action (#34854) @oliviertassinari
- &#8203;<!-- 40 -->[core] Fix extra GitHub Action permission (#34496) @sashashura
- &#8203;<!-- 33 -->[core] Fix duplicate id @oliviertassinari
- &#8203;<!-- 41 -->[core] Enforce import \* as React (#34878) @da0x
- &#8203;<!-- 32 -->[core] A couple of simply fixes from #34870 (#34953) @oliviertassinari
- &#8203;<!-- 31 -->[core] Migrate outdated pattern to convention @oliviertassinari
- &#8203;<!-- 30 -->[core] Pin GitHub Actions dependencies (#34929) @renovate[bot]
- &#8203;<!-- 29 -->[core] Make the reproduction more important in the bug template (#34875) @oliviertassinari
- &#8203;<!-- 28 -->[core] Fix docs GitHub API rate limit (#34856) @oliviertassinari
- &#8203;<!-- 42 -->[core] Fix eslint issues (#34964) @mnajdova
- &#8203;<!-- 27 -->[core] Pin GitHub Action to digests (#34855) @oliviertassinari
- &#8203;<!-- 26 -->[core] Fix permissions in workflow @oliviertassinari
- &#8203;<!-- 25 -->[core] memoize context values for react/jsx-no-constructed-context-values (#34849) @Janpot
- &#8203;<!-- 24 -->[core] Fix @typescript-eslint/default-param-last issues (#34846) @Janpot
- &#8203;<!-- 23 -->[core] Fix HTML validation error (#34860) @oliviertassinari
- &#8203;<!-- 22 -->[core] Fix duplicate CodeQL build @oliviertassinari
- &#8203;<!-- 07 -->[test] Move Firefox tests to CircleCI (#34764) @oliviertassinari
- &#8203;<!-- 06 -->[test] Use screen when possible for simplicity (#34890) @oliviertassinari

All contributors of this release in alphabetical order: @cherniavskii, @DanailH, @EduardoSCosta, @emlai, @hbjORbj, @Janpot, @michaldudak, @mnajdova, @oliviertassinari, @punithnayak, @PunitSoniME, @renovate[bot], @RoodyCode, @samuelsycamore, @siriwatknp, @VinceCYLiao

## v5.10.11

<!-- generated comparing v5.10.10..master -->

_Oct 25, 2022_

A big thanks to the 10 contributors who made this release possible. Here are some highlights ✨:

- 🔧 Moved `components` to `slots` prop starting at Base UI to create consistency across products
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.10.11`

- [InputBase] Fix `onInvalid` to use HTMLInputElement | HTMLTextAreaElement Element type (#33162) @KuSh
- [Alert] Add `components` and `componentsProps` props to allow close action overrides (#33582) @jake-collibra

### `@mui/base@5.0.0-alpha.103`

#### BREAKING CHANGE

- [base] `components` -> `slots` API rename (#34693) @michaldudak

  - Change all occurrences of components and componentsProps props in Base components to slots and slotProps, respectively.
  - Change casing of slots' fields to camelCase

  ```diff
  -<SwitchUnstyled components={{Root: CustomRoot}} componentsProps={{rail: { className: 'custom-rail' }}} />
  +<SwitchUnstyled slots={{root: CustomRoot}} slotProps={{rail: { className: 'custom-rail' }}} />
  ```

- [base] Make CSS class prefixes consistent (#33411) @michaldudak

  **This is a breaking change for anyone who depends on the class names applied to Base components.**
  If you use the `<component>UnstyledClasses` objects, you won't notice a difference. Only if you depend on the resulting class names (e.g. in CSS stylesheets), you'll have to adjust your code.

  ```diff
  -.ButtonUnstyled-root { ... };
  +.MuiButton-root { ... };
  ```

#### Changes

- [test] Test all Base components with describeConformanceUnstyled (#34825) @michaldudak

### `@mui/joy@5.0.0-alpha.51`

- [CircularProgress][joy] Fix classnames and add test (#34806) @hbjORbj
- [Joy] Allow string type for `size` prop in components (#34805) @hbjORbj

### Docs

- Revert "[docs] Fix search icons in other languages (#34823)" @oliviertassinari
- Revert "[core] Move SearchIcons to docs src folder (#34802)" @oliviertassinari
- Revert "[docs] Live demos (#34454)" @oliviertassinari
- Update the order of operations for pagination example so that slicing takes place after sorting. (#34189) @marceliwac
- [docs] Gatsby Description in Joy dark-mode (#34702) @pixelass
- [docs] Add notification for blogpost MUI X v6 alpha (#34809) @joserodolfofreitas
- [docs] Polish Crowdin config (#34852) @oliviertassinari
- [docs] Fix a few style standard deviations @oliviertassinari
- [docs] Enforce no trailing spaces (#34762) @oliviertassinari
- [docs] Enforce correct git diff format (#34765) @oliviertassinari
- [docs] Fix Toolpad docs 301 route (#34843) @bharatkashyap
- [docs] Replace initial value with theme white (#34822) @siriwatknp
- [docs] Remove localization redirects (#34844) @mnajdova
- [docs] Fix search icons in other languages (#34823) @siriwatknp
- [docs] Fix JavaScript capitalization @oliviertassinari
- [docs] Update new links to MD2 (#34848) @oliviertassinari
- [website] Update future work items on X landing page (#34810) @joserodolfofreitas
- [website] Add Toolpad docs to navigation (#34749) @bharatkashyap

### Core

- [core] Remove dead files (#34850) @oliviertassinari
- [core] Fix revert conflict @oliviertassinari
- [core] Fix a few CodeQL errors (#34766) @oliviertassinari
- [core] Harden GitHub Actions permissions (#34769) @oliviertassinari
- [core] Remove the codeowners file (#34876) @michaldudak

All contributors of this release in alphabetical order: @bharatkashyap, @hbjORbj, @jake-collibra, @joserodolfofreitas, @KuSh, @marceliwac, @michaldudak, @oliviertassinari, @pixelass, @siriwatknp

## 5.10.10

<!-- generated comparing v5.10.9..master -->

_Oct 18, 2022_

A big thanks to the 21 contributors who made this release possible. Here are some highlights ✨:

- 🖌 Thanks to the efforts of @bharatkashyap and @nihgwu, we now have editable demos across our docs (#34454)!
- 🚀 The Tooltip component has been added to Joy UI by @hbjORbj (#34509).
- ⚙️ We started converting the remaining JS components in Base UI to TypeScript.
  @mbayucot finished the first PR with the conversion of the NoSsr code (#34735).
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.10.10`

- [Popover] Fix paper position flash on open (#34546) @TheUnlocked
- [SwipeableDrawer] Make component `defaultProps` overridable (#34643) @hbjORbj

### `@mui/system@5.10.10`

- [system] Support CSS `grey` color in `sx` (#34548) @TheUnlocked

### `@mui/styles@5.10.10`

- [styles] Use memoized context in StylesProvider (#34637) @mohd-akram

### `@mui/joy@5.0.0-alpha.50`

- [Select][joy] Added hidden input element (#34657) @zee-bit
- [Slider][joy] Add global variant to slider (#34733) @siriwatknp
- [Tooltip][joy] Add component (#34509) @hbjORbj

### `@mui/base@5.0.0-alpha.102`

- [MultiSelect][base] Prevent the renderValue prop from being propagated to the DOM (#34698) @michaldudak
- [NoSsr] Convert code to TypeScript (#34735) @mbayucot

### Docs

- [docs] Fix the Autocomplete Highlighting example (#34184) @hayawata3626
- [docs] Fix typos in Base (Menu, Tabs) and Joy UI (Chip) (#34803) @rvrvrv
- [docs] Use new editing API in homepage demos (#34220) @m4theushw
- [docs] Live demos (#34454) @bharatkashyap
- [docs] Fix typos in Joy UI Switch (#34728) @ndresx
- [docs] Avoid scrollbar in the code demos (#34741) @oliviertassinari
- [docs] Revise the Joy UI "Automatic adjustment" page (#34614) @samuelsycamore
- [docs] Revise and rename the Joy UI "Perfect dark mode" page (#34613) @samuelsycamore
- [docs] Revise the Joy UI "Global variants" page (#34595) @samuelsycamore
- [docs] Basic link verification at PR level (#34588) @alexfauquette
- [docs] Add a missing comma in the customization example (#34617) @AbayKinayat
- [website] Clarify Pro/Premium support (#34607) @oliviertassinari
- [website] Fix home page dark mode flicker (#33545)
- [website] Update the state of the date pickers on the landing page (#34750) @joserodolfofreitas

### Core

- [core] Clean conditionals (#34772) @pedroprado010
- [core] Temporary remove the authorization (#34796) @siriwatknp
- [core] Avoid slower CI run statues @oliviertassinari
- [core] Improve the playground DX (#34739) @oliviertassinari
- [core] Link Netlify in the danger comment (#34688) @oliviertassinari
- [core] Fix CI after out of sync merge @oliviertassinari
- [core] Enforce straight quote (#34686) @oliviertassinari
- [core] Add code scanning via CodeQL (#34707) @DanailH
- [core] Fix some upcoming eslint issues (#34727) @oliviertassinari
- [core] Auto-fix upcoming eslint issues (#34644) @Janpot
- [core] Move SearchIcons to docs src folder (#34802)
- [test] Enable `react/no-unstable-nested-components` (#34518) @eps1lon

All contributors of this release in alphabetical order: @AbayKinayat, @alexfauquette, @bharatkashyap, @DanailH, @eps1lon, @hayawata3626, @hbjORbj, @Janpot, @joserodolfofreitas, @m4theushw, @mbayucot, @michaldudak, @mohd-akram, @ndresx, @oliviertassinari, @pedroprado010, @rvrvrv, @samuelsycamore, @siriwatknp, @TheUnlocked, @zee-bit

## 5.10.9

<!-- generated comparing v5.10.8..master -->

_Oct 10, 2022_

A big thanks to the 7 contributors who made this release possible. Here are some highlights ✨:

- 🚀 [Joy] Button loading functionality has been added by @kushagra010 (#34658)
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.10.9`

- &#8203;<!-- 16 -->[Grid v2][system] Handle direction object prop for responsive design (#34574) @vanyaxk
- &#8203;<!-- 03 -->[Slider] Fix unnecessary accessibility attribute in root element (#34610) @vanyaxk

### `@mui/system@5.10.9`

#### BREAKING CHANGE

- &#8203;<!-- 17 -->[system] Fix color-scheme implementation (#34639) @siriwatknp

  The `enableColorScheme` prop has been removed from `CssVarsProvider` and `getInitColorScheme` (both Material UI and Joy UI).

  Migration:

  - **Material UI**: you can enable the CSS color scheme via `<CssBaseline enableColorScheme />`.
  - **Joy UI**: it is enabled automatically if you use `<CssBaseline />`, [see the docs](https://mui.com/joy-ui/react-css-baseline/).

#### Changes

- &#8203;<!-- 02 -->[system] Fix typo in createCssVarsProvider (#34661) @HexM7

### `@mui/base@5.0.0-alpha.101`

- &#8203;<!-- 01 -->[FocusTrap] Restore the previously exported type from @mui/material (#34601) @michaldudak

### `@mui/joy@5.0.0-alpha.49`

- &#8203;<!-- 04 -->[Joy] Add button loading functionality (#34658) @kushagra010

### Docs

- &#8203;<!-- 18 -->[docs] Revert #34541 (#34700) @michaldudak
- &#8203;<!-- 15 -->[blog] Blog post for MUI X v6 alpha zero (#34424) @joserodolfofreitas
- &#8203;<!-- 09 -->[docs] Improve Joy UI tutorial demo (#34653) @oliviertassinari
- &#8203;<!-- 08 -->[docs] Explain how SelectUnstyled renders a hidden input (#34638) @michaldudak
- &#8203;<!-- 07 -->[docs] Fix Taiwan description (#34611) @oliviertassinari
- &#8203;<!-- 06 -->[docs] Fix codesandbox export with dayjs (#34619) @oliviertassinari
- &#8203;<!-- 05 -->[docs] Explain the purpose of renderGroup prop (#34066) @michaldudak

### Core

- &#8203;<!-- 14 -->[core] Make useForkRef variadic (#27939) @michaldudak
- &#8203;<!-- 13 -->[core] Speedup of yarn install in the CI (#34632) @oliviertassinari
- &#8203;<!-- 12 -->[core] Fix markdown loader on Windows (#34623) @michaldudak
- &#8203;<!-- 11 -->[core] Update changelog for version v5.10.8 (#34593) @mnajdova
- &#8203;<!-- 10 -->[core] Update root package.json version (#34592) @mnajdova

All contributors of this release in alphabetical order: @HexM7, @joserodolfofreitas, @kushagra010, @michaldudak, @mnajdova, @oliviertassinari, @vanyaxk

## 5.10.8

<!-- generated comparing v5.10.7..master -->

_Oct 3, 2022_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🚀 [SnackbarUnstyled](https://mui.com/base-ui/react-snackbar/) component & headless hook are added to Base UI (#33227) @ZeeshanTamboli
- 📚 [CSS variables documentation](https://mui.com/material-ui/experimental-api/css-theme-variables/overview/) for Material UI has been added by @siriwatknp (#33958)
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.10.8`

- &#8203;<!-- 28 -->[Autocomplete] Skip filtering when list of options is loading (#33278) @ndebeiss
- &#8203;<!-- 13 -->[Fab] Add `disabled` class to FAB button (#34245) @meenarama
- &#8203;<!-- 09 -->[l10n] Add Arabic Saudi Arabia (ar-SA) locale (#33340) @rolule
- &#8203;<!-- 08 -->[l10n] zhTW refinement (#33391) @Aporim2051
- &#8203;<!-- 07 -->[Popover] Add `ownerState` on the paper slot (#34445) @kabernardes
- &#8203;<!-- 05 -->[Slider] Fixed incorrect marks displayed due to duplicate keys in range (#33526) @kskd1804
- &#8203;<!-- 03 -->[TextField] Fix typo in FormControlLabel declaration file (#34535) @hghmn

### `@mui/base@5.0.0-alpha.100`

- &#8203;<!-- 04 -->[SnackbarUnstyled] Create component and `useSnackbar` hook (#33227) @ZeeshanTamboli

### `@mui/joy@5.0.0-alpha.48`

- &#8203;<!-- 12 -->[Joy] Fix `variantPlain` classname missing in few components (#34534) @hbjORbj
- &#8203;<!-- 11 -->[Joy] Fix input decorator color and list padding (#34586) @siriwatknp
- &#8203;<!-- 10 -->[Joy] Miscellaneous fixes (#34492) @siriwatknp

### Docs

- &#8203;<!-- 27 -->[blog] Fix 404 link in base introduction @oliviertassinari
- &#8203;<!-- 21 -->[docs] Fix CI build (#34589) @mnajdova
- &#8203;<!-- 20 -->[docs] Temporary remove date picker from home page (#34541) @siriwatknp
- &#8203;<!-- 19 -->[docs] Revise and expand Joy UI "Tutorial" doc (#34569) @samuelsycamore
- &#8203;<!-- 18 -->[docs] Fix SEO issues (#34537) @oliviertassinari
- &#8203;<!-- 17 -->[docs] Add CSS variables documentation for Material UI (#33958) @siriwatknp
- &#8203;<!-- 16 -->[docs] Capitalize Material Design on the Breakpoints page (#34481) @Dustin-Digitar
- &#8203;<!-- 15 -->[docs] Able to load doc components inside markdown files (#34243) @flaviendelangle
- &#8203;<!-- 14 -->[docs] Use mouse pointer on esc button in the search modal (#34485) @minkyngkm
- &#8203;<!-- 02 -->[website] Fix typo in pricing FAQ @oliviertassinari
- &#8203;<!-- 01 -->[website] Move the React Engineer role from open to next (#34494) @mnajdova

### Core

- &#8203;<!-- 26 -->[core] Update root package.json version (#34592) @mnajdova
- &#8203;<!-- 25 -->[core] Remove useless comment in fixtures (#34581) @Garz4
- &#8203;<!-- 24 -->[core] Fix link to CODE_OF_CONDUCT.md (#34543) @peippo
- &#8203;<!-- 23 -->[core] Remove outdated docsearch.js dependency (#34421) @oliviertassinari
- &#8203;<!-- 22 -->[core] Add `newFeature` to the typing of MuiPage (#34511) @flaviendelangle

All contributors of this release in alphabetical order: @Aporim2051, @Dustin-Digitar, @flaviendelangle, @Garz4, @hbjORbj, @hghmn, @kabernardes, @kskd1804, @meenarama, @minkyngkm, @mnajdova, @ndebeiss, @oliviertassinari, @peippo, @rolule, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 5.10.7

<!-- generated comparing v5.10.6..master -->

_Sep 26, 2022_

A big thanks to the 21 contributors who made this release possible. Here are some highlights ✨:

- 🚀 [Divider](https://mui.com/joy-ui/react-divider/) component is added to Joy UI (#34403) @siriwatknp

### `@mui/material@5.10.7`

- [CssVarsProvider] Exclude dark mode variables from `:root` stylesheet (#34131) @siriwatknp
- [Chip] Add chip classes (#33801) @pratikkarad
- [Slider] Fix typo in the comments in the source (#34452) @HexM7
- [SvgIcon] Fix passing an ownerState to SvgIcon changes the font size (#34429) @ZeeshanTamboli
- [Stepper] Fix optional label is not centered when `alternativeLabel` is used (#34335) @ZeeshanTamboli
- [Tooltip] Add undefined, null or false in `title` (#34289) @abhinav-22-tech
- Make @emotion/\* fully supported in all Material UI components (#34451) @garronej

### `@mui/system@5.10.7`

- [system] Fix parsing of hsla colors in getLuminance (#34437) @ptrfrncsmrph
- [system] Fix incorrect type of `shape.borderRadius` in theme (#34076) @ZeeshanTamboli
- [system] Replace `enableSystem` with `defaultMode` (#33960) @siriwatknp

### `@mui/material@5.0.0-alpha.101`

- [deps] Move @mui/types to dependencies (#34384) @Methuselah96

### `@mui/base@5.0.0-alpha.99`

#### Breaking changes

- [FocusTrap] Rename TrapFocus to FocusTrap (#34216) @kabernardes

  ```diff
  -import TrapFocus from '@mui/base/TrapFocus';
  +import FocusTrap from '@mui/base/FocusTrap';
  ```

#### Changes

- [MultiSelect] Require a single tap to select an item on mobile Chrome (#33932) @michaldudak

### `@mui/joy@5.0.0-alpha.47`

- [Checkbox] spread `value`, `required`, and `readOnly` to input (#34477) @siriwatknp
- [Chip] Fix unbinded `onClick` prop (#34455) @HexM7
- [Divider] Add `Divider` component (#34403) @siriwatknp
- [Radio] spread `readOnly` and `required` to input (#34478) @siriwatknp

### Docs

- [blog] Base UI announcement typo fixed (#34409) @prakhargupta1
- [blog] Fix typo in date-pickers v5 stable (#34386) @alexfauquette
- [blog] Update date on date pickers v5 release blog post (#34406) @joserodolfofreitas
- [docs] Update `useMenu` and `useMenuItem` hooks demo (#34166) @ZeeshanTamboli
- [docs] Update the guide for migrating to TSS (#34417) @garronej
- [docs] Fix typo in `Grid` docs (#34475) @Dustin-Digitar
- [docs] Fix typo in `Back to top` section in AppBar docs (#34479) @Dustin-Digitar
- [docs] Standardize all MUI Core "Installation" pages (#34168) @samuelsycamore
- [docs] Fix webpack file name to the standard: `webpack.config.js` (#34446) @CodingItWrong
- [docs] Fix Select `onChange` call (#34408) @siriwatknp
- [docs] Notification for pickers blog - v5 stable (#34400) @joserodolfofreitas
- [docs] Improve social sharing of docs pages (#34346) @oliviertassinari
- [docs] Refine the use of MUI vs. Material UI (#34345) @oliviertassinari
- [docs] Send feedback directly to a dedicated slack channel (#34196) @alexfauquette
- [website] Adds Bilal to about page (#34412) @MBilalShafi
- [website] Add date range picker to pricing table (#34399) @joserodolfofreitas

### Core

- [core] Document some types in @mui/styled-engine-sc (#34413) @mnajdova
- [core] Add yml support to prettier (#33980) @Janpot

All contributors of this release in alphabetical order: @abhinav-22-tech, @alexfauquette, @CodingItWrong, @Dustin-Digitar, @garronej, @HexM7, @howlettt, @Janpot, @joserodolfofreitas, @kabernardes, @MBilalShafi, @Methuselah96, @michaldudak, @mnajdova, @oliviertassinari, @prakhargupta1, @pratikkarad, @ptrfrncsmrph, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 5.10.6

<!-- generated comparing v5.10.5..master -->

_Sep 19, 2022_

A big thanks to the 11 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.10.6`

- [TextField] Fix conflict with `Bootstrap` even when label is not defined (#34343) @ZeeshanTamboli

### `@mui/joy@5.0.0-alpha.46`

#### Breaking changes

- [button][joy] Replace `start/endIcon` prop with `start/endDecorator` (#34288) @hbjORbj

  **BREAKING CHANGE**: replace `start/endIcon` with `start/endDecorator`.

  ```jsx
  // before
  <Button startIcon={...} endIcon={...} />

  // after
  <Button startDecorator={...} endDecorator={...} />
  ```

#### Changes

- [Joy] Adjust the `Input` and `Textarea` styles (#34281) @siriwatknp
- [menu][joy] Set disablePortal default to false (#34283) @tomasz-sodzawiczny

### `@mui/base@5.0.0-alpha.98`

#### Breaking changes

- [Select][base] Add event parameter to the onChange callback (#34158) @michaldudak

  The SelectUnstyled and MultiSelectUnstyled `onChange` callbacks did not have event as the first parameter, leading to inconsistency with other components and native HTML elements.
  This PR adds the event parameter as the first one and moves the newly selected value to the second position. Because of this, it's a breaking change.
  This also affects Select from Joy UI.

  ```jsx
  // before
  <SelectUnstyled onChange={(newValue) => { /* ... */ }} />

  // after
  <SelectUnstyled onChange={(event, newValue) => { /* ... */ }} />
  ```

### Docs

- [blog] The Date Pickers gets a stable v5 release (#34152) @alexfauquette
- [blog] Improve image handling (#34222) @oliviertassinari
- [blog] Correct 2021 survey data interpretation (#34291) @samuelsycamore
- [docs] Remove expired AospExtended showcase @oliviertassinari
- [docs] Link the OpenSSF Best Practices card (#34331) @oliviertassinari
- [docs] Fix 301 link to external projects @oliviertassinari
- [docs] Move 12 component names to Title Case (#34188) @oliviertassinari
- [docs] Fix broken links (#34320) @alexfauquette
- [docs] Add notification for Base UI announcement post (#34295) @samuelsycamore
- [website] Fix MUI X subscribe email border style (#34330) @oliviertassinari
- [website] Improve security header @oliviertassinari

### Core

- [core] Lock file maintenance (#34161) @renovate[bot]
- [core] Issue template: move reproduction steps to the top (#34279) @Janpot
- [core] Create shared Next.js baseline config (#34259) @oliviertassinari
- [core] In `typescript-to-proptypes`, respect the value pass to the generic (#34311) @flaviendelangle

All contributors of this release in alphabetical order: @alexfauquette, @flaviendelangle, @hbjORbj, @Janpot, @michaldudak, @oliviertassinari, @renovate[bot], @samuelsycamore, @siriwatknp, @tomasz-sodzawiczny, @ZeeshanTamboli

## 5.10.5

<!-- generated comparing v5.10.4..master -->

_Sep 12, 2022_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- 🚀 [Blog post](https://mui.com/blog/introducing-base-ui/) for announcing the release of the Base UI package is out thanks to @michaldudak.
- 🚀 Added [`Alert`](https://mui.com/joy-ui/react-alert/), [`Modal`](https://mui.com/joy-ui/react-modal/), [`ListSubheader`](https://mui.com/joy-ui/react-list-subheader/), [`FormControl`](https://mui.com/joy-ui/react-form-control/), [`CircularProgress`](https://mui.com/joy-ui/react-circular-progress/) components to Joy UI (#33859) @hbjORbj @siriwatknp
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.10.5`

- &#8203;<!-- 05 -->[ListItemText] Fix variant mapping in `primaryTypography` (#33880) @iamxukai
- &#8203;<!-- 03 -->[Timeline] Add left and right aligned timeline demos in docs (#34156) @ZeeshanTamboli

### `@mui/joy@5.0.0-alpha.45`

- &#8203;<!-- 20 -->[Joy UI] Add `CircularProgress` component (#33869) @hbjORbj
- &#8203;<!-- 19 -->[Joy UI] Add `FormControl` component (#34187) @siriwatknp
- &#8203;<!-- 18 -->[Joy UI] Add `ListSubheader` component (#34191) @siriwatknp
- &#8203;<!-- 17 -->[Joy UI] Add `Modal` component (#34043) @siriwatknp
- &#8203;<!-- 10 -->[Joy] Fix list value of false or 0 (zero) text is incorrectly grey (#34255) @kushagra010
- &#8203;<!-- 09 -->[Joy] Adjust typography decorator margin (#34257) @siriwatknp
- &#8203;<!-- 08 -->[Joy] Miscellaneous fixes (#34193) @siriwatknp
- &#8203;<!-- 07 -->[Radio][joy] Integrate with form control (#34277) @siriwatknp
- &#8203;<!-- 06 -->[Joy][textarea] Pass `textarea` props from `componentsProps` (#34223) @HexM7

### Docs

- &#8203;<!-- 16 -->[blog] Introducing Base UI (#33778) @michaldudak
- &#8203;<!-- 13 -->[docs] Fix spelling error (#34209) @ChrystianDeMatos
- &#8203;<!-- 12 -->[docs] Improve link to the security policy (#34219) @oliviertassinari
- &#8203;<!-- 11 -->[docs] Fix typo in Joy UI's `Usage` docs (#34200) @zillion504
- &#8203;<!-- 02 -->[website] Add Lukas to the about page (#34284) @LukasTy
- &#8203;<!-- 01 -->[website] Update diamond sponsor URL (#34256) @oliviertassinari

### Core

- &#8203;<!-- 04 -->[test] Replace argos-cli with @argos-ci/core (#34178) @michaldudak
- &#8203;<!-- 15 -->[core] Create a script to generate codeowners (#34175) @michaldudak
- &#8203;<!-- 14 -->[core] Add RFC GH issue template (#33871) @bytasv

All contributors of this release in alphabetical order: @bytasv, @ChrystianDeMatos, @hbjORbj, @HexM7, @iamxukai, @kushagra010, @LukasTy, @michaldudak, @oliviertassinari, @siriwatknp, @ZeeshanTamboli, @zillion504

## 5.10.4

<!-- generated comparing v5.10.3..master -->

_Sep 5, 2022_

A big thanks to the 11 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Added [`Alert`](https://mui.com/joy-ui/react-alert/) component to Joy UI (#33859) @hbjORbj
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.10.4`

- &#8203;<!-- 22 -->[Avatar] Use structured / semantic markup for avatars and avatar groups (#33994) @paulschreiber
- &#8203;<!-- 05 -->[Steps] Use structured / semantic markup for steps and steppers (#34138) @paulschreiber

### `@mui/joy@5.0.0-alpha.44`

- &#8203;<!-- 23 -->[Alert][joy] Add `Alert` component (#33859) @hbjORbj
- &#8203;<!-- 08 -->[Joy] Make the description of `componentsProps` generic (#34140) @hbjORbj
- &#8203;<!-- 07 -->[Joy] Add tests / classes for `Breadcrumbs` component (#33860) @hbjORbj
- &#8203;<!-- 06 -->[Select][joy] Fix forwarding listbox `component` prop (#34172) @siriwatknp

### `@mui/base@5.0.0-alpha.96`

- &#8203;<!-- 21 -->[Select][base] Fix type issues that appeared with TS 4.8 (#34132) @michaldudak

### Docs

- &#8203;<!-- 15 -->[docs] Add `mui-color-input`, `mui-chips-input` and `mui-tel-input` into the related projects page (#34123) @viclafouch
- &#8203;<!-- 14 -->[docs] Update sponsors (#34157) @hbjORbj
- &#8203;<!-- 13 -->[docs] Move 5 component names to Title Case (#34118) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Fix the color contrast on optional API methods (#34127) @oliviertassinari
- &#8203;<!-- 11 -->[docs] Fix crash due to using wrong variable (#34171) @siriwatknp
- &#8203;<!-- 10 -->[docs] Fix a few Base typos (#33986) @ropereraLK
- &#8203;<!-- 09 -->[docs] Revise Joy UI "Overview" page copy (#34087) @samuelsycamore
- &#8203;<!-- 20 -->[blog] Fix social cards (#34160) @oliviertassinari
- &#8203;<!-- 03 -->[website] Allow deep linking to sponsors @oliviertassinari
- &#8203;<!-- 02 -->[website] Update job descriptions (#34134) @DanailH
- &#8203;<!-- 01 -->[website] Link Toolpad landing page @oliviertassinari

### Core

- &#8203;<!-- 19 -->[core] Move renovate config to the repository root (#34180) @oliviertassinari
- &#8203;<!-- 18 -->[core] Reinstate react/no-unused-prop-types eslint rule (#34125) @Janpot
- &#8203;<!-- 17 -->[core] Do not append `types` field to packages without index.d.ts (#33952) @michaldudak
- &#8203;<!-- 16 -->[core] Sanitize input in icon synonyms update script (#33989) @michaldudak
- &#8203;<!-- 04 -->[test] Allow to pass options to `mousePress` function (#34124) @cherniavskii

All contributors of this release in alphabetical order: @cherniavskii, @DanailH, @hbjORbj, @Janpot, @michaldudak, @oliviertassinari, @paulschreiber, @ropereraLK, @samuelsycamore, @siriwatknp, @viclafouch

## 5.10.3

<!-- generated comparing v5.10.2..master -->

_Aug 29, 2022_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- ⚡ @mnajdova implemented an alternative to OverridableComponent to achieve better dev-time performance (#32735)
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.10.3`

- [Autocomplete][material] Fix value overflow when `disableClearable` is used (#34053) @mnajdova
- [Autocomplete] Update unstyled demo to not import Material UI (#34060) @oliviertassinari
- [Slider] Remove SliderInput export from d.ts (#34055) @pieetrus
- [TablePagination] Fix select variant not working (#33974) @ZeeshanTamboli

### `@mui/system@5.10.3`

- [system] Fix mode blink when open multiple sessions (#33877) @siriwatknp

### `@mui/base@5.0.0-alpha.95`

- [Button][base] Prevent too many ref updates (#33882) @michaldudak
- [Select][base] Fix typo in listbox blur event handler (#34120) @ZeeshanTamboli
- [FocusTrap] Improve tab test and simplify demo (#34008) @EthanStandel

### `@mui/joy@5.0.0-alpha.43`

- [Joy] Fix `role` proptypes (#34119) @siriwatknp
- [Joy] Refine `componentsProps` for all components (#34077) @siriwatknp
- [Radio][joy] support `componentsProps` as a function (#34022) @siriwatknp
- [Select][joy] Improve the a11y on the select field demo (#34073) @mnajdova
- [Textarea][joy] Add `Textarea` component (#33975) @siriwatknp

### Docs

- [blog] Add Grid v2 announcement (#33926) @siriwatknp
- [blog] Making customizable components (#33183) @alexfauquette
- [blog] Improve SEO metadata (#33954) @oliviertassinari
- [docs] Add introduction Base component demos & general uplift (#33896) @danilo-leal
- [docs] Fix Gatsby sample config in CSS variables (#34024) @bicstone
- [docs] Fix 404 link from Joy to React Router (#34115) @oliviertassinari
- [docs] Fix typo in `Select` component (#34091) @HexM7
- [docs] Fix 301 links to tss's docs @oliviertassinari
- [docs] Fixing Joy UI usage snippet (#34049) @JonathanAsbury-SPS
- [docs] Fix missing JSX closing tag in Tooltip docs (#34064) @hoangph271
- [website] Add Toolpad to Navigation (#33937) @bharatkashyap
- [website] Improve SEO meta description for MUI X @oliviertassinari
- [website] Improve visual look of code demos (#34070) @oliviertassinari
- [website] Fix `DatePicker` component demo on the home page (#34054) @NaveenPantra

### Core

- [core] Offer alternative to `OverridableComponent` via module augmentation for better performance (#32735) @mnajdova
- [core] Fix prop-type warning in regression tests (#34086) @oliviertassinari
- [core] Specify code owners (#33995) @michaldudak
- [core] Fix scroll restoration (#34037) @oliviertassinari

All contributors of this release in alphabetical order: @alexfauquette, @bharatkashyap, @bicstone, @danilo-leal, @EthanStandel, @HexM7, @hoangph271, @JonathanAsbury-SPS, @michaldudak, @mnajdova, @NaveenPantra, @oliviertassinari, @pieetrus, @renovate[bot], @siriwatknp, @ZeeshanTamboli

## 5.10.2

<!-- generated comparing v5.10.1..master -->

_Aug 22, 2022_

A big thanks to the 11 contributors who made this release possible. Here are some highlights ✨:

- ✨ @michaldudak synced the Material Icons set with the latest from Google (#33988).\
  A couple of icons changed their appearance. See the difference [on this Argos build](https://app.argos-ci.com/mui/material-ui/builds/4428]).

### `@mui/material@5.10.2`

- &#8203;<!-- 16 -->[Autocomplete] Fix `keepMounted` Popper prop not working (#33957) @ZeeshanTamboli
- &#8203;<!-- 10 -->[IconButton] Fix hover effect when CSS Variables are enabled (#33971) @TheUnlocked
- &#8203;<!-- 07 -->[LoadingButton] Add support for CSS variables (#34001) @ZeeshanTamboli
- &#8203;<!-- 05 -->[TimelineConnector] Add support for CSS variables (#34002) @ZeeshanTamboli
- &#8203;<!-- 04 -->[TimelineDot] Add support for CSS variables (#34003) @ZeeshanTamboli
- &#8203;<!-- 03 -->[TreeItem] Add support for CSS variables (#34004) @ZeeshanTamboli

### `@mui/system@5.10.2`

- &#8203;<!-- 06 -->[system] catch localStorage errors (#34027) @jsakas

### `@mui/joy@5.0.0-alpha.42`

- &#8203;<!-- 08 -->[Joy] Add missing global exports (#33982) @tomasz-sodzawiczny

### `@mui/icons-material@5.8.5`

- &#8203;<!-- 09 -->[icons] Sync the Material Icons (#33988) @michaldudak

### Docs

- &#8203;<!-- 21 -->[docs] Fix typo in using-joy-ui-and-material-ui.md (#33997) @djohalo2 @danilo-leal
- &#8203;<!-- 20 -->[docs] Fix typo in the Transition docs (#34040) @alirezahekmati
- &#8203;<!-- 19 -->[docs] Typo fix in Joy UI Aspect Ratio doc (#33984) @AjeetSingh2016
- &#8203;<!-- 15 -->[docs] Fix broken Joy UI codesandbox export (#34007) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Fix typos in `test` folder's README (#33976) @ropereraLK
- &#8203;<!-- 13 -->[docs] Fix interior section links in Base docs that feature hooks (#33948) @samuelsycamore
- &#8203;<!-- 12 -->[docs] Fix typo in Joy UI's List Component docs (#33956) @Cerebro92
- &#8203;<!-- 11 -->[docs] Fix typo in Joy UI's docs (#33938) @AjeetSingh2016

### Core

- &#8203;<!-- 18 -->[website] Optimize meta description length (#34006) @oliviertassinari
- &#8203;<!-- 17 -->Revert "[core] Replace `getInitialProps` with `getStaticProps`" (#33991) @mnajdova
- &#8203;<!-- 02 -->[website] Move the React Engineer - X to next roles (#34030) @mnajdova
- &#8203;<!-- 01 -->[website] Add Icons8 gold sponsor (#33978) @michaldudak

All contributors of this release in alphabetical order: @AjeetSingh2016, @alirezahekmati, @Cerebro92, @danilo-leal, @djohalo2, @jsakas, @michaldudak, @mnajdova, @oliviertassinari, @ropereraLK, @samuelsycamore, @TheUnlocked, @tomasz-sodzawiczny, @ZeeshanTamboli

## 5.10.1

<!-- generated comparing v5.10.0..master -->

_Aug 15, 2022_

A big thanks to the 18 contributors who made this release possible. This release was mostly around 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.10.1`

- &#8203;<!-- 04 -->[TableCell] Enable variant overrides via TypeScript module augmentation (#33856) @arjunvijayanathakurup

### `@mui/system@5.10.1`

- &#8203;<!-- 05 -->[system] Fix `ContainerProps` export (#33923) @bugzpodder

### `@mui/base@5.0.0-alpha.93`

- &#8203;<!-- 31 -->[FocusTrap] Removes invisible tabbable elements from (#33543) @EthanStandel
- &#8203;<!-- 30 -->[Input][base] Pass the rows prop to the underlying textarea (#33873) @michaldudak
- &#8203;<!-- 06 -->[SelectUnstyled] Add ability to post the select's value when submitting a form (#33697) @michaldudak

### `@mui/joy@5.0.0-alpha.41`

- &#8203;<!-- 07 -->[IconButton][joy] Fix large IconButton scaling (#33885) @cherewaty

### Docs

- &#8203;<!-- 23 -->[docs] Expand on a11y section for Material UI `Link` component (#32839) @TKrishnasamy
- &#8203;<!-- 22 -->[docs] Fix typo in Joy UI's `AspectRatio` docs (#33895) @IsaacInsoll
- &#8203;<!-- 21 -->[docs] Improve the Base Usage page (#33272) @samuelsycamore
- &#8203;<!-- 20 -->[docs] Avoid refreshing the page when button on demo is clicked (#33852) @PunitSoniME
- &#8203;<!-- 19 -->[docs] Improve the HorizontalNonLinearStepper demo styling (#33886) @hayawata3626
- &#8203;<!-- 18 -->[docs] Remove dead NoSsr in the demos (#33910) @oliviertassinari
- &#8203;<!-- 17 -->[docs] Fix the reopening menu problem in MenuUnstyled demo (#33890) @michaldudak
- &#8203;<!-- 24 -->[docs] Fix a few link issues (#33909) @oliviertassinari
- &#8203;<!-- 16 -->[docs] Explain the icons package dependencies (#33592) @michaldudak
- &#8203;<!-- 15 -->[docs] Fix reported SEO issues (#33818) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Add permanent notifications back (#33843) @oliviertassinari
- &#8203;<!-- 13 -->[docs] Enforce description for all pages (#33698) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Clarify difference in startup times between named and default imports (#33109) @cmdcolin
- &#8203;<!-- 11 -->[docs] Update transform function in the sx prop sizing docs (#33850) @ZeeshanTamboli
- &#8203;<!-- 10 -->[docs] Adding missing accessibility labels (#33782) @PunitSoniME
- &#8203;<!-- 09 -->[docs] Fix `/system/getting-started/advanced/` does not exist (#33867) @MonstraG
- &#8203;<!-- 32 -->[docs] New Crowdin updates (#32213) @l10nbot
- &#8203;<!-- 08 -->[examples] Fix broken path to favicon.ico (#33906) @mmostafavi
- &#8203;<!-- 02 -->[website] Add new FAQ to pricing page (#33553) @oliviertassinari
- &#8203;<!-- 03 -->[website] Miscellaneous improvements to the marketing pages (#33897) @danilo-leal

### Core

- &#8203;<!-- 29 -->[core] Add the download tracker package (#33899) @michaldudak
- &#8203;<!-- 28 -->[core] Use proper external build id for Argos uploads (#33929) @cherniavskii
- &#8203;<!-- 27 -->[core] Enforce 70 as the max width on the title on the docs (#33819) @oliviertassinari
- &#8203;<!-- 26 -->[core] Clear yarn installation warning (#33776) @michaldudak
- &#8203;<!-- 25 -->[core] Bump yarn to 1.22.19 (#33656) @michaldudak
- &#8203;<!-- 24 -->[core] Remove outdated Next.js options (#33845) @oliviertassinari
- &#8203;<!-- 34 -->[core] Add the download tracker build script (#33941) @michaldudak
- &#8203;<!-- 01 -->[website] Allow /r/store- redirection pattern @oliviertassinari

All contributors of this release in alphabetical order: @arjunvijayanathakurup, @bugzpodder, @cherewaty, @cherniavskii, @cmdcolin, @danilo-leal, @EthanStandel, @hayawata3626, @IsaacInsoll, @l10nbot, @michaldudak, @mmostafavi, @MonstraG, @oliviertassinari, @PunitSoniME, @samuelsycamore, @TKrishnasamy, @ZeeshanTamboli

## 5.10.0

<!-- generated comparing v5.9.3..master -->

_Aug 8, 2022_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- ✨ [Stack](https://mui.com/system/react-stack/) component is added to MUI System and Joy UI #33760 #33800 @mnajdova
- ✨ [Breadcrumbs](https://mui.com/joy-ui/react-breadcrumbs/) component is added to Joy UI (#32697) @hbjORbj
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.10.0`

- [Grid] Prevent crash if spacing is set to zero in theme (#33777) @PunitSoniME
- [Grid] Export interface `RegularBreakpoints` to fix type error (#33751) @ZeeshanTamboli
- [Skeleton] Add `rounded` variant (#33687) @siriwatknp
- [Stepper] Fix classes for icon container (#33734) @pratikkarad
- [TableCell] Enable size prop overrides via module augmentation (#33816) @brentertz
- [Tooltip] Fix tooltip arrow css var background (#33753) @TimoWilhelm
- [useScrollTrigger] Add passive flag to scroll trigger event listener #32437 (#33749) @Dsalazar1685

### `@mui/system@5.10.0`

- Fix unnecessary styles created from `sx` (#33752) @siriwatknp
- Fix duplicated styles in Box (#33774) @iamxukai
- Don't spread props to DOM for string tags (#33761) @siriwatknp
- Add `Stack` component (#33760) @mnajdova

### `@mui/joy@5.0.0-alpha.40`

- [Stack] Add new component (#33800) @mnajdova
- [Breadcrumbs] Add `Breadcrumbs` component (#32697) @hbjORbj
- [Card] Fix wrong api description for `size` prop (#33862) @hbjORbj
- Miscellaneous fixes (#33796, #33750) @siriwatknp

### Docs

- [docs] Create, revise, and expand System "Getting started" docs (#33503) @samuelsycamore
- [docs] Test new image best practice @oliviertassinari
- [docs] Fix typo in the ClickAwayListerner name (#33813) @pawelsmigielski
- [docs] Fix link to `Basics` section in `Trap Focus` docs (#33772) @ZeeshanTamboli
- [docs] z-index added in popper when used by split button (#33763) @PunitSoniME
- [docs] Improve the guide for using @mui/base with Tailwind CSS (#33670) @mnajdova
- [docs] Fix warnings related to Next.js' links (#33693) @mnajdova
- [docs] Add notification to aggregation blogpost (#33745) @joserodolfofreitas
- [docs] Add Grid version 2 docs (#33554) @siriwatknp
- [examples] Fix `NextLinkComposedProps` type error (#33842) @adham618

### Core

- [blog] Add social card to Tenerife retreat post (#33764)
- [blog] Fix blue outline bug (#33707) @oliviertassinari
- [blog] Improve the width of the layout (#33706) @oliviertassinari@samuelsycamore
- [core] Remove unnecessary packageName attribute from pages (#33488) @cherniavskii
- [core] Remove duplicated CODE_OF_CONDUCT (#33702) @oliviertassinari
- [core] Update Playwright packages together (#33737) @michaldudak
- [website] Fix notifications not being marked as read in production (#33756) @cherniavskii

All contributors of this release in alphabetical order: @adham618, @brentertz, @cherniavskii, @Dsalazar1685, @hbjORbj, @iamxukai, @joserodolfofreitas, @michaldudak, @mnajdova, @oliviertassinari, @pawelsmigielski, @pratikkarad, @PunitSoniME, @siriwatknp, @TimoWilhelm, @ZeeshanTamboli

## 5.9.3

<!-- generated comparing v5.9.2..master -->

_Aug 1, 2022_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 🖼️ @garronej worked on improving the support of Emotion packages in the System (#33205)
- Many other 🐛 bug fixes, 📚 documentation, and ⚙️ infrastructure improvements

### `@mui/material@5.9.3`

- [Chip] Assign classnames and associated styles for `filled` variant (#33587) @hbjORbj
- [Grid] Fix `columnSpacing` and `rowSpacing` props ignore higher breakpoints with 0 (#33480) @ZeeshanTamboli
- [Input] Add the readOnly state class (#33654) @michaldudak
- [Stack] Responsive styles based on breakpoints should be in the correct order (#33552) @hbjORbj

### `@mui/system@5.9.3`

- [system] Make @emotion/\* fully supported in the System (#33205) @garronej

### `@mui/codemod@5.9.3`

- [codemod] Fix theme-spacing performance (#33691) @siriwatknp
- [codemod] Support @mui import for variant-prop (#33692) @siriwatknp

### `@mui/styled-engine-sc@5.9.3`

- [styled-engine-sc] Add missing @babel/runtime dependency (#33741) @MonstraG

### `@mui/joy@5.0.0-alpha.38`

- [Joy] Add Tabs components (#33664) @siriwatknp
- [Joy] Miscellaneous fixes (#33685) @siriwatknp
- [Joy] Update read.me content (#33643) @danilo-leal

### Docs

- [blog] Add blog post about company retreat in Tenerife 🏝 (#33566) @samuelsycamore
- [blog] Add blog post to announce the aggregation feature (#33595) @joserodolfofreitas
- [blog] Fix horizontal scrollbar with code snippets (#33648) @joserodolfofreitas
- [docs] Fix a typo in the code in `Sorting & selecting` Table demo (#33674) @mracette
- [docs] Fix en-US format in the Skeleton demo (#33699) @husseinsaad98
- [docs] Update module reference for `usePagination` (#33675) @fullstackzach
- [docs] Fix code examples in `styled` API vs `sx` prop docs (#33665) @ZeeshanTamboli
- [docs][system] Throw an informative error when `theme.vars` is used in `createTheme` and mention this in the theming docs (#33619) @hbjORbj
- [website] Remove legacy redirect @oliviertassinari
- [website] Add new legal pages (#33650) @oliviertassinari
- [website] Clarify when a license in development is required (#33668) @oliviertassinari
- [website] Update links to rows pages (#33739) @cherniavskii
- [website] Update pricing table to add aggregation and row pinning (#33659) @joserodolfofreitas

### Core

- [core] Replace `getInitialProps` with `getStaticProps` (#33684) @mnajdova
- [core] Remove accidentally added files (#33636) @michaldudak
- [core] Update packages with security issues (#33679) @michaldudak
- [core] Add React 17 nightly build (#33594) @mnajdova
- [core] Update lerna to 5.2.0 (#33635) @michaldudak
- [core] Prepare isolation of Next.js X app (#33649) @oliviertassinari
- [core] Remove thenify version override from package.json resolutions (#33638) @michaldudak
- [core] Update Node.js to 14 on CircleCI, CodeSandbox, and Netlify (#33642) @michaldudak
- [test] Replace istanbul-instrumenter-loader with babel-plugin-istanbul (#33666) @michaldudak
- [test] Run TypeScript module augmentation tests for Joy UI in CI (#33667) @ZeeshanTamboli

All contributors of this release in alphabetical order: @cherniavskii, @danilo-leal, @fullstackzach, @garronej, @hbjORbj, @husseinsaad98, @joserodolfofreitas, @michaldudak, @mnajdova, @MonstraG, @mracette, @oliviertassinari, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 5.9.2

<!-- generated comparing v5.9.1..master -->

_Jul 25, 2022_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- 🧪 Ensure all Base components are `OverridableComponent` (#33506) @michaldudak
- 🧪 Various improvements on the Material `Stack` component (#33548, #33588, #33549) @hbjORbj
- Many other 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.9.2`

- &#8203;<!-- 34 -->Revert "[Tooltip] Fix children mouse over detection (#32321)" @oliviertassinari
- &#8203;<!-- 19 -->[FormHelperText] Fix unable to create new variants (#33589) @DinhBaoTran
- &#8203;<!-- 18 -->[ImageList] Remove vertical spacing between items in masonry layout (#33593) @michaldudak
- &#8203;<!-- 13 -->[LoadingButton] Refactor duplicate code (#33570) @ZeeshanTamboli
- &#8203;<!-- 12 -->[Modal] Explain the meaning of deprecation of the BackdropComponent prop (#33591) @michaldudak
- &#8203;<!-- 11 -->[Stack] Fix unit test failure (#33588) @hbjORbj
- &#8203;<!-- 10 -->[Stack] Fix default `flexDirection` value with responsive prop (#33549) @hbjORbj
- &#8203;<!-- 09 -->[Stack] Ensure that `marginundefined` doesn't occur in styling (#33548) @hbjORbj
- &#8203;<!-- 08 -->[Tabs] Fix `indicatorColor` prop type (#33569) @ZeeshanTamboli
- &#8203;<!-- 07 -->[Tabs] Add TypeScript interface to augment tab indicator color in theme (#33333) @AHeiming

### `@mui/base@5.0.0-alpha.91`

- &#8203;<!-- 33 -->[Base] Make PopperUnstyled `component` overridable (#33573) @siriwatknp
- &#8203;<!-- 32 -->[Base] Ensure all components are OverridableComponent (#33506) @michaldudak

### `@mui/joy@5.0.0-alpha.38`

- &#8203;<!-- 17 -->[Select] Add new component in Joy (#33630) @siriwatknp
- &#8203;<!-- 15 -->[Joy] Add Text field documentation (#33430, #33631) @danilo-leal
- &#8203;<!-- 14 -->[Joy] Add menu components (#31789) @siriwatknp

### Docs

- &#8203;<!-- 31 -->[blog] Fix 404 link to Algolia docs search (dd4308d) @oliviertassinari
- &#8203;<!-- 28 -->[docs] Add accessibility tips (#33633) @siriwatknp
- &#8203;<!-- 27 -->[docs] Fix production deploy of codesandboxes (#33608) @oliviertassinari
- &#8203;<!-- 26 -->[docs] Show border on `palette.background.paper` in dark mode docs (#33611) @ZeeshanTamboli
- &#8203;<!-- 25 -->[docs] Fix typo in Joy UI dark mode page (#33620) @bairamau
- &#8203;<!-- 24 -->[docs] Final polish on Base docs - formatting and style consistency (#33156) @samuelsycamore
- &#8203;<!-- 23 -->[docs] Fix `CssBaseline` import in example code (#33614) @dd-ssc
- &#8203;<!-- 22 -->[docs] Fix Toolpad docs redirection (#33524) @bharatkashyap
- &#8203;<!-- 21 -->[docs] Fix link to Snackbar customization section in Alert docs (#33586) @ZeeshanTamboli
- &#8203;<!-- 20 -->[docs] Fix `placement choices` typo in Tooltip docs (#33571) @MonstraG
- &#8203;<!-- 05 -->[website] Update home page's sponsor grid (#33528) @danilo-leal
- &#8203;<!-- 04 -->[website] Add Vytautas to the about page (#33567) @bytasv
- &#8203;<!-- 03 -->[website] Improve newsletter input design (#33585) @danilo-leal
- &#8203;<!-- 02 -->[website] Add YouTube link to footer (#33580) @gerdadesign
- &#8203;<!-- 01 -->[website] Clarify scope of technical support (#33435) @joserodolfofreitas

### Core

- &#8203;<!-- 30 -->[core] Swallow ad blocker fetch fail (#33617) @oliviertassinari
- &#8203;<!-- 29 -->[core] Fix dep security by resolving `thenify` to latest (#33612) @siriwatknp
- &#8203;<!-- 06 -->[test] Remove `view` option from Event in Snackbar tests (#33555) @ZeeshanTamboli

All contributors of this release in alphabetical order: @AHeiming, @bairamau, @bharatkashyap, @bytasv, @danilo-leal, @dd-ssc, @DinhBaoTran, @gerdadesign, @hbjORbj, @joserodolfofreitas, @michaldudak, @MonstraG, @oliviertassinari, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 5.9.1

<!-- generated comparing v5.9.0..master -->

_Jul 18, 2022_

A big thanks to the 17 contributors who made this release possible. This release is mainly about 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.9.1`

- &#8203;<!-- 24 -->[Autocomplete] Fix disabling component crashing when focused (#31313) @mzedel
- &#8203;<!-- 07 -->[Grid] Avoid scrollbar in demo (#33527) @oliviertassinari
- &#8203;<!-- 05 -->[Slider] Fix transition of tooltips on vertical slider (#33009) @abhinav-22-tech
- &#8203;<!-- 01 -->[TouchRipple] Fix crash on android where `event.touches` are an empty array (#32974) @lukeggchapman

### `@mui/system@5.9.1`

- &#8203;<!-- 04 -->[system] Add flag to switch negative margin approach in Grid (#33484) @siriwatknp
- &#8203;<!-- 03 -->[system] Remove needless optional chaining check in `createEmptyBreakpointObject` method (#33482) @ZeeshanTamboli

### `@mui/base@5.0.0-alpha.90`

- &#8203;<!-- 23 -->[base] Export types used by components' props (#33522) @michaldudak
- &#8203;<!-- 22 -->[base] Add missing type definitions in useControllableReducer (#33496) @michaldudak
- &#8203;<!-- 06 -->[SelectUnstyled] Do not call onChange unnecessarily (#33408) @michaldudak

### `@mui/lab@5.0.0-alpha.91`

- &#8203;<!-- 02 -->[TimelineDot] Add TimelineDotPropsColorOverrides interface to extend color options (#33466) @lolaignatova

### Docs

- &#8203;<!-- 19 -->[docs] Add note about CssBaseline in the dark mode page (#33108) @GabrielaLokelani
- &#8203;<!-- 18 -->[docs] Fix typos in the Interoperability page (#33273) @HexM7
- &#8203;<!-- 17 -->[docs] Improve the `useTheme` documentation (#33508) @rickstaa
- &#8203;<!-- 16 -->[docs] Fix 301 redirections (#33521) @oliviertassinari
- &#8203;<!-- 15 -->[docs] Link the same codesandbox as in the docs (#33472) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Fix copy search false positives (#33438) @oliviertassinari
- &#8203;<!-- 13 -->[docs] Fix typo (#33520) @aravindpanicker
- &#8203;<!-- 12 -->[docs] Update Tailwind docs to include step about updating popover containers (#33315) @ajhenry
- &#8203;<!-- 11 -->[docs] Add yarn command for Roboto font in Material UI's typography.md (#33485) @anthonypz
- &#8203;<!-- 10 -->[docs] Add new community content to the Material UI Learn page (#32927) @Nikhilthadani
- &#8203;<!-- 09 -->[examples] Change createEmotionCache to use `insertionPoint` (#32104) @ANTARES-KOR
- &#8203;<!-- 08 -->[examples] Fix error in Next.js example with @mui/styles (#33456) @paustria

### Core

- &#8203;<!-- 21 -->[core] Cleanup experiments (#33547) @siriwatknp
- &#8203;<!-- 20 -->[core] Update CHANGELOG to include pickers breaking change (#33486) @siriwatknp

All contributors of this release in alphabetical order: @abhinav-22-tech, @ajhenry, @ANTARES-KOR, @anthonypz, @aravindpanicker, @GabrielaLokelani, @HexM7, @lolaignatova, @lukeggchapman, @michaldudak, @mzedel, @Nikhilthadani, @oliviertassinari, @paustria, @rickstaa, @siriwatknp, @ZeeshanTamboli

## 5.9.0

<!-- generated comparing v5.8.7..master -->

_Jul 12, 2022_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- 🧪 Exported Grid v2 as `Unstable_Grid2` (#33479) @siriwatknp
- 📖 Added a guide for using Joy UI and Material UI together (#33396) @siriwatknp
- 🐛 Fixed a few bugs in Material UI components. Thanks to @ZeeshanTamboli, @ivan-ngchakming, and @joebingham-wk.
- ⚠️ **[BREAKING CHANGE]** Date pickers were removed from the lab. Learn how to migrate by visiting the [migration guide](https://mui.com/x/migration/migration-pickers-lab/). (#33386) @flaviendelangle
- many other 🐛 bug fixes and 📚 documentation improvements
- our documentation site is now running with React 18! (#33196) @mnajdova

### `@mui/material@5.9.0`

- [CssBaseline] Fixes in overriding style (#33338) @ZeeshanTamboli
- [Autocomplete] Remove unnecessary `clsx` wrapper for single className (#33398) @ZeeshanTamboli
- [Grid] Export new grid as unstable (#33479) @siriwatknp
- [Tooltip] Fix children mouse over detection (#32321) @ivan-ngchakming
- [TypeScript] getCssVar autocomplete for Material UI (#33464) @siriwatknp
- [TypeScript] Fix theme options components types to use `Theme` (#33434) @siriwatknp
- [TypeScript] Reexports necessary types for module augmentation (#33397) @siriwatknp
- [ScopedCssBaseline] Add sx typings (#33474) @joebingham-wk

### `@mui/system@5.9.0`

- [System] Add offset feature to Grid (#33415) @siriwatknp
- [system] Add new `Grid` implementation (#32746) @siriwatknp

### `@mui/lab@5.0.0-alpha.90`

**⚠️ Breaking changes**

- [lab] Remove the pickers (#33386) @flaviendelangle

  The pickers are moved to MUI X, check out the [migration guide](https://mui.com/x/migration/migration-pickers-lab/).

**Changes**

- [Masonry] Support rem/em values for spacing prop (#33384) @hbjORbj

### `@mui/base@5.0.0-alpha.89`

- [Base] Change the order of class names merged in useSlotProps (#33383) @michaldudak
- [ModalUnstyled] Accept callbacks in componentsProps (#33181) @michaldudak
- [SelectUnstyled] Accept callbacks in componentsProps (#33197) @michaldudak
- [TabsUnstyled] Accept callbacks in componentsProps (#33284) @michaldudak

### `@mui/joy@5.0.0-alpha.36`

- [Joy] Add guide about using Joy and Material UI together (#33396) @siriwatknp
- [Joy] Fix variants color palette regressions (#33394) @danilo-leal

### Docs

- [docs] Correcting small grammatical error (#33393) @robyyo
- [docs] Link to the correct package on Joy component pages (#33439) @cherniavskii
- [docs] Fix e2e tests (#33477) @siriwatknp
- [docs] Fix dead links (#33462) @oliviertassinari
- [docs] Cleanup the migration (#33463) @siriwatknp
- [docs] Fix broken Sponsoring services links @samuelsycamore
- [docs] Improve repo README with light/dark logos, relative links and more (#33356) @samuelsycamore
- [docs] Update links to MUI X Overview and Introduction pages (#33201) @samuelsycamore
- [docs] Update to React 18 (#33196) @mnajdova
- [docs] Simplify "Upload button" demo (#33326) @baharalidurrani
- [docs] Add "refine" demo to showcase (#33240) @omeraplak
- [docs] Add webpack alias for legacy utils package (#33376) @jgbae
- [docs] Improve external link icons synonyms (#33257) @davidgarciab
- [examples] Update Base UI with Tailwind CSS to use the latest versions of the dependencies (#33401) @mnajdova
- [examples] Add Base UI example (#33154) @siriwatknp

### Core

- [core] Fix @mui/monorepo regression for the import of the docs infra (#33390) @Janpot
- [core] Remove old babel resolve rule (#33432) @oliviertassinari
- [website] Shorten the plan descriptions on the pricing page (#32984) @joserodolfofreitas
- [website] Link EULA in the license quantity section (#33292) @oliviertassinari

All contributors of this release in alphabetical order: @baharalidurrani, @cherniavskii, @danilo-leal, @davidgarciab, @flaviendelangle, @hbjORbj, @ivan-ngchakming, @Janpot, @jgbae, @joebingham-wk, @joserodolfofreitas, @michaldudak, @mnajdova, @oliviertassinari, @omeraplak, @robyyo, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 5.8.7

<!-- generated comparing v5.8.6..master -->

_Jul 4, 2022_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

- 🐛 Fixed an issue causing TypeScript errors when building a project with Material UI v5.8.6 (@michaldudak)
- 🐛 Fixed a few bugs in Material UI components. Thanks @henriqueholtz, @jake-collibra, @MattiasMartens and @TimoWilhelm!
- many other 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.8.7`

- [Autocomplete] Add some missing props in `useAutocomplete` (#33269) @henriqueholtz
- [Autocomplete] Extend `componentsProps` to include `popper` and `popupIndicator` slots (#33283) @jake-collibra
- [Select] Annotate empty string as valid value prop (#33088) @MattiasMartens
- [SnackbarContent] Fix message text color with css var provider (#33285) @TimoWilhelm

### `@mui/styled-engine@5.8.7`

- [styled-engine] Add missing type dependency on csstype (#33310) @Methuselah96

### `@mui/system@5.8.7`

- [system] Simplify theme input types for `CssVarsProvider` (#33381) @siriwatknp
- [system] Export required types (#33324) @michaldudak

### `@mui/joy@5.0.0-alpha.35`

- [Joy] Add radio button documentation (#33254) @siriwatknp
- [Joy] Add switch documentation (#33302) @siriwatknp
- [Joy] Batch a couple of documentation refinements (#33158)
- [Joy] Enable Joy and Material UI compatibility (#33379) @siriwatknp

### `@mui/base@5.0.0-alpha.88`

- [base] Remove a type incompatible with TypeScript 3.5 (#33361) @michaldudak
- [BadgeUnstyled] Export BadgeUnstyledOwnProps interface to fix typescript compiler error (#33314) @aaronlademann-wf
- [TablePaginationUnstyled] Accept callbacks in componentsProps (#33309) @michaldudak

### Docs

- [docs] Fix Link typings in the react-router example (#32308) @aaarichter
- [docs] Add caveat about class components with Tooltip (#33325) @joshkel
- [docs] Fix SEO issues (#33288) @oliviertassinari
- [docs] Fix Slider's "player" demo (#33267) @xlianghang
- [website] Link MUI Toolpad in mui.com (#33287) @oliviertassinari

All contributors of this release in alphabetical order: @aaarichter, @aaronlademann-wf, @danilo-leal, @henriqueholtz, @jake-collibra, @joshkel, @MattiasMartens, @Methuselah96, @michaldudak, @oliviertassinari, @siriwatknp, @TimoWilhelm, @xlianghang

## 5.8.6

<!-- generated comparing v5.8.5..master -->

_Jun 27, 2022_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

- ⚒️ Fixed React 18 issues in few components
- 🚀 Improved the TypeScript augmentation when using CSS variables with `@mui/material`
- many other 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.8.6`

- &#8203;<!-- 27 -->[Alert] Add support for CSS vars (#32624) @haneenmahd
- &#8203;<!-- 26 -->[Alert] Use `getContrastText` for filled variant font color (#29813) @SamoraMabuya

  Note: The color of the text in the warning contained `Alert` in dark mode was changed to black in order to improve the color contrast ratio

- &#8203;<!-- 11 -->[OutlinedInput] Fix `ownerState` undefined in theme style overrides (#33241) @siriwatknp
- &#8203;<!-- 08 -->[Tabs] Fix crash when used with React 18 & Suspense (#33277) @mnajdova
- &#8203;<!-- 05 -->[TypeScript] Add CSS vars type augmentation for Material UI (#33211) @siriwatknp

### `@mui/system@5.8.6`

- &#8203;<!-- 09 -->[system] Add enableColorScheme option to getInitColorSchemeScript (#33261) @siriwatknp

### `@mui/utils@5.8.6`

- &#8203;<!-- 04 -->[utils] Allow state prefix to be configurable (#32972) @siriwatknp

### `@mui/base@5.0.0-alpha.87`

- &#8203;<!-- 25 -->[base] Improve the return type of useSlotProps (#33279) @michaldudak
- &#8203;<!-- 24 -->[base] Improve some types (#33270) @mnajdova
- &#8203;<!-- 13 -->[MenuUnstyled] Fix keyboard accessibility of menu items (#33145) @michaldudak
- &#8203;<!-- 12 -->[ModalManager] Lock body scroll when container is inside shadow DOM (#33168) @jacobweberbowery
- &#8203;<!-- 10 -->[SliderUnstyled] Use useSlotProps (#33132) @michaldudak
- &#8203;<!-- 07 -->[TextareaAutosize] Fix crash when used with React 18 & Suspense (#33238) @howlettt
- &#8203;<!-- 06 -->[TextareaAutosize] Fix warnings for too many renders in React 18 (#33253) @mnajdova

### `@mui/joy@5.0.0-alpha.34`

- &#8203;<!-- 14 -->[Joy] Add `Sheet` doc (#32820) @hbjORbj

### Docs

- &#8203;<!-- 23 -->[blog] Polish Why you should migrate to Material UI v5 today (#33244) @oliviertassinari
- &#8203;<!-- 21 -->[docs] Add note in docs about `componentsProps.root` taking precedence (#33097) @ZeeshanTamboli
- &#8203;<!-- 20 -->[docs] Remove a note about Base components being reexported from Material UI (#33265) @michaldudak
- &#8203;<!-- 19 -->[docs] Update code snippet in docs for custom color palette (#32946) @ZeeshanTamboli
- &#8203;<!-- 18 -->[docs] Fix the docs for production class generation (#31933) @Fafruch
- &#8203;<!-- 17 -->[docs] Fix internal link in Box page (#33149) @davidgarciab
- &#8203;<!-- 16 -->[docs] Badge component link in Base docs should be under Data Display section (#33249) @ZeeshanTamboli
- &#8203;<!-- 15 -->[examples] Fix comment typo (#33256) @WinmezzZ

### Core

- &#8203;<!-- 22 -->[core] Remove dead code (#33243) @oliviertassinari
- &#8203;<!-- 03 -->[website] Fix the scroll-top for all the website (#33215) @oliviertassinari
- &#8203;<!-- 02 -->[website] List new core role @oliviertassinari
- &#8203;<!-- 01 -->[website] Fix navigation menu close behavior (#33203) @oliviertassinari

All contributors of this release in alphabetical order: @davidgarciab, @Fafruch, @haneenmahd, @hbjORbj, @howlettt, @jacobweberbowery, @michaldudak, @mnajdova, @oliviertassinari, @SamoraMabuya, @siriwatknp, @WinmezzZ, @ZeeshanTamboli

## 5.8.5

<!-- generated comparing v5.8.4..master -->

_Jun 20, 2022_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Added support for CSS variables in the `Avatar` component and the `SpeedDialAction` component respectively by @vicasas and @gin1314
- many other 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.8.5`

- &#8203;<!-- 30 -->[Avatar] Add support for CSS variables (#32499) @vicasas
- &#8203;<!-- 19 -->[Dialog] Fix broken styles if `maxWidth` is set to `false` (#32987) @kmurgic
- &#8203;<!-- 04 -->[SpeedDialAction] Add support for CSS variables (#32608) @gin1314
- &#8203;<!-- 02 -->[Tabs] Increment scroll of the minimum amount possible (#33103) @oliviertassinari

### `@mui/codemod@5.8.5`

- &#8203;<!-- 24 -->[codemod] Preserve comments within jss-to-tss-react (#33170) @ryancogswell

### `@mui/lab@5.0.0-alpha.87`

- &#8203;<!-- 06 -->[Masonry] Fix flickering when used with React 18 (#33163) @mnajdova

### `@mui/base@5.0.0-alpha.86`

- &#8203;<!-- 29 -->[BadgeUnstyled] Accept callbacks in componentsProps (#33176) @michaldudak
- &#8203;<!-- 25 -->[ButtonUnstyled] Use useSlotProps (#33096) @michaldudak
- &#8203;<!-- 11 -->[FormControlUnstyled] Accept callbacks in componentsProps (#33180) @michaldudak
- &#8203;<!-- 10 -->[InputUnstyled] Use useSlotProps (#33094) @michaldudak
- &#8203;<!-- 05 -->[ModalUnstyled] Define ownerState and slot props' types (#32901) @michaldudak
- &#8203;<!-- 03 -->[SwitchUnstyled] Use useSlotProps (#33174) @michaldudak

### `@mui/joy@5.0.0-alpha.33`

- &#8203;<!-- 09 -->[Joy] Add Checkbox documentation (#33171) @siriwatknp
- &#8203;<!-- 08 -->[Joy] Add List documentation (#33120) @siriwatknp
- &#8203;<!-- 07 -->[Joy] Make slider displays Joy classname (#33051) @siriwatknp

### Docs

- &#8203;<!-- 28 -->[blog] Update Blogpost to clear confusion on "no impact" disclaimer. (#33131) @joserodolfofreitas
- &#8203;<!-- 27 -->[blog] Add post about v5 Migration guide update (#33063) @samuelsycamore
- &#8203;<!-- 26 -->[blog] Fix display on Safari (#33102) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Add guide on how to use Base UI with Tailwind CSS (#33100) @mnajdova
- &#8203;<!-- 17 -->[docs] Improve Joy template UX (#33159) @siriwatknp
- &#8203;<!-- 16 -->[docs] Update Shadow DOM guide (#33160) @cherniavskii
- &#8203;<!-- 15 -->[docs] Fix SEO regressions (#33106) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Add job ad in table of content (#33143) @mnajdova
- &#8203;<!-- 13 -->[docs] Add customization as a value proposition (#33014) @oliviertassinari
- &#8203;<!-- 12 -->[examples] Add example using nextjs & @mui/styles as a starter for the migration to v5 (#33005) @mnajdova
- &#8203;<!-- 01 -->[website] Replace Airtable with Ashby links for applying to a opened position (#33193) @DanailH

### Core

- &#8203;<!-- 31 -->[core] Add CSS variables support for Material UI components (#32835) @siriwatknp
- &#8203;<!-- 23 -->[core] Add name to workspace root package.json (#33226) @Janpot
- &#8203;<!-- 22 -->[core] Update bug template with generic instruction (#33153) @joserodolfofreitas
- &#8203;<!-- 21 -->[core] Remove dead and redundant code (#33125) @oliviertassinari
- &#8203;<!-- 20 -->[core] Improve inline code rendering within the details tag (#33086) @Harmouch101

All contributors of this release in alphabetical order: @cherniavskii, @DanailH, @gin1314, @Harmouch101, @Janpot, @joserodolfofreitas, @kmurgic, @michaldudak, @mnajdova, @oliviertassinari, @ryancogswell, @samuelsycamore, @siriwatknp, @vicasas

## 5.8.4

<!-- generated comparing v5.8.3..master -->

_Jun 14, 2022_

A big thanks to the 24 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Added support for custom breakpoints in the `Grid` component by @boutahlilsoufiane
- 📚 Added guide on how to use Material UI with Shadow DOM by @cherniavskii
- many other 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.8.4`

- &#8203;<!-- 36 -->[Button] Add missing classes in `ButtonClasses` type (#33040) @ZeeshanTamboli
- &#8203;<!-- 20 -->[Grid] Fix prop-type key regression (#33123) @oliviertassinari
- &#8203;<!-- 19 -->[Grid] Support custom breakpoints (#31998) @boutahlilsoufiane
- &#8203;<!-- 18 -->[Grow] Limit CSS transition bug workaround to Safari 15.4 only (#32996) @igordanchenko
- &#8203;<!-- 17 -->[Hidden] Remove dependency on hoist-non-react-statics (#33015) @oliviertassinari
- &#8203;<!-- 12 -->[Link] Add support for CSS variables (#33036) @winderica
- &#8203;<!-- 07 -->[Popover] Export `getOffsetTop` & `getOffsetLeft` from Popover's index and add typings (#32959) @rart
- &#8203;<!-- 06 -->[Slider] Fix SliderValueLabelProps type (#32895) @oliviertassinari
- &#8203;<!-- 05 -->[Snackbar] Remove `RTL` direction specific logic (#32808) @aaarichter
- &#8203;<!-- 04 -->[StepIcon] Fix text centering when changing browser font size (#32706) @alansouzati
- &#8203;<!-- 02 -->[Tabs] Scroll by width of the first visible tab if only one tab is partially visible (#32778) @frankkluijtmans

### `@mui/system@5.8.4`

- &#8203;<!-- 38 -->[Stack, system] Apply correct responsive styles if any custom breakpoints are provided (#32913) @ZeeshanTamboli
- &#8203;<!-- 03 -->[system] Fix missing typings for ColorFormat (#32417) @l-zoy

### `@mui/codemod@5.8.4`

- &#8203;<!-- 35 -->[codemod] Add support for `@mui/styles/makeStyles` imports (#32962) @joshkel

### `@mui/lab@5.0.0-alpha.86`

- &#8203;<!-- 08 -->[pickers] Fix broken ref forwarding (#33107) @oliviertassinari
- &#8203;<!-- 13 -->[lab] Fix React's `forwardRef` warning when importing from the index (#33134) @mnajdova

### `@mui/base@5.0.0-alpha.85`

- &#8203;<!-- 11 -->[MenuUnstyled] Accept callbacks in componentsProps (#32997) @michaldudak
- &#8203;<!-- 10 -->[ModalUnstyled] Fix errors from the W3C validator about incorrect aria-hidden attribute on some elements (#30920) @mkrtchian
- &#8203;<!-- 09 -->[ModalUnstyled] Fix behavior of not respecting props ariaHidden value (#32055) @tech-meppem

### `@mui/joy@5.0.0-alpha.32`

- &#8203;<!-- 16 -->[Joy] Miscellaneous card fixes (#33129) @siriwatknp
- &#8203;<!-- 15 -->[Joy] Miscellaneous fixes (#33073) @siriwatknp
- &#8203;<!-- 14 -->[Joy] Add typography and link docs (#33047) @siriwatknp

### Docs

- &#8203;<!-- 40 -->[Contributing.md] Local install instructions (#32975) @Moizsohail
- &#8203;<!-- 32 -->[docs] Add responsive AppBar with drawer (#32769) @dvlprAlamin
- &#8203;<!-- 31 -->[docs] Move codesandbox to MUI org (#33122) @oliviertassinari
- &#8203;<!-- 30 -->[docs] Add Shadow DOM guide (#33007) @cherniavskii
- &#8203;<!-- 29 -->[docs] Fix typo in Material UI overview page (#33087) @oliviertassinari
- &#8203;<!-- 28 -->[docs] Miscellaneous fixes in `Base UI` docs (#33091) @ZeeshanTamboli
- &#8203;<!-- 27 -->[docs] Fix GitHub capitalization (#33071) @oliviertassinari
- &#8203;<!-- 26 -->[docs] Fix a typo in `InputUnstyled` docs (#33077) @ZeeshanTamboli
- &#8203;<!-- 25 -->[docs] Add notification for Joy blog post (#33059) @siriwatknp
- &#8203;<!-- 24 -->[docs] Improve aspect ratio docs and integration (#33065) @siriwatknp
- &#8203;<!-- 34 -->[docs] Update code block copy label (#33128) @siriwatknp
- &#8203;<!-- 23 -->[docs] Fix typo in Autocomplete CSS API (#32838) @KeaghanKennedy
- &#8203;<!-- 22 -->[docs] Improvements for Radio Group Rating Docs (#32843) @Kai-W
- &#8203;<!-- 21 -->[docs] Enable Joy pages (#33064) @siriwatknp
- &#8203;<!-- 02 -->[website] Add Joy UI to the pricing page (#33099) @danilo-leal
- &#8203;<!-- 01 -->[website] Clarify the pricing a bit (#33069) @oliviertassinari

### Core

- &#8203;<!-- 39 -->yarn proptypes @oliviertassinari
- &#8203;<!-- 34 -->[core] Update dependencies to fix security vulnerabilities (#33095) @michaldudak
- &#8203;<!-- 33 -->[core] Import new line convention (#33068) @oliviertassinari
- &#8203;<!-- 37 -->[core] Make repository configurable in changelog script (#33130) @Janpot

All contributors of this release in alphabetical order: @aaarichter, @alansouzati, @boutahlilsoufiane, @cherniavskii, @danilo-leal, @dvlprAlamin, @frankkluijtmans, @igordanchenko, @Janpot, @joshkel, @Kai-W, @KeaghanKennedy, @l-zoy, @michaldudak, @mkrtchian, @mnajdova, @Moizsohail, @oliviertassinari, @pushys, @rart, @siriwatknp, @tech-meppem, @winderica, @ZeeshanTamboli

## 5.8.3

<!-- generated comparing v5.8.2..master -->

_Jun 7, 2022_

A big thanks to the 15 contributors who made this release possible.
This release is mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.8.3`

- [Alert] Constrain message width and allow overflow (#32747) @Janpot
- [Checkbox] Add support for CSS variables (#32579) @haneenmahd
- [Slider] Fix positioning of tooltips on vertical slider (#32919) @abhinav-22-tech

### `@mui/system@5.8.3`

- [system] Configurable attributes for libraries (#32971) @siriwatknp

### `@mui/codemod@5.8.3`

- [codemod] Fix infinite loop in jss-to-tss-react and add TODO (#33048) @ryancogswell

### `@mui/lab@5.0.0-alpha.85`

- [pickers] Add deprecations when importing pickers from the lab (#32950) @flaviendelangle

### `@mui/joy@5.0.0-alpha.31`

- [Joy] Add `Slider` component and demos (#32694) @hbjORbj
- [Joy] Add articles about customization approaches (#32887) @siriwatknp
- [Joy] Add automatic adjustment page to core features (#32980) @siriwatknp
- [Joy] Add docs about dark mode (#33002) @siriwatknp
- [Joy] Add template UIs & first look blog post (#32791) @danilo-leal

### `@mui/base@5.0.0-alpha.84`

- [base] Remove @mui/system in tests (#32945) @kevinji
- [ButtonUnstyled] Accept callbacks in componentsProps (#32991) @michaldudak
- [SwitchUnstyled] Accept callbacks in componentsProps (#32993) @michaldudak
- [TablePaginationUnstyled] Define ownerState and slot props' types (#32905) @michaldudak
- [TabPanelUnstyled] Define ownerState and slot props' types (#32928) @michaldudak
- [TabsListUnstyled] Define ownerState and slot props' types (#32925) @michaldudak

### Docs

- [blog] Fix anchor link scroll (#32994) @oliviertassinari
- [docs] Add "Migration" section to sidebar and revise v4-v5 content (#32740) @samuelsycamore
- [docs] Add What doesn't count as a breaking change? (#32850) @oliviertassinari
- [docs] Fix 301 link @oliviertassinari
- [docs] Fix icon color in `BadgeUnstyled` docs (#32976) @ZeeshanTamboli
- [docs] Improve product identifier (#32707) @danilo-leal
- [docs] Improve UX with back to top (#32896) @oliviertassinari
- [docs] Polish overview page to Material UI (#32954) @oliviertassinari
- [docs] Redirect older URLs (#33037) @oliviertassinari
- [docs] Remove pickers page from the Lab section (#32961) @DanailH
- [docs] Show product identifier on updated MUI X Introduction pages (#32966) @samuelsycamore
- [docs] Throw on 301 links (#32939) @oliviertassinari
- [website] Add Gerda to the about page (#33038) @danilo-leal
- [website] Polish the pricing page (#32811) @oliviertassinari
- [website] Remove unnecessary `address` dependency (#32957) @michaldudak

### Core

- [core] Improve icon synonyms (#32742) @oliviertassinari
- [core] Prepare Next.js config for React 18 (#32963) @michaldudak
- [core] Remove dead logic (#32940) @oliviertassinari
- [core] Update dependencies to fix security vulnerabilities (#32947) @michaldudak
- Add security link to README for Tidelift @mbrookes

All contributors of this release in alphabetical order: @abhinav-22-tech, @DanailH, @danilo-leal, @flaviendelangle, @haneenmahd, @hbjORbj, @Janpot, @kevinji, @mbrookes, @michaldudak, @oliviertassinari, @ryancogswell, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 5.8.2

<!-- generated comparing v5.8.1..master -->

_May 30, 2022_

A big thanks to the 8 contributors who made this release possible. Here are some highlights ✨:

- 🐛 bug fixes and 📚 documentation improvements.

### `@mui/system@5.8.2`

- &#8203;<!-- 04 -->[system] Add `getColorSchemeSelector` util (#32868) @siriwatknp

### `@mui/lab@5.0.0-alpha.84`

- &#8203;<!-- 07 -->[Masonry] Place items to the left when there are less objects than specified in `column` prop (#32873) @hbjORbj

### `@mui/base@5.0.0-alpha.83`

- &#8203;<!-- 24 -->[BadgeUnstyled] Define ownerState and slot props' types (#32750) @michaldudak
- &#8203;<!-- 06 -->[SliderUnstyled] Define ownerState and slot props' types (#32739) @michaldudak
- &#8203;<!-- 05 -->[SwitchUnstyled] Define ownerState and slot props' types (#32573) @michaldudak
- &#8203;<!-- 03 -->[TabsUnstyled] Define ownerState and slot props' types (#32918) @michaldudak
- &#8203;<!-- 02 -->[TabUnstyled] Define ownerState and slot props' types (#32915) @michaldudak

### `@mui/joy@5.0.0-alpha.30`

- &#8203;<!-- 13 -->[Joy] use `textColor` prop for Typography and Link (#32938) @siriwatknp
- &#8203;<!-- 12 -->[Joy] Make variants for more flexible (#32931) @siriwatknp
- &#8203;<!-- 11 -->[Joy] Improve automatic adjustment (#32923) @siriwatknp
- &#8203;<!-- 10 -->[Joy] Add `Chip` doc (#32819) @hbjORbj
- &#8203;<!-- 09 -->[Joy] Add `AspectRatio` demos (#32848) @siriwatknp
- &#8203;<!-- 08 -->[Joy] Fix wrong urls (#32883) @siriwatknp

### Docs

- &#8203;<!-- 24 -->[docs] Iterate on the job ad for React engineer in Core (#32900) @mnajdova
- &#8203;<!-- 23 -->[blog] Fix avatar image resolution (#32890) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Link the first page of the product (#32943) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Batch small changes (#32170) @michaldudak
- &#8203;<!-- 17 -->[docs] Allow function prop to return undefined (#32766) @m4theushw
- &#8203;<!-- 16 -->[docs] Fix wrong link to Material Icons (#32847) @oliviertassinari
- &#8203;<!-- 15 -->[docs] Fix ClassNameGenerator content (#32800) @siriwatknp
- &#8203;<!-- 14 -->[docs] Fix navigation links (#32851) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Document the `size` prop for InputLabel (#32936) @romelperez
- &#8203;<!-- 21 -->[docs] Add note about transparent background on the outlined Alert variant (#32810) @aaarichter
- &#8203;<!-- 01 -->[website] Update the careers's page with the new roles (#32535) @oliviertassinari

### Core

- &#8203;<!-- 22 -->[core] Improve the incomplete issues workflow (#32878) @mnajdova
- &#8203;<!-- 21 -->[core] Add CI check that the PR has label (#32886) @mnajdova
- &#8203;<!-- 20 -->[core] Avoid leaking @babel/runtime (#32874) @oliviertassinari

All contributors of this release in alphabetical order: @aaarichter, @hbjORbj, @m4theushw, @michaldudak, @mnajdova, @oliviertassinari, @romelperez, @siriwatknp

## 5.8.1

<!-- generated comparing v5.8.0..master -->

_May 23, 2022_

A big thanks to the 21 contributors who made this release possible. Here are some highlights ✨:

- 💅 Added CSS variables support for two more Material UI components by @diggis00 and @alisasanib
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.8.1`

- &#8203;<!-- 33 -->[Alert] Fix missing `ownerState` on the `action` slot (#32801) @mnajdova
- &#8203;<!-- 20 -->[Fab] Make the `color` prop type extendable (#31830) @paales
- &#8203;<!-- 14 -->[ListItemButton] Render as link if href specified (#32403) @o-dubrovskyi
- &#8203;<!-- 13 -->[Paper] Add support for CSS variables (#32570) @diggis00
- &#8203;<!-- 11 -->[Radio] Add support for CSS variables (#32599) @alisasanib
- &#8203;<!-- 10 -->[Slider] Prevent rendering for marks that are out of the min & max bounds (#32436) @abriginets
- &#8203;<!-- 09 -->[Slider] Slider having marks should be customizable in theme (#32816) @ZeeshanTamboli
- &#8203;<!-- 03 -->[TouchRipple] Allows call imperative methods without event (#31955) @alexfauquette

### `@mui/system@5.8.1`

- &#8203;<!-- 07 -->[system] Simplify stylesheet injection logic (#32869) @siriwatknp
- &#8203;<!-- 06 -->[system] Fix color scheme specificity (#32628) @siriwatknp
- &#8203;<!-- 05 -->[system] Fix `borderRadius` errors when used inside `CssVarsProvider` (#32817) @mnajdova
- &#8203;<!-- 04 -->[system] Fix toolbar media query mixin getting merged in wrong order (#32713) @ZeeshanTamboli

### `@mui/lab@5.0.0-alpha.83`

- &#8203;<!-- 15 -->[lab] Add missing `peerDependencies` (#32623) @nate-summercook
- &#8203;<!-- 12 -->[pickers] Update @mui/x-date-pickers to be usable with React 18 (#32828) @flaviendelangle

### `@mui/base@5.0.0-alpha.82`

- &#8203;<!-- 08 -->[SliderUnstyled] Fix `disabledSwap` not being respected in `onChangeCommitted` (#32647) @JeanPetrov

### `@mui/joy@5.0.0-alpha.29`

- &#8203;<!-- 19 -->[Joy] Show Joy pages on master (#32866) @siriwatknp
- &#8203;<!-- 18 -->[Joy] Add an overview page (#32836) @danilo-leal
- &#8203;<!-- 17 -->[Joy] Add doc for the card components (#32825) @siriwatknp
- &#8203;<!-- 16 -->[Joy] Miscellaneous fixes (#32815) @siriwatknp

### Docs

- &#8203;<!-- 31 -->[docs] Simplify header DOM structure (#32844) @oliviertassinari
- &#8203;<!-- 30 -->[docs] Fix CodeSandbox & StackBlitz generation (#32726) @siriwatknp
- &#8203;<!-- 29 -->[docs] Fix urls to columns pages in pricing table (#32842) @alexfauquette
- &#8203;<!-- 28 -->[docs] Fix Tailwind CSS integration docs (#32512) @robertwt7
- &#8203;<!-- 27 -->[docs] Fixed wrong command for the `link-underline-hover` codemod (#32793) @veronikaslc
- &#8203;<!-- 26 -->[docs] Fixed broken link on the icons page (#32780) @SamuelMaddox
- &#8203;<!-- 25 -->[docs] Add "back to top" button (#30441) @VibhorJaiswal
- &#8203;<!-- 24 -->[docs] Fix typo in notifications @mbrookes
- &#8203;<!-- 32 -->[docs] New WAI-ARIA guidelines location (#32865) @oliviertassinari
- &#8203;<!-- 23 -->[docs] Mention the ESLint plugin for detecting unused classes in tss-react (#32666) @garronej
- &#8203;<!-- 22 -->[docs] Update `useAutocomplete` demos to use `Mui-focused` class (#32757) @ZeeshanTamboli
- &#8203;<!-- 21 -->[examples] Fix `NextLinkComposedProps` gives a TypeScript error (#32655) @ZeeshanTamboli
- &#8203;<!-- 01 -->[website] Add Pedro to About Us page (#32803) @apedroferreira

### Core

- &#8203;<!-- 32 -->[core] Upgrade MUI X dependency (#32824) @oliviertassinari
- &#8203;<!-- 02 -->[typescript] Allow module augmentation for `Mixins` (#32798) @mnajdova

All contributors of this release in alphabetical order: @abriginets, @alexfauquette, @alisasanib, @apedroferreira, @danilo-leal, @diggis00, @flaviendelangle, @garronej, @JeanPetrov, @mbrookes, @mnajdova, @nate-summercook, @o-dubrovskyi, @oliviertassinari, @paales, @robertwt7, @SamuelMaddox, @siriwatknp, @veronikaslc, @VibhorJaiswal, @ZeeshanTamboli

## 5.8.0

<!-- generated comparing v5.7.0..master -->

_May 17, 2022_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 🚀 [Blog post](https://mui.com/blog/premium-plan-release/) for announcing the release of the Premium plan of MUI X is out thanks to @joserodolfofreitas.
- Codemod for `jss` to `tss-react` migration is out thanks to @ryancogswell
- And more 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.8.0`

- &#8203;<!-- 37 -->[Autocomplete] Fix `getInputProps` TypeScript return type (#32730) @ZeeshanTamboli
- &#8203;<!-- 36 -->[Autocomplete] Forward props to renderTags() (#32637) @emlai
- &#8203;<!-- 35 -->[Badge] Fix TypeScript error when adding style overrides for Badge (#32745) @ZeeshanTamboli
- &#8203;<!-- 09 -->[Menu] Fix context menu open position (#32661) @oliviertassinari

### `@mui/system@5.8.0`

- &#8203;<!-- 05 -->[system] Add `Container` component and `createContainer` factory (#32263) @mnajdova

### `@mui/base@5.0.0-alpha.81`

- &#8203;<!-- 15 -->[InputUnstyled] Support callbacks in componentsProps (#32271) @michaldudak
- &#8203;<!-- 14 -->[InputUnstyled] Define ownerState and slot props' types (#32491) @michaldudak
- &#8203;<!-- 08 -->[MenuUnstyled] Demos improvements (#32714) @michaldudak
- &#8203;<!-- 07 -->[OptionUnstyled] Define ownerState and slot props' types (#32717) @michaldudak

### `@mui/joy@5.0.0-alpha.28`

- &#8203;<!-- 13 -->[Joy] Add Badge doc (#32790) @siriwatknp
- &#8203;<!-- 12 -->[Joy] Add global variant feature page (#32695) @siriwatknp
- &#8203;<!-- 11 -->[Joy] Add avatar page (#32711) @siriwatknp

### `@mui/codemod@5.8.0`

- &#8203;<!-- 33 -->[codemod] Add jss to tss-react codemod (#31802) @ryancogswell

### Docs

- &#8203;<!-- 34 -->[blog] Add release post for MUI X Premium (#32720) @joserodolfofreitas
- &#8203;<!-- 29 -->[docs] Fix wrong code snippet for overriding styles in theme with a callback value (#32781) @ZeeshanTamboli
- &#8203;<!-- 28 -->[docs] Update Crowdin logo (#32782) @andrii-bodnar
- &#8203;<!-- 27 -->[docs] Improve callouts design (#32709) @danilo-leal
- &#8203;<!-- 26 -->[docs] Revise the "Understanding MUI packages" article (#32382) @danilo-leal
- &#8203;<!-- 25 -->[docs] Fix link to the material icons (#32771) @oliviertassinari
- &#8203;<!-- 24 -->[docs] Add notification for Premium release blog post (#32728) @joserodolfofreitas
- &#8203;<!-- 23 -->[docs] Base Portal style revisions and final review (#32157) @samuelsycamore
- &#8203;<!-- 22 -->[docs] Add joy to docs package.json (#32744) @siriwatknp
- &#8203;<!-- 21 -->[docs] Fix TOC-related styles not being applied when disableAd=true (#32733) @cherniavskii
- &#8203;<!-- 20 -->[docs] Add TypeScript guide on the polymorphic components (#32168) @mnajdova
- &#8203;<!-- 19 -->[docs] Fix warning mode pass to React.Fragment (#32729) @siriwatknp
- &#8203;<!-- 18 -->[docs] Revise Showcase copy for clarity + audit appList (#31946) @samuelsycamore
- &#8203;<!-- 17 -->[examples] Update remix example's tsconfig with required values (#32723) @michaldudak
- &#8203;<!-- 16 -->[examples] Update to use React 18's createRoot (#32506) @mnajdova
- &#8203;<!-- 10 -->[l10n] Fix typos and translations on arSD and arEG locales (#31848) @shadigaafar
- &#8203;<!-- 04 -->[website] Improve communication about MUI X components that are still wip (#32708) @danilo-leal
- &#8203;<!-- 03 -->[website] Remove scrollbar on x-axis (#32291) @MrHBS
- &#8203;<!-- 02 -->[website] Update the pricing page for the MUI X premium plan release (#32458) @joserodolfofreitas
- &#8203;<!-- 01 -->[website] Update sponsors (#32725) @oliviertassinari

### Core

- &#8203;<!-- 32 -->[core] Enabled Renovate's lockfile maintenance (#32635) @michaldudak
- &#8203;<!-- 31 -->[core] Extract `MuiPage` interface to separate file (#32715) @cherniavskii
- &#8203;<!-- 30 -->[core] Remove unnecessary `spacing` parameter from `createMixins` method (#32690) @ZeeshanTamboli
- &#8203;<!-- 06 -->[private-classnames] Remove package and move everything to utils (#32758) @mnajdova

All contributors of this release in alphabetical order: @andrii-bodnar, @cherniavskii, @danilo-leal, @emlai, @joserodolfofreitas, @michaldudak, @mnajdova, @MrHBS, @oliviertassinari, @ryancogswell, @samuelsycamore, @shadigaafar, @siriwatknp, @ZeeshanTamboli

## 5.7.0

<!-- generated comparing v5.6.4..master -->

_May 10, 2022_

A big thanks to the 27 contributors who made this release possible. Here are some highlights ✨:

🛠 This release is all about supporting CSS variables in many Material UI components.
Kudos to all contributors!

### `@mui/material@5.7.0`

- [StepLabel, StepIcon] Add support for CSS variables (#32609) @vicasas
- [Table, TableRow] Add support for CSS variables (#32614) @vicasas
- [AppBar] Add a logo component for the responsive app bar demo (#32374) @ameetmadan
- [Autocomplete] Fix clearing single array values (#32626) @mikepricedev
- [Autocomplete] Fix keep listbox open on left/right keys when inputValue is not empty (#31407) @alisasanib
- [Autocomplete] Add support for CSS variables (#32598) @ZeeshanTamboli
- [Autocomplete] Render `endAdornment` only when necessary (#32386) @g1eny0ung
- [ButtonGroup] Add support for CSS variables (#32498) @vicasas
- [CardActionArea] Add support for CSS variables (#32554) @vicasas
- [ClickAwayListener] Allow pointer up/down events to event handler (#32264) @vladjerca
- [CssBaseline] Add support for CSS vars (#32618) @haneenmahd
- [Dialog] Add support for CSS variables (#32555) @vicasas
- [Divider] Add support for CSS variables (#32519) @vicasas
- [Drawer] Add support for CSS variables (#32565) @nghiamvt
- [Fab] Add support for CSS variables (#32564) @alisasanib
- [FormControlLabel] Add support for CSS variables (#32588) @elliefoote
- [FormHelperText] Add support for CSS variables (#32596) @ZeeshanTamboli
- [FormLabel] Add support for CSS variables (#32602) @ZeeshanTamboli
- [Icon] Add support for CSS variables (#32595) @Jamaalwbrown
- [IconButton] Add support for CSS variables (#32590) @Ariyapong
- [ImageListItemBar] Add support for CSS variables (#32578) @vicasas
- [Input] Support CSS variables (#32128) @ivan-ngchakming
- [InputAdornment] Add support CSS variables (#32607) @vicasas
- [Link] Fix style overrides color prop (#32653) @siriwatknp
- [ListItem] Add support for CSS variables (#32580) @dan-mba
- [ListItemButton] Add support for CSS variables (#32582) @dan-mba
- [ListItemIcon] Add support for CSS variables (#32583) @dan-mba
- [ListSubheader] Add support for CSS variables (#32584) @dan-mba
- [MenuItem] Add support for CSS variables (#32561) @nghiamvt
- [MobileStepper] Add support for CSS vars (#32606) @haneenmahd
- [Modal] Add support for CSS variables (#32605) @haneenmahd
- [PaginationItem] Add support for CSS vars (#32612) @haneenmahd
- [Rating] Add support for CSS variables (#32556) @vicasas
- [Snackbar] Add support for CSS variables (#32603) @gin1314
- [SpeedDial] Add support for CSS variables (#32613) @alisasanib
- [Stepper] Export useStepperContext (#31398) @pzi
- [SvgIcon] Add support for CSS variables (#32610) @vicasas
- [TablePagination] Add support for CSS variables (#32615) @haneenmahd
- [TableSortLabel]: Add support for CSS vars (#32616) @haneenmahd
- [Tabs] Add support for CSS variables (#32547) @ZeeshanTamboli
- [ToggleButton] Add support for CSS variables (#32600) @Ariyapong
- [ToggleButtonGroup] Add support for CSS variables (#32617) @haneenmahd
- [Tooltip] Add support for CSS variables (#32594) @gin1314

### `@mui/system@5.7.0`

- [System] Support CSS variables for iframes & custom nodes (#32496) @siriwatknp

### `@mui/base@5.0.0-alpha.80`

- [ButtonUnstyled] Fix keyboard navigation on customized elements (#32204) @michaldudak

### `@mui/private-classnames@5.7.0`

- [classnames] Add new package for classnames utils (#32502) @mnajdova

### Docs

- [docs] Correct links to prevent 301 redirects (#32692) @michaldudak
- [docs] Move, split, and revise "Unstyled components" page (#32562) @samuelsycamore
- [docs] Nest `ListItemButton` in `ListItem` in the Drawer examples (#31987) @stefanprobst
- [docs] Apply callouts in the Material UI docs (#32567) @danilo-leal
- [docs] Show product identifier on new X pages (#32657) @cherniavskii
- [docs] Fix copy button childNode not found (#32652) @siriwatknp
- [docs] Split install commands in isolated code blocks (#32566) @danilo-leal
- [docs] Base Switch style revisions and final review (#32376) @samuelsycamore
- [docs] Adds Badge link to Base doc nav (#32619) @samuelsycamore
- [docs] Base Installation style revisions and final review (#32483) @samuelsycamore
- [docs] Fix broken redirection (#32581) @oliviertassinari
- [docs] Allows to use `import '<library name>'` in demonstrations (#32492) @alexfauquette
- [docs] Hide copy button on search icon dialog (#32577) @siriwatknp
- [docs] Use full API link for ThemeProvider (#32549) @jcvidiri
- [Joy] Add principles page (#32648) @siriwatknp
- [Joy] Add Button page (#32576) @siriwatknp
- [Joy] Add "Quick start" and "Tutorial" pages (#32383) @siriwatknp
- [website] Add store to the footer and "hiring" chip adjustment (#32650) @danilo-leal
- [website] Optimize conversion to store (#32646) @oliviertassinari
- [website] Remove copy button on marketing pages (#32649) @siriwatknp
- [website] Add missing space in copy label (#32638) @flaviendelangle

### Core

- [core] Security updates (#32636) @michaldudak
- [core] Fix `docs:dev` not working after upgrading `next` to 12.1.0 (#32552) @cherniavskii
- [core] Update minimist to fix security vulnerability (#32575) @michaldudak

All contributors of this release in alphabetical order: @alexfauquette, @alisasanib, @ameetmadan, @Ariyapong, @cherniavskii, @dan-mba, @danilo-leal, @elliefoote, @flaviendelangle, @g1eny0ung, @gin1314, @haneenmahd, @ivan-ngchakming, @Jamaalwbrown, @jcvidiri, @michaldudak, @mikepricedev, @mnajdova, @nghiamvt, @oliviertassinari, @pzi, @samuelsycamore, @siriwatknp, @stefanprobst, @vicasas, @vladjerca, @ZeeshanTamboli

## 5.6.4

<!-- generated comparing v5.6.3..master -->

_May 2, 2022_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

- 💅 5 Material UI components were updated to support CSS variables by @ZeeshanTamboli & @vicasas
- And more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.6.4`

- &#8203;<!-- 37 -->[Accordion] Add support for CSS variables (#32542) @ZeeshanTamboli
- &#8203;<!-- 36 -->[AvatarGroup] Add support for CSS variables (#32507) @vicasas
- &#8203;<!-- 35 -->[Badge] Add support for CSS variables (#32516) @vicasas
- &#8203;<!-- 34 -->[BottomNavigation] Add support for CSS variables (#32517) @vicasas
- &#8203;<!-- 33 -->[CircularProgress] Add support for CSS variables (#32543) @ZeeshanTamboli
- &#8203;<!-- 07 -->[FilledInput] Fix type error from undefined `color` (#32258) @hbjORbj
- &#8203;<!-- 02 -->[l10n] Fix typo in csCZ translation of Pagination component (#32509) @Martin005
- &#8203;<!-- 01 -->[Tabs] Fix `TabIndicatorProps` prop missing `sx` prop (#32503) @b-novikov-ipersonality

### `@mui/codemod@5.6.4`

- &#8203;<!-- 32 -->[codemod] Leave numeric arguments to breakpoints functions unchanged (#32426) @ryancogswell
- &#8203;<!-- 31 -->[codemod] Allow for line breaks within theme.spacing parentheses (#32432) @ryancogswell

### `@mui/joy@5.0.0-alpha.26`

- &#8203;<!-- 06 -->[Joy] Miscellaneous fixes (#32541) @siriwatknp
- &#8203;<!-- 05 -->[Joy] Add `extendSxProp` to Link (#32505) @siriwatknp
- &#8203;<!-- 04 -->[Joy] Rename variants (#32489) @siriwatknp
- &#8203;<!-- 03 -->[Joy] Add `extendTheme` (#32450) @siriwatknp

### Docs

- &#8203;<!-- 30 -->[docs] SEO fixes (#32515) @oliviertassinari
- &#8203;<!-- 29 -->[docs] Replace `Overriding nested component styles` anchor link with text (#32487) @ZeeshanTamboli
- &#8203;<!-- 28 -->[docs] Update the list of external domains (#32514) @oliviertassinari
- &#8203;<!-- 27 -->[docs] Update Material UI code snippets for React 18 (#32361) @samuelsycamore
- &#8203;<!-- 26 -->[docs] Base TextareaAutosize style revisions and final review (#32481) @samuelsycamore
- &#8203;<!-- 25 -->[docs] Base ClickAwayListener style revisions and final review (#32156) @samuelsycamore
- &#8203;<!-- 24 -->[docs] Base Button style revisions and final review (#32380) @samuelsycamore
- &#8203;<!-- 23 -->[docs] Base NoSsr style revisions and final review (#32254) @samuelsycamore
- &#8203;<!-- 22 -->[docs] Correctly capitalize Ctrl @oliviertassinari
- &#8203;<!-- 21 -->[docs] Fix styling in `Basic Popper` demo on the Base UI docs (#32488) @ZeeshanTamboli
- &#8203;<!-- 20 -->[docs] Add "Overview" page to Base docs (#32310) @samuelsycamore
- &#8203;<!-- 19 -->[docs] Add copy button to code block (#32390) @siriwatknp
- &#8203;<!-- 18 -->[docs] Base Tabs style revisions and final review (#32423) @samuelsycamore
- &#8203;<!-- 17 -->[docs] Base Popper style revisions and final review (#32412) @samuelsycamore
- &#8203;<!-- 16 -->[docs] Improve sidenav for MUI X (#32435) @oliviertassinari
- &#8203;<!-- 15 -->[docs] Don't redirect on deploy preview (#32399) @m4theushw
- &#8203;<!-- 14 -->[docs] A few SEO fixes (#32431) @oliviertassinari
- &#8203;<!-- 13 -->[docs] Update links to the new Group & Pivot pages (#32410) @flaviendelangle
- &#8203;<!-- 12 -->[docs] Support callouts (#32402) @siriwatknp
- &#8203;<!-- 11 -->[docs] Fix import path in the Snackbar article #32462 @mongolyy
- &#8203;<!-- 10 -->[docs] Fix grammar mistake in shadows.md (#32454) @HexM7
- &#8203;<!-- 09 -->[docs] Improve unstyled button docs (#32429) @oliviertassinari

### Core

- &#8203;<!-- 08 -->[experiment] Add template for testing Material UI components with CSS variables (#32500) @siriwatknp

All contributors of this release in alphabetical order: @b-novikov-ipersonality, @flaviendelangle, @hbjORbj, @HexM7, @m4theushw, @Martin005, @mongolyy, @oliviertassinari, @ryancogswell, @samuelsycamore, @siriwatknp, @vicasas, @ZeeshanTamboli

## 5.6.3

<!-- generated comparing v5.6.2..master -->

_Apr 25, 2022_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 🛠 Fixed TypeScript issue when the `fill` CSS property is used in the system (#32355) @valerii15298
- And more 🐛 bug fixes and 📚 improvements.

### `@mui/material@5.6.3`

- [BottomNavigation] Action icon `padding` fix (#32030) @abhinav-22-tech
- [Dialog] Fix `component` prop is not available in `DialogTitleProps` (#32389) @hbjORbj
- [StepContent] Fix TypeScript type of `TransitionComponent` prop (#32314) @ZeeshanTamboli

### `@mui/system@5.6.3`

- [system] Fix prop types when the `fill` CSS property is used (#32355) @valerii15298
- [system] Fix broken behavior when theme value is `zero` (#32365) @ZeeshanTamboli

### `@mui/base@5.0.0-alpha.78`

- [InputUnstyled] `multiline` property should not log DOM warnings for `maxRows` and `minRows` props (#32401) @ZeeshanTamboli

### `@mui/joy@5.0.0-alpha.25`

- [Joy] Improve theme focus to be more flexible (#32405) @siriwatknp
- [Joy] Add `Radio`, `RadioGroup` components (#32279) @siriwatknp
- [Joy] Add `Chip` component (#31983) @hbjORbj
- [Joy] Improve controls (#32267) @siriwatknp
- [Joy] Set up docs (#32370) @siriwatknp

### Docs

- [docs] Enable row reordering on the pricing page (#31875) @DanailH
- [blog] A few improvements on date picker change (#32325) @oliviertassinari
- [docs] Emphasize how to avoid failing tests when migrating from v4 to v5 (#32159) @dwjohnston
- [docs] Revise the related projects page (#32180) @danilo-leal
- [docs] Cleanup remaining @mui/styles usages (#32313) @mnajdova
- [docs] Fix sidenav mobile color (#32324) @oliviertassinari
- [docs] Base TrapFocus style revisions and final review (#32364) @samuelsycamore
- [docs] Update the README.md to better cover the different products (#32360) @samuelsycamore
- [docs] Improve the propTypes generation and API demos' links (#32295) @mnajdova
- [docs] Add ability to display a plan icon next to a page link in nav bar (#32393) @flaviendelangle
- [docs] Change label on `FormControlLabelPlacement` (#32322) @ainatenhi
- [website] Update Diamond sponsors list (#32433) @oliviertassinari
- [website] Add privacy policy link to website's footer (#32080) @danilo-leal
- [website] Remove the designer role (#32384) @danilo-leal

### Core

- [core] `yarn prettier` write @oliviertassinari
- [core] Fix changelog warning message (#32240) @praveen001
- [core] Update the proptypes scripts to support components in @mui/system (#32456) @mnajdova

All contributors of this release in alphabetical order: @abhinav-22-tech, @ainatenhi, @DanailH, @danilo-leal, @dwjohnston, @flaviendelangle, @hbjORbj, @mnajdova, @oliviertassinari, @praveen001, @samuelsycamore, @siriwatknp, @valerii15298, @ZeeshanTamboli

## 5.6.2

<!-- generated comparing v5.6.1..master -->

_Apr 18, 2022_

A big thanks to the 11 contributors who made this release possible.
This release is mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.6.2`

- &#8203;<!-- 29 -->[Autocomplete] Explain how to use getOptionLabel in free solo mode and update getOptionLabel type (#32165) @michaldudak
- &#8203;<!-- 28 -->[Badge] Fix customization of classes (#32185) @michaldudak
- &#8203;<!-- 03 -->[TextField] Add a workaround for Safari CSS transition scale bug (#32188) @igordanchenko

### `@mui/system@5.6.2`

- &#8203;<!-- 05 -->[system] Update style function to use vars automatically if available (#32244) @mnajdova

### `@mui/base@5.0.0-alpha.77`

- &#8203;<!-- 08 -->[FormControlUnstyled] Revise API (#32134) @michaldudak

### `@mui/joy@5.0.0-alpha.24`

- &#8203;<!-- 07 -->[Joy] Add `Badge` component (#31401) @hbjORbj
- &#8203;<!-- 06 -->[Joy] Fix misuse variable in `Input` (#32268) @siriwatknp

### Docs

- &#8203;<!-- 27 -->[blog] Fix images for the docs separation post (#32257) @danilo-leal
- &#8203;<!-- 25 -->[docs] Base Form Control style revisions and final review (#32309) @samuelsycamore
- &#8203;<!-- 24 -->[docs] Base TablePagination style revisions and final review (#32178) @samuelsycamore
- &#8203;<!-- 23 -->[docs] Revise the dark mode article (#32179) @danilo-leal
- &#8203;<!-- 22 -->[docs] Add `aria-label` for `IconButton` (#32276) @SiarheiBobryk
- &#8203;<!-- 21 -->[docs] Fix `borderRadius` in the docs example (#32347) @ZeeshanTamboli
- &#8203;<!-- 20 -->[docs] Fix 404 link in the code (#32323) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Sync h1 with side nav label (#32235) @oliviertassinari
- &#8203;<!-- 18 -->[docs] Fix SEO issues (#32282) @oliviertassinari
- &#8203;<!-- 17 -->[docs] Fix broken link in the test contributing guide (#32283) @sirartemis
- &#8203;<!-- 16 -->[docs] Update "How to customize" page anchor links #32315 @abaker93
- &#8203;<!-- 15 -->[docs] Mark `onBackdropClick` prop as deprecated in `Dialog`, `Modal` and `ModalUnstyled` components (#32297) @ZeeshanTamboli
- &#8203;<!-- 14 -->[docs] Link to advanced components page (#32290) @siriwatknp
- &#8203;<!-- 13 -->[docs] Sync package description with the docs (#32211) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Revise "Component theming" and "How to customize" guides (#31997) @danilo-leal
- &#8203;<!-- 11 -->[docs] Add note in the Contributing guide about linking issues to a PR (#32174) @danilo-leal
- &#8203;<!-- 10 -->[docs] Update RTL guide (#32242) @michaldudak
- &#8203;<!-- 09 -->[docs] Uniformize capitalization (#32238) @oliviertassinari
- &#8203;<!-- 02 -->[website] Improve new role template @oliviertassinari
- &#8203;<!-- 01 -->[website] Remove a gold sponsor (#32261) @hbjORbj
- &#8203;<!-- 24 -->[website] Mark DataGrid Column spanning done on Pricing page (#32305) @cherniavskii

### Core

- &#8203;<!-- 31 -->[core] Remove unecessary div (#32237) @oliviertassinari
- &#8203;<!-- 30 -->[core] Revert #32229 (#32262) @michaldudak
- &#8203;<!-- 04 -->[test] Fix running unit tests on Windows (#32260) @michaldudak

All contributors of this release in alphabetical order: @abaker93, @cherniavskii, @danilo-leal, @hbjORbj, @igordanchenko, @michaldudak, @mnajdova, @oliviertassinari, @samuelsycamore, @SiarheiBobryk, @sirartemis, @siriwatknp, @ZeeshanTamboli

## 5.6.1

<!-- generated comparing v5.6.0..master -->

_Apr 11, 2022_

A big thanks to the 8 contributors who made this release possible.
This release is mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.6.1`

- [Grow] Extend Safari CSS transition bug workaround on WebKit browsers (#32202) @igordanchenko
- [Link] Fix style overrides 5.6.0 regression (#32182) @siriwatknp
- [Select] Bug when the first child is a ListSubheader (#27299) @DouglasPds

### `@mui/base@5.0.0-alpha.76`

- [ButtonUnstyled] Allow receiving focus when disabled (#32090) @michaldudak

### Docs

- [blog] Share what's changed about the new docs structure (#32044) @danilo-leal
- [docs] Format number icons search (#32239) @oliviertassinari
- [docs] Fix small external links issue (#32212) @oliviertassinari
- [docs] Make sidenav crawlable (#32241) @oliviertassinari
- [docs] Base Badge style revisions and final review (#32098) @samuelsycamore
- [docs] Fix wrong url (#32208) @siriwatknp
- [docs] Fix date-pickers redirects (#32207) @siriwatknp
- [docs] Add notification for the doc restructure and date pickers update (#32195) @siriwatknp
- [docs] Fix 404 from `ahrefs` report (#32206) @siriwatknp
- [docs] Remove notifications temporary (#32192) @siriwatknp
- [docs] Redirect to new urls (#32048) @siriwatknp
- [docs] Update Learn page copy and resource list (#31989) @samuelsycamore
- [website] Fix wrong MUI X installation instruction link @oliviertassinari
- [website] Revise homepage copy below the hero section (#31283) @samuelsycamore
- [website] Revise homepage Hero copy for more clarity (#31212) @samuelsycamore
- [website] Give up on promoting roles in our docs @oliviertassinari

### Core

- [core] Fix misleading types range (#32236) @oliviertassinari
- [core] Small polish on the product name (#32199) @oliviertassinari

All contributors of this release in alphabetical order: @danilo-leal, @DouglasPds, @igordanchenko, @l10nbot, @michaldudak, @oliviertassinari, @samuelsycamore, @siriwatknp

## 5.6.0

<!-- generated comparing v5.5.3..master -->

_Apr 5, 2022_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 🧰 Update peer dependencies to support React 18 (#32063) @eps1lon
- 🚀 Added the experimental `CssVarsProvider` in `@mui/material` for generating theme CSS variables (#31138) @mnajdova
- 📣 Moved date and time pickers from the lab to MUI X (#31984) @flaviendelangle
- Several 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.6.0`

- &#8203;<!-- 25 -->[CssVarsProvider] Add experimental CssVarsProvider in @mui/material (#31138) @mnajdova
- &#8203;<!-- 06 -->[Link] Fix `sx` color to support callback (#32123) @siriwatknp
- &#8203;<!-- 05 -->[Link] Fix color transformation (#32045) @siriwatknp
- &#8203;<!-- 04 -->[ListItemButton] Specified width so that text would ellide (#32083) @MatthijsMud
- &#8203;<!-- 03 -->[TablePagination] Fixed the etEE locale (#32052) @raigoinabox

### `@mui/base@5.0.0-alpha.75`

- &#8203;<!-- 31 -->[Badge] Simplify unstyled API (#31974) @michaldudak

### `@mui/codemod@5.6.0`

- &#8203;<!-- 29 -->[codemod] Add v5.0.0/date-pickers-moved-to-x codemod (#31373) @flaviendelangle

### `@mui/lab@5.0.0-alpha.76`

- &#8203;<!-- 24 -->[DatePicker] Remove date and time pickers from the lab (#31984) @flaviendelangle

### `@mui/joy@5.0.0-alpha.22`

- &#8203;<!-- 07 -->[Joy] Add `Card` components (#32027) @siriwatknp

### Docs

- &#8203;<!-- 30 -->[blog] New article for the date pickers migration to X (#31831) @flaviendelangle
- &#8203;<!-- 33 -->[docs] Base Menu style revisions and final review (#32097) @samuelsycamore
- &#8203;<!-- 32 -->[docs] Base Select style revisions and final review (#32095) @samuelsycamore
- &#8203;<!-- 31 -->[docs] Base Input style revisions and final review (#32096) @samuelsycamore
- &#8203;<!-- 30 -->[docs] Base Slider style revisions and final review (#32140) @samuelsycamore
- &#8203;<!-- 29 -->[docs] Base Modal style revisions and final review (#32093) @samuelsycamore
- &#8203;<!-- 28 -->[docs] Add page for CSS variables support in @mui/material (#32050) @mnajdova
- &#8203;<!-- 27 -->[docs] Add TSS support for theme style overrides (#31918) @garronej
- &#8203;<!-- 23 -->[docs] Simplify customization examples in ButtonUnstyled demos (#32092) @michaldudak
- &#8203;<!-- 22 -->[docs] Fix linking issues for the redirects (#32101) @siriwatknp
- &#8203;<!-- 21 -->[docs] Create the FormControl page (#32073) @michaldudak
- &#8203;<!-- 20 -->[docs] Remove trap-focus from the navigation (#32079) @psjishnu
- &#8203;<!-- 19 -->[docs] Add date-pickers product identifier (#32076) @siriwatknp
- &#8203;<!-- 18 -->[docs] Move SwitchUnstyled docs to the Base space (#31964) @michaldudak
- &#8203;<!-- 17 -->[docs] Add docs page for unstyled popper (#31813) @siriwatknp
- &#8203;<!-- 16 -->[docs] Copy TextareaAutosize docs to Base (#32034) @michaldudak
- &#8203;<!-- 15 -->[docs] Add react-hook-form-mui to Complementary projects #32015 @TkaczykAdam
- &#8203;<!-- 14 -->[docs] Improve the translation experience (#32021) @oliviertassinari
- &#8203;<!-- 13 -->[docs] Add small size Select demo (#32060) @ivan-ngchakming
- &#8203;<!-- 12 -->[docs] Correct typos (#32029) @apeltop
- &#8203;<!-- 11 -->[docs] Create SliderUnstyled docs (#31850) @michaldudak
- &#8203;<!-- 10 -->[docs] Create TablePaginationUnstyled docs (#32018) @michaldudak
- &#8203;<!-- 09 -->[docs] Move SelectUnstyled docs to the Base space (#31816) @michaldudak
- &#8203;<!-- 08 -->[docs] Create the TabsUnstyled docs (#32023) @michaldudak
- &#8203;<!-- 02 -->[website] The studio finally has a name, use it (#32105) @oliviertassinari
- &#8203;<!-- 01 -->[website] Disable job ad @oliviertassinari

### Core

- &#8203;<!-- 28 -->[core] Update peer deps to support React 18 (#32063) @eps1lon
- &#8203;<!-- 27 -->[core] Fix running docs:api on Windows (#32091) @michaldudak
- &#8203;<!-- 26 -->[core] Fix api build script for Base UI (#32081) @siriwatknp

All contributors of this release in alphabetical order: @apeltop, @eps1lon, @flaviendelangle, @garronej, @ivan-ngchakming, @m4theushw, @MatthijsMud, @michaldudak, @mnajdova, @oliviertassinari, @psjishnu, @raigoinabox, @samuelsycamore, @siriwatknp, @TkaczykAdam

## 5.5.3

<!-- generated comparing v5.5.2..master -->

_Mar 28, 2022_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- ♿️ improved the a11y on some docs demos
- Several 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.5.3`

- &#8203;<!-- 32 -->[ButtonBase] Start ripple only after mount (#31950) @m4theushw
- &#8203;<!-- 11 -->[FormControlLabel] Fix label prop type to be in-line with other label prop types (#31139) @jannes-io
- &#8203;<!-- 10 -->[Grow] Add a workaround for Safari 15.4 CSS transition bug (#31975) @igordanchenko

### `@mui/codemod@5.5.3`

- &#8203;<!-- 31 -->[codemod] Fix variant prop placement (#31990) @ryancogswell

### `@mui/utils@5.5.3`

- &#8203;<!-- 02 -->[utils] Improve type inference of useForkRef (#31845) @eps1lon

### `@mui/base@5.0.0-alpha.74`

#### Breaking changes

- &#8203;<!-- 34 -->[base] Remove `BackdropUnstyled` component (#31923) @mnajdova

  The `BackdropUnstyled` component was removed from the `@mui/base` package, as it did not have any specific logic, except adding an `aria-hidden` attribute on the div it rendered. This is not enough to justify it's existence in the base package. Here is an example alternative component you can use:

  ```tsx
  const BackdropUnstyled = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>(
    (props, ref) => {
      const { open, className, ...other } = props;
      return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
    },
  );
  ```

- &#8203;<!-- 03 -->[FocusTrap] Move docs to Base and drop the Unstyled prefix (#31954) @michaldudak

  Removed the `Unstyled_` prefix from the Base export (it remains in the Material UI export, though).

  ```diff
  -import { Unstyled_TrapFocus } from '@mui/base';
  +import { TrapFocus } from '@mui/base';

   // or

  -import TrapFocus from '@mui/base/Unstyled_TrapFocus';
  +import TrapFocus from '@mui/base/TrapFocus';
  ```

#### Changes

- &#8203;<!-- 33 -->[base] Add @mui/types to dependencies (#31951) @bicstone

### `@mui/joy@5.0.0-alpha.21`

- &#8203;<!-- 09 -->[Joy] Add `AvatarGroup` component (#31980) @siriwatknp
- &#8203;<!-- 07 -->[Joy] Miscellaneous fixes (#31873) @siriwatknp
- &#8203;<!-- 08 -->[Joy] Miscellaneous fixes 2 (#31971) @siriwatknp

### Docs

- &#8203;<!-- 27 -->[docs] Improve the a11y on the hover rating demo (#31970) @mnajdova
- &#8203;<!-- 26 -->[docs] Improve a11y on the `SplitButton` demo (#31969) @mnajdova
- &#8203;<!-- 25 -->[docs] Improve the color description in the API pages (#30976) @mnajdova
- &#8203;<!-- 24 -->[docs] Add docs page for unstyled Modal (#31417) @mnajdova
- &#8203;<!-- 23 -->[docs] Add InputUnstyled docs (#31881) @mnajdova
- &#8203;<!-- 22 -->[docs] Remove "Work in biotech" from the showcase (#31942) @oliviertassinari
- &#8203;<!-- 21 -->[docs] Fix in-house ad for the design kits (#31965) @oliviertassinari
- &#8203;<!-- 20 -->[docs] Fix the documentation for filterOptions in Autocomplete API page (#31416) @santhoshbala0178
- &#8203;<!-- 19 -->[docs] Update href for 'TypeScript guide on theme customization' (#31880) @NickFoden
- &#8203;<!-- 18 -->[docs] Fix the CSS modules example in the Interoperability page (#31935) @WilsonNet
- &#8203;<!-- 17 -->[docs] Fix small typo in the `styled()` utility page (#31967) @jason1985
- &#8203;<!-- 16 -->[docs] Update mui-x on material-ui navigation (#31810) @siriwatknp
- &#8203;<!-- 15 -->[docs] Copy ClickAwayListener docs to Base (#31878) @michaldudak
- &#8203;<!-- 14 -->[docs] Refine the redirects (#31939) @siriwatknp
- &#8203;<!-- 13 -->[docs] Fix TOC layout for large screen (#31953) @siriwatknp
- &#8203;<!-- 12 -->[examples] Update remix example to not use NODE_ENV guard for `LiveReload` (#31269) @eswarclynn
- &#8203;<!-- 06 -->[NoSsr] Copy docs to the Base space (#31956) @michaldudak
- &#8203;<!-- 05 -->[Portal] Copy Portal docs to the Base space (#31959) @michaldudak
- &#8203;<!-- 01 -->[website] Remove X-Frame-Options @oliviertassinari
- &#8203;<!-- 35 -->Revert "[website] Remove X-Frame-Options" @oliviertassinari

### Core

- &#8203;<!-- 30 -->[core] Fixes error in changelog generator for item sorting/padding (#30088) @dimitropoulos
- &#8203;<!-- 29 -->[core] Fix typo in issue template @oliviertassinari
- &#8203;<!-- 28 -->[core] Replace deprecated String.prototype.substr() (#31806) @CommanderRoot
- &#8203;<!-- 04 -->[test] Add tests for component using `StandardProps` and polymorphic components (#31945) @mnajdova

All contributors of this release in alphabetical order: @bicstone, @CommanderRoot, @dimitropoulos, @eps1lon, @eswarclynn, @igordanchenko, @jannes-io, @jason1985, @m4theushw, @michaldudak, @mnajdova, @NickFoden, @oliviertassinari, @ryancogswell, @santhoshbala0178, @siriwatknp, @WilsonNet

## 5.5.2

<!-- generated comparing v5.5.1..master -->

_Mar 21, 2022_

A big thanks to the 7 contributors who made this release possible. This is a small release focused on some 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@5.5.2`

- &#8203;<!-- 04 -->[Popper] Expose the `sx` prop (#31833) @ivan-ngchakming

### `@mui/joy@5.0.0-alpha.20`

- &#8203;<!-- 06 -->[Joy] Add default color to `Input` and `ListItemButton` (#31826) @siriwatknp
- &#8203;<!-- 05 -->[Joy] Add Avatar component (#31303) @hbjORbj

### `@mui/base@5.0.0-alpha.73`

- &#8203;<!-- 03 -->[SliderUnstyled] Fix dragging on disabled sliders (#31882) @mnajdova

### `@mui/styled-engine-sc@5.5.2`

- &#8203;<!-- 02 -->[styled-engine-sc] GlobalStylesProps inconsistent between the different packages (#31814) @mnajdova

### Docs

- &#8203;<!-- 15 -->[data-grid] Fix print export feature (#31807) @oliviertassinari
- &#8203;<!-- 14 -->[docs] Move BadgeUnstyled docs to Base space (#31872) @michaldudak
- &#8203;<!-- 13 -->[docs] Solve duplication of content (#31917) @oliviertassinari
- &#8203;<!-- 12 -->[docs] Fix side nav capitalization of API (#31916) @oliviertassinari
- &#8203;<!-- 11 -->[docs] Use TypeScript demos by default (#31808) @oliviertassinari
- &#8203;<!-- 10 -->[docs] New search experience for multiple products (#31811) @siriwatknp
- &#8203;<!-- 09 -->[docs] Make LTS searchable (#31804) @oliviertassinari
- &#8203;<!-- 08 -->[docs] Fix demo filename on zh markdown (#31790) @nnmax
- &#8203;<!-- 01 -->[website] Highlight the date picker (#31889) @oliviertassinari

### Core

- &#8203;<!-- 07 -->[core] Add tests for Avatar component (#31829) @hbjORbj

All contributors of this release in alphabetical order: @hbjORbj, @ivan-ngchakming, @michaldudak, @mnajdova, @nnmax, @oliviertassinari, @siriwatknp

## 5.5.1

<!-- generated comparing v5.5.0..master -->

_Mar 14, 2022_

A big thanks to the 23 contributors who made this release possible. Here are some highlights ✨:

- 📊 2021 survey results post by @danilo-leal (#30999)
- Several 🐛 bug fixes and 📚 documentation improvements

### @mui/material@5.5.1

- [Fab] Add z-index (#30842) @issamElmohadeb098
- [Grid] Fix columns of nested container (#31340) @boutahlilsoufiane
- [i10n] Update italian locale (#30974) @SalvatoreMazzullo
- [Pagination] Fix type of UsePaginationItem["page"] (#31295) @aaronadamsCA
- [Popper] Allow setting default props in a theme (#30118) @hafley66
- [TextField] fix disappearing border in Safari (#31406) @krysia1

### @mui/joy@5.0.0-alpha.19

- [Joy] Support horizontal List (#31620) @siriwatknp
- [Joy] Add icon & label `Switch` examples (#31359) @siriwatknp
- [Joy] Add `TextField` component (#31299) @siriwatknp
- [Joy] Add `--Icon-fontSize` to components (#31360) @siriwatknp
- [Joy] Add `Checkbox` component (#31273) @siriwatknp

### Docs

- [blog] 2021 survey results post (#30999) @danilo-leal
- [docs] Add Macedonian translation (#31402) @theCuriousOne
- [docs] Fix API page table styles in Safari (#31696) @aaarichter
- [docs] Fix SEO issues (#31505) @oliviertassinari
- [docs] Fix Link leak of Next.js props (#31418) @oliviertassinari
- [docs] Add "Work in biotech" to showcase (#31711) @klyburke
- [docs] Fix docs site crash on iOS Safari 12 (#31458) @badalsaibo
- [docs] Fix search icons crash (#31651) @juanpc10
- [docs] Remove unnecessary await in e2e-tests (#31767) @siriwatknp
- [docs] Fix source code links on the Templates page (#31425) @danilo-leal
- [docs] Adjust Stack's basic usage demo (#31423) @danilo-leal
- [docs] Migrate button demos to base (#31395) @siriwatknp
- [docs] Fix y-axis unit used in the responsive font sizes chart (#31424) @aaarichter
- [docs] Remove joy mockup pages (#31412) @siriwatknp
- [docs] Fix the statement that styleOverrides are added by default (#31257) @mnajdova
- [docs] Refine the product identifier menu (#31262) @danilo-leal
- [docs] Fix Search crash (#31386) @reckter
- [docs] Update TextField multiline description (#31291) @jontewks
- [docs] Add gap theme mapping in the System properties table (#31382) @danilo-leal
- [docs] Test products search (#31351) @siriwatknp
- [docs] Fix GitHub source links in the demo toolbar (#31339) @PunitSoniME
- [docs] Add Algolia verification code to robot.txt (#31356) @siriwatknp
- [examples] Ignore tsbuildinfo with Next.js (#31460) @B0und
- [website] Add new gold sponsor (#31354) @hbjORbj
- [website] Update Ukraine support link (#31378) @samuelsycamore

### Core

- [core] Simplify anchor link (#31419) @oliviertassinari
- [core] Revert unrelated changes in #31354 @oliviertassinari
- [test] Upgrade CircleCI convenience image (#31394) @m4theushw
- [typescript] Simplify display of slot props types (#31240) @michaldudak

All contributors of this release in alphabetical order: @aaarichter, @aaronadamsCA, @B0und, @badalsaibo, @boutahlilsoufiane, @danilo-leal, @hafley66, @hbjORbj, @issamElmohadeb098, @jontewks, @juanpc10, @klyburke, @krysia1, @m4theushw, @michaldudak, @mnajdova, @oliviertassinari, @PunitSoniME, @reckter, @SalvatoreMazzullo, @samuelsycamore, @siriwatknp, @theCuriousOne

## 5.5.0

<!-- generated comparing v5.4.4..master -->

_Mar 7, 2022_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- ♿️ made the `Autocomplete` conform to [ARIA 1.2 combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox) (#30601) @EdmundMai
- Several 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.5.0`

#### Breaking change

- &#8203;<!-- 24 -->[ClassNameGenerator] Prevent all `base` imports (#31297) @siriwatknp

  `unstable_ClassNameGenerator` has been moved from `utils` to `className` folder to prevent all Base UI module imports. If you use the module, please update the import as suggested in the diff below:

  ```diff
  -import { unstable_ClassNameGenerator } from '@mui/material/utils';
  +import { unstable_ClassNameGenerator } from '@mui/material/className';
  ```

#### Changes

- &#8203;<!-- 28 -->[Autocomplete] Fix failing unit tests (#31302) @michaldudak
- &#8203;<!-- 27 -->[Autocomplete] Have the screen reader announce when autocomplete is open and closed (#30601) @EdmundMai
- &#8203;<!-- 26 -->[AvatarGroup] Fix misalignment with non-default spacing (#31165) @sjdemartini
- &#8203;<!-- 15 -->[Drawer] Adjustments to the mini variant to improve UI/UX (#31267) @siriwatknp
- &#8203;<!-- 04 -->[Select] Add extending `OutlinedInputProps` by SelectProps (#31209) @jrozbicki

### `@mui/icons-material@5.5.0`

- &#8203;<!-- 13 -->[icons] Sync new Google Material Icons (#30766) @simonecervini

### `@mui/codemod@5.5.0`

- &#8203;<!-- 23 -->[codemod] Fix top level imports codemod (#31308) @mnajdova

### `@mui/lab@5.0.0-alpha.72`

- &#8203;<!-- 07 -->[LoadingButton] Fix padding of loading icon in small button (#31113) @PunitSoniME

### `@mui/base@5.0.0-alpha.71`

- &#8203;<!-- 05 -->[MenuUnstyled] Create MenuUnstyled and useMenu (#30961) @michaldudak
- &#8203;<!-- 03 -->[SelectUnstyled] Prevent window scrolling after opening (#31237) @michaldudak

### `@mui/joy@5.0.0-alpha.18`

- &#8203;<!-- 12 -->[Joy] Make Icon `fontSize` adaptable to its parent (#31268) @siriwatknp
- &#8203;<!-- 11 -->[Joy] Add `Link` component (#31175) @hbjORbj
- &#8203;<!-- 10 -->[Joy] Improve `Sheet` tests (#31241) @hbjORbj
- &#8203;<!-- 09 -->[Joy] Improve SvgIcon tests (#31242) @hbjORbj

### `@mui/material-next@6.0.0-alpha.26`

- &#8203;<!-- 06 -->[material-next] Mark @mui/material as a dependency (#31270) @siriwatknp

### Docs

- &#8203;<!-- 21 -->[docs] Remove career pages from translation (#31346) @oliviertassinari
- &#8203;<!-- 20 -->[docs] Fix JS files overloading (#31341) @oliviertassinari
- &#8203;<!-- 19 -->[docs] Add banner in solidarity of Ukraine (#31275) @danilo-leal
- &#8203;<!-- 18 -->[docs] Fix maxWidth of scrollable Tabs demos (#31285) @danilo-leal
- &#8203;<!-- 17 -->[docs] Fix icon linking implementation concurrent safe (#30428) @Janpot
- &#8203;<!-- 16 -->[docs] Follow up new doc space issues (#31251) @siriwatknp
- &#8203;<!-- 29 -->[examples] Add `@types/node` to nextjs typescript starter (#30918) @Daggy1234
- &#8203;<!-- 14 -->[examples] Fix import ThemeProvider from correct package in remix-wit… (#30981) @nnecec
- &#8203;<!-- 25 -->[blog] Simplify the labels (#30921) @oliviertassinari
- &#8203;<!-- 08 -->[l10n] Add Croatian (hr-HR) and Serbian (sr-RS) translation (#30906) @m14d3n

### Core

- &#8203;<!-- 23 -->[core] Fix running markdownlint on Windows (#31352) @michaldudak
- &#8203;<!-- 22 -->[core] Fix the stylelint script on Windows (#31281) @mnajdova
- &#8203;<!-- 02 -->[test] Fix buildApiUtils tests on Windows (#31304) @michaldudak
- &#8203;<!-- 01 -->[test] Remove legacyRoot option from test renderer (#31284) @eps1lon

All contributors of this release in alphabetical order: @Daggy1234, @danilo-leal, @EdmundMai, @eps1lon, @hbjORbj, @Janpot, @jrozbicki, @m14d3n, @michaldudak, @mnajdova, @nnecec, @oliviertassinari, @PunitSoniME, @simonecervini, @siriwatknp, @sjdemartini

## 5.4.4

<!-- generated comparing v5.4.3..master -->

_Feb 28, 2022_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- ✨ New `Input` and `Sheet` components were added in the experimental Joy design system by @hbjORbj (#31124, #31086) @hbjORbj
- Several 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.4.4`

- &#8203;<!-- 28 -->[Autocomplete] Have Autocomplete with multiline textfield log a warning instead of an error (#30680) @iclaude3
- &#8203;<!-- 27 -->[Chip] Fix ellipsis when the children is too long (#31087) @PunitSoniME
- &#8203;<!-- 14 -->[Input] Export InputBase's classes from the classes const (#31186) @mnajdova
- &#8203;<!-- 29 -->[TextField] Fix Horizontal scroll when label too long (#31187) @RedHeadphone
- &#8203;<!-- 08 -->[styles] Fix typo in import error (#31167) @davwheat

### `@mui/system@5.4.4`

- &#8203;<!-- 07 -->[system] Fix executing server-side Emotion component as function interpolation 2 (#31024) @Andarist
- &#8203;<!-- 06 -->[system] Fix sx prop types when CSS variables are used with nested selectors (#31163) @mnajdova
- &#8203;<!-- 05 -->[system] Fix `CssVarsProvider` theme mutation (#31148) @siriwatknp

### `@mui/codemod@5.4.4`

- &#8203;<!-- 26 -->[codemods] Add v5.0.0/top-level-imports codemod (#31195) @greengiraffe

### `@mui/base@5.0.0-alpha.70`

- &#8203;<!-- 31 -->[SelectUnstyled, MultiSelectUnstyled, ButtonUnstyled] Export additional types to make customization easier (#31172) @michaldudak

### `@mui/joy@5.0.0-alpha.17`

- &#8203;<!-- 13 -->[Joy] Add nested list components (#31159) @siriwatknp
- &#8203;<!-- 12 -->[Joy] Improve color customization on `Switch` (#31137) @siriwatknp
- &#8203;<!-- 11 -->[Joy] Add `Sheet` component (#31124) @hbjORbj
- &#8203;<!-- 10 -->[Joy] add `Input` component (#31086) @siriwatknp
- &#8203;<!-- 09 -->[Joy] Fix Button missing slot type (#31166) @siriwatknp

### Docs

- &#8203;<!-- 22 -->[docs] Fix 404 link to the blog (#31234) @oliviertassinari
- &#8203;<!-- 21 -->[docs] Use `material-ui` for product name (#31200) @siriwatknp
- &#8203;<!-- 20 -->[docs] Add Base installation page (#30969) @siriwatknp
- &#8203;<!-- 19 -->[docs] Use new Algolia app for new structure (#31178) @siriwatknp
- &#8203;<!-- 18 -->[docs] Typo in the `FormControl` API documentation (#31169) @bonellia
- &#8203;<!-- 17 -->[docs] Fix typo in Stack documentation (#31176) @adriancampos
- &#8203;<!-- 16 -->[docs] Update interoperability.md broken tailwind links (#31182) @robertwt7
- &#8203;<!-- 15 -->[docs] Add missing import into tss-react migration guide (#31162) @sviande
- &#8203;<!-- 03 -->[website] The role is filled (#31216) @oliviertassinari
- &#8203;<!-- 02 -->[website] Revise the row grouping blog post (#31101) @samuelsycamore
- &#8203;<!-- 01 -->[website] Fix a few SEO issues (#31150) @oliviertassinari

### Core

- &#8203;<!-- 30 -->[core] Add group for the @fortawesome dependencies (#31193) @mnajdova
- &#8203;<!-- 25 -->[core] Update playwright docker to match the specified version (#31236) @siriwatknp
- &#8203;<!-- 24 -->[core] Remove parallel on buildTypes (#31189) @siriwatknp
- &#8203;<!-- 23 -->[core] Fix propTypes generation for optional any props (#31141) @m4theushw
- &#8203;<!-- 04 -->[typescript] Remove variants deprecation (#31239) @siriwatknp

All contributors of this release in alphabetical order: @adriancampos, @Andarist, @bonellia, @davwheat, @greengiraffe, @hbjORbj, @iclaude3, @m4theushw, @michaldudak, @mnajdova, @oliviertassinari, @PunitSoniME, @RedHeadphone, @robertwt7, @samuelsycamore, @siriwatknp, @sviande

## 5.4.3

<!-- generated comparing v5.4.2..master -->

_Feb 21, 2022_

A big thanks to the 14 contributors who made this release possible. Here are some highlights ✨:

- 🛠 @hbjORbj made components use theme duration/easing values by default (#30894)
- A meaningful number of 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.4.3`

- &#8203;<!-- 18 -->[ButtonBase] Fix typo (#31135) @Jastor11
- &#8203;<!-- 05 -->[Stepper] Export useStepContext (#31021) @michaldudak
- &#8203;<!-- 04 -->[Transitions] Some components do not use transition duration/easing values from theme (#30894) @hbjORbj

### `@mui/icons-material@5.4.3`

- &#8203;<!-- 11 -->[icons] Add "circle" icon synonyms (#31118) @gnowland

### `@mui/joy@5.0.0-alpha.16`

- &#8203;<!-- 10 -->[Joy] `List` second iteration (#31134) @siriwatknp
- &#8203;<!-- 09 -->[Joy] Fix typings (#31120) @siriwatknp
- &#8203;<!-- 08 -->[Joy] Add initial `List` components (#30987) @siriwatknp

### Docs

- &#8203;<!-- 19 -->[website] Improve full-stack role job description (#31160) @Janpot
- &#8203;<!-- 14 -->[docs] Fix typo of migration guides v4 (#31136) @pppp606
- &#8203;<!-- 13 -->[docs] Update on the support page to account for v4 LTS support (#31029) @danilo-leal
- &#8203;<!-- 12 -->[docs] Fix small typo in chips.md (#31092) @cameliaben
- &#8203;<!-- 07 -->[l10n] Add it-IT translation for labelDisplayedRows (#31131) @frab90
- &#8203;<!-- 06 -->[l10n] Add pl-PL translation for labelDisplayedRows (#31088) @ThomasTheHuman
- &#8203;<!-- 03 -->[website] Sync MUI X table feature (#30913) @alexfauquette
- &#8203;<!-- 02 -->[website] Prefill source in job application links (#31036) @oliviertassinari
- &#8203;<!-- 01 -->[website] Fix a grammar mistake (#31099) @huyenltnguyen

### Core

- &#8203;<!-- 17 -->[core] Add jsx, html, css and prisma to prettier extensions (#31161) @Janpot
- &#8203;<!-- 16 -->[core] Allow to run material-ui.com/store alongside mui.com/store (#31065) @oliviertassinari
- &#8203;<!-- 15 -->[core] Polish design tokens (#31095) @oliviertassinari

All contributors of this release in alphabetical order: @alexfauquette, @cameliaben, @danilo-leal, @frab90, @gnowland, @hbjORbj, @huyenltnguyen, @Janpot, @Jastor11, @michaldudak, @oliviertassinari, @pppp606, @siriwatknp, @ThomasTheHuman

## 5.4.2

_Feb 15, 2022_

A big thanks to the 16 contributors who made this release possible. Here are some highlights ✨:

- 🛠 @sydneyjodon-wk improved propTypes of the ToggleButton components (#30883)
- Several 🐛 bug fixes and 📚 documentation improvements

### `@mui/material@5.4.2`

- [Select] Allow customizing Select based on its variant (#30788) @michaldudak
- [Portal] Re-export 'Portal' in material (#31003) @liradb2000
- [ToggleButton] Add prop types for `onClick` and `onChange` (#30883) @sydneyjodon-wk
- [typescript] Added TypeText declaration to the exports file (#30890) @agauravdev

### `@mui/system@5.4.2`

- [system] Fix broken behavior when breakpoints input are not ordered (#30996) @mnajdova

### `@mui/lab@5.0.0-alpha.69`

- [DatePicker] Fix passing clearable prop (#30786) @alisasanib

### `@mui/joy@5.0.0-alpha.15`

- [Joy] Improve variant customization experience (#30878) @siriwatknp
- [Joy] Make `sx` prop work in Joy (#30955) @siriwatknp

### Framer

- [design] Remove framer components (#30983) @mbrookes
- [design] Remove framer leftovers (#31070) @michaldudak

### Docs

- [docs] Update installation guide of the icons package (#31026) @huyenltnguyen
- [docs] Improve the indication for the legacy APIs (#30995) @mnajdova
- [docs] Specify which props are added in the default `shouldForwardProp` option (#30978) @mnajdova
- [docs] Fix layout shift on loading (#31017) @oliviertassinari
- [docs] Increase scroll affordance in wide tables (#30713) @danilo-leal
- [docs] Fix look & feel of the Masonry demos (#30971) @oliviertassinari
- [docs] Improve Base component demos (#30884) @danilo-leal
- [docs] Use full product names (Material UI, MUI System) (#30960) @oliviertassinari
- [docs] Prefer useEnhancedEffect to avoid server side warnings (#30977) @mnajdova
- [docs] Fix force redirection to a different locale (#30967) @oliviertassinari
- [docs] Add live Tailwind CSS demo (#30966) @oliviertassinari
- [website] Add banner for promoting priority open roles (#31076) @danilo-leal
- [website] Open Full-stack Engineer role for studio (#31038) @prakhargupta1
- [website] Minor security improvements (#31062) @oliviertassinari
- [website] Improve title of open roles (#30963) @DanailH
- [website] Add BIMI avatar (#30444) @oliviertassinari
- [website] Add Sycamore to About page (#31000) @samuelsycamore

### Core

- [benchmark] Add missing dependency (#30994) @michaldudak
- [core] Bump date-io version (#31016) @michaldudak
- [core] Fix typo in useSlider (#31061) @ryohey
- [core] Remove unused draft-js types package (#30993) @michaldudak
- [test] Test if certain Base members are exported from Material UI (#31067) @michaldudak
- [core] Remove dead code (#31064) @oliviertassinari

All contributors of this release in alphabetical order: @agauravdev, @alisasanib, @DanailH, @danilo-leal, @huyenltnguyen, @l10nbot, @liradb2000, @mbrookes, @michaldudak, @mnajdova, @prakhargupta1, @oliviertassinari, @ryohey, @samuelsycamore, @siriwatknp, @sydneyjodon-wk

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
- &#8203;<!-- 17 -->[docs] Hotfix notification (#30862) @siriwatknp
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

- 🛠 @goncalovf added an example project using [Material UI with Vite.js](https://github.com/mui/material-ui/tree/master/examples/material-ui-vite) (#28241)
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
  -import ButtonUnstyled from '@mui/material/ButtonUnstyled';
  +import ButtonUnstyled from '@mui/base/ButtonUnstyled';
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

- &#8203;<!-- 28 -->[core] Rename Material UI to MUI (#30338) @ZeeshanTamboli
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
- &#8203;<!-- 16 -->[docs] Add tip to help access the docs of a previous version when finding answers in Stack Overflow (#30101) @danilo-leal
- &#8203;<!-- 15 -->[docs] Fix import example inside Unstyled Backdrop section (#30098) @TheodosiouTh
- &#8203;<!-- 01 -->[website] Column pinning and Tree data are out (#30136) @oliviertassinari
- &#8203;<!-- 07 -->[survey] Remove survey promotion items (#30122) @danilo-leal

### Core

- &#8203;<!-- 23 -->[core] Fix link to Open Collective @oliviertassinari
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
- &#8203;<!-- 18 -->[docs] Improve wording in Stack Overflow section of support page (#29956) @ronwarner
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
- &#8203;<!-- 28 -->[core] Transition to a new Stack Overflow tag (#29967) @oliviertassinari

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
- &#8203;<!-- 6 -->[docs] MUI's 2021 Developer survey (#29765) @prakhargupta1
- &#8203;<!-- 5 -->[docs] Smoother image loading UX (#29858) @oliviertassinari
- &#8203;<!-- 4 -->[Select] Fix select display value with React Nodes (#29836) @kegi
- &#8203;<!-- 3 -->[system] Add `experimental_sx` utility (#29833) @mnajdova
- &#8203;<!-- 2 -->[test] Ignore "detected multiple renderers" warning for now (#29854) @eps1lon
- &#8203;<!-- 1 -->[useMediaQuery][utils] Remove usage of React 18 APIs (#29870) @eps1lon

All contributors of this release in alphabetical order: @eps1lon, @karakib2k18, @kegi, @mbrookes, @mnajdova, @prakhargupta1, @oliviertassinari

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
- &#8203;<!-- 30 -->[core] Use support request GitHub Action (#29594) @mnajdova
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
- &#8203;<!-- 06 -->[docs] Change Material UI to MUI in the console (#28270) @mbrookes
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

- &#8203;<!-- 12 -->[core] Replace Material UI with MUI (#28243) @mnajdova
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
- &#8203;<!-- 26 -->[docs] Remove demo for re-creating Material UI switches (#28042) @eps1lon
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
- 🛠 Added `mui-replace` codemod for migrating `@material-ui/*` to new packages `@mui/*`. Check out this [codemod detail](https://github.com/mui/material-ui/blob/v5.0.0/packages/mui-codemod/README.md#mui-replace) or head to [migration guide](https://mui.com/material-ui/migration/migration-v4/#preset-safe)
- 🧪 Added new `<Mansory>` component to the lab, [check it out](https://mui.com/components/masonry/). It has been crafted by our first intern, @hbjORbj 👏!

### `@mui/material@5.0.0-rc.0`

#### Breaking changes

- &#8203;<!-- 33 -->[core] Rename packages (#28049) @mnajdova

  replace `@material-ui/*` prefix with `@mui/*`:

  ```bash
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

  ```bash
  @material-ui/core => @mui/material        // represents Material Design components.
  @material-ui/icons => @mui/icons-material // represents Material Design icons.
  @material-ui/unstyled => @mui/base        // fully functional components with minimum styles.
  ```

  > **Note**: `@mui/base` (previously `@material-ui/unstyled`) is not the same as `@material-ui/core`.

  We encourage you to use the [codemod](https://github.com/mui/material-ui/blob/v5.0.0/packages/mui-codemod/README.md#mui-replace) for smooth migration.

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
- &#8203;<!-- 53 -->[docs] Focus pickers introduction on Material UI (#27394) @eps1lon
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
  You can find the new [default values](https://mui.com/material-ui/customization/palette/#default-values) in the documentation.

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
- [blog] Danilo Leal joins Material UI (#27231) @oliviertassinari

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
  -  <span class="MuiTab-wrapper">
      {icon}
      {label}
  -  </span>
   </button>
  ```

- [BottomNavigation] Remove wrapper from BottomNavigationAction (#26923) @siriwatknp

  `span` element that wraps children has been removed. `wrapper` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
   <button class="MuiBottomNavigationAction-root">
  -  <span class="MuiBottomNavigationAction-wrapper">
       {icon}
       <span class="MuiBottomNavigationAction-label">
         {label}
       </span>
  -  </span>
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
- 🎨 We have updated `Slider` to match current [Material Design guidelines](https://m2.material.io/components/sliders).

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
  -  md: 960,
  +  md: 900,
  -  lg: 1280,
  +  lg: 1200,
  -  xl: 1920,
  +  xl: 1536,
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

  Rework the CSS to match the latest [Material Design guidelines](https://m2.material.io/components/sliders) and make custom styles more intuitive. [See documentation](https://mui.com/components/slider/).

  <a href="https://mui.com/components/slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

  You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](https://mui.com/components/slider/#sizes).

  <a href="https://mui.com/components/slider/#sizes"><img width="330" alt="" src="https://user-images.githubusercontent.com/3165635/123076549-8aa0d880-d419-11eb-8835-06cd2b21b2d3.png" style="margin: auto"></a>

- &#8203;<!-- 14 -->[IconButton] Remove label span (#26801) @siriwatknp

  `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui/material-ui/pull/26666).

  ```diff
   <button class="MuiIconButton-root">
  -  <span class="MuiIconButton-label">
       <svg />
  -  </span>
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
  -  <span class="MuiButton-label">
       children
  -  </span>
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
- &#8203;<!-- 21 -->[FocusTrap] Capture nodeToRestore via relatedTarget (#26696) @eps1lon

### `@material-ui/icons@5.0.0-alpha.37`

- &#8203;<!-- 03 -->Revert "[icons] Only ship ES modules (#26310)" (#26656) @eps1lon

  The changes that we have tried in #26310 were breaking the integration with Next.js.

### `@material-ui/lab@5.0.0-alpha.37`

- &#8203;<!-- 29 -->[core] Remove unused useKeyDown (#26765) @eps1lon
- &#8203;<!-- 28 -->[DateTimePicker] Fix not visible selected tab icon (#26624) @nikitabobers

### Docs

- &#8203;<!-- 20 -->[blog] Michał Dudak joins Material UI (#26700) @oliviertassinari
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

  The `color` prop has no longer any effect in dark mode. The app bar uses the background color required by the elevation to follow the [Material Design guidelines](https://m2.material.io/design/color/dark-theme.html). Use `enableColorOnDark` to restore the behavior of v4.

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
  +    OpenPickerIcon: ClockIcon,
     }}
  -  openPickerIcon={<ClockIcon />}
   >
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
- ⚒️ Add many new [codemods](https://github.com/mui/material-ui/blob/v5.0.0/packages/mui-codemod/README.md) to automate the migration from v4 to v5 (#24867) @mbrookes.
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

  - Tab `minWidth` changed from `72px` => `90px` (without media-query) according to [material-design spec](https://m2.material.io/components/tabs#specs)
  - Tab `maxWidth` changed from `264px` => `360px` according to [material-design spec](https://m2.material.io/components/tabs#specs)

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
- [website] Add Material UI X page (#25794) @DanailH
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
  -  classes={{ input: 'foo' }}
  +  classes={{ select: 'foo' }}
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

> Follow [this link](https://mui.com/material-ui/migration/migration-v4/) for full migration from v4 => v5

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
- &#8203;<!-- 23 -->[docs] Link third-party routing in Bottom navigation (#26190) @arpitBhalla
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
  -  return <MyComponent innerRef={ref} />;
  +  return <MyComponent ref={ref} />;
   }
  ```

  **withTheme**

  Replace the `innerRef` prop with the `ref` prop. Refs are now automatically forwarded to the inner component.

  ```diff
   import * as React from 'react';
   import { withTheme } from '@material-ui/core/styles';

   const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

   function MyOtherComponent(props) {
     const ref = React.useRef();
  -  return <MyComponent innerRef={ref} />;
  +  return <MyComponent ref={ref} />;
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

  Its behavior can be obtained using the `sx` prop directly on the child if it's a Material UI component. For non-Material UI components use the `sx` prop in conjunction with the `component` prop:

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
  -<LoadingButton pending pendingIndicator="Pending…" pendingPosition="end" />
  +<LoadingButton loading loadingIndicator="Pending…" loadingPosition="end" />
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
  -  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  +  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +    const checked = event.target.checked;
     };
     return <Checkbox onChange={handleChange} />;
   }
  ```

  ```diff
   function MySwitch() {
  -  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  +  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +    const checked = event.target.checked;
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
- &#8203;<!-- 44 -->[internal][pickers] Entangle what Props vs AllProps means (#25938) @eps1lon
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
  -    MuiDayPicker: {},
  +    MuiCalendarPicker: {},
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
- &#8203;<!-- 54 -->[FocusTrap] Make isEnabled and getDoc optional (#25784) @m4theushw

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
- &#8203;<!-- 04 -->[website] Matheus Wichman joins Material UI (#25590) @oliviertassinari

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

- &#8203;<!-- 22 -->[docs] Migrate Bottom navigation demos to emotion (#25180) @vicasas
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
  +<Tabs indicatorColor="secondary" textColor="inherit" />
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
- &#8203;<!-- 047 -->[FocusTrap] Migrate to unstyled (#24957) @povilass
- &#8203;<!-- 060 -->[Backdrop] Migrate to unstyled (#24985) @povilass
- &#8203;<!-- 078 -->[Modal] Migrate to emotion + unstyled (#24857) @povilass

### `@material-ui/lab@5.0.0-alpha.26`

- &#8203;<!-- 071 -->[Pickers] Fix scroll-jump when opening with a selected value (#25010) @eps1lon
- &#8203;<!-- 066 -->[Pickers] Rework keyboard navigation implementation (#24315) @eps1lon
- &#8203;<!-- 065 -->[Pickers] Fix picker components not opening on click in React 17 (#24981) @eps1lon
- &#8203;<!-- 013 -->[Pickers] Fix outdated link to PickersDay (#24883) @oliviertassinari

### `@material-ui/icons@5.0.0-alpha.26`

- &#8203;<!-- 087 -->[icons] Synchronize icons (#25055) @eps1lon

  The icons were synchronized with https://m2.material.io/resources/icons/. This change increases the number of supported icons from 1,349 to 1,781 per theme (we support 5 themes). The breaking changes:

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
  We will not change the minimum supported version in a major version of Material UI.
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
  -  gap={2}
  +  gap="2px"
   >
  ```

### `@material-ui/styled-engine@5.0.0-alpha.25`

- &#8203;<!-- 34 -->[styled-engine] Fix GlobalStyles not to throw when no theme is available (#24671) @mnajdova

### `@material-ui/types@5.0.0-alpha.25`

#### Breaking changes

- &#8203;<!-- 91 -->[types] Rename the exported `Omit` type in `@material-ui/types`. (#24795) @petyosi
  The module is now called `DistributiveOmit`. The change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5. The built-in `Omit`, while similar, is non-distributive. This leads to differences when applied to union types. [See this Stack Overflow answer for further details](https://stackoverflow.com/a/57103940/1009797).

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
- [FocusTrap] Fix trap to only focus on tabbable elements (#23364) @gregnb
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
- [docs] Fix source on GitHub links (#23821) @praveenkumar-kalidass
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
  Thanks to @mbrookes developers can automate the migration with a [codemod](https://github.com/mui/material-ui/blob/v5.0.0/packages/mui-codemod/README.md#box-sx-prop).

  ```diff
  -<Box p={2} bgcolor="primary.main">
  +<Box sx={{ p: 2, bgcolor: 'primary.main' }}>
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

  This enforces emotion being injected first. [More details](https://mui.com/material-ui/guides/interoperability/#css-injection-order) in the documentation.

- [Autocomplete] Rename `closeIcon` prop with `clearIcon` to avoid confusion (#23617) @akhilmhdh.

  ```diff
  -<Autocomplete closeIcon={icon} />
  +<Autocomplete clearIcon={icon} />
  ```

- [Dialog] Remove the `disableBackdropClick` prop. It's redundant with the `reason` argument (#23607) @eps1lon.

  ```diff
   <Dialog
  -  disableBackdropClick
  -  onClose={handleClose}
  +  onClose={(event, reason) => {
  +    if (reason !== 'backdropClick') {
  +      onClose(event, reason);
  +    }
  +  }}
   />
  ```

- [Modal] Remove the `disableBackdropClick` prop. It's redundant with the `reason` argument (#23607) @eps1lon.

  ```diff
   <Modal
  -  disableBackdropClick
  -  onClose={handleClose}
  +  onClose={(event, reason) => {
  +    if (reason !== 'backdropClick') {
  +      onClose(event, reason);
  +    }
  +  }}
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
  We have integrated the components with the code infrastructure. Next we will migrate all the GitHub issues from [material-ui-pickers](https://github.com/mui/material-ui-pickers) and archive the repository. This migration will help provide first-class support for the date picker components. The component will stay in the lab as long as necessary to reach the high-quality bar we have for core components. You can find the [new documentation here](https://mui.com/components/pickers/).

  While the source code is currently hosted in the [main repository](https://github.com/mui/material-ui), we might move it to the [x repository](https://github.com/mui/mui-x) in the future, depending on what is easier for the commercial date range picker. The date picker will stay open source no matter what.

- 📚 Revamp the documentation for [the system](https://mui.com/system/getting-started/). The System contains CSS utilities. The documentation now promotes the use of the `sx` prop. It's ideal for adding one-off styles, e.g. padding, but when pushed to its limits, it can be used to implement quickly a complete page.
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
- [Tooltip] Unexpected behavior onOpen/onClose (#23482) @brorlarsnicklas

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
- [docs] Prepare Material UI X (#1893) @oliviertassinari
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
  React 17 release is unusual because it doesn't add any new developer-facing features. It was released a couple of days ago. You can learn more about it in the [introduction post](https://legacy.reactjs.org/blog/2020/10/20/react-v17.html). Material UI now supports `^16.8.0 || ^17.0.0`.
- 🛠 Introduce a new `@material-ui/unstyled` package (#23270) @mnajdova.
  This package will host the unstyled version of the components. In this first iteration, only the Slider is available. You can find it documented under the [same page](https://mui.com/components/slider-styled/#unstyled-slider) as the styled version.

  **Why an unstyled package?**

  While engineering teams are successfully building custom design systems by wrapping Material UI, we [occasionally hear](https://github.com/mui/material-ui/issues/6218) that Material Design or our styling solution are something they don't need. Some teams prefer SASS, others prefer to customize the components starting from a pristine state. What all these teams have in common is that they value the features coming from the components, such as accessibility.

  The unstyled package goes one step down in the abstraction layer, providing more flexibility. Angular Material introduced this approach two years ago. Today their unstyled components account for [25% of the usage](https://npm-stat.com/charts.html?package=%40angular%2Fmaterial&package=%40angular%2Fcdk&from=2017-11-03&to=2020-11-03).

  Another reason for introducing this package is to prepare the groundwork for a [second theme](https://github.com/mui/material-ui/issues/22485) (not Material Design based).

  A note on the terminology: "unstyled" means that the components have the same API as the "styled" components but come without CSS. Material UI also contains "headless" components that exposes a hook API, e.g. [useAutocomplete](https://mui.com/components/autocomplete/#useautocomplete) or [usePagination](https://mui.com/components/pagination/#usepagination).

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
- [Icon] Fix translation, e.g. Google Translate (#23237) @cbeltrangomez84
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
- [blog] Danail Hadjiatanasov joins Material UI (#23223) @oliviertassinari
- [docs] Add Material UI Builder to in-house ads (#23342) @mbrookes
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
  We have resumed the work on Material UI System. This is made possible by the latest progress on the new styling solution of v5.
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
    -  '&[x-placement*="bottom"] $arrow': {
    +  '&[data-popper-placement*="bottom"] $arrow': {
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
  -  const { fullScreen } = props;
  +  const theme = useTheme();
  +  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
  This is a significant update to the [browsers supported](https://mui.com/material-ui/getting-started/supported-platforms/) by Material UI.
  The previous policy was defined 2 years ago, and the landscape has evolved since then. The package now includes 4 bundles:

  1. `stable` (default, formerly `esm`) which targets a snapshot (on release) of `> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11"`
  2. `node` (formerly default) which targets a snapshot (on release) of `maintained node versions`
  3. `legacy` (new) which is `stable` + IE11
  4. `modern` (formerly `es`) which targets the last 1 version of evergreen browsers and active node (currently that is 14

  The change yields a 6% reduction in bundle size 📦 (Babel only).
  In the coming weeks, we will refactor the internals to take advantage of the new browser capabilities that dropping these older platforms allows. For instance, we might be able to remove the span we render inside the `<Button>` to work around [Flexbug #9](https://github.com/philipwalton/flexbugs/blob/master/README.md#flexbug-9).

  Check the updated [Supported platforms documentation](https://mui.com/material-ui/getting-started/supported-platforms/) and [new "minimizing bundle size" guide](https://mui.com/material-ui/guides/minimizing-bundle-size/).

  If you target IE11, you need to use the new bundle (`legacy`). We are treating IE11 as a second class-citizen, which is a continuation of the direction taken in #22873.

- 🚀 Improve the internal benchmark suite (#22923, #23058) @mnajdova.
  This was a prerequisite step to improve the [system](https://mui.com/system/getting-started/). We needed to be able to measure performance. After #22945, we have measured that the `Box` component is x3 faster in v5-alpha compared to v4.
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
  -  onChangeRowsPerPage={()=>{}}
  -  onChangePage={()=>{}}
  +  onRowsPerPageChange={()=>{}}
  +  onPageChange={()=>{}}
  ```

- [theme] Rename fade to alpha (#22834) @mnajdova
  Better describe its functionality. The previous name was leading to confusion when the input color already had an alpha value. The helper **overrides** the alpha value of the color.

  ```diff
  -import { fade } from '@material-ui/core/styles';
  +import { alpha } from '@material-ui/core/styles';

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

  Last but not least, the change allows us to take advantage dynamic style props. We will use them for dynamic color props, variant props, and new style props (an improved [system](https://mui.com/system/getting-started/)).

  This change has been in our roadmap for more than a year.
  We announced it in the [v4 release blog post](https://mui.com/blog/material-ui-v4-is-out/) as a direction v5 would take.

- 🛠 A first iteration on the unstyled components.

  You can find a [new version](https://mui.com/components/slider-styled/#UnstyledSlider.tsx) of the slider in the lab without any styles.
  The unstyled component weighs 6.5 kB gzipped, compared with 26 kB for the styled version when used standalone. The component is best suited for use when you want to fully customize the look of the component without reimplementing the JavaScript and accessibility logic.

- ⚡️ A first alpha of the [DataGrid](https://mui.com/x/react-data-grid/) component.

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
  -  renderOption={(option, { selected }) => (
  -    <React.Fragment>
  +  renderOption={(props, option, { selected }) => (
  +    <li {...props}>
         <Checkbox
           icon={icon}
           checkedIcon={checkedIcon}
           style={{ marginRight: 8 }}
           checked={selected}
         />
         {option.title}
  -    </React.Fragment>
  +    </li>
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
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
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

  ```bash
  theme.spacing(2) => 16
  ```

  After:

  ```bash
  theme.spacing(2) => '16px'
  ```

- [theme] Remove palette.text.hint key (#22537) @mbrookes

  The `theme.palette.text.hint` key was available but unused in Material UI v4 components.
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
  +  emptyIcon={null}
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

- 💎 A new diamond sponsor: [DoiT](https://www.doit.com/), thank you!
- 📚 Include the default value of the props in IntelliSense (#22447) @eps1lon
- ⚛️ More source migrated to TypeScript and testing-library (#22441) @baterson
- And many more 🐛 bug fixes and 📚 improvements.

### `@material-ui/core@v5.0.0-alpha.9`

#### Breaking changes

- [Modal] Remove `onRendered` prop from Modal and Portal (#22464) @eps1lon
  Depending on your use case either use a [callback ref](https://legacy.reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

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
- [FocusTrap] Entangle effects (#22155) @eps1lon
- [FocusTrap] Fix compatibility issues with React 17 (#22270) @eps1lon
- [FocusTrap] Prevent possible crash in React 17 (#22262) @eps1lon

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
  This API allows developers to add new variants on the Material UI's components right from the theme, without having to wrap the components.
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

  More details in [the documentation](https://mui.com/material-ui/customization/components/#adding-new-component-variants) and [RFC](#21749).

- 👮 Add documentation for the [FocusTrap](https://mui.com/base-ui/react-focus-trap/) component (#22062) @oliviertassinari.
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
  The component relied on [`ReactDOM.findDOMNode`](https://legacy.reactjs.org/docs/react-dom.html#finddomnode) which is [deprecated in `React.StrictMode`](https://legacy.reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

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
- [FocusTrap] Add documentation (#22062) @oliviertassinari
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
- [FocusTrap] Fix disableAutoFocus prop (#21612) @oliviertassinari

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
- [FocusTrap] Fix portal support (#21610) @mnajdova
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
  -  background-color: #f00;
  +  border-color: #f00;
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

- [Typography] Replace the `srOnly` prop so as to not duplicate the capabilities of [System](https://mui.com/system/getting-started/) (#21413) @mnajdova.

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
  -  backIconButtonText="Avant"
  -  nextIconButtonText="Après
  +  getItemAriaLabel={…}
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
