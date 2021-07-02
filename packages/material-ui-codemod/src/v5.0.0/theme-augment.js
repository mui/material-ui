/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */

const template = `
declare module '@material-ui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}
`;
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  if (file.path.endsWith('.tsx')) {
    let hasTheme = false;
    let isRootFile = false;

    root.find(j.ImportSpecifier).forEach(({ node }) => {
      if (node.imported.name === 'Theme') {
        hasTheme = true;
      }
      if (node.imported.name === 'ThemeProvider' || node.imported.nmae === 'MuiThemeProvider') {
        isRootFile = true;
      }
    });

    if (!hasTheme) {
      root
        .find(j.ImportSpecifier)
        .filter(
          ({ node }) =>
            node.imported.name === 'ThemeProvider' || node.imported.name === 'MuiThemeProvider',
        )
        .at(0)
        .forEach((path) => {
          path.insertAfter(j.importSpecifier(j.identifier('Theme')));
        });
    }

    if (!file.source.match(/declare module '@material-ui\/styles'/gm)) {
      root
        .find(j.ImportDeclaration)
        .at(-1)
        .forEach((path) => {
          if (isRootFile) {
            path.insertAfter(template);
          }
        });
    }

    return root.toSource({ quote: 'single' });
  }
  return file.source;
}
