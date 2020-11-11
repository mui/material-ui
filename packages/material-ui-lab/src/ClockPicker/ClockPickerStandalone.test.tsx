import * as React from 'react';
import { createMount, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import ClockPicker from '@material-ui/lab/ClockPicker';

describe('<ClockPickerStandalone />', () => {
  const mount = createMount();

  const localizedMount = (node: React.ReactNode) => {
    return mount(<LocalizationProvider dateAdapter={DateFnsAdapter}>{node}</LocalizationProvider>);
  };

  describeConformance(<ClockPicker date={new Date()} onChange={() => {}} />, () => ({
    classes: {},
    inheritComponent: 'div',
    mount: localizedMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: ['componentProp', 'propsSpread', 'reactTestRenderer'],
  }));
});
