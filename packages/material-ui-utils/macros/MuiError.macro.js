const { createMacro, MacroError } = require('babel-plugin-macros');
const helperModuleImports = require('@babel/helper-module-imports');
const evaluateStringAST = require('./evaluateStringAST');

function invertObject(object) {
  const inverted = {};
  Object.keys(object).forEach((key) => {
    inverted[object[key]] = key;
  });
  return inverted;
}

/**
 *
 * @param {import('babel-plugin-macros').MacroParams} param0
 */
function muiError({ references, babel, config }) {
  const { errorCodes = {}, missingError = 'annotate' } = config;
  const errorCodesLookup = invertObject(errorCodes);

  let handleMissingErrorCode;
  switch (missingError) {
    case 'annotate':
      handleMissingErrorCode = ({ devMessage, newExpressionPath }) => {
        // Outputs:
        // /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
        // throw new Error(`A message with ${interpolation}`)
        newExpressionPath.replaceWith(
          babel.types.newExpression(babel.types.identifier('Error'), [devMessage]),
        );
        newExpressionPath.addComment(
          'leading',
          ' FIXME (minify-errors-in-prod): Unminified error message in production build! ',
        );
      };
      break;
    case 'throw':
      handleMissingErrorCode = ({ errorMessageLiteral }) => {
        throw new MacroError(
          `Missing error code for message '${errorMessageLiteral}'. Did you forget to run \`yarn extract-errors\` first?`,
        );
      };
      break;
    default:
      throw new MacroError(
        `Unknown missing error behavior '${missingError}'. Can only handle 'annotate' and 'throw'.`,
      );
  }

  /**
   *
   * @param {import('@babel/core').types.Node} node
   */
  function evaluateMessage(node) {
    try {
      return evaluateStringAST(node, babel);
    } catch (error) {
      const macroError = new MacroError(error.message);
      macroError.stack = error.stack;
      throw macroError;
    }
  }

  references.default.forEach((babelPath) => {
    const newExpressionPath = babelPath.parentPath;
    if (!newExpressionPath.isNewExpression()) {
      throw new MacroError(
        'Encountered `MuiError` outside of a "new expression" e.g. `new MuiError()`. So far only new expressions are supported.',
      );
    }

    const errorMessageLiteral = evaluateMessage(newExpressionPath.node.arguments[0]);
    const errorMessageExpressions = newExpressionPath.node.arguments.slice(1);
    const errorMessageQuasis = errorMessageLiteral
      .split('%s')
      .map((raw) => babel.types.templateElement({ raw, cooked: String.raw({ raw }) }));

    // Outputs:
    //   `A ${adj} message that contains ${noun}`;
    const devMessage = babel.types.templateLiteral(errorMessageQuasis, errorMessageExpressions);

    let errorCode = errorCodesLookup[errorMessageLiteral];
    if (errorCode === undefined) {
      handleMissingErrorCode({ devMessage, errorMessageLiteral, newExpressionPath });
      return;
    }
    errorCode = parseInt(errorCode, 10);

    // Outputs:
    // import { formatMuiErrorMessage } from '@material-ui/utils';
    const formatMuiErrorMessageIdentifier = helperModuleImports.addNamed(
      babelPath,
      'formatMuiErrorMessage',
      '@material-ui/utils',
    );
    // Outputs:
    // formatMuiErrorMessage(ERROR_CODE, adj, noun)
    const prodMessage = babel.types.callExpression(formatMuiErrorMessageIdentifier, [
      babel.types.numericLiteral(errorCode),
      ...errorMessageExpressions,
    ]);

    // Outputs:
    // new Error(
    //   process.env.NODE_ENV !== "production"
    //     ? `A message with ${interpolation}`
    //     : formatProdError('A message with %s', interpolation)
    // )
    newExpressionPath.replaceWith(
      babel.types.newExpression(babel.types.identifier('Error'), [
        babel.types.conditionalExpression(
          babel.types.binaryExpression(
            '!==',
            babel.types.memberExpression(
              babel.types.memberExpression(
                babel.types.identifier('process'),
                babel.types.identifier('env'),
              ),
              babel.types.identifier('NODE_ENV'),
            ),
            babel.types.stringLiteral('production'),
          ),
          devMessage,
          prodMessage,
        ),
      ]),
    );
  });

  return { keepImports: false };
}

module.exports = createMacro(muiError, {
  configName: 'muiError',
});
