import renameProps from '../util/renameProps';
import renameClassKey from '../util/renameClassKey';

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  renameProps({
    root,
    componentName: 'Collapse',
    props: { collapsedHeight: 'collapsedSize' },
  });

  return renameClassKey({
    root,
    componentName: 'Collapse',
    classes: { container: 'root' },
  });
}
