import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from './Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { MaterialUiPickersDate } from '../typings/date'
import { PickerBaseProps } from '../_shared/PickerBase'
import { Omit } from 'material-ui'

export interface DatePickerWrapperProps extends PickerBaseProps,
  Omit<ModalWrapperProps, 'onChange'> {
    minDate?: DateType;
    maxDate?: DateType;
    disablePast?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    openToYearSelection?: boolean;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    renderDay?: RenderDay;
    utils?: Utils;
    shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}

declare const DatePickerWrapper: ComponentClass<DatePickerWrapperProps>;

export default DatePickerWrapper;
