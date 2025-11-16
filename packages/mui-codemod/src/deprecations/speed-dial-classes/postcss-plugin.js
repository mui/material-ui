const classes = [
  {
    deprecatedClass: '.MuiSpeedDial-actionsClosed',
    replacementSelector: '.MuiSpeedDial-actions.MuiSpeedDial-closed',
  },
  {
    deprecatedClass: '.MuiSpeedDialAction-fabClosed',
    replacementSelector: '.MuiSpeedDialAction-fab.MuiSpeedDialAction-closed',
  },
  {
    deprecatedClass: '.MuiSpeedDialAction-staticTooltipClosed',
    replacementSelector: '.MuiSpeedDialAction-staticTooltip.MuiSpeedDialAction-closed',
  },
  {
    deprecatedClass: '.MuiSpeedDialIcon-iconWithOpenIconOpen',
    replacementSelector: '.MuiSpeedDialIcon-iconWithOpenIcon.MuiSpeedDialIcon-open',
  },
  {
    deprecatedClass: '.MuiSpeedDialIcon-openIconOpen',
    replacementSelector: '.MuiSpeedDialIcon-openIcon.MuiSpeedDialIcon-open',
  },
];

const plugin = () => {
  return {
    postcssPlugin: `Replace deprecated SpeedDial classes with new classes`,
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
