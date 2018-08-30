import { ComponentClass, ReactNode } from 'react';
import { DateTextFieldProps } from '../_shared/DateTextField';
import { DialogProps } from '@material-ui/core/Dialog';
import { MaterialUiPickersDate } from '../typings/date';

export interface ModalWrapperProps extends Partial<DateTextFieldProps> {
    onAccept?: () => void;
    onDismiss?: () => void;
    onClear?: () => void;
    onSetToday?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
    dialogContentClassName?: string;
    okLabel?: ReactNode;
    cancelLabel?: ReactNode;
    clearLabel?: ReactNode;
    todayLabel?: ReactNode;
    showTodayButton?: boolean;
    container?: ReactNode;
    DialogProps?: Partial<DialogProps>;
}

declare const ModalWrapper: ComponentClass<ModalWrapperProps>;

export default ModalWrapper;
