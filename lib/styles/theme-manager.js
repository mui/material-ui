'use strict';

var Extend = require('../utils/extend');

var Types = {
  LIGHT: require('./themes/light-theme'),
  DARK: require('./themes/dark-theme')
};

var ThemeManager = function ThemeManager() {
  return {

    //In most cases, theme variables remain static thoughout the life of an
    //app. If you plan on mutating theme variables after the theme has been
    //intialized, set static to false. This will allow components to update
    //when theme variables change. For more information see issue #1176
    'static': true,

    types: Types,
    template: Types.LIGHT,

    spacing: Types.LIGHT.spacing,
    contentFontFamily: 'Roboto, sans-serif',

    palette: Types.LIGHT.getPalette(),
    component: Types.LIGHT.getComponentThemes(Types.LIGHT.getPalette()),

    getCurrentTheme: function getCurrentTheme() {
      return this;
    },

    // Component gets updated to reflect palette changes.
    setTheme: function setTheme(newTheme) {
      this.setSpacing(newTheme.spacing);
      this.setContentFontFamily(newTheme.contentFontFamily);
      this.setPalette(newTheme.getPalette());
      this.setComponentThemes(newTheme.getComponentThemes(newTheme.getPalette()));
    },

    setSpacing: function setSpacing(newSpacing) {
      this.spacing = Extend(this.spacing, newSpacing);
      this.component = Extend(this.component, this.template.getComponentThemes(this.palette, this.spacing));
    },

    setContentFontFamily: function setContentFontFamily(newContentFontFamily) {
      if (typeof newContentFontFamily !== "undefined" && newContentFontFamily !== null) {
        this.contentFontFamily = newContentFontFamily;
        this.component = Extend(this.component, this.template.getComponentThemes(this.palette, this.spacing));
      }
    },

    setPalette: function setPalette(newPalette) {
      this.palette = Extend(this.palette, newPalette);
      this.component = Extend(this.component, this.template.getComponentThemes(this.palette));
    },

    setComponentThemes: function setComponentThemes(overrides) {
      this.component = Extend(this.component, overrides);
    },

    setIsRtl: function setIsRtl(isRtl) {
      this.isRtl = !!isRtl;
    }
  };
};

module.exports = ThemeManager;