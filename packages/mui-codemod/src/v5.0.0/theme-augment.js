/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */

const template = `
declare module '@material-ui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
`;
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions || {
    quote: 'single',
  };

  if (file.path.endsWith('.tsx')) {
    let hasTheme = false;
    let isRootFile = false;

    root.find(j.ImportSpecifier).forEach(({ node }) => {
      if (node.imported.name === 'Theme') {
        hasTheme = true;
      }
      if (node.imported.name === 'ThemeProvider' || node.imported.name === 'MuiThemeProvider') {
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

    if (!file.source.match(/declare module ['"]@material-ui\/styles\/defaultTheme['"]/gm)) {
      root
        .find(j.ImportDeclaration)
        .at(-1)
        .forEach((path) => {
          if (isRootFile) {
            path.insertAfter(template);
          }
        });
    }

    return root.toSource(printOptions);
  }
  return file.source;
}
