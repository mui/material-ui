const classes = [
  {
    deprecatedClass: ' .MuiStepConnector-lineHorizontal',
    replacementSelector: '.MuiStepConnector-horizontal > .MuiStepConnector-line',
  },
  {
    deprecatedClass: ' .MuiStepConnector-lineVertical',
    replacementSelector: '.MuiStepConnector-vertical > .MuiStepConnector-line',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deperecated StepConnector classes with new classes`,
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
