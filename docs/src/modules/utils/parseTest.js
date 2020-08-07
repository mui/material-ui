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

function findConformanceDescriptor(file) {
  const { types: t } = babel;

  let descriptor = {};
  babel.traverse(file, {
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
 *
 * @param {import('@babel/core').Node} valueNode
 */
function getRefInstance(valueNode) {
  if (!babel.types.isMemberExpression(valueNode) && valueNode.name !== 'Object') {
    throw new Error('Expected a member expression in refInstanceof');
  }

  if (!valueNode.object && valueNode.name === 'Object') {
    return valueNode.name;
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
 *
 * @param {string} componentFilename
 * @returns {ParseResult}
 */
export default async function parseTest(componentFilename) {
  const testFilename = withExtension(componentFilename, '.test.js');
  const babelParseResult = await parseWithConfig(testFilename, babelConfigPath);
  const descriptor = findConformanceDescriptor(babelParseResult);

  const result = {
    forwardsRefTo: undefined,
    inheritComponent: undefined,
  };

  const { properties = [] } = descriptor;
  properties.forEach((property) => {
    const key = property.key.name;

    switch (key) {
      case 'refInstanceof':
        result.forwardsRefTo = getRefInstance(property.value);
        break;
      case 'inheritComponent':
        result.inheritComponent = getInheritComponentName(property.value);
        break;
      default:
        break;
    }
  });

  return result;
}
