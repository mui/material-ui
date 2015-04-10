var Colors = require('./colors');
var Spacing = require('./spacing');
var ColorManipulator = require('../utils/color-manipulator');

module.exports = new (function() {

  this.spacing = Spacing,

  this.palette = {
    primary1Color: Colors.cyan500,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.cyan100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.darkBlack,
    canvasColor: Colors.white,
    borderColor: Colors.grey300
  };
  this.palette.disabledColor = ColorManipulator.fade(this.palette.textColor, 0.3);

  this.fontFamily = 'Roboto, sans-serif',  

  this.update = function() {
    this.appBar = {
      color: this.palette.primary1Color,
      textColor: Colors.darkWhite,
      height: Spacing.desktopKeylineIncrement
    };

    this.button = {
      height: 36,
      minWidth: 88,
      iconButtonSize: Spacing.iconSize * 2
    };

    this.checkbox = {
      boxColor: this.palette.textColor,
      checkedColor: this.palette.primary1Color,
      requiredColor: this.palette.primary1Color,
      disabledColor: this.palette.disabledColor
    };

    this.datePicker = {
      color: this.palette.primary1Color,
      textColor: Colors.white,
      calendarTextColor: this.palette.textColor,
      selectColor: this.palette.primary2Color,
      selectTextColor: Colors.white
    };

    this.dropDownMenu = {
      iconColor: Colors.minBlack
    };

    this.flatButton = {
      color: Colors.white,
      textColor: this.palette.textColor,
      primaryTextColor: this.palette.accent1Color,
      secondaryTextColor: this.palette.primary1Color,
    };
    this.flatButton.disabledTextColor = ColorManipulator.fade(this.flatButton.textColor, 0.3),
    
    this.floatingActionButton = {
      buttonSize: 56,
      miniSize: 40,
      color: this.palette.accent1Color,
      iconColor: Colors.white,
      secondaryColor: this.palette.primary1Color,
      secondaryIconColor: Colors.white,
    };
    this.floatingActionButton.disabledColor = ColorManipulator.darken(Colors.white, 0.1),
    this.floatingActionButton.disabledTextColor = ColorManipulator.fade(this.palette.textColor, 0.3)


    this.leftNav = {
      width: Spacing.desktopKeylineIncrement * 4,
      color: Colors.white
    };

    this.menu = {
      backgroundColor: Colors.white,
      containerBackgroundColor: Colors.white,
    };

    this.menuItem = {
      dataHeight: 32,
      height: 48,
      hoverColor: 'rgba(0, 0, 0, .035)',
      padding: Spacing.desktopGutter,
      selectedTextColor: this.palette.accent1Color,
    };

    this.menuSubheader = {
      padding: Spacing.desktopGutter,
      borderColor: this.borderColor,
      textColor: this.palette.primary1Color
    };

    this.radioButton = {
      borderColor:  this.palette.textColor,
      backgroundColor: Colors.white,
      checkedColor: this.palette.primary1Color,
      requiredColor: this.palette.primary1Color,
      disabledColor: this.palette.disabledColor,
      size: 24,
    };

    this.raisedButton = {
      color: Colors.white,
      textColor: this.palette.textColor,
      primaryColor: this.palette.accent1Color,
      primaryTextColor: Colors.white,
      secondaryColor: this.palette.primary1Color,
      secondaryTextColor: Colors.white
    };
    this.raisedButton.disabledColor = ColorManipulator.darken(this.raisedButton.color, 0.1),
    this.raisedButton.disabledTextColor = ColorManipulator.fade(this.raisedButton.textColor, 0.3)

    this.slider = {
      trackSize: 2,
      trackColor: Colors.minBlack,
      trackColorSelected: Colors.grey500,
      handleSize: 12,
      handleSizeDisabled: 8,
      handleColorZero: Colors.grey400,
      handleFillColor: Colors.white,
      selectionColor: this.palette.primary3Color,
      rippleColor: this.palette.primary1Color
    };
    this.slider.handleSizeActive = this.slider.handleSize * 2;

    this.snackbar = {
      textColor: Colors.white,
      backgroundColor: '#323232',
      actionColor: this.palette.accent1Color
    };

    this.toggle = {
      thumbOnColor: this.palette.primary1Color,
      thumbOffColor: Colors.grey50,
      thumbDisabledColor: Colors.grey400,
      thumbRequiredColor: this.palette.primary1Color,
      trackOnColor: ColorManipulator.fade(this.palette.primary1Color, 0.5),
      trackOffColor: Colors.minBlack,
      trackDisabledColor: Colors.faintBlack
    };
    this.toggle.trackRequiredColor = ColorManipulator.fade(this.toggle.thumbRequiredColor, 0.5);

    this.toolbar = {
      backgroundColor: ColorManipulator.darken('#eeeeee', 0.05),
      height: 56,
      titleFontSize: 20,
      iconColor: 'rgba(0, 0, 0, .40)',
      separatorColor: 'rgba(0, 0, 0, .175)',
      menuHoverColor: 'rgba(0, 0, 0, .10)',
      menuHoverColor: Colors.white
    };
  };
});
