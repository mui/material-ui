import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import CalendarPickerSkeleton, {
  calendarPickerSkeletonClasses as classes,
} from '@mui/lab/CalendarPickerSkeleton';

describe('<CalendarPickerSkeleton />', () => {
  const { render } = createRenderer();

  describeConformance(<CalendarPickerSkeleton />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCalendarPickerSkeleton',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'refForwarding', 'componentsProp', 'themeVariants'],
  }));
});
