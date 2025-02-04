const classes = [
  {
    deprecatedClass: '.MuiTabs-flexContainer',
    replacementSelector: '.MuiTabs-list',
  },
  {
    deprecatedClass: '.MuiTabs-flexContainerVertical',
    replacementSelector: '.MuiTabs-list.MuiTabs-vertical',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated Tabs classes with new classes`,
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
