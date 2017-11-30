import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { RenderDay } from './Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';

export interface DatePickerWrapperProps extends ModalWrapperProps {
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: object) => void;
    autoOk?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    openToYearSelection?: boolean;
    returnMoment?: boolean;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    renderDay?: RenderDay;
    utils?: Utils;
}

declare const DatePickerWrapper: ComponentClass<DatePickerWrapperProps>;

export default DatePickerWrapper;
