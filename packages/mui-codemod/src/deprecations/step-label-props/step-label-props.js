import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';
import movePropIntoSlots from '../utils/movePropIntoSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';

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
    componentName: 'StepLabel',
  });

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'StepLabel',
    propName: 'StepIconComponent',
    slotName: 'stepIcon',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'StepLabel',
    propName: 'StepIconProps',
    slotName: 'stepIcon',
  });

  return root.toSource(printOptions);
}
