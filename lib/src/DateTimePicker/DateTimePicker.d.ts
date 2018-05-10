import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from '../DatePicker/Calendar';
import { MaterialUiPickersDate } from '../typings/date'

export interface DateTimePickerProps {
  date: MaterialUiPickersDate;
  minDate?: DateType;
  maxDate?: DateType;
  onChange: (date: MaterialUiPickersDate, isFinished: boolean, viewType?: DateTimePickerView) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
  autoSubmit?: boolean;
  showTabs?: boolean;
  animateYearScrolling?: boolean;
  ampm?: boolean;
  openTo?: DateTimePickerView;
  leftArrowIcon: ReactNode;
  rightArrowIcon: ReactNode;
  dateRangeIcon?: ReactNode;
  timeIcon?: ReactNode;
  renderDay?: RenderDay;
  utils?: Utils<MaterialUiPickersDate>;
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

declare const DateTimePicker: ComponentClass<DateTimePickerProps>;

export default DateTimePicker;
