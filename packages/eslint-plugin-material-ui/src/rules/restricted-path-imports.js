// See tests for valid examples.
// Rationale: Importing anything deeper will use the commonJS build
module.exports = context => {
  return {
    ImportDeclaration(node) {
      const { source } = node;
      const folders = source.value.split('/');
      const shouldRestrictImportPath = folders[0] === '@material-ui';
      if (!shouldRestrictImportPath) {
        return;
      }

      // @namespace/packageName is first level
      const level = source.value.split('/').length - 1;

      if (level > 2) {
        const preferredImport = folders.slice(0, 3).join('/');
        context.report({
          node,
          message: `Only second level path imports are allowed. Prefer to import from '${preferredImport}'.`,
        });
      }
    },
  };
};
