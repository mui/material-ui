const classes = [
  {
    deprecatedClass: ' .MuiDrawer-paperAnchorBottom',
    replacementSelector: '.MuiDrawer-anchorBottom > .MuiDrawer-paper',
  },
  {
    deprecatedClass: ' .MuiDrawer-paperAnchorLeft',
    replacementSelector: '.MuiDrawer-anchorLeft > .MuiDrawer-paper',
  },
  {
    deprecatedClass: ' .MuiDrawer-paperAnchorRight',
    replacementSelector: '.MuiDrawer-anchorRight > .MuiDrawer-paper',
  },
  {
    deprecatedClass: ' .MuiDrawer-paperAnchorTop',
    replacementSelector: '.MuiDrawer-anchorTop > .MuiDrawer-paper',
  },
  {
    deprecatedClass: ' .MuiDrawer-paperAnchorDockedBottom',
    replacementSelector: '.MuiDrawer-docked.MuiDrawer-anchorBottom > .MuiDrawer-paper',
  },
  {
    deprecatedClass: ' .MuiDrawer-paperAnchorDockedLeft',
    replacementSelector: '.MuiDrawer-docked.MuiDrawer-anchorLeft > .MuiDrawer-paper',
  },
  {
    deprecatedClass: ' .MuiDrawer-paperAnchorDockedRight',
    replacementSelector: '.MuiDrawer-docked.MuiDrawer-anchorRight > .MuiDrawer-paper',
  },
  {
    deprecatedClass: ' .MuiDrawer-paperAnchorDockedTop',
    replacementSelector: '.MuiDrawer-docked.MuiDrawer-anchorTop > .MuiDrawer-paper',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated Drawer classes with new classes`,
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
