const fs = require('fs');
const path = require('path');
const packages = require('./packages');

function isComponent(identifier) {
  // Components start with Uppercase letter.
  return /^[A-Z]/.test(identifier);
}

function isNamespace(identifier) {
  return ['colors', 'styles', 'utils'].includes(identifier);
}

function getMuiLocal(imported, source) {
  return `${imported}_${source.split('/')[1]}`;
}

/**
 * @param {object} context
 * @param {boolean} context.asNamedImport
 * @param {string} context.local
 * @param {string} context.imported
 * @param {boolean} context.modules
 * @param {string} context.source
 */
function createImport(context) {
  const { specifier, imported, local = imported, modules, source } = context;

  if (modules) {
    if (specifier === 'named') {
      return `import { ${imported} as ${local} } from '${source}';`;
    }
    if (specifier === 'namespace') {
      return `import * as ${local} from '${source}';`;
    }
    return `import ${local} from '${source}';`;
  }

  if (specifier === 'named') {
    return `const { ${imported}: ${local} } = require('${source}');`;
  }
  if (specifier === 'namespace') {
    return `const ${local} = require('${source}');`;
  }
  return `const { default: ${local} } = require('${source}');`;
}

/**
 * @param {object} context
 * @param {boolean} context.modules
 * @param {NodeJS.WritableStream} context.outStream
 */
function writeImports(context) {
  const { modules, outStream } = context;

  outStream.write('//#region imports\n');
  Object.entries(packages).forEach(([packageName, topLevelPackages]) => {
    topLevelPackages.forEach((topLevelPackageName) => {
      outStream.write(
        `${createImport({
          specifier: 'named',
          local: getMuiLocal(topLevelPackageName, packageName),
          imported: topLevelPackageName,
          modules,
          source: packageName,
        })}\n`,
      );
      if (isNamespace(topLevelPackageName)) {
        outStream.write(
          `${createImport({
            specifier: 'namespace',
            local: `${getMuiLocal(topLevelPackageName, packageName)}__pathImport`,
            imported: topLevelPackageName,
            modules,
            source: `${packageName}/${topLevelPackageName}`,
          })}\n`,
        );
      } else {
        outStream.write(
          `${createImport({
            specifier: 'default',
            local: `${getMuiLocal(topLevelPackageName, packageName)}__pathImport`,
            modules,
            source: `${packageName}/${topLevelPackageName}`,
          })}\n`,
        );
      }
    });
  });
  outStream.write('//#endregion\n');
}

function getValidator(localIdentifier) {
  if (isComponent(localIdentifier)) {
    return `ReactIs.isValidElementType(${localIdentifier})`;
  }
  return `${localIdentifier} != null && ${localIdentifier}.default === undefined`;
}

/**
 * @param {object} context
 * @param {NodeJS.WritableStream} context.outStream
 */
function writeNodeCJSFixture(context) {
  const { outStream } = context;

  outStream.write(
    `${createImport({
      local: 'ReactIs',
      modules: false,
      source: 'react-is',
      specifier: 'namespace',
    })}\n`,
  );
  writeImports({ modules: false, outStream });

  outStream.write('\n//#region usage\n');
  Object.entries(packages).forEach(([packageName, topLevelPackages]) => {
    topLevelPackages.forEach((topLevelPackageName) => {
      outStream.write(
        `console.assert(${getValidator(
          getMuiLocal(topLevelPackageName, packageName),
        )}, '${topLevelPackageName} named import is not consumeable.');\n`,
      );
      outStream.write(
        `console.assert(${getValidator(
          `${getMuiLocal(topLevelPackageName, packageName)}__pathImport`,
        )}, '${topLevelPackageName} path import is not consumeable.');\n`,
      );
    });
  });
  outStream.write('//#endregion\n');
}

/**
 * @param {object} context
 * @param {boolean} context.modules
 */
function run(context) {
  const { fixture } = context;

  if (fixture === undefined) {
    throw new Error(`Usage: ${path.basename(process.argv[1])} <fixture>`);
  }

  const fixturePath = path.resolve(__dirname, fixture);
  const outStream = fs.createWriteStream(path.resolve(fixturePath, './index.js'), {
    encoding: 'utf-8',
  });

  switch (fixture) {
    case 'node-cjs':
      writeNodeCJSFixture({ outStream });
      break;
    default:
      throw new TypeError(`Can't handle fixture '${fixture}'`);
  }
}

run({ fixture: process.argv[2] });
