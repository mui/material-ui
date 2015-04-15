var Colors = require('../colors');
var ColorManipulator = require('../../utils/color-manipulator');

var DarkTheme = {
  // we don't call parent because this.palette will be overridden
  // TODO: test to see if all the values of this.palette are needed
  palette: {
    primary1Color: Colors.cyan500,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.cyan100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.fullWhite,
    canvasColor: '#303030',
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3)
  },

  getComponentThemes: function() {
    return {
      floatingActionButton: {
        disabledColor: ColorManipulator.fade(this.palette.textColor, 0.12),
      },
      menu: {
        backgroundColor: this.palette.canvasColor,
        containerBackgroundColor: Colors.grey500,
      },
      menuItem: {
        hoverColor: 'rgba(255, 255, 255, .03)',
      },
      paper: {
        backgroundColor: Colors.grey800
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
      }
    };
  }
};

DarkTheme.component = DarkTheme.getComponentThemes();//DarkTheme.this.palette);

module.exports = DarkTheme;