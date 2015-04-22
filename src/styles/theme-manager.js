var Color = require('./colors');
var Spacing = require('./spacing');
var ColorManipulator = require('../utils/color-manipulator');

var Types = {
  LIGHT: require('./themes/light-theme'),
  DARK: require('./themes/dark-theme')
};

var ThemeManager = function() {

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
    var mergeObject = {};

    Object.keys(theme).forEach(function(currentKey) {

      var overridesCheck = theme[currentKey] && !Array.isArray(theme[currentKey]);
      
      // Recursive call to next level
      if (typeof(theme[currentKey]) === 'object' && overridesCheck) 
        mergeObject[currentKey] = merge(theme[currentKey], overrides[currentKey]);
      else {
        if (overrides && overrides[currentKey])
          mergeObject[currentKey] = overrides[currentKey]; 
        else
          mergeObject[currentKey] = theme[currentKey];
      }

    });

    return mergeObject;
  };

  return {
    types: Types,
    template: Types.LIGHT,

    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',

    palette: Types.LIGHT.getPalette(),
    component: Types.LIGHT.getComponentThemes(Types.LIGHT.getPalette()),

    getCurrentTheme: function() {
      return this;
    },

    setTheme: function(newTheme) {
      this.setPalette(newTheme.getPalette());
      this.setComponentThemes(newTheme.getComponentThemes(newTheme.getPalette()));
    },

    setPalette: function(newPalette) {
      this.palette = merge(this.palette, newPalette);
      this.component = merge(this.component, this.template.getComponentThemes(this.palette));
    },

    setComponentThemes: function(overrides) {
      this.component = merge(this.component, overrides);
    }
  };
};

module.exports = ThemeManager;