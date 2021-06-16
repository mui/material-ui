const { promises: fs } = require('fs');
const path = require('path');
const { prepareMarkdown } = require('./parseMarkdown');

/**
 * @param {string} string
 */
function upperCaseFirst(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

/**
 * @param {string} key
 * @example keyToJSIdentifier('index.md') === 'IndexMd'
 * @example keyToJSIdentifier('index-ja.md') === 'IndexJaMd'
 */
function keyToJSIdentifier(key) {
  const delimiter = /(\.|-)/;
  return key
    .split(delimiter)
    .filter((part) => !delimiter.test(part))
    .map(upperCaseFirst)
    .join('');
}

/**
 * @type {import('webpack').loader.Loader}
 */
module.exports = async function demoLoader() {
  const rawKeys = await fs.readdir(path.dirname(this.resourcePath));
  const demoKeys = rawKeys.filter((basename) => {
    return /\.(js|tsx)$/.test(basename);
  });

  const requireRawContent = Object.fromEntries(
    await Promise.all(
      rawKeys.map(async (key) => {
        const content = await fs.readFile(path.join(path.dirname(this.resourcePath), key), {
          encoding: 'utf-8',
        });

        return [key, content];
      }),
    ),
  );

  function requireRaw(key) {
    return requireRawContent[key];
  }
  requireRaw.keys = () => rawKeys;
  const pageFilename = this.context.replace(this.rootContext, '').replace(/^\/src\/pages\//, '');
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });

  /**
   * @param {string} key
   */
  function getRequireRawDemoIdentifier(key) {
    return `RawLoaded__${keyToJSIdentifier(key)}`;
  }

  function getRequireDemoIdentifier(key) {
    return keyToJSIdentifier(key);
  }

  const transformed = `
    ${rawKeys
      .map((key) => {
        return `import ${getRequireRawDemoIdentifier(key)} from '!raw-loader!./${key}';`;
      })
      .join('\n')}
    ${demoKeys
      .map((key) => {
        return `import ${getRequireDemoIdentifier(key)} from './${key}';`;
      })
      .join('\n')}

    export const docs = ${JSON.stringify(docs, null, 2)};
    export const demos = ${JSON.stringify(demos, null, 2)};
    export function requireDemo(module) {
      return {
        ${demoKeys
          .map((key) => {
            // TODO: Remove ES module interop once all demos are loaded via loader
            // i.e. replace `{ default: ... }`  with `...`
            return `'${key}': { default: ${getRequireDemoIdentifier(key)} }`;
          })
          .join(',\n')}
      }[module];
    }
    requireDemo.keys = () => {
      return ${JSON.stringify(demoKeys, null, 2)}
    }`;

  return transformed;
};
