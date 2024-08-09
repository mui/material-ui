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

    defaultProps.properties = defaultProps.properties.filter(
      (prop) =>
        prop.key.name !== 'button' &&
        prop.key.name !== 'autoFocus' &&
        prop.key.name !== 'disabled' &&
        prop.key.name !== 'selected',
    );
    path.prune();
  });

  const openTaggedNotHavingButtonProp = new Set();
  const openTaggedHavingButtonProp = new Set();
  // Rename components that have ListItem button to ListItemButton
  findComponentJSX(j, { root, componentName: 'ListItem' }, (elementPath) => {
    const index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'button',
    );
    // The ListItem has a button prop
    if (index !== -1) {
      openTaggedHavingButtonProp.add(elementPath.node.openingElement.name.name);
      elementPath.node.openingElement.name.name = `ListItemButton`;
      elementPath.node.openingElement.attributes.splice(index, 1);
    } else {
      openTaggedNotHavingButtonProp.add(elementPath.node.openingElement.name.name);
    }
  });

  const importsToRemove = [...openTaggedHavingButtonProp].filter(
    (item) => !openTaggedNotHavingButtonProp.has(item),
  );

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/material/ListItem')
    .filter((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          if (importsToRemove.indexOf(specifier.local.name) >= 0) {
            path.node.specifiers = path.node.specifiers.filter((spec) => spec !== specifier);
          }
        }
      });
      if (path.node.specifiers.length === 0) {
        return true;
      }
      return false;
    })
    .remove();

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/material')
    .filter((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.name === 'ListItem' &&
          importsToRemove.indexOf(specifier.local.name) >= 0
        ) {
          path.node.specifiers = path.node.specifiers.filter((spec) => spec !== specifier);
        }
      });
      if (path.node.specifiers.length === 0) {
        return true;
      }
      return false;
    })
    .remove();
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
