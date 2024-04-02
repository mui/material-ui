const classes = [
  {
    deprecatedClass: ' .MuiToggleButtonGroup-groupedHorizontal',
    replacementSelector: '.MuiToggleButtonGroup-horizontal > .MuiToggleButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiToggleButtonGroup-groupedVertical',
    replacementSelector: '.MuiToggleButtonGroup-vertical > .MuiToggleButtonGroup-grouped',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deperecated ToggleButtonGroup classes with new classes`,
    Rule(rule) {
      const { selector } = rule;

      classes.forEach(({ deprecatedClass, replacementSelector }) => {
        const selectorRegex = new RegExp(`${deprecatedClass}$`);

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
