import * as React from 'react';
import { describeConformance } from 'test/utils';
import DateRangePickerDay, {
  dateRangePickerDayClasses as classes,
} from '@material-ui/lab/DateRangePickerDay';
import { adapterToUse, wrapPickerMount, createPickerRender } from '../internal/pickers/test-utils';

describe('<DateRangePickerDay />', () => {
  const render = createPickerRender();

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
      muiName: 'MuiDateRangePickerDay',
      render,
      wrapMount: wrapPickerMount,
      refInstanceof: window.HTMLButtonElement,
      // cannot test reactTestRenderer because of required context
      skip: [
        'componentProp',
        'rootClass', // forwards classes to DateRangePickerDayDay, but applies root class on DateRangePickerDayRoot
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
