/**
 * Capitalize a string
 * @param {string} string
 */
function capitalize(string) {
  return string ? `${string[0].toUpperCase()}${string.slice(1)}` : string;
}

/**
 * Transform kebab-case icon name to PascalCase
 * e.g. access-alarm => AccessAlarm
 * @param {string} iconName
 */
function pascalize(iconName) {
  return iconName.split('-').map(capitalize).join('');
}

/**
 * Update all `svg-icons` import references to use `@material-ui/icons` package.
 * Find and replace string literal AST nodes to ensure all svg-icon paths get updated, regardless
 * of being in an import declaration, or a require() call, etc.
 * https://github.com/mui-org/material-ui/tree/master/packages/@material-ui/icons
 * @param {jscodeshift_api_object} j
 * @param {jscodeshift_ast_object} root
 */
function transformSVGIconImports(j, root) {
  const pathMatchRegex = /^material-ui\/svg-icons\/.+\/(.+)$/;
  root
    .find(j.Literal)
    .filter((path) => pathMatchRegex.test(path.node.value))
    .forEach((path) => {
      const [, iconName] = path.node.value.match(pathMatchRegex);

      // update to new path
      path.node.value = `@material-ui/icons/${pascalize(iconName)}`;
    });
}

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // transforms
  transformSVGIconImports(j, root);
  return root.toSource({ quote: 'single' });
};
