const classes = [
  {
    deprecatedClass: ' .MuiDialog-paperScrollBody',
    replacementSelector: ' .MuiDialog-scrollBody > .MuiDialog-paper',
  },
  {
    deprecatedClass: ' .MuiDialog-paperScrollPaper',
    replacementSelector: ' .MuiDialog-scrollPaper > .MuiDialog-paper',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated Dialog classes with new classes`,
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
