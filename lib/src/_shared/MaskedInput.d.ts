import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { TextFieldProps } from 'material-ui/TextField';

export interface DateTextFieldProps extends TextFieldProps {
    mask?: any;
}

declare const MaskedInput: ComponentClass<MaskedInputProps>;

export default MaskedInput;