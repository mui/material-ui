/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta: {
    messages: {
      'keyboard-target':
        "Don't use document.activeElement as a target for keyboard events. Prefer the actual element.",
    },
  },
  create(context) {
    return {
      /**
       * @param {import('estree').CallExpression} node
       */
      CallExpression(node) {
        const keyboardEventDispatchers = ['keyDown', 'keyUp'];
        const {
          arguments: [firstArgument],
          callee,
        } = node;
        const isFireKeyboardEvent =
          callee.type === 'MemberExpression' &&
          keyboardEventDispatchers.indexOf(callee.property.name) !== -1 &&
          callee.object.name === 'fireEvent';
        const targetsDocumentActiveElement =
          firstArgument !== undefined &&
          firstArgument.type === 'MemberExpression' &&
          firstArgument.object.name === 'document' &&
          firstArgument.property.name === 'activeElement';

        if (isFireKeyboardEvent && targetsDocumentActiveElement) {
          context.report({ messageId: 'keyboard-target', node: firstArgument });
        }
      },
    };
  },
};

module.exports = rule;
