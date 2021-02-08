import renameProps from '../util/renameProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  return renameProps({
    root,
    componentName: 'Box',
    props: { gridGap: 'gap', gridColumnGap: 'columnGap', gridRowGap: 'rowGap' },
  }).toSource();
}
