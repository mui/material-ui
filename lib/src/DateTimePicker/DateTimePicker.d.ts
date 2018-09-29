import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from '../DatePicker/components/Calendar';
import { MaterialUiPickersDate } from '../typings/date'
import { BaseDatePickerProps } from '../DatePicker/DatePicker';

export interface BaseDateTimePickerProps extends BaseDatePickerProps {
  autoSubmit?: boolean;
  showTabs?: boolean;
  ampm?: boolean;
  openTo?: DateTimePickerView;
  dateRangeIcon?: ReactNode;
  timeIcon?: ReactNode;
}

export interface DateTimePickerProps extends BaseDateTimePickerProps {
  date: MaterialUiPickersDate;
  utils?: Utils<MaterialUiPickersDate>;
  onChange: (date: MaterialUiPickersDate, isFinished: boolean, viewType?: DateTimePickerView) => void;
}

declare const DateTimePicker: ComponentClass<DateTimePickerProps>;

export default DateTimePicker;
