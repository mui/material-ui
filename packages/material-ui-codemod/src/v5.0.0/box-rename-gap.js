import renameProps from '../util/renameProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions;

  return renameProps({
    root,
    componentName: 'Box',
    props: { gridGap: 'gap', gridColumnGap: 'columnGap', gridRowGap: 'rowGap' },
  }).toSource(printOptions);
}
