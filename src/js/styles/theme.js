var Colors = require('./colors.js');

//Define default theme variables
var currentTheme = {

  fontFamily: 'Roboto, sans-serif',
  textColor: Colors.darkBlack,

  //App color palette
  primary1Color: Colors.cyan500,
  primary2Color: Colors.cyan700,
  primary3Color: Colors.cyan100,
  accent1Color: Colors.pinkA200,
  accent2Color: Colors.pinkA400,
  accent3Color: Colors.pinkA100
};

var Theme = {

  //Gets the current theme variables
  get: function() {
    return currentTheme;
  },

  //This function takes in 1 or more arguments
  //Loops through each argument and overrides the
  //current theme variables.
  //Later arguments override previous arguments
  set: function() {
    var arg;

    for (var i = 0; i < arguments.length; i++) {
      arg = arguments[i];

      for (var key in arg) {
         currentTheme[key] = arg[key];
      }
    }

  }

};

module.exports = Theme;