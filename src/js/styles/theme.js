//Define default theme variables
var currentTheme = {
  fontFamily: 'Roboto, sans-serif',
  textColor: 'rgba(0, 0, 0, 0.87)'
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