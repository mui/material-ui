import { ComponentClass, InputHTMLAttributes } from 'react';

export interface MaskedInputProps extends InputHTMLAttributes<MaskedInputProps> {
    mask?: any;
}

declare const MaskedInput: ComponentClass<MaskedInputProps>;

export default MaskedInput;