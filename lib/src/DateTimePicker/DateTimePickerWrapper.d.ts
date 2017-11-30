import * as React from 'react';
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
  leftArrowIcon: React.ReactNode;
  rightArrowIcon: React.ReactNode;
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
  renderDay?: () => React.ReactNode;
  labelFunc?: () => string;
  utils?: Utils;
  ampm: boolean;
}

declare class DateTimePickerWrapper extends React.Component<DateTimePickerWrapperProps, any> {  }