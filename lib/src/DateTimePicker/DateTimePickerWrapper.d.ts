import { ComponentClass, ReactNode } from 'react';
import { Utils } from '../utils/utils'

export interface DateTimePickerWrapperProps {
  value?: any;
  format?: string;
  onChange: (date: Date) => void;
  disabled?: boolean;
  autoOk?: boolean;
  classes?: Object;
  autoSubmit?: Object;
  // ToDo move to the lower level
  disableFuture?: Object;
  openTo?: string;
  minDate?: any;
  maxDate?: any;
  showTabs?: boolean;
  returnMoment?: boolean;
  invalidLabel?: boolean;
  leftArrowIcon: ReactNode;
  rightArrowIcon: ReactNode;
  dateRangeIcon?: ReactNode;
  timeIcon?: ReactNode;
  renderDay?: () => ReactNode;
  labelFunc?: () => string;
  utils?: Utils;
  ampm: boolean;
}

declare const DateTimePickerWrapper: ComponentClass<DateTimePickerWrapperProps>;

export default DateTimePickerWrapper;
