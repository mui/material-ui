import * as babel from '@babel/core';
import { readFile } from 'fs-extra';
import * as path from 'path';

const workspaceRoot = path.join(__dirname, '../../../../');
const babelConfigPath = path.join(workspaceRoot, 'babel.config.js');

function withExtension(filepath, extension) {
  return path.join(
    path.dirname(filepath),
    path.basename(filepath, path.extname(filepath)) + extension,
  );
}

/**
 * @param {string} filename
 * @param {string} configFilePath
 */
async function parseWithConfig(filename, configFilePath) {
  const source = await readFile(filename, { encoding: 'utf8' });
  const partialConfig = babel.loadPartialConfig({
    configFile: configFilePath,
    filename,
  });
  return babel.parseAsync(source, partialConfig.options);
}

function findConformanceDescriptor(program) {
  const { types: t } = babel;

  let descriptor = {};
  babel.traverse(program, {
    CallExpression(babelPath) {
      const { node: callExpression } = babelPath;
      const { callee } = callExpression;
      if (t.isIdentifier(callee) && callee.name === 'describeConformance') {
        // describeConformance(element, () => options);
        descriptor = callExpression.arguments[1].body;
      }
    },
  });

  if (descriptor.type != null && !t.isObjectExpression(descriptor)) {
    throw new Error(`Expected an object expression as a descriptor but found ${descriptor.type}`);
  }

  return descriptor;
}

/**
 * Finds if `mount` was created with `strict: true`
 * Only supports a single pattern
 * ```js
 * // somewhere in the code, not necessarily the same binding
 * mount = createMount({ strict: true });
 * ```
 *
 * @param {import('@babel/types').Identifier} mountIdentifier
 * @param {import('@babel/types').Program} program
 */
function isStrictMount(mountIdentifier, program) {
  // assume the path is above the mountNode in the AST and no variable is shadowed
  function isSameMountBinding(assignmentPath) {
    return mountIdentifier.name === assignmentPath.node.left.name;
  }

  let isStrict = null;
  babel.traverse(program, {
    AssignmentExpression(babelPath) {
      if (isSameMountBinding(babelPath)) {
        // find `strict: literal` in `mount = someFunction({ })`
        const options = babelPath.node.right.arguments[0];
        if (options === undefined) {
          return;
        }
        const strictProperty = options.properties.find(property => property.key.name === 'strict');

        isStrict = strictProperty.value.value;
      }
    },
  });

  return isStrict;
}

/**
 *
 * @param {import('@babel/core').Node} valueNode
 */
function getRefInstance(valueNode) {
  if (!babel.types.isMemberExpression(valueNode)) {
    throw new Error('Expected a member expression in refInstanceof');
  }

  switch (valueNode.object.name) {
    case 'window':
      return valueNode.property.name;
    case 'React':
      return `React.${valueNode.property.name}`;
    default:
      throw new Error(`Unrecognized member expression starting with '${valueNode.object.name}'`);
  }
}

/**
 *
 * @param {import('@babel/core').Node} valueNode - An Identifier
 */
function getInheritComponentName(valueNode) {
  return valueNode.name;
}

/**
 * @typedef {Object} ParseResult
 * @property {string?} forwardsRefTo
 * @property {boolean?} strictModeReady
 */

/**
 *
 * @param {string} componentFilename
 * @returns {ParseResult}
 */
export default async function parseTest(componentFilename) {
  const testFilename = withExtension(componentFilename, '.test.js');
  const babelParseResult = await parseWithConfig(testFilename, babelConfigPath);
  const descriptor = findConformanceDescriptor(babelParseResult.program);

  const result = {
    forwardsRefTo: undefined,
    inheritComponent: undefined,
    strictModeReady: undefined,
  };

  const { properties = [] } = descriptor;
  properties.forEach(property => {
    const key = property.key.name;

    switch (key) {
      case 'refInstanceof':
        result.forwardsRefTo = getRefInstance(property.value);
        break;
      case 'inheritComponent':
        result.inheritComponent = getInheritComponentName(property.value);
        break;
      case 'mount':
        result.strictModeReady = isStrictMount(property.value, babelParseResult.program);
        break;
      default:
        break;
    }
  });

  return result;
}
