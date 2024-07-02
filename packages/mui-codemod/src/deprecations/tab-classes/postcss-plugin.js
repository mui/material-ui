const classes = [
  {
    deprecatedClass: ' .MuiTab-iconWrapper',
    replacementSelector: ' .MuiTab-icon',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated Tab classes with new classes`,
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
