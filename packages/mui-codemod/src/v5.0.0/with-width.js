/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };

  const imports = root.find(j.ImportDeclaration).paths();
  const lastImport = imports[imports.length - 1];

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@material-ui/core/withWidth')
    .forEach(() => {
      lastImport.insertAfter(
        '// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth\nconst withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;',
      );
    })
    .remove();

  let shouldRemoveImport = false;
  const collection = root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@material-ui/core')
    .forEach(({ node }) => {
      node.specifiers
        .filter((s) => s.imported.name === 'withWidth')
        .forEach((s) => {
          lastImport.insertAfter(
            '// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth\nconst withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;'.replace(
              /withWidth/g,
              s.local.name,
            ),
          );
        });

      node.specifiers = node.specifiers.filter((s) => s.imported.name !== 'withWidth');

      if (!node.specifiers.length) {
        shouldRemoveImport = true;
      }
    });
  if (shouldRemoveImport) {
    collection.remove();
  }

  return root.toSource(printOptions);
}
