import renameProps from '../util/renameProps';
import renameClassKey from '../util/renameClassKey';

export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions;

  renameProps({
    root,
    componentName: 'Collapse',
    props: { collapsedHeight: 'collapsedSize' },
  });

  return renameClassKey({
    root,
    componentName: 'Collapse',
    classes: { container: 'root' },
    printOptions,
  });
}
