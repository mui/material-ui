const classes = [
  {
    deprecatedClass: ' .MuiLinearProgress-bar1Buffer',
    replacementSelector: '.MuiLinearProgress-buffer > .MuiLinearProgress-bar1',
  },
  {
    deprecatedClass: ' .MuiLinearProgress-bar1Determinate',
    replacementSelector: '.MuiLinearProgress-determinate > .MuiLinearProgress-bar1',
  },
  {
    deprecatedClass: ' .MuiLinearProgress-bar1Indeterminate',
    replacementSelector: '.MuiLinearProgress-indeterminate > .MuiLinearProgress-bar1',
  },
  {
    deprecatedClass: ' .MuiLinearProgress-bar2Buffer',
    replacementSelector: '.MuiLinearProgress-buffer > .MuiLinearProgress-bar2',
  },
  {
    deprecatedClass: ' .MuiLinearProgress-bar2Indeterminate',
    replacementSelector: '.MuiLinearProgress-indeterminate > .MuiLinearProgress-bar2',
  },
  {
    deprecatedClass: ' .MuiLinearProgress-barColorPrimary',
    replacementSelector: '.MuiLinearProgress-colorPrimary > .MuiLinearProgress-bar',
  },
  {
    deprecatedClass: ' .MuiLinearProgress-barColorSecondary',
    replacementSelector: '.MuiLinearProgress-colorSecondary > .MuiLinearProgress-bar',
  },
  {
    deprecatedClass: ' .MuiLinearProgress-dashedColorPrimary',
    replacementSelector: '.MuiLinearProgress-colorPrimary > .MuiLinearProgress-dashed',
  },
  {
    deprecatedClass: ' .MuiLinearProgress-dashedColorSecondary',
    replacementSelector: '.MuiLinearProgress-colorSecondary > .MuiLinearProgress-dashed',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated LinearProgress classes with new classes`,
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
