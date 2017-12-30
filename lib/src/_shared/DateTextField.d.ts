import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { TextFieldProps } from 'material-ui/TextField';

export interface DateTextFieldProps extends TextFieldProps {
    value: any;
    mask?: any;
    onChange: (date: object) => void;
    onClear: () => void;
    InputProps: any;
    keyboard?: boolean;
    disabled?: boolean;
    format?: string;
    invalidLabel?: string;
    emptyLabel?: string;
    labelFunc?: (date: object, invalidLabel: string) => string;
    keyboardIcon?: string;
    clearable?: boolean;
}

declare const DateTextField: ComponentClass<DateTextFieldProps>;

export default DateTextField;