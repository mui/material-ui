const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const movedTypeExports = [
  // Slider
  'Mark',
  // Select
  'SelectOption',
  'SelectChild',
  'isOptionGroup',
  'SelectOptionGroup',
  'SelectChangeEventType',
  // Listbox
  'OptionState',
  'UseListboxPropsWithDefaults',
  'FocusManagementType',
  'ListboxState',
  'ListboxAction',
  'ListboxReducer',
  'ListboxReducerAction',
  // Autocomplete
  'createFilterOptions',
  'FilterOptionsState',
  'AutocompleteFreeSoloValueMapping',
  'AutocompleteValue',
  'UseAutocompleteProps',
  'AutocompleteGroupedOption',
  'CreateFilterOptionsConfig',
  'FilterOptionsState',
  'AutocompleteInputChangeReason',
  'AutocompleteCloseReason',
  'AutocompleteGetTagProps',
];

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || { quote: 'single' };

  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const sourceVal = path.node.source.value;
      return sourceVal.startsWith('@mui/base/') && sourceVal.match('Unstyled');
    }) // Process only Base components
    .forEach((path) => {
      // scenario 1: `@mui/base/<Component>Unstyled/use<Component>`
      // e.g., `@mui/base/SelectUnstyled/useSelect`
      const sourceVal = path.node.source.value;
      // replace `@mui/base/SelectUnstyled/useSelect` with `@mui/base/useSelect`
      if (sourceVal.replace(/@mui\/base\/([a-zA-Z]+)Unstyled/, '') !== '') {
        path.node.source.value = sourceVal.replace(
          /@mui\/base\/([a-zA-Z]+)Unstyled\/([a-zA-Z]+)/,
          '@mui/base/$2',
        );
        return;
      }

      // scenario 2: @mui/base/<Component>Unstyled
      const specifiersForHook = [];
      const filteredSpecifiers = [];
      const hookName = sourceVal.replace(/@mui\/base\/([a-zA-Z]+)Unstyled/, 'use$1');

      path.node.specifiers.forEach((elementNode) => {
        if (elementNode.type !== 'ImportSpecifier' || !elementNode.imported?.name) {
          filteredSpecifiers.push(elementNode);
          return;
        }

        const importName = elementNode.imported.name;
        const localName = elementNode.local.name;

        if (hookName === importName) {
          // hook
          specifiersForHook.push(j.importDefaultSpecifier(j.identifier(localName)));
        } else if (
          // types that no longer exist in `...Unstyled`
          movedTypeExports.includes(importName) ||
          (importName.startsWith(capitalize(hookName)) &&
            (importName.endsWith('SlotProps') ||
              importName.endsWith('Parameters') ||
              importName.endsWith('ReturnValue')))
        ) {
          specifiersForHook.push(j.importSpecifier(j.identifier(importName), elementNode.local));
        } else {
          filteredSpecifiers.push(elementNode);
        }
      });

      path.node.specifiers = filteredSpecifiers;

      if (specifiersForHook.length === 0) {
        return;
      }

      const hookImportDeclaration = j.importDeclaration(
        specifiersForHook,
        j.literal(`@mui/base/${hookName}`),
      );
      if (filteredSpecifiers.length > 0) {
        path.insertAfter(hookImportDeclaration);
      } else {
        path.replace(hookImportDeclaration);
      }
    });

  return root.toSource(printOptions);
}
