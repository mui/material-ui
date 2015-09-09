let Colors = require('../colors');
let ColorManipulator = require('../../utils/color-manipulator');
let Spacing = require('../spacing');

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.teal200,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.cyan100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.fullWhite,
    canvasColor: '#303030',
    borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
  },
};
