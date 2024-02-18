const classes = [
  {
    deprecatedClass: '&.MuiPaginationItem-textPrimary',
    replacementSelector: '&.MuiPaginationItem-text.MuiPaginationItem-primary',
  },
  {
    deprecatedClass: '&.MuiPaginationItem-textSecondary',
    replacementSelector: '&.MuiPaginationItem-text.MuiPaginationItem-secondary',
  },
  {
    deprecatedClass: '&.MuiPaginationItem-outlinedPrimary',
    replacementSelector: '&.MuiPaginationItem-outlined.MuiPaginationItem-primary',
  },
  {
    deprecatedClass: '&.MuiPaginationItem-outlinedSecondary',
    replacementSelector: '&.MuiPaginationItem-outlined.MuiPaginationItem-secondary',
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
