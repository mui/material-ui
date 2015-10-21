let Colors = require('../colors');
let ColorManipulator = require('../../utils/color-manipulator');
let Spacing = require('../spacing');

/*
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primaryTextColor: Colors.white,
    secondaryTextColor: Colors.pesca,
    transparent: Colors.transparent,

    primary1Color: Colors.pesca,
    primary2Color: Colors.caffelatte,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pesca,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  },
};
