const Colors = require('./colors');
const ColorManipulator = require('../utils/color-manipulator');
const Extend = require('../utils/extend');
const update = require('react-addons-update');

module.exports = {

  //get the MUI theme corresponding to a raw theme
  getMuiTheme: function (rawTheme) {
    let returnObj = {
      appBar: {
        color: rawTheme.palette.primary1Color,
        textColor: rawTheme.palette.alternateTextColor,
        height: rawTheme.spacing.desktopKeylineIncrement,
      },
      avatar: {
        borderColor: 'rgba(0, 0, 0, 0.08)',
      },
      badge: {
        color: rawTheme.palette.alternateTextColor,
        textColor: rawTheme.palette.textColor,
        primaryColor: rawTheme.palette.accent1Color,
        primaryTextColor: rawTheme.palette.alternateTextColor,
        secondaryColor: rawTheme.palette.primary1Color,
        secondaryTextColor: rawTheme.palette.alternateTextColor,
      },
      button: {
        height: 36,
        minWidth: 88,
        iconButtonSize: rawTheme.spacing.iconSize * 2,
      },
      cardText: {
        textColor: rawTheme.palette.textColor,
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
        textColor: rawTheme.palette.alternateTextColor,
        calendarTextColor: rawTheme.palette.textColor,
        selectColor: rawTheme.palette.primary2Color,
        selectTextColor: rawTheme.palette.alternateTextColor,
      },
      dropDownMenu: {
        accentColor: rawTheme.palette.borderColor,
      },
      flatButton: {
        color: rawTheme.palette.alternateTextColor,
        textColor: rawTheme.palette.textColor,
        primaryTextColor: rawTheme.palette.accent1Color,
        secondaryTextColor: rawTheme.palette.primary1Color,
      },
      floatingActionButton: {
        buttonSize: 56,
        miniSize: 40,
        color: rawTheme.palette.accent1Color,
        iconColor: rawTheme.palette.alternateTextColor,
        secondaryColor: rawTheme.palette.primary1Color,
        secondaryIconColor: rawTheme.palette.alternateTextColor,
        disabledTextColor: rawTheme.palette.disabledColor,
      },
      gridTile: {
        textColor: Colors.white,
      },
      inkBar: {
        backgroundColor: rawTheme.palette.accent1Color,
      },
      leftNav: {
        width: rawTheme.spacing.desktopKeylineIncrement * 4,
        color: rawTheme.palette.canvasColor,
      },
      listItem: {
        nestedLevelDepth: 18,
      },
      menu: {
        backgroundColor: rawTheme.palette.canvasColor,
        containerBackgroundColor: rawTheme.palette.canvasColor,
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
        backgroundColor: rawTheme.palette.canvasColor,
      },
      radioButton: {
        borderColor:  rawTheme.palette.textColor,
        backgroundColor: rawTheme.palette.alternateTextColor,
        checkedColor: rawTheme.palette.primary1Color,
        requiredColor: rawTheme.palette.primary1Color,
        disabledColor: rawTheme.palette.disabledColor,
        size: 24,
        labelColor: rawTheme.palette.textColor,
        labelDisabledColor: rawTheme.palette.disabledColor,
      },
      raisedButton: {
        color: rawTheme.palette.alternateTextColor,
        textColor: rawTheme.palette.textColor,
        primaryColor: rawTheme.palette.accent1Color,
        primaryTextColor: rawTheme.palette.alternateTextColor,
        secondaryColor: rawTheme.palette.primary1Color,
        secondaryTextColor: rawTheme.palette.alternateTextColor,
      },
      refreshIndicator: {
        strokeColor: rawTheme.palette.borderColor,
        loadingStrokeColor: rawTheme.palette.primary1Color,
      },
      slider: {
        trackSize: 2,
        trackColor: rawTheme.palette.primary3Color,
        trackColorSelected: rawTheme.palette.accent3Color,
        handleSize: 12,
        handleSizeDisabled: 8,
        handleSizeActive: 18,
        handleColorZero: rawTheme.palette.primary3Color,
        handleFillColor: rawTheme.palette.alternateTextColor,
        selectionColor: rawTheme.palette.primary1Color,
        rippleColor: rawTheme.palette.primary1Color,
      },
      snackbar: {
        textColor: rawTheme.palette.alternateTextColor,
        backgroundColor: rawTheme.palette.textColor,
        actionColor: rawTheme.palette.accent1Color,
      },
      table: {
        backgroundColor: rawTheme.palette.canvasColor,
      },
      tableHeader: {
        borderColor: rawTheme.palette.borderColor,
      },
      tableHeaderColumn: {
        textColor: rawTheme.palette.accent3Color,
        height: 56,
        spacing: 24,
      },
      tableFooter: {
        borderColor: rawTheme.palette.borderColor,
        textColor: rawTheme.palette.accent3Color,
      },
      tableRow: {
        hoverColor: rawTheme.palette.accent2Color,
        stripeColor: ColorManipulator.lighten(rawTheme.palette.primary1Color, 0.55),
        selectedColor: rawTheme.palette.borderColor,
        textColor: rawTheme.palette.textColor,
        borderColor: rawTheme.palette.borderColor,
      },
      tableRowColumn: {
        height: 48,
        spacing: 24,
      },
      timePicker: {
        color: rawTheme.palette.alternateTextColor,
        textColor: rawTheme.palette.accent3Color,
        accentColor: rawTheme.palette.primary1Color,
        clockColor: rawTheme.palette.textColor,
        selectColor: rawTheme.palette.primary2Color,
        selectTextColor: rawTheme.palette.alternateTextColor,
      },
      toggle: {
        thumbOnColor: rawTheme.palette.primary1Color,
        thumbOffColor: rawTheme.palette.accent2Color,
        thumbDisabledColor: rawTheme.palette.borderColor,
        thumbRequiredColor: rawTheme.palette.primary1Color,
        trackOnColor: ColorManipulator.fade(rawTheme.palette.primary1Color, 0.5),
        trackOffColor: rawTheme.palette.primary3Color,
        trackDisabledColor: rawTheme.palette.primary3Color,
        labelColor: rawTheme.palette.textColor,
        labelDisabledColor: rawTheme.palette.disabledColor,
      },
      toolbar: {
        backgroundColor: ColorManipulator.darken(rawTheme.palette.accent2Color, 0.05),
        height: 56,
        titleFontSize: 20,
        iconColor: 'rgba(0, 0, 0, .40)',
        separatorColor: 'rgba(0, 0, 0, .175)',
        menuHoverColor: 'rgba(0, 0, 0, .10)',
      },
      tabs: {
        backgroundColor: rawTheme.palette.primary1Color,
        textColor: ColorManipulator.fade(rawTheme.palette.alternateTextColor, 0.6),
        selectedTextColor: rawTheme.palette.alternateTextColor,
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
      isRtl: false,
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
