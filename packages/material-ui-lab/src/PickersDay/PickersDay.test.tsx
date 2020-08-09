import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import PickersDay from '@material-ui/lab/PickersDay';

describe('<PickersDay />', () => {
  const mount = createMount();
  let classes: Record<string, string>;

  const localizedMount = (node: React.ReactNode) => {
    return mount(<LocalizationProvider dateAdapter={DateFnsAdapter}>{node}</LocalizationProvider>);
  };

  before(() => {
    classes = getClasses(
      <PickersDay
        day={new Date()}
        outsideCurrentMonth={false}
        selected
        focused
        onDaySelect={() => {}}
      />,
    );
  });

  describeConformance(
    <PickersDay
      day={new Date()}
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
