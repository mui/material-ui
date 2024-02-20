const classes = [
  {
    deprecatedClass: '.MuiButton-textInherit',
    replacementSelector: '.MuiButton-text.MuiButton-colorInherit',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textPrimary',
    replacementSelector: '.MuiButton-text.MuiButton-colorPrimary',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textSecondary',
    replacementSelector: '.MuiButton-text.MuiButton-colorSecondary',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textSuccess',
    replacementSelector: '.MuiButton-text.MuiButton-colorSuccess',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textError',
    replacementSelector: '.MuiButton-text.MuiButton-colorError',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textInfo',
    replacementSelector: '.MuiButton-text.MuiButton-colorInfo',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textWarning',
    replacementSelector: '.MuiButton-text.MuiButton-colorWarning',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedInherit',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorInherit',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedPrimary',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorPrimary',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSecondary',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorSecondary',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSuccess',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorSuccess',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedError',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorError',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedInfo',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorInfo',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedWarning',
    replacementSelector: '.MuiButton-outlined.MuiButton-colorWarning',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedInherit',
    replacementSelector: '.MuiButton-contained.MuiButton-colorInherit',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedPrimary',
    replacementSelector: '.MuiButton-contained.MuiButton-colorPrimary',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedSecondary',
    replacementSelector: '.MuiButton-contained.MuiButton-colorSecondary',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedSuccess',
    replacementSelector: '.MuiButton-contained.MuiButton-colorSuccess',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedError',
    replacementSelector: '.MuiButton-contained.MuiButton-colorError',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedInfo',
    replacementSelector: '.MuiButton-contained.MuiButton-colorInfo',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedWarning',
    replacementSelector: '.MuiButton-contained.MuiButton-colorWarning',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textSizeSmall',
    replacementSelector: '.MuiButton-text.MuiButton-sizeSmall',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textSizeLarge',
    replacementSelector: '.MuiButton-text.MuiButton-sizeLarge',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSizeSmall',
    replacementSelector: '.MuiButton-outlined.MuiButton-sizeSmall',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSizeLarge',
    replacementSelector: '.MuiButton-outlined.MuiButton-sizeLarge',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedSizeSmall',
    replacementSelector: '.MuiButton-contained.MuiButton-sizeSmall',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedSizeLarge',
    replacementSelector: '.MuiButton-contained.MuiButton-sizeLarge',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-textSizeMedium',
    replacementSelector: '.MuiButton-text.MuiButton-sizeMedium',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-outlinedSizeMedium',
    replacementSelector: '.MuiButton-outlined.MuiButton-sizeMedium',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-containedSizeMedium',
    replacementSelector: '.MuiButton-contained.MuiButton-sizeMedium',
    replacementSelectorPrefix: '&.',
  },
  {
    deprecatedClass: '.MuiButton-iconSizeSmall',
    replacementSelector: '.MuiButton-icon.MuiButton-sizeSmall',
    replacementSelectorPrefix: '& .',
  },
  {
    deprecatedClass: '.MuiButton-iconSizeMedium',
    replacementSelector: '.MuiButton-icon.MuiButton-sizeMedium',
    replacementSelectorPrefix: '& .',
  },
  {
    deprecatedClass: '.MuiButton-iconSizeLarge',
    replacementSelector: '.MuiButton-icon.MuiButton-sizeLarge',
    replacementSelectorPrefix: '& .',
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
