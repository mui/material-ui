import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateFnsAdapter from '@material-ui/lab/dateAdapter/date-fns';
import DateRangePickerDay from '@material-ui/lab/DateRangePickerDay';

describe('<DateRangePickeryarDay />', () => {
  const mount = createMount();
  let classes: Record<string, string>;

  const localizedMount = (node: React.ReactNode) => {
    return mount(<LocalizationProvider dateAdapter={DateFnsAdapter}>{node}</LocalizationProvider>);
  };

  before(() => {
    classes = getClasses(
      <DateRangePickerDay
        day={new Date()}
        outsideCurrentMonth={false}
        selected
        focused
        onDaySelect={() => {}}
        isHighlighting
        isPreviewing
        isStartOfPreviewing
        isEndOfPreviewing
        isStartOfHighlighting
        isEndOfHighlighting
      />,
    );
  });

  describeConformance(
    <DateRangePickerDay
      day={new Date()}
      outsideCurrentMonth={false}
      selected
      focused
      onDaySelect={() => {}}
      isHighlighting
      isPreviewing
      isStartOfPreviewing
      isEndOfPreviewing
      isStartOfHighlighting
      isEndOfHighlighting
    />,
    () => ({
      classes,
      inheritComponent: 'button',
      mount: localizedMount,
      refInstanceof: window.HTMLButtonElement,
      // cannot test reactTestRenderer because of required context
      skip: ['componentProp', 'reactTestRenderer', 'propsSpread', 'refForwarding'],
    }),
  );
});
