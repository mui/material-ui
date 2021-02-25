import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePickerDay from '@material-ui/lab/DateRangePickerDay';
import { adapterToUse, AdapterClassToUse } from '../internal/pickers/test-utils';

describe('<DateRangePickerDay />', () => {
  const mount = createMount();
  let classes: Record<string, string>;

  const localizedMount = (node: React.ReactNode) => {
    return mount(
      <LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>,
    );
  };

  before(() => {
    classes = getClasses(
      <DateRangePickerDay
        day={adapterToUse.date()}
        outsideCurrentMonth={false}
        selected
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
      day={adapterToUse.date()}
      outsideCurrentMonth={false}
      selected
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
