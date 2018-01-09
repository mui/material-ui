import { ComponentClass } from 'react';
import { DateType } from '../constants/prop-types'
import { TextFieldProps } from 'material-ui/TextField';
import {Omit} from 'material-ui'

export interface DateTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
    value: DateType;
    mask?: any;
    onChange: (date: Date, foo: boolean) => void;
    onClear?: () => void;
    keyboard?: boolean;
    format?: string;
    invalidLabel?: string;
    emptyLabel?: string;
    labelFunc?: (date: Date, invalidLabel: string) => string;
    keyboardIcon?: string;
    invalidDateMessage?: string;
    clearable?: boolean;
}

declare const DateTextField: ComponentClass<DateTextFieldProps>;

export default DateTextField;