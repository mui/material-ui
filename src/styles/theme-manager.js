const Colors = require('./colors');
const ColorManipulator = require('../utils/color-manipulator');
const Extend = require('../utils/extend');
const update = require('react/lib/update');

module.exports = {
  
  //get the MUI theme corresponding to a raw theme
  getMuiTheme: function (rawTheme) {
    let returnObj = {
      appBar: {
        color: rawTheme.palette.primary1Color,
        textColor: Colors.darkWhite,
        height: rawTheme.spacing.desktopKeylineIncrement,
      },
      avatar: {
        borderColor: 'rgba(0, 0, 0, 0.08)',
      },
      button: {
        height: 36,
        minWidth: 88,
        iconButtonSize: rawTheme.spacing.iconSize * 2,
      },
      checkbox: {
        boxColor: rawTheme.palette.textColor,
        checkedColor: rawTheme.palette.primary1Color,
        requiredColor: rawTheme.palette.primary1Color,
        disabledColor: rawTheme.palette.disabledColor,
        labelColor: rawTheme.palette.textColor,
        labelDisabledColor: rawTheme.palette.disabledColor,
      },
      datePicker: {
        color: rawTheme.palette.primary1Color,
        textColor: Colors.white,
        calendarTextColor: rawTheme.palette.textColor,
        selectColor: rawTheme.palette.primary2Color,
        selectTextColor: Colors.white,
      },
      dropDownMenu: {
        accentColor: rawTheme.palette.borderColor,
      },
      flatButton: {
        color: rawTheme.palette.canvasColor,
        textColor: rawTheme.palette.textColor,
        primaryTextColor: rawTheme.palette.accent1Color,
        secondaryTextColor: rawTheme.palette.primary1Color,
      },
      floatingActionButton: {
        buttonSize: 56,
        miniSize: 40,
        color: rawTheme.palette.accent1Color,
        iconColor: Colors.white,
        secondaryColor: rawTheme.palette.primary1Color,
        secondaryIconColor: Colors.white,
        disabledTextColor: rawTheme.palette.disabledColor,
      },
      inkBar: {
        backgroundColor: rawTheme.palette.accent1Color,
      },
      leftNav: {
        width: rawTheme.spacing.desktopKeylineIncrement * 4,
        color: Colors.white,
      },
      listItem: {
        nestedLevelDepth: 18,
      },
      menu: {
        backgroundColor: Colors.white,
        containerBackgroundColor: Colors.white,
      },
      menuItem: {
        dataHeight: 32,
        height: 48,
        hoverColor: 'rgba(0, 0, 0, .035)',
        padding: rawTheme.spacing.desktopGutter,
        selectedTextColor: rawTheme.palette.accent1Color,
      },
      menuSubheader: {
        padding: rawTheme.spacing.desktopGutter,
        borderColor: rawTheme.palette.borderColor,
        textColor: rawTheme.palette.primary1Color,
      },
      paper: {
        backgroundColor: Colors.white,
      },
      radioButton: {
        borderColor:  rawTheme.palette.textColor,
        backgroundColor: Colors.white,
        checkedColor: rawTheme.palette.primary1Color,
        requiredColor: rawTheme.palette.primary1Color,
        disabledColor: rawTheme.palette.disabledColor,
        size: 24,
        labelColor: rawTheme.palette.textColor,
        labelDisabledColor: rawTheme.palette.disabledColor,
      },
      raisedButton: {
        color: Colors.white,
        textColor: rawTheme.palette.textColor,
        primaryColor: rawTheme.palette.accent1Color,
        primaryTextColor: Colors.white,
        secondaryColor: rawTheme.palette.primary1Color,
        secondaryTextColor: Colors.white,
      },
      refreshIndicator: {
        strokeColor: Colors.grey300,
        loadingStrokeColor: rawTheme.palette.primary1Color,
      },
      slider: {
        trackSize: 2,
        trackColor: Colors.minBlack,
        trackColorSelected: Colors.grey500,
        handleSize: 12,
        handleSizeDisabled: 8,
        handleSizeActive: 18,
        handleColorZero: Colors.grey400,
        handleFillColor: Colors.white,
        selectionColor: rawTheme.palette.primary3Color,
        rippleColor: rawTheme.palette.primary1Color,
      },
      snackbar: {
        textColor: Colors.white,
        backgroundColor: '#323232',
        actionColor: rawTheme.palette.accent1Color,
      },
      table: {
        backgroundColor: Colors.white,
      },
      tableHeader: {
        borderColor: rawTheme.palette.borderColor,
      },
      tableHeaderColumn: {
        textColor: Colors.lightBlack,
        height: 56,
        spacing: 24,
      },
      tableFooter: {
        borderColor: rawTheme.palette.borderColor,
        textColor: Colors.lightBlack,
      },
      tableRow: {
        hoverColor: Colors.grey200,
        stripeColor: ColorManipulator.lighten(rawTheme.palette.primary1Color, 0.55),
        selectedColor: Colors.grey300,
        textColor: Colors.darkBlack,
        borderColor: rawTheme.palette.borderColor,
      },
      tableRowColumn: {
        height: 48,
        spacing: 24,
      },
      timePicker: {
        color: Colors.white,
        textColor: Colors.grey600,
        accentColor: rawTheme.palette.primary1Color,
        clockColor: Colors.black,
        selectColor: rawTheme.palette.primary2Color,
        selectTextColor: Colors.white,
      },
      toggle: {
        thumbOnColor: rawTheme.palette.primary1Color,
        thumbOffColor: Colors.grey50,
        thumbDisabledColor: Colors.grey400,
        thumbRequiredColor: rawTheme.palette.primary1Color,
        trackOnColor: ColorManipulator.fade(rawTheme.palette.primary1Color, 0.5),
        trackOffColor: Colors.minBlack,
        trackDisabledColor: Colors.faintBlack,
        labelColor: rawTheme.palette.textColor,
        labelDisabledColor: rawTheme.palette.disabledColor,
      },
      toolbar: {
        backgroundColor: ColorManipulator.darken('#eeeeee', 0.05),
        height: 56,
        titleFontSize: 20,
        iconColor: 'rgba(0, 0, 0, .40)',
        separatorColor: 'rgba(0, 0, 0, .175)',
        menuHoverColor: 'rgba(0, 0, 0, .10)',
      },
      tabs: {
        backgroundColor: rawTheme.palette.primary1Color,
      },
      textField: {
        textColor: rawTheme.palette.textColor,
        hintColor: rawTheme.palette.disabledColor,
        floatingLabelColor: rawTheme.palette.textColor,
        disabledTextColor: rawTheme.palette.disabledColor,
        errorColor: Colors.red500,
        focusColor: rawTheme.palette.primary1Color,
        backgroundColor: 'transparent',
        borderColor: rawTheme.palette.borderColor,
      },
    };

    //add properties to objects inside 'returnObj' that depend on existing properties
    returnObj.flatButton.disabledTextColor = ColorManipulator.fade(returnObj.flatButton.textColor, 0.3);
    returnObj.raisedButton.disabledColor = ColorManipulator.darken(returnObj.raisedButton.color, 0.1);
    returnObj.raisedButton.disabledTextColor = ColorManipulator.fade(returnObj.raisedButton.textColor, 0.3);
    returnObj.toggle.trackRequiredColor = ColorManipulator.fade(returnObj.toggle.thumbRequiredColor, 0.5);

    //append the raw theme object to 'returnObj'
    returnObj.rawTheme = rawTheme;

    //set 'static' key as true (by default) on return object. This is to support the ContextPure mixin.
    returnObj.static = true;

    return returnObj;
  },

  //functions to modify properties of raw theme, namely spacing, palette
  //and font family. These functions use the React update immutability helper
  //to create a new object for the raw theme, and return a new MUI theme object

  //function to modify the spacing of the raw theme. This function recomputes
  //the MUI theme and returns it based on the new theme.
  modifyRawThemeSpacing: function (muiTheme, newSpacing) {
    let newRawTheme = update (muiTheme.rawTheme, {spacing: {$set: newSpacing}});
    return this.getMuiTheme(newRawTheme);
  },


  //function to modify the palette of the raw theme. This function recomputes
  //the MUI theme and returns it based on the new raw theme.
  //keys inside 'newPalette' override values for existing keys in palette
  modifyRawThemePalette: function (muiTheme, newPaletteKeys) {
    let newPalette = Extend(muiTheme.rawTheme.palette, newPaletteKeys);
    let newRawTheme = update (muiTheme.rawTheme, {palette: {$set: newPalette}});
    return this.getMuiTheme(newRawTheme);
  },

  //function to modify the font family of the raw theme. This function recomputes
  //the MUI theme and returns it based on the new raw theme.
  modifyRawThemeFontFamily: function (muiTheme, newFontFamily) {
    let newRawTheme = update (muiTheme.rawTheme, {fontFamily: {$set: newFontFamily}});
    return this.getMuiTheme(newRawTheme);
  },

};
