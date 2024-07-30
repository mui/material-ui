const classes = [
  {
    deprecatedClass: ' .MuiImageListItemBar-titleWrapBelow',
    replacementSelector: '.MuiImageListItemBar-positionBelow > .MuiImageListItemBar-titleWrap',
  },
  {
    deprecatedClass: ' .MuiImageListItemBar-titleWrapActionPosLeft',
    replacementSelector: '.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-titleWrap',
  },
  {
    deprecatedClass: ' .MuiImageListItemBar-titleWrapActionPosRight',
    replacementSelector:
      '.MuiImageListItemBar-actionPositionRight > .MuiImageListItemBar-titleWrap',
  },
  {
    deprecatedClass: ' .MuiImageListItemBar-actionIconActionPosLeft',
    replacementSelector:
      '.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-actionIcon',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated ImageListItemBar classes with new classes`,
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
