let Extend = require('../utils/extend');


const Types = {
  LIGHT: require('./themes/light-theme'),
  DARK: require('./themes/dark-theme'),
};


let ThemeManager = () => {
  return {
    types: Types,
    template: Types.LIGHT,

    spacing: Types.LIGHT.spacing,
    contentFontFamily: 'Roboto, sans-serif',

    palette: Types.LIGHT.getPalette(),
    component: Types.LIGHT.getComponentThemes(Types.LIGHT.getPalette()),

    getCurrentTheme() {
      return this;
    },

    // Component gets updated to reflect palette changes.
    setTheme(newTheme) {
      this.setSpacing(newTheme.spacing);
      this.setPalette(newTheme.getPalette());
      this.setComponentThemes(newTheme.getComponentThemes(newTheme.getPalette()));
    },

    setSpacing(newSpacing) {
      this.spacing = Extend(this.spacing, newSpacing);
      this.component = Extend(this.component, this.template.getComponentThemes(this.palette, this.spacing));
    },

    setPalette(newPalette) {
      this.palette = Extend(this.palette, newPalette);
      this.component = Extend(this.component, this.template.getComponentThemes(this.palette));
    },

    setComponentThemes(overrides) {
      this.component = Extend(this.component, overrides);
    },
  };
};

module.exports = ThemeManager;
