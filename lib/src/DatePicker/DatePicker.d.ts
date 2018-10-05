import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RenderDay } from './components/Calendar';
import { DateType } from '../constants/prop-types';
import { WithUtilsProps } from '../_shared/WithUtils';
import { MaterialUiPickersDate } from '../typings/date';
export interface BaseDatePickerProps {
    minDate?: DateType;
    maxDate?: DateType;
    initialFocusedDate?: DateType;
    disablePast?: boolean;
    disableFuture?: boolean;
    animateYearScrolling?: boolean;
    openToYearSelection?: boolean;
    leftArrowIcon?: React.ReactNode;
    rightArrowIcon?: React.ReactNode;
    renderDay?: RenderDay;
    allowKeyboardControl?: boolean;
    shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}
export interface DatePickerProps extends BaseDatePickerProps {
    date: MaterialUiPickersDate;
    onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}
export declare class DatePicker extends React.PureComponent<DatePickerProps & WithUtilsProps> {
    static propTypes: {
        date: PropTypes.Validator<object>;
        minDate: PropTypes.Requireable<string | number | object>;
        maxDate: PropTypes.Requireable<string | number | object>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        disablePast: PropTypes.Requireable<boolean>;
        disableFuture: PropTypes.Requireable<boolean>;
        animateYearScrolling: PropTypes.Requireable<boolean>;
        openToYearSelection: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        leftArrowIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        rightArrowIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        renderDay: PropTypes.Requireable<(...args: any[]) => any>;
        utils: PropTypes.Validator<object>;
        shouldDisableDate: PropTypes.Requireable<(...args: any[]) => any>;
        allowKeyboardControl: PropTypes.Requireable<boolean>;
        initialFocusedDate: PropTypes.Requireable<string | number | object>;
    };
    static defaultProps: {
        minDate: string;
        maxDate: string;
        disablePast: boolean;
        disableFuture: boolean;
        allowKeyboardControl: boolean;
        animateYearScrolling: undefined;
        openToYearSelection: boolean;
        children: null;
        leftArrowIcon: undefined;
        rightArrowIcon: undefined;
        renderDay: undefined;
        shouldDisableDate: undefined;
    };
    state: {
        showYearSelection: boolean;
    };
    readonly date: any;
    readonly minDate: any;
    readonly maxDate: any;
    handleYearSelect: (date: any) => void;
    openYearSelection: () => void;
    openCalendar: () => void;
    render(): JSX.Element;
}
declare const _default: React.StatelessComponent<Pick<DatePickerProps & WithUtilsProps, "date" | "onChange" | "minDate" | "disablePast" | "disableFuture" | "maxDate" | "animateYearScrolling" | "initialFocusedDate" | "openToYearSelection" | "leftArrowIcon" | "rightArrowIcon" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate">>;
export default _default;
