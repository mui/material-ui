import * as React from 'react';
import { DateInputProps } from '../PureDateInput';

export type DateInputPropsLike = Omit<
  DateInputProps<any, any>,
  'renderInput' | 'validationError'
> & {
  renderInput: (...args: any) => JSX.Element;
  validationError?: any;
};

export interface PrivateWrapperProps {
  open: boolean;
  onAccept: () => void;
  onDismiss: () => void;
  onClear: () => void;
  onSetToday: () => void;
  DateInputProps: DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> };
  // TODO: these are not optional
  KeyboardDateInputComponent?: React.ComponentType<DateInputPropsLike>;
  PureDateInputComponent?: React.ComponentType<DateInputPropsLike>;
}
