## 0.2.2
###### Nov. 11, 2014
- Changed project structure to be less confusing. Material-UI components/styles live in the src directory.
	Docs site code lives in the docs directory. This still allows us to easily test components in the docs site
	as we are working on them
- Added .editorconfig to help keep code formatting consistent among contributors. See http://editorconfig.org/
- Fixed drop down display issue in safari
-	Fixed nested menu arrow icon
-	Added hover transitions to menus
- Improved ripple animation on buttons

## 0.2.1
###### Nov. 8, 2014
- Fixed icon font reference. We're now including it as part of the project
  instead of an npm dependency.

## 0.2.0
###### Nov. 7, 2014
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
###### Nov. 5, 2014
- css fix on paper component
- hover transition fix on buttons
- removed selected state on drop down icon component
- css fix on left nav component
- added prop on left nav component to allow left nav to be docked and hidden
