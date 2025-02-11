// @ts-check

const helperModuleImports = require('@babel/helper-module-imports');
const fs = require('fs');

const COMMENT_MARKER = 'minify-error';

/**
 * @typedef {import('@babel/core')} babel
 */

/**
 * @typedef {{updatedErrorCodes?: boolean, formatErrorMessageIdentifier?: babel.types.Identifier}} PluginState
 * @typedef {'annotate' | 'throw' | 'write'} MissingError
 * @typedef {{ errorCodesPath: string, missingError: MissingError, runtimeModule?: string }} Options
 */

/**
 *
 * @param {babel.types} t
 * @param {babel.types.Node} node
 * @returns {{ message: string, expressions: babel.types.Expression[] } | null}
 */
function extractMessageFromExpression(t, node) {
  if (t.isTemplateLiteral(node)) {
    return {
      message: node.quasis.map((quasi) => quasi.value.cooked).join('%s'),
      expressions: node.expressions.map((expression) => {
        if (t.isExpression(expression)) {
          return expression;
        }
        throw new Error('Can only evaluate javascript template literals.');
      }),
    };
  }
  if (t.isStringLiteral(node)) {
    return { message: node.value, expressions: [] };
  }
  if (t.isBinaryExpression(node) && node.operator === '+') {
    if (t.isPrivateName(node.left)) {
      // This is only psossible with `in` expressions, e.g. `#foo in {}`
      throw new Error('Unreachable');
    }
    const left = extractMessageFromExpression(t, node.left);
    const right = extractMessageFromExpression(t, node.right);
    if (!left || !right) {
      return null;
    }
    return {
      message: left.message + right.message,
      expressions: [...left.expressions, ...right.expressions],
    };
  }
  return null;
}

/**
 *
 * @param {MissingError} missingError
 * @param {babel.NodePath} path
 * @returns
 */
function handleUnminifyable(missingError, path) {
  switch (missingError) {
    case 'annotate': {
      // Outputs:
      // /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
      // throw new Error(foo)
      path.addComment(
        'leading',
        ' FIXME (minify-errors-in-prod): Unminifyable error in production! ',
      );
      return;
    }
    case 'throw': {
      throw new Error(
        `Unminifyable error. You can only use literal strings and template strings as error messages.`,
      );
    }
    case 'write': {
      return;
    }
    default: {
      throw new Error(`Unknown missingError option: ${missingError}`);
    }
  }
}

/**
 * @param {babel.types} t
 * @param {babel.NodePath} path
 * @param {babel.types.Expression} messageNode
 * @param {PluginState} state
 * @param {Map<string, number>} errorCodesLookup
 * @param {MissingError} missingError
 * @param {string} runtimeModule
 * @returns {babel.types.Expression | null}
 */
function transformErrorMessage(
  t,
  path,
  messageNode,
  state,
  errorCodesLookup,
  missingError,
  runtimeModule,
) {
  const message = extractMessageFromExpression(t, messageNode);
  if (!message) {
    handleUnminifyable(missingError, path);
    return null;
  }

  let errorCode = errorCodesLookup.get(message.message);
  if (errorCode === undefined) {
    switch (missingError) {
      case 'annotate': {
        path.addComment(
          'leading',
          ' FIXME (minify-errors-in-prod): Unminified error message in production build! ',
        );
        return null;
      }
      case 'throw': {
        throw new Error(
          `Missing error code for message '${message.message}'. Did you forget to run \`pnpm extract-error-codes\` first?`,
        );
      }
      case 'write': {
        errorCode = errorCodesLookup.size + 1;
        errorCodesLookup.set(message.message, errorCode);
        state.updatedErrorCodes = true;
        break;
      }
      default: {
        throw new Error(`Unknown missingError option: ${missingError}`);
      }
    }
  }

  if (!state.formatErrorMessageIdentifier) {
    state.formatErrorMessageIdentifier = helperModuleImports.addDefault(path, runtimeModule, {
      nameHint: '_formatErrorMessage',
    });
  }

  // Return a conditional expression that uses the original message in development
  // and the minified version in production
  return t.conditionalExpression(
    t.binaryExpression(
      '!==',
      t.memberExpression(
        t.memberExpression(t.identifier('process'), t.identifier('env')),
        t.identifier('NODE_ENV'),
      ),
      t.stringLiteral('production'),
    ),
    messageNode,
    t.callExpression(t.cloneNode(state.formatErrorMessageIdentifier, true), [
      t.numericLiteral(errorCode),
      ...message.expressions,
    ]),
  );
}

/**
 * @param {babel} file
 * @param {Options} options
 * @returns {babel.PluginObj<PluginState>}
 */
module.exports = function plugin(
  { types: t },
  { errorCodesPath, missingError = 'annotate', runtimeModule },
) {
  if (!errorCodesPath) {
    throw new Error('errorCodesPath is required.');
  }

  if (!runtimeModule) {
    throw new Error('runtimeModule is required.');
  }

  const errorCodesContent = fs.readFileSync(errorCodesPath, 'utf8');
  const errorCodes = JSON.parse(errorCodesContent);

  const errorCodesLookup = new Map(
    Object.entries(errorCodes).map(([key, value]) => [value, Number(key)]),
  );

  return {
    visitor: {
      NewExpression(newExpressionPath, state) {
        if (!newExpressionPath.get('callee').isIdentifier({ name: 'Error' })) {
          return;
        }

        if (
          !newExpressionPath.node.leadingComments?.some((comment) =>
            comment.value.includes(COMMENT_MARKER),
          )
        ) {
          return;
        }

        newExpressionPath.node.leadingComments = newExpressionPath.node.leadingComments.filter(
          (comment) => !comment.value.includes(COMMENT_MARKER),
        );

        const messagePath = newExpressionPath.get('arguments')[0];
        if (!messagePath) {
          return;
        }

        const messageNode = messagePath.node;
        if (t.isSpreadElement(messageNode) || t.isArgumentPlaceholder(messageNode)) {
          handleUnminifyable(missingError, newExpressionPath);
          return;
        }

        const transformedMessage = transformErrorMessage(
          t,
          newExpressionPath,
          messageNode,
          state,
          errorCodesLookup,
          missingError,
          runtimeModule,
        );
        if (transformedMessage) {
          messagePath.replaceWith(transformedMessage);
        }
      },
      TaggedTemplateExpression(path, state) {
        // Get the tag function
        const tag = path.get('tag');
        if (!tag.isIdentifier()) {
          return;
        }

        // Check if the tag is imported from our package
        const binding = path.scope.getBinding(tag.node.name);
        if (!binding?.path.isImportDefaultSpecifier()) {
          return;
        }
        const importPath = binding.path.parentPath;
        if (!importPath.isImportDeclaration()) {
          return;
        }
        if (!importPath.node.source.value.endsWith('/tag')) {
          return;
        }

        const transformedMessage = transformErrorMessage(
          t,
          path,
          path.node.quasi,
          state,
          errorCodesLookup,
          missingError,
          runtimeModule,
        );
        if (transformedMessage) {
          path.replaceWith(transformedMessage);
          importPath.remove();
        }
      },
    },
    post() {
      if (missingError === 'write' && this.updatedErrorCodes) {
        const invertedErrorCodes = Object.fromEntries(
          Array.from(errorCodesLookup, ([key, value]) => [value, key]),
        );
        fs.writeFileSync(errorCodesPath, `${JSON.stringify(invertedErrorCodes, null, 2)}\n`);
      }
    },
  };
};
