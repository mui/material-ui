// @ts-check

const helperModuleImports = require('@babel/helper-module-imports');
const fs = require('fs');
const nodePath = require('path');
const finder = require('find-package-json');

/**
 * Normalize a file path to POSIX in order for it to be platform-agnostic.
 * @param {string} importPath
 * @returns {string}
 */
function toPosixPath(importPath) {
  return nodePath.normalize(importPath).split(nodePath.sep).join(nodePath.posix.sep);
}

/**
 * Converts a file path to a node import specifier.
 * @param {string} importPath
 * @returns {string}
 */
function pathToNodeImportSpecifier(importPath) {
  const normalized = toPosixPath(importPath);
  return normalized.startsWith('/') || normalized.startsWith('.') ? normalized : `./${normalized}`;
}

const COMMENT_OPT_IN_MARKER = 'minify-error';
const COMMENT_OPT_OUT_MARKER = 'minify-error-disabled';

/**
 * @typedef {import('@babel/core')} babel
 */

/**
 * @typedef {babel.PluginPass & {updatedErrorCodes?: boolean, formatErrorMessageIdentifier?: babel.types.Identifier}} PluginState
 * @typedef {'annotate' | 'throw' | 'write'} MissingError
 * @typedef {{
 *   errorCodesPath: string,
 *   missingError: MissingError,
 *   runtimeModule?: string,
 *   detection?: 'opt-in' | 'opt-out',
 *   outExtension?: string
 * }} Options
 */

/**
 * Extracts the message and expressions from a node.
 * @param {babel.types} t
 * @param {babel.types.Node} node
 * @returns {{ message: string, expressions: babel.types.Expression[] } | null}
 */
