var Colors = require('./colors');
var Spacing = require('./spacing');
var ColorManipulator = require('../utils/color-manipulator');

var DefaultTheme = require('./default-theme');

var Theme = {

  //Gets the current theme variables
  get: function() {
    if (Theme.initialCreation) {
      Theme.initialCreation = false;
      DefaultTheme.update();
    }
    return DefaultTheme;
  },

  /**
   *  A recursive 
   * 
   *  @param theme     - the object whose properties are to be overwritten. It
   *                     should be either the root level or some nested level 
   *                     of defaultVariables.
   *  @param overrides - an object containing properties to be overwritten. It 
   *                     should have the same structure as the defaultVariables
   *                     object.
   */
  setHelper: function(theme, overrides) {
    var keys = Object.keys(overrides);
    for (var i = 0; i < keys.length; i++) {
      var currentKey = keys[i];
      if (typeof(overrides[currentKey]) === 'object') {
        this.setHelper(theme[currentKey], overrides[currentKey]);
        if (currentKey === 'palette') DefaultTheme.update();
      } else {
        theme[currentKey] = overrides[currentKey];
      }
    }
  },

  set: function(overrides) {
    this.setHelper(DefaultTheme, overrides);
  },
};

Theme.initialCreation = true;

module.exports = Theme;
