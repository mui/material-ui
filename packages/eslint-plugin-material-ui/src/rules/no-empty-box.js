/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description: 'Disallow use of <Box /> that should be a DOM host element.',
    },
    messages: {
      emptyBox: 'Empty <Box /> is not allowed, use host DOM element instead: <{{component}}>.',
    },
    // fixable: 'code', TODO
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name !== 'Box') {
          return;
        }

        let component = 'div';
        let validUse = false;

        node.attributes.forEach((decl) => {
          // We can't know, let's say it's ok.
          if (decl.type === 'JSXSpreadAttribute') {
            validUse = true;
            return;
          }

          const name = decl.name.name;

          if (name === 'component') {
            component = decl.value.value;
            return;
          }

          validUse = true;
        });

        if (!validUse) {
          context.report({
            node,
            messageId: 'emptyBox',
            data: { component },
            // fix: (fixer) => {
            //   return fixer.replaceTextRange(node.name.range, component);
            // },
          });
        }
      },
    };
  },
};

module.exports = rule;
