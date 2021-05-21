import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import ClockPicker, { clockPickerClasses as classes } from '@material-ui/lab/ClockPicker';
import {
  adapterToUse,
  AdapterClassToUse,
  createPickerRender,
} from '../internal/pickers/test-utils';

describe('<ClockPicker />', () => {
  const mount = createMount();
  const render = createPickerRender();

  const localizedMount = (node: React.ReactNode) => {
    return mount(
      <LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>,
    );
  };

  describeConformanceV5(
    <ClockPicker date={adapterToUse.date()} showViewSwitcher onChange={() => {}} />,
    () => ({
      classes: {},
      inheritComponent: 'div',
      mount: localizedMount,
      render,
      refInstanceof: window.HTMLDivElement,
      muiName: 'MuiClockPicker',
      // cannot test reactTestRenderer because of required context
      testRootOverrides: null,
      testSlotOverrides: {
        slotName: 'arrowSwitcher',
        slotClassName: classes.arrowSwitcher,
      },
      skip: [
        'componentProp',
        'componentsProp',
        'propsSpread',
        'reactTestRenderer',
        // TODO: fix ClockPicker to spread props to root
        'themeDefaultProps',
        'themeVariants',
      ],
    }),
  );
});
