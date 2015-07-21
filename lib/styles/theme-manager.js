'use strict';

var Extend = require('../utils/extend');

var Types = {
  LIGHT: require('./themes/light-theme'),
  DARK: require('./themes/dark-theme'),
  MEDLIFE: require('./themes/medlife-theme')
};

var ThemeManager = function ThemeManager() {
  return {
    types: Types,
    template: Types.MEDLIFE,

    spacing: Types.MEDLIFE.spacing,
    contentFontFamily: 'Roboto, sans-serif',

    palette: Types.MEDLIFE.getPalette(),
    component: Types.MEDLIFE.getComponentThemes(Types.MEDLIFE.getPalette()),

    getCurrentTheme: function getCurrentTheme() {
      return this;
    },

    // Component gets updated to reflect palette changes.
    setTheme: function setTheme(newTheme) {
      this.setSpacing(newTheme.spacing);
      this.setPalette(newTheme.getPalette());
      this.setComponentThemes(newTheme.getComponentThemes(newTheme.getPalette()));
    },

    setSpacing: function setSpacing(newSpacing) {
      this.spacing = Extend(this.spacing, newSpacing);
      this.component = Extend(this.component, this.template.getComponentThemes(this.palette, this.spacing));
    },

    setPalette: function setPalette(newPalette) {
      this.palette = Extend(this.palette, newPalette);
      this.component = Extend(this.component, this.template.getComponentThemes(this.palette));
    },

    setComponentThemes: function setComponentThemes(overrides) {
      this.component = Extend(this.component, overrides);
    }
  };
};

module.exports = ThemeManager;