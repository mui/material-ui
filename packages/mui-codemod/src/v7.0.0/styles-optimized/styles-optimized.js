/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = {
    quote: 'single',
  };

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/material/styles')
    .forEach((path) => {
      path.node.source.value = '@mui/material/stylesOptimized';
    });

  return root
    .toSource(printOptions)
    .replace(
      /declare module "@mui\/material\/styles"/g,
      'declare module "@mui/material/stylesOptimized"',
    )
    .replace(
      /declare module '@mui\/material\/styles'/g,
      "declare module '@mui/material/stylesOptimized'",
    );
}
