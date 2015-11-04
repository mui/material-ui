let Colors = require('../colors');
let ColorManipulator = require('../../utils/color-manipulator');
let Spacing = require('../spacing');

/*
 *  Original light theme from Material UI
 */

 module.exports = {
   spacing: Spacing,
   fontFamily: 'Roboto, sans-serif',
   palette: {
     primaryTextColor: Colors.white,
     secondaryTextColor: Colors.pesca,
     transparent: Colors.transparent,

     primary1Color: Colors.cyan500,
     primary2Color: Colors.cyan700,
     primary3Color: Colors.lightBlack,
     accent1Color: Colors.pinkA200,
     accent2Color: Colors.grey100,
     accent3Color: Colors.grey500,
     textColor: Colors.darkBlack,
     alternateTextColor: Colors.white,
     canvasColor: Colors.white,
     borderColor: Colors.grey300,
     disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
   },
};
