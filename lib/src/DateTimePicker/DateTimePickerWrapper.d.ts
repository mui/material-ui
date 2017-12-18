import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { RenderDay } from '../DatePicker/Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { Moment } from 'moment';

export interface DateTimePickerWrapperProps extends ModalWrapperProps {
  minDate?: DateType;
  maxDate?: DateType;
  onChange: (date: object) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
  autoOk?: boolean;
  autoSubmit?: boolean;
  returnMoment?: boolean;
  showTabs?: boolean;
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

declare const DateTimePickerWrapper: ComponentClass<DateTimePickerWrapperProps>;

export default DateTimePickerWrapper;
