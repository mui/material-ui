import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePickerDay, {
  dateRangePickerDayClasses as classes,
} from '@material-ui/lab/DateRangePickerDay';
import { adapterToUse, AdapterClassToUse } from '../internal/pickers/test-utils';

describe('<DateRangePickerDay />', () => {
  const mount = createMount();
  const render = createClientRender();

  const localizedMount = (node: React.ReactNode) => {
    return mount(
      <LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>,
    );
  };

  describeConformanceV5(
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
      muiName: 'MuiDateRangePickerDay',
      render: (node: React.ReactNode) =>
        render(<LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>),
      mount: localizedMount,
      refInstanceof: window.HTMLButtonElement,
      // cannot test reactTestRenderer because of required context
      skip: [
        'componentProp',
        'componentsProp',
        'reactTestRenderer',
        'propsSpread',
        'refForwarding',
        // TODO: Fix DateRangePickerDays is not spreading props on root
        'themeDefaultProps',
        'themeVariants',
      ],
    }),
  );
});
