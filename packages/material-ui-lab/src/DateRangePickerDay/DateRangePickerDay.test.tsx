import * as React from 'react';
import { getClasses, createMount, createClientRender, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePickerDay from '@material-ui/lab/DateRangePickerDay';
import { adapterToUse, AdapterClassToUse } from '../internal/pickers/test-utils';

describe('<DateRangePickerDay />', () => {
  const mount = createMount();
  const render = createClientRender();
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
      render: (node: React.ReactNode) =>
        render(<LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>),
      mount: localizedMount,
      refInstanceof: window.HTMLButtonElement,
      // cannot test reactTestRenderer because of required context
      skip: ['componentProp', 'reactTestRenderer', 'propsSpread', 'refForwarding'],
    }),
  );
});
