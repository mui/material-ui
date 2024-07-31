import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  // Rename components that have ListItem button to ListItemButton
  findComponentJSX(j, { root, componentName: 'ListItem' }, (elementPath) => {
    const index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'button',
    );
    if (index !== -1) {
      if (elementPath.node.openingElement.name.name === 'ListItem') {
        elementPath.node.openingElement.name.name = 'ListItemButton';
      }
      elementPath.node.openingElement.attributes.splice(index, 1);
    }
  });

  const defaultPropsPathCollection = findComponentDefaultProps(j, {
    root,
    componentName: 'ListItem',
  });

  defaultPropsPathCollection.find(j.ObjectProperty, { key: { name: 'button' } }).forEach((path) => {
    const defaultProps = path.parent.value;

    defaultProps.properties.forEach((property) => {
      if (property.key?.name === 'button') {
        // Remove the button property from the defaultProps object
        const newListButtonProps = defaultProps.properties.filter(
          (prop) => prop.key.name !== 'button',
        );

        const muiListItemButtonNode = j.objectProperty(
          j.identifier('MuiListItemButton'),
          j.objectExpression([
            j.property(
              'init',
              j.identifier('defaultProps'),
              j.objectExpression(newListButtonProps),
            ),
          ]),
        );

        // Add MuiListItemButton entry to the parent object
        const parentObject = path.parent.parent.parent.parent.parent.node;
        parentObject.properties.push(muiListItemButtonNode);
      }
    });
    path.prune();
  });

  let containsListItem = false;
  // Find components that use ListItem. If they do, we shouldn't remove it
  findComponentJSX(j, { root, componentName: 'ListItem' }, (elementPath) => {
    if (elementPath.node.openingElement.name.name === 'ListItem') {
      containsListItem = true;
    }
  });

  // Find if there are ListItem named imports.
  const containsListItemNamedImport = root
    .find(j.ImportSpecifier)
    .filter((path) => path.node.imported.name === 'ListItem');

  // Remove ListItem imports if there is no usage
  if (!containsListItem) {
    // Remove default imports
    root
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === '@mui/material/ListItem')
      .remove();
  }

  // If there is no usage of alias imports, remove it. Or else rename the imported component to ListItemButton
  if (!containsListItemNamedImport) {
    root
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === '@mui/material')
      .find(j.ImportSpecifier)
      .filter((path) => path.node.imported.name === 'ListItem')
      .remove();
  } else {
    root
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === '@mui/material')
      .find(j.ImportSpecifier)
      .filter((path) => path.node.imported.name === 'ListItem')
      .forEach((path) => {
        const originalLocalName = path.node.local.name;
        const newImport = j.importSpecifier(
          j.identifier('ListItemButton'),
          j.identifier(originalLocalName),
        );
        path.replace(newImport);
      });
  }

  // If ListItemButton does not already exist, add it at the end
  const imports = root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/material/ListItemButton');

  if (imports.length === 0) {
    const lastImport = root.find(j.ImportDeclaration).at(-1);

    // Insert the import for 'ListItemButton' after the last import declaration
    lastImport.insertAfter(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('ListItemButton'))],
        j.stringLiteral('@mui/material/ListItemButton'),
      ),
    );
  }

  return root.toSource(printOptions);
}
