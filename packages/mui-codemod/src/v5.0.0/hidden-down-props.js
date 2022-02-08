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
    componentName: 'Hidden',
    props: {
      xsDown: 'smDown',
      smDown: 'mdDown',
      mdDown: 'lgDown',
      lgDown: 'xlDown',
      xlDown: 'xlDown',
    },
  }).toSource(printOptions);
}
