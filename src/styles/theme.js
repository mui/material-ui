var Color = require('./colors');
var Spacing = require('./spacing');
var ColorManipulator = require('../utils/color-manipulator');

var Types = {
  LIGHT: require('./themes/light-theme'),
  DARK: require('./themes/dark-theme')
};

var Theme = function() {
  var instance;

  /** 
  *  A recursive merge between two objects. Keep in mind that overriding the 
  *  palette nested object of theme does not automatically update component
  *  properties, because they are still using the old color values of palette
  *  that they were defined with. 
  *
  for all component variables of a theme. Use setPalette
  *  if you would like to override a theme's palette object.
  * 
  *  @param theme     - the object whose properties are to be overwritten. It
  *                     should be either the root level or some nested level 
  *                     of theme.
  *  @param overrides - an object containing properties to be overwritten. It 
  *                     should have the same structure as the theme object.
  */
  var merge = function(theme, overrides) {
    Object.keys(overrides).forEach(function(currentKey) {
      var overridesCheck = overrides[currentKey] && !Array.isArray(overrides[currentKey]);
      if (typeof(overrides[currentKey]) === 'object' && overridesCheck) {
        merge(theme[currentKey], overrides[currentKey]);
      } else {
        theme[currentKey] = overrides[currentKey];
      }
    });
  };

  return {
    types: Types,

    getCurrentTheme: function() {
      if (!instance) instance = Object.create(Types.LIGHT);
      return instance;
    },

    setTheme: function(newTheme) {
      this.setPalette(newTheme.getPalette());
      this.setComponentThemes(newTheme.getComponentThemes());
    },

    setPalette: function(newPalette) {
      merge(instance.palette, newPalette);
      instance.component = instance.getComponentThemes();
    },

    setComponentThemes: function(overrides) {
      merge(instance.component, overrides);
    }
  };
};

module.exports = new Theme();