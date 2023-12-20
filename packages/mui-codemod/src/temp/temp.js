/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions || {
    quote: 'single',
  };

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === '@mui/utils') {
      if (path.node.specifiers[0].local?.name === 'generateUtilityClasses') {
        j(path).replaceWith(
          j.importDeclaration(
            [j.importDefaultSpecifier(j.identifier('generateUtilityClasses'))],
            j.stringLiteral('@mui/utils/generateUtilityClasses'),
          ),
        );
      }
    }

    if (path.node.source.value === '../generateUtilityClass') {
      path.node.source = j.stringLiteral('@mui/utils/generateUtilityClass');
    }
  });

  return root.toSource(printOptions);
}
