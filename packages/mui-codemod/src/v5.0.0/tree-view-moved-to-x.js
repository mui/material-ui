const exports = {
  TreeView: {
    default: 'TreeView',
    named: [
      'treeViewClasses',
      'TreeViewClasses',
      'TreeViewClassKey',
      'getTreeViewUtilityClass',
      'TreeViewPropsBase',
      'TreeViewProps',
      'SingleSelectTreeViewProps',
      'MultiSelectTreeViewProps',
    ],
  },
  TreeItem: {
    default: 'TreeItem',
    named: [
      'useTreeItem',
      'treeItemClasses',
      'TreeItemClasses',
      'TreeItemClassKey',
      'getTreeItemUtilityClass',
      'TreeItemProps',
      'TreeItemContentProps',
    ],
  },
};

const buildLookup = () => {
  return Object.fromEntries(
    Object.entries(exports).flatMap(([entryPoint, entryPointData]) =>
      [entryPointData.default, ...entryPointData.named].map((exportName) => [
        exportName,
        { entryPoint },
      ]),
    ),
  );
};

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || { quote: 'single' };

  const lookup = buildLookup();

  const root = j(fileInfo.source);

  root
    .find(j.ImportDeclaration)
    .forEach((path) => {
      const importSource = path.node.source.value;
      const subPackageImportMatch = importSource.match(/@mui\/lab\/(.*)/);
      if (subPackageImportMatch !== null) {
        const subModule = subPackageImportMatch[1];

        if (subModule.startsWith('internal')) {
          console.warn('Imports from `@mui/lab/internal` are not supported');
          return;
        }

        if (exports[subModule]) {
          /**
           * @type {import('jscodeshift').ASTPath}
           */
          const sourcePath = path.get('source');
          const targetPackage = '@mui/x-tree-view';
          const targetImportPath = `${targetPackage}/${subModule}`;
          sourcePath.replace(j.stringLiteral(targetImportPath));

          const importDeclaration = path.value;
          importDeclaration.specifiers = importDeclaration.specifiers.map((specifier) => {
            if (specifier.type === 'ImportDefaultSpecifier') {
              const localName = specifier.local.name;
              return j.importSpecifier(j.identifier(subModule), j.identifier(localName));
            }
            return specifier;
          });
        }
      } else if (importSource === '@mui/lab') {
        // Sieve import specifiers into /core and /lab
        const xImportSpecifiers = [];
        const labImportSpecifiers = [];
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            const lookupValue = lookup[specifier.imported.name];
            if (lookupValue) {
              xImportSpecifiers.push(specifier);
            } else {
              labImportSpecifiers.push(specifier);
            }
          } else {
            // `import Lab from '@material-ui/lab'`
            // `import * as Lab from '@material-ui/lab'`
            // These imports would require scope analysis.
            console.warn(`Can't handle ${specifier.type}`);
          }
        });

        if (xImportSpecifiers.length > 0) {
          const targetPackage = '@mui/x-tree-view';
          path.replace(
            j.importDeclaration(xImportSpecifiers, j.stringLiteral(targetPackage)),
            j.importDeclaration(labImportSpecifiers, j.stringLiteral('@mui/lab')),
          );
        }
      }
    })
    .toSource(printOptions);

  return root.toSource(printOptions);
}
