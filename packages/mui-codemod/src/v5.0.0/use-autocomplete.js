/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };

  const list = [
    'FilterOptionsState',
    'createFilterOptions',
    'CreateFilterOptionsConfig',
    'AutocompleteFreeSoloValueMapping',
    'Value',
    'UseAutocompleteProps',
    'AutocompleteHighlightChangeReason',
    'AutocompleteInputChangeReason',
    'AutocompleteChangeReason',
    'AutocompleteCloseReason',
    'useAutocomplete',
  ];

  let coreImport;

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value.match(/^@material-ui\/lab\/?(useAutocomplete)?$/))
    .forEach((path) => {
      const specifiers = [];

      path.node.specifiers.forEach((s, index) => {
        if (list.includes(s.imported ? s.imported.name : s.local.name)) {
          if (s.local.name === 'useAutocomplete') {
            specifiers.push(j.importDefaultSpecifier(j.identifier('useAutocomplete')));
          } else {
            specifiers.push(s);
          }
          delete path.node.specifiers[index];
        }
      });
      if (specifiers.length) {
        if (!coreImport) {
          coreImport = j.importDeclaration(
            specifiers,
            j.literal('@material-ui/core/useAutocomplete'),
          );
          path.insertAfter(coreImport);
        } else {
          coreImport.specifiers.push(...specifiers);
        }
      }
    })
    .filter((path) => !Object.keys(path.node.specifiers).length)
    .remove();

  return root.toSource(printOptions);
}
