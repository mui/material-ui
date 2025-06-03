import * as process from 'process';
import packages from './packages.js';

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
 * @param {string} context.source
 */
function createImport(context) {
  const { specifier, imported, local = imported, source } = context;

  if (specifier === 'named') {
    return `import { ${imported} as ${local} } from '${source}';`;
  }
  if (specifier === 'namespace') {
    return `import * as ${local} from '${source}';`;
  }
  return `import ${local} from '${source}';`;
}

/**
 * @param {NodeJS.WritableStream} outStream
 */
function writeImports(outStream) {
  outStream.write(
    `${createImport({
      local: 'ReactIs',
      modules: false,
      source: 'react-is',
      specifier: 'namespace',
    })}\n`,
  );
  outStream.write('// #region imports\n');
  outStream.write('/* eslint-disable import/no-duplicates */\n');
  Object.entries(packages).forEach(([packageName, topLevelPackages]) => {
    topLevelPackages.forEach((topLevelPackageName) => {
      if (isNamespace(topLevelPackageName)) {
        outStream.write(
          `${createImport({
            specifier: 'namespace',
            local: `${getMuiLocal(topLevelPackageName, packageName)}__pathImport`,
            imported: topLevelPackageName,
            source: `${packageName}/${topLevelPackageName}`,
          })}\n`,
        );
      } else {
        outStream.write(
          `${createImport({
            specifier: 'named',
            local: getMuiLocal(topLevelPackageName, packageName),
            imported: topLevelPackageName,
            source: packageName,
          })}\n`,
        );
        outStream.write(
          `${createImport({
            specifier: 'default',
            local: `${getMuiLocal(topLevelPackageName, packageName)}__pathImport`,
            source: `${packageName}/${topLevelPackageName}`,
          })}\n`,
        );
      }
    });
  });
  outStream.write('/* eslint-enable import/no-duplicates */\n');
  outStream.write('// #endregion\n');
}

function getComponentValidator(localIdentifier) {
  return `ReactIs.isValidElementType(${localIdentifier})`;
}

function getNamespaceValidator(localIdentifier) {
  return `${localIdentifier} !== null && typeof ${localIdentifier} === 'object'`;
}

function getUnknownValidator(localIdentifier) {
  return `${localIdentifier} !== undefined`;
}

/**
 * @param {NodeJS.WritableStream} outStream
 */
function writeUsage(outStream) {
  outStream.write('\n// #region usage\n');
  outStream.write('\n/* eslint-disable no-console */');
  Object.entries(packages).forEach(([packageName, topLevelPackages]) => {
    topLevelPackages.forEach((topLevelPackageName) => {
      let getValidator = getUnknownValidator;
      if (isNamespace(topLevelPackageName)) {
        getValidator = getNamespaceValidator;
      } else if (isComponent(topLevelPackageName)) {
        getValidator = getComponentValidator;
      }
      if (!isNamespace(topLevelPackageName)) {
        outStream.write(
          `console.assert(${getValidator(
            getMuiLocal(topLevelPackageName, packageName),
          )}, '${topLevelPackageName} named import is not consumable.');\n`,
        );
      }
      outStream.write(
        `console.assert(${getValidator(
          `${getMuiLocal(topLevelPackageName, packageName)}__pathImport`,
        )}, '${topLevelPackageName} path import is not consumable.');\n`,
      );
    });
  });
  outStream.write('/* eslint-enable no-console */\n');
  outStream.write('// #endregion\n');
}

async function main() {
  const outStream = process.stdout;

  writeImports(outStream);
  writeUsage(outStream);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
