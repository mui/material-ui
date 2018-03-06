import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { DialogProps } from 'material-ui/Dialog';
import { ButtonProps } from 'material-ui/Button';

export interface DateTextFieldProps extends DialogProps {
  onAccept: ButtonProps['onClick'];
  onDismiss: ButtonProps['onClick'];
  onClear: ButtonProps['onClick'];
  dialogContentClassName?: string;
  invalidLabel?: string;
  okLabel?: ReactNode;
  cancelLabel?: ReactNode;
  clearLabel?: ReactNode;
  clearable?: boolean;
}

declare const DateTextField: ComponentClass<DateTextFieldProps>;

export default DateTextField;
