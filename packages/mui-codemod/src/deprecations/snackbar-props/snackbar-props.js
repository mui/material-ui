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

  movePropIntoSlots(j, {
    root,
    componentName: 'Snackbar',
    propName: 'TransitionComponent',
    slotName: 'transition',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Snackbar',
    propName: 'TransitionProps',
    slotName: 'transition',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Snackbar',
    propName: 'ContentProps',
    slotName: 'content',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Snackbar',
    propName: 'ClickAwayListenerProps',
    slotName: 'clickAwayListener',
  });

  return root.toSource(printOptions);
}
