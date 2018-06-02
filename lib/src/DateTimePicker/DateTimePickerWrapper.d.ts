import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from '../DatePicker/Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { MaterialUiPickersDate } from '../typings/date'
import { BasePickerProps } from '../_shared/BasePicker'
import { Omit } from '@material-ui/core'

export interface DateTimePickerWrapperProps extends BasePickerProps, Omit<ModalWrapperProps, 'onChange' | 'value'> {
  minDate?: DateType;
  maxDate?: DateType;
  disablePast?: boolean;
  disableFuture?: boolean;
  autoSubmit?: boolean;
  showTabs?: boolean;
  animateYearScrolling?: boolean;
  openTo?: DateTimePickerView;
  leftArrowIcon?: ReactNode;
  rightArrowIcon?: ReactNode;
  dateRangeIcon?: ReactNode;
  timeIcon?: ReactNode;
  renderDay?: RenderDay;
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

declare const DateTimePickerWrapper: ComponentClass<DateTimePickerWrapperProps>;

export default DateTimePickerWrapper;
