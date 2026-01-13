const classes = [
  {
    deprecatedClass: ' .MuiInputBase-inputSizeSmall',
    replacementSelector: '.MuiInputBase-sizeSmall > .MuiInputBase-input',
  },
  {
    deprecatedClass: ' .MuiInputBase-inputMultiline',
    replacementSelector: '.MuiInputBase-multiline > .MuiInputBase-input',
  },
  {
    deprecatedClass: ' .MuiInputBase-inputAdornedStart',
    replacementSelector: '.MuiInputBase-adornedStart > .MuiInputBase-input',
  },
  {
    deprecatedClass: ' .MuiInputBase-inputAdornedEnd',
    replacementSelector: '.MuiInputBase-adornedEnd > .MuiInputBase-input',
  },
  {
    deprecatedClass: ' .MuiInputBase-inputHiddenLabel',
    replacementSelector: '.MuiInputBase-hiddenLabel > .MuiInputBase-input',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated InputBase classes with new classes`,
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
