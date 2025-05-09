import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';
import movePropIntoSlots from '../utils/movePropIntoSlots';
import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  replaceComponentsWithSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'ListItem',
  });

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'ListItem',
    propName: 'ContainerComponent',
    slotName: 'root',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'ListItem',
    propName: 'ContainerProps',
    slotName: 'root',
  });

  return root.toSource(printOptions);
}
