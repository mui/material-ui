const deprecatedClass = '.MuiAccordionSummary-contentGutters';
const replacementSelector = '.MuiAccordionSummary-gutters .MuiAccordionSummary-content';

const plugin = () => {
  return {
    postcssPlugin: `Replace ${deprecatedClass} with ${replacementSelector}`,
    Rule(rule) {
      const { selector } = rule;
      const directRegex = new RegExp(`^${deprecatedClass}`);
      const childSelectorRegex = new RegExp(` ${deprecatedClass}`);

      if (selector.match(directRegex)) {
        rule.selector = selector.replace(directRegex, replacementSelector);
      } else if (selector.match(childSelectorRegex)) {
        // this is a special case for contentGutters as it's applied to the content child
        // but gutters is applied to the parent element, so the gutter class needs to go on the parent
        rule.selector = selector.replace(childSelectorRegex, replacementSelector);
      }
    },
  };
};
plugin.postcss = true;

module.exports = {
  plugin,
  deprecatedClass,
  replacementSelector,
};
