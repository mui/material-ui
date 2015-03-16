var Colors = require('../colors');
var Spacing = require('./spacing');
var Theme = require('../theme').get();
var ColorManipulator = require('../../utils/color-manipulator');

var customVariables = new (function() {
  
  // Spacing
  this.spacing = Spacing;

  // Colors
  this.colors = Colors;

  //Border Colors
  this.borderColor = Colors.grey300;

  // Disabled Colors
  this.disabledColor = ColorManipulator.fade(Theme.textColor, 0.3);

  // Component Colors
  this.canvasColor = Colors.white;
  this.dropDownMenuIconColor = Colors.minBlack;
  this.leftNavColor = Colors.white;
  this.subheaderBorderColor = this.borderColor;
  this.subheaderTextColor = Theme.primary1Color;
  
  // Layout
  this.leftNavWidth = Spacing.desktopKeylineIncrement * 4;

  // appbar
  this.appBarColor = Theme.primary1Color;
  this.appBarTextColor = Colors.darkWhite;
  this.appBarHeight = Spacing.desktopKeylineIncrement;

  // buttons
  this.buttonHeight = 36;
  this.buttonMinWidth = 88;
  this.iconButtonSize = Spacing.iconSize * 2;

  this.flatButtonColor = Colors.white;
  this.flatButtonTextColor = Theme.textColor;
  this.flatButtonPrimaryTextColor = Theme.accent1Color;
  this.flatButtonSecondaryTextColor = Theme.primary1Color;
  this.flatButtonDisabledTextColor = ColorManipulator.fade(this.flatButtonTextColor, 0.3);

  this.raisedButtonColor = Colors.white;
  this.raisedButtonTextColor = Theme.textColor;
  this.raisedButtonPrimaryColor = Theme.accent1Color;
  this.raisedButtonPrimaryTextColor = Colors.white;
  this.raisedButtonSecondaryColor = Theme.primary1Color;
  this.raisedButtonSecondaryTextColor = Colors.white;
  this.raisedButtonDisabledColor = ColorManipulator.darken(this.raisedButtonColor, 0.1);
  this.raisedButtonDisabledTextColor = ColorManipulator.fade(this.raisedButtonTextColor, 0.3);

  this.floatingActionButtonSize = 56;
  this.floatingActionButtonMiniSize = 40;
  this.floatingActionButtonColor = Theme.accent1Color;
  this.floatingActionButtonIconColor = Colors.white;
  this.floatingActionButtonSecondaryColor = Theme.primary1Color;
  this.floatingActionButtonSecondaryIconColor = Colors.white;
  this.floatingActionButtonDisabledColor = this.raisedButtonDisabledColor;
  this.floatingActionButtonDisabledTextColor = this.raisedButtonDisabledTextColor;

  // checkbox
  this.checkboxBoxColor = Theme.textColor;
  this.checkboxCheckedColor = Theme.primary1Color;
  this.checkboxRequiredColor = Theme.primary1Color;
  this.checkboxDisabledColor = this.disabledColor;

  // date picker
  this.datePickerColor = Theme.primary1Color;
  this.datePickerTextColor = Colors.white;
  this.datePickerCalendarTextColor = Theme.textColor;
  this.datePickerSelectColor = Theme.primary2Color;
  this.datePickerSelectTextColor = Colors.white;

  // menu
  this.menuBackgroundColor = Colors.white;
  this.menuItemDataHeight = 32;
  this.menuItemHeight = 48;
  this.menuItemHoverColor = 'rgba(0, 0, 0, .035)';
  this.menuItemPadding = Spacing.desktopGutter;
  this.menuItemSelectedTextColor = Theme.accent1Color;
  this.menuContainerBackgroundColor = Colors.white;
  this.menuSubheaderPadding = Spacing.desktopGutter;

  // radio button 
  this.radioButtonBorderColor =  Theme.textColor;
  this.radioButtonBackgroundColor = Colors.white;
  this.radioButtonCheckedColor = Theme.primary1Color;
  this.radioButtonRequiredColor = Theme.primary1Color;
  this.radioButtonDisabledColor = this.disabledColor;
  this.radioButtonSize = 24;

  // slider
  this.sliderTrackSize = 2;
  this.sliderTrackColor = Colors.minBlack;
  this.sliderTrackColorSelected = Colors.grey500;
  this.sliderHandleSize = 12;
  this.sliderHandleSizeActive = this.sliderHandleSize * 2;
  this.sliderHandleSizeDisabled = 8;
  this.sliderHandleColorZero = Colors.grey400;
  this.sliderHandleFillColor = Colors.white;
  this.sliderSelectionColor = Theme.primary3Color;
  this.sliderRippleColor = Theme.primary1Color;

  // snackbar
  this.snackbarTextColor = Colors.white;
  this.snackbarBackgroundColor = '#323232';
  this.snackbarActionColor = Theme.accent1Color;

  // toggle
  this.toggleThumbOnColor = Theme.primary1Color;
  this.toggleThumbOffColor = Colors.grey50;
  this.toggleThumbDisabledColor = Colors.grey400;
  this.toggleThumbRequiredColor = Theme.primary1Color;
  this.toggleTrackOnColor = Theme.primary1Color; // fadeout 50%
  this.toggleTrackOffColor = Colors.minBlack;
  this.toggleTrackDisabledColor = Colors.faintBlack;
  this.toggleTrackRequiredColor = this.toggleThumbRequiredColor; // fadeout 50%

  // toolbar
  this.toolbarBackgroundColor = '#eeeeee'; //darken by 5%
  this.toolbarHeight = 56;
  this.toolbarIconColor = 'rgba(0, 0, 0, .40)';
  this.toolbarSeparatorColor = 'rgba(0, 0, 0, .175)';
  this.toolbarMenuHoverColor = 'rgba(0, 0, 0, .10)';
  this.toolbarMenuHoverColor = Colors.white;

});

module.exports = customVariables;
