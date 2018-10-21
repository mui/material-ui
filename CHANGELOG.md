### [Versions](https://material-ui.com/versions/)

## 3.3.0
###### *Oct 21, 2018*

Big thanks to the 26 contributors who made this release possible!

Here are some highlights ✨:
- 🐛 Fix some important issues with the Modal (#13082, #13310) @J-Kallunki.
- 📝 First translations of the documentation in Chinese (#13094) @mbrookes.
- 📦 Make the Drawer demos usable outside of the box (#13314).
- And many more bug fixes and documentation improvements.

### `@material-ui/core@v3.3.0`

- [FormHelperText] Error styles should override disabled styles (#13217) @matthewdordal
- [InputBase] Add 'renderPrefix' and 'onFilled' signatures (#13282) @zheeeng
- [Drawer] Fix right chevron in persistent demo (#13275) @fabriziocucci
- [Tabs] Center text within tabs (#13258) @pelotom
- [ModalManager] Fix aria-hidden of modal current node (#13082) @J-Kallunki
- [Modal] Restore the focus as fast as possible (#13310) @oliviertassinari
- [Select] Add a multiple placeholder demo (#13309) @rfbotto
- [ListItem] Document how you can render a link (#13069) @JulienUsson
- [Select] Fix NativeSelect's height in FF and Edge (#13326) @pinguinjkeke
- [FormControl] Added zIndex of 0 to root style (#13327) @drkohlipk
- [withStyle] Improve the dangerouslyUseGlobalCSS option (#13330) @oliviertassinari

### `@material-ui/lab@v3.0.0-alpha.21`

- [Slider] Fix Jest unmount issue (#13295) @mdartic

### `@material-ui/docs@v3.0.0-alpha.7`

- [withStyle] Improve the dangerouslyUseGlobalCSS option (#13330) @oliviertassinari

### Docs

- [docs] Adds documentation for Circular Progress component (#13266) @mxmcg
- [docs] Remove usage of non-existent `listItem` jss class (#13269, #13268) @G-Rath
- [examples] Extend the .gitignore files (#13270) @phiilu
- [docs] Remove/annotate deprecated button variants (#13280) @eps1lon
- [docs] Update RTL guide to be more clear (#13181) @wenduzer
- [docs] Add checklist to PR template (#13225) @eps1lon
- [docs] Fix markdown formatting (#13284) @rutsky
- [docs] Fix typo (#13287) @NMinhNguyen
- [docs] Fixes typos & formatting in GridListTile and GridListTileBar documentation (#13298) @rassek96
- [docs] Reverse show password logic (#13301) @ShunnyBunny
- [docs] Some improvements (#13308) @programistka
- [docs] Clarify on how to use the local distribution in the CONTRIBUTING file (#13312) @nicolasiensen
- [docs] Refactor CheckboxesGroup to support IE11 (#13316) @simjes
- [docs] Set the infrastructure for a full page demo (#13314) @oliviertassinari
- [docs] Fix typos & formatting in filled-input (#13317) @dskiba
- [docs] Remove usage of non-existent `margin` jss class (#13318) @G-Rath
- [docs] Fix ad display (#13321) @oliviertassinari
- [docs] New Crowdin translations (#13094) @mbrookes

### Core

- [core] Fix defaultFontFamily misspelled in createTypography (#13260) @TheBear44
- [core] Misc of improvements (#13271) @oliviertassinari
- [core] Upgrade the dev dependencies (#13286) @oliviertassinari
- [core] Disable the jss vendor plugin server side (#13285) @oliviertassinari
- [core] Work toward preventing Googlebot regressions (#13323) @oliviertassinari

## 3.2.2
###### *Oct 16, 2018*

Big thanks to the 3 contributors who made this release possible!
This is a quick patch after important regressions.

### `@material-ui/core@v3.2.2`

- [ButtonBase] Fix process is not defined (#13252) @eps1lon

### Core

- [core] Fix deprecated variant (#13254) @oliviertassinari
- [core] Add a real life benchmark (#13244) @oliviertassinari
- [core] Only use debounce client-side (#13255) @oliviertassinari

## 3.2.1
###### *Oct 14, 2018*

Big thanks to the 19 contributors who made this release possible!

Here are some highlights ✨:
- 🐛 A simpler Typography upgrade story
- 🚀 Work on the performance server-side (x10) (#13233, #13236)
- And many more bug fixes and 📝 documentation improvements.

### `@material-ui/core@v3.2.1`

- [DialogContentText] Fix typography deprecation warning with useNextVariants (#13148) @eps1lon
- [SnackbarContent] Fix invalid dom (#13151) @eps1lon
- [Autocomplete] Fix the Portal Downshift demo (#13166) @oliviertassinari
- [SwitchBase] Fix type declarations (#13172) @eps1lon
- [Switch] Fix stacking context (#13122) @skenbo0916
- [Radio][Switch] Accept number & bool as value (#13173) @rassek96
- [Collapse] Show overflow content once entered (#13117) @skenbo0916
- [Stepper] Forward state properties to StepConnector (#13130) @jmaloon
- [Typography] Add missing classkey for overline variant (#13187) @eps1lon
- [Stepper] Prevent overriding Step's props (#13188) @nikhilem
- [Stepper] We were too greedy, revert (#13192) @oliviertassinari
- [withWidth] Document the render prop (#13074) @JulienUsson
- [TextField] Fix/core/input label/declarations and refactor (#13200) @eps1lon
- [CardActionArea] Fix overflow issue (#13213) @mdsadiq
- [Typography] Improve the upgrade story (#13214) @oliviertassinari
- [Snackbar] Remove non supported property `anchorOrigin.vertical=enter` (#13238) @iamhosseindhv
- [Tabs] Fix IE 11 styling (#13230) @pography

### `@material-ui/lab@v3.0.0-alpha.20`

- [SpeedDialAction] Fix className prop being ignored (#13161) @eps1lon
- [SpeedDial] Add missing class keys (#13228) @msenevir

### Docs

- [docs] Use typography v2 in examples (#13112) @eps1lon
- [docs] Add formik-material-ui (#13149) @cliedeman
- [examples] Fix codesandbox throwing Invalid comparator (#13153) @eps1lon
- [docs] Keep working on the SEO issues (#13158) @oliviertassinari
- [docs] Fix select outlined example (#13168) @RichardLindhout
- [Grid] Refactor prop order for clarity (#13204) @dijonkitchen
- [docs] Fix typo in Dialog (#13209) @rassek96
- [Tabs] Remove the href form simple tab example (#13205) @menomanabdulla
- [docs] Add demo for a bottom app bar (#13030) @adeelibr
- [docs] Fix a typo in the content that Table normally takes (#13219) @eddiemonge
- [docs] Change `filled-input` link text to `FilledInput` (#13223) @G-Rath
- [docs] Add Onepixel to the showcase (#13227) @oliviertassinari
- [docs] Fix API generation for i18n (#13237) @mbrookes
- [docs] Keep SEO juice for the other pages (#13240) @oliviertassinari

### Core

- [test] Add visual regression test for SpeedDIal (#13140) @eps1lon
- [test] Tidelift - skip checking nomnom & os-locale (#13157) @mbrookes
- [core] Benchmark Material-UI (#13233) @oliviertassinari
- [core] Introduce JSS caching (#13236) @oliviertassinari

## 3.2.0
###### *Oct 8, 2018*

Big thanks to the 18 contributors who made this release possible!

Here are some highlights ✨:
- 💅 Update the Typography implementation to better follow the specification (#12916) @eps1lon.
- 📝 Enable [translating the documentation into Chinese](https://translate.material-ui.com) @mbrookes.
- 📝 Fix many SEO issues of the docs.
- And many more bug fixes 🐛 and documentation improvements.

### `@material-ui/core@v3.2.0`

#### Deprecations

- [Typography] Add typography v2 variants (#12916) @eps1lon

This is a backward compatible change.
You can opt-in the usage of the new Material Design typography specification.
To learn more about the upgrade path, follow https://material-ui.com/style/typography/#migration-to-typography-v2.

- [Button] Deprecate flat and raised variant naming (#13113) @eps1lon

This change updates the variant wording to match the one used in the Material Design specification.

```diff
-<Button variant="flat" />
+<Button variant="text" />
```

```diff
-<Button variant="raised" />
+<Button variant="contained" />
```

#### Changes

- [TextField] Ensure labelWidth is set (#13077) @evanstern
- [styles] Remove react-jss dependency (#12993) @oliviertassinari
- [TextField] Fix ClassKey inference for outlined and filled variants (#13060) @eps1lon
- [Select] Document the filled and outlined variants (#13071) @JulienUsson
- [Typography] Support incomplete headlineMapping property (#13078) @oliviertassinari
- [Stepper] Expose connector index to <StepConnector /> (#13079) @dannycochran
- [ListItemIcon] Add wrapper `<div>` element to children (#13067) @izyb
- [TextField] Fix of Uncaught TypeError: r.inputRef.focus is not a function (#13091) @MustD
- [InputAdornment] Add missing "variant" prop to types (#13107) @cmfcmf
- [Textarea] Merge style with calculated height (#13125) @daniel-rabe
- [Typography] Small improvements (#13129) @oliviertassinari
- [Typography] Run the e2e tests with the next variant (#13136) @oliviertassinari
- [Tooltip] Forward the properties to the child element (#13138) @parulgupta26
- [Tooltip] Prevent onOpen, onClose to pass through (#13139) @eps1lon

### `@material-ui/lab@v3.0.0-alpha.19`

- [SpeedDial] Improve hover intent between Dial and Actions (#13018) @eps1lon
- [Slider] Fix thumb outline not matching spec (#12967) @eps1lon
- [SpeedDial] Fix navigation between SpeedDialActions (#12725) @eps1lon
- [Slider] Lowest value for vertical should be at the bottom (#13090) @eps1lon

### Docs

- [docs] Fix more SEO issues (#13050) @oliviertassinari
- [docs] Fix even more 301 redirections (#13051) @oliviertassinari
- [docs] Use typography v1 in examples (#13073) @mikhailsidorov
- [docs] Add SFR Presse to the Showcase (#13092) @RyudoSynbios
- [docs] Mark Text fields variants as supported (#13089) @KaRkY
- [docs] Add internationalization (#13066) @mbrookes
- [docs] Remove language code for default language for CrowdIn (#13093) @mbrookes
- [docs] Update SwipeableTextMobileStepper in demos with AutoPlay (#13095) @JayathmaChathurangani
- [docs] Fix broken link (#13096) @Hocdoc
- [docs] Use the InputBase component for the AppBar demo (#13102) @oliviertassinari
- [docs] Adds DropDownMenu to migration guide (#13110) @mxmcg
- [docs] Warn about the number of inputs allowed in a FormControl (#13108) @matthewdordal
- [docs] Repurpose page edit button as Chinese l10n call-to-action (#13115) @mbrookes
- [docs] Fix a IE11 rendering issue (#13118) @oliviertassinari
- [docs] Link the related projects where it's relevant (#13124) @oliviertassinari
- [docs] Fix 404 edit button of the versions page (#13127) @oliviertassinari
- [docs] Add a translation badge to readme, and update URLs (#13128) @mbrookes

### Core

- [core] Add integrity hashes to yarn.lock (#13055) @eps1lon
- [test] Fail if coverage can't be push (#13084) @eps1lon
- [core] Remove eslint-spellcheck (#13120) @oliviertassinari
- [test] Add jsonlint to CI (#13126) @mbrookes

## 3.1.2
###### *Sep 30, 2018*

Big thanks to the 16 contributors who made this release possible!
It contains many bug fixes 🐛 and documentation improvements 📝.

### `@material-ui/core@v3.1.2`

- [FormControlLabel] Reverse margins values when labelPlacement="start" (#13007) @IvanoffDan
- [InputBase] Fix cursor on disabled state (#13008) @itskibo
- [InputLabel] Add `variant` property to InputLabel type definition (#13009) @chrislambe
- [StepLabel] Introduce StepIconComponent property (#13003) @semos
- [StepConnector] Customize connector based on internal states (#13023) @spirosikmd
- [OutlinedInput] `notched` should be boolean type (#13038) @zheeeng
- [TextField] Add "pointerEvents: none" to outline and filled variants (#13040) @byronluk
- [TextField] Fix the recent regressions (#13017) @slipo
- [Portal] container should allow being 'null' type (#13043) @zheeeng

### `@material-ui/lab@v3.0.0-alpha.18`

#### Breaking change

- [Slider] Replace reversed with rtl support on horizontal sliders (#12972)

### `@material-ui/docs@v3.0.0-alpha.6`

- [docs] Defer NProgressBar rendering to the client (e5d757dc8fec9dd6a0951b865dec531528b7f1d0) @oliviertassinari

### Docs

- [docs] Fix typo in grid.md (#12978) @jschnurr
- [examples] Clean up create-react-app-with-typescript (#12992) @eps1lon
- [docs] Small spelling correction (#13012) @innovade
- [docs] Add closing tag in the Popover snippet (#13026) @liesislukas
- [docs] The Grammar Nazi (#13031) @maciej-gurban
- [docs] Improve the Gatsby demo (#13041) @oliviertassinari
- [docs] Fix 3xx and 4xx HTTP statuses (#13046) @oliviertassinari
- [docs] Fix issues spotted by ahrefs.com (#13047) @oliviertassinari

### Core

- [core] Upgrade the @types/jss dependency to 9.5.6 (#12982) @qvxqvx
- [core] Upgrade the dev dependencies (#13016) @oliviertassinari
- [core] Remove redundant class field initializers, save 1% of bundle size (#13022) @RobertPurcea
- [core] Better assertion (#13035) @oliviertassinari

## 3.1.1
###### *Sep 24, 2018*

Big thanks to the 21 contributors who made this release possible!
It contains many bug fixes 🐛 and documentation improvements 📝.

### `@material-ui/core@v3.1.1`

- [TextField] Fix alignment bug in Safari (#12906) @shcherbyakdev
- [InputLabel] Fix Chrome's autofill (#12926) @PutziSan
- [Tooltip] Fix unwanted tooltip opening (#12929) @ayubov
- [TextField] Fix RTL support of outlined (#12939) @RobertPurcea
- [Button] Make the outlined button border grey when disabled (#12933) @dispix
- [RootRef] Keep track of the DOM node changes (#12953) @oliviertassinari
- [Grid] Fix rounding errors (#12952) @RobertPurcea
- [Tooltip] Back to 100% test coverage (#12954) @oliviertassinari
- [SwipableDrawer] Don't break when backdrop is null (#12969) @spirosikmd
- [InputAdornment] Fix flexbox alignment bug for IE (#12975) @oliviertassinari
- [FilledInput] Update the background color to match the spec (#12977) @adeelibr
- [ListItem] Fix background color bug on mobile (#12976) @ryusaka

### `@material-ui/lab@v3.0.0-alpha.17`

- [Slider] Remove touchend event listener (#12923) @brian-growratio
- [SpeedDialAction] Add missing TypeScript property (#12959) @KarimFereidooni

### Docs

- [docs] Make jss insertion point reference the same as html comment (#12896) @emattias
- [docs] Small fixes (#12904) @oliviertassinari
- [docs] Add reference to material-ui-theme-editor (#12888) @jdrouet
- [docs] Add another case to check when SSR fails (#12908) @oliviertassinari
- [docs] Correct misspelling (dasboard => dashboard) (#12910) @seishan
- [docs] Use core package for (peer-)dependency badges (#12911) @eps1lon
- [docs] Display the backers avatars correctly (3057f970a385fc0cf43e6c978c373b847d0d341e) @oliviertassinari
- [docs] Update themes.md (#12942) @brucegl
- [docs] Fix documentation error in <Input /> (#12955) @lukePeavey
- [docs] Minor style update of the tabs demos (#12958) @dotku
- [docs] Glamorous is deprecated for emotion (#12963) @oliviertassinari
- [docs] Add Emotion to style interoperability guide (#12966) @lukePeavey
- [docs] Fix IconButton Snackbar demos (#12964) @bhalahariharan
- [docs] Show how to combine OutlinedInput and FilledInput (#12968) @oliviertassinari
- [docs] Fix Typo in PaymentForm.js (#12971) @n3n
- [docs] Fix Typo in page-layout-examples (#12974) @n3n

### Core

- [typescript] Improve definitions with strictNullChecks disabled (#12895) @eps1lon
- [typescript] Remove unused isMuiComponent definition (#12903) @eps1lon
- [core] Add setRef helper (#12901) @eps1lon
- [core] Fix umd bundle (#12905) @oliviertassinari
- [core] Use .browserlistrc as single point of thruth for target env §#12912) @eps1lon
- [typescript] Add missing `MuiFilledInput` to 'Overrides' (#12938) @marcel-ernst

## 3.1.0
###### *Sep 16, 2018*

Big thanks to the 24 contributors who made this release possible!

Here are some highlights ✨:
- 💅 Add outlined and filled text field variants (#12076) @enagy27.
- ♿️ Document how to make the icons accessible (#12822).
- 🐛 Fix a class name generation regression (#12844).
- And many more bug fixes 🐛 and documentation improvements 📝.

### `@material-ui/core@v3.1.0`

- [Checkbox] Add indeterminateIcon type definition (#12815) @cvanem
- [Popover] Change to offsetWidth and offsetHeight (#12816) @akaxiaok
- [styles] Use the same class name generator (#12818) @oliviertassinari
- [styles] Revert packageId as default option (#12823) @oliviertassinari
- [withStyles] Fix JSS issues in IE11 in development (#12826) @novascreen
- [autocomplete] Fix incorrect input font in react-select autocomplete demo (#12828) @wijwoj
- [withWidth] Prevent Rerendering (#12825) @junhyukee
- [SvgIcon] Improve accessibility (#12822) @oliviertassinari
- [CircularProgress] Update missing type definitions (#12835) @gsalisi
- [styles] Remove the packageId (#12844) @oliviertassinari
- [Typography] Add inherit and screen reader only (#12837) @oliviertassinari
- [Select] Test if child passed to onChange handler (#12852) @akaxiaok
- [TableSortLabel] Remove sort icon when not active (#12874) @markselby9
- [icons] Add `fontSize` small and large (#12865) @JoshuaLicense
- [Chip] Add an icon property (#12881) @aretheregods
- [TextField] Add outlined and filled variants (#12076) @enagy27

### `@material-ui/lab@v3.0.0-alpha.16`

- [Slider] Don't pass component props down to root div (#12842) @mbrookes
- [Slider] Faster transitions (#12843) @mbrookes
- [SpeedDial] Fix ARIA & fix duplicate id in docs example (#12846) @mbrookes
- [SpeedDial] Remove redundant aria-labelledby (#12847) @mbrookes
- [SpeedDial] Fix not opening on first tap in mobile (#12771) @hashwin
- [Slider] Feature Custom Icon (#12600) @adeelibr

### Docs

- [docs] Fix the gatsby example (#12817) @oliviertassinari
- [docs] Fix Typo in Pricing.js (#12821) @enducker
- [docs] Fix Typo in Checkout.js (#12820) @enducker
- [docs] Fix typo in popover.md (#12832) @amacleay
- [docs] Add documentation for css-to-mui-loader (#12841) @mcdougal
- [docs] Fix ToggleButtons example typography variant (#12845) @mbrookes
- [docs] Fix very minor typo (Docs - page layout examples) (#12849) @bcapinski
- [SvgIcon] Fix minor typo in docs (#12848) @iamhosseindhv
- [docs] Fix typo in blog page layout README (#12868) @sethduncan
- [docs] Update comparison.md (#12877) @GideonShils
- [docs] Split test ad networks (#12878) @mbrookes
- [docs] Customize LinearProgress color (#12883) @mbrn

### Core

- [typescript] Update createGenerateClassName.d.ts (#12824) @Qeneke
- [github] Make issue templates version agnostic (#12839) @mbrookes
- [typescript] Fix with* injectors ignoring defaultProps (#12673) @eps1lon
- [core] Set required yarn version (#12864) @eps1lon
- [core] Upgrade dev dependencies (#12884) @oliviertassinari

## 3.0.3
###### *Sep 9, 2018*

Big thanks to the 13 contributors who made this release possible!

### `@material-ui/core@v3.0.3`

- [typescript] Fix ModalClasses prop type on popover (#12761) @YuriiOstapchuk
- [AppBar] Add position="relative" (#12790) @jgoux
- [Checkbox] Revert input indeterminate support (#12803) @eps1lon
- [Checkbox] Indeterminate CSS & DOM helpers (#12804) @oliviertassinari
- [Chip] Add verticalAlign: 'middle' (#12809) @akaxiaok
- [autocomplete] Fix delete chip not working on mobile (#12813) @aretheregods
- [styles] Support multiple withStyles instances (#12814) @oliviertassinari

### `@material-ui/lab@v3.0.0-alpha.15`

- [SpeedDialAction] Update tooltipPlacement propTypes (#12758) @Primajin
- [ToggleButtons] normalize onChange api (#12549) @eps1lon

### Docs

- [docs] Remove function call from onChange handler (#12785) @snikobonyadrad
- [docs] Unescapes character in markdown (#12778) @schalkventer
- [docs] Enable service worker by default as the latest CRA (#12775) @sharils
- [docs] New DataTable component (#12799) @mbrn
- [docs] Add AppBar demos with exapandable & primary search fields (#12695) @adeelibr
- [docs] Simpler AppBar search demos (#12806) @oliviertassinari
- [docs] Document the shrink status input limitation (#12769) @racingrebel

### Core

- [test] Use yarn offline mirror (#12763) @eps1lon
- [core] Small changes investigating issues (#12812) @oliviertassinari

## 3.0.2
###### *Sep 3, 2018*

Big thanks to the 16 contributors who made this release possible!

Here are some highlights ✨:
- A documented release strategy (#12752).
- And many more bug fixes 🐛 and documentation improvements 📝.

### `@material-ui/core@v3.0.2`

- [Tab] Ability change font size of tab (#12706) @adeelibr
- [typescript] Set default for withStyles' Options generic (#12698) @nmchaves
- [Dialog] Remove dialog margin when fullScreen=true and scroll=body (#12718) @akaxiaok
- [Table] Improved sorting in table for demo EnhancedTable (#12736) @adeelibr
- [Snackbar] Add `ClickAwayListenerProps` property (#12735) @tendermario
- [IconButton] Fix border radius cutting of badges on IE11 (#12743) @novascreen
- [Select] Pass child to onChange handler (#12747) @akaxiaok
- [Input] Fix Input passing inputRef to intrinsic elements (#12719) @eps1lon
- [withStyles] Better theme.props support (#12750) @oliviertassinari
- [SwipeableDrawer] Add hysteresis and velocity property (#12722) @jniclas

### `@material-ui/lab@v3.0.0-alpha.14`

#### Breaking changes

- [ToggleButton] Fix ToggleButtonGroup exports (#12733) @mbrookes

```diff
-import { ToggleButtonGroup } from '@material-ui/lab/ToggleButton';
+import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
```

#### Component Fixes / Enhancements

- [SpeedDialAction] Update tooltipPlacement propTypes (#12730) @Primajin
- [Slider] Add missing packages (#12745) @GermanBluefox
- [SpeedDial] Allow tooltip to always be displayed (#12590) @hashwin

### Docs

- [docs] Fix typo in Overrides chapter (#12705) @sanderpost
- [docs] Improve the Downshift demo (#12703) @oliviertassinari
- [examples] Fix typing of `withRoot` to accept props (#12712) @mattmccutchen
- [docs] Fix class name in overrides example (#12717) @manuelkiessling
- [examples] Fix withRoot accepting any props (#12713) @eps1lon
- [typescript] Illustrate issue with ambiguous css class names (#12724) @eps1lon
- [docs] Fix Typo in Page Layout Examples (#12734) @mblodorn
- [docs] Explain how to pass props down to overridden components (#12716) @manuelkiessling
- [docs] Generate import examples in API docs (#12720) @jedwards1211
- [docs] More transparency around the release strategy (#12752) @oliviertassinari

### Core

N/A

## 3.0.1
###### *Aug 28, 2018*

Big thanks to the 10 contributors who made this release possible!

We are making a quick release after v3.0.0 to patch an incorrect peer dependency.
It's also a good opportunity to upgrade to the stable release of Babel 7.

### `@material-ui/core@v3.0.1`

- [Checkbox] Improve indeterminate status (#12671) @hareaca
- [StepLabel] Fix custom icon spacing (#12694) @JiayuanDeng
- [Chip] Add outlined variant (#12680) @orporan
- [Stepper] Add a new test case (#12684) @Anugraha123
- [core] Upgrade the dependencies (#12693) @oliviertassinari

### `@material-ui/icons@v3.0.1`

- [core] Fix for incorrect peer dependency version warning (#12677) @xaviergonz
- [core] Upgrade the dependencies (#12693) @oliviertassinari

### `@material-ui/lab@v3.0.0-alpha.13`

- [core] Fix for incorrect peer dependency version warning (#12677) @xaviergonz
- [core] Upgrade the dependencies (#12693) @oliviertassinari

### Docs

- [docs] Typo (#12675) @nazartokar
- [docs] Update notification link for release 3.0.0 (#12681) @lumatijev
- [docs] Warn about using withRoot HOC more than one time per page (#12692) @oorestisime

### Core

- [core] Fix for incorrect peer dependency version warning (#12677) @xaviergonz
- [core] Upgrade the dependencies (#12693) @oliviertassinari

## 3.0.0
###### *Aug 27, 2018*

Big thanks to the 27 contributors who made this release possible!

We are upgrading the major version of `@material-ui/core` to match the version of `@material-ui/icons`.
The next major release is planned for [Q1, 2019](https://github.com/mui-org/material-ui/milestone/25).

### Breaking change

- [icons] Save 22 Megabytes from the package (#12662)

Cut the package size by half.
It should make the npm installation twice as fast.
It's not OK to have some installation timeout.
We have removed the `/es` folder.

```diff
-import AccessAlarm from '@material-ui/icons/es/AccessAlarm';
+import AccessAlarm from '@material-ui/icons/AccessAlarm';
```

- [core] Drop Firefox 45 support (#12669)

Firefox 52 is the last version supported by Windows XP.
The market share of Firefox 45 is 0.03%.
We use the same strategy for Chrome.

#### Component Fixes / Enhancements

- [Input] Improve type checking for inputProps (#12591) @eps1lon
- [ClickAwayListener] Prevent rerendering (#12613) @shcherbyakdev
- [Chip] Add missing ChipClassKey values (#12625) @IvanCoronado
- [Dialog] Add 'lg' support to maxWidth (#12626) @TheMoonDawg
- [TableSortLabel] Support custom icon component (#12630) @wolfejw86
- [SvgIcon] Add Icon suffix to SVG icons (#12634) @yordis
- [Collapse] Fix document for style wrapperInner (#12638) @peter50216
- [Input] Extract helpers to their own module (#12657) @Pajn
- [Chip] Add onKeyUp handler for correct behavior (#12660) @markselby9
- [CardActionArea] Add CardActionArea component (#12624) @yuchi
- [ListItem] Move the selected prop from MenuItem to ListItem (#12602) @the-question

#### Docs

- [examples] Update ts example to be closer to the official docs (#12593) @eps1lon
- [docs] Fix a display issue on IE11 (#12599) @oliviertassinari
- [docs] Warn about checking for version mismatch (#12601) @hluedeke
- [docs] Consistent content height in Albumn layout example (#12556) @mbrookes
- [example] Support Gatsby v2 (#12331) @blukai
- [docs] xlarge = extra-large (#12619) @FarzadSole
- [docs] Add "Insights" by justaskusers.com to the list of showcases (#12620) @mattes3
- [docs] Use public api of jss instead of private vars (#12629) @eps1lon
- [docs] Improve Autocomplete filtering suggestions (#12641) @jorgegorka
- [docs] Fix IE 11 support (#12650) @oliviertassinari
- [docs] Fix typos (#12652) @dandv
- [docs] Use the event.target.checked API systematically (#12644) @chellem
- [docs] Correct `by and enum` typo in api.md (#12663) @G-Rath
- [docs] Autocomplete react-select dropdown overlay (#12664) @gerhat
- [docs] Fix typo in usage.md (#12666) @DeveloperDavo

#### Core

- [core] Better Windows support for the API generation (#12584) @adeelibr
- [TypeScript] Update SnackbarContent type def to accept action prop as array (#12595) @cngraf
- [test] Fix the missing libxcursor1 binary (#12611) @oliviertassinari
- [core] Fix recompose version (#12605) @yamachu
- [typescript] Fix AnyComponent for functional components (#12589) @vierbergenlars
- [core] Let's see if the CI catch the issue (#12615) @oliviertassinari
- [typescript] Use interfaces for typography types (#12616) @pelotom
- [ci] Consider only files changed on the built branch (#12627) @eps1lon
- [test] Lint typescript definitions (#12637) @eps1lon
- [core] Upgrade dev dependencies (#12658) @oliviertassinari

#### Lab

- [Slider] Fix memory leaks (#12537) @eps1lon
- [Slider] Fix transitions (#12531) @eps1lon

## 1.5.1
###### *Aug 19, 2018*

Big thanks to the 22 contributors who made this release possible!

Here are some highlights ✨:
- Upgrade Babel to `v7.0.0-rc.1` (#12581).
- Document the meta viewport (#12541).
- And many more bug fixes 🐛 and documentation improvements 📝.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Tab] Fix fullWidth CSS (#12495) @jankjr
- [TextField] Fix disabled prop only affecting the Input component (#12489) @WreckedArrow
- [Table] Sync typings (#12503) @franklixuefei
- [Table] Remove padding from getting spread to native element (#12505) @JoshuaLicense
- [Select] Accept boolean (#12522) @oliviertassinari
- [Avatar] Prepare Preact support (#12519) @jorgegorka
- [Drawer] Change height from 100vh to 100% (#12528) @joemaffei
- [TextField] Accept boolean (#12538) @palaniichukdmytro
- [withWidth] Remove broken innerRef (#12542) @oliviertassinari
- [CardMedia] Add an example with the component property (#12481) @adeelibr
- [ListSubheader] Add a disableGutters property (#12570) @johannwagner
- [Dialog] Simplify the DialogContentText implementation (#12577) @oliviertassinari
- [Popover] Fix wrong getContentAnchorEl definition (#12562) @duvet86

#### Docs

- [docs] Tweak dashboard example nav list heading (#12501) @JoshuaLicense
- [docs] Fix a typo in the Modal page (#12502) @melaniebcohen
- [docs] Don't load the ad on mobile (#12509) @oliviertassinari
- [docs] Fix typo (suot to suit) (#12513) @ratanachai
- [docs] Fix typo in the icons section (#12514) @PolGuixe
- [docs] Document breakpoint argument for withMobileDialog (#12521) @nxtman123
- [docs] Increase SEO potential (#12525) @oliviertassinari
- [docs] "codestyle" comment typo fix (#12511) @nasiscoe
- [docs] Document the meta viewport (#12541) @oliviertassinari
- [docs] Throttle the active toc instead of debouncing (#12543) @oliviertassinari
- [docs] Add material-ui-next-pickers (#12547) @chingyawhao
- [docs] Fix the broken Table sorting logic (#12569) @oliviertassinari
- [docs] Link a new Menu demo (#12574) @pierrelstan
- [docs] Improve typescript issue assistance (#12560) @eps1lon
- [docs] Add notistack in the related projects (#12578) @oliviertassinari

#### Core

- [typescript] Style typing improvements (#12492) @pelotom
- [core] Should run the tests when needed (#12510) @oliviertassinari
- [core] Add MuiTableBody to theme overrides (#12550) @pvdstel
- [test] Disable CircleCI cache (#12573) @oliviertassinari
- [test] Introduce prettier into CI pipeline (#12564) @eps1lon
- [test] Fix prettier ci task with multiple changed files (#12579) @eps1lon
- [core] Upgrade to babel@rc.1 (#12581) @oliviertassinari

#### Lab

- [SpeedDial] Fix invalid prop direction supplied (#12533) @eps1lon
- [SpeedDial] Remove dead code from test (#12545) @mbrookes
- [Slider] Fix failing handler test (#12535) @eps1lon

## 1.5.0
###### *Aug 12, 2018*

Big thanks to the 23 contributors who made this release possible!
This is a dense release!

Here are some highlights ✨:
- Introduce a "page layout examples" section in the documentation. Don't miss it! (#12410) @mbrookes.
- Add a Table Of Contents for each page of the documentation (#12368).
- Improve the TypeScript autocomplete for CSS properties (#12456) @eps1lon.
- And many more bug fixes 🐛 and documentation improvements 📝.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Select] Accept boolean (#12429) @oliviertassinari
- [icons] Resize svg icons (#12356) @the-question
- [Collapse] Add all class keys to the types (#12436) @stuharvey
- [Table] Padding feature (#12415) @aseem191
- [icons] Remove clip-path from all icons (#12452) @kevinnorris
- [Input] Use the color from the theme (#12458) @adeelibr
- [NoSrr] Add a defer property (#12462) @oliviertassinari
- [icons] Remove unused clipPath definitions from icons (#12465) @kevinnorris
- [Popover] Allow to pass repeated props to modal (#12459) @davibq
- [SelectInput] Add "name" to event.target for onBlur callback (#12467) @hassan-zaheer
- [Button] Make the outlined variant better leverage the color (#12473) @essuraj
- [Tooltip] Hide the tooltip as soon as an exit event triggers (#12488) @oliviertassinari

#### Docs

- [docs] Fix react-select multiselection wrapping (#12412) @henkvhest
- [docs] Add some Render Props demos (#12366) @jedwards1211
- [docs] Add example layouts (#12410) @mbrookes
- [core] Fix some errors when porting demos to TypeScript (#12417) @PavelPZ
- [docs] Standardise the wording between icon docs and readme (#12425) @mbrookes
- [docs] Improve the withTheme example (#12428) @oliviertassinari
- [docs] Rename layouts to page-layout-examples + minor fixes (#12430) @mbrookes
- [docs] Ensure `inputRef` is wired up to react-number-format's input (#12444) @NMinhNguyen
- [docs] Expand on the JSS and class name generator docs (#12447) @atrauzzi
- [docs] Better autocomplete docs (#12451) @oliviertassinari
- [docs] Fix typo (#12454) @metropt
- [docs] Better descriptive Table demos (#12464) @bala121286
- [README] New iteration on the backers (#12475) @oliviertassinari
- [docs] Font vs SVG. Which approach to use? (#12466) @PolGuixe
- [docs] Add a Table Of Contents (#12368) @oliviertassinari
- [docs] Fix link to twitter account (#12482) @patcito
- [docs] Try CodeFund over Carbon (#12484) @oliviertassinari

#### Core

- [typescript] Synced with PR #12373 (#12439) @franklixuefei
- [core] Add hoverOpacity to TypeAction interface (#12455) @hassan-zaheer
- [core] Save some bytes in the super() logic (#12476) @oliviertassinari
- [core] Upgrade the dependencies (#12477) @oliviertassinari
- [typescript] improve autocomplete for css properties in createStyles (#12456) @eps1lon

#### Lab

- [SpeedDialAction] Allow a tooltip placement prop (#12244) @seanchambo
- [lab] Depend on @babel/runtime (#12470) @goto-bus-stop

## 1.4.3
###### *Aug 4, 2018*

Big thanks to the 15 contributors who made this release possible!
This release focuses on bug fixes 🐛.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Tooltip] Add default css max-width and customization demo (#12338) @simoami
- [Step] Add completed class to the root (#12339) @kylezinter
- [Drawer] Add touchAction: 'none' on the Overlay to disable scrolling (#12350) @jlascoleassi
- [Chip] Remove reference to checked prop in the docs (#12375) @DavidThorpe71
- [styles] Improve the dangerouslyUseGlobalCSS story (#12389) @oliviertassinari
- [Tooltip] Fix autoFocus issue (#12372) @Mangatt
- [FormLabel] [FormHelperText] classes keys (#12373) @Mangatt
- [Chip] Add color prop to chip component (#12378) @itelo
- [Tooltip] Fix hover issues (#12394) @aseem191
- [palette] Better defensive logic (#12402) @oliviertassinari
- [MobileStepper] Add a LinearProgressProps property (#12404) @oliviertassinari
- [Textarea] Add back defensive branch logic (#12406) @kanzelm3

#### Docs

- [docs] Add markdown code to Interactive Grid (#12333) @itelo
- [docs] Document how to use the Select with a label and a placeholder (#12342) @oliviertassinari
- [docs] Improve the Table sorting logic (#12348) @xkenmon
- [docs] Fix contast => contrast typo (#12395) @chayeoi
- [docs] Fix two typos in Lists.md (#12397) @adl
- [docs] Fix ChipPlayground generated code (#12401) @mbrookes
- [docs] Add Tomahawk boilerplate to the related projects (#12393) @goemen

#### Core

- [core] Upgrade the dependencies (#12409) @oliviertassinari

#### Lab

- [ToggleButton] Fix TypeScript definition (#12360) @itskibo

## 1.4.2
###### *Jul 29, 2018*

Big thanks to the 22 contributors who made this release possible!
I hope we will soon beat our previous record: 30 contributors in a single week.

Here are some highlights ✨:
- Upgrade the react-select demo to v2 (#12307) @oliviertassinari.
- Document a new "No SSR" component (#12317) @oliviertassinari.
- Add a label placement property for FormControlLabel (#12303) @mbrookes.
- And many more bug fixes 🐛 and documentation improvements 📝.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Tabs] Reduce the bundle size (#12256) @oliviertassinari
- [Menu] Add null as acceptable value of anchorEl (#12249) @LAITONEN
- [Popper] Increase the minimal required version of popper.js (#12258) @Tuaniwan
- [TablePagination] Add missing selectIcon ClassKey definition (#12267) @spallister
- [Tooltip] Add some docs for disabled elements (#12265) @kamranayub
- [Tabs] Prevent unwanted auto-move in scrolling tabs (#12276) @novascreen
- [Button] Fix icon positioning on Safari iOS (#12278) @KevinAsher
- [Modal] Add onRendered to ModalProps (#12284) @rynobax
- [Card] Align icons with ListItem (#12292) @mbrookes
- [TextField] Improve onChange type definition (#12294) @t49tran
- [DialogContentText] Inherit TypographyProps in type definition (#12301) @charlieduong94
- [FormControlLabel] Add labelPlacement prop (#12303) @mbrookes
- [FormControlLabel] Correct the style description (#12304) @mbrookes
- [Typography] Add color=textPrimary option (#12310) @oliviertassinari
- [Tooltip] Remove an undocumented API (#12312) @oliviertassinari
- [RootRef] Apply the same logic as React Ref (#12311) @oliviertassinari
- [Grid] Document the nested capability (#12313) @oliviertassinari
- [SwipeableDrawer] Fix SSR issue on iOS (#12314) @oliviertassinari
- [Snackbar] Fix anchorOrigin types (#12316) @nmchaves
- [LinearProgress] Fix wrong style rule usage (#12319) @agentmilindu
- [Popper] Fix modifiers appearing as attribute of div (#12329) @skeithtan

#### Docs

- [docs] Fix typo (#12248) @johnjacobkenny
- [docs] Add typekev.com to showcase page (#12243) @typekev
- [docs] Fix escape "|" char (#12254) @TheRusskiy
- [docs] Fix logo in the README (#12273) @antoinerousseau
- [docs] Add an example with Popper and react-autosuggest (#12280) @oliviertassinari
- [docs] Add Complementary Project - create-mui-theme (#12269) @UsulPro
- [docs] Add a note on the name option and dangerouslyUseGlobalCSS (#12281) @oliviertassinari
- [docs] Improve ListItem and BottomNavigationAction docs (#12295) @vkentta
- [docs] Add placeholder for search bar (#12296) @DheenodaraRao
- [docs] Upgrade react-select (#12307) @oliviertassinari
- [docs] Use data to improve the ranking (#12315) @oliviertassinari
- [docs] Document NoSsr (#12317) @oliviertassinari
- [docs] Improve the docs to have matches (#12322) @oliviertassinari

#### Core

- [core] Upgrade dev dependencies (#12323) @oliviertassinari

#### Lab

- [Slider] Increase color specification conformance (#12245) @eps1lon
- [SpeedDial] Prevent opening when hovering closed actions (#12241) @mbrookes
- [Slider] Remove visual zero state from thumb (#12242) @eps1lon

## 1.4.1
###### *Jul 22, 2018*

Big thanks to the 15 contributors who made this release possible!

Here are some highlights ✨:
- The CSS API is now fully documented (#12174) @mbrookes.

| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">label</span> | Styles applied to the span element that wraps the children.
| … | …

- After many iterations, we are happy to announce `@material-ui/icons` v2.0.0 💃.
With this version, you can take advantage of all the icons recently released by Google:
https://material.io/tools/icons/. There are more than 5,000 icons.
(#12016, #12036, #12170, #12111, #12225)

- The 1.4.0 release of Material-UI has introduced a new implementation of the Tooltip and Popper component.
This release fixes a lot of issues following the rewrite (#12168, #12161, #12194, #12223, #12218).
Thank you for reporting all these problems 🐛. Hopefully, it's very stable now.

- Creative Tim has just completed [their second Material-UI theme](https://www.creative-tim.com/product/material-kit-pro-react?partner=104080) 💅.
It's an important milestone for the themability of Material-UI.
We are going to keep working on adding more themes to the list.

### Breaking change

@material-ui/icons@2.0.0 allows React users to take advantage of the icons revamp the Material Design Team has been recently released. Some icons have been removed, ~150 new icons have been added, and some icons have been renamed. There are also currently some issues with the size of certain icons. Please refer to #12016 for further details.

#### Component Fixes / Enhancements

- [Tab] Fix maxWidth issue with fullWidth mode (#12158) @chenop
- [Popper] Update TypeScript definitions (#12161) @Slessi
- [CardHeader] Add typography/props controls like in ListItemText (#12166) @chenop
- [Tooltip] Fix some new issues (#12168) @oliviertassinari
- [icons] New iteration (#12170) @oliviertassinari
- [icons] Remove fill attribute from some icons (#12111) @ChristiaanScheermeijer
- [Popper] Fix the transition in the demos (#12194) @oliviertassinari
- [Modal] Ignore if the event prevent default is called (#12202) @oliviertassinari
- [Grid] Add "space-evenly" value for justify prop (#12213) @iain-b
- [Grow] Fix scroll on entered (#12199) @stephenway
- [Popper] Fix update logic (#12218) @oliviertassinari
- [Badge] Increase readability (#12221) @oliviertassinari
- [styles] Increase the class name lenght limit before raising (#12222) @oliviertassinari
- [icons] Fix SVG path precision issue (#12225) @ChristiaanScheermeijer
- [Popper] Typing and documentation (#12223) @dispix
- [Select] Simpler onChange event.target logic (#12231) @oliviertassinari
- [input] Forward required, readOnly and autoFocus (#12234) @sakulstra
- [HOC] Add `innerRef` to withWidth and withTheme (#12236) @itelo
- [Textarea] Simplification of the code (#12238) @oliviertassinari
- [Tabs] Small changes investigating #11624 (#12239) @oliviertassinari

#### Docs

- [docs] Add Toggle Selection Control to 'Migration From v0.x' Document (#12149) @shabareesh
- [docs] Add Menu Item to 'Migration From v0.x' Document (#12150) @shabareesh
- [docs] New ISSUE_TEMPLATE (#12148) @oliviertassinari
- [docs] Add Font Icon to 'Migration From v0.x' Document (#12151) @shabareesh
- [docs] copyedit: typo in testing.md (#12155) @cldellow
- [docs] Document the CSS API (#12174) @mbrookes
- [docs] An iteration on the SSR Troubleshooting section (#12229) @oliviertassinari

#### Core

- [core] Upgrade dev dependencies (#12156) @oliviertassinari
- [core] Add missing unwrap export to test-utils type definition (#12184) @kallebornemark
- [test] Conditional tests (#12191) @oliviertassinari
- [core] Fix babel plugin name (#12209) @oliviertassinari
- [core] Upgrade the dev dependencies (#12220) @oliviertassinari
- [core] Rename node to ref (#12235) @oliviertassinari

#### Lab

- [Slider] Fix typescript typings (#12173) @eps1lon
- [SpeedDial] Fix SpeedDialAction dark theme (#12230) @mbrookes
- [lab] Build and export fixes (#12233) @goto-bus-stop

## 1.4.0
###### *Jul 14, 2018*

Big thanks to the 21 contributors who made this release possible.
Here are some highlights ✨:
- Rework the Tooltip implementation (#12085)

The component is -1kB gzipped smaller and much faster.
You can render 100 of them on a page with no issue.
It's also introducing a new component: Popper, an abstraction on top of [Popper.js](https://github.com/FezVrasta/popper.js).

- Add color selector (#12053) @mbrookes

People can now dynamically change the theme of the whole documentation.

- Add a new toggle buttons component (#10144) @phallguy
- And many more bug fixes and documentation improvements.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Icons] Misc fixes and optimizations (#12036) @mbrookes
- [Tooltip] Rework the implementation (#12085) @oliviertassinari
- [Snackbar] Fix SnackbarOrigin TypeScript definition (#12083) @tzfrs
- [Dialog] Fix action width issue (#12081) @mim-Armand
- [theme] Use `isPlainObject` to avoid dropping prototypes (#12100) @kivlor
- [Popper] Add a modifiers property (#12108) @oliviertassinari
- [Button] Fix IE11 support of CSS 'width:initial' (#12119) @koshea
- [FormControlLabel] Add a failing test case and fix it (#12141) @oliviertassinari
- [Toolbar] Add dense variant (#12075) @srilman
- [Typography] Fix display2 cuts off the bottom of a 'g' (#12146) @Skaronator

#### Docs

- [docs] Fix typo (#12046) @AlexanderLukin
- [docs] Fix wrong icon names (#12042) @AlexanderLukin
- [docs] Fix typo (#12050) @AlexanderLukin
- [docs] Fix Typo (#12064) @johnjacobkenny
- [docs] Add known issues/limitations for progress animations (#12062) @HRK44
- [docs] Correct the normalize-function (#12066) @fauskanger
- [docs] Add react-media-material-ui in the related projects (#12068) @jedwards1211
- [docs] Fix SSR example to support production mode (#12080)
- [docs] Fix Theme nesting demo in codesandbox (#12097) @oliviertassinari
- [docs] Use the de-structured "children" variable (#12104) @jzhang729
- [docs] Add Tidelift banner (#12099) @oliviertassinari
- [docs] Fix some broken links (#12107) @oliviertassinari
- [docs] Preconnect to load the fonts (#12113) @oliviertassinari
- [docs] Improve grid demo descriptions (#12112) @mbrookes
- [docs] Add color selector (#12053) @mbrookes
- [docs] Add Tentu in the showcase (#12122) @urkopineda
- [docs] Add Subheader to v0.x migration guide (#12144) @shabareesh
- [docs] Add a comment that React 16.3.0 is a peer dependency (#12145) @chenop
- [Table] Document the CSS API (#12147) @chenop

#### Core

- [core] Upgrade the dev dependencies (#12049) @oliviertassinari
- [core] Improve the prop-types of shape (#12098) @oliviertassinari
- [core] Upgrade dev dependencies (#12117) @oliviertassinari
- [core] Error typo fix (#12118) @TheRusskiy
- [test] Fix Argos-CI flakyness (#12142) @oliviertassinari

#### Lab

- [ToggleButtons] Add toggle buttons (#10144) @phallguy
- [Slider] Make interaction easier, fix thumb overflow (#11889) @ValentinH
- [SpeedDial] Inline the Add icon (#12128) @mbrookes

## 1.3.1
###### *Jul 2, 2018*

Big thanks to the 13 contributors who made this release possible.

Here are some highlights ✨:
- Document the scroll property of the Dialog (#12025).
- Add a demo with Font Awesome (#12027).
- And many more bug fixes and documentation improvements.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Select] Fix some W3C issues (#11983) @oliviertassinari
- [Icon] Add a fontSize prop which accepts default and inherit (#11986) @sakulstra
- [Menu] Add prop to disable auto focus (#11984) @th317erd
- [SvgIcon] Add component property (#11987) @stephenway
- [GridList] Clean the rendering logic (#11998) @oliviertassinari
- [Snackbar] Add check for autoHideDuration if equals 0 (#12002) @C-Rodg
- [Menu] Fix scrolling issue (#12003) @stephenway
- [Stepper] Merge StepPositionIcon in StepIcon (#12026) @bousejin
- [Input] Add read only demo (#12024) @oliviertassinari
- [ExpansionPanelSummary] Add IconButtonProps property (#12035) @dakotamurphyucf
- [Dialog] Document the scroll property (#12025) @oliviertassinari

#### Docs

- [docs] Use _app.js instead of wrapping every page by withRoot() (#11989) @NikitaVlaznev
- [docs] Link RootRef in the FAQ (#12005) @scottastrophic
- [docs] Add Core UI (#12015) @oliviertassinari
- [docs] Switch autosuggest highlighting (#12019) @TheRusskiy
- [docs] Small spelling fix (#12028) @danh293
- [docs] Add a demo with Font Awesome (#12027) @oliviertassinari

#### Core

- [typescript] [createMuiTheme] Fix typings & deepmerge shape (#11993) @franklixuefei
- [core] Warn about Children.map & Fragment (#12021) @oliviertassinari
- [core] Remove usage of theme.spacing.unit (#12022) @oliviertassinari

#### Lab

N/A


## 1.3.0
###### *Jun 26, 2018*

Big thanks to the 10 contributors who made this release possible.

Here are some highlights ✨:
- 🔥 Add extended Floating Action Button variant (#11941) @mbrookes.
- 🔥 Add scroll body handling for the dialog (#11974).
- 📝 Work on SEO for the components (#11963).

### Breaking change

N/A

#### Component Fixes / Enhancements

- [FormControl] Correct minor typo in text (#11931) @FluentSynergyDW
- [Grid] Add `auto` to TypeScript definitions (#11933) @woobianca
- [styles] Safer prefix logic (#11943) @oliviertassinari
- [Button] Add extended FAB variant (#11941) @mbrookes
- [styles] Warn when the first argument is wrong (#11953) @oliviertassinari
- [ClickAwayListener] Handle null child (#11955) @oliviertassinari
- [theme] Add border-radius to the theme (#11847) @itelo
- [Dialog] Add a scroll property (#11974) @oliviertassinari

#### Docs

- [Showcase] Add posters galore (react-admin) (#11939) @fzaninotto
- [docs] Update ts example (#11949) @kevinhughes27
- [docs] Add Outline docs (#11960) @tomasdev
- [docs] Do SEO for the components (#11963) @oliviertassinari
- [docs] Better API wording (#11973) @oliviertassinari
- [docs] In Typescript doc, add missing `createStyles` to import (#11975) @Sylphony

#### Core

- [typescript] Fix Typings for disableTouchRipple and allVariants (#11944) @franklixuefei
- [core] Upgrade the dev dependencies (#11954) @oliviertassinari
- [core] Upgrade eslint (#11957) @oliviertassinari
- [core] Upgrade preval (#11958) @oliviertassinari
- [core] Use Chrome Headless for the tests over PhantomJS (#11961) @oliviertassinari

#### Lab

N/A

## 1.2.3
###### *Jun 20, 2018*

Big thanks to the 6 contributors who made this release possible.

This release fixes some important regressions.
We are making it outside of the normal schedule.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [ButtonBase] Fix exception (#11905) @oliviertassinari
- [NoSSR] Add a fallback property (#11907) @oliviertassinari
- [Dialog] Add max-height back (#11914) @oliviertassinari
- [Tooltip] Revert update react-popper (#11920) @oliviertassinari
- [Select] Fix classes merge issue (#11904) @C-Rodg

#### Docs

- [docs] Document jss-nested rule reference feature (#11901) @i8ramin
- [docs] Correct markdown example from svg icon (#11922) @GabrielDuarteM
- [docs] TS decorating reword (#11923) @swpease

#### Core

N/A

#### Lab

- [Slider] Add TypeScript definitions (#11747) @epodivilov

## 1.2.2
###### *Jun 18, 2018*

Big thanks to the 16 contributors who made this release possible.

Here are some highlights ✨:
- 📝 Document the dynamic override alternatives (#11782) @adeelibr
- 📝 Document the ClickAwayListener component (#11801).
- And many more bug fixes 🐛 and documentation improvements 📝.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [ClickAwayListener] Add a demo (#11801) @oliviertassinari
- [Grid] Add support a auto value (#11804) @oliviertassinari
- [StepButton] Fix IE 11 flexbox (#11814) @paulnta
- [styles] Re-add default parameter of string for WithStyles (#11808) @pelotom
- [SwipeableDrawer] Allow custom style (#11805) @Johann-S
- [ButtonBase] Corrected the type definitions for the TouchRipple classes (#11818) @C-Rodg
- [RootRef] Updated main index.js to include RootRef export (#11817) @C-Rodg
- [typography] Add a `allVariants` key in the theme (#11802) @oliviertassinari
- [ButtonBase] Add a disableTouchRipple property (#11820) @oliviertassinari
- [Tabs] Fix calculating tab indicator position (#11825) @ljani
- [Tabs] Fix IE11 support (#11832) @oliviertassinari
- [withWidth] Reading initialWidth from the theme (#11831) @kleyson
- [Tabs] Add support for a `component` property (#11844) @C-Rodg
- [ListItemText] Detect and avoid re-wrapping Typography (#11849) @jedwards1211
- [ListItemText] Add primaryTypographyProps and secondaryTypographyProps (#11858) @jedwards1211
- [Tooltip] Update react-popper (#11862) @oliviertassinari
- [TableCell] Fix property name (#11870) @marutanm
- [Modal] Fix removeEventListener (#11875) @DominikSerafin
- [CircularProgress] Fix wobble (#11886) @oliviertassinari
- [CircularProgress] End of line shape: use butt (#11888) @Modestas
- [Select] Fix reflow in render (#11891) @oliviertassinari

#### Docs

- [docs] Add structured data (#11798) @oliviertassinari
- [docs] Add a link to a CSS-in-JS egghead.io course (98168a2c749d8da2376d6a997145e3622df71bff) @kof
- [Table] Derive sorted rows from state at render time in demo (#11828) @charlax
- [docs] Document the dynamic override alternatives (#11782) @adeelibr
- [docs] Add a Select required example (#11838) @oliviertassinari
- [docs] Better class names conflict FAQ (#11846) @oliviertassinari
- [docs] Add a link toward dx-react-chart-material-ui (#11859) @Krijovnick
- [docs] Fix the Gatsby example (d7fe8c79dc097105fd1c6035b76a4d30666e9080) @oliviertassinari
- [docs] Update npm downloads badge to point to @material-ui/core (#11590) @davidcalhoun
- [examples] Add Server Rendering implementation (#11880) @oliviertassinari
- [docs] Update react-swipeable-views to fix a warning (#11890) @oliviertassinari

#### Core

- [core] Misc (#11797) @oliviertassinari
- [core] Better `component` prop types (#11863) @jedwards1211
- [core] Remove some unneeded code (#11873) @oliviertassinari
- [core] Fix the UMD release (#11878) @oliviertassinari
- [core] Document the non supported children properties (#11879) @oliviertassinari

#### Labs

N/A

## 1.2.1
###### *Jun 10, 2018*

Big thanks to the 15 contributors who made this release possible.

Here are some highlights ✨:
- A lot of bug fixes 🐛!
- Add full `React.createRef` support ⚛️ (#11757) @t49tran.
- Document the `withWidth()` helper

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Select] Add a placeholder demo (#11706) @oliviertassinari
- [RootRef] Update RootRef.d.ts (#11708) @franklixuefei
- [ButtonBase] Document the `type` property (#11728) @C-Rodg
- [Popover] Fix default value (#11729) @oliviertassinari
- [withWidth] Second iteration on the component (#11730) @oliviertassinari
- [transition] Fix IE11 issue in dev mode (#11743) @adeelibr
- [Tabs] Better flex layout (#11748) @adeelibr
- [core] Add React.createRef support (#11757) @t49tran
- [Grid] Improve the dev warnings (#11765) @oliviertassinari
- [CircularProgress] Fix centering (#11781) @adeelibr
- [TextField] Bind the focus/blur explicitly (#11789) @oliviertassinari
- [RadioGroup] Fix onChange chaining (#11793) @oliviertassinari

#### Docs

- [docs] Property !== attribute (#11694) @adeelibr
- [docs] Add Trafikito.com to showcase (#11716) @liesislukas
- [docs] Update meetingku image (#11724) @liganok
- [docs] Improve docs:dev init by ~2 s and HMR by ~200 ms (#11752) @tal952
- [docs] Change app bar to button on the getting started (#11756) @Simperfit
- [docs] Add React Most Wanted to related projects (#11753) @TarikHuber
- [docs] Error in example in Migration From v0.x Guide (#11771) @AkselsLedins
- [docs] Simple Grammar Fix (#11785) @jeff-kilbride
- [docs] Fix typo (#11787) @BenDiuguid
- [docs] Better troubleshooting action for the hydration mismatch (#11792) @oliviertassinari

#### Core

- [core] Remove parser specification to fix JSON issue (#11763) @ryanpcmcquen
- [core] Throw if react >= 16.3.0 requirement isn't matched (#11779) @oliviertassinari
- [core] Better warnings for class names duplicates (#11788) @oliviertassinari
- [core] Remove dead code (#11791) @oliviertassinari

#### Labs

- [Slider] Fix for IE11 (#11727) @epodivilov
- [Slider] Value can still be updated while disabled (#11744) @epodivilov

## 1.2.0
###### *Jun 3, 2018*

Big thanks to the 23 contributors who made this release possible.

Here are some highlights ✨:
- Start upgrading the button component to match the new Material specification (#11497) @mbrookes.
- Fix some regressions (#11614, #11689).
- And many more bug fixes and documentation improvements.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Snackbar] Add customization example (#11597) @mbrn
- [Menu] Fix a regression on Edge (#11614) @oliviertassinari
- [TextField] Replace underline content text with nbsp (#11617) @Jdubedition
- [TextField] Fix grammar for docs (#11633) @RobBednark
- [ListItem] Fix typings for ListItem (#11645) @franklixuefei
- [Button] Add text and contained variants (#11497) @mbrookes
- [Chip] Add `clickable` property (#11613) @vilvaathibanpb
- [Popover] Add timeout prop to TransitionComponent (#11657) @C-Rodg
- [styles] Better class name conflict warning (#11685) @oliviertassinari
- [Grid] Better support for theme.props (#11688) @oliviertassinari
- [ListItemText] Fix primary={0} display (#11686) @helfi92
- [SwipeableDrawer] Fix a regression introduced in React 16.4.0 (#11689) @oliviertassinari
- [RootRef] Allow using React.createRef api with RootRef component (#11681) @TrySound

#### Docs

- [docs] Better API spread section (#11598) @oliviertassinari
- [docs] Update Wertarbyte components link (#11603) @leMaik
- [docs] Add a changelog page (#11604) @oliviertassinari
- [docs] Keep the current version into account (#11595) @oliviertassinari
- [ROADMAP] Update the roadmap (#11606) @oliviertassinari
- [example] Fix missing brackets typescript (#11623) @Ilaiwi
- [docs] Update overrides.md (#11630) @risafletcher
- [docs] Styled API Example (5 lines) (#11620) @mssngr
- [docs] Mention view port size in SVGIcon documentation (#11639) @JesusCrow
- [docs] Update README for codemod (#11647) @sacdallago
- [docs] Update link to flow-typed definitions (#11674) @jessrosenfield
- [docs] Minor grammitcal error (#11691) @NeuTrix

#### Core

- [typescript] Depend directly on CSSType (#11608) @pelotom
- [core] Upgrade dependencies (#11616) @oliviertassinari
- [typescript] createStyles and improved WithStyles helpers (#11609) @pelotom
- [core] Add cross-env back (#11638) @lookfirst
- [typescript] Fix keyof for typescript@2.9 (#11669) @mctep
- [core] Some fixes looking into issues (#11676) @oliviertassinari
- [core] Upgrade dependencies (#11684) @oliviertassinari

#### Labs

- [SpeedDial] Fix classes prop description (#11599) @mbrookes
- [Slider] Misc fixes towards standard MUI patterns (#11605) @mbrookes
- [Slider] Fire the right event on mouseDown (#11642) @acroyear
- [SpeedDial] Add type definitions to lab, so SpeedDial can be use with TypeScript project (#11542) @TR3MIC

## 1.1.0
###### *May 26, 2018*

Big thanks to the 30 contributors who made this release possible.

Here are some highlights ✨:
- A smaller bundle, saved 5 kB gzipped (#11511, #11492, #11521, #11523) @TrySound
- A new Slider component in the lab (#11040) @epodivilov.
- And many more bug fixes and documentation improvements.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [ListSubheader] Fix demo import path (#11468) @Hocdoc
- [Backdrop] Fix export paths (#11481) @brandonhall
- [ListItem] Take the focusVisibleClassName property into account (#11451) @rdemirov
- [Grid] Allow shrink in items so text will wrap by default (#11411) @ShaneMcX
- [StepLabel] Allow StepIcon customization (#11446) @jargot
- [StepConnector] Exposes the component (#11478) @racingrebel
- [Tabs] Fix TabIndicatorProps merge (#11494) @adeelibr
- [ButtonBase] Fix React propTypes buttonRef warning (#11519) @t49tran
- [ListItemText] Shouldn't be a heading by default (#11544) @adeelibr
- [GridListTileBar] Add missing title and subtitle keys (#11570) @ljani
- [TableCell] Fix padding for last TableCell if checkbox (#11568) @gfpacheco
- [Button][ButtonBase] Take advantage of defaultProps for component prop (#11574) @cherniavskii
- [StepConnector] Add to default export from @material-ui/core (#11583) @OsipovIgor
- [ButtonBase] Improve enter & space handling (#11585) @TheBear44

#### Docs

- [examples] Fix imports for Dialog (#11469) @sboles
- [docs] Add v0 subdirectory redirects (#11470) @mbrookes
- [docs] Remove trailing slash on progress-indicators link (#11473) @srt32
- [docs] Add HSTS header (#11475) @mbrookes
- [docs] Add missing word to documentation (#11476) @Skn0tt
- [docs] Specify correct corner to locate directional toggle (#11479) @jacquesporveau
- [examples] Fix create-react-app-with-jss theme object (#11485) @Dror88
- [docs] Add Snippets Chrome extension to showcase (#11487) @richardscarrott
- [docs] Fix hyphen for iOS (#11490) @mbrookes
- [docs] Prevent content-type: application/octet-stream (#11501) @oliviertassinari
- [docs] Add Customized Switches section (#11505) @mbrookes
- [docs] Remove Firebase config file & deploy script (#11516) @mbrookes
- [docs] Pull versions from github API (#11522) @mbrookes
- [docs] Removed references to Grid's hidden property (#11529) @lfalke
- [docs] Remove background grid from Typography variants demo (#11562) @mbrookes
- [docs] Finish incomplete list-item-text.md documentation (#11559) @codeheroics
- [docs] Add outlined buttons to ButtonSizes demo (#11509) @mbrookes
- [docs] Add a Troubleshooting section for SSR (#11579) @oliviertassinari
- [docs] Fix a little typo in typescript docs (#11580) @saculbr
- [docs] Add react-admin to related projects (#11582) @fzaninotto
- [docs] Update the showcase (#11578) @mbrookes

#### Core

- [typescript] Make TypographyStyle assignable to CSSProperties, misc other typing fixes (#11456) @pelotom
- [core] Cut the head of the snake 🐍 (#11477) @oliviertassinari
- [core] Add esm bundle to start tracking treeshakability (#11489) @TrySound
- [core] More aggressive transpilation (#11492) @oliviertassinari
- [core] Enable loose mode for staged featues (#11511) @TrySound
- [core] Simplify the babel docs config (#11514) @oliviertassinari
- [core] Remove lodash 💃 (#11521) @oliviertassinari
- [core] Internalize ScrollbarSize (#11523) @oliviertassinari
- [typescript] Add sample with return types (#11512) @yacut

#### Labs

- [SpeedDial] Clean up SpeedDialIcon transition (#11513) @mbrookes
- [Slider] Port component (#11040) @epodivilov

## 1.0.0
###### *May 17, 2018*

Our first stable v1 release! 🎉

It has taken us two years to do it, but Material-UI v1 has finally arrived!
We are so excited about this release, as it's setting a new course for the project. Thank you to *everyone*, especially to [the team](https://material-ui.com/discover-more/team/), and to everyone who's contributed code, issue triage, and support. **Thank you**.

Some statistics with v1 while it was in alpha and beta:
- 304 contributors
- 2390 commits
- From 0 downloads/month to 300k downloads/month
- From 0 users/month to 90k users/month

## 1.0.0-rc.1
###### *May 15, 2018*

Big thanks to the 10 contributors who made this release possible.

Here are some highlights ✨:
- Thanks for trying out v1.0.0-rc.0! This release focus on fixing the reported bugs 🐛.
- Great focus on the performance (#11358, #11360, #11364) @goto-bus-stop, @TrySound
We will have more time to work on that topic post v1.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [codemod] Revert the codemod inception on the tests (#11376) @oliviertassinari
- [typescript] Fix DialogContent export (#11378) @ljvanschie
- [Dialog] Fix content export (#11393) @stefensuhat
- [icons] Remove deadcode (#11400) @oliviertassinari
- [NativeSelect] New component (#11364) @oliviertassinari
- [Popover] Fix max height issue in some mobile browsers (#11349) @gaborcs

#### Docs

- [docs] Update notifications for v1.0.0-rc.0 (#11351) @simsim0709
- [Snackbar] Fix transition directions demo (#11391) @serendipity1004
- [docs] Remove react@15 message (#11399) @deltaskelta
- [docs] Better netlify cache control (#11404) @oliviertassinari

#### Core

- [core] Do not include polyfills in the ES modules build (#11358) @goto-bus-stop
- [core] Workaround a Babel regression (#11398) @oliviertassinari
- [core] Fix size-limit for the new Next path (#11401) @oliviertassinari
- [core] Require node >=8.0.0 to work on the project (#11407) @netdeamon
- [core] Bundle UMD with rollup (#11360) @TrySound

## 0.20.1
###### *May 13, 2018*

Big thanks to the 14 contributors who made this release possible.

#### Component Fixes / Enhancements

- [Tabs] Add support for inline style override for parent container of InkBar (#9598) @PharaohMaster
- Popover does not listen to events unless it is open at the moment (#9482) @romanzenka
- [EnhancedButton] Fix onClick event being fired twice on "Enter Key" press (#9439) @karaggeorge
- [Slider] Fix handle case where ref is null (#10006) @jony89
- [RaisedButton] Conditionally apply overlay backgroundColor (#9811) @walwoodr
- [Snackbar] Static properties for reason string constants (#10300) @RavenHursT
- [TextField] Fix caret position issue (#10214) @MaratFaskhiev
- Add sideEffects: false for webpack 4 (#11167) @matthoffner

#### Docs

- [docs] Adding smpl to showcase (#9386) @Bonitis
- [docs] Remove HEAD in versions list (#9391) @HZooly
- Add Governance Document (#9423) @hai-cea
- [docs] Add v1 recommendation to home page (#9727) @mbrookes
- [docs] Remove BrainBOK from showcase (#11292) @brainbok

## 1.0.0-rc.0
###### *May 13, 2018*

Big thanks to the 11 contributors who made this release possible.

Here are some highlights ✨:
- Introduce the last planned breaking changes before stable v1

### Breaking change

- [core] Move material-ui to @material-ui/core (#11310) @oliviertassinari

```diff
-import { withStyles } from 'material-ui/styles';
+import { withStyles } from '@material-ui/core/styles';
```

- [core] Flatten the import path (#11330) @oliviertassinari

#### Motivation

1. It's a simple pattern to learn. People won't need to go back and forth with the documentation to learn the import paths 💭.
2. People bundle size will decrease 🚀.
3. In an ideal world, we would import everything from the root module and tree sharking would be taken care of for us. This change doesn't matter in this world ☮️.
```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui';
```

#### The diff

```diff
-import CircularProgress from '@material-ui/core/Progress/CircularProgress';
+import CircularProgress from '@material-ui/core/CircularProgress';
```

```diff
-import { ListItem } from '@material-ui/core/List';
+import ListItem from '@material-ui/core/ListItem';
```

#### Upgrade path

We provide a codemod to automate the migration: https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod#import-path. I have used it to upgrade all the demos in the documentation :).

- [core] Require React 16.3.0 or greater (#11347, #11361) @oliviertassinari
- [Grid] Remove the hidden property (#11348) @oliviertassinari

Split the responsabilities between the different components. Help with tree-shaking.

```diff
-        <Grid item xs hidden={{ xlUp: true }}>
-          <Paper>xlUp</Paper>
-        </Grid>
+        <Hidden xlUp>
+          <Grid item xs>
+            <Paper>xlUp</Paper>
+          </Grid>
+        </Hidden>
```

- [TextField] change underline approach to prevent browser zoom issue (#11181) @Jdubedition

The text underline color customization change:
```diff
   underline: {
     '&:after': {
-      backgroundColor: purple[500],
+      borderBottomColor: purple[500],
     },
   },
```

#### Component Fixes / Enhancements

- [CircularProgress] Add transition for static variant (#11313) @oliviertassinari
- [createTypography] Add primary text color to 'button' typography variant (#11322) @ValentineStone
- [styles] Fix typings for FontStyle (#11326) @vkentta
- [Grid] Add 32px gutter to grid spacing (#11338) @abnersajr
- [Button] Add outlined variant (#11346) @leMaik

#### Docs

- [docs] v0 redirect (#11303) @mbrookes
- [docs] Add a new premium-theme (#11300) @oliviertassinari
- [docs] Prepare the v1 release (#11317) @oliviertassinari
- [docs] Add HIJUP.com to the showcase site (#11328) @fikriauliya
- [docs] Update material.io URLs (#11334) @mbrookes
- [docs] Make the button examples consistent (#11352) @mbrookes
- [docs] Eradicate 'Useful to' (#11353) @mbrookes
- [docs] Move v1-beta to master (#11354) @oliviertassinari
- [docs] Install with yarn (#11357) @Xakher

#### Core

- [typescript] Add CreateMuiTheme props Typescript definition (#11296) @abnersajr
- [typescript] Fix color type in augmentColor function (#11302) @AiusDa
- Make WithStylesOptions extend the options argument of createStyleSheet (#11325) @pelotom
- [core] Update the dev dependencies (#11355) @oliviertassinari

## 1.0.0-beta.47
###### *May 9, 2018*

Big thanks to the 4 contributors who made this release possible.

Here are some highlights ✨:
- Fix an important regression (Babel upgrade)

### Breaking change

- [typescript] Fix withStyles edge cases (#11280) @pelotom

If you are using TypeScript, 2.8 or later is required.

#### Component Fixes / Enhancements

- [withStyles] Support createRef() (#11293) @rolandjitsu
- [InputLabel] Remove the width style property (#11297) @C-Rodg

#### Docs

N/A

#### Core

- [core] Add @babel/runtime as a dependency (#11298) @oliviertassinari

## 1.0.0-beta.46
###### *May 8, 2018*

Big thanks to the 7 contributors who made this release possible.

Here are some highlights ✨:
- Fix an important regression (npm dependency)

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Table] Add table-footer-group CSS (#11264) @t49tran
- [ButtonBase] Add a focusVisible action (#9712) @tkvw
- [ButtonBase] Better performance (#11277) @oliviertassinari
- [Tabs] Add a TabIndicatorProps property (#11254) @adeelibr

#### Docs

- [docs] Improve the table examples' accessibility (#11256) @mbrookes
- [docs] Add Pilcro to showcase apps (#11274) @hugowoodhead

#### Core

- [typescript] Fix type definitions for Snackbar and CircularProgress (#11265) @franklixuefei
- [core] Upgrade Babel 6 to Babel 7 (#10964) @oliviertassinari
- [core] npm shouldn't be a dependency (#11263) @oliviertassinari

## 1.0.0-beta.45
###### *May 6, 2018*

Big thanks to the 12 contributors who made this release possible.

Here are some highlights ✨:
- A release date. We will release Material-UI v1 May 17th.
- Improve the performance of withStyles by adding memoization (#11202) @CharlesStover.
- Standardization of the component injection pattern (#11204) @oliviertassinari
- And many more bug fixes and documentation improvements.

### Breaking change

- [core] Standardize the component injection pattern (#11204) @oliviertassinari

I couldn't find a clean way to support the render props pattern.
Doing such would require to greatly reduce the usage of JSX.
It would really harm source code readability.

Instead, I have been focusing on standardizing our component injection story.
This way, we can go back to the render props after stable v1 is released and see if source code readability worth be sacrificed for the render prop pattern.

```diff
<Tabs
- TabScrollButton={TabScrollButtonWrapped}
+ ScrollButtonComponent={TabScrollButtonWrapped}
```

```diff
<TablePagination
- Actions={TablePaginationActionsWrapped}
+ ActionsComponent={TablePaginationActionsWrapped}
```

```diff
<Dialog
- transition={Transition}
+ TransitionComponent={Transition}
```

```diff
<Menu
- transition={Transition}
+ TransitionComponent={Transition}
```

```diff
<Snackbar
- transition={Transition}
+ TransitionComponent={Transition}
```

```diff
<Popover
- transition={Transition}
+ TransitionComponent={Transition}
```

```diff
<StepContent
- transition={Transition}
+ TransitionComponent={Transition}
```

- [Snackbar] Rename SnackbarContentProps (#11203) @oliviertassinari

This change is for consistency with the other components. No need to repeat the component name in the property.

```diff
       <Snackbar
-        SnackbarContentProps={{ 'aria-describedby': 'notification-message' }}
+        ContentProps={{ 'aria-describedby': 'notification-message' }}
```

- [CircularProgress] Remove min & max props (#11211) @mbrookes

Makes the API consistant with LinearProgress

```diff
<CircularProgress
- min={10}
- max={20}
- value={15}
+ value={(15 - 10) / (20 - 10) * 100}
/>
```

- [ButtonBase] Complete the focusVisible rename (#11188) @oliviertassinari

The rename started with #11090. I should have taken the time to complete it in the first place. This way, we are fully consistent with the spec: https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo :)

```diff
<ButtonBase
- onKeyboardFocus={this.handleVisible}
+ onFocusVisible={this.handleVisible}
```

#### Component Fixes / Enhancements

- [ButtonBase] Update TypeScript to sync with the implementation (#11189) @franklixuefei
- [styles] Simpler outline reset (#11199) @oliviertassinari
- [Transition] Add a TransitionProps (#11201) @oliviertassinari
- [TablePagination] Allow the MenuItem customization (#11200) @oliviertassinari
- [ListItemIcon] Take advantage of CSS inheritance (#11206) @xiaoyu-tamu
- [StepButton] Allow null to be assigned to icon prop (#11221) @franklixuefei
- [TextField] Increase shrunk label width to match 100% input width (#11215) @pandaiolo
- [Select] Add IconComponent property (#11136) @sepehr1313
- [withStyles] Memoization the classes property (#11202) @CharlesStover
- [NProgress] Better RTL support and closer to YouTube version (#11246) @oliviertassinari
- [Stepper] Swipeable demo integration (#11241) @Klynger
- [codemod] Prepare the import path breaking change (#11249) @oliviertassinari
- [codemod] Support the private and direct imports (#11253) @oliviertassinari
- [Table] Fix Typescript classes support (#11255) @t49tran

#### Docs

- [docs] Fix typo in comparison.md (#11185) @morleytatro
- [docs] Fix dark theme display (#11194) @oliviertassinari
- [example] Revert wrong change (#11195) @oliviertassinari
- [docs] Improve server-rendering, replace render by hydrate (#11210) @Mystraht
- [docs] Update notification (#11213) @simsim0709
- [docs] Clarify the difference with enzyme (#11228) @oliviertassinari
- [docs] Add a note on the override of internal states (#11227) @oliviertassinari
- [docs] Misc fixes (#11239) @mbrookes
- [docs] Document the theme.props feature (#11245) @oliviertassinari
- [docs] Speedup a bit the homepage (#11248) @oliviertassinari

#### Core

- [test] Fix the CI (#11187) @oliviertassinari
- [core] Update dependencies (#11240) @oliviertassinari

## 1.0.0-beta.44
###### *Apr 29, 2018*

Big thanks to the 17 contributors who made this release possible.

### Breaking change

- [CardMedia] Escape background image url (#11126) @Bennit

As long as you are providing a valid URL to `<CardMedia image />`, it should be working. However, previously `"` escaped URL will no longer work.

#### Component Fixes / Enhancements

- [SwipeableDrawer] Prevent interaction with the drawer content if not opened (#11091) @leMaik
- [Icon] Prevent shrinking when inside a flex container (#11097) @ValentinH
- [Grid] Fix TypeScript definitions of class keys (#11102) @nmchaves
- [Portal] Revert "Global option to disable the portal" (#11116) @oliviertassinari
- [ButtonBase] Simpler global focus visible style override (#11130) @oliviertassinari
- [Modal] Prevent IE11 from crashing on modal close (#11115) @JonAbrams
- [Input] Fix infinite rendering loop (#11159) @oliviertassinari
- [lab] Fix the tests (#11160) @oliviertassinari
- [Snackbar] Add a consecutive demo (#11111) @simoami
- [Tabs] Better Ant Design demo (#11095) @theiliad
- [Popover] Improve the demos (#11175) @oliviertassinari

#### Docs

- [docs] Add npm-registry-browser into showcase (#11114) @topheman
- [docs] Fix the flow example (#11118) @prastut
- [docs] Add showcase for Local Insights (#11131) @hrdymchl
- [docs] Add iOS momentum scrolling (#11140) @cherniavskii
- [docs] Add a CSS modules example (#11171) @oliviertassinari
- [docs] Fix typo in themes.md (#11149) @zhuangya
- [docs] Make sure next@6 is working (#11168) @oliviertassinari
- [docs] Correct spelling error in FormDialog.js example (#11176) @weldon0405

#### Core

- [core] Reduce the size of the npm package (#11144) @oliviertassinari
- [typescript] allow pseudos on any theme mixins (#11145) @rosskevin
- [core] Upgrade dev dependencies (#11146) @oliviertassinari
- [styles] Fix constraint on withStyles P parameter to allow StyledComponentProps (#11156) @pelotom

## 1.0.0-beta.43
###### *Apr 22, 2018*

Big thanks to the 8 contributors who made this release possible.

Here are some highlights ✨:
- A better keyboard focused customization story (#11090) @oliviertassinari
- Various TypeScript fixes

### Breaking change

- [ButtonBase] Better keyboard focused story (#11090) @oliviertassinari
  - Rename the `keyboardFocused` feature `focusVisible` in order to follow the CSS specification wording:
  https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo
  - Give up on the `classes` property to host the focus visible feature. The fact that the classes don't cascade was making it hard to use. Instead, we rely on a `focusVisibleClassName` property. This is allowing any component along the rendering chain to use the feature. For instance, a Switch component: Switch > SwitchBase > IconButton > ButtonBase.

  ```diff
  <ButtonBase
  - classes={{
  -   keyboardFocused: 'my-class-name',
  - }}
  + focusVisibleClassName="my-class-name"
  />
  ```

#### Component Fixes / Enhancements

- [typescript] Constrain props type param appropriately in withStyles, withTheme, withWidth HOCs (#11003) @estaub
- [typescript] make Select's onChange prop optional (#11041) @nmchaves
- [Table] Remove overflow (#11062) @oliviertassinari
- [TablePagination] Allow the override of the action buttons (#11058) @lukePeavey
- [Popover] Add option to disable Menu auto positioning (#11050) @nicoffee
- [Input] Allow div props on InputAdornment in TypeScript (#11077) @mtandersson
- [Dialog] Fix iOS momentum scroll (#11066) @greenwombat
- [Portal] Global option to disable the portal (#11086) @oliviertassinari
- [ExpansionPanel] Fix display on IE11 and Edge (#11087) @oliviertassinari
- [CardActions] Fix CSS override (#11092) @oliviertassinari

#### Docs

- [docs] Fix broken link (#11042) @imrobinized
- [CONTRIBUTING] Update the docs (#11078) @oliviertassinari

#### Core

- [core] Better distinction between the private and public components (#11051) @oliviertassinari
- [core] Upgrade dev dependencies (#11096) @oliviertassinari

## 1.0.0-beta.42
###### *Apr 16, 2018*

Big thanks to the 15 contributors who made this release possible.

Here are some highlights ✨:
- A better CSS override story (#10961) @oliviertassinari
- Strongly typed React.CSSProperties TypeScript definitions (#11007) @pelotom
- And many more bug fixes and documentation improvements.

### Breaking change

- [styles] Change the CSS specificity (#10961) @oliviertassinari

This breaking change is important. It might be the most painful to recover from before stable v1 (May 17th 2018).
We have changed the CSS specificity rule to solve #10771 at scale.

It's inspired by the Bootstrap approach to writing CSS. It follows two rules:
1. A variant has **one level of specificity**.
For instance, the `color` and `variant` properties are considered a variant.
The lower the style specificity is, the simpler you can override it.
2. We increase the specificity for a variant modifier.
We already **have to do** it for the pseudo-classes (`:hover`, `:focus`, etc.).
It allows much more control at the cost of more boilerplate.
Hopefully, it's more intuitive.

Example:
```diff
const styles = {
-  checked: {
-    color: green[500],
+  root: {
+    color: green[600],
+    '&$checked': {
+      color: green[500],
+    },
   },
+  checked: {},
};

<Checkbox
  classes={{
+   root: classes.root,
    checked: classes.checked,
  }}
/>
```

#### Component Fixes / Enhancements

- [lab] No side effect (7c379fa7ba4ed2a3eb8abc841a9a4376014b6145) @oliviertassinari
- [Card] Hide overflow to maintain round corners with CardMedia (#10946) @mbrookes
- [ButtonBase] More robust button keyboard accessibility (#10965) @oliviertassinari
- [Tooltip] Remove title from chldrenProps (#10977) @mbrookes
- [theme] Expose augmentColor for colors outside the palette (#10985) @AiusDa
- [Select] Update onChange props definition to match with SelectInput (#11012) @t49tran
- [lab] Bump version for @material-ui/icons dependency (#10992) @mbrookes
- [Drawer] Improve the "Mini variant drawer" demo (#11010) @andriyor
- [Step] Remove private modules from the export (#11020) @oliviertassinari
- [Grid] Update propTypes to accept false (#11022) @oliviertassinari
- [Chip] only transition the CSS properties we need (#11023) @oliviertassinari
- [CssBaseline] Add key to theme overrides type definition (#11025) @roosmaa
- [Tabs] Add a customization demo (#10999) @cherniavskii
- [theme] Use a single theme variable for the hover effects of Button, IconButton and ListItem (#10952) @SebastianSchmidt
- [Dialog] Fix BackdropProps propagation (#11029) @sepehr1313
- [ButtonBase] Fix wrong touchMove wiring (#11026) @mbrookes
- [SwipeableDrawer] Simplify isSwiping logic (#11032) @leMaik
- [SwipeableDrawer] Add a blocking div to the edge of the screen (#11031) @leMaik

#### Docs

- [docs] Fix typo (#10990) @jleeohsu
- [docs] Better private/public API description (#11024) @oliviertassinari
- [Collapse] Fix typo in comment (#11035) @mknet

#### Core

- [core] Add fallback to ownerWindow (#10978) @richardscarrott
- [typescript] Remove unnecessary Partial<> for `style` prop (#10994) @franklixuefei
- [core] Export all the style modules (#11021) @oliviertassinari
- [typescript] Upgrade types, use string index fallback for CSSProperties to allow nested pseudos (#11007) @pelotom
- [core] Upgrade the dependencies (#11030) @oliviertassinari
- [core] Move to the packages structure (#11033) @oliviertassinari

## 1.0.0-beta.41
###### *Apr 7, 2018*

Big thanks to the 14 contributors who made this release possible.

Here are some highlights ✨:
- An icon package ready for v1 stable (#10902, #10933, #10957).
- An important focus on the documentation.
- And many more bug fixes and documentation improvements.

### Breaking change

- Move the icon package from `material-ui-icons` to `@material-ui/icons` (#10957) @oliviertassinari

```diff
-import FormatTextdirectionRToL from 'material-ui-icons/FormatTextdirectionRToL';
+import FormatTextdirectionRToL from '@material-ui/icons/FormatTextdirectionRToL';
```

#### Component Fixes / Enhancements

- [icons] Reduce code duplication (#10902) @cherniavskii
- [icons] Check if `global` is defined before trying to use it (#10933) @joliss
- [Table] Fix EnhancedTable example to not scroll TablePagination (#10878) @mbrookes
- [Zoom] Export Zoom in the TypeScript definitions (#10897) @Klynger
- [IconButton] Add hover effect to IconButton (#10871) @SebastianSchmidt
- [TextField] Add an icon example (#10899) @oliviertassinari
- [SwipeableDrawer] Disable swiping on iOS by default (#10877) @leMaik
- [SwipeableDrawer] Fix crash when swiping during an update (#10906) @leMaik
- [ListItemText] Fix invalid ListItemText 'children' proptype (#10948) @kendallroth
- [BottomNavigationAction] Use default childIndex value only if value undefined (#10937) @peterbartos
- [styles] Add a warning to prevent a memory leak (#10953) @oliviertassinari
- [Select] Fix width update (#10956) @oliviertassinari

#### Docs

- [docs] Add hideHeader option to Demo component (#10887) @mbrookes
- [docs] Document the /es folder (#10888) @oliviertassinari
- [docs] More transparent exportPathMap method (#10894) @oliviertassinari
- [docs] Dodge issue with hoist-non-react-statics (#10896) @oliviertassinari
- [docs] Add missing apostrophe (#10911) @davidgilbertson
- [docs] Improve the search experience (#10905) @oliviertassinari
- [docs] Improve the layout for premium themes (#10901) @mbrookes
- [docs] Fix example in TypeScript docs (#10924) @piotros
- [docs] Atomic state update in the Stepper demo (#10936) @iceveda06
- [docs] Add versions page (#10883) @mbrookes
- [docs] Fix npm urls (#10949) @sujeetkrjaiswal
- [docs] Add "Do I have to use JSS?" to FAQ (#10954) @mbrookes

#### Core

- [typescript] Upgrade React and JSS typings, which both make use of csstype now (#10903) @pelotom

## 1.0.0-beta.40
###### *Apr 1, 2018*

Big thanks to the 4 contributors who made this release possible.

Here are some highlights ✨:
- React 16.3.0 support (#10867).
- Many bug fixes on the Tooltip component (#10843) @shssoichiro.
- A much better navigation experience on the docs (#10859).

### Breaking change

- [Tooltip] Portal the component to the body (#10843) @shssoichiro

We take advantage of the latest features of React 16.x.
React is allowing us to return an array of elements in the render method.
We have removed the useless root `div` element.
Nothing has changed for people using React 15.x.

#### Component Fixes / Enhancements

- [FormControlLabel] Enable disabled label CSS modifications (#10841) @vkentta
- [Select] Throw when the non native select is not controlled (#10860) @oliviertassinari
- [Drawer] Back to 100% test coverage (#10861) @oliviertassinari
- [core] Work on React 16.3.0 support (#10867) @oliviertassinari

#### Docs

- [docs] typo: reponse => response (#10850) @luminaxster
- [docs] Remove dead code (#10855) @oliviertassinari
- [docs] Much better navigation experience (#10859) @oliviertassinari
- [examples] Demonstrate how to use the icons CDN (#10874) @oliviertassinari

#### Core

- [core] Remove the addEventListener module (#10856) @oliviertassinari
- [core] Upgrade the dependencies (#10853) @oliviertassinari
- [core] Rename .spec.js to .test.js (#10854) @oliviertassinari

## 1.0.0-beta.39
###### *Mar 28, 2018*

Big thanks to the 25 contributors who made this release possible.

Here are some highlights ✨:
- Add a [swipeable drawer](https://material-ui.com/demos/drawers/#swipeable-temporary-drawer) component (#9730) @leMaik.
- Add a [StackBlitz](https://stackblitz.com/) edit link (#10758).
- Add a new npm package: [@material-ui/docs](https://www.npmjs.com/package/@material-ui/docs) (#10699).
- And many more bug fixes and documentation improvements.

### Breaking change

- [Grid] Change the default spacing value: 0 (#10768) @oliviertassinari

The negative margin implementation solution currently used comes with [serious limitations](https://material-ui.com/layout/grid/#negative-margin).
Material-UI is the only library with a non-zero default spacing between the items.
Having zero spacing by default will ease the usage of the component.

```diff
-<Grid />
+<Grid spacing={16} />
```

- [Tooltip] Rename disableTriggerX (#10700) @oliviertassinari

For consistency with the [removeEventListener Web API](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) and the Snackbar `disableWindowBlurListener` property.

```diff
<Tooltip
- disableTriggerFocus
- disableTriggerHover
- disableTriggerTouch
+ disableFocusListener
+ disableHoverListener
+ disableTouchListener
/>
```

- [InputLabel] Rename FormControlClasses property (#10796) @oliviertassinari

I have made a mistake in [#8108](https://github.com/mui-org/material-ui/pull/8108). The property isn't applied on a `FormControl` but on a `FormLabel` component.

```diff
-<InputLabel FormControlClasses={classes} />
+<InputLabel FormLabelClasses={classes} />
```

#### Component Fixes / Enhancements

- [Switch] Add missing TypeScript class keys (#10691) @wenduzer
- [ClickAwayListener] Add mouseEvent and touchEvent property (#10694) @tgrowden
- [Switch] Add default color (#10697) @oliviertassinari
- [StepButton] Support vertical stepper (#10698) @danieljuhl
- [TextField] Update defaultValue prop types (#10703) @moondef
- [Input] Rename isDirty to isEmpty (#10704) @oliviertassinari
- [Select] Perfom the layout computation as soon as possible (#10706) @oliviertassinari
- [Stepper] Add error prop to StepIcon and StepLabel (#10705) @nicoffee
- [Grid] Add zeroMinWidth to Typescript definition (#10712) @cvanem
- [Select] Fix data-value value (#10723) @a-x-
- [Tooltip] Update error message (#10742) @MoonDawg92
- [TextField] Apply onFocus and onBlur on the input (#10746) @oliviertassinari
- [TextField] Remove dead code (#10757) @oliviertassinari
- [Checkbox] Add checkedPrimary and checkedSecondary to Typescript definition (#10747) @cvanem
- [️MuiThemeProvider] TypeScript disableStylesGeneration (#10759) @djeeg
- [Input] Relax inputProps and inputComponent Types (#10767) @pelotom
- [Tabs] Warn on invalid combination (#10788) @oliviertassinari
- [Select] Better document event.target.value (#10791) @oliviertassinari
- [Drawer] Add Swipeable feature (#9730) @leMaik
- [Select] Add support for autoFocus (#10792) @nicoffee
- [Icon] Fix typing by taking out fontSize property (#10821) @franklixuefei

#### Docs

- [docs] Add new npm package: @material-ui/docs (#10699) @oliviertassinari
- [docs] Use buttonRef instead of ref in anchor playground example (#10708) @pelotom
- [docs] Fix "Edit this page" button (#10722) @SebastianSchmidt
- [docs] Add search shortcut (#10725) @oliviertassinari
- [docs] Make navigation look more like the material guidelines (#10709) @leMaik
- [docs] Clarify discrepancies from default theme (#10732) @yihangho
- [examples] Update next.js PWA color (#10749) @blainegarrett
- [docs] Add StackBlitz demo link (#10758) @oliviertassinari
- [docs] Fix typo TextField demo (#10766) @elertan
- [docs] Better CssBaseline documentation (#10770) @oliviertassinari
- [docs] Remove flow warning (#10780) @rosskevin
- [docs] Minor typographical fix (#10786) @samdenty99
- [docs] Selection control, customization example (#10787) @oliviertassinari
- [docs] Fix typo (#10794) @dylangarcia
- [examples] Update Flow Example (#10799) @prastut
- [docs] Material Dashboard Pro React (#10832) @oliviertassinari

#### Core

- [core] Upgrade the dev dependencies (#10702) @oliviertassinari
- [typings] Fix `mixins.gutter` signature (argument is optional) (#10814) @sebald

## 1.0.0-beta.38
###### *Mar 17, 2018*

Big thanks to the 19 contributors who made this release possible.

This release comes with important theme upgrades. Here are some highlights ✨:
- Introduction of a Premium Themes section (#10616).
- A `props` theme key to globally inject properties on components (#10671).
- A theme option to change the font-size (#10687).
- And many more bug fixes and documentation improvements.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Select] Fix chip alignment (#10611) @adamszeptycki
- [Tabs] Add 'scrollButtons' and 'indicator' to TabsClassKey Typescript defintion (#10618) @cvanem
- [TablePagination] Add SelectProps property (#10629) @mrahman1122
- [ListItemSecondaryAction] Vertically center (#10628) @jedwards1211
- [Select] Add visual tests to prevent future regression (#10642) @oliviertassinari
- [Popover] Update anchorEl type (#10645) @nicoffee
- [styles] Better color manipulator warning (#10652) @oliviertassinari
- [Autocomplete] Show how to use the label (#10653) @oliviertassinari
- [ButtonBase] Update class keys (#10659) @lukePeavey
- [FromHelperText] Add missing component prop definition (#10658) @franklixuefei
- [theme] Reduce the negative margin (#10672) @oliviertassinari
- [theme] Add a props theme key (#10671) @oliviertassinari
- [DialogActions] Add missing TypeScript property (#10674) @youngnicks
- [GridList] Should allow optional children (#10680) @rosskevin
- [DialogContentText] Extend the Typography component (#10683) @oliviertassinari
- [theme] Allow changing the font-size (#10687) @oliviertassinari
- [Stepper] Soft ripple background (#10690) @oliviertassinari

#### Docs

- [docs] Add project to showcase (#10614) @jdupont
- [docs] Fix typo (#10621) @prastut
- [docs] Updating the TS example to use CssBaseline (#10633) @yuchen-w
- [docs] Better support of multiline for downshift (#10641) @oliviertassinari
- [docs] Simplify LongMenu demo (#10646) @RichardLindhout
- [docs] Improve the onboarding (#10639) @oliviertassinari
- [docs] Fix usage of CssBaseline/Reboot in the CDN example (#10655) @SebastianSchmidt
- [docs] Fix reference to CssBaseline component (#10654) @SebastianSchmidt
- [themes] Introduce a themes website ⚡️  (#10616) @oliviertassinari
- [docs] Fix reference to FAQ (#10660) @SebastianSchmidt
- [docs] Fix reference to Popover demo (#10661) @SebastianSchmidt
- [docs] Fix reference to Modal demo (#10662) @SebastianSchmidt
- [docs] Add Rung to showcase (#10669) @vitorebatista
- [docs] Add Bit as a sponsor ❤️ (#10673) @oliviertassinari
- [docs] Third iteration on the homepage (#10670) @oliviertassinari
- [docs] Add Team SC into showcase (#10676) @Losses
- [docs] Handle optional params (#10685) @oliviertassinari
- [docs] Customized tables (#10686) @oliviertassinari

#### Core

- [typescript] Remove xxxClassName props from type declarations (#10644) @lukePeavey
- [typescript] Add inline style prop to transition (#10650) @nmchaves

## 1.0.0-beta.37
###### *Mar 11, 2018*

Big thanks to the 13 contributors who made this release possible.

Here are some highlights ✨:
- An important fix of the focus/blur logic of the Select (#10538) @oliviertassinari.
- A multiple selection downshift example (#10550) @oliviertassinari.
- A new parcel example (#10575) @oliviertassinari.
- And many more bug fixes and documentation improvements.

### Breaking change

- [classes] Move the XXXClassName to the classes property (#10600) @oliviertassinari

These properties were introduced before `classes`.
Exposing a single pattern makes things more predictable and easier to work with.

```diff
-<Tabs buttonClassName="foo" indicatorClassName="bar" />
+<Tabs classes={{ scrollButtons: 'foo', indicator: 'bar' }} />
```

```diff
-<TextField labelClassName="foo" helperTextClassName="bar" />
+<TextField InputLabelProps={{ className: 'foo' }} FormHelperTextProps={{ className: 'bar' }} />
```

- [CssBaseline] Rename from Reboot (#10605}

The new wording should clarify the purpose of the component.
For instance, it's not about adding JavaScript polyfills.

```diff
-<Reboot />
+<CssBaseline />
```

#### Component Fixes / Enhancements

- [Select] Fix wrong onBlur onFocus logic (#10538) @oliviertassinari
- [ExpansionPanel] Fix controlled behavior (#10546) @oliviertassinari
- [Autocomplete] Add multiple downshift example (#10550) @oliviertassinari
- [Autocomplete] selectedItem can be null (#10565) @caub
- [core] Improve IE11 support (#10568) @oliviertassinari
- [TextField] Better inputComponent demo (#10573) @oliviertassinari
- [typescript] Add a test case for ListItemIcon (#10593) @oliviertassinari
- [ListItemText] Make the children an alias of the primary property (#10591) @caub
- [Button] Fix Button variant prop description (#10578) @teekwak
- [Table] Fix table pagination example empty row height (#10588) @amcgee
- [Icon] Fix a bug in Chrome 64.0 (#10594) @caub
- [List] use theme for margin in ListItemText (#10597) @caub
- [StepIcon] enable CSS modifications of active step (#10599) @vkentta
- [Tooltip] Add enterTouchDelay and leaveTouchDelay props (#10577) @petegivens

#### Docs

- [docs] Simplify the CDN example (6e4cc723689961582ede16db421cbdf24ac7c4b9) @oliviertassinari
- [docs] Add showcase to readme - componofy (#10541) @DalerAsrorov
- [docs] Add Cryptoverview to the showcase (#10545) @leMaik
- [docs] Add menu Collapse example (#10548) @oliviertassinari
- [docs] Add PersonalBlog Gatsby starter to Showcase (#10566) @greglobinski
- [docs] Add parcel example (#10575) @oliviertassinari
- [docs] Fix typo in contributing readme (#10586) @chiragmongia
- [docs] Fix next.js example to enable styled-jsx with material-ui (#10580) @shibukawa
- [docs] Add the latest backers (#10602) @oliviertassinari
- [docs] Add Planalyze to Showcase (#10603) @dancastellon
- [docs] Improve the htmlFontSize documentation (#10604) @oliviertassinari

#### Core

- [core] Fix type definitions (#10553) @stefanorie
- [core] Better overrides merge support (#10606) @oliviertassinari

## 1.0.0-beta.36
###### *Mar 5, 2018*

Big thanks to the 14 contributors who made this release possible.

Here are some highlights ✨:
- We have started the effort toward supporting the async API of react@16.3.0 (#10489, #10523) @oliviertassinari.
- Document how to use Material-UI with a CDN (#10514) @zelinf.
- And many more bug fixes and documentation improvements.

### Breaking change

- [SvgIcon] Allow changing the width with the font-size (#10446) @oliviertassinari

Remove the `fontSize` property. The `SvgIcon` behavior is closer to the `Icon` behavior.
```diff
-<Icon fontSize />
-<SvgIcon fontSize />
+<Icon />
+<SvgIcon />
```
Now, you can use the `font-size` style property to changr the size of the icon.

- [classes] Normalize the classes names (#10457) @oliviertassinari

This is an effort in order to harmonize the classes API.
The best way to recover from this breaking change is to check the warnings in the console and to check the added documentation around the design rules around this API.

#### Component Fixes / Enhancements

- [Table] Default display style for all table components (#10447) @caub
- [Collapse] Fix description (#10454) @onurkose
- [ButtonBase] Add a TouchRippleProps property (#10470) @christophediprima
- [Select] Ensure label is shrinked when using startAdornment (#10474) @carab
- [Card][List] Implement responsive gutters (#10477) @lukePeavey
- [icon] Add "side-effects": false to material-ui-icons (#10482) @b1f6c1c4
- [IconButton] Fix theme.spacing.unit size dependency (#10486) @oliviertassinari
- [ListItem] Avoid li > li issue (#10484) @oliviertassinari
- [ListItem] Fix ContainerProps.className propagation (#10488) @oliviertassinari
- [Textarea] Prepare React 16.3.0 (#10489) @oliviertassinari
- [icon] Add build:es for material-ui-icons (#10497) @b1f6c1c4
- [ButtonBase] Fix the ripple on Edge (#10512) @oliviertassinari
- [Autocomplete] Update the demos so people can stack the components (#10524) @oliviertassinari
- [Button] Add override support for sizeLarge and sizeSmall (#10526) @wenduzer
- [Modal] Use prototype functions in ModalManager (#10528) @ianschmitz

#### Docs

- [docs] Fix Roadmap docs formatting (#10501) @cherniavskii
- [docs] EnhancedTable Demo (#10491) @kgregory
- [docs] Add new Showcase project (#10509) @chriswardo
- [Select] Document when the value is required (#10505) @MichaelArnoldOwens
- [Select] Document the renderValue signature (#10513) @oliviertassinari
- [docs] Add a CDN example (#10514) @oliviertassinari
- [docs] Fix SSR rendering in Gatsby example (#10536) @LegNeato

#### Core

- [core] Prepare the async API (#10523) @oliviertassinari
- [core] Upgrade the dev dependencies (#10456) @oliviertassinari
- [core] Upgrade the dev dependencies (#10515) @oliviertassinari

## 1.0.0-beta.35
###### *Feb 24, 2018*

Big thanks to the 20 contributors who made this release possible.

Here are some highlights ✨:
- A new lab npm package (#10288) @mbrookes.
- A breaking changes ROADMAP before v1 (#10348) @oliviertassinari.
- And many more bug fixes and documentation improvements.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [Stepper] Add style override types (#10334) @vkentta
- [Input] Reset the line-height (#10346) @oliviertassinari
- [Select] Revert #9964 (#10347) @oliviertassinari
- [lab] Create lab package, add SpeedDial (#10288) @mbrookes
- [Button] Update Button mini description (#10355) @lorensr
- [SpeedDial] Fix onClick target element (#10368) @mbrookes
- [IconButton] Fix class key types (#10374) @vkentta
- [Chip] Ignore events generated by descendants (#10372) @maxdubrinsky
- [CardHeader] Add missing "action" classes key definition (#10379) @chubbsMcfly
- [Dialog] Consistent description (#10377) @oliviertassinari
- [Select] Fix the vertical-align (#10380) @oliviertassinari
- [Snackbar] Disable pausing of auto hide when window loses focus (#10390) @SebastianSchmidt
- [Select] Add `SelectDisplayProps` prop (#10408) @noah-potter
- [SelectInput] Add tabIndex prop (#10345) @keenondrums
- [Select] Make 'type' prop able to be overwritten (#10361) @fabijanski
- [Select] Set type undefined rather than null (#10430) @caub
- [ButtonBase] Fix accessibility (#10434) @oliviertassinari
- [SwitchBase] Fix defaultChecked issue (#10444) @tanmayrajani
- [SwitchBase] Prevent defaultChecked regression (#10445) @oliviertassinari

#### Docs

- [Transitions] Document transition style prop handling (#10322) @AdamGorkoz
- [Drawer] Add clipped navigation drawer demo (#10330) @AdamGorkoz
- [docs] Fix demo links for new util components (#10337) @jprince
- [docs] Add react-final-form to Related Projects (#10352) @mbrookes
- [docs] rename theme-default to default-theme (#10356) @mbrookes
- [docs] Fix modal page link (#10360) @tanmayrajani
- [docs] Plan the breaking changes before v1 (#10348) @oliviertassinari
- [docs] Fix IE 11 and W3C warnings (#10394) @oliviertassinari
- [docs] Sort the pages by path and ignore dashes (#10396) @leMaik
- [docs] Autocomplete migration (#10397) @oliviertassinari
- [docs] Add AudioNodes to the showcase (#10407) @JohnWeisz
- [docs] Breaking changes feedback notification (#10413) @mbrookes
- [docs] Improve readability (#10412) @oliviertassinari
- [docs] Add material-ui-autosuggest to related projects (#10415) @tgrowden
- [docs] Update transitions.md (#10417) @caub
- [docs] Fix minor typo in breaking-changes notification (#10418) @phazor
- [docs] Description of how component will render (#10432) @oliviertassinari
- [docs] Add CSSGrid comparison example (#10433) @caub

#### Core

- [core] Upgrade some dependency to start looking into React 16.3 (#10338) @oliviertassinari
- [core] Remove direct references to window/document objects (#10328) @ianschmitz
- [core] Use tabIndex as number (#10431) @oliviertassinari

## 1.0.0-beta.34
###### *Feb 17, 2018*

Big thanks to the 21 contributors who made this release possible.

Here are some highlights ✨:
- Checkbox, Radio, Switch update to follow the spec and be consistent with the Input (#10196, #10138) @phsantiago, @mbrookes.
- The documentation works offline (#10267) @msiadak.
- Better styled-components documentation (#10266) @rocketraman.
- And many more bug fixes and documentation improvements.

### Breaking change

- [Checkbox, Radio, Switch] Fix id in internal input (#10196) @phsantiago

For consistency between the `Input` and the `Checkbox`, `Switch`, `Radio` the following small breaking changes have been done:

The usage of the `inputProps` property is no longer needed to apply an id to the input. The `id` is applied to the input instead of the root.
```diff
-<Checkbox inputProps={{ id: 'id' }} />
+<Checkbox id="id" />
```
The `inputType` property was renamed `type`.
```diff
-<Checkbox inputType="text" />
+<Checkbox type="text" />
```

- [Checkbox, Radio, Switch] Change default color, add color prop (#10138) @mbrookes

The Material Design specification says that selection controls elements should [use the application's secondary color](https://material.io/guidelines/components/selection-controls.html).
```diff
-<Checkbox />
-<Switch />
-<Radio />
+<Checkbox color="primary" />
+<Switch color="primary" />
+<Radio color="primary" />
```

#### Component Fixes / Enhancements

- [Input] Fix infinite loop (#10229) @oliviertassinari
- [CircularProgress] Add static variant (#10228) @oliviertassinari
- [Transition] Add the missing teardown logic (#10244) @oliviertassinari
- [Avatar] Use theme.spacing.unit (#10268) @cherniavskii
- [InputLabel] Add inheritance docs (#10282) @oliviertassinari
- [Input][ExpansionPane] Remove the use of legacy easing-curve (#10290) @strayiker
- [TableCell] Add "scope" attribute for th (#10277) @z-ax
- [styles] Fix typo (#10303) @strayiker
- [Button] Add fullWidth to ButtonClassKey (#10310) @stefanorie
- [TextField] Fix wrong SSR height of the textarea (#10315) @oliviertassinari
- [ClickAwayListener] Fix interaction with SVGElement (#10318) @KEMBL
- [Icon] Add fontSize to typings (#10317) @clentfort
- [Slide] Work with SVG too (#10325) @oliviertassinari

#### Docs

- [docs] Update links on showcase.md (#10227) @klyburke
- [docs] Remove dead code in Drawers (#10230) @oliviertassinari
- [docs] Add utils section, document transitions (#10239) @mbrookes
- [docs] Fix small issues (#10245) @oliviertassinari
- [docs] Add transform-origin and timeout to Grow demo #10246 @mbrookes
- [docs] Add modole.io to showcase (#10247) @mweiss
- [docs] Better API generator (#10249) @oliviertassinari
- [docs] Use non-breaking space (#10252) @oliviertassinari
- [example] TypeScript instructions (a81e5f9e54fdcc4648ffe6bdc08eaa596fb0a9bc) @oliviertassinari
- [docs] Fix the migration guide doc page (#10257) @nicolasiensen
- [docs] Update example in README.md (#10259) @nikoladev
- [docs] Fix typo in button component demo (#10260) @bmuenzenmeyer
- [docs] styled components non-root components (#10266) @rocketraman
- [Selection Control] Symmetry between the demos (#10279) @oliviertassinari
- [docs] Remove StepConnector from Steppers demo (#10301) @jdupont
- [docs] Add precaching Service Worker to exported docs builds (#10267) @msiadak
- [docs] Add missing rel=noopener (#10307) @oliviertassinari
- [docs] Add the average response time (#10308) @oliviertassinari
- [docs] Update TextFields.js (#10313) @Primajin
- [docs] Add toggling with react-popper (#10302) @caub
- [docs] Add the latest backers ♥ (#10323) @oliviertassinari
- [docs] Expose the theme as a global object (#10326) @oliviertassinari
- [docs] Add an example with Google Web Fonts (#10332) @oliviertassinari

#### Core

- [core] Fix the es distribution (#10254) @NMinhNguyen
- [typescript] Add missing exports in index.d.ts (#10295) @Andy4ward
- [core] Upgrade react-popper (#10299) @oliviertassinari

## 1.0.0-beta.33
###### *Feb 10, 2018*

Big thanks to the 16 contributors who made this release possible.

Here are some highlights ✨:
- A documentation section on the `component` property (#10128) @sebald.
- A Snackbar / FAB animation integration example (#10188) @mbrookes.
- The Select open state can be controlled (#10205) @oliviertassinari.
- And many more bug fixes and documentation improvements.

### Breaking change

N/A

#### Component Fixes / Enhancements

- [typescript] Use Partial props in TypeScript definitions (#10170) @ianschmitz
- [GridList] Allow null children in GridListTile (#10179) @caub
- [Grid] Small performance improvement (#10180) @oliviertassinari
- [TextField] Correct typo in TypeScript export declaration (#10186) @caghand
- [Switch] Increase the box shadow when checked (#10187) @leMaik
- [Stepper] Mobile Stepper variant determinate (#10190) @KeKs0r
- [MenuItem] Better :hover and .selected logic (#10199) @oliviertassinari
- [LinearProgress] Property definition grammar fix (#10201) @madison-kerndt
- [MuiThemeProvider] Forward the options when nested (#10176) @Aetherall
- [Select] Simpler controlled open property (#10205) @oliviertassinari
- [typescript] Use types from react-transition-group/Transition (#10129) @sebald
- [typescript] Export WithTheme from index (#10209) @clekili
- [Stepper] Increase StepButton space for click (#10204) @AlbertLucianto
- [ButtonBase] Use parent Window of ButtonBase when listening for keyboard events (#10224) @ianschmitz
- [StepLabel] Give more flexibility to the style of span surrounding label (#10218) @seanchambo
- [ButtonBase] Save one line of code (#10225) @oliviertassinari

#### Docs

- [examples] Rename type to variant (#10167) @oliviertassinari
- [docs] Using "component" prop to customize rendering (#10128) @sebald
- [docs] Fix the restore focus logic of the Popover demo (#10184) @oliviertassinari
- [docs] Fix react-select chip on mobile (#10185) @oliviertassinari
- [docs] Add Snackbar / FAB animation integration example (#10188) @mbrookes
- [docs] Add LocalMonero to showcase (#10195) @mbrookes
- [docs] Fix typo `Selet` to `Select` (#10207) @Justkant
- [docs] Change negative to positive (#10211) @harvitronix
- [docs] Add project to showcase (#10217) @klyburke

#### Core

- [core] Upgrade Next.js (#10181) @oliviertassinari
- [test] Remove the mockPortal workaround (#10208) @leMaik

## 1.0.0-beta.32
###### *Feb 4, 2018*

Big thanks to the 12 contributors who made this release possible.

Here are some highlights ✨:
- Rename the `type` property to `variant` (#10088, #10086, #10084, #10101) @mbrookes.
- Simplify the implementation of the transitions (#10137, #10151) @oliviertassinari.
- Add support for `position="sticky"` with the AppBar (#10090) @scottastrophic.
- And many more bug fixes and documentation improvements.

### Breaking change

- [API] Complete type to variant migration (#10101) @mbrookes

These breaking changes aim at providing a systematic solution to the boolean vs enum naming problem.

We have documented our approach to solving the problem in #10023. Basically, we enforce the following rule:
- We use a *boolean* when the degrees of freedom required is **2**.
- We use an *enum* when the degrees of freedom required is **> 2**.

This is what motivated the button breaking change. Unfortunately `type` has its own meaning in the HTML specification. You can use it on the following elements: `<button>, <input>, <command>, <embed>, <object>, <script>, <source>, <style>, <menu>`.
We are using a more generic name to **avoid the confusion**: `variant`.

Umbrella pull request for: #10084, #10086, #10088.

```diff
<Button
- raised
+ variant="raised"

<Button
- fab
+ variant="fab"

<Typography
- type="title"
+ variant="title"

<MobileStepper
- type="dots"
+ variant="dots"

<Drawer
- type="persistent"
+ variant="persistent"

<LinearProgress
- mode="determinate"
+ variant="determinate"

<CircularProgress
- mode="determinate"
+ variant="determinate"
```

- [transition] Standardize the components (#10151)

```diff
           <Zoom
             in={in}
-            enterDelay={transitionDuration.exit}
+            style={{
+              transitionDelay: in ? transitionDuration.exit : 0,
+            }}
```

#### Component Fixes / Enhancements

- [AppBar] Remove one dead CSS property (#10096) @oliviertassinari
- [AppBar] Add support for `position="sticky"` (#10090) @scottastrophic
- [CircularProgress] Improve animation & update example (#10079) @mbrookes
- [API] Rename type prop to variant (#10088) @mbrookes
- [Button] Move bool props to variant (#10086) @mbrookes
- [Progress] Rename mode prop to variant (#10084) @mbrookes
- [Drawer] Add PaperProps property (#10118) @oliviertassinari
- [TextField] Small refinement (#10117) @oliviertassinari
- [Stepper] Add StepIcon to Stepper exports (#10119) @melissanoelle
- [ButtonBase] Fix keyDown handled (#10136) @strayiker
- [Fade] Simplify implementation (#10137) @oliviertassinari
- [typescript] Add missing ExpansionPanel style overrides (#10142) @simonvizzini
- [Dialog] PaperProps TypeScript definition (#10143) @daniel-rabe
- [InputAdornment] Remove hack (#10157) @oliviertassinari
- [Hidden] css implementation handle custom className (#10165) @Vincz

#### Docs

- [docs] Minor CSP edit (#10089) @oliviertassinari
- [docs] Avoid anchor id conflict in Progress (#10095) @oliviertassinari
- [docs] Remove last flow annotations (#10099) @oliviertassinari
- [docs] Alternative APIs theme (#10100) @oliviertassinari
- [docs] Add How do I use react-router? in FAQ (#10103) @oliviertassinari
- [examples] Update README for CRA with JSS (#10105) @kgregory
- [docs] Add more examples for the Badge (#10114) @oliviertassinari
- [docs] Rename IntegrationAutosuggest to IntegrationDownshift (#10116) @kentcdodds
- [docs] Better color prop description (#10133) @mbrookes
- [docs] Fix duplicated id issue (#10135) @oliviertassinari
- [docs] Document approach for progress indicator delay (#10145) @mbrookes
- [docs] Simplify delayed progress indicator example (#10147) @mbrookes
- [docs] Improve the performance of the homepage (#10152) @oliviertassinari
- [docs] Allow Demo to specify only required deps (#10150) @caub
- [docs] Add mui-downshift (#10156) @oliviertassinari
- [docs] Demo codesandbox deps (#10158) @caub

#### Core

- [core] Add the license in the release (#10102) @oliviertassinari
- [test] Fix AppBar test assert messages (#10109) @cherniavskii

## 1.0.0-beta.31
###### *Jan 21, 2018*

Big thanks to the 14 contributors who made this release possible.

Here are some highlights ✨:
- Further simplification & standardization with the palette (#10015) @mbrookes.
- A Content Security Policy Guide (#10074) @dav-is.
- Document the withStyles alternative APIs (#9981) @oliviertassinari.
- A react-select integration example (#10070) @oliviertassinari.
- And many more bug fixes and documentation improvements.

Fun facts:
- Our first alpha release was 1 year ago: *Jan 28, 2017* 🎂!
- We have done 53 pre-releases of the v1.x, one every week for a year 🛥.

### Breaking change

- [Icon] Remove icon ligature "magic" support (#9983) @mbrookes

We have removed the "magic" `<Icon>` wrapping logic. It should be done explicitly now.
It's making our components less biased around the svg icon vs font icon choice.

```diff
+import Icon from 'material-ui/Icon';

-      <IconButton>comment</IconButton>
+      <IconButton>
+        <Icon>comment</Icon>
+      </IconButton>
```

- [theme] Further simplification & standardization (#10015) @mbrookes

  - Most component specific `theme.palette.background` colors have been removed. The affected components use `theme.palette.grey` instead. Shift the values of `theme.palette.grey` if you wish to lighten or darken these as a whole; this will maintain the contrast relationship between them. (Paper remains in the theme, as it is used across multiple components.)
  - `theme.palette.common.fullBlack` and `fullWhite` have been removed. Components that used these values now use `theme.palette.common.black` and `white` instead.
  - `theme.palette.common.transparent`  has been removed. Components that used this value now use `'transparent'` directly.
  - Chip has been corrected to use `theme.palette.grey`. If you customize the values of `grey`, the appearance of Chip in your app may change.

- [core] Remove the rootRef properties as unneeded (#10025)

```diff
-import ReactDOM from 'react-dom';

<IconButton
- rootRef={node => {
-   this.button = ReactDOM.findDOMNode(node);
+ buttonRef={node => {
+   this.button = node;
  }}
>
```

- [Button] Add size property (#10009) @oliviertassinari

```diff
-<Button dense>
+<Button size="small">
```

- [palette] Remove the palette.types from the theme (#10040) @oliviertassinari

In order to keep the palette simple to understand. I have removed the `types` from the palette object.
The motivation is the following. The theme & palette should only store
the information needed to display one UI context.
Having the `types` object in the palette encourage people to rely on it.
No, we want people to do it the other way around.

For instance, instead of doing:
```jsx
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    types: {
      dark: {
        background: {
          default: '#000',
        },
      },
      light: {
        background: {
          default: '#fff',
        },
      },
    },
  },
});
```

We would rather see people doing:
```jsx
const types = {
  dark: {
    background: {
      default: '#000',
    },
  },
  light: {
    background: {
      default: '#fff',
    },
  },
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    ...types.dark,
  },
});
```

#### Component Fixes / Enhancements

- [Input] Make sure our previous or updated context is available (#9986) @yoiang
- [Dialog] Add PaperProps property (#9985) @nbdaaron
- [FormControl] Fix w3c issue (#9996) @oliviertassinari
- [typescript] Add divider to palette type defs (#10008) @xaviergonz
- [Badge] Add error as a palette option (#10004) @t49tran
- [Tab] Add textColor inherit default props to Tab (#10005) @x0fma
- [Menu] Fix dark selected color (#10026) @oliviertassinari
- [SnackbarContent] Change backgroundColor approach (#10027) @mbrookes
- [Backdrop] Allow setting of onTouchMove (#10001) @daniel-rabe
- [Popover] Should default to use anchorEl's parent body (#10049) @ianschmitz
- [Popover] Respect anchorEl's parent window when calculating position (#10048) @ianschmitz
- [TableCell] Add sortDirection TypeScript definition (#10057) @cvanem
- [palette] Fix error color defaults (#10058) @pelotom
- [ButtonBase] Avoid race condition with react-router (#10061) @oliviertassinari
- [Modal] Remove dead logic (#10062) @oliviertassinari
- [List] Fix w3c issues (#10050) @oliviertassinari
- [jss] Fix the last w3c issue I'm aware of (#10063) @oliviertassinari
- [LinearProgress] Add ARIA role & fix bugs (#10069) @mbrookes
- [ButtonBase] Add buttonRef property (#10082) @oliviertassinari

#### Docs

- [docs] Edit css injection order docs for create-react-app users (#9990) @PTaylour
- [docs] withStyles alternative APIs (#9981) @oliviertassinari
- [docs] Switch the Lightbulb UI (#9995) @oliviertassinari
- [docs] Use Simple over Basic (#10024) @oliviertassinari
- [docs] boolean vs enum API (#10023) @oliviertassinari
- [docs] Improve the typeface-roboto npm instructions (#10039) @oliviertassinari
- [docs] Add zero click example of Wrapping components (#10041) @oliviertassinari
- [docs] Reach the AA contrast ratio level (#10053) @oliviertassinari
- [docs] Misc fixes (#10055) @mbrookes
- [examples] Add missing typescript dependency (#10031) @QuantumInformation
- [docs] Add Content Security Policy Guide (#10074) @dav-is
- [docs] Add react-select example (#10070) @oliviertassinari

#### Core

- [core] Two small fixes looking at #10005 (#10014) @oliviertassinari
- [core] Use the official react-docgen package (#10054) @oliviertassinari
- [core] Upgrade the dependencies (#10060) @oliviertassinari

## 1.0.0-beta.30
###### *Jan 21, 2018*

Big thanks to the 12 contributors who made this release possible.

Here are some highlights ✨:
- A revamp of the palette usage. We want it to be as simple as possible (#9876, #9918, #9970).
We are pretty happy with the outcome. +80% of the story has been completed.
- A better [w3c compliance](https://validator.w3.org), we will keep working on it in for the next release @sambhav-gore.
- An improved breakpoints documentation section (#9949).
- A new notification system for the documentation (#9974) @mbrookes.
- And many more bug fixes and documentation improvements.

### Breaking change

- [palette] Keep simplifying the solution (#9876) @oliviertassinari
  - Remove the contrast color from our API. This color variation hasn't proven itseft to be useful enough.
  ```diff
  -<Button color="contrast" />
  +<Button />
  ```
  Instead, you can use the `color="inherit"` property or use the `theme.palette.XXX.contrastText` value.
  - Rename `accent` to `secondary`. We have removed the accent indirection to be closer to the object people are providing to customize the palette.
  ```diff
  -<Button color="accent" />
  +<Button color="secondary" />
  ```
  ```diff
  <Tabs
  - indicatorColor="accent"
  - textColor="accent"
  + indicatorColor="secondary"
  + textColor="secondary"
  >
  ```
  - Rename old `secondary` to `textSecondary`. `secondary` and `textSecondary` are two valid color value.
  ```diff
  -<Typography color="secondary" />
  +<Typography color="textSecondary" />
  ```
- [palette] Standardize the secondary color (#9918) @oliviertassinari

The secondary color now behaves the same way than the other colors (primary, error). We always use the `main` tone by default instead of the `light` tone.
It's unclear if this change is making the implementation follow the specification more closely. The direct win is **simplicity and predictability**.

- [palette] Normalize the usage of the palette (#9970) @oliviertassinari
  - Remove `theme.palette.input` object.
  - Remove `theme.palette.text.icon` color.
  - Remove `theme.palette.background.contentFrame`, it was only used in the documentation.
  - Move `theme.palette.text.divider` to `theme.palette.divider`, it's not a text color.
  - Remove `theme.palette.text.lightDivider`, there is no reference to is in the specification, better keep things simple.

#### Component Fixes / Enhancements

- [Button] Fix secondary contrastText color (#9913) @ValentinH
- [FormTextHelper] Add component prop (#9917) @sambhav-gore
- [core] Fix some w3c validation errors (#9906) @oliviertassinari
- [TableCell] Fix TypeScript definition (#9926) @ljvanschie
- [Divider] Add component property (#9927) @oliviertassinari
- [FormControl] Fix alternating focus change bug (#9909) @dapetcu21
- [CircularProgress] Fix animation on Edge 16 and below (#9938) @oliviertassinari
- [ListItemText] Update Typings for primary and secondary text class keys (#9946) @spallister
- [palette] ShadeBackground interface updated (#9955) @daniel-rabe
- [TableCell] Fix TypeScript definition (#9959) @ljvanschie
- [Select] Fix a small vertical alignement issue (#9964) @oliviertassinari
- [IconButton] Better follow the spec (#9967) @oliviertassinari
- [Select] Add inputProps property (#9979) @oliviertassinari
- [typescript] Palette typing fixes and error augmentation (#9973) @pelotom
- [Grid] minWidth for type item (#9972) @sambhav-gore

#### Docs

- [docs] Add a section about how to test changes locally (#9935) @nicolasiensen
- [docs] Style Library Interoperability v2 (#9939) @oliviertassinari
- [docs] Fix markdown list (#9948) @yuchi
- [docs] Remove one DOM element in the Card actions (#9952) @maprihoda
- [docs] Improve the documentation on the breakpoints (#9949) @oliviertassinari
- [docs] Apply Matt's requested changes (#9963) @oliviertassinari
- [docs] Using TypeScript & withStyles for class component w/union props (#9975) @nmchaves
- [docs] Add notifications (#9974) @mbrookes

#### Core

N/A

## 1.0.0-beta.29
###### *Jan 16, 2018*

Big thanks to the 9 contributors who made this release possible.

We are making a release earlier than expected. The release schedule norm has been so far: one every weekend. `1.0.0-beta.28` has introduced important pain points we want to address quickly:
- The 1.0.0-beta.28 palette change was made non-breaking (#9889) @mbrookes
- The JSS issues have been fixed
- The TypeScript definitions have been updated

### Breaking change

N/A

#### Component Fixes / Enhancements

- [TextField] Add fullWidth propagation to Input (#9888) @enbyted
- [Chip] Add component property (#9890) @caub
- [palette] Update the TypeScript definitions (#9896) @oliviertassinari

#### Docs

- [examples] Update for revised theme approach (#9878) @mbrookes
- [examples] Update Gatsby example to work (#9877) @magicmark
- [docs] Additional corrections to palette code sample (#9883) @mbrookes
- [docs] Update showcase.md (#9894) @gerges-beshay

#### Core

- [core] Fix w3c validation errors (#9899) @sambhav-gore
- [core] Make palette change non-breaking (#9889) @mbrookes
- [core] Fix some w3c issues (#9872) @oliviertassinari
- [core] Upgrade jss to 9.5.0 (#9885) @cesardeazevedo
- [core] Fix some w3c validation errors (#9895) @sambhav-gore
- [typescript] Remove JSS stub module declaration (#9898) @pelotom
- [typescript] Move @types/react-transition-group from devDependencies to dependencies (#9897) @pelotom
- [typescript] Remove generic object and function types (#9822) @pelotom
- [core] Go back to jss-vendor-prefixer@7 (#9904) @oliviertassinari

## 1.0.0-beta.28
###### *Jan 14, 2018*

Big thanks to the 22 contributors who made this release possible.

Here are some highlights ✨:
- A new theme palette system (#9794) @mbrookes. It's an important simplification.
- More flexibile and customization friendly table components (#9852) @kgregory.
- A new gold sponsor: [Creative Tim](https://www.creative-tim.com/), thank you!
- And many more bug fixes and documentation improvements.

### Breaking change

- [core] Revise the theme.palette.primary & secondary approach (#9794) @mbrookes

It's an important simplification of the palette system. You can now directly use the [“official” Color Tool](https://material.io/color/).
- Instead of using a rich color object of 14 different keys, we rely on an object of 4 different keys: `light`, `main`, `dark` and `contrastText`.
- Providing the full-color object used to be required. Now, we will provide a nice default to the different values using the `main` value.

```diff
import { createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';

const theme = createMuiTheme({
  palette: {
-   primary: blue,
-   secondary: pink,
+   primary: {
+     light: blue[300],
+     main: blue[500],
+     dark: blue[700],
+   },
+   secondary: {
+     light: pink[300],
+     main: pink[500],
+     dark: pink[700],
+   }
    type: theme.paletteType,
  },
});
```

- [ListItemText] Add extra class to style secondary text (#9759) @t49tran

```diff
<ListItem
  classes={{
-   text: 'my-class',
+   textPrimary: 'my-class',
  }}
/>
```

- [CardHeader] Remove CardContent inheritance (#9764) @oliviertassinari

Rename ListItemText classes for consitancy with the CardHeader component:
```diff
-- `textPrimary`
-- `textSecondary`
+- `primary`
+- `secondary`
```

- [TableCell] Add type property (#9852) @kgregory

`TableHead`, `TableBody` and `TableFooter` no longer offer a CSS API, which means their `root` classes are no longer available.
To style the root element in these components, a `className` prop can be passed, as all non-API props will be spread to the root element.

#### Component Fixes / Enhancements

- [Tooltip] Zero-length titles string are never displayed (#9766) @oliviertassinari
- [Chip] Replace instrinic CSS 'fit-content' with 'inline-flex' (#9767) @gregnb
- [Slide] Fix an animation regression (#9773) @oliviertassinari
- [Select] Remove the input warning (#9774) @oliviertassinari
- [Tabs] Add action property (#9780) @gregnb
- [StepButton] Fix TypeScript definition (#9796) @hapood
- [CardContent] Add component property (#9789) @caub
- [TablePagination] Add an Actions property (#9785) @axlider
- [SwitchBase] Enable React input warning (#9814) @oliviertassinari
- [SwitchBase] Remove duplicate typescript definitions inherited (#9816) @rosskevin
- [Hidden] Update initialWidth propTypes (#9815) @djeeg
- [Transition] Extend children propTypes (#9819) @oliviertassinari
- [TablePagination] Remove dead code (#9831) @leMaik
- [theme] Polish background scale (#9829) @oliviertassinari
- [ExpansionPanel] Fix typescript definitions of onChange event (#9832) @Jocaetano
- [GridList] Remove named export (#9836) @remcohaszing
- [GridList] Export through main index.js (#9833) @remcohaszing
- [Portal] Document default value (#9841) @oliviertassinari
- [Button] Add fullWidth boolean property (#9842) @oliviertassinari
- [Select] Improve vertical alignment (#9827) @jedwards1211
- [GridListTile] Fix error when overriding classes (#9862) @KevinAsher
- [transitions] Improve the style override logic (#9858) @caub
- [Select] Add open, onClose and onOpen properties (#9844) @caub

#### Docs

- [docs] Add Expand All switch to default theme tree (#9762) @mbrookes
- [docs] Remove unneeded dependencies from examples (#9746) @cherniavskii
- [docs] Clarify the usage of innerRef property of withStyles (#9765) @nareshbhatia
- [docs] Improve color / theme docs (#9771) @mbrookes
- [docs] Add How can I access the DOM element? in the FAQ (#9768) @oliviertassinari
- [examples] Add a Gatsby example (#9779) @oliviertassinari
- [docs] Alternatives to CRA (#9810) @oliviertassinari
- [docs] Add missing code from example (#9830) @RyanTaite
- [docs] Add Global CSS override section (#9843) @oliviertassinari
- [docs] Add example for Select with Checkbox in MenuItems (#9835) @caub
- [docs] Add SlidesUp to the Showcase (#9854) @bhatiak
- [docs] Track the bundle size (#9853) @oliviertassinari
- [docs] Display the default theme (#9859) @oliviertassinari
- [docs] Add paragraph on withStyles with multiple classes (#9851) @clentfort
- [docs] Add new backers (#9863) @oliviertassinari

#### Core

- [core] Remove contastDefaultColor (#9772) @mbrookes
- [core] Revise theme contrastText approach, remove contrastDefaultColor (#9063) @mbrookes
- [color] Add a warning when an invalid value is provided (#9783) @oliviertassinari
- [typescript] Add TouchRipple typings (#9812) @msiadak
- [test] Enforce 100% test coverage in Codecov (#9813) @leMaik
- [typescript] Move @types/jss from devDependencies to dependencies (#9817) @pelotom
- [core] Upgrade the dependencies 😢 (#9828)

## 1.0.0-beta.27
###### *Jan 6, 2018*

Big thanks to the 19 contributors who made this release possible.

Here are some highlights ✨:
- A strong focus on the documentation.
- Add a new Zoom component (#9693) @mbrookes.
- Better vertical alignment of our components (#9709) @oliviertassinari.
- And many more bug fixes and documentation improvements.

### Breaking change

- [core] Remove some rootRef properties (#9676) @cherniavskii

Remove the rootRef property from the Grow and List component.
Instead, you can use the `ref` property in combination with `findDOMNode()` or a [RootRef](https://gist.github.com/oliviertassinari/fa1cd34a3fff67553631606109bed124) helper.

- [Popover] New `transition` property (#9682) @oliviertassinari

Remove the `transitionClasses` property of the Popover component. Instead, you can provide a transition component.

- [BottomNavigation] Rename BottomNavigationButton to BottomNavigationAction (#9692) @mbrookes

```diff
-import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
+import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
```

- [core] Update jss plugins dependencies (#9732) @cherniavskii

You might be relying on the transitive dependency of Material-UI: `jss-preset-default`.
If you do, you need to declare the dependency in your package.json. Material-UI will no longer install it for you.
Alternatively, you can use our preset to save bundle size.
```diff
-import preset from 'jss-preset-default';
+import { jssPreset } from 'material-ui/styles';
```

#### Component Fixes / Enhancements

- [Menu] Better select, hover, focus logic (#9570) @Skaronator
- [CircularProgress] Accept as string size property (#9700) @jedwards1211
- [Zoom] New transition component (#9693) @mbrookes
- [Modal] Add TransitionHandlers to Modal props TypeScript definitions (#9723) @pvdstel
- [style] Add vertical-align: middle (#9709) @oliviertassinari
- [Dialog] Allow fullWidth option of false (#9724) @gregnb
- [SvgIcon] Add a nativeColor property (#9740) @oliviertassinari
- [typescript] Make Modal-/SlideProps on Drawer Partial (#9743) @DaIgeb
- [typescript] Use React.ReactType instead of string | ComponentType (#9686) @pelotom
- [typescript] Style/replace object and function in typedef (#9678) @t49tran
- [typescript] Update zIndex props to latest changes (#9720) @radicand
- [FormControlLabel] Allow highlighted options to be selectable (#9713) @Chopinsky

#### Docs

- [flow] Update the documentation and the example (#9679) @oliviertassinari
- [docs] Fix missing sandbox files (#9685) @lukePeavey
- [Portal] Fix typo (#9688) @ifndefdeadmau5
- [examples] Use Reboot (#9691) @oliviertassinari
- [docs] Add a fallback ad (#9694) @oliviertassinari
- [examples] Keep working on the Next.js example (#9695) @oliviertassinari
- [docs] Hide sandbox button on more demos (#9696) @lukePeavey
- [docs] Minor Markdown Fix: Update SUPPORT.md (#9702) @TorzuoliH
- [docs] Move 'Default Theme' to it's own section (#9697) @mbrookes
- [docs] Reorder Drawer items (#9704) @mbrookes
- [docs] Bite the bullet and go for v1-beta (#9706) @oliviertassinari
- [docs] Add project in showcase.md (#9725) @shady831213
- [docs] Fix error in overriding with classes (#9726) @rubencosta
- [docs] Tweak Dialog maxWidth prop description (#9729) @mbrookes
- [docs] Add a reference to create-react-app-with-flow (#9735) @oliviertassinari
- [docs] Fix link of "How to override the look and feel of the components." (#9739) @enavarrocu
- [docs] Fix Chip onDelete property (#9741) @vkentta
- [docs] Reduce the api docs table cell padding (#9752) @mbrookes
- [docs] Misc docs fixes (#9747) @mbrookes
- [docs] Fix two small regressions (#9753) @oliviertassinari
- [docs] Tidy up Tooltips demos (#9755) @mbrookes

#### Core

- [core] Fix typo in size:overhead:why script (#9728) @cherniavskii
- [core] Follow the React HOC convention (#9733) @oliviertassinari
- [github] Add Support Requests bot config file (#9751) @mbrookes

## 1.0.0-beta.26
###### *Dec 30, 2017*

Big thanks to the 12 contributors who made this release possible.

Here are some highlights ✨:
- @kgregory has made the breakpoint down behavior more intuitive. As of now, it's inclusive (#9632).
- We have introduced a new component to kickstart an elegant, consistent, and simple baseline to build upon: `Reboot` (#9661).
- The `Portal` and `Modal` components have been revamped to solve the core issues raised by the community (#9613). Those components are now documented.
- And many more bug fixes and documentation improvements.

### Breaking change

- [Portal] Second iteration on the component (#9613)

Some properties have been renamed:

```diff
<Dialog
- ignoreBackdropClick
- ignoreEscapeKeyUp
+ disableBackdropClick
+ disableEscapeKeyDown
```

```diff
<Modal
- show
- disableBackdrop
- ignoreBackdropClick
- ignoreEscapeKeyUp
- modalManager
+ open
+ hideBackdrop
+ disableBackdropClick
+ disableEscapeKeyDown
+ manager
```

The zIndex object has been updated to match the usage.

```diff
  const zIndex = {
-  mobileStepper: 900,
-  menu: 1000,
+  mobileStepper: 1000,
   appBar: 1100,
-  drawerOverlay: 1200,
-  navDrawer: 1300,
-  dialogOverlay: 1400,
-  dialog: 1500,
-  layer: 2000,
-  popover: 2100,
-  snackbar: 2900,
-  tooltip: 3000,
+  drawer: 1200,
+  modal: 1300,
+  snackbar: 1400,
+  tooltip: 1500,
  };
```

- [breakpoint] Down properties are now inclusive (#9632) @kgregory
  - `createBreakpoints.down()` is now inclusive of the specified breakpoint
  - `isWidthDown()` is now inclusive of the specified breakpoint by default
  - `<Hidden />` will include the breakpoints associated with its *Down* properties regardless of whether CSS or JS is used.

#### Component Fixes / Enhancements

- [TextField] Add inputProps back (#9604) @oliviertassinari
- [TextField] Accessibility improvements (#9617) @cherniavskii
- [ListItemText] Fix noWrap primary text ellipsis (#9631) @dr-js
- [Typography] Remove children required constraint (#9633) @hendratommy
- [CardHeader] Add component property (#9634) @oliviertassinari
- [Snackbar] Clarify that autoHideDuration calls onClose (#9628) @evantrimboli
- [Table] Add aria-label's to pagination left/right arrows (#9622) @gregnb
- [Input] More predictible value behavior (#9647) @oliviertassinari
- [styles] Make sure to escape whitespace (#9644) @jedwards1211
- [Reboot] New component (#9661) @oliviertassinari
- [Snackbar] Allow consecutive messages to display (#9670) @tkvw
- [styles] Reduce the likeliness of conflict (#9671) @oliviertassinari
- [typescript] Make Tabs onChange prop optional (#9668) @pelotom
- [Avatar] Handle non-square images (#9672) @oliviertassinari

#### Docs

- [docs] Fix AppBar and Demo button labels (#9607) @mbrookes
- [docs] Fix 414 HTTP issue (#9635) @oliviertassinari
- [docs] Update backers.md (#9636) @oliviertassinari
- [docs] Add a missing codesandbox demo (#9657) @oliviertassinari
- [docs] Interoperability guide: Fix grammar and rework structure (#9658) @mbrookes
- [docs] Remove dead code in generateMarkdown (#9662) @oliviertassinari
- [docs] Interop guide: change Global CSS link from API to description (#9664) @oliviertassinari
- [docs] Add mui-datatables (#9667) @gregnb
- [docs] Small tweaks (#9669) @oliviertassinari

#### Core

- [test] Document the ImageMagick / GraphicsMagick dependancy (#9608) @mbrookes
- [typescript] re-declare `isMuiElement` and `isMuiComponent` as typeguard (#9630) @SSW-SCIENTIFIC
- [core] Upgrade the dependencies (#9642) @oliviertassinari

## 1.0.0-beta.25
###### *Dec 22, 2017*

Big thanks to the 16 contributors who made this release possible.

Here are some highlights ✨:
- 100% test coverage. Thanks @leMaik for the last mile (#9596)!
- The first introduction of Global CSS 😱.
We have introduced a `dangerouslyUseGlobalCSS` option to the class name generator (#9558).
We discourage people from using this option in production.
However, it can be a quick escape hatch when prototyping.
It's making the class names predictable, for instance:
```diff
-c291
+MuiButton-raised
```
- And many more bug fixes and documentation improvements.

### Breaking change

None, merry christmas 🎄.

#### Component Fixes / Enhancements

- [typescript] Add Typography pxToRem (#9547) @jaredpetker
- [Select] Typo fix (#9567) @bordagabor
- [CardHeader] Add conditional rendering of the subheader (#9572) @jwwisgerhof
- [Tooltip] children should be an element (#9568) @oliviertassinari
- [BottomNavigationAction] onClick and onChange handler overwritten (#9564) @kgregory
- [typescript] Add typings to reactHelpers (#9565) @SSW-SCIENTIFIC
- [TablePagination] Make onChangeRowsPerPage optional (#9563) @evantrimboli
- [Toolbar] Make the children optional (#9581) @oliviertassinari
- [withWidth] Add withTheme option (#9586) @oliviertassinari
- [docs] Add more interoperability examples (#9558) @oliviertassinari
- [TextField] Make TextField's "value" prop type match Input (#9594) @jaminthorns
- [Popover] Add action property (#9588) @gregnb
- [Modal] Increase test coverage (#9596) @leMaik

#### Docs

- [docs] Second iteration on the ad placement (#9524) @oliviertassinari
- [docs] Remove unused styes object from ChipsArray demo (#9540) @mbrookes
- [docs] Hide sandbox button on drawer and grid-list demos (#9537) @lukePeavey
- [docs] Fix typo `masterial-ui` to `material-ui` (#9544) @Ginkoid
- [docs] Add two new members (#9543) @oliviertassinari
- [docs] Fix dark theme toggle of website home page content (#9560) @Tuaniwan
- [docs] Improve migration guide (#9566) @fonzy2013
- [examples] Fix after the latest breaking changes (#9553) @Tuaniwan
- [docs] Fix basic typos in copy text (#9591) @hathix

#### Core

- [test] Report the potential svg-icon test error (#9559) @oliviertassinari
- [.editorconfig] Add max_line_length (#9580) @mbrookes
- [core] Move svg-icons to the internal folder (#9601) @oliviertassinari
- [core] Upgrade the dependencies (#9606) @oliviertassinari

## 1.0.0-beta.24
###### *Dec 17, 2017*

Big thanks to the 16 contributors who made this release possible.

Here are some highlights ✨:
- We have removed Flow from the core components in (#9453).
You can learn more about the motivations in the pull request.
This changes two important things:
  - We have reduced the size of the bundle by ~8 kB gzipped.
  - The propTypes runtime checks are back. You might experience new warnings.
- We have introduced 4 breaking changes.
- You can support me on [Patreon](https://www.patreon.com/oliviertassinari) and the community on [OpenCollective](https://opencollective.com/material-ui) (#9460).
Blog posts are coming.
- And many more bug fixes and documentation improvements.

### Breaking change

- [Hidden] Fix js/css implementation inconsistency (#9450) @oliviertassinari

This change is making the js and css breakpoint utils behaving the same way.
The default parameter of `withWidth.isWidthDown(breakpoint, width, inclusive)` changed:
```diff
-inclusive = true
+inclusive = false
```
You might want to update the usage of the API by increasing the breakpoing used on the Hidden component:
```diff
-<Hidden implementation="js" mdDown>
+<Hidden implementation="js" lgDown>
```
Or by going back to the previous behavior:
```diff
-isWidthDown(breakpoint, width)
+isWidthDown(breakpoint, width, true)
```

- [API] Use onClose over onRequestClose (#9451) @oliviertassinari

Most of our components are stateless by default. It wasn't the case with v0.x. Let's translate this default behavior in the property names of v1.
```diff
-onRequestClose
-onRequestOpen
-onRequestDelete
+onClose
+onOpen
+onDelete
```

- [TextField] Remove inputClassName property (#9509) @kgregory

The existing `InputProps` property can be used to set the className on the input element, making `inputClassName` redundant.  Issue #9508 exposed some conflicting behavior between the two properties and it was decided that removing `inputClassName` would result in a cleaner API.
```diff
-  /**
-   * The CSS class name of the `input` element.
-   */
-  inputClassName: PropTypes.string,
```
The configuration of the wrapped Input component and its input element should be done through `InputProps`.  To specify a className on the input element:
```jsx
<TextField InputProps={{ inputProps: { className: 'foo' } }} />
```

- [Stepper] "Optional" label in StepLabel should be localizable (#9489) @karaggeorge

There is no logic attached to the `optional` boolean property. So, we can reduce the abstraction cost. The property is provided closer to where it's needed, and people have full control over how it should be displayed. By chance, it matches the specification.
```diff
-<Step optional>
-  <StepLabel>
+<Step>
+  <StepLabel optional={<Typography type="caption">Optional Text</Typography>}>
     Label
   </StepLabel>
 </Step>
```

#### Component Fixes / Enhancements

- [Popover] Fix warning formatting (27bab8022545c0cda8cbc80bf9b6df1566b14226) @oliviertassinari
- [Hidden] Add `only` array support in the CSS implementation (#9457) @Chopinsky
- [TextField] Fix disabled logic handling (#9472) @oliviertassinari
- [Dialog] Improve accessibility (#9461) @ianschmitz
- [TableFooter] Fix text overlapping pagination drop-down (#9497) @mbrookes
- [ButtonBase] Avoid unnecessary rerender (#9502) @ojab
- [Chip] Fix color contrast against default dark background (#9501) @mbrookes
- [Button] Document how to use a third-party routing library (#9506) @nikoladev
- [MuiThemeProvider] Add a new warning (#9518) @oliviertassinari
- [TextField] Improve the API documentation (#9514) @oliviertassinari
- [TableCell] Add missing aria-sort (#9504) @gregnb
- [ExpansionPanelSummary] Eliminate extra invocation of onClick (#9523) @kgregory

#### Docs

- [docs] Update sentence which might be misinterpreted (#9459) @senthuran16
- [docs] Correct list API default value (#9462) @t49tran
- [docs] Fix doc layout when an ad is present (#9473) @zachwolf
- [docs] Update breakpoint info to be in line with code (#9486) @nikoladev
- [docs] Fix broken sandbox in docs (#9491) @ajay2507
- [docs] Add new showcase (#9490) @liganok
- [docs] Add see source button (#9499) @oliviertassinari
- [docs] Add a BACKERS.md (#9460) @oliviertassinari
- [docs] Add Governance page (#9512) @oliviertassinari
- [docs] Demo options as JSON (#9521) @oliviertassinari

#### Core

- Add Governance Document (#9423) @hai-cea
- [core] Upgrade to flow 61 (#9471) @rsolomon
- [core] Remove FlowType from the components implementation (#9453) @oliviertassinari
- [core] Upgrade the dependencies (#9515) @oliviertassinari
- [core] Fix wrong usage of the API (#9519) @oliviertassinari
- [core] Use the same react pattern everywhere (#9520) @oliviertassinari

## 1.0.0-beta.23
###### *Dec 9, 2017*

Big thanks to the 26 contributors who made this release possible.

Here are some highlights ✨:
- The TypeScript definitions keep getting better thanks to @pelotom, @rosskevin, @PavelPZ, @alitaheri, @ianschmitz, @smacpherson64, @brandonlee781
- We keep investing in improving the documentation.
For instance, you can find a [CodeSandbox](https://codesandbox.io/) edit button on all our demos.

### Breaking change

- [TextField] API disamiguation/consistency (#9382) @rosskevin
Some of the convenience properties exposed were confusing and have been removed (`inputProps | InputClassName`).  For advanced configuration any `Input` through `TextField`, use `TextField.InputProps` to pass any property accepted by the `Input`.
- [SvgIcon] Add color property (#9367) @kale5in
By consistency with the other components, the color property is no longer apply to the `<svg>`. Instead, it's used to apply normalized color.

#### Component Fixes / Enhancements

- [Switch] Update missed div to span for valid HTML (#9334) @mikeriley131
- [Modal] Resolve cordova issues (#9315) @sakulstra
- [Drawer] Missing ModalProps typescript (#9352) @rosskevin
- [theme] Fix TypographyOptions type (#9364) @keenondrums
- [styles] createMuiTheme should accept a deep partial (#9368) @keenondrums
- [Table] Add missing component props (#9378) @pelotom
- [typescript] Use correct types for TextFieldProps (#9321) @pelotom
- [typescript] Provide accurate typings for theme overrides (#9314) @pelotom
- [typescript] Add missing direction to theme (#9327) @alitaheri
- [typescript] Update onChange types for selection controls (#9339) @rosskevin
- [typescript] Allow function to be passed as MuiThemeProvider theme prop (#9354) @ianschmitz
- [typescript] Extract WithTheme for external use (#9363) @rosskevin
- [Input] Fix input shrink issue in Firefox (#9384) @t-cst
- [typescript] Wrong default export in shadows.d.ts and transitions.d.ts (#9395) @PavelPZ
- [typescript] Add "component" to FormLabelProps (#9398) @smacpherson64
- [typescript] Rename overloaded type "Icon" in StepButton and StepConnector (#9397) @PavelPZ
- [typescript] Fix definition mismatching on ColorObject (#9409) @kinisn
- [Tabs] Fix SSR regression (#9413) @oliviertassinari
- [theme] Fix mixins.gutter override (#9417) @oliviertassinari
- [ButtonBase] Remove some code (#9419) @oliviertassinari
- [ExpansionPanel] Prevent call onChange event from the root element (#9402) @andrzejbk
- [Hidden] Improve the docs (#9420) @oliviertassinari
- [typescript] Add anchorPosition and anchorReference to PopoverProps (#9428) @brandonlee781
- [Input] Specify target FlowType for SyntheticInputEvents (#9394) @dhui
- [Collapse] Fix minHeight behavior (#9438) @Chopinsky
- [Stepper] Add missing style names (#9441) @oliviertassinari
- [Button] Add a mini FAB variant (#9383) @mbrookes

#### Docs

- [docs] Replace type with interface, document typescript theme customization (#9350) @rosskevin
- [docs] Fix typo in comparison guide (#9357) @ugomeda
- [docs] Simplify TypeScript custom theme example (#9376) @pelotom
- [docs] Add project to showcase (#9346) @samdenty99
- [Dialog] Fix typo and finish incomplete comment (#9379) @willgriffiths
- [docs] Better definition of what withStyles is (#9235) @ajay2507
- [docs] Save 11% on the images (#9400) @oliviertassinari
- [docs] Add a downshift example (#9401) @oliviertassinari
- [docs] Fix Tabs examples typography & standardise code (#9366) @mbrookes
- [docs] Add a Plugins paragraph (#9399) @oliviertassinari
- [docs] Fix code formatting (#9414) @oliviertassinari
- [docs] Add codesandbox edit button (#9416) @oliviertassinari
- [docs] Various documentation improvements (#9403) @oliviertassinari
- [docs] Remove extra spacing (#9418) @oliviertassinari
- [docs] Remove flow from the docs (#9434) @oliviertassinari
- [examples] remove flow from the examples (#9446) @stormasm

#### Core

- [test] Set codecov threshold to avoid spurious build failures (#9323) @pelotom
- [test] Fix parse error in .codecov.yml (#9355) @pelotom
- [typescript] Update `tslint.json` "member-ordering" definition (#9359) @seivan
- [typescript] withTheme parameter on wrong function (#9372) @rosskevin
- [typescript] Fix and standardize remaining ThemeOptions typings (#9370) @pelotom
- [test] Add missing platforms (#9412) @oliviertassinari
- [core] Upgrade dependencies (#9415) @oliviertassinari
- [typescript] Remove DeepPartial (#9445) @PavelPZ

## 1.0.0-beta.22
###### *Nov 28, 2017*

Big thanks to the 26 contributors who made this release possible.

Here are some highlights ✨:
- Wait, what? A new component is coming, again 🎉.
@andrzejbk has been implementing the `ExpansionPanel` component with the help of the community. Big thanks to him!
- Support TypeScript@2.6 (#9124) @pelotom
- Support Flow@0.57.x (#8983) @rsolomon, @rosskevin
- A new organization: `mui-org` @hai-cea
- And many more bug fixes and documentation improvements.

### Breaking change

- [Select] Remove InputClasses (#9159) @oliviertassinari
It's a revert. I have made the unwise call of adding the InputClasses property in an unrelated refactorization pull request #8942. It was not taking the input classes property into account. It was a breaking change and not needed.
- [core] Reduce bundle size by 2kB gzipped (#9129) @oliviertassinari
We have removed some jss plugins from the default bundle:
  - [jss-expand](https://github.com/cssinjs/jss-expand) (1.3 kB)
  - [jss-compose](https://github.com/cssinjs/jss-compose) (426 B)
  - [jss-extend](https://github.com/cssinjs/jss-extend) (702 B)
  - [jss-template](https://github.com/cssinjs/jss-template) (330 B)

It's a revert.
I have made the unwise call of adding the InputClasses property in an unrelated refactorization pull request #8942.
It was not taking the input classes property into account.
It was a breaking change and not needed.

#### Component Fixes / Enhancements

- [Tooltip] Fix typo in API page (#9128) @mizx
- [Transition] Fix wrong addEndListener logic (#9142) @oliviertassinari
- [TablePagination] export LabelDisplayedRowArgs interface and improve label (#8930) @t49tran
- [Drawer] Hide focus ring (#9147) @rodrigofepy
- [Drawer] Fix classes in typescript definition (#9145) @johnnynia
- [CircularProgress] Fix behavior when dir=rtl (#9151) @alitaheri
- [StepContent] Fix typings (#9150) @alitaheri
- [Dialog] Fix maxWidth=xs (#9162) @oliviertassinari
- [Select] Fix typescript typings (#9153) @alitaheri
- [Slide] No default direction (#9165) @oliviertassinari
- [TablePagination] Improve the API docs page (#9181) @oliviertassinari
- [typescript] Strip keys from GridProps which won't get passed to override component (#9183) @pelotom
- [Input] Fix input height on Firefox (#9184) @oliviertassinari
- [Switch] Fixes non-valid HTML when div used inside of label element (#9188) @mikeriley131
- [FormControlLabel] Fixes non-valid HTML when p used in label element (#9187) @mikeriley131
- [Avatar] Fix alt align (#9193) @mctep
- [Drawer] Fix typo @ignore for theme prop (#9195) @christophehurpeau
- [style] Fix between media-query for xl (#9201) @michaelgruber
- [transitions] Expose the transition components (#9210) @ajay2507
- [Card] Add action prop to CardHeader (#9202) @lukePeavey
- [Select] Add name to the target (#9216) @oliviertassinari
- [TablePagination] Hide the rows per page selector if there are less than two options (#9213) @leMaik
- [ButtonBase] Bookkeep the disable state (#9220) @oliviertassinari
- [TextField] Better select support (#9224) @oliviertassinari
- [TableCell] Use solid version of theme divider (#9229) @mbrookes
- [ExpansionPanel] New component (#7651) @andrzejbk

#### Docs

- [docs] Additional tweaks (#9122) @mbrookes
- [docs] Improved documentation for Menu style overrides (#9126) @lsemerini
- [docs] Fix display on IE11 (#9166) @oliviertassinari
- [docs] Fix broken link in README.md (#9177) @Primajin
- [docs] Clean up code in IconLabelButton example (#9211) @xfumihiro
- [docs] Fill enhanced table to always have the same height on all pages (#9214) @leMaik
- [docs] Fix broken link to the API#spread (#9219) @oliviertassinari
- [Guide] Add Interoperability guide (#9217) @FjVillar
- [docs] Add a styled-components section (#9225) @oliviertassinari
- [examples] rename organization to mui-org (#9273) @stormasm
- [docs] Fix typo (#9288) @paulzmuda

#### Core

- [test] Fix flaky popper.js test (#9168) @oliviertassinari
- [typescript] Support TypeScript 2.6 and --strictFunctionTypes (#9124) @pelotom
- [typescript] Fix typing of withWidth (#9125) @pelotom
- [typescript] Eliminate the need for type annotations on callback parameters (#9127) @pelotom
- [core] Reduce bundle size by 2kB gzipped (#9129) @oliviertassinari
- [core] Upgrade enzyme (#9167) @oliviertassinari
- Add support for Flow@0.57.x (#8983) @rsolomon
- [test] Avoid unspotted API docs changes (#9212) @oliviertassinari
- [core] Increase the size-limit (#9215) @oliviertassinari
- [flow] Continuation of Flow updates 0.57+ (#9203) @rosskevin
- [flow] Bump react-flow-types version and fix errors (#9232) @rsolomon

## 1.0.0-beta.21
###### *Nov 13, 2017*

Big thanks to the 18 contributors who made this release possible.

Here are some highlights ✨:
- @alexhayes and @vladimirpekez have done an awesome job migrating the Stepper component
to the `v1-beta` branch (#8291). Thank you!
- @kof Has been working hard and tightly with us to improve JSS, we have upgraded the dependency to v9 (#9111).
- And many more bug fixes and documentation improvements.

### Breaking change

- [SwitchBase] Remove legacy properties (#9021) @oliviertassinari

In the following diff `SwitchBase` can be a `Checkbox` a `Radio` or a `Switch`.

```diff
-<SwitchBase disabled disabledClassName={disabledClassName} />;
+<SwitchBase disabled classes={{ disabled: disabledClassName }} />;
```

#### Component Fixes / Enhancements

- [InputLabel] Fix transformOrigin when direction=rtl (#9007) @alitaheri
- [BottomNavigation] Allow null bottom navigation items (#9011) @ciroja
- [Button] Include lineHeight in default theme button style (#9018) @mkornblum
- [Select] Fix native width display (#8998) @oliviertassinari
- [Modal] Expose the component to the public API (#9038) @oliviertassinari
- [Drawer] Better support different anchor values (#9000) @oliviertassinari
- [IconButton] Add missing TypeScript definition (#9016) @oliviertassinari
- [List] Fix accessibility (#9017) @oliviertassinari
- [ButtonBase] Restore the original keyboardFocusCheckTime value (#9019) @oliviertassinari
- [Popover] Implement ability to pass coordinates as anchor (#9004) @jackyho112
- [TextField] Fix undefined blur event (#9042) @nareshbhatia
- [Slide] Support dynamic anchor (#9055) @oliviertassinari
- [Input] Remove grey highlight on iOS (#9057) @oliviertassinari
- [Grid] Add missing wrap-reverse classname (#9076) @dehli
- [breakpoint] Fix xs value (#9078) @oliviertassinari
- [TablePagination] Fix IE11 colSpan issue (#9086) @sakulstra
- [Menu] Fix MenuList integration demo (#9088)
- [Snackbar] Treat null properly and add a test for it (#9094) @leMaik
- [Input] Fix inputProps.ref support (#9095) @oliviertassinari
- [Slide] Refactor lifecycle logics (#9096) @alitaheri
- [Stepper] First port of the component (#8291) @alexhayes @vladimirpekez
- [InputLabel] Add missing FormControlClasses (#9110) @svachmic

#### Docs

- [docs] Fix escape in the API section (#9015) @oliviertassinari
- [examples] Fix flow example (bdf5b6600fd82d2c5b64896994457001dac72104) @oliviertassinari
- [examples] Fix missing props for BaseComponent (#9077) @aislanmaia
- [docs] Add a AppBar/Menu integration example (#9067) @Tevinthuku
- [docs] Add composed withStyles & withTheme HOCs to the FAQ (#9079) @mbrookes
- [docs] Add file upload examples with the icon buttons (#9087) @Tevinthuku
- [docs] Fix word (#9091) @Hissvard
- [docs] Fix AppSearch horizontal rythm (#9107) @mbrookes
- [docs] Fix misc typos, grammar and add minor clarifications (#9112) @mbrookes

#### Core

- [typescript] Conform Typography definition with React CSSProperties (#9023) @dewey92
- [Modal] 100% coverage for modalManager.js (#9022) @oliviertassinari
- [core] Upgrade dependencies (#9010) @oliviertassinari
- [core] Upgrade flow-react-proptypes (#9029) @oliviertassinari
- [typescript] Specify props type for overriding components (#9035) @pelotom
- [core] Document the overhead of importing a single component (#9099) @oliviertassinari
- [typescript] Fix screenWidth type and added is WidthDown (#9114) @stunaz
- [core] Upgrade jss (#9111) @oliviertassinari
- [core] Upgrade some dependencies (#9121) @oliviertassinari

## 1.0.0-beta.20
###### *Nov 5, 2017*

Big thanks to the 12 contributors who made this release possible.

Here are some highlights ✨:
- We have been addressing a lot of bug and documentation issues during the last month.
We should soon be able to start porting new components.
- The test coverage increased by 0.5% thanks to @leMaik effort (#8910, #8911).
We are very close to 100%.
- The internal `ClickAwayListener` component was made public (#8967).

### Breaking change

- [style] Improve the font-size situation (#8942) @oliviertassinari
The `Input` and `FormLabel` component do no longer inherit the font-size. You might have to override them explicitly.
- [Popover] Add a max-height (#8943) @oliviertassinari
```diff
-Menu.classes.root
+Menu.classes.paper
```
- [Dialog] Rename withResponsiveFullScreen (#8951) @oliviertassinari
```diff
-import { withResponsiveFullScreen } from 'material-ui/Dialog';
+import { withMobileDialog } from 'material-ui/Dialog';
```

#### Component Fixes / Enhancements

- [MenuList] Increase test coverage and fix an exception in an edge case (#8911) @leMaik
- [Input] Fix textarea width (#8921) @istarkov
- [SwitchBase] Inherit `disabled` from FormControl (#8917) @nllarson
- [Popover] Improve the warning message (#8948) @oliviertassinari
- [Popover] Add max-width (#8992) @oliviertassinari
- [InputAdornment] Correct typescript export (#8959) @minajevs
- [utils] Make ClickAwayListener public (#8967) @oliviertassinari
- [Slider] Add the logic back (#8972) @oliviertassinari
- [Select] Remove IE11 arrow (#8976) @oliviertassinari
- [Select] Menu Items centered in IE 11 (#8982) @lukePeavey
- [Select] Fix width on Safari (#8985) @oliviertassinari
- [IconButton] Add buttonRef property (#8986) @oliviertassinari
- [Grid] Document a limitation (#8987) @oliviertassinari
- [Tooltip] New warning message (#8988) @oliviertassinari

#### Docs

- [docs] Split support content of CONTRIBUTING.md into SUPPORT.md (#8918) @mbrookes
- [docs] Add demo for buttons with label and icon (#8922) @wongjiahau
- [docs] Fix broken link (#8934) @cantsdmr
- [docs] Fork JssProvider to release the docs (#8929) @oliviertassinari
- [docs] Add more information around the MenuList component (#8947) @oliviertassinari
- [docs] Add --save parameter (#8961) @Phoqe
- [docs] Add guideline for docs/demo contribution (#8953) @wongjiahau
- [docs] Use onChange instead of onClick for switch-like examples (#8971) @pelotom
- [docs] Fix flow example (#8968) @oliviertassinari
- [docs] Use next tag for the npm version badge (#8989) @leMaik
- [docs] Add a JssProvider and CSS injection order section (#8993) @oliviertassinari

#### Core

- [core] Upgrade some dependencies (#8977) @oliviertassinari
- [typescript] Add missing base props (#8931) @pelotom
- [typescript] Add missing base props, continued (#8955) @pelotom
- [typescript] Upgrade and resolve @types/react to 16.0.19 (#8956) @pelotom

## 1.0.0-beta.19
###### *Oct 30, 2017*

Big thanks to the 17 contributors who made this release possible.

Here are some highlights ✨:
- We managed to do it! We have upgraded all the dependencies to react@16 🚀 (#8889).
  We will keep react@15 support for some time in order to help the migration from v0.x to v1.x.
- We have fixed an important bug of `withStyles()` with react-hot-loader.
  Thanks a lot @rrousselGit for the support (#8897).
- We have introduced 3 soft breaking changes (#8830, #8858, #8916).
- And many more bug fixes and documentation improvements.

### Breaking change

- [transition] Improve interoperability with react-transition-group (#8830) @oliviertassinari
```diff
         <Grow
-          transitionDuration={{
+          timeout={{
             enter: enterDuration,
             exit: leaveDuration,
           }}
         />
```

- [transition] Allow more accurate PropTypes (#8858) @apieceofbart
```diff
-    <Dialog transition={<Slide direction="left" />} />;
+    const Transition = props => <Slide direction="left" {...props} />
+    <Dialog transition={Transition} />;

-    <Snackbar transition={<Slide direction="left" />} />;
+    const Transition = props => <Slide direction="left" {...props} />
+    <Snackbar transition={Transition} />;
```

- [RTL] Make Right-to-left optional (#8916) @oliviertassinari
`jss-rtl` needs to be installed and added to jss by the users.  We do no longer do it by default.

#### Component Fixes / Enhancements

- [Popover] Add a marginThreshold property (#8815) @eyn
- [Tabs] Fix consecutive updates (#8831) @oliviertassinari
- [TextField] Support adornment full width (#8835) @oliviertassinari
- [TextField] Fix dirty state update (#8879) @oliviertassinari
- [breakpoints] Increase step to 5, fix media query matching on Safari (#8846) @dangh
- [Input] Fix disabled state (#8848) @oliviertassinari
- [Input] Fix inputProps overwriting className (#8867) @johnnynia
- [Input] Ignore underline pointer events (#8885) @johnnynia
- [Input] Made the labels for adorned elements not shrink on end adornment (#8882) @kf6kjg
- [Popover] Warn when the height of the Popover is too tall (#8839) @amilagm
- [Tooltip] Fix resize issue (#8862) @oliviertassinari
- [CircularProgress] Add "inherit" color option (#8871) @dapetcu21
- [Select] Fix array mutability flow annotation (#8870) @dapetcu21
- [Dialog] Fix IE11 overflow bug (#8877) @sakulstra
- [Menu] Add a PopoverClasses property (#8884) @johnnynia
- [CircularProgress] Add thickness property to .t.ds file (#8888) @jportela
- [Slider] Shouldn't be visible when in=false (#8894) @oliviertassinari
- [Collapse] Fix height computation (#8895) @oliviertassinari
- [withStyles] Better handle react-hot-loader (#8897) @oliviertassinari

#### Docs

- [docs] Fix wrong SSR path location (#8822) @lukePeavey
- [docs] Fix some issues I have noticed (#8826) @oliviertassinari
- [docs] Fix typos in input adornments example (#8836) @leMaik
- [docs] Better onboarding experience (#8851) @oliviertassinari
- [docs] Show disabled MenuItem (#8853) @ojathelonius
- [docs] Fix Typos (#8860) @shtam
- [docs] Update Popover component readme (#8865) @gregnb
- [docs] Move the font link of CRA for codesandbox (f068f50187b2cc520d3af1276578d9ed951811b7) @oliviertassinari
- [docs] Show how to change the color of the TextField (#8880) @oliviertassinari
- [docs] Simpler IconMenu example (#8892) @oliviertassinari
- [docs] Temporary fix for SSR issue with Portal (#8907) @oliviertassinari

#### Core

- [flow] Add config lint (#8834) @rosskevin
- [core] Upgrade the dependencies (#8852) @oliviertassinari
- [core] Fix missing typings in /es folder (#8887) @NeoLegends
- [core] Upgrade to react@16 (#8889) @oliviertassinari
- [core] Upgrade size-limit (#8899) @oliviertassinari
- [Table] Increase test coverage (#8910) @leMaik
- [test] Increase test coverage (#8908) @oliviertassinari

## 1.0.0-beta.18
###### *Oct 24, 2017*

Big thanks to the 14 contributors who made this release possible.

Here are some highlights ✨:
- New InputAdornment component (#8504).
- New [Frequently asked questions](https://github.com/mui-org/material-ui/blob/4df547d56448cedf70977d6e2463b38eaf64d1c7/docs/src/pages/getting-started/frequently-asked-questions.md) documentation section
- We have saved 1 KB gzip by removing our internal react-transition-group fork (#8785).
- We have made one step further in order to upgrade all our development dependencies to react@16 (#8804).

### Breaking change

- [Popover] Fix incorrect className API and add mouseover demo (#8774) @oliviertassinari

I have noticed one inconsistency with the `className` property.
The value should have been applied on the root of the component.
We enforce this behavior now.

#### Component Fixes / Enhancements

- [createTypography] Add htmlFontSize option (#8699) @kristenmills
- [Modal] Improve scroll handling (#8715) @oliviertassinari
- [RadioGroup] Better keyboard focus logic (#8720) @oliviertassinari
- [ButtonBase] Fix missing keyboard ripple (#8723) @sakulstra
- [ButtonBase] Remove Firefox dotted outline #8721) @oliviertassinari
- [Tooltip] Redefine title from base typescript (#8727) @DaIgeb
- [TypeScript] Fix GridListTitle `rows` property (#8740) @fathyb
- [InputAdornment] New Component (#8504) @eyn
- [TableRow] Adjust CSS for components other than <tr> (#8750) @chaitan94
- [Select] Add missing definition for displayEmpty (#8754) @cauld
- [Select] Fix autoWidth regression (#8796) @oliviertassinari
- [ListItem] Disable hover effect on touch devices (#8803) @8enmann
- [styles] Add performance optimization option (#8757) @oliviertassinari
- [theme] Support overriding the shadows key (#8795) @oliviertassinari

#### Docs

- [docs] Correct some typos in name 'TypographyTheme' (#8707) @douglasmamilor
- [docs] Better warning description (#8783) @agatac
- [docs] Fix the docs support on windows (#8792) @SeasideLee
- [docs] Correct a typo (occurence -> occurrence) (#8798) @chaitan94
- [docs] Add more information on the migration path (#8709) @oliviertassinari
- [docs] Responsive team page (#8714) @oliviertassinari
- [docs] Better display for print (#8729) @oliviertassinari
- [docs] Interoperability with react-jss (#8735) @oliviertassinari
- [docs] Add CII Best Practices (#8736) @oliviertassinari
- [docs] FAQ disable ripple (#8747) @oliviertassinari
- [docs] Add FAQ inline-style vs withStyles() (#8758) @oliviertassinari
- [docs] Add promising pickers lib (#8814) @oliviertassinari

#### Core

- [core] Output ES code in /es (#8772) @NeoLegends
- [core] Remove erroneous exports from styles/index.d.ts (#8805) @pelotom
- [typescript] Standard Props (#8781) @pelotom
- [core] Use react-transition-group (#8785) @oliviertassinari
- [core] Keep fixing failing tests for react@16 (#8804) @oliviertassinari
- [core] react-popper allows react 16 (#8800) @oliviertassinari
- [core] Upgdate some dependencies (#8722) @oliviertassinari
- [core] Upgrade some dependencies (#8737) @oliviertassinari
- [core] Upgrade some dependencies (#8777) @oliviertassinari
- [core] Upgrade some dependencies (#8816) @oliviertassinari

## 1.0.0-beta.17
###### *Oct 16, 2017*

Big thanks to the 14 contributors who made this release possible.

This release is mostly about stability.
We have merged many bug fixes PRs and documentation improvement PRs.
We are garbage collecting all the features we have been adding lately.
As this garbage collection stabilize, we will be able to add new features, like a stepper, extension panel or date/time pickers. But we are not here yet.
For instance, we need to upgrade all our dev dependencies to *react@16* first.

### Breaking change

- [Grid] Add alignItems & alignContent properties (#8647) @sakulstra

```diff
-        <Grid container xs={6} align="flex-end">
+        <Grid container xs={6} alignItems="flex-end">
           <Grid item>
```

#### Component Fixes / Enhancements

- [ButtonBase] Fix ripple on mobile (#8605) @oliviertassinari
- [icons] Bump recompose version (#8615) @sakulstra
- [icons] Change homepage (#8621) @oliviertassinari
- [withWidth] Export the module in index.js (#8616) @sakulstra
- [typescript] Fix typings for withTheme (#8627) @DaIgeb
- [typescript] Change the TextField.label type to the InputLabel.children type (#8630) @DaIgeb
- [typescript] Fix conflicting types for onChange prop (#8618) @pelotom
- [typescript] Collapse: Redefine children from Transition (#8655) @DaIgeb
- [typescript] Add "baseline" to GridItemsAlignment type (#8678) @brentatkins
- [Badge] Fix vertical alignment inside IconButton (#8677) @AndreiBelokopytov
- [ListItemAvatar] Fix dense font icon display (#8682) @lawlessnut
- [TableCell] Better handle long text (#8685) @lunzhang
- [typing] Chip definition was missing deleteIcon & more (#8696) @cauld
- [Tabs] Add a TabScrollButton property (#8695) @lawlessnut
- [CircularProgress] Fix non Chrome rendering (#8687) @oliviertassinari
- [Badge] Add an example with a IconButton (#8683) @oliviertassinari
- [Button] Better render multilines button (#8684) @oliviertassinari
- [Input] Fix hover style on mobile (#8644) @oliviertassinari
- [Slide] Fix resize issue (#8672) @oliviertassinari
- [RadioGroup] Remove the injected styles (#8692) @oliviertassinari
- [Tooltip] Improve typescript definition (#8698) @oliviertassinari
- [MuiThemeProvider] Add more constraints for everybody sanity (#8701) @oliviertassinari

#### Docs

- [docs] Fix typo in icons.md (#8612) @MazeChaZer
- [docs] Add link for autosuggest-highlight installation (#8625) @senthuran16
- [docs] Fix typo in item description (#8632) @bennyn
- [docs] Add Venuemob to showcase (#8674) @DJAndries
- [docs] TypeScript example project and guide to withStyles (#8694) @pelotom
- [Input] Fix grammar in documentation (#8700) @ludwigbacklund
- [docs] Fix markdown formatting (#8640) @oliviertassinari
- [examples] Everything is back to normal with next.js (#8611) @oliviertassinari
- [docs] Improve fullWidth wording (#8610) @oliviertassinari
- [docs] Make code follow the header font (#8623) @oliviertassinari
- [docs] Improve SVG icons wordings (#8642) @oliviertassinari
- [docs] Fix test page (#8650) @oliviertassinari

#### Core

- [core] Fix more warnings with enzyme@3 and react@16 (#8641) @oliviertassinari
- [core] Prepare upgrade toward enzyme v3 (#8670) @oliviertassinari
- [core] Safer CI on circle-ci with yarn (#8656) @oliviertassinari
- [core] Upgrade deepmerge dependency (#8608) @oliviertassinari
- [core] Fix CSP issue (6172bd0af0c7a0ad66626a9c3d9f5aaa34e1a6f7) @oliviertassinari
- [core] Add global prettier config (#8624) @oliviertassinari

## 1.0.0-beta.16
###### *Oct 8, 2017*

Big thanks to the 18 contributors who made this release possible.

Here are some highlights ✨:
- Add Right-To-Left support (#8479) @alitaheri
- Safe TypeScript checking of the `withStyles()` Higher-order Component (#8561) @pelotom and @sebald

### Breaking change

- [TablePagination] Allow using it anywhere (#8525) @leMaik

```diff
             <TableFooter>
-              <TablePagination
-                count={data.length}
-                rowsPerPage={rowsPerPage}
-                page={page}
-                onChangePage={this.handleChangePage}
-                onChangeRowsPerPage={this.handleChangeRowsPerPage}
-              />
+              <TableRow>
+                <TablePagination
+                  count={data.length}
+                  rowsPerPage={rowsPerPage}
+                  page={page}
+                  onChangePage={this.handleChangePage}
+                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
+                />
+              </TableRow>
             </TableFooter>
```

- [typescript] Fix withStyles typing for class components; remove usage as TS decorator (#8561) @pelotom
  We drop the TypeScript decorator support.

#### Component Fixes / Enhancements

- [Collapse] Fix handleEntered method (#8499) @tcoughlin3
- [ButtonBase] Fix borderRadius for Chrome 63 (#8507) @gokulchandra
- [Collapse] Implement the ability to set the collapsed height through props (#8368) @jackyho112
- [GridList] Add momentum scrolling (#8538) @JeromeFitz
- [Tabs] Add momentum scrolling (#8536) @RichardLindhout
- [SwitchBase] Simplify the implementation (#8540) @oliviertassinari
- [Typography] Add Vertical Rhythm (#8560) @oliviertassinari
- [Input] Fix Textarea regression handling (#8557) @oliviertassinari
- [Snackbar] Fix position regression (#8573) @oliviertassinari
- [IconButton] Take advantage of the CSS inheritance (#8575) @oliviertassinari
- [Select] Add a displayEmpty property (#8587) @oliviertassinari
- [Select] Update description for displayEmpty propepty (#8589) @gmlnchv
- [style] Add RTL support (#8479) @alitaheri
- [TableCell] Fix padding TypeScript definition (#8591) @dakisxx
- [TableCell] Wrong label: 'compact' should be 'dense' (#8596) @dakisxx
- [Table] Standardize class names (#8593) @oliviertassinari
- [Hidden] Make the children property required (#8502) @oliviertassinari

#### Docs

- [docs] Fix color palette demo (#8513) @JeromeFitz
- [docs] Fix copy and paste error in migration guide (#8514) @uwap
- [docs] Change the Edit this page link in the API (#8511) @oliviertassinari
- [Example] Pin nextjs example to react 15 (#8521) @eyn
- [docs] Change tooltip placement for table (baa37dee87c4211b598102d8f54500d4dde28a1e) @oliviertassinari
- [docs] Add an app to the v1 showcase (#8548) @Xalio08
- [docs] Add a tests section in the Comparison page (#8555) @oliviertassinari
- [docs] Remove leftover code from Tooltip example (#8551) @the-noob
- [Circular] Add interactive integration in the docs (#8586) @oliviertassinari
- [Hidden] Add docs for initialWidth prop (#8585) @pcardune
- [docs] Avoid SEO indexes duplication (#8592) @oliviertassinari

#### Core

- [core] Upgrade to mocha@v4 (#8517) @oliviertassinari
- [core] Upgrade dependencies (#8577) @oliviertassinari
- [core] Upgrade eslint (#8583) @oliviertassinari
- [core] Prepare upgrade enzyme v3 (#8595) @oliviertassinari
- [misc] Fix small issues reported by users (#8524) @oliviertassinari

## 1.0.0-beta.15
###### *Oct 4, 2017*

## material-ui-icons

#### Component Fixes / Enhancements

- [typscript] Adjust icon typings to change introduces in #8366 (#8529) @sebald

## 1.0.0-beta.13
###### *Oct 1, 2017*

Big thanks to the 18 contributors who made this release possible.

### Breaking change

- [Table] Introduce padding property (#8362) @eyn

```diff
-  <TableCell checkbox>
+  <TableCell padding="checkbox">
```

- [flow] Fix Higher-order Component typing (#8419) @rosskevin

```diff
-  withTheme,
+  withTheme(),
```

- [Transition] Rich transitionDuration property (#8448) @oliviertassinari

```diff
      <Dialog
-       enterTransitionDuration={100}
-       leaveTransitionDuration={100}
+       transitionDuration={100}
      </Dialog>
```

```diff
      <Dialog
-       enterTransitionDuration={100}
-       leaveTransitionDuration={200}
+       transitionDuration={{
+         enter: 100,
+         exit: 200,
+       }}
      </Dialog>
```

#### Component Fixes / Enhancements

- [Tabs] Fix indicator update issue (#8388) @oliviertassinari
- [Tabs] Support empty children (#8492) @oliviertassinari
- [Select] Fix popover width and add autoWidth prop (#8307) @leMaik
- [SelectInput] Fix event forwarding (#8386) @cherniavskii
- [breakpoints] add back deleted `getWidth` as `width` with a spec (#8387) @rosskevin
- [styles] More permissive class name generator warning (#8390) @oliviertassinari
- [Table] Add missing components export (#8425) @klauszhang
- [TablePagination] Fix negative pagination numbers (#8435) @leMaik
- [Typography] Add primary option to color property (#8440) @eyn
- [Typography] Add error option to color property (#8446) @samsch
- [CardMedia] Add `component` property (#8376) @AndriusBil
- [Input] Fix wrong CSS property (#8469) @oliviertassinari
- [Input] Better placeholder display logic (#8485) @oliviertassinari
- [icons] Better interoperability with v0.x (#8473) @oliviertassinari
- [icons] Update peer dependency to react 16 (#8476) @eyn
- [Slider] Fix IE11 issue (#8486) @patrickml
- [Chip] Adds option to provide custom delete icon to Chip (#8482) @LinkedList
- [Tooltip] Fix usage with table head (#8488) @oliviertassinari

#### Docs

- [docs] Misspelling on Select demo page (#8384) @kgregory
- [docs] Select API default value for input prop (#8385) @kgregory
- [docs] Add FormDialog Example (#8411) @chaseWillden
- [docs] Typo in next.config.js (#8418) @marcoturi
- [docs] Fix redirections in Supported Components (#8389) @oliviertassinari
- [docs] Improve selection controls section (#8405) @oliviertassinari
- [docs] Fix Drawer and Popover api docs (#8442) @cherniavskii
- [core] Update issue template with language about providing a reproduction case (#8466) @rosskevin
- [flow] add examples/create-react-app-with-flow (#8449) @rosskevin
- [docs] Add a Responsive Drawer example (#8494) @oliviertassinari
- [docs] Move docs to https://material-ui-next.com (#8495) @oliviertassinari
- [docs] Take insertionPoint option into account (#8497) @oliviertassinari

#### Core

- [test] Prepare enzyme v3 upgrade (#8429) @oliviertassinari
- [core] Update react-transition-group for react@16 (#8468) @oliviertassinari
- [core] Update recompose to 0.25.1 (#8408) @oliviertassinari
- [core] Update sinon to the latest version 🚀 (#8396) @greenkeeper
- [core] Upgrade prettier (#8428) @oliviertassinari
- [typescript] Document withStyles overloads (#8364) @pelotom
- [typescript] Make StyledComponent only a type, not a class (#8366) @pelotom
- [typescript] Update `BreakpointsOptions` in `createBreakpoints` (#8374) @peterprice
- [typescript] Correct typings of TextField's onChange (#8378) @sebald
- [typescript] Add missing toolbar property on Mixins interface (#8392) @MSNexploder
- [typescript] Correct type definition for Theme creation (#8395) @TorstenStueber
- [typescript] Improve `createShallow` typings (#8415) @sebald
- [typescript] Re-add tests for `withStyle` use cases (#8399) @sebald
- [typescript] Remove key prop from Snackbar (#8427) @TorstenStueber
- [typescript] Fix common colors typings (#8433) @alitaheri
- [typescript] Per-component class keys (#8375) @pelotom
- [flow] Post-HOC change bug fixes (#8441) @rosskevin
- [flow] 0.56.0 (#8450) @rosskevin
- [flow] Collapse theme is not an external prop (#8470) @rosskevin
- [flow] Fix HOC RequiredProps vs ProvidedProps (#8477) @oliviertassinari
- [core] Update jsdom to v11.3.0 (#8491) @oliviertassinari

## 1.0.0-beta.12
###### *Sep 24, 2017*

Big thanks to the 25 contributors who made this release possible.

Wait, what?! We have been merging 52 pull requests from 25 different people in just 6 days (and closed 60 issues).
This is a new record for the project.
The `v1-beta` version is definitely getting traction.
Thanks for the support!

Here are some highlights ✨:
- Introduction of the first codemods for the `v0.x -> v1.x` migration as well as a documentation page. @vividh (#8311, #8333, #8314)
- The TypeScript definitions made an important step forward with more than 10 PRs merged. @pelotom @sebald @xaviergonz and more
- Wondering how Material-UI compares to the other solutions out there?
We have created a documentation page to stress the tradeoffs taken. (#8319)
- `material-ui@next` has just [crossed **react-toolbox**](https://npm-stat.com/charts.html?package=react-scrollbar-size&package=react-toolbox&from=2017-01-24&to=2017-09-24) in terms of downloads on npm.

### Breaking change

- [styles] Refactorisation of the breakpoints (#8308) @oliviertassinari

```diff
const muiTheme = createMuiTheme({
  breakpoints: {
-    breakpointsMap: {
+    values: {
      xs: 360,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1440,
    },
  },
});
```

 ```diff
   paperWidthXs: {
-    maxWidth: theme.breakpoints.getWidth('xs'),
+    maxWidth: theme.breakpoints.values.xs,
   },
```

- [typescript] Improve type definition for withStyles (#8320) @pelotom

@pelotom did a great job improving the `withStyles` typings, such that less generics are required to be written! Most notably, you no longer have to pass a map of class names to `withStyles`:

```diff
- withStyles<{ root: string; }>(...)
+ withStyles(...)
```

Also, `props` can now be set when applying the HOC:

```diff
- const StyledComponent = withStyles<
-   StyledComponentProps,
-   StyledComponentClassNames
- >(styles)(Component);
+ const StyledComponent = withStyles(styles)<StyledComponentProps>(
+   ({ classes, text }) => (
+     <div className={classes.root}>
+       {text}
+     </div>
+   )
+ );
```

When `withStyles()` is used as a decorator and `strictNullChecks` is enabled, one has to use the `!` operator to access classes from within the class.

#### Component Fixes / Enhancements

- [Tabs] Move updateIndicatorState after render lifecycle (#8260) @markselby9
- [Tabs] Handle sever side rendering (#8358) @oliviertassinari
- [Tooltip] Fix overlaps and prevents clicking on element belows (#8257) @quanglam2807
- [Tooltip] Fix forced reflows #8293 (#8325) @mctep
- [Chip] Remove highlight on Android and iOS (#8280)@oliviertassinari
- [Snackbar] Add `resumeHideDuration` property (#8272) @AndriusBil
- [ListSubheader] Use sticky list by default (#8194) @slavab89
- [TextField] Add a select mode (#8274) @ctavan
- [TextField] Add Formatted input section in the docs (#8347)
- [MenuItem] Fix dense mode (#8330) @dapetcu21
- [Table] Add a TableFooter for pagination (#8254) @leMaik
- [Table] Update flow types for remaining table components (#8345) @eyn
- [Table] Enhance PropType checks for TableCell (#8350) @eyn
- [Input] Add underline padding at all times (#8348) @dapetcu21
- [Drawer] Add border anchor right (#8361)
- [Dialog] Add `fullWidth` property (#8329) @AndriusBil

#### Docs

- [codemod] Update import paths for colors v1 (#8311) @vividh
- [codemod] Update import paths for svg-icons v1 (#8333) @vividh
- [docs] Add a comparison section (#8319) @oliviertassinari
- [docs] Add small migration guide, to be continued (#8314) @oliviertassinari
- [docs] Add some details about TextField vision (0c9936c40a359a3b7d81d44ca63061a0116b9d6d) @oliviertassinari
- [docs] Right colors (#8268) @oliviertassinari
- [docs] Minor grammatical fixes (#8283) @vpicone
- [docs] Tooltips are supported (#8282) @skirunman
- [docs] Autosuggest example typo fix (#8315) @the-noob
- [docs] Changing type 'Alignement' to Alignment (#8335) @apearson
- [CHANGELOG] Add info for withStyles BC (#8342) @sebald

#### Core

- [flow] Remove class property props to reduce bundle size (#7884) @rosskevin
- [flow] Update to flow 55 (#8305) @oliviertassinari
- [types] Better component typing (#8304) @oliviertassinari
- [styles] Add a new defensive warning (#8341) @oliviertassinari
- [core] Upgrade the dependencies (#8284) @oliviertassinari
- [core] Help Webpack doing dead code elimination (#8340) @oliviertassinari
- [core] Add TypeScript in the CI (#8328) @oliviertassinari
- [typescript] Fix typo in Tooltip (#8271) @Rid
- [typescript] Fix definitions for BreakpointsOptions (#8285) @peterprice
- [typescript] Fix for Avatar.d.ts not having a style property definition (#8277) @xaviergonz
- [typescript] Fix missing attribute in FormControl (#8297) @maresja1
- [typescript] Fix Tooltip typings (#8292) @lagunoff
- [typescript] Add className to StyledComponentProps (#8295) @pelotom
- [typescript] Allow `Grid` to accept `HTMLAttributes` props (#8317) @michaelgruber
- [typescript] Add style to StyledComponentProps (#8322) @pelotom
- [typescript] Restore withStyles class decorator (#8354) @pelotom
- [typescript] Enable strictNullChecks (#8356) @pelotom
- [typescript] Allow overriding a subset of classes (#8355) @pelotom
- [typescript] Allow overriding a subset of classes (#8355) @pelotom

## 1.0.0-beta.11
###### *Sep 18, 2017*

Big thanks to the 12 contributors who made this release possible.

### Breaking change

- [Tooltip] Rename label to title property to match the native HTML feature wording (#8234) @oliviertassinari

```diff
-  <Tooltip label="Add">
+  <Tooltip title="Add">
```

#### Component Fixes / Enhancements

- [AppBar] Height shall not shrink (#8192) @hongyuan1306
- [Select] Allow invalid children (#8201) @sakulstra
- [typescript] Correct TypeScript types of typography definitions (#8199) @TorstenStueber
- [Drawer] Height should be set to 100% to allow scrolling (#8203) @Skaronator
- [ButtonBase] Wrong layout with Safari (#8211) @oliviertassinari
- [typescript] Fix `withResponsiveFullScreen`, `Input` + `Select` (#8214) @sebald
- [typescript] Correct definition of StyledComponentProps (#8221) @TorstenStueber
- [Tooltip] Add fontFamily to component (#8226) @nel-co
- [Tooltip] Add accessibility support (#8234) @oliviertassinari
- [Menu] Second iteration on focus issue (#8234) @oliviertassinari
- [ListItem] Add some spacing for ListItemSecondaryAction (#8239) @oliviertassinari
- [ButtonBase] Better support of the component property (#8218) @dobryanskyy
- [TableRow] Adjust head row height according to the specs (#8249) @leMaik
- [Tooltip] Fix core issues with the component (#8250) @oliviertassinari
- [typescript] Fix prop name typo (#8261) @Portgass

#### Docs

- [Tooltip] Add a warning when using the title native feature at the same time (#8234) @oliviertassinari
- [Popover] Remove unsupported modal property from the Popover component that doesn't match his purpose. (#8234) @oliviertassinari
- [Form] Extend the description of the component (#8234) @oliviertassinari
- [docs] Some fixes (#8210) @oliviertassinari
- [docs] Fix typo in markdown generation (#8222) @albinekb
- [Toolbar] Fix documentation of children property (#8230) @eyn
- [Drawer] Improve the Temporary demo (#8241) @oliviertassinari
- [docs] Simplify the carbon integration (#8244) @oliviertassinari
- [docs] Add google analytics (#8247) @oliviertassinari

#### Core

- [Tooltip] Add a visual regression test (#8228) @oliviertassinari

## 1.0.0-beta.10
###### *Sep 14, 2017*

This is an early release as we have been breaking the typescript typings with 1.0.0-beta.9.
Hopefully, we are in a better state now.
Here are some highlights:
- Keeping pushing typing fixes @xaviergonz and @sebald
- A new Tooltip component thanks to @quanglam2807 (#7909)
- Our internal styling solution should be faster with (#8142).
With the last release we fix a memory leak (#8036), so thanks for reporting those issues!

Big thanks to the 13 contributors who made this release possible.

### Breaking changes

- [MobileStepper] Add nextButton and backButton property (#8001) @wieseljonas

```diff
+import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
+import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

     <MobileStepper
-        onBack={this.handleBack}
-        onNext={this.handleNext}
-        disableBack={this.state.activeStep === 0}
-        disableNext={this.state.activeStep === 5}
+        nextButton={
+          <Button dense onClick={this.handleNext} disabled={this.state.activeStep === 5}>
+            Next
+            <KeyboardArrowRight />
+          </Button>
+        }
+        backButton={
+          <Button dense onClick={this.handleBack} disabled={this.state.activeStep === 0}>
+            <KeyboardArrowLeft />
+            Back
+          </Button>
+        }
      />
```

#### Component Fixes / Enhancements

- [Tooltip] New component (#7909) @quanglam2807
- [typescript] Fix ts tabindex to use number (#8125) @xaviergonz
- [Drawer] Fix delegation of the className (#8126) @daveish
- [ButtonBase] Make the `button` and `a` behavior the same (#8130) @oliviertassinari
- [withStyle] Memoize the classes object between renders (#8142) @oliviertassinari
- [typescript] Fix for Popover -> PaperProps typing (#8129) @xaviergonz
- [typescript] Fix for createPalette TS types (#8123) @xaviergonz
- [LinearProgress] Fix loop (#8146) @oliviertassinari
- [Card] Add `backgroundPosition: 'center'` to CardMedia (#8148) @kripod
- [ImgBot] Optimize images (#8154) @dabutvin
- [Input] Better handle type=number (#8164) @oliviertassinari
- [typescript] Improve typings for `ButtonBase` (#8175) @sebald
- [typescript] Make `withStyles` usable as decorator (#8178) @sebald
- [FormControls] Fix styling for component (#8186) @slavab89
- [Toolbar] Add a toolbar mixins 💄 (#8157) @wcandillon
- [Switch] Styling bug fix on long labels (#8181) @willfarrell
- [Radio] Accept invalid children (#8187) @oliviertassinari
- [theme] Extend createMuiTheme behavior (#8188) @oliviertassinari

#### Docs

- [docs] Fix popover component name (#8161) @cherniavskii
- [Snackbar] 6e3 -> 6000; better to be less clever and more clear (#8151) @davidcalhoun
- [docs] Inverse expand icons on the NestedList demo (51f40016e29f5159a87cafae1092eb85416eb0d5) @oliviertassinari

#### Core

- [core] Bump some dependencies (#8149) @oliviertassinari

## 1.0.0-beta.9
###### *Sep 10, 2017*

Again, this release is particularly dense! Here are some highlights:
- Many typing fixes (typescript and flow) by @sebald, @rosskevin and @xaviergonz
- A new Select component thanks to @kybarg (#8023)
- A new Pickers documentation page (#8117)

Big thanks to the 13 contributors who made this release possible.

### Breaking changes

N/A

#### Component Fixes / Enhancements

- [Select] First implementation (#8023) @kybarg
- [style] Fix memory leak (#8036) @oliviertassinari
- [RadioGroup] Fix TypeScript definition for value property (#8026) @jaredklewis
- [Popover] Pass transitionDuration to Grow (#8049) @nvma
- [typescript] Add `image` to CardMediaProps (#8033) @sebald
- [typescript] Fix typings of withTheme (#8052) @sebald
- [typescript] Fix `BottomNavigation`s onChange type (#8067) @sebald
- [typescript] Allow to pass stylings props via component props (#8066) @sebald
- [typescript] Update index and format (#8076) @sebald
- [CardMedia] Allow styling without breaking image (#8079) @pex
- [List] Remove overflow (#8086) @oliviertassinari
- [SvgIcon] Fix react@16 issue with `focusable` (#8102) @NLincoln
- [Hidden] Change children type to allow many and add children tests (#8082) @rosskevin
- [IconButton] Correct CSS precedence (#8106) @oliviertassinari
- [Tabs] Accept null children (#8107) @oliviertassinari
- [Snackbar] Fix click-through issue in IE11 (#8096) @stbenz88
- [InputLabel] Add a FormControlClasses property (#8108) @oliviertassinari
- [typings] Switch tabIndex from string type to number | string (#8115) @xaviergonz
- [Input] Dodge the BFcache issue (#8110) @rosskevin

#### Docs

- [Picker] Add page section in the documentation (#8117) @oliviertassinari
- [docs] Update basics.md (#8014) @kgaregin
- [docs] 🚑 Fix broken link (#8029) @wcandillon
- [examples] Fix typo in extraction path (#8031) @freiit
- [Drawer] Fix for mini variant drawer can be scrolled horizontally when collapsed (#8112) @xaviergonz
- [docs] Update react-docgen and fix api docs (#8056) @rosskevin
- [docs] Remove defensive checks (#8057) @rosskevin
- [examples] Fix create react app explicit dependencies (#8087) @rosskevin
- [docs] Add a spread section to the API page (#8097) @oliviertassinari
- [docs] Reduce the bundle size 📦 (#8121) @oliviertassinari
- [docs] Add carbon (#8118) @oliviertassinari
- [docs] Makes the sections bolder (#8116) @oliviertassinari

#### Core

- [core] Flow 0.54.0 updates (#8042) @rosskevin
- [typescript] Add example for using withStyle/Theme together (#8078) @sebald
- [core] Small improvements (#8084) @oliviertassinari

## 1.0.0-beta.8
###### *Sep 2, 2017*

Big thanks to the 8 contributors who made this release possible.

### Breaking changes

N/A

#### Component Fixes / Enhancements

- [typescript] Adjust typings to refactoring in `styles` (#7975) @sebald
- [Drawer] Add `type` property, remove `docked` property in TypeScript definition (#7998) @jaredklewis
- [typescript] Make createMuiTheme's ThemeOptions recursively partial (#7993) @fathyb
- [npm] Move "next" to the dev dependencies (#7980) @oliviertassinari

#### Docs

- [docs] Add a NestedList example (#7995) @apalanki
- [SSR] Remove the singleton hack ✨ (#7965)
- [docs] Fix SSR palette creation section (#7987) @Shastel
- [docs] Remove typo on the Paper demo page (#7979) @jzakotnik
- [docs] Add missing inheritance pragma to MenuItem (#7983) @yuchi
- [example] Fix next.js CSS blink (cd0f883325b2b74515972d58f12868897fc34bf6) @oliviertassinari
- [docs] Fix ROADMAP page issues (#8008) @oliviertassinari

#### Core

- [typescript] Add test for Grid (#7991) @sebald

## 1.0.0-beta.7
###### *Aug 30, 2017*

This release is particularly dense! Here are some highlights:
- We release 4 breaking changes at the same time.
This is a first for the project.
We wanted to release them as soon as possible, while the v1-beta market share is still at 10% of the v0.x version.
Hopefully, the frequency of the breaking changes will slow down.
- @rosskevin has upgraded the Flow dependency. v0.53 is providing a much better typing integration with React.
- The Drawer component has some new features.
One of them is allowing the documentation to fully take advantage of the server side rendering.
We expect the documentation to render even faster with this beta.

Big thanks to the 12 contributors who made this release possible.

### Breaking changes

- [theme] Use secondary wording over accent (#7906) @oliviertassinari

```diff
     const theme = createMuiTheme({
-      palette: createPalette({ primary: deepOrange, accent: green }),
+      palette: createPalette({ primary: deepOrange, secondary: green }),
     });
```

```diff
   flatAccent: {
-    color: theme.palette.accent.A200,
+    color: theme.palette.secondary.A200,
```

- [Drawer] New improvements (#7925) @oliviertassinari


```diff
-<Drawer docked />
+<Drawer type="persistent" />
```

- [theme] Simplification of the API (#7934) @oliviertassinari
  - If you are using a direct import of `material-ui/styles/theme`, the path changed:
  ```diff
  -import createMuiTheme from 'material-ui/styles/theme';
  +import createMuiTheme from 'material-ui/styles/createMuiTheme';
  ```

  - We have removed the intermediary functions, now you can provide a nested structure to override the generated theme structure inside the first argument of `createMuiTheme()`. Notice that you can still change the output object before providing it to the `<MuiThemeProvider />`.

  ```diff
   const theme = createMuiTheme({
  -  palette: createPalette({
  +  palette: {
       primary: blue,
       secondary: pink,
     }),
  -  typography: createTypography(palette, {
  +  typography: {
       // System font
       fontFamily:
         '-apple-system,system-ui,BlinkMacSystemFont,' +
         '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  -  }),
  +  },
  -},
  +});
  ```

- [Input] Better support required field (#7955) @oliviertassinari

Following Bootstrap, we are now forwarding the required property down to the input component. We used to only apply `aria-required`. This move makes us less opinionated and should help with native form handling.

If you want to avoid the default browser required property handling, you can add a `noValidate` property to the parent `form`.

#### Component Fixes / Enhancements

- [TextField] Fix label position with dense margins (#7946) @phallguy
- [FormControlLabel] Allow for node in the label prop (#7903) @Taldrain
- [ListItemIcon] Icon should not shrink fixes (#7917) @gulderov
- [withResponsiveFullScreen] missed type import (#7926) @rosskevin
- [typescript] Fixes/improvements for withWith/withStyle/BottomNavigationAction (#7897) @sebald
- [typescript] Update typings to popover changes (#7937) @sebald
- [Popover] Expose the component (#7927) @oliviertassinari
- [ButtonBase] Better warning message (#7904) @oliviertassinari
- [Menu] Allow invalid children (#7907) @oliviertassinari
- [Menu] Add a new warning (#7962) @oliviertassinari

#### Docs

- [docs] Fix missing props in css-in-js examples (#7867) @Izhaki
- [docs] Fix docs build on Windows (#7938) @kybarg
- [docs] remove flow from demos (#7883) @rosskevin
- [docs] Use emoji directly instead of :shortcodes: (#7912) @markspolakovs
- [docs] Show an example with the data- pattern (#7924) @Sigfried
- [docs] Small fixes after the next.js refactorization (#7851) @oliviertassinari
- [docs] Fix typo in floating-action button property of Button (#7951) @kgregory
- [docs] Add the title for SEO (#7885) @oliviertassinari
- [docs] Better support IE11 (#7939) @oliviertassinari
- [docs] The style is injected at the bottom of the head (#7954) @oliviertassinari

#### Core

- [typescript] Refactor typings to modules (#7874) @sebald
- [flow] Upgrade to flow 0.53.1 (#7869) @rosskevin
- [core] Misc flow fixes (#7890) @rosskevin
- [core] Upgrade prettier (#7941) @oliviertassinari

## 1.0.0-beta.6
###### *Aug 20, 2017*

A big shout-out to @sebald for our first TypeScript coverage.
Another notable change is [the migration of the documentation](#7759) to [Next.js](https://github.com/zeit/next.js), it's twice as fast as before 🚀.

Big thanks to the 9 contributors who made this release possible.

### Breaking changes

- [RadioGroup] Rename selectedValue to value (#7832) @oliviertassinari

Push #7741 initiative forward (use `value` and `onChange` as controlling properties)

```diff
-<RadioGroup selectedValue="foo">
+<RadioGroup value="foo">
// ...
```

#### Component Fixes / Enhancements

- [Table] Add the possibility of custom element type (#7765) @wieseljonas
- [Input] remove extraneous props when using custom component (#7784) @rosskevin
- [Input] should accommodate number and string values (#7791) @rosskevin
- [Slide] Remove Slide offset property from src and docs (#7808) @gfpacheco
- [typescript] Create typings for material-ui-icons (#7820) @sebald
- [typescript] Add tests for typings + fixes (#7686) @sebald
- [typescript] Update typings for beta.4 and beta.5 (#7793) @sebald
- [typescript] Update <Slide> typings (#7817) @sebald
- [TextField] Fix placeholder issue (#7838) @oliviertassinari

#### Docs

- [docs] Use Next.js: x2 performance (#7759) @oliviertassinari
- [docs] Add the 'data grid for Material-UI' reference (#7786) @dxbykov
- [docs] Renamed the styleSheet argument in withStyles to styles (#7819) @phiilu
- [docs] Advanced table (#7824) @oliviertassinari
- [docs] Fix typo (#7777) @Merkyl999x
- [docs] Fix run-on sentences (#7792) @gitname
- [docs] Show inherited components (#7846) @oliviertassinari
- [docs] Add a team page (#7842) @oliviertassinari
- [docs] Add a ROADMAP page (#7840) @oliviertassinari
- [docs] Some last improvement before the release (#7847) @oliviertassinari

#### Core

- [core] Better usage of the CI 🚀 (#7833) @oliviertassinari
- [core] Fix size-limit warning (#7822) @oliviertassinari
- [icons] Automate release process (#7823) @oliviertassinari
- [core] Update some dependencies (#7831) @oliviertassinari

## 1.0.0-beta.5
###### *Aug 15, 2017*

Big thanks to the 11 contributors who made this release possible.

### Breaking changes

- [Tabs][BottomNavigation] Use value over index property (#7741) @oliviertassinari

This is an effort in the prolongation of #2957 where `value`/`onChange` is the idiomatic interface to control a component.
```diff
-<Tabs index={0}>
+<Tabs value={0}>
// ...
```
- [core] Remove createStyleSheet (#7740)(#7730) @oliviertassinari

The primary motivation for this change is simplicity, it's also making our interface closer to
`react-jss`.
```diff
-import { withStyles, createStyleSheet } from 'material-ui/styles';
+import { withStyles } from 'material-ui/styles';

-const styleSheet = createStyleSheet('Button', {
+const styles = {
  root: {
    background: 'red',
  },
-});
+};

// ...

-export default withStyles(styleSheet)(AppContent);
+export default withStyles(styles, { name: 'Button' })(Button);
```

#### Component Fixes / Enhancements

- [Modal] Fix with react@next (#7673) @oliviertassinari
- [Card] allow overflow - important for content such as autosuggest (#7687) @rosskevin
- [CardHeader] Allow classes in title and subheader (#7701) @bmuenzenmeyer
- [Tabs] Fix full width issue (#7691) @oliviertassinari
- [Button] Disable the hover effect on touch devices (#7692) @oliviertassinari
- [Popover] Refactor popover transition - separation of concerns (#7720) @rosskevin
- [ButtonBase] Expose internal component (#7727) @oliviertassinari
- [LinearProgress] Use transform instead width (#7732) @kevindantas

#### Docs

- [docs] Update Minimizing Bundle Size Documentation (#7707) @umidbekkarimov
- [docs] Fix broken menu on the autocomplete page (#7702) @oliviertassinari
- [examples] Take ownership on the next.js example (#7703) @oliviertassinari
- [docs] Create CODE_OF_CONDUCT.md (1f3e67326d76f5d2053b128d5ca2cdefa0d6d90f) @oliviertassinari
- [docs] Update supported-components.md (#7722) @BLipscomb
- [docs] Fix the installation instructions of the examples (#7733) @dawogfather
- [docs] Fix Typo (#7736) @Merkyl999x

#### Core

- [core] Flow type transitions Slide, Fade, Collapse (#7719) @rosskevin
- [core] General maintenance (#7690) @oliviertassinari

## 1.0.0-beta.4
###### *Aug 5, 2017*

Big thanks to the 7 contributors who made this release possible.

#### Component Fixes / Enhancements

- [Grid] Add baseline to container's align property (#7623) @kgregory
- [GridList] Migrate to v1 branch (#7626) @mbrookes
- [ListItemText] Repurpose text class (#7645) @kgregory
- [Drawer] Fix docker warning (#7598) @oliviertassinari
- [Drawer] Fix Chrome regression (#7599) @oliviertassinari
- [style] Fix HMR issue with react-hot-loader (#7601) @oliviertassinari
- [ButtonBase] Explicit the need for a class component (#7656) @oliviertassinari
- [Modal] Take into account the body margin (#7666) @oliviertassinari
- Fixes in the subway (#7661) @oliviertassinari

#### Docs

- [docs] Fix language issues for clarity (#7610) @skirunman
- [docs] Update docs for <RadioGroup> (#7640) @sebald
- [docs] Fixed "initial" word in vars and typo (#7639) @kybarg
- [docs] Spell check eslint script (#7643) @kybarg
- [docs] Fix audit issues (#7595) @oliviertassinari
- [docs] Show how to use the insertionPoint (#7611) @oliviertassinari

#### Core

- [flow] Export type Props for composability (#7609) @rosskevin
- [typescript] Add TS typings (#7553) @sebald
- [typescript] Improve the coverage (#7606) @sebald
- [core] Add isMuiComponent helper (#7635) @katzoo

## 1.0.0-beta.3
###### *Jul 29, 2017*

Big thanks to the 8 contributors who made this release possible.

This release is full of bug fixes and documentation improvements following the major
styling update of the previous release.

#### Component Fixes / Enhancements

- [Drawer] Fix docked not inheriting props (#7590) @foreggs
- [Dialog] Better fullscreen fix (4deee4b5e3465682996d4dce35e5c60fd040502b) @oliviertassinari
- [List] Fix padding issue (#7529) @markselby9
- [test] Remove dead code (4e2cf38ae3181cf38a5796179bfb2887c402b4ac) @oliviertassinari
- [flow] Fix wrong import (5a88d950bb3e9c7105cfa6b45c796d167827f1d7) @oliviertassinari
- [Tabs] Fix Scroll button visibility state when child tab items are modified (#7576) @shawnmcknight
- [TextField] Forward the id to the label & more (#7584) @oliviertassinari
- [ios] Fix some style issue with Safari iOS (#7588) @oliviertassinari

#### Docs

- [docs] Add example with Create React App (#7485) @akshaynaik404
- [docs] Minor tweaks to grammar of CSS in JS page (#7530) @mbrookes
- [docs] Server side fix docs (91a30ee2276d8d06776f6fba831930568974dacc) @oliviertassinari
- [docs] Fix 'colors' path in imports (#7519) @burnoo
- [docs] Some fixes after the latest upgrade (#7528) @oliviertassinari
- [docs] Update for supported components (#7586) @skirunman
- [docs] Fix small issues I have noticed (#7591) @oliviertassinari
- [docs] Optional style sheet name (#7594) @oliviertassinari
- [docs] Use flow weak on the demos as we can't expect users to have flow (cd25e63a214c37ed7945e31aa9b08f02baa17351) @oliviertassinari

#### Core

- [core] Support react@16.0.0-beta.1 (#7561) @oliviertassinari
- [core] Small fixes of the styling solution (#7572) @oliviertassinari
- [core] Better themingEnabled logic (#7533) @oliviertassinari
- [core] Upgrade dependencies and build for the supported targets (#7575) @oliviertassinari
- [core] Upgrade dependencies (#7539) @oliviertassinari
- [flow] Increase coverage (6f4b2b3b3773ace568de54aaefbca963ab408b40) @oliviertassinari

## 1.0.0-beta.2
###### *Jul 23, 2017*

Publish a new version as `v1.0.0-beta.1` was already used.

## 1.0.0-beta.1
###### *Jul 23, 2017*

Big thanks to the 12 contributors who made this release possible.

This is the first beta release.
We are proud to move to the next step after 7 months of dogfooding with the alpha releases.
We have been fixing many bugs and implemented new features.
The styling solution has also been greatly improved:
- Better performance
- Shorter class names in production, e.g. `c1y`
- Better readable class names in development
- No longer required `MuiThemeProvider`
- Simpler `createStyleSheet` API with an optional name
- Theme nesting
- Reliable theme update bypassing pure component logic
- Interoperability with `react-jss`

Please keep in mind that [semver](https://docs.npmjs.com/getting-started/semantic-versioning) won't be respected between pre-releases.
In other words, the API will change if we need to.

### Breaking changes

- [core] Improve styling solution (#7461)

The `styleManager` is gone. The server side rendering configuration changed, use the `sheetManager` instead. The documentation was updated, you can refer to it if needed.

#### Component Fixes / Enhancements

- [List] Make List & ListItem semantic (#7444) @akshaynaik404
- [Portal] Fix Portal not removing layer correctly on React 16 (#7463) @cusxio
- [Popover] Doesn't reposition with anchorEl (#7479) @quiaro
- [IconButton] Remove z-index (#7467) @oliviertassinari
- [IconButton] Add the missing primary color (#7470) @MichaelMure
- [Toolbar] Follow the spec more closely (#7475) @oliviertassinari
- [Dialog] Fix Dialog margin (#7474) @hanalaydrus
- [DialogActions] Fix allow have Children with null values (#7504) @stvkoch
- [Autocomplete] Show an integration example (#7477) @oliviertassinari
- [TextField] Fix multiline issue (#7498) @oliviertassinari
- [Progress] Add color property (#7500) @kgregory

#### Docs

- [docs] Fix minor typo (#7476) @jeffbirkholz
- [docs] Mark items on the supported components page as done (#7492) @Airblader
- [docs] Update help for 'overriding' to specify injection point (#7505) @cdharris
- [docs] Add next.js example (#7510) @oliviertassnari
- [docs] Selection control custom colors (#7516) @oliviertassnari

#### Core

- [core] Ignore the package-lock.json file generated by npm (#7502) @Airblader

## 1.0.0-alpha.22
###### *Jul 18, 2017*

### Breaking changes

- [Switch] New FormControlLabel component (#7388) @oliviertassinari
```diff
<RadioGroup>
-  <LabelRadio label="Male" value="male" />
+  <FormControlLabel value="male" control={<Radio />} label="Male" />
</RadioGroup>
```

This change provides more flexibility.

- [BottomNavigation] Use value over index (#7421) @oliviertassinari
```diff
-  <BottomNavigation index={index} onChange={this.handleChange}>
+  <BottomNavigation value={value} onChange={this.handleChange}>
```

Also plan to do the same for the `Tabs` in order to have a consistant API
where we always use `value`/`onChange` for controlled components.

#### Component Fixes / Enhancements

- [Avatar] Avoid shrink (#7344) @oliviertassinari
- [withWidth] Add a initalWidth property (#7343) @oliviertassinari
- [TextField] vertical spacing to match visual spec (#7359) @rosskevin
- [TextField/FormControl] dense implementation (#7364) @rosskevin
- [Input/FormHelperText] Dense margin fixes (#7374) @rosskevin
- [LinearProgress] Improve perf and clean (#7356) @oliviertassinari
- [TextField] Address autoComplete issue (#7377) @oliviertassinari
- [Menu] maxHeight spec compliance (#7378) @rosskevin
- [Menu] Add ripple (#7381) @oliviertassinari
- [Menu] Fix wrong scroll positioning (#7391) @oliviertassinari
- [Modal] Fix concurrency issue (#7383) @oliviertassinari
- [Checkbox] Add indeterminate property (#7390) @oliviertassinari
- [Snackbar] Handle inactive tabs (#7420) @oliviertassinari

#### Docs

- [docs] Color import correction (#7398) @wieseljonas
- [docs] Fix typo (#7338) @adamborowski
- [docs] Fix the path of imported colors (#7348) @shug0
- [docs] Update documentation to reflect component name (#7406) @the-noob
- [docs] Better warning message for missing MuiThemeProvider (#7429) @oliviertassinari
- [docs] Add @param everywhere (#7432) @oliviertassinari

#### Core

- [flow] global dom element workaround (#7401) @rosskevin
- [core] Add size-limit (#7422)
- [core] Upgrade some dependencies (#7361) @oliviertassinari
- [core] Upgrade dependencies (#7433) @oliviertassinari
- [icons] Upgrade the dependencies (#7385) @oliviertassinari

## 1.0.0-alpha.21
###### *Jul 4, 2017*

### Breaking changes

- [core] Reduce the bundle size (#7306) @oliviertassinari
Change the colors location as you most likely only need 20% of them in your bundle
```diff
-import { blue, fullWhite } from 'material-ui/styles/colors'
+import blue from 'material-ui/colors/blue'
+import common from 'material-ui/colors/common'
+const { fullWhite } = common
```

#### Component Fixes / Enhancements

- [TextField] Fix textarea disabled support (#7255) @Calcyfer
- [withStyles] Provide context for withStyles classes error (#7274) @rosskevin
- [misc] Improve various points (#7275) @oliviertassinari
- [Snackbar] Documentation - key property (#7307) @rosskevin
- [Snackbar] Expose transition onExited to allow for consecutive messages with completed transitions (#7308) @rosskevin
- [Chip] Fix Firefox issue with the svg icon (#7327) @oliviertassinari
- [ButtonBase] Use color inherit by default (#7331 @oliviertassinari
- [Input] Add a fullWidth property (#7329) @oliviertassinari

#### Docs

- [docs] Improve the documentation regarding material.io/icons (#7323) @oliviertassinari
- [docs] Fix MobileStepper API (#7299) @ng-hai

#### Core

- [core] Reduce the bundle size (#7306) @oliviertassinari
- [test] Should get coverage (#7272) @oliviertassinari
- [core] Expand use of flow (#7268) @rosskevin

## 1.0.0-alpha.20
###### *Jun 25, 2017*

Do you like playing with bleeding-edge tech?
We do, we have extended the support of React to the 16.0.0-alpha.13 release (aka Fiber).

### Breaking changes

- [Paper] Use normalized root over paper className (#7198) @oliviertassinari
- [core] Follow the same convention as React for the umd build (#7217) @oliviertassinari

#### Component Fixes / Enhancements

- [material-ui-icons] v1.0.0-alpha.19 (21b67cec3b200517c9dfdf4d28c0bfc2d1dceeaa) @oliviertassinari
- [Input] Fix incorrect type of autoFocus prop (#7189) @gnapse
- [Icons] Modernize icons package (#7203) @kvet
- [Input] Fix various styling issue #7209 @oliviertassinari
- [Tabs] Add a primary color and update the docs (#7242) @oliviertassinari
- [ListItem] Use the .shortest duration (#7246) @oliviertassinari
- [Dialog] Also take fixed element into account (#7239) @oliviertassinari
- [Drawer] Fix first mount transition issue (#7236) @oliviertassinari

#### Docs

- [docs] Fix typo in class name (#7192) @ossan-engineer
- [docs] Add supported server section (#7231) @oliviertassinari
- [docs] Detail the browser support (#7188) @oliviertassinari
- [docs] Upgrade to webpack v3 (#7210) @oliviertassinari
- [docs] More documentation on the typography (#7248) @oliviertassinari

#### Core

- [test] Even faster CI build (#7230) @oliviertassinari
- [styles] Export more functions (#7241) @oliviertassinari
- [react] Support 16.0.0-alpha.13 (#7218) @oliviertassinari
- [core] x2 speed up on the build (#7220) @oliviertassinari
- [babel] Use transform-object-assign over a custom one (#7219) @oliviertassinari
- [core] Some fixes (#7216) @oliviertassinari

## 1.0.0-alpha.19
###### *Jun 19, 2017*

The previous v1.0.0-alpha.18 release is corrupted.

#### Component Fixes / Enhancements

- [Typography] Expose a headlineMapping property (#7183) @oliviertassinari
- [Typography] Add a accent color variation (#7183) @oliviertassinari
- [FormControl] Fix wording (#7183) @oliviertassinari
- [Toolbar] Simplify breakpoint logic (#7183) @oliviertassinari
- [Button] Fix upload button demo (#7183) @oliviertassinari
- [TextField] Forward the placeholder (#7183) @oliviertassinari
- [MobileStepper] Improvements (#7179) @alexhayes
- [MobileStepper] Fix the wordings (#7183) @oliviertassinari
- [AppBar] Use a header instead of a div DOM element (#7183) @oliviertassinari

#### Docs

- [docs] Update minimizing-bundle-size.md (#7169) @kazazor
- [docs] Info on how to use the breakpoints attribute in the theme (#7172) @alexhayes
- [docs] Add a supported browsers section (#7174) @oliviertassinari
- [docs] We don't require any polyfill (#7183) @oliviertassinari
- [docs] Exposes the 3 Babel plugins available for minimising the bundle size (#) @oliviertassinari
- [docs] Fix MATERIAL_UI_PORT not fully supported

#### Core

- [core] Add missing flow import (#7180) @oliviertassinari

## 1.0.0-alpha.18
###### *Jun 19, 2017*

### Breaking changes

- [TextField] Add a marginForm property (#7113) @oliviertassinari
This change makes the extra margin of the component optional.
It's making us following less closely the specification but provides more flexibility out of the box.
- [core] Remove some no longer needed properties (#7132) @oliviertassinari
Use the `classes` property over the removed `xxxClassName`.
- [Button] Implement the dense option over the compact one (#7147) @oliviertassinari

#### Component Fixes / Enhancements

- [SvgIcon] set focusable=false to fix IE tab navigation (#7106) @petermikitsh
- [Dialog] Remove css width as it is too prescriptive for simple dialogs (#7115) @oliviertassinari
- [BottomNavigation] Fix type error when onChange is not defined (#7139) @seasick
- [TextField] Better support number value type (#7162) @oliviertassinari
- [ButtonBase] Normalize ripple to disableRipple (#7159) @oliviertassinari

#### Docs

- [docs] Document the Label wrappers (#7161) @oliviertassinari

#### Core

- [MuiThemeProvider] Small eslint fix (#7128) @Airblader
- [core] Simplify the array logic (#7112) @oliviertassinari
- [core] Fix type use of Element (#7111) @rosskevin
- [core] Use the beta of circleci (#7133) @oliviertassinari
- [core] Update dependencies (#7137) @oliviertassinari
- [core] Update dependencies, able to remove react-addons-test-utils (#7146) @rosskevin
- [core] As usual after using the lib in a real project I find issues (#7147) @oliviertassinari
- [core] Disable linebreak-style rule (#7163) @oliviertassinari
- [test] Four nines (#7173) @oliviertassinari

## 1.0.0-alpha.17
###### *Jun 12, 2017*

Big thanks to the 8 contributors who made this release possible.

### Breaking changes

- [core] Normalize the API (#7099) @oliviertassinari
Reduce degree of freedom of the API with the color property. That's a tradeoff between correctness and verbosity.
People should be able to recover from that breaking change quite easily as react is going to throw warnings. For instance:
```diff
-<Button contrast primary>Login</Button>
+<Button color="contrast">Login</Button>
```

#### Component Fixes / Enhancements

- [Switch] Correctly change the cursor value (#7042) @oliviertassinari
- [FormControl] Cannot read property 'target' of undefined (#7046 @Fi1osof
- [AppBar] Add a position property (#7049) @oliviertassinari
- [Stepper] Mobile version (#7043) @alexhayes
- [Snackbar] Implement the component on the next branch (#7059) @oliviertassinari
- [ListItemText] Add disableTypography property (#7073 @zachwolf
- [Modal] Add a keepMounted property (#7072) @oliviertassinari
- [Button] Fix the behavior when a href is provided (#7083) @oliviertassinari
- [Avatar] Add a imgProps property (#7084) @oliviertassinari
- [FormHelperText] Add a min-height (#7085) @oliviertassinari
- [Button] Add an upload example (#7086) @oliviertassinari

#### Docs

- [docs] Add testing section (#7101) @oliviertassinari
- [docs] Show the vision in the docs (#7078) @oliviertassinari
- [docs] Improve the documentation on the classes property (#7062) @oliviertassinari
- [docs] Improve accessibility in the component examples (#7047) @tuukkao
- [docs] Update usage.md "Hello World" :| (#7027) @dphrag
- [docs] Add link to the temporary alpha docs (#7037) @peteratticusberg

#### Core

- [eslint] Loosen no-unused-vars eslint rule (#7064) @yuchi
- [core] Various fixes (#7028) @oliviertassinari

## 1.0.0-alpha.16
###### *Jun 1, 2017*

This release is mainly about bug fixes and improving the documentation.
Shout out to @kybarg for the update of the `TextField` in order to better follow the spec (#6566).

#### Component Fixes / Enhancements

- [TextField] Make it meet guidelines (#6566) @kybarg
- [TextField] Fix Labels flicker in Chrome (#7010) @kybarg
- [TextField] Fix broken isDirty logic (#7008) @oliviertassinari
- [CircularProgress] make it start and finish from top (#6966) @slavab89
- [Switch] Add inputProps property link in the TextField (#6959) @oliviertassinari
- [BaseButton] Better handle the disabled property (#6958) @oliviertassinari
- [FormControl] Fix onFocus and onBlur events override (#6952) @oliviertassinari
- [Tabs] Add `false` as a valid index value (#6945) @oliviertassinari
- [Input] Improve support of the date/time fields (#6947) @oliviertassinari
- [MuiThemeProvider] Add a muiThemeProviderFactory (#7000) @viotti

#### Docs

- [docs] Add a VISION.md file (#6982) @oliviertassinari
- [docs] Grid docs should refer to Hidden component/demo (#6963) @kgregory
- [docs] Fix grammar/verbiage on customization/themes page (#6943) @drusepth
- [docs] Change text for link (#6977) @sghall
- [docs] Some grammar/text edits (#6976) @sghall
- [docs] Suggested text changes (#6978) @sghall
- [docs] Fix MuiThemeProvider documentation (#6989) @viotti
- [docs] Fix TableRow persistent background when clicked (#7001) @sajal50
- [docs] Add an example with a decorator (#7011) @uufish

#### Core

- [npm] Fix react-scrollbar-size issue (#7009) @oliviertassinari
- [transitions] Add test coverage for the transition validation functions (#6936) @Alex4S
- [eslint] enable flow's built-in types (#6946) @rosskevin
- [test] Upgrade the docker versions (#6979) @oliviertassinari

## 1.0.0-alpha.15
###### *May 23, 2017*

This release introduces an important change in the API and the implementation.
Each exposed component is wrapped with a `withStyles` Higher-order component.
This HOC has different responsibilities, the one you gonna be interested in is
regarding the `classes` property. Now, we consider the CSS as a public API.
You now have two way to customize absolutely all the CSS injected by Material-UI.
Either the instance level with the `classes` property or the class level with the
`overrides` theme property.

To learn more about it, have a look at the documentation.

### Breaking changes

- [core] Various fixes after using it on a real project (#6882) @oliviertassinari
Apply the other properties (undocumented) on the root of the Menu.
- [core] Add a new classes property to all the components #6911 @oliviertassinari
If you where using the ref to access the internal of the component or native elements,
you gonna have to change your strategy, either use `innerRef` or `inputRef`.

#### Component Fixes / Enhancements

- [Typography] Add missing style (#6873) @oliviertassinari
- [Dialog] create responsive HOC `withResponsiveFullScreen` (#6898) @rosskevin
- [core] Remove usage of 'not-allowed' (#6932) @oliviertassinari
- [Switch] Remove the blue flash of death (#6933) @oliviertassinari
- [TextField] Fix the inputClassName property (#6934) @oliviertassinari

#### Docs

- [docs] Enable flow on much more demos (#6881) @oliviertassinari
- [docs] Better support IE11 (#6880) @oliviertassinari
- [Tabs] Document that the index is required (#6935) @oliviertassinari

#### Core

- [eslint] enforce import plugin rules (#6923) @rosskevin
- [core] Change style API (#6892) @oliviertassinari
- [eslint] Fit closer to airbnb (#6894) @oliviertassinari
- [core] Upgrade the dependencies (#6872) @oliviertassinari
- [core] Add prettier (#6931) @oliviertassinari

## 1.0.0-alpha.14
###### *May 14, 2017*

### Breaking changes

- [Hidden] Remove one degree of freedom (#6820) @oliviertassnari
- [Hidden] Logical fixes for up/down (#6839) @rosskevin

#### Component Fixes / Enhancements

- [Icon] Add aria-hidden (#6829) @oliviertassinari
- [Paper] Add elevation boundaries (#6817) @oliviertassinari
- [Paper] Add a component property (#6830) @oliviertassinari
- [Transition] Add flow proptypes (#6846) @rosskevin
- [npm] Upgrade the recompose dependency (#6855) @oliviertassinari
- [TextField] Add in support for multiline text fields (#6553) @peteratticusberg
- [TextField] Second iteration on multilines (#6859) @oliviertassinari

#### Docs

- [docs] Fix link to material-ui-icons (#6825) @NiloCK
- [docs] Add a direct link to GitHub (#6861) @oliviertassinari

#### Core

- [coverage] Remove the flow plugins as they were not needed (#6816) @rosskevin
- [ButtonBase] Add test coverage for instance.focus (#6827) @agamrafaeli
- [ButtonBase] Add test coverage for handleFocus (#6828) @agamrafaeli
- [flow] Fix small issues (#6860) @oliviertassinari

## 1.0.0-alpha.13
###### *May 8, 2017*

### Breaking changes

- [lint/flow] validate imports/exports with eslint and flow (#6757) @rosskevin
Change some import:
```diff
-import { List, ListItem, ListItemText } from 'material-ui/List';
+import List, { ListItem, ListItemText } from 'material-ui/List';
```

- [Grid] Rename Layout to Grid (#6789) @rosskevin
```diff
-import Layout from 'material-ui/Layout';
+import Grid from 'material-ui/Grid';
```

#### Component Fixes / Enhancements

- [Slide] Fix getTranslateValue for left & up cases (#6454) @josulliv101
- [Hidden] Responsively hide content (js implementation) (#6748) @rosskevin
- [Hidden] Fixes, demos, regression tests, and `only` functionality (#6782) @rosskevin
- [Layout] Add a hidden property (#6754) @rosskevin
- [Typography] Flow type (#6787) @rosskevin

#### Docs

- [palette] Require color shape that matches defaults (#6756) @kgregory
- [docs] Document the Theme section (#6810) @oliviertassinari
- [docs] Add a search bar (#6745) @oliviertassinari
- [docs] Generate a summary of each section (#6772) @oliviertassinari
- [docs] Start addressing documentation issues (#6758) @oliviertassinari
- [docs] Hide the context implementation details (#6798) @oliviertassinari

#### Core

- Expanding use of flow for propType, include flow types in package, add flow-typed (#6724) @rosskevin
- [core] Fix flow propTypes generation issue (#6749) @oliviertassinari
- [createShallow] Remove cleanup (#6797) @agamrafaeli

## 1.0.0-alpha.12
###### *Apr 30, 2017*

Big thanks to the 11 contributors who are pushing the `next` branch forward.

### Breaking changes

- [Typography] Rename Text to Typography (#6667) @oliviertassinari
- [Radio] Change checked color to primary (#6683) @khayong

#### Component Fixes / Enhancements

- [Collapse] Add test coverage for wrapper ref (#6617) @agamrafaeli
- [Collapse] Add test coverage for `handleEntered()` (#6616) @agamrafaeli
- [Collapse] Add test coverage for `handleEntering()` (#6615) @agamrafaeli
- [CardHeader] Subheader doesn't go to a new line if there's no avatar (#6668) @kgregory
- [SwitchBase] Add test coverage for `handleInputChange()` (#6613) @agamrafaeli
- [Input] Reset for Safari (21751b293578f25675d415de766f77bd0178fc9c) @oliviertassinari
- [Theme] Reintroduce `muiThemeable` as `withTheme` (#6610) @sxn
- [Modal] Fixes cannot revert back to original overflow when have multiple modals (#6661) @khayong
- [style] Reset the font family where needed (#6673) @oliviertassinari
- [consoleErrorMock] Add test coverage (#6681) @agamrafaeli
- [Transition] Add test coverage for `shouldComponentUpdate()` (#6680) @agamrafaeli
- [ModalManager] Add test coverage for removal of non-exiting modal (#6678) @agamrafaeli
- [Tabs] Label text wrapping / font scaling (#6677) @shawnmcknight
- [Tabs] Cancel throttled event callbacks (#6715) @shawnmcknight
- [Tabs] Improve component lifecycle (#6730) @shawnmcknight
- [material-ui-icons] add making index.js (#6676) @taichi
- [breakpoints] up(‘xs’) should have a min-width of 0px (#6735) @rosskevin

#### Docs

- [docs] Fix the example "Usage" to match new Button component (#6692) @artarmstrong
- [docs] Fix theme toggling (#6652) @nathanmarks
- [TextField] Add password example to docs (#6637) @peteratticusberg
- [docs] Fix layout edit button (4b5fedf902704b5e3dd2dba63fc2263f11e975d0) @oliviertassinari
- [docs] Fix IE11 issue (6ad3354ec1a844d0f03bf890a5e73a7987179be7) @oliviertassinari

#### Core

- [material-ui-icons] Modernize the package (#6688) @oliviertassinari
- [core] Also take the demo into account for the regressions tests (#6669) @oliviertassinari

## 1.0.0-alpha.11
###### *Apr 14, 2017*

#### Component Fixes / Enhancements

- [Drawer] Proper placement for anchor other than left (#6516) @kgregory
- [ListItemAvatar] Fix & refactor (#6540) @mbrookes
- [style] Add missing blueGrey colors (#6548) @peteratticusberg
- [ButtonBase] Change tests to use faketimers (#6559) @agamrafaeli
- [ButtonBase] Add test coverage for handleKeyDown (#6591)
- [Tabs] Add scrollable behavior (#6502) @shawnmcknight
- [Modal] Test focus (#6573) @agamrafaeli
- [Chip] Add MuiChip to MUI_SHEET_ORDER (#6595) @nareshbhatia
- [Collapse] Add test coverage for `handleExiting()` (#6589) @agamrafaeli
- [Modal] Add test coverage for `handleDocumentKeyUp()` (#6588) @agamrafaeli
- [Popover] Add test coverage for `handleRequestTimeout()` (#6599) @agamrafaeli

#### Docs

- [package.json] Add test:unit:grep (#6586) @agamrafaeli
- [docs] Fix build:docs command (#6606) @oliviertassinari

#### Core

- [utils] Remove throttle (#6545) @agamrafaeli
- [react] Upgrade to React@15.5.3 (#6543) @oliviertassinari
- [core] Remove one babel transform as require the Symbol polyfill (#6602) @oliviertassinari
- [core] Add missing babel-runtime dependency (#6535) @oliviertassinari
- [core] Random small fixes (#6522) @oliviertassinari
- [test] Makes sure argos run even if diff fails (#6512) @oliviertassinari

## 1.0.0-alpha.10
###### *Apr 6, 2017*

We are continuing investing in the documentation and the test suite.

Visual regression tests are now sent to [argos-ci](https://www.argos-ci.com/mui-org/material-ui).
Thanks @agamrafaeli for increasing the test coverage of 1% since the last release (95.23%).
Thanks @mbrookes for fixing the inconsistency of the API and improving the API.

### Breaking changes

- [core][docs] Invert negative bool props (#6487) @mbrookes

```diff
// Paper
-rounded
+square

// BottomNavigation
-showLabel
+showLabels

// Button, IconButton, Switch
-ripple
+disableRipple

// Modal, Dialog
-backdropVisible
+backdropInvisible

-backdrop
+disableBackdrop

-hideOnBackdropClick
+ignoreBackdropClick

-hideOnEscapeKeyUp
+ignoreEscapeKeyUp

// Backdrop
-visible
+invisible

// ListItem
-gutters
+disableGutters

// InputLabel, TextFieldLabel
-animated
+disableAnimation

// TableCell, List
-padding
+disablePadding

// Inputn
-underline
+disableUnderline

// CardAction
-actionSpacing
+disableActionSpacing

// CardHeader
-subhead
+subheader
```

#### Component Fixes / Enhancements

- [TextField] Forward name props to the input (#6469) @nvma
- [MuiThemeProvider] Add test for for componentWillUpdate (#6474) @agamrafaeli
- [styles.breakpoints] Add test for `only()` calling 'xl' (#6475) @agamrafaeli
- [Menu] Add tests for handleEnter() (#6477) @agamrafaeli
- [transitions] Add test coverage for getAutoHeightDuration (#6507) @agamrafaeli
- [Popover] Add test for getoffset (#6510) @agamrafaeli
- [breakpoints] Fix down function, eliminate overlap (#6504) @kgregory

#### Docs

- [docs] Add missing prop descriptions to all components (#6483) @mbrookes
- [docs] Link version number to release notes (#6486) @mbrookes
- [docs] Link between sections (#6480) @oliviertassinari
- [docs] Add a 'edit this page' button (#6482) @oliviertassinari
- [docs] Display the current version (#6481) @oliviertassinari
- [docs] Upgrade the dependencies (567a35ea3d2aa634a3072fb8b0151c9890551447) @oliviertassinari

#### Core

- [test] Fix import paths for theme and MuiThemeProvider (#6493) @joefitzgerald
- [test] Add argos-ci (#6391) @oliviertassinari
- [test] Add HTML reporting of coverage from npm (#6479) @agamrafaeli
- [TouchRipple] Remove react-addons-transition-group (#6514) @ykzts
- [core] Do not output any .map file (#6478) @oliviertassinari

## 1.0.0-alpha.9
###### *Apr 1, 2017*

#### Component Fixes / Enhancements

- [Tab] Add labelClassName property (#6436) @rogeliog
- [test] Fix absolute path in createShallow (444c60392550fe73bb3492ba0ebb63473c73162a) @oliviertassinari
- [material-ui-icons] Reinstate README and update scripts, update installation.md (#6448) @mbrookes
- [Input] Add test for focus() (#6461) @agamrafaeli
- [Input] Add test for componentDidMount() (#6462) @agamrafaeli
- [RadioGroup] Add tests for edge cases (#6409) @agamrafaeli
- [RadioGroup] Add missing teardown in test (8005d9d9b98ed58a041a9e49931fd88cb48687e2) @oliviertassinari
- [Ripple] Add a new test for the unmount logic (#6434) @oliviertassinari

#### Docs

- [docs] Add API menu and demo button (#6455) @mbrookes
- [docs] Link to the Collapse documentation (#6464) @JeremyIglehart
- [docs] Fix api.md indentation (#6468) @solkaz

#### Core

- [core] Upgrade the dev dependencies (#6435) @oliviertassinari
- [test] Takes the Menu as an example in the test documentation (d13607581dc2bf6c86e88721c2d177b8b8b2d004) @oliviertassinari
- [Layout] Extract requireProp to utils (#6473) @agamrafaeli


## 1.0.0-alpha.8
###### *Mar 25, 2017*

A big thanks to @agamrafaeli for increasing the test coverage by 4%.
We are now at 93.53%. That's pretty great.

#### Component Fixes / Enhancements

- [Chip] Add tests for handleKeyDown for Chip module (#6379) @agamrafaeli
- [Chip] Add tests for onRequestDelete (#6377) @agamrafaeli
- [Chip] Alignements issue on children, affecting safari only (#6336) @stunaz
- [Dialog] Test transition prop not a function (#6387) @agamrafaeli
- [DialogTitle] Test scenario where children are a string (#6386) @agamrafaeli
- [Drawer] Remove unreachable code in `getSlideDirection` (#6388) @agamrafaeli
- [FormControl] Add tests for internal functions (#6407) @agamrafaeli
- [FormGroup] Add spec (#6404) @agamrafaeli
- [IconButton] Add test for rendering Icon children (#6405) @agamrafaeli
- [Layout] Backport a fix at Doctolib for Chrome (#6376) @oliviertassinari
- [Layout] Revise default value for aligns-items (#6334) @stunaz
- [List] Making list meet Material Guidelines (#6367) @kybarg
- [style] Expose createStyleSheet to reduce boilerplate (#6378) @oliviertassinari
- [style] Expose the between breakpoints helper (#6382) @oliviertassinari
- [TableSortLabel] Add spec (#6408) @agamrafaeli
- [test] Expose the test helpers (#6383) @oliviertassinari
- [TouchRipple] Add tests for edge cases (#6411) @agamrafaeli

#### Docs

- [docs] Use material-ui-icons package (#6390) @mbrookes

#### Core

- [SvgIcons] Update build (#6375) @mbrookes

## 1.0.0-alpha.7
###### *Mar 12, 2017*

#### Component Fixes / Enhancements

- [Slide] Fix displaying when in=false at first (#6223) @ArcanisCz
- [Ripple] Improve the animation (#6248) @oliviertassinari
- [color] Add missing blueGrey color (#6255) @Shahrukh-Zindani
- [Table] Fix paddings according to guidelines (#6306) @kybarg
- [Table] Replace font icon to svg icon in sort label (#6321) @kybarg
- [Table] Add visual regression tests (#6325) @oliviertassinari
- [Button] Use faded text color for hover state (#6320) @mbrookes

#### Docs

- [docs] Add a Color section (#6254) @Shahrukh-Zindani
- [docs] Add information to typography (#6266) @Shahrukh-Zindani

#### Core

- [test] Server side render some element to be sure (#6328) @oliviertassinari
- [npm] Add correct extension (#6241) @okvic77
- [core] Rename travis to circle as we migrated (e7fba22bd19f82f5489cb52eaaaaff23f2f57939) @oliviertassinari
- [core] Fix docs:start command on Windows (#6307) @kybarg
- [core] Upgrade the npm dependencies (#6327) @oliviertassinari

## 1.0.0-alpha.6
###### *Feb 26, 2017*

#### Core

- [core] Fix component wrong propType (03f0fdc627951b5ddd3b28bd1a4cbdcee96f2a1c) @oliviertassinari

## 1.0.0-alpha.5
###### *Feb 26, 2017*

#### Core

- [core] Fix propTypes usage (9a220173a59e51108f7ee9d059a312f174113ac2) @oliviertassinari

## 1.0.0-alpha.4
###### *Feb 26, 2017*

#### Component Fixes / Enhancements

- [Button] Fix boxSizing when not rending a native button (#6224) @oliviertassinari
- [Divider] Fix negative margin causes overflow/scrollbars (#6139) @giuseppeg
- [LinearProgress] Add an accessibility property (#6155) @oliviertassinari
- [Text] Add more option to the align property (#6153) @oliviertassinari
- [icon-builder] Update to generate standalone package (#6104) @mbrookes
- [style] transitions theme API reworked (#6121) @ArcanisCz
- [svg-icons] Change target package name (#6184) @mbrookes
- [transitions] Fix an unknown property warning (#6157) @oliviertassinari
- [transitions] Fix allowing fraction numbers as delay/duration (#6221) @ArcanisCz

#### Docs

- [docs] Use webpack 2 & dll bundle (#6160) @nathanmarks
- [docs] Improve the user experience on mobile (#6154) @oliviertassinari
- [docs] Fix the Table examples on mobile (425d8ed47e0282b8c0409517c53e00ef61374b02) @oliviertassinari
- [docs] Add an API section (#6239) @oliviertassinari
- [docs] Normalize the container property (#6238) @oliviertassinari

#### Core

- [core] Fix typos in styles/transitions pointed out in issue (#6175) @Shahrukh-Zindani
- [core] Lightweight the build (#6152) @oliviertassinari
- [core] Add exports to index.js for inclusion in webpack bundle (#6144) @fkretzer
- [test] Integration of test suite to run on BrowserStack (#6236) @oliviertassinari
- [test] Bump vrtest version for exit code fix (1831aa76fe72e9b22a0b82f2a360f860ca89fdce) @nathanmarks

## 1.0.0-alpha.3
###### *Feb 12, 2017*

#### Component Fixes / Enhancements

- [Button] Make the node isRequired (#6095) @oliviertassinari
- [TextField] value propType (#6091) @mntbkr
- [TextField] Fix width issue (#6096) @oliviertassinari
- [TextField] Add an inputProps property (#6111) @oliviertassinari
- [Checkbox] Not selecting label text on quick clicks (#6097) @ArcanisCz
- [Tabs] Add a disabled property (#6112) @irfanhudda
- [Paper] Rename zDepth -> elevation everywhere (#6116) @ArcanisCz

#### Docs

- [docs] Add simple example in the Badge API (#6117) @stunaz
- [docs] Add a Drawer section (#6113) @ArcanisCz

#### Core

- [core] Simplify test suite and use vrtest for regressions (#6122) @nathanmarks
- [core] Prefix stylesheet names to prevent collisions (#6110) @oliviertassinari
- [core] Remove stringOrNumber propTypes (#6109) @oliviertassinari

## 1.0.0-alpha.2
###### *Feb 7, 2017*

One year from now, we were struggling with removing all the mixins from the project.
Now, it's about rewriting all our components.
We gonna try doing frequent alpha releases to keep some intertie. At least once per week would be good.
As always, we are keeping the [documentation](https://material-ui.com) up to date.

#### Component Fixes / Enhancements

- [Badge] Port the Badge Component (#6043) @stunaz
- [Layout] Warn about wrong usage of the item & container combination (#6040) @oliviertassinari
- [Layout] Explicit the box-sizing dependency (#6036) @oliviertassinari
- [Drawer] Open/close animation easing and timing (#6066) @ArcanisCz

#### Docs

- [docs] Add a composition section (#6049) @oliviertassinari
- [docs] Explain how to use the visual regression tests (#6050) @oliviertassinari
- [docs] Improve the Server Rendering section (#6070) @oliviertassinari

## 1.0.0-alpha.1
###### *Jan 28, 2017*

This is the first public alpha release. It's still work in progress.
People will be able to start giving us feedback with this release.
Please keep in mind that [semver](https://docs.npmjs.com/getting-started/semantic-versioning) won't be respected between pre-releases.
In other words, the API will change if we need to.

## 0.16.7
###### *Jan 15, 2017*

A big thanks to the 20 contributors who are making this release possible.

#### Component Fixes / Enhancements

- [DropDownMenu] Add keyboard accessibility (#5921) @caesay
- [EnhancedButton] Remove unnecessary hack, improving overall performance (#5868) @jampy
- [FloatingActionButton] Fix thin white border (#5881) @ludoviccyril
- [IconButton] Fix a onTouchStart error (#5833) @oliviertassinari
- [IconButton] Fix hoveredStyle prop override style prop (#5874) @MattCain
- [IconMenu] Fix React warning (#5843) @olee
- [Menu] Add onFocusIndexChange property (#5851) @gabrielmdeal
- [Menu] Fix support of any type of children (#5904) @oliviertassinari
- [style] Shorthand syntax for a color object (#5835) @frooeyzanny
- [style] Fix user-agent all with display flex (#5931) @oliviertassinari
- [Tab] Allow overriding button style on tabs (#5844) @rhagigi
- [Tabs] Fix a regression (#5891) @oliviertassinari
- [Table] Add an integration tests (#5845) @oliviertassinari
- [Table] Fix TableBody selectedRows state (#5829) @ovaldi
- [Table] Remove useless padding (#5932) @oliviertassinari
- [TableBody] Fix row selection re-render (#5905) @dchambers
- [test] Fix typo in the iOSHelpers.spec.js (#5837) @frooeyzanny

#### Docs

- [docs] Add payment components to Related projects (#5849) @lorensr
- [docs] Add showcase for "humorista.org" (#5859) @minas1
- [docs] Fix broken link (b7d9a373320b49f62e47f4e2e5ca4aa882265904) @oliviertassinari
- [docs] Fix spelling mistake in PropTypeDescription.js (#5883) @Jbarget
- [docs] Fix typo (#5889) @lucasbento
- [docs] It is exciting (#5831) @ratson
- [Tabs] Fix typo in initialSelectedIndex prop description (#5923) @neonray
- [withWidth] Fix typo in the withWidth.spec.js (#5836) @frooeyzanny

#### Core

- [test] Use simpler assert API (e017d365f45b07933e8b896f95d6d1455b666516) @oliviertassinari

## 0.16.6
###### *Dec 25, 2016*

We are releasing sooner than we use to for this **special day** :christmas_tree::gift:.
17 contributors are making that last release of the year possible.

2016 has been an exceptional year for Material-UI.
- We went from 40k to 180k [downloads](https://npm-stat.com/charts.html?package=material-ui&from=2014-12-24&to=2016-12-25) a month. :package:
- We went from 12k to 22k [stars](http://www.timqian.com/star-history/#mui-org/material-ui). :star:

That wouldn't have been possible without this awesome community.
**Thank you!**

But this's just the beginning, some [exciting stuff](https://github.com/mui-org/material-ui/blob/master/ROADMAP.md) is coming in 2017 :sparkles:.
You can preview a **very early** version of the `next` branch following [this link](https://material-ui-next.com).

#### Component Fixes / Enhancements

- [IconButton] Add a hoveredStyle property (#5755)
- [Menu] Add a dividerStyle property (#5734)
- [Menu][DropDownMenu][SelectField] Add menuItemStyle and menuItemSelectedStyle properties (#5389)
- [Popover] Fix ghost clicks in onRequestClose (#5749)
- [Popover] Fix bad positioning on IOS devices (#4638)
- [Popover] Revert the latest PR following a regression (#5797)
- [Stepper] Allow custom step connector (#5741)
- [Stepper] Fix content container's height expantion (#5733)
- [TimeDisplay] Inherit text color from theme (#5816)
- [TouchRipple] Fix issue #5626 (#5763)

#### Docs

- [AutoComplete] Add a controlled example (#5795)
- [Slider] Add onChange callback signatures to docs (#5760)
- [TextField] Add callback signatures to docs (#5804)
- [docs] Add link to babel-plugin-material-ui (#5754)
- [docs] Node is written mostly in C++, not in C (#5776)
- [docs] Remove redundant words (#5778)
- [docs] Add showcase item - Realty Advisors Elite (#5806)

#### Core

- [core] Add support for Webpack 2/Rollup tree shaking in `svg-icons` sub module (#5774)

## 0.16.5
###### *Dec 9, 2016*

This is another release improving the stability of `v0.16.x`.

#### Component Fixes / Enhancements

- [AutoComplete] Add an onClose callback property (#5655)
- [AutoComplete] Fix the controlled behavior (#5685)
- [DatePicker] Auto switch the view when a year is selected (#5700)
- [DropDownMenu] Add an onClose callback property (#5653)
- [DropDownMenu] Do not wrap below dropdown menu (#4755)
- [EnhancedButton] Fix an accessibility issue (#5657)
- [EnhancedButton] Only apply type when needed (#5728)
- [IconMenu] Add listStyle prop (#5630)
- [IconMenu] Fix controlled IconMenus to honor onRequestChange (#5704)
- [MenuItem] Add right padding when there is icon (#4762)
- [Popover] Add the missing zIndex (#5730)
- [List] Fix padding styles object (#5661)
- [SelectField] Scroll wheel event bubbling to parent container (#4154)
- [StepLabel] Address a box model issue (#5690)
- [SelectField] Add listStyle prop (#5631)
- [TextField] Fix errorStyle priority (#5654)
- [TextField] Add a floatingLabelShrinkStyle property (#5669)
- [autoprefixer] Fix a style issue with user agent all and display flex (#5668)
- [makeSelectable] Fix missing check for existence of onChange (#5589)

#### Docs

- [docs] Add a Q&A section around the next branch (#5718)
- [docs] Fix typo with sentence for AutoComplete (#5596)
- [docs] Fix origin documentation (#5676)
- [docs] Fix Linear Progress Prop Documentation (#5680)
- [docs] Fix a scroll issue on (iOS) (a12dca847af6833dbf671e48c736047d6909ec53)

#### Core

- [core] Apply 3 different fixes (#5695)

## 0.16.4
###### *Nov 17, 2016*

#### Component Fixes / Enhancements

- [npm] Rollback the react dependency path to `v15.0.0` (417913e41fbc3366c6997258263270c6d7465c1a)

## 0.16.3
###### *Nov 17, 2016*

This release is intended to solve an [issue](https://github.com/mui-org/material-ui/issues/5573) with `react-tap-event-plugin` following the release of React `v15.4.0`.

#### Component Fixes / Enhancements

- [ListItem] Fix hover on touch devices (#5566)
- [core] include `react-tap-event-plugin@^2.0.0` for `react@^15.4.0` (#5572)
- [core] Add support for Webpack 2/Rollup tree shaking (#5545)

#### Docs

- [docs] Upgrade React to v15.4.0 (#5575)

## 0.16.2
###### *Nov 13, 2016*

This is another release improving the stability of `v0.16.x` while we are working on get `next` out of the door.

#### Component Fixes / Enhancements

- [AutoComplete] Fire onUpdateInput when an item from the dropdown is selected (#5518)
- [AutoComplete] Fix Popover's style overriding popoverProps (#5516)
- [Card] Add closeIcon and openIcon for customizability (#5513)
- [FloatingActionButton] Fix regression with n children (#5468)
- [GridList] Add the support for cellHeight="auto" (#5452)
- [GridTitle] Add a titleStyle property (#5535)
- [IconMenu] Change IconMenu to conditionally merge button styles (#5496)
- [IE] Remove the unsupported initial property (#5539)
- [MenuItem][ListItem] Allow overriding hoverColor (#5502)
- [ListItem] Fix an issue with the controlled behavior (#5514)
- [ListItem] Clear hover state if componet get's disabled (#5528)
- [Popover] Fix support for invalid `anchorEl` (#5444)
- [RaisedButton] Fix hover on touch devices (#5536)
- [Stepper] Fix children count method (#5429)
- [Stepper] Add iconContainerStyle to StepButton and StepLabel (#5507)
- [Tabs] Fix Firefox height issue (bf25bc118523b359bba5a5540205174a1c2d9e27)
- [Table] Warning on rendering attempt of unsupported child (#5520)
- [TextField] Add ability to style label color when a value is present (#5490)
- [TextField] Fix wrong style behing applied to div elements (#5446)
- [TextField] Fix floatingLabelFocusStyle when floatingLabelFixed is true (#5487)
- [TextField] Remove the isClean logic (#5540)
- [TimePicker] Fix `autoOk` closing the dialog too early (#5511)
- [ToolbarGroup] Fix vertical alignment (#5515)
- [ToolbarTitle] Take font family from base theme (#5434)
- [Toggle] Fix label propTypes from `string` to `node` (#5474)

#### Core

- [npm] Upgrade the dependencies (#5466, #5537)

#### Docs

- [docs] Add one more resource around the style migration (0d375d6271a2c65e6e608dde28ee4ca55defd81b)
- [docs] Add a note regarding other properties (#5491)
- [docs] Add redux-form in the Related projects section (3e10f203bc3a7d79f94011586c134b6e17a69016)
- [docs] Add CReMa in the Related projects section (#5431)


## 0.16.1
###### *Oct 18, 2016*

This is a small release improving the stability of `v0.16.x`.

#### Component Fixes / Enhancements

- [ClickAwayListener] Improve the propTypes definition (2d99b2d66f0a895389f61e866c8840abebcf2b72)
- [DropDownMenu] Fix usage of null child (#5402)
- [FloatingActionButton] Set touch flag in handleTouchEnd (#5077)
- [FloatingActionButton] Fix overriding the style property on the children (#5246)
- [IconMenu] Updating error message for IconButton (#5361)
- [IconMenu] Makes the warning message more explicit (#5395)
- [Menu] Fix the key theme used for the selectedTextColor (#5379)
- [MenuItem] Add min-height to MenuItem to allow null options in SelectItem (11639b02e62cc60861582eb9c1516e1fe46d5ccb)
- [Popover] Making sure Popover has correct position (#4839)
- [Popover] Add missing animated=false (#5374)
- [RadioButtonGroup] Modifying `selected` initial value check to account for falsy value (#5342)
- [RaisedButton] Add a overlayStyle property (c16147d9eb81a69a82f88d21fb0d7a356b95e2af)
- [RefreshIndicator] Fix Unknown props react warning (#5356)
- [Tabs] Add tabTemplateStyle prop to Tabs (#5359)
- [TableFooter] Render the children independently of adjustForCheckbox (#5406)
- [TableRowColumn] Revert Tooltip visible with TableRowColumn (#5378)
- [TextField] Fix a failing test with the controlled behavior (#5351)
- [TextField] Fix leaking appearance property on a div (#5412)
- [withWidth] Fix the SSR reconciliation (#5405)

#### Core

- [GitHub] Improve ISSUE_TEMPLATE to ask for a running snippet (#5388)
- [npm] Upgrade the dependencies (#5404)

#### Docs

- [docs] Add LireLactu to the showcase (#5336)
- [docs] Document the muiThemeable HOC (#5363)
- [docs] Fix non-compiling example code on Themes page (#5344)


## 0.16.0
###### *Oct 3, 2016*

This release contains a ton of bug fixes and small improvements :boom:.

We have **shifted goals** for `v0.16.0`.
Across a number of issues over the last ~5 months we have been telling people that certain improvements are coming in `v0.16.0` ranging from performance to component API issues and more.
Those improvements are coming with the `next` branch :sparkles:.
We are switching in goal so we can release changes more **often**.

Regarding going forward, this is likely to be the last `minor` release using the **inline-style** approach.
We are migrating all the components to a **CSS-in-JS** approach on the `next` branch.

For more details, you can have a look a the [next milestone](https://github.com/mui-org/material-ui/milestone/14) as well as the [next project](https://github.com/mui-org/material-ui/projects/1)

:warning: New features based on the `master` branch (inline-style) have low priority and will most likely not be reviewed nor merged.

#### Component Fixes / Enhancements

- [Card] Fix unused property subtitleColor (#5314)

#### Core

- [Core] Use lodash.merge/throttle for faster require() (#5308)

#### Docs

- [docs] Add a single line example for GridLists (#5313)
- [docs] Add react-dnd (7e1d9d3d1d61a3ee8e6dbf57cd2261754a3285f3)
- [docs] Add Casalova to the showcase (7c0df3be32813ddb003cd47b6529431f3cd41679)

## 0.16.0-rc2
###### *Sep 24, 2016*

##### Breaking Changes

- [TimePicker] Remove the call to onDismiss when already calling onAccept (#5213)

#### Component Fixes / Enhancements

- [AppBar] Fix onTouchTap handler (#5245)
- [AutoComplete] Add popoverProps to pass to Popover (#5064)
- [DatePicker] Improve the RTL support (#5155)
- [DatePicker] Improve the i18n support (#5187)
- [IconButton] Remove dead code (#5226)
- [Popover] Fix a callback leak (#5158)
- [RaisedButton] Add a buttonStyle property (#5196)
- [Switch] Add thumbSwitchedStyle and trackSwitchedStyle (#5106)
- [Snackbar] Fix the element covering up 100% width of the screen (#5113)
- [Snackbar] Add a contentStyle property (#5205)
- [Tabs] Fix an edge case where children and value props change (#4635)
- [Tabs] Fix onChange bubbling (#5219)
- [TimePicker] Fix a conflict with box-sizing reset (5529138)
- [withWidth] Compute the width as soon as possible (#5154)

#### Docs

- [AppBar] Add a composition example (#5248)
- [RaisedButton] Update file upload example (#5159)
- [docs] Add material-ui-chip-input to related projects (#5172)
- [docs] Add material-auto-rotating-carousel to related projects (#5244)
- [docs] Explicit the prerequisites section to required knowledge (#5203)
- [docs] Update the server-rendering section (#5206)

#### Core

- [core] Add babel-runtime to the release (#5221)
- [core] Use the ^15.0.0 as a dependency for React (#5207)
- [npm] Upgrade the dependencies (#5161)

## 0.16.0-rc1
###### *Sep 8, 2016*

##### Breaking Changes
- [Badge] Swapped primary and accent colors (#4449)
- [CircularProgress] The API has become more flexible and straightforward. `size` attribute now means the outer diameter in pixels. Line thickness is variable and should be defined via the `thickness` attribute. Default margins are eliminated. If you'd like to upgrade your existing app without changing the actual sizes of your `CircularProgress` components, here are the formulas:
```js
newSize = 59.5 * oldSize;
thickness = 3.5 * oldSize;
margin = (oldSize < 0.71) ?
  ((50 - 59.5 * oldSize) / 2) :
  (5.25 * oldSize);
```
Examples:
```
// Before:
<CircularProgress />
<CircularProgress size={2} />

// After:
<CircularProgress size={59.5} style={{margin: 5.25}} /> // Thickness is 3.5 by default
<CircularProgress size={119} thickness={7} style={{margin: 10.5}} />
```
(#4705)
- [core] Wrap the `propTypes` definitions so they can be removed in production (#4872)
- [core] Remove the deprecated code (#4987)
- [List] Rename MakeSelectable to makeSelectable (#5025)

#### Component Fixes / Enhancements

- [BottomNavigation] Fix SVG icon positioning (#4982)
- [Buttons] Reset hover state when disabled prop is changed (#4951)
- [CardHeader] Fixes warning: Unknown props titleColor (0e787c7)
- [Checkbox] Tweak the transition to allow different shapes (#5016)
- [DatePicker] Improve dark theme support (#4943)
- [DatePicker] Changes opacity of disabled day-buttons (#4994)
- [EnhancedTextarea] Guard for if scrollHeight is not present (#5015)
- [FloatingActionButton] Reset hover state when disabled prop is changed (#4951)
- [IconMenu] Warn when not providing an IconButton to iconButtonElement (#4990)
- [NestedList] Prevent rendering the children when the nested list is hidden (#5024)
- [Popover] Prevent creating multiple timeouts when popover is closing (#5010)
- [ListItem] Fix primaryTogglesNestedList not working with checkbox (#4988)
- [RaisedButton] Fixes warning: Unknown props on <button> (#5067)
- [RefreshIndicator] Passing other props to the root element (#5054)
- [RTL] Add a new directionInvariant property (#5026)
- [TableRowColumn] Tooltip visible with TableRowColumn (#5014)
- [TextField] Better support for type=search (#4973)

#### Docs

- [docs] Fix 404 links (#4998)
- [examples] Move to own repositories (#4475)
- [showcase] Add some new projects (#4978, #5119)

#### Core

- [Slider] Clean up the implementation (#5036)
- [test] Reduce the noise when running the test suite (ea2538e)

## 0.15.4
###### *Aug 11, 2016*

#### Component Fixes / Enhancements
- [BottomNavigation] Initial implementation (#4846)
- [DropDownMenu] Revert the commit causing a regression in 0.15.3 (#f76302e)
- [Snackbar] Add the material fontFamily (#4892)
- [ListItem] New property open to toggle nested list (#4850)
- [Slider] Fix an issue where not updating when max prop changes (#4895)
- [Slider] Fix more warnings introduced by React v15.3.0 (#4869)

#### Docs
- [js] Explain the ECMAScript `stage-1` dependencies of the examples (#4877)

## 0.15.3
###### *Jul 31, 2016*

This release is mostly about bug fixes. All the new warnings introduced by React
v15.2.1 and v15.3.0 should be addressed in this version.

##### Breaking Changes

- Remove a workaround regarding the context propagation as it was fixed in the React Core.
Upgrade to React v15.2.1 if you are affected. (#4729)

#### Component Fixes / Enhancements
- [AutoComplete] Add a textFieldStyle property (#4853)
- [AutoComplete] Call onNewRequest once the animation is done (#4817)
- [Card] Fix bottom padding (#4820)
- [Chip] Fix invalid `labelColor` being passed (#4766)
- [DropDownMenu] Display the first item in case there's no one with the corresponding value (#4822)
- [FlatButton] Merge styles prop for FontIcon node (#4754)
- [GridList] Fix RTL alignment (#4833)
- [List] Prefix the style properties (#1cb0617)
- [ListItem] Trigger onNestedListToggle callback after state update (#4743)
- [ListItem] Fix incorrect nestedLevel (#4744)
- [Menu] TypeError: key is undefined (#4734)
- [MenuItem] Add cursor pointer back to the menu items (#4715)
- [Popover] Forward the animation property to this component (#4702)
- [RadioButtonGroup] Fix propTypes to accept anything (#4807)
- [RaisedButton] Fix the icon style override (#4f2fd22)
- [React] Fix more invalid props warning (#4667, #4675, #4685, #4725)
- [Snackbar] Change the action's PropType to node (#4716)
- [TextField] False should be a valid value (#4728)

#### Core
- [dependencies] Update to the latest release version (#4669)
- [eslint] Find new rules with ease (#4521)
- [react] Fix the warnings of the latest release v15.3.0 (#4856)

#### Docs
- [ROADMAP] Remove old addressed issues (#4745)
- [ROADMAP] Update to what the core team is working on (#4829)
- [docs] Replaces images on Card page with hosted images (#4748)
- [showcase] Add https://www.spouti.com (#4806)

## 0.15.2
###### *Jul 7, 2016*

During the release of 0.15.1 something went teribly wrong :sweat_smile: and some
commits were left out even though they were mentioned in the changelog. This release
includes the missing commits and some extra.

##### Deperecations
- [Buttons] Deprecate linkButton property (#4197)

##### General
- [React] Upgrade React to `v15.2.0` (#4603, #4605, #4607)
- [Docs] Don't document standard DOM events (#4433)
- [Form Components] Set `cursor:not-allowed` style when disabled (#4170)
- [Styles] Upgrade the inline-style-prefixer dependency to v2 (#4613)
- [Styles] Check for nulls for RTL (#4496)

##### Browser support

Our support for IE and Safari improved in this release.
Thanks @vizath, @hhaida, @nathanmarks and @aahan96 for their effort.

#### Component Fixes / Enhancements
- [AppBar] Improve props checking to be more resilient (#4557)
- [AutoComplete] Use the right dataSource key (#4642)
- [Badge] Fixed incorrect color usage (primary/accent were swapped) (#4449)
- [Button] Never allow a disabled button to be in a hovered state (#4626)
- [Button] Improve the propType definition for the label (#4618)
- [Chip] Add to the index (#4570)
- [ClickAwayListener] Add better support for IE11 (#4537)
- [DatePicker] Expose dialog container style (#4355)
- [DatePicker] Fix year overflow (#4381)
- [DropDownMenu] Remove Synthetic Event from pooling when used asynchronously (#4564)
- [EnhancedButton] Fix href style (#4457)
- [FlatButton] Add a condition to check for zero in the label warning (#4618)
- [LinearProgress] Fix calculating of getRelativeValue (#4624)
- [ListItem] Fix error with props access in state assignment for ie9/10 (#4596)
- [ListItem] Make the dark theme follow more closely the material spec (#4530)
- [MenuItem] Allow styles on lefticon in non-desktop mode (#4474)
- [RadioButton] Changed the value type to any (#4510)
- [RadioButtonGroup] Fix error with props access in state assignment for ie9/10 (#4596)
- [RaisedButton] Fix the `fullWidth` regression (#4479)
- [RenderToLayer] Fix an internal issue with React (#4548)
- [SelectField] Make the maxHeight prop to pass down to DropDownMenu (#4645)
- [Slider] Add a sliderStyle property (#4617)
- [Slider] Add support for vertical/reversible sliders (#4571)
- [Stepper] Fix transition bug in safari (#4616)
- [SvgIcon] Add support for color attribute (#4487)
- [SvgIcon] Add themeable color (#4621)
- [SvgIcon] Remove unused style assignment (#4486)
- [TextField] Keep spreading properties when children is set (#4478)
- [TextField] Fix multi-line overflow (#4634)

## 0.15.1
###### *Jun 16, 2016*

##### Breaking Changes
- [Avatar] Now uses `img` instead of `div` (#4365)
- [DatePicker] `className` prop is now set on the root element instead of being passed down (#4250)
- [Drawer] Changed muiTheme key name from navDrawer to drawer (#4198)
- [SelectField] Move {...other} spread props from DropDownMenu to Textfield as part of (#4392)

##### New Component
- [Chip] First implementation (#3870)

##### General
- [Examples] Simplify the examples (#4262)
- [Core] Upgrade EventListener dependency (#4162)
- [Core] Upgrade some npm dependencies (#4306)
- [Core] Remove react-addons-update dependency (#3946)
- [Core] Move to the normal lodash (#4380)
- [Docs] Use `copy-webpack-plugin` for dev (#4201)
- [Icon Builder] Add muiName to generated SvgIcons (#4188, #4206)
- [Icon Builder] Fix SvgIcon require path to icons generated with --mui-require absolute (#4204)
- [Themes] Fix MuiThemeProvider default theme (#4229)
- [withWidth] Accept width optional parameter (#4416)
- [eslint] Add a mocha plugin to enforce good practices (#4424)

#### Component Fixes / Enhancements
- [AppBar] Add `iconStyleLeft` prop (#4266)
- [AppBar] Fix a styling regression (#4471)
- [AutoComplete] Add text and value field keys for objects list dataSource (#4111)
- [AutoComplete] Fix filter property leaking (#4209)
- [AutoComplete] Fix first item selection on keyboard focus (#4193)
- [AutoComplete] Use sublime text like search instead of Levenshtein Distance for fuzzy search (#4164)
- [Avatar] Fix a layout regression (#4409)
- [Avatar] Remove the border (#4365)
- [Button] Save some bytes on the production build (#4346)
- [DatePicker] Added className prop to DatePicker (#4250)
- [DatePicker] Fix layout when used with border-box (#4454)
- [DatePicker] Fix the issue about onDismiss function will fire by handleTouchTapOk (#4367)
- [DatePicker] Fix `weekTitleDayStyle` (#4464)
- [Drawer] Fix muiTheme key name (#4198)
- [DropDownMenu] Add an animated property (#4442)
- [DropDownMenu] Add check if there is onChange prop before calling it (#4328)
- [EnhancedButton] Fix not setting focus when keyboardFocused prop set (#4122)
- [FlatButton] Fix Icon color prop issue (#4160)
- [FloatingActionButton] Fix SvgIcon fill color (#4311)
- [FontIcon] Prevent parent components from overriding icon's `color` property (#4025)
- [IconMenu] Add an animated property (#4442)
- [ListItem] Fix theme not propagating on update (#4372)
- [Menu] Add basic hotkey-focusing feature (#4189)
- [Menu] Fix theme not propagating on update (#4372)
- [MenuItem] Fix theme not propagating on update (#4372)
- [Picker] Disable userSelect on TimePicker and DatePicker (#4176)
- [Pickers] Add some test regarding the expect value property (#4347)
- [Popover] Fix typo from innerWith to innerWidth (#4332)
- [RaisedButton] Don't override SvgIcon color prop (#3746)
- [RaisedButton] Respect theme fontSize (#3988)
- [RenderToLayer] Cleanup (#4423)
- [SelectField] Add callback signatures to docs and improve other props (#3924)
- [SelectField] Add support for `floatingLabelFixed` prop (#4392)
- [SelectField] Fix errorText position when no value selected (#4394)
- [Snackbar] Add a new test and fix consecutive updates leading to displaying old message (#4329)
- [Stepper] Add more tests and fix an issue with `StepButton` event handlers (#4203)
- [Stepper] Fix vertical stepper on mobile (#4299)
- [Tabs] Fixes tabindex (#4357)
- [TextField] Fix `floatingLabelText` intercepting click events (#4418)
- [Timepicker] Add explicit box-sizing to Clock component (#4386)
- [TimePicker] Expose two TimePickerDialog style props (#4356)
- [TimePicker] Fix auto reset of time on window resize (#4251)
- [TimePicker] Remove some dead code (#4289)

##### Deperecations
- [SelectField] Deprecate selectFieldRoot prop and replace with menuStyle (#4394)

## 0.15.0
###### *May 5, 2016*

Please read through the alpha and beta releases of 0.15.0 too as their changes are not listed here.

##### General
- [Core] Add a `withWidth` HOC (#4126)
- [Core] Use named imports for createClass, Component & PropTypes (#4058)
- [Core] Update dependencies and remove a couple of unneeded (#4107)
- [eslint] Use the js format instead of the yaml one (#4074)
- [codemod] Improve the path migration (#4069)
- [codemod] Add a babel transpilation for npm (#4115)
- [Tests] Refactor karma tests, add JSDOM for node tests and improve coverage (#4102)
- [Tests] Add basic README for test setup (#4106)
- [colorManipulator] Prevent illegal color values (#3989)
- Added the following eslint rules:
  1. Enforce `jsx-first-prop-new-line` (#4112)
  1. Enforce `react/prefer-es6-class` (#4126)

#### Component Fixes / Enhancements
- [Avatar] Fix icon size issue for non-default Avatar size (#4148)
- [Buttons] Address various browser compatibility issues (#4108)
- [Buttons] Fixed alignment related regressions (#4130)
- [Card] Add `containerStyle` prop (#4085)
- [CircularProgress] Fix for Android (#4026)
- [DatePicker] Add support for built-in en-US locale (#4161)
- [Datepicker] Redesign datepicker as per material spec (#3739)
- [Dialog] Stop mixing `padding` and `paddingTop` (#4082)
- [EnhancedButton] Fix keyboard focus jumping (#4127)
- [Slider] Fix Slider div style (#4087)
- [TextField] Add `floatingLabelFocusStyle` property (#4043)

##### Deprecations
- [styleResizable] This mixin has been deprecated in favor of `withWidth` HOC (#4126)

## 0.15.0-beta.2
###### *Apr 21, 2016*

##### General
- [.gitignore] Ignore `jsconfig.json` - VSCode config file (#4011)
- [Docs] Update usage docs with muiTheme instructions (#4034)
- [Docs] Add beta installation details to the README (#4048)
- [Examples] Update import statements (#3992)

#### Component Fixes / Enhancements
- [AutoComplete] Change `error`, `hint`, `floatingLabel` property validators to `PropTypes.node` (#4019)
- [Dialog] Add border to title and actions when content is scrollable (#4001)
- [Dialog] Add support for the Alert (#4022)
- [Dialog] Merge title style when title it a node (#4033)
- [ListItem] Fix flexbox shrinking [issue](#4016) (#4044)
- [Menu] Fix regression that caused nested menus to be unreachable (#3947)
- [RaisedButton] fix hover overlay for icon only buttons, fixes #3815 (#4035)
- [RefreshIndicator] Fix timer leaks (#3986)
- [SelectField] Fix server side rendering (#4004)
- [Tab] Fix the justify content when there is only one child (#4023)

##### Deprecations
- [List] Deprecate the `valueLink` property (#3936)

## 0.15.0-beta.1
###### *Apr 13, 2016*

#### React 15 compatibility :tada: :tada:

This release also ensures compatibility with React 15. You should update to
this version if you need it.

#### Simplify import statements :tada:

This release changes how components are imported. You will need to update every
import statement, Like:

```js
import RaisedButton from 'material-ui/lib/raised-button';
import Tabs from 'material-ui/tabs/tabs';
import Tab from 'material-ui/tabs/tab';
```

to:

```js
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
```

The exact import statements for each component can be found in their respective
documentation page.

Have a ton of imports? almost had a heart attack? worry not, we also made a tool
to ease your pain. checkout the
[readme](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod/README.md).

##### Breaking Changes
- [Core] Improve import path for published lib (#3921)
- [Core] PascalCase component names, reorganise directory structure (#3749)
- [Core] Remove default theme handling from components (#3820)

As of now you will need to provide theme on context, see:
http://www.material-ui.com/#/customization/themes

- [Core] Removed redundant default export from the main library `index.js`.

You will probably need to turn

```js
import Mui from 'material-ui';
```
into
```js
import * as Mui from 'material-ui';
```

Although we discourage you to use this library like that.

- [LeftNav] Rename to Drawer (#3799)
- [GridList] Replace `rootClass` with `containerElement` (#3783) (`rootClass` was broken before this change)
- [Core] These changes are for internal modules and will affect you only if they were directly required in your code
  1. Rename utils/children.js (#3779)
  1. Remove unused utils/keyLine.js (#3837)
  1. Remove cssEvent util (#3836)
  1. Remove utils/shallowEqual.js and replace with recompose (#3835)
  1. Move DateTime utils to component directories (#3834)

##### General
- [Core] Update to React v15 (#3941) :tada: :tada:
- [Core] Remove dependency on lodash.flowright (#3955)
- [Core] update components to es6 classes (#3843) :tada: :tada:
- [Core] Add a `material-ui-codemod` package (#3782)
- [Core] Update export syntax, move unit tests, update test dependencies (#3785)
- [Core] Use .js extension instead of .jsx (#3765)
- [Themes] colorManipulator cleanup (#3966)
- [SvgIcon] Add the new Material Icons (#3747)
- [Docs] Add example for slider showing how to access value (#3892)
- [Docs] Document callback signatures ( Thanks to @theosherry )
  - [IconMenu](#3732)
  - [LeftNav](#3743)
  - [List](#3748)
  - [ListItem](#3748)
  - [Popover](#3796)
  - [RadioButton](#3797)
  - [Menu](#3821)
  - [MenuItem](#3821)
  - [RaisedButton](#3839)
- Added the following eslint rules:
  1. Enforce `jsx-handler-names` (#3408)
  1. Enforce `spaced-comment` (#3910)

#### Component Fixes / Enhancements
- [AutoComplete] Add `onKeyDown` property (#3853)
- [AutoComplete] Fix the regressions (#3858)
- [Avatar] Use semi-transparent border (#3859)
- [DatePicker] ok/cancel labels in date pickers should be of PropTypes.node (#3869)
- [DropDownMenu] Fix support for autoWidth and custom width (#3823)
- [DropDownMenu] Slightly improve performance (#3707)
- [FloatingActionButton] fixed an error when element gets focus via tab (#3885)
- [IconButton] Fix tooltip on hover (#3878)
- [IconMenu] Removed props.ref call (#3913)
- [LinearProgress] Prevent instances from sharing state (#3763)
- [ListItem] Change color of rightIcon from `grey400` to `grey600` (#3938)
- [ListItem] Fix duplicate prepareStyles with primaryText element (#3174)
- [ListItem] Use the new icons to follow the material spec (#3899)
- [MenuItem] Revert flex props from #3597, fixes #3845, reopens #3531 (#3928)
- [Overlay] Split out AutoLockScrolling (#3690)
- [Popover] Fix rendering for nested Menus (#3806)
- [RaisedButton] Fix for Uncaught `TypeError` when tabbing onto button (#3897)
- [Stepper] Refactor Stepper (#3903)
- [Tab] Change the ripple color to follow the spec (#3857)
- [Tab] Fix centering for label with SvgIcon (#3697)
- [TableHeaderColumn] Remove props.key calls (#3918)
- [TableRowColumn] Remove props.key calls (#3918)
- [Tabs] Better type checking on Tab children (#3750)
- [TextField] Fix incorrect state in getStyles() (#3972)
- [TimePicker] Add disabled property with example (#3778)
- [TimePicker] Fix label for 12AM as per material spec (#3781)
- [TimePicker] ok/cancel labels in time pickers should be of PropTypes.node (#3869)

## 0.15.0-alpha.2
###### *Mar 18, 2016*

##### Breaking Changes
- [Core] if you used Material-UI from npm in CommonJS environment,
you need to add `.default` to your requires (#3648):

```diff
- const MUI = require('material-ui');
+ const MUI = require('material-ui').default;
```

If you used ES modules, you’re already all good:
```js
import MUI from 'material-ui'; // no changes here :D
```

- [Core] Remove uniqueId utils (#3538)
- [Styles] RaisedButton, FlatButton, and FloatingActionButton now properly use primary/secondary colors (#3513)
- [Menu] Remove Paper (#3559)
- [List] Remove Paper (#3612)
- [TextField] Remove `valueLink` (#3699)

##### New Component
- [Stepper](#3132) ( Big Thanks to @namKolo )

##### General
- [Core] Remove gulp in favour of npm scripts for linting (#3626)
- [Core] Update `package.json` to prevent building the `lib` after install (#3632)
- [Docs] Hide internal properties of `MenuItem`, `Table` and `Tabs` in docs (#3589)
- [Docs] Document `Card` subcomponent properties (#3621)
- [Docs] Add return types (#3542)
- [Docs] Add support for multi-line function (#3570)
- [Docs] Document callback signatures ( Thanks to @theosherry )
  - [AutoComplete](#3550)
  - [Card](#3552)
  - [Checkbox](#3607)
  - [DatePicker](#3652)
  - [DropDownMenu](#3615)
  - [FlatButton](#3676)
  - [FloatingActionButton](#3683)
  - [FontIcon](#3693)
  - [IconButton](#3709)
- [Tests] Add mocha grep passthrough for browser tests (#3520)
- [Tests] Add `EnhancedButton` unit test and tweak karma config (#3512)
- [Tests] Add `FlatButton` unit test (#3541)
- [Tests] Add `Divider` unit test (#3527)
- [Tests] Add `Paper` unit tests (#3528)
- [Tests] Add `Slider` unit tests (#3688)
- [IconBuilder] Move to packages directory (#3680)
- Added the following eslint rules:
  1. Enforce `operator-linebreak` (#3516)
  1. Enforce `no-multiple-empty-lines` (#3516)
  1. Enforce `@ignore` before comment (#3611)

#### Component Fixes / Enhancements
- [AppBar] Fix the title height variation (#3509)
- [AutoComplete] Add key support for `dataSource` (#3662)
- [AutoComplete] Fix browser compatibility (#3581)
- [AutoComplete] Fix `openOnFocus` and item click (#3669)
- [AutoComplete] Proxy focus and blur calls (#3551)
- [AutoComplete] Set `canAutoPosition` to `false` for `Popover` (#3620)
- [CardHeader] Handle wide titles, allow them to wrap (#3503)
- [CardHeader] Remove `title` from injected node attributes (to avoid native tooltip) (#3534)
- [DatePicker] Add a check to fetch current system date (#3656)
- [DatePicker] Fix cursor pointer of the header (#3598)
- [DatePicker] Fix selectYear range (#3496)
- [DatePicker] Use popover for the inline mode (#3532)
- [EnhancedButton] fix `onKeyboardFocus` being called with nullified event object (#3616)
- [EnhancedSwitch] Remove the uniqueId as it unused (#3592)
- [FlatButton] Fix icon alignment when no label provided (#3529)
- [FlatButton] Fix icon styling when no label provided (#3502)
- [FlatButton] Fix the text align issue (#3727)
- [IconButton] Expose `disableTouchRipple` (#3659)
- [IconMenu] Add missing default iconStyle (#3514)
- [IconMenu] Set container as `anchorEl` when using prop 'open' (#3666)
- [ListItem] Add stopPropagation in touch ripple to avoid touch event bubbling (#3593)
- [MenuItem] Add flex property (#3597)
- [Popover] Avoid nested `<noscript/>` (#3647)
- [RaisedButton] Account for `backgroundColor` prop which was previously ignored (#3515)
- [RaisedButton] Fix styling issues (#3479)
- [RaisedButton] Fix the text align issue (#3727)
- [Slider] Add keyboard support (#3237)
- [Snackbar] Make on request close optional (#3560)
- [Tab] Fix `style` prop being ignored (#3608)
- [TableRowColumn] Propagate events (#3492)
- [TextField] Add `floatingLabelFixed` property (#3646)
- [TextField] Add `shouldComponentUpdate` function (#3673)
- [TextField] Add the ability to call select (#3287)
- [TextField] Fix `defaultValue` overlays `floatingLabelText` on mount (#3450)
- [TextField] Standardize onChange callback (#3699)
- [TimePicker] Reinstate #3030 - Add support for custom button labels (#3148)
- [TimePicker] Remove a useless div element (#3591)
- [Toolbar] Fix existing design flaws by using flex (#3548)

##### Deprecations
- [DatePicker] Deprecate `wordings` with `cancelLabel` and `okLabel` (#3412)

## 0.15.0-alpha.1
###### *Feb 27, 2016*

This release includes huge improvements to the implementation
of components and utility modules. The most important improvement
is the removal of mixins from the library, thanks to the
[great efforts](https://github.com/mui-org/material-ui/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+author%3Anewoga+style-propable)
of @newoga :+1:

There are also improvements to the unit testing infrastructure. We own this
great improvement to @nathanmarks, thanks a lot :+1:.

Please note that `raw-themes` are deprecated with no warning! they will be removed
from the code with the 0.16.0 release.

##### Breaking Changes
- [Cleanup] Remove the deprecated API of `0.14.x`. (#3108)
- [Styles] Removed all `getStyles` functions from the components (#3351)
- [Core] Remove the `window-listenable` mixin (#3334)
- [Core] Remove `context-pure` mixin (#3331)
- [Core] Remove `click-awayable` mixin (#3360)
- [Core] Utilize keycode library and remove `key-code` util (#3371)
- [FloatingActionButton] `className` is now set on the root element (#2310)
- [RaisedButton] `className` is now set on the root element (#3122)
- [LeftNav] `className` and `style` are now set on the root element (#3322)
- [Colors] Removed default export in favor of singular exports (#2825) <br>
**Note** This can be temporarily worked around by changing <br>
`import Colors from 'material-ui/lib/styles/colors';` <br> to <br>
`import * as Colors from 'material-ui/lib/styles/colors';`.
- [DatePicker] Standardize for ISO8601. (#3417)

##### New Component
- [Subheader](#3033) (Thanks to @pradel)

##### General
- [Tests] Updates to test setup and additional testing option for unit tests (#3405)
- [Tests] Add support for codecov (#3421)
- [Tests] Badge unit tests (#3427) (Thanks to @pradel)
- [Tests] AppBar unit tests (#3487) (Thanks to @pradel)
- [Tests] GridList unit tests (#3488) (Thanks to @pradel)
- [Tests] SvgIcon unit tests (#3489) (Thanks to @pradel)
- [Tests] FontIcon unit tests (#3490) (Thanks to @pradel)
- [Theme] Apply overall themeing improvements (#3267, #3316, #3340, #3399)
- [Style] Fix the prefixer tool regression (#3136)
- [Style] Make some unthemeable elements themeable (#3269) (Thanks to @pdf)
- [Style] Fix tap highlight color (#3429)
- [Core] Replace merge implementation in utils/styles with Object.assign (#3124)
- [Core] Remove dependency on utils/styles from components (#3169)
- [Core] Remove style-propable mixin from components (#2852)
- [Core] Remove `window-listenable` mixin from components (#3305) (Thanks to @newoga)
- [Core] Typography moved inside muitheme (#3301)
- [Core] Update lodash version to 4.1.0 (#3324)
- [Core] Migrate color to muiTheme (#3314)
- [Core] Remove usage of `isMounted()` (#3437)
- [Docs] Add page title (#3246)
- [Docs] DatePicker - Add disabled dates example (#3167)
- [Docs] Upgrade dependencies (#3343)
- [Docs] Enable GPU rasterization (#3451)
- [Docs] Add versions to docs site (#3383)
- [eslint] Upgrade to v2 (#3390)
- Added the following eslint rules:
  1. Enforce `arrow-parens` (#3207)
  1. Enforce `prefer-template` (#3208, #3242)
  1. Enforce `no-unneeded-ternary` (#3320)
  1. Enforce `prefer-const` (#3315)
  1. Enforce `jsx-space-before-closing` (#3397)
  1. Enforce `id-blacklist` and blacklist `e` (#3398)
  1. Enforce `padded-blocks: never` (#3493)

#### Component Fixes / Enhancements
- [AutoComplete] Added `maxSearchResults` property (#3262)
- [AutoComplete] Apply the style property only on the root component (#3243)
- [AutoComplete] Apply various improvement (#3214) (Thanks to @oliviertassinari)
- [Autocomplete] Disable browser default autocomplete popup (#3253)
- [AutoComplete] Fix the focus / blur issue (#3356) (Thanks to @oliviertassinari)
- [Card] Removed hidden overflow (#3447)
- [Card] Support for controlled expansion (#3258) (Thanks to @cgestes)
- [CardActions] Allow to accept false as child (#3215)
- [Checkbox] Disabled style error fix (#3432)
- [DatePicker] Default to ISO-8601 DateTimeFormat & `firstDayOfWeek` (#3417)
- [Dialog] Fix overflow (#3460)
- [DropDownMenu] Expose Menu listStyle property (#3294)
- [DropDownMenu] Fix `openImmediately` regression (#3384)
- [DropDownMenu] Safari select-field fix (#3175)
- [EnhancedButton] Fix enhanced buttons containing a link instead of a button (#3303)
- [EnhancedSwitch] Added inputStyle prop to enhanced switch (#1693)
- [EnhancedTextArea] Provide various style fixes (#3277)
- [FlatBotton] Fix alignment between text and icons (#3380)
- [FloatingActionButton] Expose Paper zDepth (#3387)
- [IconButton] Fixed tooltip for disabled component (#3458)
- [IconButton] Fixed tooltip ripple size for IE (#3016)
- [IconMenu] Document `multiple` property of Menu (#3223)
- [IconMenu] Enable `useLayerForClickAway` (#3400)
- [IconMenu] Support MenuItem nested menuItems (#3265)
- [InkBar] remove `&nbsp;` (#3283)
- [LeftNav] Add a configurable zDepth (#3495)
- [LeftNav] Add iOS momentum scroll (#2946)
- [List] Fix issue with styling on list related components (#3278)
- [ListItem] Fix hardcoded `secondaryTextColor` (#3288)
- [Menu] Fix `_isChildSelected` child not recognising first child (#3165)
- [Menu] Fix a regression that would apply the select style to all the MenuItems (#3244)
- [Menu] Safari select-field fix (#3175)
- [Popover] Handle the touch event on touch enabled devices (#3389)
- [RadioButton] Allow customising icons (#3285)
- [RaisedButton] Customizable ripple effect style (#3368)
- [RaisedButton] Fix alignment between text and icons (#3366)
- [Slider] Remove style-propable mixin and react-dom (#3332) (Thanks to @felipethome)
- [SvgIcon] Fix behavior for `onMouseEnter` and `onMouseLeave` (#3481)
- [SvgIcon] Use stateless functional component instead of `React.createClass` (#3326)
- [Table] Send event object after click, hover, hoverOut on cell (#3002)
- [TextField] Add textareaStyle property (#3238)
- [TextField] Fix defaultValue behavior (#3239)
- [TextField] Fix wrong label id (#3240)
- [TextField] Fixed a bug where clicking on floating label and typing simultaneuosly loses keypress (#3055)
- [TextField] Fixed ie9-ie10 click focus problem (#3193)
- [TimePicker] Update time state on new defaultTime prop (#3095)
- [Toggle] Fixes styling issue (#3299)
- [ToolbarTitle] Fix overflow (#3250)
- [TouchRipple] Abort on scroll (#3407)

##### Deprecations
- [Menu] Deprecated built in `animated` (#3216)
- [Core] Deprecated `style-propable` mixin and `utils/styles` (#3351)
- [Core] Deprecated `ThemeDecorator` in favor of `MuiThemeProvider` (#3267)
- [Core] Deprecated `theme-manager` and `raw-themes` (#3267)

## 0.14.4
###### *Feb 02, 2016*

##### General
- [CRITICAL] Fixed a regression that completely disabled the auto-prefixer (#3142)
- [Core] Implements prepareStyles as composition of functions in muiTheme (#2986) (Thanks to @newoga)
- [Docs] Contributing guide (#3075)
- [Docs] Added a `Related Projects` section (#3102)
- [Examples] General updates (#3078)

#### Component Fixes / Enhancements
- [Tabs] Removed the calc style property (#3058)
- [Tabs] Added icon and text (#3042)
- [Tabs] Use `FlatButtons` for tabs (#3051)
- [AutoComplete] Fixed regression of undefined muiTheme (#3069)
- [List] Auto-expand SelectableList (#3039)
- [DatePicker] Added `disabled` property (#3060)
- [Buttons] Fixed the vertical alignment issue (#3100)
- [RaisedButton] Fix the default value of `labelPosition` (#3115)
- [FlatButton] Fix the default value of `labelPosition` (#3115)

## 0.14.3
###### *Jan 26, 2016*

##### Breaking Changes

Note that these are not essentially breaking changes.
Unless you have used these implementation details in your code.

- [Internal] Remove `controllable.js` mixin (#2889)
- [Internal] Remove `mergeAndPrefix()` (#2886)
- [Internal] Remove `utils/extend.js` (#2933)
- [Internal] Remove `utils/immutability-helper.js` (#2907)

##### General
- [Examples] Move `DateTimeFormat` polyfill to the example (#3024)
- [Docs] Add title and description to code examples, thanks to @mbrookes's hard work (#2927)
- [Docs] Add a showcase section (#2910)
- [Docs] Hide code examples by default (#2911)
- [Docs] Add [Cloudcraft](https://cloudcraft.co/) to Showcase (#3036)
- [Docs] Migrated the following pages to use the new documentation standard:
  1. [TimePicker] (#2849)
  1. [Table] (#2848)
  1. [Switches] (#2872)
  1. [Buttons] (#2874)
  1. [AutoComplete] (#2871)
  1. [Popover] (#2870)
  1. [IconMenu] (#2882)
- Added the following eslint rules:
  1. Extend `eslint:recommended` (#2854)
  1. `one-var` (#2855)
  1. `brace-style` (#2855)
  1. `react/jsx-pascal-case` (#2953)
  1. `react/jsx-max-props-per-line` (#2953)
  1. `react/jsx-closing-bracket-location` (#2953)
  1. `jsx-equals-spacing` (#3035)
- [Performance] Fix V8 deopt, leakage of `arguments` (#2876)
- [ServerSideRendering] Make userAgent contexual (#3009)

#### Component Fixes / Enhancements
- [Slider] Avoid selection when dragging (#2827)
- [Snackbar] Execute onDimiss callback after snackbar has closed (#2881)
- [Table] Don't use `for...of` on table children (#2904)
- [RenderToLayer] Fix leaking of event (#2935)
- [FlatButton] Fix shared memory property modification (#2964)
- [DatePicker] Add `firstDayOfWeek` and days abbreviations (#2899)
- [ListItem] Added nestedItemStyle prop (#2990)
- [ListItem] when disabled, `className` is ignored (#2723)
- [EnhancedButton] Make keyup event respect `disableKeyboardFocus` (#3000)
- [Dialog] Fix overlay scroll for nested dialogs (#2893)
- [SvgIcons] Remove fill attributes (#3034)
- [Paper] Allow the box shadow color to be changed (#3003)

##### Deprecations
- [DropDownIcon] Will be removed with `0.15.0` (#2994)

## 0.14.2
###### *Jan 08, 2016*

##### General
- [CRITICAL] Fix imports using require() style syntax (#2804) thanks @newoga
- [Examples] Upgrade to babel 6 for browserify (#2795)
- [Docs] Migrated the following pages to use the new documentation standard:
  1. [RefreshIndicator] (#2799)
  1. [Icon] (#2695)
  1. [Lists] (#2782)
  1. [Progress] (#2798)
  1. [Sliders] (#2800)
  1. [Paper] (#2797)
  1. [Menus] (#2785)
- Added the following eslint rules:
  1. `react/jsx-indent` (#2808)

#### Component Fixes / Enhancements
- [DatePicker] Update slide direction (#2791)
- [AutoComplete] Add 2 extra filters for text matching (#2755)
- [TableRow] Fix row height in IE (#2812)

## 0.14.1
###### *Jan 05, 2016*

##### General
- Upgrade to babel v6 (#2620, #2709)
- [Docs] Improve the performance of the production build (#2680)
- [Docs] Improve the AppLeftNav for mobile (#2690)
- [Docs] Use a single LeftNav (#2721)
- [Docs] Migrated the following pages to use the new documentation standard:
  1. [DatePicker] (#2622)
  1. [GridList] (#2681)
  1. [SelectField] (#2694)
  1. [IconButton] (#2700)
- Added the following eslint rules:
  1. react/sort-comp (#2774, #2776)

#### Component Fixes / Enhancements
- [MenuItem] Fix icon position (#2661)
- [SelectableList] Recursively extend children (#2320)
- [SelectField] Add hintStyle (#2710)
- [EnhancedButton] Avoid rendering `<a>` element (#2708)
- [LeftNav] Only transition the transform property (#2730)
- [TextField] Fix `errorText` when using `multiLine` (#2742)
- [TimePicker] Update am/pm buttons (#2757)

##### Deprecations
- [Dialog] Deprecate width (#2753)

## 0.14.0
###### *Dec 25, 2015*

The chagnes in `0.14.0-rc1` and `o.14.0-rc2` are also included as part of this release.
Have a look at them as well.

##### General
- [Docs] Migrated the following pages to use the new documentation standard:
  1. [Tabs] (#2515)
  1. [Snackbar] (#2562)
  1. [DropDownMenu] (#2565)
  1. [Card] (#2590)
- Added the following eslint rules:
  1. key-spacing (#2552)
- [SvgIcon] Improved the code generation tasks (#2606)
- [ES6] Use module everywhere (#2614)
- Added a temporary bootstrap project for ReactNative to pave the way for ReactNative support (#2611)
- Clean up CSS classes (#2630)

#### Component Fixes / Enhancements
- [SelectField] [TextField] Fixed error styling issue (#2539)
- [TextField] Implemented optional underline (#2476)
- [AutoComplete] Migrated to use popover (#2634)

##### Deprecations
- [DropDownMenu] [SelectField] Deprecated `menuItems`, these components are now composable. (#2565)

## 0.14.0-rc2
###### *Dec 15, 2015*

##### Breaking Changes

- [Menu] Depreciation of the old menu, introduces a very small breaking change (#2443)
- [Dialog] Removed deprecated API (#2396)
- zIndex, rework them to be more coherent (#2444)

##### General
- Decoupled `Popover` animation from the component to increase flexibility (#2367)
- [Tests] Migrated tests to use the new `react-addons-test-utils` package (#2401)
- [Docs] Improvements to the documentation site (#2426, #2421, #2438, #2479, #2508)
- [Docs] Migrated the following pages to use the new documentation standard:
  1. [AppBar] (#2382) *also where the new standard was introduced by @oliviertassinari*
  1. [Avatar] (#2407)
  1. [Toolbars] (#2415)
  1. [Badge] (#2489)
  1. [Dialog] (#2483)
  1. [LeftNav] (#2507)
- Added the following eslint rules:
  1. react/jsx-indent-props (#2377)
  1. max-len (#2381)
  1. wrap-multilines (#2419)

#### Component Fixes / Enhancements
- [Card] Use `preventDefault()` when handling expansion (#2495)
- [CardHeader] Made `avatar` property optional (#2397)
- [Checkbox] Now updates it's state when `checked` property changes (#2464)
- [DatePicker] Fix year selection (#2410)
- [Dialog] Added `overlayStyle` property (#2431)
- [Dialog] Added `width` property (#2387)
- [Divider] Initial implementation. Thanks to @newoga (#2473)
- [DropDownMenu] Added `menuStyle` property (#2389)
- [DropDownMenu] Now uses `Popover` (#2150)
- [DropDownMenu] Now bubbles keyboard events (#2461)
- [FlatButton] Adjusted background, hover and ripple colors (#2488)
- [IconMenu] Added `open` and `onRequestChange` properties (#2383)
- [ListItem] Added option to toggle nested list items on primary action (#2390)
- [Menu] Fixed an error when children is only one child (#2402)
- [Menu] Remove absolute positioning (#2455)
- [Menu] Fixed issue when passed null children (#2429)
- [SelectField] Fixed the propagation of underline styles (#2405)
- [TableRow] Fixed a bug when unselectable rows could still be selected (#2503)

##### Deprecations
- The old menu components under the `material-ui/lib/menu` folder (#2443)
- The `actions` property of `Dialog` accepting a JSON is deprecated (#2483)
- The `menuItems` of `LeftNav` and all the related properties are now deprecated in favor of composibility (#2507)


## 0.14.0-rc1
###### *Dec 4, 2015*

##### Breaking Changes
- [IconMenu] removed openDirection prop in favor of anchorOrigin and targetOrigin (#2149)

##### General
- Use ES6 import / export syntax over require (#2253, #2333, #2334)
- Dialog render-to-layer version (#2129)
- Add declarative props to LeftNav, deprecate methods (#2180, #2351)
- Add linting to test files (#2273)
- Support nested menu items using Popover (#2148)
- [DropdownMenu] add labelMember prop (#2285)
- Add new ESLint rules (#2293, #2314, #2319, #2348, #2360, #2365, #2366)
- Add unit tests for Dialog (#2298)
- [AutoComplete] Support changing searchText via props (#2306)
- [AutoComplete] dataSource prop is of type array (#2286)
- [AppBar] add titleStyle prop (#2324)
- [TimePicker] update as per spec (#2358)
- [Popover] add useLayerForClickAway prop (#2359)

#### Component Fixes / Enhancements
- Fix wrong proptype for value in RadioButton (#2276)
- Make LeftNav swipeable only from far left / right (#2263)
- [TextField] allow rowsMax prop to equal rows prop (#2312)
- Fix Invariant Violation error in ClickAwayable mixin (#2296)
- [DatePicker] fix calendarTextColor context key (#2318)
- Fix and improve examples (#2344, #2345)
- [Dropdown][SelectField] change value PropType to React.PropTypes.any (#2352)
- [CardActions] prevent children styles from being overridden (#2361)

## 0.13.4
###### *Nov 24, 2015*

##### General
- Introduced SelectableEnhance HOC to wrap List with valueLink (#1976)
- Added color prop to LinearProgress and RefreshIndicator (#2206)
- [AutoComplete] new component! (#2187) (thanks @yongxu)
- [Table] added wrapperStyle prop to override table wrapper's styles (#2238)
- Updated SVG icons (#2240)
- [Table] added props for headerStyle, bodyStyle and footerStyle (#2246)

#### Component Fixes / Enhancements
- Fixed double ripple due to compat mouse down (#2216)
- [RenderToLayer] iframe support for clickaway (#2210)
- [TextField] Fixed floating label element not allowing focus (#2228)
- [SelectField] onFocus and onBlur handlers passed to underlying TextField component (#2102)

## 0.13.3
###### *Nov 17, 2015*

##### General
- [Snackbar] add bodyStyle prop to style child div (#2104)
- [DatePicker] add container prop to display DatePicker in-line or inside Dialog (#2120 and #2153)
- [AppBar] add relative positioning for z-index to take effect (#1478)
- [AppBar] add onTitleTouchTap prop to AppBar (#2125)
- [Popover] new component! (#2043) (thanks @chrismcv)
- Split [SelectField] and [TextField] doc pages (#2161)

#### Component Fixes / Enhancements
- [SelectField] onChange triggered consistently when using value prop (#1610)
- [Dialog] fix page scrolling behind dialog after resizing (#1946)
- [DatePicker] fix calendar height (#2141)
- [TimePicker] allow to set time to null (#2108)

## 0.13.2
###### *Nov 9, 2015*

##### General
- Add tabs with slide effect (#1907)
- Universal rendering support (#2007) (thanks @Cavitt)
- Add labelPosition prop to buttons (#2014)
- Add RenderToLayer component (#2042) (thanks @chrismcv)
- Open state of of dialog now controlled through props (#1996)
  - openImmediately, show(), dismiss() deprecated
- Update TextField docs (#2070)
- New Badge component (#2045) (thanks @rhythnic)
- Add import statements to components' docs pages (#2113)

#### Component Fixes / Enhancements
- Fix server side rendering (#2021)
- Add key to TableHeaderColumn for selectAll (#2030)
- Fix Circular Progress transition (#2047)
- Fix Snackbar getting stuck when receiving new props (#2024)
- iPad enhanced textarea fix (#1720)
- Table clickAway triggers onRowSelection (#2054)
- Theme color fixes for Slider and Toggle (#2016)

## 0.13.1
###### *Oct 29, 2015*

##### General
- [SVGIcons] added index.js and index-generator script (#1959)
- [TimePicker] openDialog() function (#1939) and autoOk prop (#1940) added
- [DatePicker] i18n support added (#1658)
- [LeftNav] supports nested children (w/o menuItems) (#1982)
- [Snackbar] updated for new specification (#1668)
- [Tabs] added tabTemplate prop (#1691)

#### Component Fixes / Enhancements
- [TextArea] height issue fixed (#1875)
- [GridList] doc added (#1948) with code examples (#1988)
- [TextField] fixed custom theme color hiding backgroundColor (#1989)
- [TimePicker] added style and textFieldStyle props (#1949)
- [Card] text color is now pulled from theme (#1995)

## 0.13.0
###### *Oct 21, 2015*

##### Breaking Changes
- Material-UI for React 0.14.x

#### Component Fixes / Enhancements
- FloatingActionButton now has iconStyle prop (#1575)
- Card title and subtitle props can be any node (#1950)

## 0.12.5
###### *Oct 21, 2015*

v0.12.4 should have really been v0.13.0 as it breaks compatibility with React 0.13.3. This version fixes that. We reverted some commits (related to React 0.14.0 support) from v0.12.4 to bring to you v0.12.5 that works as expected.

#### Component Fixes / Enhancements
- DatePicker performance has been improved (#1905)
- Docs code now follows ESLint rules more strictly (#1778)
- Removed duplicate keys in component definitions (#1933)

## 0.12.4
###### *Oct 19, 2015*

**This version is not compatible with React 0.13.x.** If you're on React 0.13.x, use Material-UI v0.12.5 instead.

##### General
- React 0.14 compatible

#### Component Fixes / Enhancements
- ThemeDecorator supports props (#1841)
- Full RTL support included (#1674)
- react-draggable dependency removed for Slider (#1825)

## 0.12.3
###### *Oct 7, 2015*

#### Component Fixes / Enhancements
- Quick-fix version until react 0.14 support is somewhat stable
  - Changed react dependency to ~0.13 in package.json (#1836)

## 0.12.2
###### *Oct 6, 2015*

##### General
- NEW GridList component and documentation! Thanks to @igorbt (#1320)

#### Component Fixes / Enhancements
- Added back canvasColor to theme palette (#1762)
- Added hintStyle prop to TextField (#1510)
- Add isScrollbarVisible function to table (#1539)
- Add rowsMax prop to EnhancedTextarea (#1562)
- Tab "item three" renamed on docs site (#1775)
- Fixed docs server to run on Windows (#1774)
- FlatButton now has a backgroundColor prop (#1561)
- Fixed DropdownMenu buggy value prop check (#1768)

## 0.12.1
###### *Sep 28, 2015*

#### Component Fixes / Enhancements
- Fix broken documentation site
  - Fix theme display switch problem in doc (#1696)
  - Fix typo in src/card-expandable.jsx (#1724)
  - Fix broken link to v0.12.0 release tag
- Use correct require calls
  - for react addons (#1729)
  - for raw themes (#1742)
- Remove hard-coded color values from theme-manager
  - Use consistent values from raw theme (#1746)

## 0.12.0
###### *Sep 25, 2015*

##### Breaking Changes
- Theming has been re-done so that material-ui components can be used without having to worry about passing a theme (all components implement a default theme) (#1662)
  - There's now a concept of `mui theme` and `raw theme`, `mui theme` is produced from `raw theme`
  - `ThemeManager` has been changed, no longer needs `new` in call
  - `ThemeManager` produces `mui theme` from `raw theme`. Raw themes may be user-defined.
  - Functions in `ThemeManager` allow to modify theme variables. Component-level styles may be overriden in the `mui theme`.
  - See new documentation [here](http://material-ui.com/#/customization/themes)
- Function names in the context-pure mixin have been changed (#1711)
  - `getContextProps()` has been changed to `getRelevantContextKeys()`

##### General
- Updated dependency of `react-tap-event-plugin` (#1714)

#### Component Fixes / Enhancements
- Dialog component (#1717)
  - `actions` now has `id` property
  - Fixed a bug in dialog where a faulty check caused an error in console
  - Text field ipad scrolling in dialog

## 0.11.1
###### *Sep 15, 2015*

#### Component Fixes / Enhancements
- DatePicker - Updated to new design specs (#1266)
- LeftNav - Fix sidebar position for browsers that don't support transform3d (#1269)
- TextField - Added props to override underlineStyle when disabled (#1493)

## 0.11.0
###### *Aug 24, 2015*

##### Breaking Changes
- The Table component is now composable. (#1199)
  - JSON objects to create the table and the table component will no longer generate the table for you.
    The docs site provides a complete example of how a table might look: http://material-ui.com/#/components/table.
    The example also includes a 'super header' and 'super footer' row.
  - **Upgrade Path:** Instead of passing in the raw JSON data, you'll need to generate the appropriate
    TableHeader/TableRow/TableHeaderColumn components and pass them in as children. The same should be applied
    to the rowData and the footer.
- Tabs can now be controlled. In order to make this work we had to change the parameters being passed back to
  the `onChange` event to: `onChange(value, e, tab)`. Where value is the value of the tab that it was changed
  to, e is the event, and tab is the actual tab component. (#1232, #1235)
- Added a new `static` flag to the ThemeManager that defaults to `true`. If you're mutating your theme variables
  after the app initializes, set this flag to `false`. This will allow us to perform some optimizations to
  components that require theme variables. (#1397)
- ListItem (#1438, #1105)
  - Nested list items should no longer be passed in as children. Use the `nestedItems` prop instead.
  - The `open` prop has been renamed to `initiallyOpen`.
- Removed classable mixin
  - This mixin was no longer used in the library. Removing it allowed us to get rid of the `classnames`
    dependency. If you were using this mixin in your own projects, you'll need to pull the source and manually
    include it.

#### Component Fixes / Enhancements
- Buttons - Fixed a bug that caused buttons to not gain keyboard focus in some cases (#1485, #1453, #1458)
- Card
  - Properly merge `CardAction` and `CardExpandable` styles. (#1376)
  - Added Right-To-Left support to `CardExpandable`. To use this, set `isRtl` to `true` in the theme. (#1408)
- DatePicker - Fixed an error that occurred when using valueLink (#1400)
- DropDownMenu - Added `disabled` prop (#1406)
- FlatButton - Added `labelPosition` prop. (#1286)
- InkBar - Added color prop and inkBar.backgroundColor to theme variables. (#1244)
- Ripple
  - Fixed display glitch on Safari (#1420)
  - Fixed an error when ripples were unMounted (#1416)
- SelectField
  - Added `floatingLabelStyle` prop (#1463 #1450)
- Slider
  - Fixed a bug when setting the width attr (#1368)
  - Fixed a bug with disabled sliders (#1417)
  - Fixed a focus style glitch and other style problems (#1448, #1451, #1468)
- Snackbar - Added onShow and onDismiss (#1390)
- Table - Ensure that the table component properly keeps track of selected rows (#1325)
- TextField
  - Added `underlineFocusStyle` prop (#1422, #1419)
  - `hintText` can now be a `string` or `element` (#1424, #1202)
- TimePicker
  - Fixed a bug that caused the am/pm selector to switch (#1440)
  - Fixed a bug that caused defaultTime to not be set (#1466)
- Tooltip - Probably center tooltips when tooltip text changes (#1205)
- Theme - Added `setContentFontFamily` (#1405)

## 0.10.4
###### *Aug 8, 2015*

#### Component Fixes / Enhancements
- TouchRipple - Fixed a bug that caused onClick to not fire on the first click (#1370)

## 0.10.3
###### *Aug 8, 2015*

##### General
- We've set up the project to perform automated tests - now we just need to increase our test coverage. :) (#1331)
- The style auto-prefixer now caches browser test results so that it only has to perform them once.

##### New Components
- RefreshIndicator (#1312)

#### Component Fixes / Enhancements
- AppBar - showMenuIconButton now only affects the icon next to the title (#1295, #1182)
- CardMedia - CardMedia children styles are now being properly merged (#1306)
- Dialog - fixed a bug that caused the dialog height to be incorrect on window resize (#1305)
- FloatingActionButton - Added backgroundColor and disabledColor props (#1329)
- FocusRipples now only get rendered when needed.
- IconMenu - Added isOpen() (#1288)
- LeftNav
  - Added menuItemClassName, menuItemClassNameSubheader, menuItemClassNameLink props (#1318)
  - Fixed a display problem that cuased icons to not be the correct color (#1324)
- ListItem - fixed incorrect styling on disabled list items (#1350)
- SelectField
  - Fixed a bug that happened when select field was controlled and the value was undefined (#1227)
  - Fixed error text positioning (#1341, #1111)
  - Added errorStyle prop (#1341)
- Snackbar - Clickaway is now properly bound when openOnMount is true (#1327)
- Tabs - Added contentContainerClassName prop (#1285)
- TextField - Added underlineStyle prop (#1343)
- TimePicker - Added pedantic prop (#1275, #1173)

## 0.10.2
###### *Jul 29, 2015*

##### Breaking Changes (Missed in the original release notes.)
- Changed `date-picker/index.js` to expose DatePicker and DatePickerDialog.
  Hence `require('material-ui/lib/date-picker')` no longer works. Use
  `require('material-ui/lib/date-picker/date-picker')` instead.

##### General
- Replaced onMouseOver / onMouseOut with onMouseEnter / onMouseLeave to achieve hover affects.
  This prevented extra unnecessary renders from happening. (#1190)
- All svg icons inside the /svg-icons folder now uses the PureRenderMixin.

##### Icon Builder
- Added tests, build process, file template, and file suffix (#1130, #1127, #1126, #1125, #1139)

#### Component Fixes / Enhancements
- AppBar - Fixed a styling bug in Safari (#1226)
- Cards can now expand and collapse (#1060)
- DatePicker
  - Allow using DatePicker as a controlled input (#1170)
  - Added valueLink support and openDialog() (#1213)
  - Fixed a bug that caused dates to get selected when switching months (#1243)
  - Avoid handling keyboard events when calendar is not active (#1245)
  - Fixed display glitch on Firefox (#1242, #1248)
- Dialog
  - Hitting the ESC key no longer closes the window if modal is set to true (#1187, #1162)
  - The onShow event now called after all contents in the dialog have been rendered. (#1198)
- DropDownMenu - Clicking away no longer triggers other click events to happen (#1177, #1174)
- FocusRipples now only render when actually shown.
- IconMenu
  - Fixed a bug that caused a scrollable menu to jump after selecting an item.
  - Fixed keyboard focus when user hits ESC.
- LeftNav
  - Added some Perf improvements (#1184)
  - Fixed a bug that caused onNavOpen to sometimes not fire (#1225)
  - Added disableSwipeToOpen prop (#1279)
- Menu
  - Performance improvements when opening a menu.
  - Added animated prop.
- RaisedButton - Fixed a bug that caused rounded corners not to round (#1048)
- SelectField - Now passes the index and payload back in the onChange callback (#1193, #1194)
- Slider - Fixed a bug that caused value to not be set correctly (#1251)
- Snackbar - Extra props are now being passed down to the root (#1260)
- SvgIcon - Added code to remove some unnecessary renders on hover.
- Toolbar - Fixed display glitch on Firefox (#839, #1248)

## 0.10.1
###### *Jul 13, 2015*

#### Component Fixes / Enhancements
- CircularProgress - Fixed animation bug in Safari (#1093, #863)
- Dialog
  - `contentClassName` is now being passed down to the appropriate child (#1122)
  - Fixed max height on vertically scrollable dialogs (#1153, #1100)
- DropDownMenu
  - Fixed display height (#1123)
  - Fixed display height when menu items change (#1145)
- IconMenu - Added `closeOnItemTouchTap` prop (#1156)
- LeftNav - Performance improvements during show/hide (#1137)
- SelectField - `errorText` is now being passed down to underlying `textField` (#1131)
- Table - Added static width to checkbox columns (#1128)
- Tabs - Added `inkBarStyle` prop (#1154)
- TextField - `errorStyle` prop is now being properly merged (#1116)

## 0.10.0
###### *Jul 9, 2015*

##### Breaking Changes
- Removed `input.jsx` file. This component was deprecated long ago, but was never removed from the project.
- Buttons now default to a type of `button` instead of the browser's default of `submit`. We found that
  most of the buttons in our apps were not submit buttons and it was more intuitive to default to `button`.
  If you need a submit button, be sure to pass in a type of `submit`. (#1017)
- The `DialogWindow` component was refactored into `Dialog`. `DialogWindow` was never documented and was just
  a lower level component that was used by `Dialog`. It was, however, exposed on the main `index.js` and has
  since been removed. If you were using `DialogWindow` before, you should be able to safely use
  `Dialog` instead.

##### New Components
- SvgIcons & Icon Builder
  - We've created SvgIcon versions of all the
    [material-design-icons](https://github.com/google/material-design-icons). These SvgIcon
    components can be found in the `/lib/svg-icons` directory and were not added to the main `index.js`
    file. To use these icons, require them directly: `require('material-ui/lib/svg-icons/action/face')`.
    These icons were created using a script that crawls the icon repo and generates the
    appropriate `js` and `jsx` files and can be found in the `/icon-builder` directory.
- Menu, MenuItem, MenuDivider
  - This is a new implementation of menus and menu items. With it comes:
    - better composability
    - scrollable menus
    - better transitions
    - better keyboard access
    - selectable with value and valueLink
  - We're working on migrating some of our other components to use this new implementation. Until that's
    thats done, require these components directly if you'd like to use them:
    `require('material-ui/lib/menus/menu')`.
- IconMenu
  - This component replaces `DropDownIcon` and has all of the new menu features mentioned above.

#### Component Fixes / Enhancements
- AppBar
  - IconButton styles are now being properly merged (#967)
  - FlatButtons are now being properly styled (#967)
- AppCanvas - AppBar child styles can now be overridable (#903)
- Avatar - Added `size` prop (#945)
- CardMedia - Styles are now being properly merged using the `mediaStyle` prop (#1004)
- CircularProgress - Added `color` and `innerStyle` prop (#928)
- DatePicker
  - Prevent root styles from propagating to child input (#991)
  - Fixed DatePicker year/month navigation buttons (#1081, #1075)
- Dialog
  - Window scrolling is now enabled on unmount as well (#946)
  - Allow dialog window to scroll for long content (#1045, #525)
  - Drastically improved dialog performance (#1059)
  - Dialogs now honor modal property. (#1092)
  - Fixed vertical centering on smaller screen sizes (#1095)
- FloatingActionButton - Now accepts `FontIcon` and `SvgIcon` as children (#967, #894)
- FontIcon - Now supports `material-icon` ligatures (#952, #1007)
- IconButton
  - Added `tooltipPosition` prop (#921)
  - Added `tooltipStyles` prop (#1010, #1005)
  - Pass iconStyle props to every children (#967)
  - Now supports `material-icon` ligatures (#1024, #1013)
- LeftNav - Fixed swipe gesture to open / close (#868, #848, #998, #997)
- List - Added `zDepth` prop.
- ListItem
  - Fixed display glitch on touch devices (#858)
  - List items can now be keyboard focused
  - Allow drop downs to be displayed inside a list item (#978)
  - Fixed a bug that caused rightIconButton events to not propagate (#1055)
  - List Items can now be nested (#918)
  - Added `primaryText` prop (#1073)
- Menu
  - Fixed a bug that caused closed menu to be selectable (#913)
  - Fixed menu height and width when menu items change (#1012, #805, #1014)
  - Subheader styles are now being properly merged (#950)
- MenuItems now properly renders icons (#956)
- Overlay
  - Added to main `index.js` (#955)
  - Fix issue where Overlay can prevent the body from scrolling (#1058, #897)
- RaisedButton
  - Fixed a display glitch when changing the button's height (#937, #765)
  - Added `backgroundColor`, `labelColor`, `disabledBackgroundColor`, `disabledLabelColor` props (#965)
  - Added `fullWidth` prop (#989)
- SelectField
  - Fixed menu and error text display glitches (#922)
  - Added hint text functionality (#966)
  - Fixed display problem when `floatingLabelText` is set (#976)
  - Fixed font size (#1027)
- Slider
  - `className` can now be set (#938, #713)
  - Added min/max prop validation (#1070, #899)
- Snackbar
  - Root styles are not being merged properly (#925)
  - Added `autoHideDuration` prop (#1050, #958)
  - Clicking slider track advances the slider knob. (#1089, #1074)
- Table
  - Fixed `displayRowCheckbox` prop (#935)
  - Table rows can be selected in the rowData configuration (#1023)
  - Removed duplicate table calls and support multiple tables (#954, #1087, #1084)
- Tab - Added `contentContainerStyle` prop (#953)
- Tabs - Fixed a bug that caused inkbar to not display properly (#1015, #940)
- TextField
  - Fix error when setting the value of the textfield `input`. (#959)
  - Style fixes for floating label (#980)
  - Fixed display glitch for long hint text and error text (#987, #438, #439)
  - Fixed display problem when value is 0 (#1090)
  - Added `errorStyle` prop (#1079)
- TimePicker - Fixed key warnings (#1018)
- Toolbar
  - Fixed display glitch with DropDownIcons (#917, #904)
  - Styles are now being properly merged for `DropDownMenu`, `DropDownIcon`, `RaisedButton`, `FontIcon` (#965)

## 0.9.2
###### *Jun 20, 2015*

##### New Components
- SelectField (#846)
- Card, CardActions, CardHeader, CardMedia, CardText, CardTitle (#857)
- Table (#890)

##### Components
- AppBar - Long AppBar titles now render ellipses (#875)
- Buttons
  - Added containerElement prop (#850)
  - Fixed styling for disabled link buttons
- DropDownMenu - Added keyboard functionality (#846)
- FontIcon - Added color and hoverColor props
- ListItem
  - Fixed display problem with Single line checkboxes (#854)
  - Added rightIconButton prop
- Slider - Added step functionality (#860)
- Switches - Added labelStyle prop (#871)
- SvgIcon - Added color and hoverColor props
- TextField - Made element styles overridable (#864)
- TimePicker
  - Fixed clock functionality for various browsers (#840)
  - Fixed clock numbers positioning for Safari (#870)
  - Fixed clock handles on Android Chrome (#873)
- Toggle
  - Made element styles overridable (#855)
  - Fixed style bug on IE 10, 11 (#885)
- Toolbar - Fixed error when a child element is null (#847)

##### Theming
- Theme spacing can now be overriden (#879)

## 0.9.1
###### *Jun 14, 2015*

##### General
The following components have been modified to allow for style overrides:
Radio Button Group, Radio Button, Enhanced Switch Label, Text Field, Toggle, Checkbox (#807)

##### New Components
- List, ListItem, ListDivider, Avatar (#836)

##### Components
- Checkbox - Added checkedIcon and unCheckedIcon props. This is useful to create icon toggles.
- Dialog - Fixed a bug with the open immediately flag (#810)
- DropDownIcon - Added support for icon ligature (#806)
- Menu - Fixed a style problem (#843)
- RadioButtonGroup - Fixed a bug with mapping Radio children (#820)
- Slider - Fixed a glitch that happened when click on the slider handle (#833)
- TextField - Added fullWidth prop (#827)
- TimePicker
  - Fixed a bug with the defaultTime setting (#822)
  - Fixed clock handles on Firefox (#825)

## 0.9.0
###### *Jun 9, 2015*

##### Breaking
We've cleaned up some of our click/tap events. (#771) Upgrade should be straight forward, please see below:
- DropDownIcon - closeOnMenuItemClick has been replaced with closeOnMenuItemTouchTap.
- Menu - onItemClick has been removed; use onItemTap instead.
- MenuItem - onClick event has been removed; use onTouchTap instead.

##### General
- ClickAwayable is now bound to onTouchTap instead of onClick (#766)

##### Components
- AppBar will now render its children (#725)
- DatePicker will now properly handle defaultDate prop changes (#722)
- Dialog actions now respond to onTouchTap (#752)
- LeftNav
  - Fixed line height style bug (#742)
  - Fixed a bug that caused the LeftNav to immediately close on iOS full screen mode (#751, #366)
- Menu
  - Will now adjust its height when props change (#544, #203)
  - MenuItemStyle prop is now passed down to nested menus (#802)
- RadioButtonGroup can now have its styles overridden (#768)
- RaisedButtons - Fixed a bug that caused incorrect transitions (#731, #702)
- SvgIcon - ViewBox can now be passed in as a prop (#747)
- Tabs - Components inside tabs now keep their state when switching between tabs (#700, #450)
- TextField
  - Multi-line text fields can now be initialized with a certain number of rows (#693)
  - Fixed style bug that caused width to not be set on disabled text-fields
  - Fixed style bug that caused focus underline to be black
  - Fixed style problem that caused text to jump on multi-line inputs
- Theme (New)
  - This is a high order component that can be used to set your theme overrides (#797)

## 0.8.0
###### *May 24, 2015*

##### Breaking Changes
- Refactored all CSS into Javascript (#30, #316)
  - All Material-UI components now have their styles defined inline. This solves
    many problems with CSS as mentions in [@vjeux's presentation](https://speakerdeck.com/vjeux/react-css-in-js)
    such as polluting the global namespace with classes that really should be
    component specific. In addition to the benefits mentioned in the
    presentation, inline styles allow Material-UI to become CSS preprocessor
    agnostic and make Themeing much more dynamic and simple.
    [Read our CSS in JS discussion](https://github.com/mui-org/material-ui/issues/30)
  - Upgrade path:
    - *If you are overriding component CSS classes:* Redefine your overrides as
      an object following [React's inline styles format](https://facebook.github.io/react/tips/inline-styles.html),
      then pass it into the material-ui component via the `style` prop. These
      changes are applied to the root element of the component. If you are
      overriding a nested element of the component, check the component's
      documentation and see if there is a style prop available for that nested
      element. If a style prop does not exist for the component's nested element
      that you are trying to override, [submit an issue](https://github.com/mui-org/material-ui/issues/new)
      requesting to have it added.
    - *If you are using any of Material-UI's Less files:* These files have been
      refactored into their [own javascript files](https://github.com/mui-org/material-ui/tree/css-in-js/src/styles)
      and can be accessed like so `var FILENAME = require('material-ui').Styles.FILENAME;`.
      Material-UI has moved away from being a CSS Framework to being simply a
      set of React components.
- Paper component no longer generates nested divs (#601)
  - This allowed us to simplify styling of paper containers. As a result, styling the inner div is no longer necessary.

##### General
- Themes have been added (#202)
- Requiring individual components is now supported (#363)
  - An example would be: `var SvgIcon = require('material-ui/lib/svg-icon);`
  - The `/lib` folder in Material-UI contains the file structure needed when referencing individual components.

##### Components
- Date Picker
  - Added AutoOK Prop (#658)
  - Added ability to specify min and max dates (#658)
  - Added Year Selector (#658)
- Dialog now repositions on screen resize (#597)
- Left Nav will now close with a swipe gesture (#614)
- Linear and Circular Progress Indicators - NEW (#632)
- TimePicker - NEW (#589)

## 0.7.5
###### *Apr 27, 2015*

###### General
- Removed deprecation warnings by replacing `this.getDOMNode()` with `React.findDOMNode()` (#558)
- Replaced `process.NODE_ENV` with `process.env.NODE_ENV` (#573)

##### Components
- DropDownMenu
  - Fixed `props is not defined` error when `onChange` is invoked (#556)
- Floating Action Button
  - Fixed alignment bug on Chrome when using FAB as a link (#574)

## 0.7.4
###### *Apr 21, 2015*

##### General
- Updated to react v0.13

##### Components
- AppBar
  - Fixed IE toString.Call() issue (#518, #468)
- Buttons
  - Button events now do not fire on disabled buttons (#512)
  - Fixed rapid keyboard tabbing issue (#528)
- DatePicker
  - Added autoOk, minDate, and maxDate props (#538)
- Dialog
  - Fixed IE toString.Call() issue (#518, #468)
  - Added modal prop (#523)
  - Fixed warnings caused by overwriting props (#500)
  - Added ability to give an action button autofocus (#552)
- DropDownMenu
  - Handle selectIndex less than 0 (#480)
  - Fixed issue of using this component outside strict mode (#533)
- LeftNav
  - Added onNavOpen & onNavClose events (#495)
- Switches
  - Fixed errors on disabled switches on mobile (#476)

## 0.7.3
###### *Apr 1, 2015*

##### General
- Updated mui to use peer dependency changes (#471)
- Replaced `DOMIdable` with `UniqueId` (#490)

##### Components
- Dialog
  - Changed `title` prop to accept node types instead of just strings (#474)
- Link Menu Item
  - Fixed anchor attribute name (#493)
- Menu
  - Nested menus expand when hovered (#475)

## 0.7.2
###### *Mar 25, 2015*

##### General
- Updated react-draggable2 dependency (#391)
- Updated react and peer dependecies to React v0.13 (#452)

##### Components
- Date Picker
  - Added `onShow` and `onDismiss` props (#399)
- Dialog
  - Fixed scrolling issue when opened immediately (#406)
  - `onShow` is now called when opened immediately (#453)
- Flat Button
  - Disabled primary buttons use disabled styling over primary (#432)
- Floating Action Button
  - Fixed zdepth to update when `disabled` prop changes (#390)
  - Disabled secondary buttons use disabled styling over secondary (#432)
- Left Nav
  - Scrolling is prevented when displayed (#406)
- Menu
  - Menu and menu-related components have been moved into `js/menu/*` (#402)
  - Added LinkMenuItem component (#402)
- Menu Item
  - Added `disable` prop (#402)
- Overlay
  - Now control scroll un/locking. (#406)
- Paper
  - Added `innerStyle` prop (#418)
- Raised Button
  - Disabled primary buttons use disabled styling over primary (#432)
- Tabs
  - Added `initialSelectedIndex` prop (#389)

## 0.7.1
###### *Mar 4, 2015*

##### General
- Allow removal of debug code in production builds (#349)

##### Components
- AppBar
  - Fixed a styling bug that caused icons not to show (#336)
  - Title prop can now be an element (#361)
  - Added iconClassNameLeft, iconElementLeft, iconElementRight props (#367)
- Date Picker
  - Fixed a bug that caused the date picker dialog window to ghost on small screen widths (#342)
- Dialog Window
  - Window no longer loses scroll position after opening a dialog window. (#386)
- DropDown Icon
  - Added closeOnMenuItemClick prop (#376)
- Flat Buttons
  - Fixed a styling bug with touch ripples.
- Icon Buttons
  - Fixed a styling bug with touch ripples. (#341)
- Menu Item
  - Link targets can now be set on menu items. (#350)
- Slider
  - Fixed percentage calculation in getInitialState (#382)
- Tabs
  - The onChange event now passed in the tabIndex, and tab to the callBack (#384)
- Text Field
  - Added onEnterKeyDown prop. (#328)
  - Fixed a bug with setting multiLine values (#356, #357)

## 0.7.0
###### *Feb. 13, 2015*

##### Breaking Changes
- Removed Icon component - Replaced with FontIcon and SvgIcon (#318, #125, #148)
  - The main motivation here is to give developers more control over which font icons to include
    in their project. Instead of automatically including all material design icons in material-ui,
    developers can now create their own custom icon font file and just pass the icon className into
    the FontIcon component. [Read more about FontIcons](http://www.material-ui.com/#/components/icons).
  - Upgrade path:
    - If you were using the Icon component before, you'll need switch to either using FontIcon or SvgIcon.
      For FontIcon, create a custom font file and include it in your project and just pass the Icon
      className into the FontIcon component. For SvgIcon, create a new React component that represents
      that particular icon. This will allow you to package your icons inside your js files. Examples
      can be found [here](https://github.com/mui-org/material-ui/tree/master/src/js/svg-icons).
    - Additionally, all components that had an icon prop now take an iconClassName prop instead. These
      include FloatingActionButton, IconButton, Menu, MenuItem, and DropDownIcon.

##### General
- All jsx files are now being compiled before publishing to npm. (#179, #215)

##### Components
- Buttons
  - Fixed a bug that cause onClick to not fire in Safari (#307)
  - You can now pass down children into all buttons. This allows you to add icons to flat and raised buttons
    or to add a file input element. (#323, #189)
- Menu Item
  - Fixed toggle display bug (#298)
  - Toggle props can now be passed in (#299)
- Slider
  - Removed inline style @import (#218)
- Switches
  - Switches now support focusability and can be focused/changed via keyboard inputs. (#292)
  - Added focus and touch ripple animations.
  - All switches use the labelPosition prop (as opposed to labelPositionRight), including RadioButtonGroup.
  - Added innerClassName prop. (#309)
- Tabs
  - Fixes width transition for ink bar (#280)
- Text Field
  - Fixed a bug with using valueLink with a multiline Text Field (#311)
  - Fixed a bug with multiline defaultValues in a multiline Text Field (#296)

## 0.6.1
###### *Jan. 26, 2015*

##### Fixes
- Checkbox & Toggle
  - Fixed a bug that caused checkboxes and toggles to not uncheck.

## 0.6.0
###### *Jan. 26, 2015*

##### General
- Fixed dependencies to prevent multiple versions of React getting loaded on the docs site (#194)

##### Deprecated
- Input - Please use TextField instead.

##### New
- Radio Button Group
  - This component was created to make it easier to work with groups of radio buttons (#151)
- Tabs
  - Added new Tabs component.
- TextField
  - This component replaces Input. It extends the native input element and will support all of
    its props and events. It also supports valueLink and can be controlled or uncontrolled.
  - MultiLine text fields now grow and shrink as the user inputs data.
  - Allow for both floating labels and hint text in the same input.
  - Floating labels now generate a label element.

##### Fixes
- AppBar
  - Added icon prop. (#250)
- Checkbox
  - Checkbox styling now matches material design specs
  - This component has been revamped and can now be controlled or uncontrolled.
- Date Picker
  - Fixed a bug with getDate() (#196)
  - Added onChange prop (#198)
- Dialog
  - Actions can now be passed in as an array of react elements. (#241)
- Menu Item
  - Menu Items now respond to onTouchTap
- Radio Button
  - Radio Button styling now matches material design specs
  - This component has been revamped and can now be controlled or uncontrolled.
- Slider
  - Fixed a css bug with slider handles (#225)
  - Added onDragStart and onDragStop props (#217)
- Snackbar
  - Fixed Ghost hidden snackbar (#235)
- Toggle
  - This component now extends a native input checkbox.
  - It can now be controlled or uncontrolled.
- Toolbar
  - Fixed FlatButton positioning inside toolbar (#224)

## 0.5.0
###### *Jan. 3, 2015*

##### Breaking Changes
- Removed lesshat dependency. Be sure to change your build process to include an
  [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer).

##### Components
- Buttons
  - Ripple animations are much faster now. The animation starts onMouseDown or onTouchStart
    and completes onMouseUp or onTouchEnd. Now we can spam buttons all day long. :)
  - Spacebar key up triggers button clicks. (#155)
- Slider
  - Changed slider cursor (#187)
- Snackbar **(New)**
  - Added a snackbar component.

## 0.4.1
###### *Dec. 25, 2014*

##### General
- Updated to react 0.12.2; browserify 7.0.3
- Fixed ripple animation on Firefox (#129)
- Updated red, green, and blue color variables to match specs (#177)

##### Components
- Buttons
  - Added secondary button colors
  - Removed underline styles on link buttons (#172)
- Date Picker **(New)**
  - Added new date picker component.
  - Dialog version is implemented, inline version to follow in upcoming release.
  - Has both portrait and landscape modes.
  - Keyboard support: arrow keys advance dates, shift+arrow advances month.
- Dialog
  - Dialog actions now generate buttons with secondary colors.
  - Added contentClassName prop. This is used to style the actual dialog window.
    For example, setting its width.
  - Dialog contents no longer are removed from the DOM when the dialog is dismissed.
  - Disabled scrolling when the dialog window is open.
- Input
  - Added disabled input styles (#140)
  - Added blur() method
  - Added support for email input type (#170)
  - Fix textarea placeholder focus exception (#170)
  - Added mui-is-not-empty class when the input isn't empty (#170)
- Slider
  - Trigger onChange when clicking on slider (#153)

## 0.4.0
###### *Dec. 15, 2014*

##### Breaking Changes
- Removed PaperButton - Use FlatButton, RaisedButton, or FloatingActionButton
- Removed Roboto font import (#104) - Be sure to [include the Roboto](http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500) font in your project.

##### General
- Added react-draggable2 dependency

##### Components
- Buttons
  - Added linkButton functionality (#130)
- Icon Buttons
  - Added tooltip functionality
- Input
  - Added method to set focus
- Left Nav
  - Added method to open left nav panel
- Radio Button
  - Added defaultChecked prop
- Slider (New)
  - Added slider component
- Toggle
  - Updated styles to match material design specs

## 0.3.3
###### *Dec. 7, 2014*

##### General
- Added a basic example project in /example

##### Components
- Dialog
  - Actions are now real buttons
  - Added transitions
  - Prefixed classNames with mui
  - Cleaned up styles
- Input
  - Fixed a bug that caused placeholder to not show on focus (#112)
  - Placeholders can now be displayed in-line by setting inlinePlaceholder to true.
  - The initial number of rows can now be set with the rows prop.
- Toggle
  - Fixed alignment issue (#118)
  - The inital state of the toggle can now be set with the toggled prop.

## 0.3.2
###### *Nov. 30, 2014*

##### General
- Upgraded dependencies: react 0.12.1, browserify 6.3.3, reactify: 0.17.1

##### Components
- Dialog
  - Added key prop to dialog actions. (#99)
  - Added onDismiss event callback. (#86)
  - Dialog is now positioned onMound and onUpdate (#85)
  - Fixed a bug that cuased dialog to not be vertically centered on long pages
- Dropdown Menu
  - Added autoWidth prop (#89)
- Menu
  - Added autoWidth prop
- Nested Menu
  - Fixed bug that caused some nesteed menus to not show. (#88)
- Paper
  - Updated to use spread operator
- Radio Button
  - Fixed radio button label styles. (#94)
- Ripple
  - Account for page scrolling on ripple animation. (#93)

## 0.3.1
###### *Nov. 28, 2014*

##### General
- Removed browserify react addons alias. (#68)

##### Components
- FlatButton, RaisedButton, and FloatingActionButton (NEW)
  - These buttons will replace the current PaperButton which will be
    depreciated in v.0.4.0.
  - They generate actual button tags, are keyboard focusable and listen
    to onTouchTap. (#50, #61)
- Icon Button
  - Pressing enter when the button is in focus now fires onTouchTap
  - Added dark theme ripple colors
  - Focus and click animations now use Scale Transforms to improve performance.
- Input
  - Added support for ReactLink and use JSX spread attributes
  - Error messages are now props instead of internal states (#95)
- LeftNav
  - Pressing ESC now closes the left nav
- PaperButton
  - Will be depreciated in v.0.4.0.
- Radio Button
  - Fixed toggle bug. (#70)

##### Mixins
- WindowListenable is now available from Mixins.WindowListenable

##### Utils
- Added KeyCodes constants

## 0.3.0
###### *Nov. 17, 2014*

##### General
- Updated Browserify & Reactify versions
- Enabled reactify es6 transformations
- Removed jQuery dependency (#25)
- Added reaact-tap-event-plugin dependency

##### Components
- Dialog
  - Width is now determined by content
  - Position is centered horizontally inside parent container
  - Pressing Esc now closes the dialog (#35)
- Dropdown Menu
  - Added underline (#39)
  - Fixed display problem on double click (#43)
- Icon
  - Transfer all props to underlying span
- Icon Button (New)
  - Buttons...that are icons. :)
- Input
  - Added required, min, max and step
- LeftNav
  - Fixed left nav style when docked (#36)
  - Transition now uses translate3d instead of left
  - Overlay now listens to onTouchTap
- Menu Items
  - Added user select none styles (#45)
- Paper
  - Added onMouseOver & onMouseOut props
- Toolbar
  - Items are now passed in as children instead of groupItem prop

##### Mixins
- Added WindowListenable. Allows listening to window events.

##### Utils
- Added Dom and Events utility functions
- Fixed a bug that caused CSS Events to bind twice

##### Less
- Added media query variables
- Added no-wrap mixin
- Removed unnecessary style resets
- Removed tab highlight color on all elements

## 0.2.2
###### *Nov. 11, 2014*
- Changed project structure to be less confusing. Material-UI components/styles live in the src directory.
  Docs site code lives in the docs directory. This still allows us to easily test components in the docs site
  as we are working on them
- Added .editorconfig to help keep code formatting consistent among contributors. See http://editorconfig.org/
- Fixed drop down display issue in safari
-  Fixed nested menu arrow icon
-  Added hover transitions to menus
- Improved ripple animation on buttons

## 0.2.1
###### *Nov. 8, 2014*
- Fixed icon font reference. We're now including it as part of the project
  instead of an npm dependency.

## 0.2.0
###### *Nov. 7, 2014*
- Icon
  - Added all font icons from the unoffical material design icon font:
    https://github.com/designjockey/material-design-fonticons
  - All icon names had to change because of this. Sorry. :(
- PaperButton
  - Added href prop
  - Css fixes
- Dialog
  - Added onShow event
  - Children contents of the dialog is only rendered if the dialog is opened
- LeftNav
  - Fixed a bug that caused docked LeftNav component to close on menu click
  - Removed isInitiallyOpen prop
- Input
  - onLineBreak event now passes back event (e) on callback

## 0.1.29
###### *Nov. 5, 2014*
- css fix on paper component
- hover transition fix on buttons
- removed selected state on drop down icon component
- css fix on left nav component
- added prop on left nav component to allow left nav to be docked and hidden
