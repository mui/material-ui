import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'SpeedDialAction',
    propName: 'tooltipTitle',
    slotName: 'tooltip',
    slotPropName: 'title',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'SpeedDialAction',
    propName: 'tooltipPlacement',
    slotName: 'tooltip',
    slotPropName: 'placement',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'SpeedDialAction',
    propName: 'tooltipOpen',
    slotName: 'tooltip',
    slotPropName: 'open',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'SpeedDialAction',
    propName: 'TooltipClasses',
    slotName: 'tooltip',
    slotPropName: 'classes',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'SpeedDialAction',
    propName: 'FabProps',
    slotName: 'fab',
  });

  return root.toSource(printOptions);
}
