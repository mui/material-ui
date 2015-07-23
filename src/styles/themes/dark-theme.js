let Colors = require('../colors');
let ColorManipulator = require('../../utils/color-manipulator');


let DarkTheme = {
  getPalette() {
    return {
      textColor: Colors.fullWhite,
      canvasColor: '#303030',
      borderColor:  ColorManipulator.fade(Colors.fullWhite, 0.3), //Colors.grey300
      disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
      primary1Color: Colors.teal200,
    };
  },
  getComponentThemes(palette) {
    let cardColor = Colors.grey800;
    return {
      avatar: {
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
      floatingActionButton: {
        disabledColor: ColorManipulator.fade(palette.textColor, 0.12),
      },
      leftNav: {
        color: cardColor,
      },
      menu: {
        backgroundColor: cardColor,
        containerBackgroundColor: cardColor,
      },
      menuItem: {
        hoverColor: 'rgba(255, 255, 255, .03)',
      },
      menuSubheader: {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      paper: {
        backgroundColor: cardColor,
      },
      raisedButton: {
        color: Colors.grey500,
      },
      toggle: {
        thumbOnColor: Colors.cyan200,
        thumbOffColor: Colors.grey400,
        thumbDisabledColor: Colors.grey800,
        thumbRequiredColor: Colors.cyan200,
        trackOnColor: ColorManipulator.fade(Colors.cyan200, 0.5),
        trackOffColor: 'rgba(255, 255, 255, 0.3)',
        trackDisabledColor: 'rgba(255, 255, 255, 0.1)',
      },
      slider: {
        trackColor: Colors.minBlack,
        handleColorZero: cardColor,
        handleFillColor: cardColor,
        selectionColor: Colors.cyan200,
      },
    };
  },
};

module.exports = DarkTheme;
