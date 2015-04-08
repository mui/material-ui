var Colors = require('./colors');
var Spacing = require('./variables/spacing');
var ColorManipulator = require('../utils/color-manipulator');

// Define default theme variables
var defaultVariables = new (function() {
  this.palette = {
    primary1Color: Colors.cyan500,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.cyan100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.darkBlack
  };

  this.colors = Colors,
  this.spacing = Spacing,
  this.fontFamily = 'Roboto, sans-serif',
  this.borderColor = Colors.grey300;
  this.disabledColor = ColorManipulator.fade(this.palette.textColor, 0.3);

  this.appbar = {
    appBarColor: this.palette.primary1Color,
    appBarTextColor: Colors.darkWhite,
    appBarHeight: Spacing.desktopKeylineIncrement
  };

  this.button = {
    buttonHeight: 36,
    buttonMinWidth: 88,
    iconButtonSize: Spacing.iconSize * 2
  };

  this.flatButton = {
    flatButtonColor: Colors.white,
    flatButtonTextColor: this.palette.textColor,
    flatButtonPrimaryTextColor: this.palette.accent1Color,
    flatButtonSecondaryTextColor: this.palette.primary1Color,
  };
  this.flatButton.flatButtonDisabledTextColor = ColorManipulator.fade(this.flatButton.flatButtonTextColor, 0.3),

  this.raisedButton = {
    raisedButtonColor: Colors.white,
    raisedButtonTextColor: this.palette.textColor,
    raisedButtonPrimaryColor: this.palette.accent1Color,
    raisedButtonPrimaryTextColor: Colors.white,
    raisedButtonSecondaryColor: this.palette.primary1Color,
    raisedButtonSecondaryTextColor: Colors.white
  };
  this.raisedButton.raisedButtonDisabledColor = ColorManipulator.darken(this.raisedButton.raisedButtonColor, 0.1),
  this.raisedButton.raisedButtonDisabledTextColor = ColorManipulator.fade(this.raisedButton.raisedButtonTextColor, 0.3)

  this.floatingActionButton = {
    floatingActionButtonSize: 56,
    floatingActionButtonMiniSize: 40,
    floatingActionButtonColor: this.palette.accent1Color,
    floatingActionButtonIconColor: Colors.white,
    floatingActionButtonSecondaryColor: this.palette.primary1Color,
    floatingActionButtonSecondaryIconColor: Colors.white,
    floatingActionButtonDisabledColor: this.raisedButton.raisedButtonDisabledColor,
    floatingActionButtonDisabledTextColor: this.raisedButton.raisedButtonDisabledTextColor
  };

  this.checkbox = {
    checkboxBoxColor: this.palette.textColor,
    checkboxCheckedColor: this.palette.primary1Color,
    checkboxRequiredColor: this.palette.primary1Color,
    checkboxDisabledColor: this.disabledColor
  };

  this.datePicker = {
    datePickerColor: this.palette.primary1Color,
    datePickerTextColor: Colors.white,
    datePickerCalendarTextColor: this.palette.textColor,
    datePickerSelectColor: this.palette.primary2Color,
    datePickerSelectTextColor: Colors.white
  };

  this.leftNav = {
    leftNavWidth: Spacing.desktopKeylineIncrement * 4,
    leftNavColor: Colors.white
  };

  this.menu = {
    menuBackgroundColor: Colors.white,
    menuItemDataHeight: 32,
    menuItemHeight: 48,
    menuItemHoverColor: 'rgba(0, 0, 0, .035)',
    menuItemPadding: Spacing.desktopGutter,
    menuItemSelectedTextColor: this.palette.accent1Color,
    menuContainerBackgroundColor: Colors.white,
    menuSubheaderPadding: Spacing.desktopGutter
  };

  this.radioButton = {
      radioButtonBorderColor:  this.palette.textColor,
      radioButtonBackgroundColor: Colors.white,
      radioButtonCheckedColor: this.palette.primary1Color,
      radioButtonRequiredColor: this.palette.primary1Color,
      radioButtonDisabledColor: this.disabledColor,
      radioButtonSize: 24
  };

  this.slider = {
    sliderTrackSize: 2,
    sliderTrackColor: Colors.minBlack,
    sliderTrackColorSelected: Colors.grey500,
    sliderHandleSize: 12,
    sliderHandleSizeDisabled: 8,
    sliderHandleColorZero: Colors.grey400,
    sliderHandleFillColor: Colors.white,
    sliderSelectionColor: this.palette.primary3Color,
    sliderRippleColor: this.palette.primary1Color
  };
  this.slider.sliderHandleSizeActive = this.sliderHandleSize * 2;

  this.snackbar = {
      snackbarTextColor: Colors.white,
      snackbarBackgroundColor: '#323232',
      snackbarActionColor: this.palette.accent1Color
  };

  this.toggle = {
    toggleThumbOnColor: this.palette.primary1Color,
    toggleThumbOffColor: Colors.grey50,
    toggleThumbDisabledColor: Colors.grey400,
    toggleThumbRequiredColor: this.palette.primary1Color,
    toggleTrackOnColor: ColorManipulator.fade(this.palette.primary1Color, 0.5),
    toggleTrackOffColor: Colors.minBlack,
    toggleTrackDisabledColor: Colors.faintBlack
  };
  this.toggle.toggleTrackRequiredColor = ColorManipulator.fade(this.toggle.toggleThumbRequiredColor, 0.5);

  this.toolbar = {
    toolbarBackgroundColor: ColorManipulator.darken('#eeeeee', 0.05),
    toolbarHeight: 56,
    toolbarTitleFontSize: 20,
    toolbarIconColor: 'rgba(0, 0, 0, .40)',
    toolbarSeparatorColor: 'rgba(0, 0, 0, .175)',
    toolbarMenuHoverColor: 'rgba(0, 0, 0, .10)',
    toolbarMenuHoverColor: Colors.white
  };

  console.log('done');
});

var Theme = {

  //Gets the current theme variables
  get: function() {
    return defaultVariables.palette;
  },

  //This function takes in 1 or more arguments
  //Loops through each argument and overrides the current theme variables.
  //Later arguments override previous arguments
  //If argument is an object with more 
  set: function() {
    var arg;
    var current = defaultVariables;

    for (var i = 0; i < arguments.length; i++) {
      arg = arguments[i];

      for (var key in arg) {
         current[key] = arg[key];
      }
    }

    return currentpalette;
  },
};

module.exports = Theme;