const classes = [
  {
    deprecatedClass: ' .MuiButtonGroup-groupedHorizontal',
    replacementSelector: '.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedVertical',
    replacementSelector: '.MuiButtonGroup-vertical > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedText',
    replacementSelector: '.MuiButtonGroup-text > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedTextHorizontal',
    replacementSelector: '.MuiButtonGroup-text.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedTextVertical',
    replacementSelector: '.MuiButtonGroup-text.MuiButtonGroup-vertical > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedTextPrimary',
    replacementSelector:
      '.MuiButtonGroup-text.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedTextSecondary',
    replacementSelector:
      '.MuiButtonGroup-text.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedOutlined',
    replacementSelector: '.MuiButtonGroup-outlined > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedOutlinedHorizontal',
    replacementSelector:
      '.MuiButtonGroup-outlined.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedOutlinedVertical',
    replacementSelector:
      '.MuiButtonGroup-outlined.MuiButtonGroup-vertical > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedOutlinedPrimary',
    replacementSelector:
      '.MuiButtonGroup-outlined.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedOutlinedSecondary',
    replacementSelector:
      '.MuiButtonGroup-outlined.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedContained',
    replacementSelector: '.MuiButtonGroup-contained > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedContainedHorizontal',
    replacementSelector:
      '.MuiButtonGroup-contained.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedContainedVertical',
    replacementSelector:
      '.MuiButtonGroup-contained.MuiButtonGroup-vertical > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedContainedPrimary',
    replacementSelector:
      '.MuiButtonGroup-contained.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped',
  },
  {
    deprecatedClass: ' .MuiButtonGroup-groupedContainedSecondary',
    replacementSelector:
      '.MuiButtonGroup-contained.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deperecated ButtonGroup classes with new classes`,
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
