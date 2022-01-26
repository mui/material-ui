/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
const template = `// FIXME checkout https://mui.com/components/use-media-query/#using-material-uis-breakpoint-helpers
const withMobileDialog = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="lg" fullScreen={false} />;`;

export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };

  const imports = root.find(j.ImportDeclaration).paths();
  const lastImport = imports[imports.length - 1];

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@material-ui/core/withMobileDialog')
    .forEach(() => {
      lastImport.insertAfter(template);
    })
    .remove();

  let shouldRemoveImport = false;
  const collection = root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@material-ui/core')
    .forEach(({ node }) => {
      node.specifiers
        .filter((s) => s.imported.name === 'withMobileDialog')
        .forEach((s) => {
          lastImport.insertAfter(template.replace(/withMobileDialog/g, s.local.name));
        });

      node.specifiers = node.specifiers.filter((s) => s.imported.name !== 'withMobileDialog');

      if (!node.specifiers.length) {
        shouldRemoveImport = true;
      }
    });
  if (shouldRemoveImport) {
    collection.remove();
  }

  return root.toSource(printOptions);
}
