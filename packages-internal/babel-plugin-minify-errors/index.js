// @ts-check

const helperModuleImports = require('@babel/helper-module-imports');
const fs = require('fs');

/**
 * @typedef {import('@babel/core')} babel
 */

/**
 * @typedef {{updatedErrorCodes?: boolean}} PluginState
 * @typedef {'annotate' | 'throw' | 'write'} MissingError
 * @typedef {{ errorCodesPath: string, missingError: MissingError }} Options
 */

/**
 *
 * @param {babel.types} t
 * @param {babel.NodePath} path
 * @param {PluginState} state
 * @param {{
 *   localName: string,
 *   missingError: MissingError,
 *   errorCodesLookup: Map<string, number>
 *   formatMuiErrorMessageIdentifier: babel.types.Identifier
 * }} config
 */
function replaceTaggedTemplates(
  t,
  path,
  state,
  { localName, missingError, errorCodesLookup, formatMuiErrorMessageIdentifier },
) {
  path.traverse({
    TaggedTemplateExpression(taggedTemplatePath) {
      if (!taggedTemplatePath.get('tag').isIdentifier({ name: localName })) {
        return;
      }

      // Input:
      //   `A message with ${interpolation}`
      // Output:
      //   'A message with %s',
      const msg = taggedTemplatePath.node.quasi.quasis
        .map((quasi) => quasi.value.cooked)
        .join('%s');
      const expressions = taggedTemplatePath.node.quasi.expressions.map((expression) => {
        if (t.isExpression(expression)) {
          return expression;
        }
        throw new Error('Can only evaluate expressions.');
      });

      let errorCode = errorCodesLookup.get(msg);
      if (errorCode === undefined) {
        switch (missingError) {
          case 'annotate': {
            // Outputs:
            // /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
            // throw new Error(muiErrorMsg`A message with ${interpolation}`)
            taggedTemplatePath.addComment(
              'leading',
              ' FIXME (minify-errors-in-prod): Unminified error message in production build! ',
            );
            return;
          }
          case 'throw': {
            throw new Error(
              `Missing error code for message '${msg}'. Did you forget to run \`pnpm extract-error-codes\` first?`,
            );
          }
          case 'write': {
            errorCode = errorCodesLookup.size + 1;
            errorCodesLookup.set(msg, errorCode);
            state.updatedErrorCodes = true;
            break;
          }
          default: {
            throw new Error(`Unknown missingError option: ${missingError}`);
          }
        }
      }

      if (!formatMuiErrorMessageIdentifier) {
        // Outputs:
        // import { formatMuiErrorMessage } from '@mui/utils';
        formatMuiErrorMessageIdentifier = helperModuleImports.addDefault(
          taggedTemplatePath,
          '@mui/utils/formatMuiErrorMessage',
          { nameHint: '_formatMuiErrorMessage' },
        );
      }

      // Outputs:
      //   `A ${adj} message that contains ${noun}`;
      const devMessage = taggedTemplatePath.get('quasi').node;

      // Outputs:
      // formatMuiErrorMessage(ERROR_CODE, adj, noun)
      const prodMessage = t.callExpression(t.cloneNode(formatMuiErrorMessageIdentifier, true), [
        t.numericLiteral(errorCode),
        ...expressions,
      ]);

      // Outputs:
      // new Error(
      //   process.env.NODE_ENV !== "production"
      //     ? `A message with ${interpolation}`
      //     : formatProdError('A message with %s', interpolation)
      // )
      taggedTemplatePath.replaceWith(
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
  });
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
      Program(path, state) {
        for (const statement of path.get('body')) {
          if (!statement.isImportDeclaration()) {
            continue;
          }

          if (statement.node.source.value !== '@mui/utils/muiErrorMsg') {
            continue;
          }

          const importSpecifiers = statement.get('specifiers');
          const defaultSpecifier = importSpecifiers.find((specifier) =>
            specifier.isImportDefaultSpecifier(),
          );

          if (!defaultSpecifier) {
            return;
          }

          const localName = defaultSpecifier.node.local.name;

          // TODO: safer to just keep this around and let minifiers remove it?
          if (importSpecifiers.length === 1) {
            statement.remove();
          } else {
            defaultSpecifier.remove();
          }

          // Outputs:
          // import { formatMuiErrorMessage } from '@mui/utils';
          const formatMuiErrorMessageIdentifier = helperModuleImports.addDefault(
            path,
            '@mui/utils/formatMuiErrorMessage',
            { nameHint: '_formatMuiErrorMessage' },
          );

          replaceTaggedTemplates(t, path, state, {
            localName,
            errorCodesLookup,
            missingError,
            formatMuiErrorMessageIdentifier,
          });
        }
      },
    },
    post() {
      if (missingError === 'write' && this.updatedErrorCodes) {
        const invertedErrorCodes = Object.fromEntries(
          Array.from(errorCodesLookup, ([key, value]) => [value, key]),
        );
        fs.writeFileSync(errorCodesPath, JSON.stringify(invertedErrorCodes, null, 2));
      }
    },
  };
};
