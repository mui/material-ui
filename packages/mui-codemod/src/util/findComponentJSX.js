/**
 * Find all the JSXElements of a given component name.
 *
 * @param {import('jscodeshift')} j
 * @param {{ root: import('jscodeshift').Collection; componentName: string }} options
 * @param {(path: import('jscodeshift').ASTPath<import('jscodeshift').JSXElement>) => void} callback
 *
 */
export default function findComponentJSX(j, options, callback) {
  const { root, componentName } = options;

  // case 1: import ComponentName from '@mui/material/ComponentName';
  // case 2: import { ComponentName } from '@mui/material';
  // case 3: import { ComponentName as SomethingElse } from '@mui/material';

  const importName = new Set();

  root
    .find(j.ImportDeclaration)
    .filter((path) =>
      path.node.source.value.match(new RegExp(`^@mui/material(/${componentName})?$`)),
    )
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          importName.add(specifier.local.name);
        }
        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === componentName) {
          importName.add(specifier.local.name);
        }
      });
    });

  [...importName].forEach((name) => {
    root.findJSXElements(name).forEach((elementPath) => {
      callback(elementPath);
    });
  });
}
