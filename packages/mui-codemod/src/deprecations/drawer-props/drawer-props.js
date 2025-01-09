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
    componentName: 'Drawer',
    propName: 'BackdropComponent',
    slotName: 'backdrop',
  });
  movePropIntoSlots(j, {
    root,
    componentName: 'SwipeableDrawer',
    propName: 'BackdropComponent',
    slotName: 'backdrop',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Drawer',
    propName: 'BackdropProps',
    slotName: 'backdrop',
  });
  movePropIntoSlotProps(j, {
    root,
    componentName: 'SwipeableDrawer',
    propName: 'BackdropProps',
    slotName: 'backdrop',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Drawer',
    propName: 'PaperProps',
    slotName: 'paper',
  });
  movePropIntoSlotProps(j, {
    root,
    componentName: 'SwipeableDrawer',
    propName: 'PaperProps',
    slotName: 'paper',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Drawer',
    propName: 'SlideProps',
    slotName: 'transition',
  });
  movePropIntoSlotProps(j, {
    root,
    componentName: 'SwipeableDrawer',
    propName: 'SlideProps',
    slotName: 'transition',
  });

  return root.toSource(printOptions);
}
