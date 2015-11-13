'use strict';

var Colors = require('../colors');
var ColorManipulator = require('../../utils/color-manipulator');
var Spacing = require('../spacing');

// Original dark theme from Material UI.

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primaryTextColor: Colors.white,
    secondaryTextColor: Colors.pesca,
    transparent: Colors.transparent,

    primary1Color: Colors.cyan700,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.grey600,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.fullWhite,
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3)
  }
};