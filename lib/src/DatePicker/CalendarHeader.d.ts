import { ComponentClass, ReactNode } from 'react';
import { Utils } from '../utils/utils';
import { Moment } from 'moment';

export interface CalendarHeaderProps {
    currentMonth: object;
    onMonthChange: (date: Moment) => void;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    utils?: Utils;
}

declare const CalendarHeader: ComponentClass<CalendarHeaderProps>;

export default CalendarHeader;
