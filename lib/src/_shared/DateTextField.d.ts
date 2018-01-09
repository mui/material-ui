import { ComponentClass } from 'react';
import { DateType } from '../constants/prop-types'
import { TextFieldProps } from 'material-ui/TextField';
import {Omit} from 'material-ui'
import { Moment } from 'moment'

export interface DateTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
    value: DateType;
    mask?: any;
    onChange: (date: Moment, foo: boolean) => void;
    onClear?: () => void;
    keyboard?: boolean;
    format?: string;
    invalidLabel?: string;
    emptyLabel?: string;
    labelFunc?: (date: Moment, invalidLabel: string) => string;
    keyboardIcon?: string;
    invalidDateMessage?: string;
    clearable?: boolean;
}

declare const DateTextField: ComponentClass<DateTextFieldProps>;

export default DateTextField;