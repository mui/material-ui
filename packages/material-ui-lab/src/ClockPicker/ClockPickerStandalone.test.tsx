import * as React from 'react';
import { createMount, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import ClockPicker from '@material-ui/lab/ClockPicker';
import { adapterToUse, AdapterClassToUse } from '../internal/pickers/test-utils';

describe('<ClockPickerStandalone />', () => {
  const mount = createMount();

  const localizedMount = (node: React.ReactNode) => {
    return mount(
      <LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>,
    );
  };

  describeConformance(<ClockPicker date={adapterToUse.date()} onChange={() => {}} />, () => ({
    classes: {},
    inheritComponent: 'div',
    mount: localizedMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: ['componentProp', 'propsSpread', 'reactTestRenderer'],
  }));
});
