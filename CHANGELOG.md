## HEAD

Changes. Changes everywhere!

## 1.0.0-beta.4
###### _Aug 5, 2016_

Big thanks to the 7 contributors who made this release possible.

##### Component Fixes / Enhancements

- [Grid] Add baseline to container's align property (#7623) @kgregory
- [GridList] Migrate to v1 branch (#7626) @mbrookes
- [ListItemText] Repurpose text class (#7645) @kgregory
- [Drawer] Fix docker warning (#7598) @oliviertassinari
- [Drawer] Fix Chrome regression (#7599) @oliviertassinari
- [style] Fix HMR issue with react-hot-loader (#7601) @oliviertassinari
- [ButtonBase] Explicit the need for a class component (#7656) @oliviertassinari
- [Modal] Take into account the body margin (#7666) @oliviertassinari
- Fixes in the subway (#7661) @oliviertassinari

##### Docs

- [docs] Fix language issues for clarity (#7610) @skirunman
- [docs] Update docs for <RadioGroup> (#7640) @sebald
- [docs] Fixed "initial" word in vars and typo (#7639) @kybarg
- [docs] Spell check eslint script (#7643) @kybarg
- [docs] Fix audit issues (#7595) @oliviertassinari
- [docs] Show how to use the insertionPoint (#7611) @oliviertassinari

##### Core

- [flow] Export type Props for composability (#7609) @rosskevin
- [typescript] Add TS typings (#7553) @sebald
- [typescript] Improve the coverage (#7606) @sebald
- [core] Add isMuiComponent helper (#7635) @katzoo

## 1.0.0-beta.3
###### _Jul 29, 2017_

Big thanks to the 8 contributors who made this release possible.

This release is full of bug fixes and documentation improvements following the major
styling update of the previous release.

##### Component Fixes / Enhancements

- [Drawer] Fix docked not inheriting props (#7590) @foreggs
- [Dialog] Better fullscreen fix (4deee4b5e3465682996d4dce35e5c60fd040502b) @oliviertassinari
- [List] Fix padding issue (#7529) @markselby9
- [test] Remove dead code (4e2cf38ae3181cf38a5796179bfb2887c402b4ac) @oliviertassinari
- [flow] Fix wrong import (5a88d950bb3e9c7105cfa6b45c796d167827f1d7) @oliviertassinari
- [Tabs] Fix Scroll button visibility state when child tab items are modified (#7576) @shawnmcknight
- [TextField] Forward the id to the label & more (#7584) @oliviertassinari
- [ios] Fix some style issue with Safari iOS (#7588) @oliviertassinari

##### Docs

- [docs] Add example with Create React App (#7485) @akshaynaik404
- [docs] Minor tweaks to grammar of CSS in JS page (#7530) @mbrookes
- [docs] Server side fix docs (91a30ee2276d8d06776f6fba831930568974dacc) @oliviertassinari
- [docs] Fix 'colors' path in imports (#7519) @burnoo
- [docs] Some fixes after the latest upgrade (#7528) @oliviertassinari
- [docs] Update for supported components (#7586) @skirunman
- [docs] Fix small issues I have noticed (#7591) @oliviertassinari
- [docs] Optional style sheet name (#7594) @oliviertassinari
- [docs] Use flow weak on the demos as we can't expect users to have flow (cd25e63a214c37ed7945e31aa9b08f02baa17351) @oliviertassinari

##### Core

- [core] Support react@16.0.0-beta.1 (#7561) @oliviertassinari
- [core] Small fixes of the styling solution (#7572) @oliviertassinari
- [core] Better themingEnabled logic (#7533) @oliviertassinari
- [core] Upgrade dependencies and build for the supported targets (#7575) @oliviertassinari
- [core] Upgrade dependencies (#7539) @oliviertassinari
- [flow] Increase coverage (6f4b2b3b3773ace568de54aaefbca963ab408b40) @oliviertassinari

## 1.0.0-beta.2
###### _Jul 23, 2017_

Publish a new version as `v1.0.0-beta.1` was already used.

## 1.0.0-beta.1
###### _Jul 23, 2017_

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

##### Breaking changes

- [core] Improve styling solution (#7461)

The `styleManager` is gone. The server side rendering configuration changed, use the `sheetManager` instead. The documentation was updated, you can refer to it if needed.

##### Component Fixes / Enhancements

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

##### Docs

- [docs] Fix minor typo (#7476) @jeffbirkholz
- [docs] Mark items on the supported components page as done (#7492) @Airblader
- [docs] Update help for 'overriding' to specify injection point (#7505) @cdharris
- [docs] Add next.js example (#7510) @oliviertassnari
- [docs] Selection control custom colors (#7516) @oliviertassnari

##### Core

- [core] Ignore the package-lock.json file generated by npm (#7502) @Airblader

## 1.0.0-alpha.22
###### _Jul 18, 2017_

##### Breaking changes

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

##### Component Fixes / Enhancements

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
- [Snackbar] Handle inactive tabs (#7420) @

##### Docs

- [docs] Color import correction (#7398) @wieseljonas
- [docs] Fix typo (#7338) @adamborowski
- [docs] Fix the path of imported colors (#7348) @shug0
- [docs] Update documentation to reflect component name (#7406) @the-noob
- [docs] Better warning message for missing MuiThemeProvider (#7429) @oliviertassinari
- [docs] Add @param everywhere (#7432) @oliviertassinari

##### Core

- [flow] global dom element workaround (#7401) @rosskevin
- [core] Add size-limit (#7422)
- [core] Upgrade some dependencies (#7361) @oliviertassinari
- [core] Upgrade dependencies (#7433) @oliviertassinari
- [icons] Upgrade the dependencies (#7385) @oliviertassinari

## 1.0.0-alpha.21
###### _Jul 4, 2017_

##### Breaking changes

- [core] Reduce the bundle size (#7306) @oliviertassinari
Change the colors location as you most likely only need 20% of them in your bundle
```diff
-import { blue, fullWhite } from 'material-ui/styles/colors'
+import blue from 'material-ui/colors/blue'
+import common from 'material-ui/colors/common'
+const { fullWhite } = common
```

##### Component Fixes / Enhancements

- [TextField] Fix textarea disabled support (#7255) @Calcyfer
- [withStyles] Provide context for withStyles classes error (#7274) @rosskevin
- [misc] Improve various points (#7275) @oliviertassinari
- [Snackbar] Documentation - key property (#7307) @rosskevin
- [Snackbar] Expose transition onExited to allow for consecutive messages with completed transitions (#7308) @rosskevin
- [Chip] Fix Firefox issue with the svg icon (#7327) @oliviertassinari
- [ButtonBase] Use color inherit by default (#7331 @oliviertassinari
- [Input] Add a fullWidth property (#7329) @oliviertassinari

##### Docs

- [docs] Improve the documentation regarding material.io/icons (#7323) @oliviertassinari
- [docs] Fix MobileStepper API (#7299) @ng-hai

##### Core

- [core] Reduce the bundle size (#7306) @oliviertassinari
- [test] Should get coverage (#7272) @oliviertassinari
- [core] Expand use of flow (#7268) @rosskevin

## 1.0.0-alpha.20
###### _Jun 25, 2017_

Do you like playing with bleeding-edge tech?
We do, we have extended the support of React to the 16.0.0-alpha.13 release (aka Fiber).

##### Breaking changes

- [Paper] Use normalized root over paper className (#7198) @oliviertassinari
- [core] Follow the same convention as React for the umd build (#7217) @oliviertassinari

##### Component Fixes / Enhancements

- [material-ui-icons] v1.0.0-alpha.19 (21b67cec3b200517c9dfdf4d28c0bfc2d1dceeaa) @oliviertassinari
- [Input] Fix incorrect type of autoFocus prop (#7189) @gnapse
- [Icons] Modernize icons package (#7203) @kvet
- [Input] Fix various styling issue #7209 @oliviertassinari
- [Tabs] Add a primary color and update the docs (#7242) @oliviertassinari
- [ListItem] Use the .shortest duration (#7246) @oliviertassinari
- [Dialog] Also take fixed element into account (#7239) @oliviertassinari
- [Drawer] Fix first mount transition issue (#7236) @oliviertassinari

##### Docs

- [docs] Fix typo in class name (#7192) @ossan-engineer
- [docs] Add supported server section (#7231) @oliviertassinari
- [docs] Detail the browser support (#7188) @oliviertassinari
- [docs] Upgrade to webpack v3 (#7210) @oliviertassinari
- [docs] More documentation on the typography (#7248) @oliviertassinari

##### Core

- [test] Even faster CI build (#7230) @oliviertassinari
- [styles] Export more functions (#7241) @oliviertassinari
- [react] Support 16.0.0-alpha.13 (#7218) @oliviertassinari
- [core] x2 speed up on the build (#7220) @oliviertassinari
- [babel] Use transform-object-assign over a custom one (#7219) @oliviertassinari
- [core] Some fixes (#7216) @oliviertassinari

## 1.0.0-alpha.19
###### _Jun 19, 2017_

The previous v1.0.0-alpha.18 release is corrupted.

##### Component Fixes / Enhancements

- [Typography] Expose a headlineMapping property (#7183) @oliviertassinari
- [Typography] Add a accent color variation (#7183) @oliviertassinari
- [FormControl] Fix wording (#7183) @oliviertassinari
- [Toolbar] Simplify breakpoint logic (#7183) @oliviertassinari
- [Button] Fix upload button demo (#7183) @oliviertassinari
- [TextField] Forward the placeholder (#7183) @oliviertassinari
- [MobileStepper] Improvements (#7179) @alexhayes
- [MobileStepper] Fix the wordings (#7183) @oliviertassinari
- [AppBar] Use a header instead of a div DOM element (#7183) @oliviertassinari

##### Docs

- [docs] Update minimizing-bundle-size.md (#7169) @kazazor
- [docs] Info on how to use the breakpoints attribute in the theme (#7172) @alexhayes
- [docs] Add a supported browsers section (#7174) @oliviertassinari
- [docs] We don't require any polyfill (#7183) @oliviertassinari
- [docs] Exposes the 3 Babel plugins available for minimising the bundle size (#) @oliviertassinari
- [docs] Fix MATERIAL_UI_PORT not fully supported

##### Core

- [core] Add missing flow import (#7180) @oliviertassinari

## 1.0.0-alpha.18
###### _Jun 19, 2017_

##### Breaking changes

- [TextField] Add a marginForm property (#7113) @oliviertassinari
This change makes the extra margin of the component optional.
It's making us following less closely the specification but provides more flexibility out of the box.
- [core] Remove some no longer needed properties (#7132) @oliviertassinari
Use the `classes` property over the removed `xxxClassName`.
- [Button] Implement the dense option over the compact one (#7147) @oliviertassinari

##### Component Fixes / Enhancements

- [SvgIcon] set focusable=false to fix IE tab navigation (#7106) @petermikitsh
- [Dialog] Remove css width as it is too prescriptive for simple dialogs (#7115) @oliviertassinari
- [BottomNavigation] Fix type error when onChange is not defined (#7139) @seasick
- [TextField] Better support number value type (#7162) @oliviertassinari
- [ButtonBase] Normalize ripple to disableRipple (#7159) @oliviertassinari

##### Docs

- [docs] Document the Label wrappers (#7161) @oliviertassinari

##### Core

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
###### _Jun 12, 2017_

Big thanks to the 8 contributors who made this release possible.

##### Breaking changes

- [core] Normalize the API (#7099) @oliviertassinari
Reduce degree of freedom of the API with the color property. That's a tradeoff between correctness and verbosity.
People should be able to recover from that breaking change quite easily as react is going to throw warnings. For instance:
```diff
-<Button contrast primary>Login</Button>
+<Button color="contrast">Login</Button>
```

##### Component Fixes / Enhancements

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

##### Docs

- [docs] Add testing section (#7101) @oliviertassinari
- [docs] Show the vision in the docs (#7078) @oliviertassinari
- [docs] Improve the documentation on the classes property (#7062) @oliviertassinari
- [docs] Improve accessibility in the component examples (#7047) @tuukkao
- [docs] Update usage.md "Hello World" :| (#7027) @dphrag
- [docs] Add link to the temporary alpha docs (#7037) @peteratticusberg

##### Core

- [eslint] Loosen no-unused-vars eslint rule (#7064) @yuchi
- [core] Various fixes (#7028) @oliviertassinari

## 1.0.0-alpha.16
###### _Jun 1, 2017_

This release is mainly about bug fixes and improving the documentation.
Shout out to @kybarg for the update of the `TextField` in order to better follow the spec (#6566).

##### Component Fixes / Enhancements

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

##### Docs

- [docs] Add a VISION.md file (#6982) @oliviertassinari
- [docs] Grid docs should refer to Hidden component/demo (#6963) @kgregory
- [docs] Fix grammar/verbiage on customization/themes page (#6943) @drusepth
- [docs] Change text for link (#6977) @sghall
- [docs] Some grammar/text edits (#6976) @sghall
- [docs] Suggested text changes (#6978) @sghall
- [docs] Fix MuiThemeProvider documentation (#6989) @viotti
- [docs] Fix TableRow persistent background when clicked (#7001) @sajal50
- [docs] Add an example with a decorator (#7011) @uufish

##### Core

- [npm] Fix react-scrollbar-size issue (#7009) @oliviertassinari
- [transitions] Add test coverage for the transition validation functions (#6936) @Alex4S
- [eslint] enable flow's built-in types (#6946) @rosskevin
- [test] Upgrade the docker versions (#6979) @oliviertassinari

## 1.0.0-alpha.15
###### _May 23, 2017_

This release introduces an important change in the API and the implementation.
Each exposed component is wrapped with a `withStyles` Higher-order component.
This HOC has different responsibilities, the one you gonna be interested in is
regarding the `classes` property. Now, we consider the CSS as a public API.
You now have two way to customize absolutely all the CSS injected by Material-UI.
Either the instance level with the `classes` property or the class level with the
`overrides` theme property.

To [learn more about it](https://material-ui-1dab0.firebaseapp.com/customization/overrides), have a look at the documentation. Also, these options are automatically [documented](http://0.0.0.0:3000/component-api/button#classes).

##### Breaking changes

- [core] Various fixes after using it on a real project (#6882) @oliviertassinari
Apply the other properties (undocumented) on the root of the Menu.
- [core] Add a new classes property to all the components #6911 @oliviertassinari
If you where using the ref to access the internal of the component or native elements,
you gonna have to change your strategy, either use `innerRef` or `inputRef`.

##### Component Fixes / Enhancements

- [Typography] Add missing style (#6873) @oliviertassinari
- [Dialog] create responsive HOC `withResponsiveFullScreen` (#6898) @rosskevin
- [core] Remove usage of 'not-allowed' (#6932) @oliviertassinari
- [Switch] Remove the blue flash of death (#6933) @oliviertassinari
- [TextField] Fix the inputClassName property (#6934) @oliviertassinari

##### Docs

- [docs] Enable flow on much more demos (#6881) @oliviertassinari
- [docs] Better support IE11 (#6880) @oliviertassinari
- [Tabs] Document that the index is required (#6935) @oliviertassinari

##### Core

- [eslint] enforce import plugin rules (#6923) @rosskevin
- [core] Change style API (#6892) @oliviertassinari
- [eslint] Fit closer to airbnb (#6894) @oliviertassinari
- [core] Upgrade the dependencies (#6872) @oliviertassinari
- [core] Add prettier (#6931) @oliviertassinari

## 1.0.0-alpha.14
###### _May 14, 2017_

##### Breaking changes

- [Hidden] Remove one degree of freedom (#6820) @oliviertassnari
- [Hidden] Logical fixes for up/down (#6839) @rosskevin

##### Component Fixes / Enhancements

- [Icon] Add aria-hidden (#6829) @oliviertassinari
- [Paper] Add elevation boundaries (#6817) @oliviertassinari
- [Paper] Add a component property (#6830) @oliviertassinari
- [Transition] Add flow proptypes (#6846) @rosskevin
- [npm] Upgrade the recompose dependency (#6855) @oliviertassinari
- [TextField] Add in support for multiline text fields (#6553) @peteratticusberg
- [TextField] Second iteration on multilines (#6859) @oliviertassinari

##### Docs

- [docs] Fix link to material-ui-icons (#6825) @NiloCK
- [docs] Add a direct link to GitHub (#6861) @oliviertassinari

##### Core

- [coverage] Remove the flow plugins as they were not needed (#6816) @rosskevin
- [ButtonBase] Add test coverage for instance.focus (#6827) @agamrafaeli
- [ButtonBase] Add test coverage for handleFocus (#6828) @agamrafaeli
- [flow] Fix small issues (#6860) @oliviertassinari

## 1.0.0-alpha.13
###### _May 8, 2017_

##### Breaking changes

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

##### Component Fixes / Enhancements

- [Slide] Fix getTranslateValue for left & up cases (#6454) @josulliv101
- [Hidden] Responsively hide content (js implementation) (#6748) @rosskevin
- [Hidden] Fixes, demos, regression tests, and `only` functionality (#6782) @rosskevin
- [Layout] Add a hidden property (#6754) @rosskevin
- [Typography] Flow type (#6787) @rosskevin

##### Docs

- [palette] Require color shape that matches defaults (#6756) @kgregory
- [docs] Document the Theme section (#6810) @oliviertassinari
- [docs] Add a search bar (#6745) @oliviertassinari
- [docs] Generate a summary of each section (#6772) @oliviertassinari
- [docs] Start addressing documentation issues (#6758) @oliviertassinari
- [docs] Hide the context implementation details (#6798) @oliviertassinari

##### Core

- Expanding use of flow for propType, include flow types in package, add flow-typed (#6724) @rosskevin
- [core] Fix flow propTypes generation issue (#6749) @oliviertassinari
- [createShallow] Remove cleanup (#6797) @agamrafaeli

## 1.0.0-alpha.12
###### _Apr 30, 2017_

Big thanks to the 11 contributors who are pushing the `next` branch forward.

##### Breaking changes

- [Typography] Rename Text to Typography (#6667) @oliviertassinari
- [Radio] Change checked color to primary (#6683) @khayong

##### Component Fixes / Enhancements

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

##### Docs

- [docs] Fix the example "Usage" to match new Button component (#6692) @artarmstrong
- [docs] Fix theme toggling (#6652) @nathanmarks
- [TextField] Add password example to docs (#6637) @peteratticusberg
- [docs] Fix layout edit button (4b5fedf902704b5e3dd2dba63fc2263f11e975d0) @oliviertassinari
- [docs] Fix IE11 issue (6ad3354ec1a844d0f03bf890a5e73a7987179be7) @oliviertassinari

##### Core

- [material-ui-icons] Modernize the package (#6688) @oliviertassinari
- [core] Also take the demo into account for the regressions tests (#6669) @oliviertassinari

## 1.0.0-alpha.11
###### _Apr 14, 2017_

##### Component Fixes / Enhancements

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

##### Docs

- [package.json] Add test:unit:grep (#6586) @agamrafaeli
- [docs] Fix build:docs command (#6606) @oliviertassinari

##### Core

- [utils] Remove throttle (#6545) @agamrafaeli
- [react] Upgrade to React@15.5.3 (#6543) @oliviertassinari
- [core] Remove one babel transform as require the Symbol polyfill (#6602) @oliviertassinari
- [core] Add missing babel-runtime dependency (#6535) @oliviertassinari
- [core] Random small fixes (#6522) @oliviertassinari
- [test] Makes sure argos run even if diff fails (#6512) @oliviertassinari

## 1.0.0-alpha.10
###### _Apr 6, 2017_

We are continuing investing in the documentation and the test suite.

Visual regression tests are now sent to [argos-ci](https://www.argos-ci.com/callemall/material-ui).
Thanks @agamrafaeli for increasing the test coverage of 1% since the last release (95.23%).
Thanks @mbrookes for fixing the inconsistency of the API and improving the API.

##### Breaking changes

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

##### Component Fixes / Enhancements

- [TextField] Forward name props to the input (#6469) @nvma
- [MuiThemeProvider] Add test for for componentWillUpdate (#6474) @agamrafaeli
- [styles.breakpoints] Add test for `only()` calling 'xl' (#6475) @agamrafaeli
- [Menu] Add tests for handleEnter() (#6477) @agamrafaeli
- [transitions] Add test coverage for getAutoHeightDuration (#6507) @agamrafaeli
- [Popover] Add test for getoffset (#6510) @agamrafaeli
- [breakpoints] Fix down function, eliminate overlap (#6504) @kgregory

##### Docs

- [docs] Add missing prop descriptions to all components (#6483) @mbrookes
- [docs] Link version number to release notes (#6486) @mbrookes
- [docs] Link between sections (#6480) @oliviertassinari
- [docs] Add a 'edit this page' button (#6482) @oliviertassinari
- [docs] Display the current version (#6481) @oliviertassinari
- [docs] Upgrade the dependencies (567a35ea3d2aa634a3072fb8b0151c9890551447) @oliviertassinari

##### Core

- [test] Fix import paths for theme and MuiThemeProvider (#6493) @joefitzgerald
- [test] Add argos-ci (#6391) @oliviertassinari
- [test] Add HTML reporting of coverage from npm (#6479) @agamrafaeli
- [TouchRipple] Remove react-addons-transition-group (#6514) @ykzts
- [core] Do not output any .map file (#6478) @oliviertassinari

## 1.0.0-alpha.9
###### _Apr 1, 2017_

##### Component Fixes / Enhancements

- [Tab] Add labelClassName property (#6436) @rogeliog
- [test] Fix absolute path in createShallow (444c60392550fe73bb3492ba0ebb63473c73162a) @oliviertassinari
- [material-ui-icons] Reinstate README and update scripts, update installation.md (#6448) @mbrookes
- [Input] Add test for focus() (#6461) @agamrafaeli
- [Input] Add test for componentDidMount() (#6462) @agamrafaeli
- [RadioGroup] Add tests for edge cases (#6409) @agamrafaeli
- [RadioGroup] Add missing teardown in test (8005d9d9b98ed58a041a9e49931fd88cb48687e2) @oliviertassinari
- [Ripple] Add a new test for the unmount logic (#6434) @oliviertassinari

##### Docs

- [docs] Add API menu and demo button (#6455) @mbrookes
- [docs] Link to the Collapse documentation (#6464) @JeremyIglehart
- [docs] Fix api.md indentation (#6468) @solkaz

##### Core

- [core] Upgrade the dev dependencies (#6435) @oliviertassinari
- [test] Takes the Menu as an example in the test documentation (d13607581dc2bf6c86e88721c2d177b8b8b2d004) @oliviertassinari
- [Layout] Extract requireProp to utils (#6473) @agamrafaeli


## 1.0.0-alpha.8
###### _Mar 25, 2017_

A big thanks to @agamrafaeli for increasing the test coverage by 4%.
We are now at 93.53%. That's pretty great.

##### Component Fixes / Enhancements

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

##### Docs

- [docs] Use material-ui-icons package (#6390) @mbrookes

##### Core

- [SvgIcons] Update build (#6375) @mbrookes

## 1.0.0-alpha.7
###### _Mar 12, 2017_

##### Component Fixes / Enhancements

- [Slide] Fix displaying when in=false at first (#6223) @ArcanisCz
- [Ripple] Improve the animation (#6248) @oliviertassinari
- [color] Add missing blueGrey color (#6255) @Shahrukh-Zindani
- [Table] Fix paddings according to guidelines (#6306) @kybarg
- [Table] Replace font icon to svg icon in sort label (#6321) @kybarg
- [Table] Add visual regression tests (#6325) @oliviertassinari
- [Button] Use faded text color for hover state (#6320) @mbrookes

##### Docs

- [docs] Add a Color section (#6254) @Shahrukh-Zindani
- [docs] Add information to typography (#6266) @Shahrukh-Zindani

##### Core

- [test] Server side render some element to be sure (#6328) @oliviertassinari
- [npm] Add correct extension (#6241) @okvic77
- [core] Rename travis to circle as we migrated (e7fba22bd19f82f5489cb52eaaaaff23f2f57939) @oliviertassinari
- [core] Fix docs:start command on Windows (#6307) @kybarg
- [core] Upgrade the npm dependencies (#6327) @oliviertassinari

## 1.0.0-alpha.6
###### _Feb 26, 2017_

##### Core

- [core] Fix component wrong propType (03f0fdc627951b5ddd3b28bd1a4cbdcee96f2a1c) @oliviertassinari

## 1.0.0-alpha.5
###### _Feb 26, 2017_

##### Core

- [core] Fix propTypes usage (9a220173a59e51108f7ee9d059a312f174113ac2) @oliviertassinari

## 1.0.0-alpha.4
###### _Feb 26, 2017_

##### Component Fixes / Enhancements

- [Button] Fix boxSizing when not rending a native button (#6224) @oliviertassinari
- [Divider] Fix negative margin causes overflow/scrollbars (#6139) @giuseppeg
- [LinearProgress] Add an accessibility property (#6155) @oliviertassinari
- [Text] Add more option to the align property (#6153) @oliviertassinari
- [icon-builder] Update to generate standalone package (#6104) @mbrookes
- [style] transitions theme API reworked (#6121) @ArcanisCz
- [svg-icons] Change target package name (#6184) @mbrookes
- [transitions] Fix an unknown property warning (#6157) @oliviertassinari
- [transitions] Fix allowing fraction numbers as delay/duration (#6221) @ArcanisCz

##### Docs

- [docs] Use webpack 2 & dll bundle (#6160) @nathanmarks
- [docs] Improve the user experience on mobile (#6154) @oliviertassinari
- [docs] Fix the Table examples on mobile (425d8ed47e0282b8c0409517c53e00ef61374b02) @oliviertassinari
- [docs] Add an API section (#6239) @oliviertassinari
- [docs] Normalize the container property (#6238) @oliviertassinari

##### Core

- [core] Fix typos in styles/transitions pointed out in issue (#6175) @Shahrukh-Zindani
- [core] Lightweight the build (#6152) @oliviertassinari
- [core] Add exports to index.js for inclusion in webpack bundle (#6144) @fkretzer
- [test] Integration of test suite to run on BrowserStack (#6236) @oliviertassinari
- [test] Bump vrtest version for exit code fix (1831aa76fe72e9b22a0b82f2a360f860ca89fdce) @nathanmarks

## 1.0.0-alpha.3
###### _Feb 12, 2017_

##### Component Fixes / Enhancements

- [Button] Make the node isRequired (#6095) @oliviertassinari
- [TextField] value propType (#6091) @mntbkr
- [TextField] Fix width issue (#6096) @oliviertassinari
- [TextField] Add an inputProps property (#6111) @oliviertassinari
- [Checkbox] Not selecting label text on quick clicks (#6097) @ArcanisCz
- [Tabs] Add a disabled property (#6112) @irfanhudda
- [Paper] Rename zDepth -> elevation everywhere (#6116) @ArcanisCz

##### Docs

- [docs] Add simple example in the Badge API (#6117) @stunaz
- [docs] Add a Drawer section (#6113) @ArcanisCz

##### Core

- [core] Simplify test suite and use vrtest for regressions (#6122) @nathanmarks
- [core] Prefix stylesheet names to prevent collisions (#6110) @oliviertassinari
- [core] Remove stringOrNumber propTypes (#6109) @oliviertassinari

## 1.0.0-alpha.2
###### _Feb 7, 2017_

One year from now, we were struggling with removing all the mixins from the project.
Now, it's about rewriting all our components.
We gonna try doing frequent alpha releases to keep some intertie. At least once per week would be good.
As always, we are keeping the [documentation](https://material-ui-1dab0.firebaseapp.com) up to date.

##### Component Fixes / Enhancements

- [Badge] Port the Badge Component (#6043) @stunaz
- [Layout] Warn about wrong usage of the item & container combination (#6040) @oliviertassinari
- [Layout] Explicit the box-sizing dependency (#6036) @oliviertassinari
- [Drawer] Open/close animation easing and timing (#6066) @ArcanisCz

##### Docs

- [docs] Add a composition section (#6049) @oliviertassinari
- [docs] Explain how to use the visual regression tests (#6050) @oliviertassinari
- [docs] Improve the Server Rendering section (#6070) @oliviertassinari

## 1.0.0-alpha.1
###### _Jan 28, 2017_

This is the first public alpha release. It's still work in progress.
People will be able to start giving us feedback with this release.
Please keep in mind that [semver](https://docs.npmjs.com/getting-started/semantic-versioning) won't be respected between pre-releases.
In other words, the API will change if we need to.

## 0.16.7
###### _Jan 15, 2017_

A big thanks to the 20 contributors who are making this release possible.

##### Component Fixes / Enhancements

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

##### Docs

- [docs] Add payment components to Related projects (#5849) @lorensr
- [docs] Add showcase for "humorista.org" (#5859) @minas1
- [docs] Fix broken link (b7d9a373320b49f62e47f4e2e5ca4aa882265904) @oliviertassinari
- [docs] Fix spelling mistake in PropTypeDescription.js (#5883) @Jbarget
- [docs] Fix typo (#5889) @lucasbento
- [docs] It is exciting (#5831) @ratson
- [Tabs] Fix typo in initialSelectedIndex prop description (#5923) @neonray
- [withWidth] Fix typo in the withWidth.spec.js (#5836) @frooeyzanny

##### Core

- [test] Use simpler assert API (e017d365f45b07933e8b896f95d6d1455b666516) @oliviertassinari

## 0.16.6
###### _Dec 25, 2016_

We are releasing sooner than we use to for this **special day** :christmas_tree::gift:.
17 contributors are making that last release of the year possible.

2016 has been an exceptional year for Material-UI.
- We went from 40k to 180k [downloads](https://npm-stat.com/charts.html?package=material-ui&from=2014-12-24&to=2016-12-25) a month. :package:
- We went from 12k to 22k [stars](http://www.timqian.com/star-history/#callemall/material-ui). :star:

That wouldn't have been possible without this awesome community.
**Thank you!**

But this's just the beginning, some [exciting stuff](https://github.com/callemall/material-ui/blob/master/ROADMAP.md) is coming in 2017 :sparkles:.
You can preview a **very early** version of the `next` branch following [that link](https://material-ui-1dab0.firebaseapp.com).

##### Component Fixes / Enhancements

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

##### Docs

- [AutoComplete] Add a controlled example (#5795)
- [Slider] Add onChange callback signatures to docs (#5760)
- [TextField] Add callback signatures to docs (#5804)
- [docs] Add link to babel-plugin-material-ui (#5754)
- [docs] Node is written mostly in C++, not in C (#5776)
- [docs] Remove redundant words (#5778)
- [docs] Add showcase item - Realty Advisors Elite (#5806)

##### Core

- [core] Add support for Webpack 2/Rollup tree shaking in `svg-icons` sub module (#5774)

## 0.16.5
###### _Dec 9, 2016_

This is another release improving the stability of `v0.16.x`.

##### Component Fixes / Enhancements

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

##### Docs

- [docs] Add a Q&A section around the next branch (#5718)
- [docs] Fix typo with sentence for AutoComplete (#5596)
- [docs] Fix origin documentation (#5676)
- [docs] Fix Linear Progress Prop Documentation (#5680)
- [docs] Fix a scroll issue on (iOS) (a12dca847af6833dbf671e48c736047d6909ec53)

##### Core

- [core] Apply 3 different fixes (#5695)

## 0.16.4
###### _Nov 17, 2016_

##### Component Fixes / Enhancements

- [npm] Rollback the react dependency path to `v15.0.0` (417913e41fbc3366c6997258263270c6d7465c1a)

## 0.16.3
###### _Nov 17, 2016_

This release is intended to solve an [issue](https://github.com/callemall/material-ui/issues/5573) with `react-tap-event-plugin` following the release of React `v15.4.0`.

##### Component Fixes / Enhancements

- [ListItem] Fix hover on touch devices (#5566)
- [core] include `react-tap-event-plugin@^2.0.0` for `react@^15.4.0` (#5572)
- [core] Add support for Webpack 2/Rollup tree shaking (#5545)

##### Docs

- [docs] Upgrade React to v15.4.0 (#5575)

## 0.16.2
###### _Nov 13, 2016_

This is another release improving the stability of `v0.16.x` while we are working on get `next` out of the door.

##### Component Fixes / Enhancements

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

##### Core

- [npm] Upgrade the dependencies (#5466, #5537)

##### Docs

- [docs] Add one more resource around the style migration (0d375d6271a2c65e6e608dde28ee4ca55defd81b)
- [docs] Add a note regarding other properties (#5491)
- [docs] Add redux-form in the Related projects section (3e10f203bc3a7d79f94011586c134b6e17a69016)
- [docs] Add CReMa in the Related projects section (#5431)


## 0.16.1
###### _Oct 18, 2016_

This is a small release improving the stability of `v0.16.x`.

##### Component Fixes / Enhancements

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

##### Core

- [GitHub] Improve ISSUE_TEMPLATE to ask for a running snippet (#5388)
- [npm] Upgrade the dependencies (#5404)

##### Docs

- [docs] Add LireLactu to the showcase (#5336)
- [docs] Document the muiThemeable HOC (#5363)
- [docs] Fix non-compiling example code on Themes page (#5344)


## 0.16.0
###### _Oct 3, 2016_

This release contains a ton of bug fixes and small improvements :boom:.

We have **shifted goals** for `v0.16.0`.
Across a number of issues over the last ~5 months we have been telling people that certain improvements are coming in `v0.16.0` ranging from performance to component API issues and more.
Those improvements are coming with the `next` branch :sparkles:.
We are switching in goal so we can release changes more **often**.

Regarding going forward, this is likely to be the last `minor` release using the **inline-style** approach.
We are migrating all the components to a **CSS-in-JS** approach on the `next` branch.

For more details, you can have a look a the [next milestone](https://github.com/callemall/material-ui/milestone/14) as well as the [next project](https://github.com/callemall/material-ui/projects/1)

:warning: New features based on the `master` branch (inline-style) have low priority and will most likely not be reviewed nor merged.

##### Component Fixes / Enhancements

- [Card] Fix unused property subtitleColor (#5314)

##### Core

- [Core] Use lodash.merge/throttle for faster require() (#5308)

##### Docs

- [docs] Add a single line example for GridLists (#5313)
- [docs] Add react-dnd (7e1d9d3d1d61a3ee8e6dbf57cd2261754a3285f3)
- [docs] Add Casalova to the showcase (7c0df3be32813ddb003cd47b6529431f3cd41679)

## 0.16.0-rc2
###### _Sep 24, 2016_

##### Breaking Changes

- [TimePicker] Remove the call to onDismiss when already calling onAccept (#5213)

##### Component Fixes / Enhancements

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

##### Docs

- [AppBar] Add a composition example (#5248)
- [RaisedButton] Update file upload example (#5159)
- [docs] Add material-ui-chip-input to related projects (#5172)
- [docs] Add material-auto-rotating-carousel to related projects (#5244)
- [docs] Explicit the prerequisites section to required knowledge (#5203)
- [docs] Update the server-rendering section (#5206)

##### Core

- [core] Add babel-runtime to the release (#5221)
- [core] Use the ^15.0.0 as a dependency for React (#5207)
- [npm] Upgrade the dependencies (#5161)

## 0.16.0-rc1
###### _Sep 8, 2016_

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

##### Component Fixes / Enhancements

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

##### Docs

- [docs] Fix 404 links (#4998)
- [examples] Move to own repositories (#4475)
- [showcase] Add some new projects (#4978, #5119)

##### Core

- [Slider] Clean up the implementation (#5036)
- [test] Reduce the noise when running the test suite (ea2538e)

## 0.15.4
###### _Aug 11, 2016_

##### Component Fixes / Enhancements
- [BottomNavigation] Initial implementation (#4846)
- [DropDownMenu] Revert the commit causing a regression in 0.15.3 (#f76302e)
- [Snackbar] Add the material fontFamily (#4892)
- [ListItem] New property open to toggle nested list (#4850)
- [Slider] Fix an issue where not updating when max prop changes (#4895)
- [Slider] Fix more warnings introduced by React v15.3.0 (#4869)

##### Docs
- [js] Explain the ECMAScript `stage-1` dependencies of the examples (#4877)

## 0.15.3
###### _Jul 31, 2016_

This release is mostly about bug fixes. All the new warnings introduced by React
v15.2.1 and v15.3.0 should be addressed in this version.

##### Breaking Changes

- Remove a workaround regarding the context propagation as it was fixed in the React Core.
Upgrade to React v15.2.1 if you are affected. (#4729)

##### Component Fixes / Enhancements
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

##### Core
- [dependencies] Update to the latest release version (#4669)
- [eslint] Find new rules with ease (#4521)
- [react] Fix the warnings of the latest release v15.3.0 (#4856)

##### Docs
- [ROADMAP] Remove old addressed issues (#4745)
- [ROADMAP] Update to what the core team is working on (#4829)
- [docs] Replaces images on Card page with hosted images (#4748)
- [showcase] Add https://www.spouti.com (#4806)

## 0.15.2
###### _Jul 7, 2016_

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

##### Component Fixes / Enhancements
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
###### _Jun 16, 2016_

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

##### Component Fixes / Enhancements
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
###### _May 5, 2016_

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

##### Component Fixes / Enhancements
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
###### _Apr 21, 2016_

##### General
- [.gitignore] Ignore `jsconfig.json` - VSCode config file (#4011)
- [Docs] Update usage docs with muiTheme instructions (#4034)
- [Docs] Add beta installation details to the README (#4048)
- [Examples] Update import statements (#3992)

##### Component Fixes / Enhancements
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
###### _Apr 13, 2016_

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
[readme](https://github.com/callemall/material-ui/tree/master/packages/material-ui-codemod/README.md).

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

##### Component Fixes / Enhancements
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
###### _Mar 18, 2016_

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

##### Component Fixes / Enhancements
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
###### _Feb 27, 2016_

This release includes huge improvements to the implementation
of components and utility modules. The most important improvement
is the removal of mixins from the library, thanks to the
[great efforts](https://github.com/callemall/material-ui/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+author%3Anewoga+style-propable)
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

##### Component Fixes / Enhancements
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
###### _Feb 02, 2016_

##### General
- [CRITICAL] Fixed a regression that completely disabled the auto-prefixer (#3142)
- [Core] Implements prepareStyles as composition of functions in muiTheme (#2986) (Thanks to @newoga)
- [Docs] Contributing guide (#3075)
- [Docs] Added a `Related Projects` section (#3102)
- [Examples] General updates (#3078)

##### Component Fixes / Enhancements
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
###### _Jan 26, 2016_

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

##### Component Fixes / Enhancements
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
###### _Jan 08, 2016_

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

##### Component Fixes / Enhancements
- [DatePicker] Update slide direction (#2791)
- [AutoComplete] Add 2 extra filters for text matching (#2755)
- [TableRow] Fix row height in IE (#2812)

## 0.14.1
###### _Jan 05, 2016_

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

##### Component Fixes / Enhancements
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
###### _Dec 25, 2015_

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

##### Component Fixes / Enhancements
- [SelectField] [TextField] Fixed error styling issue (#2539)
- [TextField] Implemented optional underline (#2476)
- [AutoComplete] Migrated to use popover (#2634)

##### Deprecations
- [DropDownMenu] [SelectField] Deprecated `menuItems`, these components are now composable. (#2565)

## 0.14.0-rc2
###### _Dec 15, 2015_

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

##### Component Fixes / Enhancements
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
###### _Dec 4, 2015_

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

##### Component Fixes / Enhancements
- Fix wrong proptype for value in RadioButton (#2276)
- Make LeftNav swipeable only from far left / right (#2263)
- [TextField] allow rowsMax prop to equal rows prop (#2312)
- Fix Invariant Violation error in ClickAwayable mixin (#2296)
- [DatePicker] fix calendarTextColor context key (#2318)
- Fix and improve examples (#2344, #2345)
- [Dropdown][SelectField] change value PropType to React.PropTypes.any (#2352)
- [CardActions] prevent children styles from being overridden (#2361)

## 0.13.4
###### _Nov 24, 2015_

##### General
- Introduced SelectableEnhance HOC to wrap List with valueLink (#1976)
- Added color prop to LinearProgress and RefreshIndicator (#2206)
- [AutoComplete] new component! (#2187) (thanks @yongxu)
- [Table] added wrapperStyle prop to override table wrapper's styles (#2238)
- Updated SVG icons (#2240)
- [Table] added props for headerStyle, bodyStyle and footerStyle (#2246)

##### Component Fixes / Enhancements
- Fixed double ripple due to compat mouse down (#2216)
- [RenderToLayer] iframe support for clickaway (#2210)
- [TextField] Fixed floating label element not allowing focus (#2228)
- [SelectField] onFocus and onBlur handlers passed to underlying TextField component (#2102)

## 0.13.3
###### _Nov 17, 2015_

##### General
- [Snackbar] add bodyStyle prop to style child div (#2104)
- [DatePicker] add container prop to display DatePicker in-line or inside Dialog (#2120 and #2153)
- [AppBar] add relative positioning for z-index to take effect (#1478)
- [AppBar] add onTitleTouchTap prop to AppBar (#2125)
- [Popover] new component! (#2043) (thanks @chrismcv)
- Split [SelectField] and [TextField] doc pages (#2161)

##### Component Fixes / Enhancements
- [SelectField] onChange triggered consistently when using value prop (#1610)
- [Dialog] fix page scrolling behind dialog after resizing (#1946)
- [DatePicker] fix calendar height (#2141)
- [TimePicker] allow to set time to null (#2108)

## 0.13.2
###### _Nov 9, 2015_

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

##### Component Fixes / Enhancements
- Fix server side rendering (#2021)
- Add key to TableHeaderColumn for selectAll (#2030)
- Fix Circular Progress transition (#2047)
- Fix Snackbar getting stuck when receiving new props (#2024)
- iPad enhanced textarea fix (#1720)
- Table clickAway triggers onRowSelection (#2054)
- Theme color fixes for Slider and Toggle (#2016)

## 0.13.1
###### _Oct 29, 2015_

##### General
- [SVGIcons] added index.js and index-generator script (#1959)
- [TimePicker] openDialog() function (#1939) and autoOk prop (#1940) added
- [DatePicker] i18n support added (#1658)
- [LeftNav] supports nested children (w/o menuItems) (#1982)
- [Snackbar] updated for new specification (#1668)
- [Tabs] added tabTemplate prop (#1691)

##### Component Fixes / Enhancements
- [TextArea] height issue fixed (#1875)
- [GridList] doc added (#1948) with code examples (#1988)
- [TextField] fixed custom theme color hiding backgroundColor (#1989)
- [TimePicker] added style and textFieldStyle props (#1949)
- [Card] text color is now pulled from theme (#1995)

## 0.13.0
###### _Oct 21, 2015_

##### Breaking Changes
- Material-UI for React 0.14.x

##### Component Fixes / Enhancements
- FloatingActionButton now has iconStyle prop (#1575)
- Card title and subtitle props can be any node (#1950)

## 0.12.5
###### _Oct 21, 2015_

v0.12.4 should have really been v0.13.0 as it breaks compatibility with React 0.13.3. This version fixes that. We reverted some commits (related to React 0.14.0 support) from v0.12.4 to bring to you v0.12.5 that works as expected.

##### Component Fixes / Enhancements
- DatePicker performance has been improved (#1905)
- Docs code now follows ESLint rules more strictly (#1778)
- Removed duplicate keys in component definitions (#1933)

## 0.12.4
###### _Oct 19, 2015_

**This version is not compatible with React 0.13.x.** If you're on React 0.13.x, use Material-UI v0.12.5 instead.

##### General
- React 0.14 compatible

##### Component Fixes / Enhancements
- ThemeDecorator supports props (#1841)
- Full RTL support included (#1674)
- react-draggable dependency removed for Slider (#1825)

## 0.12.3
###### _Oct 7, 2015_

##### Component Fixes / Enhancements
- Quick-fix version until react 0.14 support is somewhat stable
  - Changed react dependency to ~0.13 in package.json (#1836)

## 0.12.2
###### _Oct 6, 2015_

##### General
- NEW GridList component and documentation! Thanks to @igorbt (#1320)

##### Component Fixes / Enhancements
- Added back canvasColor to theme palette (#1762)
- Added hintStyle prop to TextField (#1510)
- Add isScrollbarVisible function to table (#1539)
- Add rowsMax prop to EnhancedTextarea (#1562)
- Tab "item three" renamed on docs site (#1775)
- Fixed docs server to run on Windows (#1774)
- FlatButton now has a backgroundColor prop (#1561)
- Fixed DropdownMenu buggy value prop check (#1768)

## 0.12.1
###### _Sep 28, 2015_

##### Component Fixes / Enhancements
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
###### _Sep 25, 2015_

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

##### Component Fixes / Enhancements
- Dialog component (#1717)
  - `actions` now has `id` property
  - Fixed a bug in dialog where a faulty check caused an error in console
  - Text field ipad scrolling in dialog

## 0.11.1
###### _Sep 15, 2015_

##### Component Fixes / Enhancements
- DatePicker - Updated to new design specs (#1266)
- LeftNav - Fix sidebar position for browsers that don't support transform3d (#1269)
- TextField - Added props to override underlineStyle when disabled (#1493)

## 0.11.0
###### _Aug 24, 2015_

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

##### Component Fixes / Enhancements
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
###### _Aug 8, 2015_

##### Component Fixes / Enhancements
- TouchRipple - Fixed a bug that caused onClick to not fire on the first click (#1370)

## 0.10.3
###### _Aug 8, 2015_

##### General
- We've set up the project to perform automated tests - now we just need to increase our test coverage. :) (#1331)
- The style auto-prefixer now caches browser test results so that it only has to perform them once.

##### New Components
- RefreshIndicator (#1312)

##### Component Fixes / Enhancements
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
###### _Jul 29, 2015_

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

##### Component Fixes / Enhancements
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
###### _Jul 13, 2015_

##### Component Fixes / Enhancements
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
###### _Jul 9, 2015_

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

##### Component Fixes / Enhancements
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
###### _Jun 20, 2015_

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
###### _Jun 14, 2015_

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
###### _Jun 9, 2015_

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
###### _May 24, 2015_

##### Breaking Changes
- Refactored all CSS into Javascript (#30, #316)
  - All Material-UI components now have their styles defined inline. This solves
    many problems with CSS as mentions in [@vjeux's presentation](https://speakerdeck.com/vjeux/react-css-in-js)
    such as polluting the global namespace with classes that really should be
    component specific. In addition to the benefits mentioned in the
    presentation, inline styles allow Material-UI to become CSS preprocessor
    agnostic and make Themeing much more dynamic and simple.
    [Read our CSS in JS discussion](https://github.com/callemall/material-ui/issues/30)
  - Upgrade path:
    - *If you are overriding component CSS classes:* Redefine your overrides as
      an object following [React's inline styles format](https://facebook.github.io/react/tips/inline-styles.html),
      then pass it into the material-ui component via the `style` prop. These
      changes are applied to the root element of the component. If you are
      overriding a nested element of the component, check the component's
      documentation and see if there is a style prop available for that nested
      element. If a style prop does not exist for the component's nested element
      that you are trying to override, [submit an issue](https://github.com/callemall/material-ui/issues/new)
      requesting to have it added.
    - *If you are using any of Material-UI's Less files:* These files have been
      refactored into their [own javascript files](https://github.com/callemall/material-ui/tree/css-in-js/src/styles)
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
###### _Apr 27, 2015_

###### General
- Removed deprecation warnings by replacing `this.getDOMNode()` with `React.findDOMNode()` (#558)
- Replaced `process.NODE_ENV` with `process.env.NODE_ENV` (#573)

##### Components
- DropDownMenu
  - Fixed `props is not defined` error when `onChange` is invoked (#556)
- Floating Action Button
  - Fixed alignment bug on Chrome when using FAB as a link (#574)

## 0.7.4
###### _Apr 21, 2015_

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
###### _Apr 1, 2015_

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
###### _Mar 25, 2015_

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
###### _Mar 4, 2015_

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
###### _Feb. 13, 2015_

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
      can be found [here](https://github.com/callemall/material-ui/tree/master/src/js/svg-icons).
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
###### _Jan. 26, 2015_

##### Fixes
- Checkbox & Toggle
  - Fixed a bug that caused checkboxes and toggles to not uncheck.

## 0.6.0
###### _Jan. 26, 2015_

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
###### _Jan. 3, 2015_

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
###### _Dec. 25, 2014_

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
###### _Dec. 15, 2014_

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
###### _Dec. 7, 2014_

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
###### _Nov. 30, 2014_

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
###### _Nov. 28, 2014_

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
###### _Nov. 17, 2014_

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
###### _Nov. 11, 2014_
- Changed project structure to be less confusing. Material-UI components/styles live in the src directory.
  Docs site code lives in the docs directory. This still allows us to easily test components in the docs site
  as we are working on them
- Added .editorconfig to help keep code formatting consistent among contributors. See http://editorconfig.org/
- Fixed drop down display issue in safari
-  Fixed nested menu arrow icon
-  Added hover transitions to menus
- Improved ripple animation on buttons

## 0.2.1
###### _Nov. 8, 2014_
- Fixed icon font reference. We're now including it as part of the project
  instead of an npm dependency.

## 0.2.0
###### _Nov. 7, 2014_
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
###### _Nov. 5, 2014_
- css fix on paper component
- hover transition fix on buttons
- removed selected state on drop down icon component
- css fix on left nav component
- added prop on left nav component to allow left nav to be docked and hidden
