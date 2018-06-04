import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../typings/utils';
import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';
import { EventListenerProps } from 'react-event-listener'
import { Omit } from '@material-ui/core';

type DialogBaseProps = Omit<DialogProps, "onKeyDown">

export interface DateTextFieldProps extends DialogBaseProps {
  onAccept: ButtonProps['onClick'];
  onDismiss: ButtonProps['onClick'];
  onClear: ButtonProps['onClick'];
  onSetToday: ButtonProps['onClick'];
  onKeyDown: EventListenerProps['onKeyDown']
  dialogContentClassName?: string;
  invalidLabel?: string;
  okLabel?: ReactNode;
  cancelLabel?: ReactNode;
  clearLabel?: ReactNode;
  clearable?: boolean;
}

declare const DateTextField: ComponentClass<DateTextFieldProps>;

export default DateTextField;
