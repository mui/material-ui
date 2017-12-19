import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { RenderDay } from './Calendar';
import { Moment } from 'moment';

export interface DatePickerProps {
    date: object;
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: object, isFinished?: boolean) => void;
    disablePast?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    openToYearSelection?: boolean;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    renderDay?: RenderDay;
    utils?: Utils;
    shouldDisableDate?: (day: Moment) => boolean;
}

declare const DatePicker: ComponentClass<DatePickerProps>;

export default DatePicker;
