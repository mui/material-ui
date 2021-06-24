const { promises: fs, readFileSync } = require('fs');
const path = require('path');
const { notEnglishMarkdownRegExp, prepareMarkdown } = require('./parseMarkdown');

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
 * @example findTranslatedVersions('/a/b/index.md') === ['index-en.md', 'index-ja.md', 'index.md']
 * @param {string} englishFilepath An absolute path to the english version written in markdown (.md)
 */
async function findTranslatedVersions(englishFilepath) {
  const filename = path.basename(englishFilepath, '.md');
  const files = await fs.readdir(path.dirname(englishFilepath));

  // Given: index.md
  // Match: index-en.md, index-ja.md
  // Don't Match: otherindex-en.md, index-eng.md, index-e.md, index.tsx
  const translatedVersionRegExp = new RegExp(`^${filename}${notEnglishMarkdownRegExp.source}`);

  return files
    .filter((filepath) => {
      return translatedVersionRegExp.test(filepath);
    })
    .concat(path.basename(englishFilepath));
}

/**
 * @type {import('webpack').loader.Loader}
 */
module.exports = async function demoLoader() {
  const rawKeys = await findTranslatedVersions(this.resourcePath);

  // TODO: Remove requireRaw mock (needs work in prepareMarkdown)
  const requireRaw = (key) => {
    const filepath = path.join(path.dirname(this.resourcePath), key);
    this.addDependency(filepath);
    return readFileSync(filepath, { encoding: 'utf-8' });
  };
  requireRaw.keys = () => rawKeys;
  const pageFilename = this.context.replace(this.rootContext, '').replace(/^\/src\/pages\//, '');
  const { docs } = prepareMarkdown({ pageFilename, requireRaw });

  const demos = {};
  const demoKeys = [];
  new Set(
    docs.en.rendered
      .filter((markdownOrComponentConfig) => {
        return typeof markdownOrComponentConfig !== 'string' && markdownOrComponentConfig.demo;
      })
      .map((demoConfig) => {
        return path.basename(demoConfig.demo);
      }),
  ).forEach((filename) => {
    const demoName = `pages/${pageFilename}/${filename
      .replace(/\.\//g, '')
      .replace(/\.tsx/g, '.js')}`;

    demos[demoName] = {
      module: filename,
      raw: requireRaw(filename),
    };
    demoKeys.push(filename);

    try {
      const moduleTS = filename.replace(/\.js$/, '.tsx');
      const rawTS = requireRaw(moduleTS);

      demos[demoName].moduleTS = moduleTS;
      demos[demoName].rawTS = rawTS;
      demoKeys.push(moduleTS);
    } catch (error) {
      // TS version of the demo doesn't exist. This is fine.
    }
  });

  /**
   * @param {string} key
   */
  function getRequireDemoIdentifier(key) {
    return keyToJSIdentifier(key);
  }

  const transformed = `
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
