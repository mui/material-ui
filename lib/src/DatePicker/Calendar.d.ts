import { ComponentClass, ReactElement, ReactNode } from 'react';
import { IconButtonProps } from 'material-ui/IconButton';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { Moment } from 'moment';

type DayComponent = ReactElement<IconButtonProps>;

export interface RenderDay {
    (
        day: object,
        selectedDate: object,
        dayInCurrentMonth: boolean,
        dayComponent: DayComponent,
    ): ReactNode;
}

export interface CalendarProps {
    date: object;
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: object) => void;
    disablePast?: boolean;
    disableFuture?: boolean;
    leftArrowIcon?: ReactNode;
    rightArrowIcon?: ReactNode;
    renderDay?: RenderDay;
    utils?: Utils;
    shouldDisableDate?: (day: Moment) => boolean;
}

declare const Calendar: ComponentClass<CalendarProps>;

export default Calendar;
