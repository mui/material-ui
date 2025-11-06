const classes = [
  {
    deprecatedClass: '.MuiChip-clickableColorPrimary',
    replacementSelector: '.MuiChip-clickable.MuiChip-colorPrimary',
  },
  {
    deprecatedClass: '.MuiChip-clickableColorSecondary',
    replacementSelector: '.MuiChip-clickable.MuiChip-colorSecondary',
  },
  {
    deprecatedClass: '.MuiChip-deletableColorPrimary',
    replacementSelector: '.MuiChip-deletable.MuiChip-colorPrimary',
  },
  {
    deprecatedClass: '.MuiChip-deletableColorSecondary',
    replacementSelector: '.MuiChip-deletable.MuiChip-colorSecondary',
  },
  {
    deprecatedClass: '.MuiChip-outlinedPrimary',
    replacementSelector: '.MuiChip-outlined.MuiChip-colorPrimary',
  },
  {
    deprecatedClass: '.MuiChip-outlinedSecondary',
    replacementSelector: '.MuiChip-outlined.MuiChip-colorSecondary',
  },
  {
    deprecatedClass: '.MuiChip-filledPrimary',
    replacementSelector: '.MuiChip-filled.MuiChip-colorPrimary',
  },
  {
    deprecatedClass: '.MuiChip-filledSecondary',
    replacementSelector: '.MuiChip-filled.MuiChip-colorSecondary',
  },
  {
    deprecatedClass: ' .MuiChip-avatarSmall',
    replacementSelector: '.MuiChip-sizeSmall > .MuiChip-avatar',
  },
  {
    deprecatedClass: ' .MuiChip-avatarMedium',
    replacementSelector: '.MuiChip-sizeMedium > .MuiChip-avatar',
  },
  {
    deprecatedClass: ' .MuiChip-avatarColorPrimary',
    replacementSelector: '.MuiChip-colorPrimary > .MuiChip-avatar',
  },
  {
    deprecatedClass: ' .MuiChip-avatarColorSecondary',
    replacementSelector: '.MuiChip-colorSecondary > .MuiChip-avatar',
  },
  {
    deprecatedClass: ' .MuiChip-iconSmall',
    replacementSelector: '.MuiChip-sizeSmall > .MuiChip-icon',
  },
  {
    deprecatedClass: ' .MuiChip-iconMedium',
    replacementSelector: '.MuiChip-sizeMedium > .MuiChip-icon',
  },
  {
    deprecatedClass: ' .MuiChip-iconColorPrimary',
    replacementSelector: '.MuiChip-colorPrimary > .MuiChip-icon',
  },
  {
    deprecatedClass: ' .MuiChip-iconColorSecondary',
    replacementSelector: '.MuiChip-colorSecondary > .MuiChip-icon',
  },
  {
    deprecatedClass: ' .MuiChip-labelSmall',
    replacementSelector: '.MuiChip-sizeSmall > .MuiChip-label',
  },
  {
    deprecatedClass: ' .MuiChip-labelMedium',
    replacementSelector: '.MuiChip-sizeMedium > .MuiChip-label',
  },
  {
    deprecatedClass: ' .MuiChip-deleteIconSmall',
    replacementSelector: '.MuiChip-sizeSmall > .MuiChip-deleteIcon',
  },
  {
    deprecatedClass: ' .MuiChip-deleteIconMedium',
    replacementSelector: '.MuiChip-sizeMedium > .MuiChip-deleteIcon',
  },
  {
    deprecatedClass: ' .MuiChip-deleteIconColorPrimary',
    replacementSelector: '.MuiChip-colorPrimary > .MuiChip-deleteIcon',
  },
  {
    deprecatedClass: ' .MuiChip-deleteIconColorSecondary',
    replacementSelector: '.MuiChip-colorSecondary > .MuiChip-deleteIcon',
  },
  {
    deprecatedClass: ' .MuiChip-deleteIconOutlinedColorPrimary',
    replacementSelector: '.MuiChip-outlined.MuiChip-colorPrimary > .MuiChip-deleteIcon',
  },
  {
    deprecatedClass: ' .MuiChip-deleteIconOutlinedColorSecondary',
    replacementSelector: '.MuiChip-outlined.MuiChip-colorSecondary > .MuiChip-deleteIcon',
  },
  {
    deprecatedClass: ' .MuiChip-deleteIconFilledColorPrimary',
    replacementSelector: '.MuiChip-filled.MuiChip-colorPrimary > .MuiChip-deleteIcon',
  },
  {
    deprecatedClass: ' .MuiChip-deleteIconFilledColorSecondary',
    replacementSelector: '.MuiChip-filled.MuiChip-colorSecondary > .MuiChip-deleteIcon',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deperecated Chip classes with new classes`,
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
