import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { Moment } from 'moment';

export interface YearSelectionProps {
    date: Moment;
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: Moment) => void;
    disablePast?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    utils?: Utils;
}

declare const YearSelection: ComponentClass<YearSelectionProps>;

export default YearSelection;
