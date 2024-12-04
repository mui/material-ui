const classes = [
  {
    deprecatedClass: ' .MuiTableSortLabel-iconDirectionDesc',
    replacementSelector: '.MuiTableSortLabel-directionDesc > .MuiTableSortLabel-icon',
  },
  {
    deprecatedClass: ' .MuiTableSortLabel-iconDirectionAsc',
    replacementSelector: '.MuiTableSortLabel-directionAsc > .MuiTableSortLabel-icon',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated TableSortLabel classes with new classes`,
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
