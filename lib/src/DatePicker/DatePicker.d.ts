import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { RenderDay } from './Calendar';
import { MaterialUiPickersDate } from '../typings/date'

export interface DatePickerProps {
    date: MaterialUiPickersDate;
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
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

declare const DatePicker: ComponentClass<DatePickerProps>;

export default DatePicker;
