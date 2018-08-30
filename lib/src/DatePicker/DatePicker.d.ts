import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from './components/Calendar';
import { MaterialUiPickersDate } from '../typings/date'

export interface BaseDatePickerProps {
  minDate?: DateType;
  maxDate?: DateType;
  initialFocusedDate?: DateType;
  disablePast?: boolean;
  disableFuture?: boolean;
  animateYearScrolling?: boolean;
  openToYearSelection?: boolean;
  leftArrowIcon?: ReactNode;
  rightArrowIcon?: ReactNode;
  renderDay?: RenderDay;
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

export interface DatePickerProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
  utils?: Utils<MaterialUiPickersDate>;
}

declare const DatePicker: ComponentClass<DatePickerProps>;

export default DatePicker;
