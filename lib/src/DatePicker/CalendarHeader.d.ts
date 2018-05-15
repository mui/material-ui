import { ComponentClass, ReactNode } from 'react';
import { Utils } from '../typings/utils';
import { MaterialUiPickersDate } from '../typings/date';

export interface CalendarHeaderProps {
    currentMonth: object;
    onMonthChange: (date: MaterialUiPickersDate) => void;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    disablePrevMonth?: boolean;
    disableNextMonth?: boolean;
    utils?: Utils<MaterialUiPickersDate>;
}

declare const CalendarHeader: ComponentClass<CalendarHeaderProps>;

export default CalendarHeader;
