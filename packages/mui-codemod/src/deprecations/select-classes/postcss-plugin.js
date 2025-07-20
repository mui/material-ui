const classes = [
  {
    deprecatedClass: ' .MuiSelect-iconFilled',
    replacementSelector: ' .MuiSelect-filled ~ .MuiSelect-icon',
  },
  {
    deprecatedClass: ' .MuiSelect-iconOutlined',
    replacementSelector: ' .MuiSelect-outlined ~ .MuiSelect-icon',
  },
  {
    deprecatedClass: ' .MuiSelect-iconStandard',
    replacementSelector: ' .MuiSelect-standard ~ .MuiSelect-icon',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated Select classes with new classes`,
    Rule(rule) {
      const { selector } = rule;

      classes.forEach(({ deprecatedClass, replacementSelector }) => {
        const selectorRegex = new RegExp(`${deprecatedClass.trim()}$`);

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
