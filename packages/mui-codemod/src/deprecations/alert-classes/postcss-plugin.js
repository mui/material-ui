const variants = ['standard', 'outlined', 'filled'];
const colors = ['Success', 'Info', 'Warning', 'Error'];

const classes = variants.reduce((acc, variant) => {
  return acc.concat(
    colors.map((color) => {
      const deprecatedClass = `.MuiAlert-${variant}${color}`;
      const replacementSelector = `.MuiAlert-${variant}.MuiAlert-color${color}`;

      return {
        deprecatedClass,
        replacementSelector,
      };
    }),
  );
}, []);

const plugin = () => {
  return {
    postcssPlugin: `Replace deperecated Alert classes with new classes`,
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
