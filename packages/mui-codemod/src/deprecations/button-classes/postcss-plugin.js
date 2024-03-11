const classes = [
  {
    deprecatedClass: '.MuiButton-textInherit',
    replacementSelector: '.MuiButton-text.MuiButton-colorInherit',
  },
  {
    deprecatedClass: '.MuiButton-textPrimary',
    replacementSelector: '.MuiButton-text.MuiButton-colorPrimary',
  },
  {
    deprecatedClass: '.MuiButton-textSecondary',
    replacementSelector: '.MuiButton-text.MuiButton-colorSecondary',
  },
  {
    deprecatedClass: '.MuiButton-textSuccess',
    replacementSelector: '.MuiButton-text.MuiButton-colorSuccess',
  },
  {
    deprecatedClass: '.MuiButton-textError',
    replacementSelector: '.MuiButton-text.MuiButton-colorError',
  },
  {
    deprecatedClass: '.MuiButton-textInfo',
    replacementSelector: '.MuiButton-text.MuiButton-colorInfo',
  },
  {
    deprecatedClass: '.MuiButton-textWarning',
    replacementSelector: '.MuiButton-text.MuiButton-colorWarning',
  },
  {
    deprecatedClass: '.MuiButton-outlinedInherit',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorInherit',
  },
  {
    deprecatedClass: '.MuiButton-outlinedPrimary',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorPrimary',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSecondary',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorSecondary',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSuccess',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorSuccess',
  },
  {
    deprecatedClass: '.MuiButton-outlinedError',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorError',
  },
  {
    deprecatedClass: '.MuiButton-outlinedInfo',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorInfo',
  },
  {
    deprecatedClass: '.MuiButton-outlinedWarning',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorWarning',
  },
  {
    deprecatedClass: '.MuiButton-containedInherit',
    replacementSelector: '.MuiButton-contained.MuiButton-colorInherit',
  },
  {
    deprecatedClass: '.MuiButton-containedPrimary',
    replacementSelector: '.MuiButton-contained.MuiButton-colorPrimary',
  },
  {
    deprecatedClass: '.MuiButton-containedSecondary',
    replacementSelector: '.MuiButton-contained.MuiButton-colorSecondary',
  },
  {
    deprecatedClass: '.MuiButton-containedSuccess',
    replacementSelector: '.MuiButton-contained.MuiButton-colorSuccess',
  },
  {
    deprecatedClass: '.MuiButton-containedError',
    replacementSelector: '.MuiButton-contained.MuiButton-colorError',
  },
  {
    deprecatedClass: '.MuiButton-containedInfo',
    replacementSelector: '.MuiButton-contained.MuiButton-colorInfo',
  },
  {
    deprecatedClass: '.MuiButton-containedWarning',
    replacementSelector: '.MuiButton-contained.MuiButton-colorWarning',
  },
  {
    deprecatedClass: '.MuiButton-textSizeSmall',
    replacementSelector: '.MuiButton-text.MuiButton-sizeSmall',
  },
  {
    deprecatedClass: '.MuiButton-textSizeLarge',
    replacementSelector: '.MuiButton-text.MuiButton-sizeLarge',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSizeSmall',
    replacementSelector: '.MuiButton-outlined.MuiButton-sizeSmall',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSizeLarge',
    replacementSelector: '.MuiButton-outlined.MuiButton-sizeLarge',
  },
  {
    deprecatedClass: '.MuiButton-containedSizeSmall',
    replacementSelector: '.MuiButton-contained.MuiButton-sizeSmall',
  },
  {
    deprecatedClass: '.MuiButton-containedSizeLarge',
    replacementSelector: '.MuiButton-contained.MuiButton-sizeLarge',
  },
  {
    deprecatedClass: '.MuiButton-textSizeMedium',
    replacementSelector: '.MuiButton-text.MuiButton-sizeMedium',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSizeMedium',
    replacementSelector: '.MuiButton-outlined.MuiButton-sizeMedium',
  },
  {
    deprecatedClass: '.MuiButton-containedSizeMedium',
    replacementSelector: '.MuiButton-contained.MuiButton-sizeMedium',
  },
  {
    deprecatedClass: ' .MuiButton-iconSizeSmall',
    replacementSelector: '.MuiButton-sizeSmall > .MuiButton-icon',
  },
  {
    deprecatedClass: ' .MuiButton-iconSizeMedium',
    replacementSelector: '.MuiButton-sizeMedium > .MuiButton-icon',
  },
  {
    deprecatedClass: ' .MuiButton-iconSizeLarge',
    replacementSelector: '.MuiButton-sizeLarge > .MuiButton-icon',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deperecated Button classes with new classes`,
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