function extractMessage(t, node) {
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
    const left = extractMessage(t, node.left);
    const right = extractMessage(t, node.right);
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
 * Handles unminifyable errors based on the missingError option.
 * @param {MissingError} missingError
 * @param {babel.NodePath} path
 */
function handleUnminifyableError(missingError, path) {
  switch (missingError) {
    case 'annotate':
      path.addComment(
        'leading',
        ' FIXME (minify-errors-in-prod): Unminifyable error in production! ',
      );
      break;
    case 'throw':
      throw new Error(
        'Unminifyable error. You can only use literal strings and template strings as error messages.',
      );
    case 'write':
      break;
    default:
      throw new Error(`Unknown missingError option: ${missingError}`);
  }
}

/**
 * Transforms the error message node.
 * @param {babel.types} t
 * @param {babel.NodePath} path
 * @param {babel.types.Expression} messageNode
 * @param {PluginState} state
 * @param {Map<string, number>} errorCodesLookup
 * @param {MissingError} missingError
 * @param {string} runtimeModule
 * @param {string} outExtension
 * @returns {babel.types.Expression | null}
 */
function transformMessage(
  t,
  path,
  messageNode,
  state,
  errorCodesLookup,
  missingError,
  runtimeModule,
  outExtension,
) {
  const message = extractMessage(t, messageNode);
  if (!message) {
    handleUnminifyableError(missingError, path);
    return null;
  }

  let errorCode = errorCodesLookup.get(message.message);
  if (errorCode === undefined) {
    switch (missingError) {
      case 'annotate':
        path.addComment(
          'leading',
          ' FIXME (minify-errors-in-prod): Unminified error message in production build! ',
        );
        return null;
      case 'throw':
        throw new Error(
          `Missing error code for message '${message.message}'. Did you forget to run \`pnpm extract-error-codes\` first?`,
        );
      case 'write':
        errorCode = errorCodesLookup.size + 1;
        errorCodesLookup.set(message.message, errorCode);
        state.updatedErrorCodes = true;
        break;
      default:
        throw new Error(`Unknown missingError option: ${missingError}`);
    }
  }

  if (!state.formatErrorMessageIdentifier) {
    state.formatErrorMessageIdentifier = helperModuleImports.addDefault(
      path,
      transformExtension(resolveRuntimeModule(runtimeModule, state), outExtension),
      { nameHint: '_formatErrorMessage' },
    );
  }

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
 * Resolves the runtime module path recursively.
 * @param {string} runtimeModule
 * @param {PluginState} state
 * @param {Set<string>} [visitedModules]
 * @returns {string}
 */
function resolveRuntimeModule(runtimeModule, state, visitedModules = new Set()) {
  if (!runtimeModule.startsWith('#')) {
    return runtimeModule;
  }

  const currentFile = state.filename;
  if (!currentFile) {
    throw new Error('filename is not defined');
  }

  const result = finder(currentFile).next();
  if (result.done) {
    throw new Error('Could not find package.json');
  }

  const pkg = result.value;
  const pkgPath = result.filename;
  const runtimeModulePath = pkg?.imports?.[runtimeModule];
  if (typeof runtimeModulePath !== 'string') {
    throw new Error(`Invalid runtime module path for ${runtimeModule}`);
  }

  if (visitedModules.has(runtimeModule)) {
    throw new Error(`Circular import detected for ${runtimeModule}`);
  }
  visitedModules.add(runtimeModule);

  if (runtimeModulePath.startsWith('.')) {
    const resolvedPath = nodePath.resolve(nodePath.dirname(pkgPath), runtimeModulePath);
    const relativePath = nodePath.relative(nodePath.dirname(currentFile), resolvedPath);
    return pathToNodeImportSpecifier(relativePath);
  }

  return resolveRuntimeModule(runtimeModulePath, state, visitedModules);
}

/**
 *
 * @param {string} importSpecifier
 * @param {string} outExtension
 * @returns
 */
function transformExtension(importSpecifier, outExtension = '.js') {
  return importSpecifier.replace(/\.[a-zA-Z0-9]+$/, outExtension);
}

/**
 * @param {babel} file
 * @param {Options} options
 * @returns {babel.PluginObj<PluginState>}
 */
module.exports = function plugin(
  { types: t },
  {
    errorCodesPath,
    missingError = 'annotate',
    runtimeModule = '#formatErrorMessage',
    detection = 'opt-in',
    outExtension = '.js',
  },
) {
  if (!errorCodesPath) {
    throw new Error('errorCodesPath is required.');
  }

  const errorCodesContent = fs.readFileSync(errorCodesPath, 'utf8');
  const errorCodes = JSON.parse(errorCodesContent);

  const errorCodesLookup = new Map(
    Object.entries(errorCodes).map(([key, value]) => [value, Number(key)]),
  );

  return {
    name: '@mui/internal-babel-plugin-minify-errors',
    visitor: {
      NewExpression(newExpressionPath, state) {
        if (!newExpressionPath.get('callee').isIdentifier({ name: 'Error' })) {
          return;
        }

        switch (detection) {
          case 'opt-in': {
            if (
              !newExpressionPath.node.leadingComments?.some((comment) =>
                comment.value.includes(COMMENT_OPT_IN_MARKER),
              )
            ) {
              return;
            }
            newExpressionPath.node.leadingComments = newExpressionPath.node.leadingComments.filter(
              (comment) => !comment.value.includes(COMMENT_OPT_IN_MARKER),
            );
            break;
          }
          case 'opt-out': {
            if (
              newExpressionPath.node.leadingComments?.some((comment) =>
                comment.value.includes(COMMENT_OPT_OUT_MARKER),
              )
            ) {
              newExpressionPath.node.leadingComments =
                newExpressionPath.node.leadingComments.filter(
                  (comment) => !comment.value.includes(COMMENT_OPT_OUT_MARKER),
                );
              return;
            }

            break;
          }
          default: {
            throw new Error(`Unknown detection option: ${detection}`);
          }
        }

        const messagePath = newExpressionPath.get('arguments')[0];
        if (!messagePath) {
          return;
        }

        const messageNode = messagePath.node;
        if (t.isSpreadElement(messageNode) || t.isArgumentPlaceholder(messageNode)) {
          handleUnminifyableError(missingError, newExpressionPath);
          return;
        }

        const transformedMessage = transformMessage(
          t,
          newExpressionPath,
          messageNode,
          state,
          errorCodesLookup,
          missingError,
          runtimeModule,
          outExtension,
        );

        if (transformedMessage) {
          messagePath.replaceWith(transformedMessage);
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
