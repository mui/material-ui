const REMOVED_EXPORTS = [
  'Alert',
  'AlertTitle',
  'Autocomplete',
  'AvatarGroup',
  'Pagination',
  'PaginationItem',
  'Rating',
  'Skeleton',
  'SpeedDialAction',
  'SpeedDialIcon',
  'SpeedDial',
  'ToggleButton',
  'ToggleButtonGroup',
  'usePagination',
];

function replaceComponentFileImports(j, root, exportName) {
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === `@mui/lab/${exportName}`)
    .forEach((path) => {
      j(path).replaceWith(
        j.importDeclaration(path.node.specifiers, j.literal(`@mui/material/${exportName}`)),
      );
    });
}

function findOrCreateMaterialBarrelImport(j, root) {
  const materialBarrelImports = root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === `@mui/material`);

  if (materialBarrelImports.length > 0) {
    return materialBarrelImports.at(0).get().node;
  }

  const lastImport = root.find(j.ImportDeclaration).at(-1).get();
  const materialBarrelImport = j.importDeclaration([], j.literal(`@mui/material`));
  j(lastImport).insertAfter(materialBarrelImport);
  return materialBarrelImport;
}

function replaceBarrelFileImports(j, root) {
  // find lab barrel import
  const labBarrelImports = root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/lab');

  if (labBarrelImports.length === 0) {
    return;
  }

  // move specifiers from lab barrel imports to material barrel import
  labBarrelImports.forEach((labBarrelImport) => {
    const specifiersToMove = [];

    // find all specifiers that need to be moved
    j(labBarrelImport)
      .find(j.ImportSpecifier)
      .filter((specifier) => REMOVED_EXPORTS.includes(specifier.node.imported.name))
      .forEach((specifier) => {
        specifiersToMove.push(specifier);
      });

    // move specifiers to material barrel import
    if (specifiersToMove.length > 0) {
      const specifierNodes = specifiersToMove.map((specifier) => specifier.node);
      const materialBarrelImport = findOrCreateMaterialBarrelImport(j, root);

      materialBarrelImport.specifiers = [...materialBarrelImport.specifiers, ...specifierNodes];
    }

    // remove specifiers and/or lab barrel import entirely if all were moved
    if (specifiersToMove.length === labBarrelImport.node.specifiers.length) {
      j(labBarrelImport).remove();
    } else {
      specifiersToMove.forEach((specifier) => {
        j(specifier).remove();
      });
    }
  });
}

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  replaceBarrelFileImports(j, root);

  REMOVED_EXPORTS.forEach((exportName) => {
    replaceComponentFileImports(j, root, exportName);
  });

  return root.toSource();
}
