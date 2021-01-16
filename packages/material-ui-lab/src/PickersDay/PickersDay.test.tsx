import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import PickersDay from '@material-ui/lab/PickersDay';
import { adapterToUse, AdapterClassToUse } from '../internal/pickers/test-utils';

describe('<PickersDay />', () => {
  const mount = createMount();
  let classes: Record<string, string>;

  const localizedMount = (node: React.ReactNode) => {
    return mount(
      <LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>,
    );
  };

  before(() => {
    classes = getClasses(
      <PickersDay
        day={adapterToUse.date()}
        outsideCurrentMonth={false}
        selected
        focused
        onDaySelect={() => {}}
      />,
    );
  });

  describeConformance(
    <PickersDay
      day={adapterToUse.date()}
      outsideCurrentMonth={false}
      selected
      focused
      onDaySelect={() => {}}
    />,
    () => ({
      classes,
      inheritComponent: 'button',
      mount: localizedMount,
      refInstanceof: window.HTMLButtonElement,
      // cannot test reactTestRenderer because of required context
      skip: ['componentProp', 'reactTestRenderer'],
    }),
  );
});
