// certain exports don't match the directory they are in:
const nameMapping = {
  className: 'Unstable_ClassNameGenerator',
  composeClasses: 'unstable_composeClasses',
  generateUtilityClass: 'unstable_generateUtilityClass',
  generateUtilityClasses: 'unstable_generateUtilityClasses',
  NumberInput: 'Unstable_NumberInput',
};

// renamed directories to match the export:
const pathMapping = {
  '@mui/base/className': '@mui/base/ClassNameGenerator',
};

function getExportedIdentifier(importPath) {
  return nameMapping[importPath] ?? importPath;
}

function getTransformedPath(originalPath) {
  return pathMapping[originalPath] ?? originalPath;
}

/**
 * Finds the last segment of the path starting with @mui/base.
 *
 * @example '@mui/base/Menu' ➔ 'Menu'
 * @example '@mui/base' ➔ null
 */
function getBaseImportIdentifier(path, filePath) {
  const source = path?.node?.source?.value;
  if (!source) {
    return null;
  }

  const baseImportPathMatch = source.match(/@mui\/base\/(.+)/);

  if (baseImportPathMatch == null) {
    return null;
  }

  if (baseImportPathMatch[1]?.includes('/')) {
    console.warn(
      `WARNING: ${filePath}: "${source}" is more than one level deep. This is not supported.`,
    );

    return null;
  }

  return baseImportPathMatch[1] ?? null;
}

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  const withTransformedImports = j(file.source)
    .find(j.ImportDeclaration)
    .forEach((path) => {
      const baseImportPath = getBaseImportIdentifier(path, file.path);
      if (baseImportPath === null) {
        return;
      }

      path.node.specifiers = path.node.specifiers.map((specifier) => {
        if (specifier.type !== 'ImportDefaultSpecifier') {
          return specifier;
        }

        // import Y from @mui/base/X ➔ import { X as Y } from @mui/base/X
        return j.importSpecifier(
          j.identifier(getExportedIdentifier(baseImportPath)),
          specifier.local,
        );
      });

      path.node.source = j.stringLiteral(getTransformedPath(path.node.source.value));
    })
    .toSource(printOptions);

  return j(withTransformedImports)
    .find(j.ExportNamedDeclaration)
    .forEach((path) => {
      const baseImportPath = getBaseImportIdentifier(path);
      if (baseImportPath === null) {
        return;
      }

      path.node.specifiers = path.node.specifiers.map((specifier) => {
        if (specifier.local.name !== 'default') {
          return specifier;
        }

        if (specifier.exported.name === 'default') {
          // export { default } from @mui/base/X ➔ export { X as default } from @mui/base/X
          return j.exportSpecifier.from({
            exported: j.identifier('default'),
            local: j.identifier(baseImportPath),
          });
        }

        // export { default as Y } from @mui/base/X ➔ export { X as Y } from @mui/base/X
        return j.exportSpecifier.from({
          exported: j.identifier(specifier.exported.name),
          local: j.identifier(getExportedIdentifier(baseImportPath)),
        });
      });

      path.node.source = j.stringLiteral(getTransformedPath(path.node.source.value));
    })
    .toSource(printOptions);
}
