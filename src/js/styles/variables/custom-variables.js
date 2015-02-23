var Colors = require('../colors');
var Spacing = require('./spacing');
var Theme = require('../theme').get();

module.exports = {

  //Border Colors
  borderColor: Colors.grey300,

  // Disabled Colors
  disabledColor: Theme.textColor, // fadeout 30%


  //Component Colors
  appBarColor: Theme.primary1Color,
  appBarTextColor: Colors.darkWhite,
  canvasColor: Colors.white,
  dropDownMenuIconColor: Colors.minBlack,
  leftNavColor: Colors.white,
  subheaderBorderColor: this.borderColor,
  subheaderTextColor: Theme.primary1Color,


  
  // Spacing
  spacing: Spacing,

  // checkbox
  checkboxBoxColor: Theme.textColor,
  checkboxCheckedColor: Theme.primary1Color,
  checkboxRequiredColor: Theme.primary1Color,
  checkboxDisabledColor: this.disabledColor,

  // menu
  menuBackgroundColor: Colors.white,
  menuItemDataHeight: 32,
  menuItemHeight: 48,
  menuItemHoverColor: 'rgba(0, 0, 0, .035)',
  menuItemPadding: Spacing.desktopGutter,
  menuItemSelectedTextColor: Theme.accent1Color,
  menuContainerBackgroundColor: Colors.white,
  menuSubheaderPadding: Spacing.desktopGutter,

  // toggle
  toggleThumbOnColor: Theme.primary1Color,
  toggleThumbOffColor: Colors.grey50,
  toggleThumbDisabledColor: Colors.grey400,
  toggleThumbRequiredColor: Theme.primary1Color,
  toggleTrackOnColor: Theme.primary1Color, // fadeout 50%
  toggleTrackOffColor: Colors.minBlack,
  toggleTrackDisabledColor: Colors.faintBlack,
  toggleTrackRequiredColor: this.toggleThumbRequiredColor, // fadeout 50%

  // radio button 
  radioButtonBorderColor:  Theme.textColor,
  radioButtonBackgroundColor: Colors.white,
  radioButtonCheckedColor: Theme.primary1Color,
  radioButtonRequiredColor: Theme.primary1Color,
  radioButtonDisabledColor: this.disabledColor,
  radioButtonSize: 24,
}