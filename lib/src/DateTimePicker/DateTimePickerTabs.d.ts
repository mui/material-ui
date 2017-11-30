import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';

export interface DateTimePickerTabsProps {
  view: DateTimePickerView;
  onChange: (view: DateTimePickerView) => void;
  dateRangeIcon?: ReactNode;
  timeIcon?: ReactNode;
}

declare const DateTimePickerTabs: ComponentClass<DateTimePickerTabsProps>;

export default DateTimePickerTabs;
