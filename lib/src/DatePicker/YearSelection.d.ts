import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { MaterialUiPickersDate } from '../typings/date'

export interface YearSelectionProps {
    date: MaterialUiPickersDate;
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: MaterialUiPickersDate) => void;
    disablePast?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    utils?: Utils;
}

declare const YearSelection: ComponentClass<YearSelectionProps>;

export default YearSelection;
