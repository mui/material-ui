const path = require('path');
const resolve = require('eslint-module-utils/resolve').default;
const moduleVisitor = require('eslint-module-utils/moduleVisitor').default;
const minimatch = require('minimatch');
/**
 * @typedef {Object} PatternConfig
 * @property {string} pattern - The pattern to match against resolved imports
 * @property {string} [message] - Custom message to show when the pattern matches
 */

/**
 * Creates an ESLint rule that restricts imports based on their resolved paths.
 * Works with both ESM (import) and CommonJS (require) imports.
 *
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description: 'Disallow imports that resolve to certain patterns.',
    },
    messages: {
      restrictedResolvedImport:
        'Importing from "{{importSource}}" is restricted because it resolves to "{{resolvedPath}}", which matches the pattern "{{pattern}}".{{customMessage}}',
    },
    type: 'suggestion',
    schema: [
      {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            pattern: { type: 'string' },
            message: { type: 'string' },
          },
          required: ['pattern'],
          additionalProperties: false,
        },
      },
    ],
  },
  create(context) {
    const options = context.options[0] || [];

    if (!Array.isArray(options) || options.length === 0) {
      return {};
    }

    return moduleVisitor(
      (source, node) => {
        // Get the resolved path of the import
        const resolvedPath = resolve(source.value, context);

        if (!resolvedPath) {
          return;
        }

        // Normalize the resolved path to use forward slashes
        const normalizedPath = resolvedPath.split(path.sep).join('/');

        // Check each pattern against the resolved path
        for (const option of options) {
          const { pattern, message = '' } = option;

          if (minimatch(normalizedPath, pattern)) {
            context.report({
              node,
              messageId: 'restrictedResolvedImport',
              data: {
                importSource: source.value,
                resolvedPath: normalizedPath,
                pattern,
                customMessage: message ? ` ${message}` : '',
              },
            });

            // Stop after first match
            break;
          }
        }
      },
      { commonjs: true, es6: true },
    ); // This handles both require() and import statements
  },
};

module.exports = rule;
