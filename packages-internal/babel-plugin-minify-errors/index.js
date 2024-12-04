// @ts-check

const helperModuleImports = require('@babel/helper-module-imports');
const fs = require('fs');

const COMMENT_MARKER = 'minify-error';

/**
 * @typedef {import('@babel/core')} babel
 */

/**
 * @typedef {{updatedErrorCodes?: boolean, formatMuiErrorMessageIdentifier?: babel.types.Identifier}} PluginState
 * @typedef {'annotate' | 'throw' | 'write'} MissingError
 * @typedef {{ errorCodesPath: string, missingError: MissingError }} Options
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
 * @param {babel} file
 * @param {Options} options
 * @returns {babel.PluginObj<PluginState>}
 */
module.exports = function plugin({ types: t }, { errorCodesPath, missingError = 'annotate' }) {
  if (!errorCodesPath) {
    throw new Error('errorCodesPath is required.');
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

        const message = extractMessageFromExpression(t, messageNode);

        if (!message) {
          handleUnminifyable(missingError, newExpressionPath);
          return;
        }

        let errorCode = errorCodesLookup.get(message.message);
        if (errorCode === undefined) {
          switch (missingError) {
            case 'annotate': {
              // Outputs:
              // /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
              // throw new Error(`A message with ${interpolation}`)
              newExpressionPath.addComment(
                'leading',
                ' FIXME (minify-errors-in-prod): Unminified error message in production build! ',
              );
              return;
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

        if (!state.formatMuiErrorMessageIdentifier) {
          // Outputs:
          // import { formatMuiErrorMessage } from '@mui/utils';
          state.formatMuiErrorMessageIdentifier = helperModuleImports.addDefault(
            newExpressionPath,
            '@mui/utils/formatMuiErrorMessage',
            { nameHint: '_formatMuiErrorMessage' },
          );
        }

        // Outputs:
        //   `A ${adj} message that contains ${noun}`;
        const devMessage = messageNode;

        // Outputs:
        // formatMuiErrorMessage(ERROR_CODE, adj, noun)
        const prodMessage = t.callExpression(
          t.cloneNode(state.formatMuiErrorMessageIdentifier, true),
          [t.numericLiteral(errorCode), ...message.expressions],
        );

        // Outputs:
        // new Error(
        //   process.env.NODE_ENV !== "production"
        //     ? `A message with ${interpolation}`
        //     : formatProdError('A message with %s', interpolation)
        // )
        messagePath.replaceWith(
          t.conditionalExpression(
            t.binaryExpression(
              '!==',
              t.memberExpression(
                t.memberExpression(t.identifier('process'), t.identifier('env')),
                t.identifier('NODE_ENV'),
              ),
              t.stringLiteral('production'),
            ),
            devMessage,
            prodMessage,
          ),
        );
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
