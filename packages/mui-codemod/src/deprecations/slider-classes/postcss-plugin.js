const classes = [
  {
    deprecatedClass: ' .MuiSlider-thumbSizeSmall',
    replacementSelector: '.MuiSlider-sizeSmall > .MuiSlider-thumb',
  },
  {
    deprecatedClass: ' .MuiSlider-thumbSizeMedium',
    replacementSelector: '.MuiSlider-sizeMedium > .MuiSlider-thumb',
  },
  {
    deprecatedClass: ' .MuiSlider-thumbColorPrimary',
    replacementSelector: '.MuiSlider-colorPrimary > .MuiSlider-thumb',
  },
  {
    deprecatedClass: ' .MuiSlider-thumbColorSecondary',
    replacementSelector: '.MuiSlider-colorSecondary > .MuiSlider-thumb',
  },
  {
    deprecatedClass: ' .MuiSlider-thumbColorError',
    replacementSelector: '.MuiSlider-colorError > .MuiSlider-thumb',
  },
  {
    deprecatedClass: ' .MuiSlider-thumbColorInfo',
    replacementSelector: '.MuiSlider-colorInfo > .MuiSlider-thumb',
  },
  {
    deprecatedClass: ' .MuiSlider-thumbColorSuccess',
    replacementSelector: '.MuiSlider-colorSuccess > .MuiSlider-thumb',
  },
  {
    deprecatedClass: ' .MuiSlider-thumbColorWarning',
    replacementSelector: '.MuiSlider-colorWarning > .MuiSlider-thumb',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated Slider classes with new classes`,
    Rule(rule) {
      const { selector } = rule;

      classes.forEach(({ deprecatedClass, replacementSelector }) => {
        const selectorRegex = new RegExp(`${deprecatedClass}`);

        if (selector.match(selectorRegex)) {
          rule.selector = selector.replace(selectorRegex, replacementSelector);
        }
      });
    },
  };
};
plugin.postcss = true;

module.exports = {
  plugin,
  classes,
};
