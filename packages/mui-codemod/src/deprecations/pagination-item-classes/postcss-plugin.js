const classes = [
  {
    deprecatedClass: '.MuiPaginationItem-textPrimary',
    replacementSelector: '.MuiPaginationItem-text.MuiPaginationItem-colorPrimary',
  },
  {
    deprecatedClass: '.MuiPaginationItem-textSecondary',
    replacementSelector: '.MuiPaginationItem-text.MuiPaginationItem-colorSecondary',
  },
  {
    deprecatedClass: '.MuiPaginationItem-outlinedPrimary',
    replacementSelector: '.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary',
  },
  {
    deprecatedClass: '.MuiPaginationItem-outlinedSecondary',
    replacementSelector: '.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deperecated PaginationItem classes with new classes`,
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
