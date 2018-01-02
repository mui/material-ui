import { ComponentClass, ReactNode } from 'react';
import { ButtonProps } from 'material-ui/Button';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import {DateTextFieldProps} from '../_shared/DateTextField';

export interface ModalWrapperProps extends DateTextFieldProps {
    onAccept?: ButtonProps['onClick'];
    onDismiss?: ButtonProps['onClick'];
    dialogContentClassName?: string;
    okLabel?: ReactNode;
    cancelLabel?: ReactNode;
    clearLabel?: ReactNode;
    clearable?: boolean;
}

declare const ModalWrapper: ComponentClass<ModalWrapperProps>;

export default ModalWrapper;
