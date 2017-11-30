import { ComponentClass, ReactNode } from 'react';
import { Utils } from '../utils/utils';

export interface CalendarHeaderProps {
    currentMonth: object;
    onMonthChange: (date: object) => void;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    utils?: Utils;
}

declare const CalendarHeader: ComponentClass<CalendarHeaderProps>;

export default CalendarHeader;
