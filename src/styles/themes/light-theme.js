var Colors = require('../colors');
var Spacing = require('../spacing');
var ColorManipulator = require('../../utils/color-manipulator');

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. 
 */

var LightTheme = {

  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',

  palette: {
    primary1Color: Colors.cyan500,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.cyan100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.darkBlack,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  },

  getComponentThemes: function() {
    console.log('getComponentVariables LIGHT');

    var obj = {
      
      appBar: {
        color: this.palette.primary1Color,
        textColor: Colors.darkWhite,
        height: Spacing.desktopKeylineIncrement
      },

      button: {
        height: 36,
        minWidth: 88,
        iconButtonSize: Spacing.iconSize * 2
      },

      checkbox: {
        boxColor: this.palette.textColor,
        checkedColor: this.palette.primary1Color,
        requiredColor: this.palette.primary1Color,
        disabledColor: this.palette.disabledColor
      },

      datePicker: {
        color: this.palette.primary1Color,
        textColor: Colors.white,
        calendarTextColor: this.palette.textColor,
        selectColor: this.palette.primary2Color,
        selectTextColor: Colors.white
      },

      dropDownMenu: {
        accentColor: this.palette.borderColor
      },

      flatButton: {
        color: this.palette.canvasColor,
        textColor: this.palette.textColor,
        primaryTextColor: this.palette.accent1Color,
        secondaryTextColor: this.palette.primary1Color,
      },

      floatingActionButton: {
        buttonSize: 56,
        miniSize: 40,
        color: this.palette.accent1Color,
        iconColor: Colors.white,
        secondaryColor: this.palette.primary1Color,
        secondaryIconColor: Colors.white,
      },

      leftNav: {
        width: Spacing.desktopKeylineIncrement * 4,
        color: Colors.white
      },

      menu: {
        backgroundColor: Colors.white,
        containerBackgroundColor: Colors.white,
      },

      menuItem: {
        dataHeight: 32,
        height: 48,
        hoverColor: 'rgba(0, 0, 0, .035)',
        padding: Spacing.desktopGutter,
        selectedTextColor: this.palette.accent1Color,
      },

      menuSubheader: {
        padding: Spacing.desktopGutter,
        borderColor: this.palette.borderColor,
        textColor: this.palette.primary1Color
      },

      paper: {
        backgroundColor: Colors.white,
      },

      radioButton: {
        borderColor:  this.palette.textColor,
        backgroundColor: Colors.white,
        checkedColor: this.palette.primary1Color,
        requiredColor: this.palette.primary1Color,
        disabledColor: this.palette.disabledColor,
        size: 24,
      },

      raisedButton: {
        color: Colors.white,
        textColor: this.palette.textColor,
        primaryColor: this.palette.accent1Color,
        primaryTextColor: Colors.white,
        secondaryColor: this.palette.primary1Color,
        secondaryTextColor: Colors.white
      },

      slider: {
        trackSize: 2,
        trackColor: Colors.minBlack,
        trackColorSelected: Colors.grey500,
        handleSize: 12,
        handleSizeDisabled: 8,
        handleColorZero: Colors.grey400,
        handleFillColor: Colors.white,
        selectionColor: this.palette.primary3Color,
        rippleColor: this.palette.primary1Color
      },

      snackbar: {
        textColor: Colors.white,
        backgroundColor: '#323232',
        actionColor: this.palette.accent1Color
      },

      toggle: {
        thumbOnColor: this.palette.primary1Color,
        thumbOffColor: Colors.grey50,
        thumbDisabledColor: Colors.grey400,
        thumbRequiredColor: this.palette.primary1Color,
        trackOnColor: ColorManipulator.fade(this.palette.primary1Color, 0.5),
        trackOffColor: Colors.minBlack,
        trackDisabledColor: Colors.faintBlack
      },

      toolbar: {
        backgroundColor: ColorManipulator.darken('#eeeeee', 0.05),
        height: 56,
        titleFontSize: 20,
        iconColor: 'rgba(0, 0, 0, .40)',
        separatorColor: 'rgba(0, 0, 0, .175)',
        menuHoverColor: 'rgba(0, 0, 0, .10)',
        menuHoverColor: Colors.white
      }
    };
    
    // Properties based on previous properties
    obj.flatButton.disabledTextColor = ColorManipulator.fade(obj.flatButton.textColor, 0.3),
    obj.floatingActionButton.disabledColor = ColorManipulator.darken(Colors.white, 0.1),
    obj.floatingActionButton.disabledTextColor = ColorManipulator.fade(this.palette.textColor, 0.3)
    obj.raisedButton.disabledColor = ColorManipulator.darken(obj.raisedButton.color, 0.1),
    obj.raisedButton.disabledTextColor = ColorManipulator.fade(obj.raisedButton.textColor, 0.3)
    obj.slider.handleSizeActive = obj.slider.handleSize * 2;
    obj.toggle.trackRequiredColor = ColorManipulator.fade(obj.toggle.thumbRequiredColor, 0.5);

    return obj;
  }

}

LightTheme.component = LightTheme.getComponentThemes();//LightTheme.this.palette);

module.exports = LightTheme;