import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { RenderDay } from './Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { Moment } from 'moment';

export interface DatePickerWrapperProps extends ModalWrapperProps {
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: object) => void;
    autoOk?: boolean;
    disablePast?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    openToYearSelection?: boolean;
    returnMoment?: boolean;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    renderDay?: RenderDay;
    utils?: Utils;
    shouldDisableDate?: (day: Moment) => boolean;
}

declare const DatePickerWrapper: ComponentClass<DatePickerWrapperProps>;

export default DatePickerWrapper;
