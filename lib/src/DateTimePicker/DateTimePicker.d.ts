import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { RenderDay } from '../DatePicker/Calendar';
import { Moment } from 'moment';

export interface DateTimePickerProps {
  date: Moment;
  minDate?: DateType;
  maxDate?: DateType;
  onChange: (date: Moment, isFinished: boolean, viewType?: DateTimePickerView) => void;
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
  utils?: Utils;
  shouldDisableDate?: (day: Moment) => boolean;
}

declare const DateTimePicker: ComponentClass<DateTimePickerProps>;

export default DateTimePicker;
