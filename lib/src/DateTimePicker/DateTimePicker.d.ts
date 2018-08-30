import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from '../DatePicker/components/Calendar';
import { MaterialUiPickersDate } from '../typings/date'

export interface BaseDateTimePickerProps {
  minDate?: DateType;
  maxDate?: DateType;
  disablePast?: boolean;
  disableFuture?: boolean;
  autoSubmit?: boolean;
  showTabs?: boolean;
  animateYearScrolling?: boolean;
  ampm?: boolean;
  openTo?: DateTimePickerView;
  leftArrowIcon?: ReactNode;
  rightArrowIcon?: ReactNode;
  dateRangeIcon?: ReactNode;
  timeIcon?: ReactNode;
  renderDay?: RenderDay;
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

export interface DateTimePickerProps extends BaseDateTimePickerProps {
  date: MaterialUiPickersDate;
  utils?: Utils<MaterialUiPickersDate>;
  onChange: (date: MaterialUiPickersDate, isFinished: boolean, viewType?: DateTimePickerView) => void;
}

declare const DateTimePicker: ComponentClass<DateTimePickerProps>;

export default DateTimePicker;
