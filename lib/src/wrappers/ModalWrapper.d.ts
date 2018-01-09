import { ComponentClass, ReactNode } from 'react';
import { ButtonProps } from 'material-ui/Button';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { DateTextFieldProps } from '../_shared/DateTextField';

export interface ModalWrapperProps extends Partial<DateTextFieldProps> {
    onAccept?: () => void;
    onDismiss?: () => void;
    onClear?: () => void;
    dialogContentClassName?: string;
    okLabel?: ReactNode;
    cancelLabel?: ReactNode;
    clearLabel?: ReactNode;
    clearable?: boolean;
}

declare const ModalWrapper: ComponentClass<ModalWrapperProps>;

export default ModalWrapper;
