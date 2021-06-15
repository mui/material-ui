const fse = require('fs-extra');
const path = require('path');

// FIXME: convert to async
// TODO: convert parseMarkdown to loader

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
module.exports = function demoLoader(source) {
  const pageFilename = this.context.replace(this.rootContext, '').replace(/^\/src\/pages\//, '');
  const rawKeys = fse.readdirSync(path.dirname(this.resourcePath));
  const demoKeys = rawKeys.filter((basename) => {
    return /\.(js|tsx)$/.test(basename);
  });

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

    export const pageFilename = '${pageFilename}';
    export function requireRaw(module) {
      return {
        ${rawKeys
          .map((key) => {
            return `'${key}': ${getRequireRawDemoIdentifier(key)}`;
          })
          .join(',\n')}
      }[module];
    }
    requireRaw.keys = () => {
      return [
        ${rawKeys
          .map((key) => {
            return `'${key}'`;
          })
          .join(',\n')}
      ];
    }
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
      return [
        ${demoKeys
          .map((key) => {
            return `'${key}'`;
          })
          .join(',\n')}
      ];
    }`;

  return transformed;
};
