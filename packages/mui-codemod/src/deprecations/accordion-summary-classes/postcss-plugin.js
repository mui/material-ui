const deprecatedClass = '.MuiAccordionSummary-contentGutters';
const replacementSelector = '.MuiAccordionSummary-gutters .MuiAccordionSummary-content';

const plugin = () => {
  return {
    postcssPlugin: `Replace ${deprecatedClass} with ${replacementSelector}`,
    Rule(rule) {
      const { selector } = rule;

      // contentGutters is a special case as it's applied to the content child
      // but gutters is applied to the parent element, so the gutter class needs to go on the parent

      const selectorRegex = new RegExp(` ${deprecatedClass}`);
      if (selector.match(selectorRegex)) {
        rule.selector = selector.replace(selectorRegex, replacementSelector);
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
