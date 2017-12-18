import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';

export interface YearSelectionProps {
    date: object;
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: object) => void;
    disablePast?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    utils?: Utils;
}

declare const YearSelection: ComponentClass<YearSelectionProps>;

export default YearSelection;
