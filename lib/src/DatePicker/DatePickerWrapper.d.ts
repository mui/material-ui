import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from './Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { MaterialUiPickersDate } from '../typings/date'
import { BasePickerProps } from '../_shared/BasePicker'
import { Omit } from '@material-ui/core'

export interface DatePickerWrapperProps extends BasePickerProps, Omit<ModalWrapperProps, 'onChange' | 'value'> {
  minDate?: DateType;
  maxDate?: DateType;
  disablePast?: boolean;
  disableFuture?: boolean;
  animateYearScrolling?: boolean;
  openToYearSelection?: boolean;
  leftArrowIcon?: ReactNode;
  rightArrowIcon?: ReactNode;
  renderDay?: RenderDay;
  shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

declare const DatePickerWrapper: ComponentClass<DatePickerWrapperProps>;

export default DatePickerWrapper;
