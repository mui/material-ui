## 0.7.2
###### _Mar. 25, 2015_

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
###### _Mar. 4, 2015_

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
