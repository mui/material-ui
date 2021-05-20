import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import ClockPicker from '@material-ui/lab/ClockPicker';
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

  describeConformanceV5(<ClockPicker date={adapterToUse.date()} onChange={() => {}} />, () => ({
    classes: {},
    inheritComponent: 'div',
    mount: localizedMount,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiClockPicker',
    // cannot test reactTestRenderer because of required context
    skip: [
      'componentProp',
      'componentsProp',
      'propsSpread',
      'reactTestRenderer',
      'themeDefaultProps',
    ],
  }));
});
