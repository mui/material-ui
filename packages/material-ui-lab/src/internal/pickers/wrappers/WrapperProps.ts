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
  DateInputProps: DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> };
  // TODO: Mark as required
  KeyboardDateInputComponent?: React.ComponentType<DateInputPropsLike>;
  onAccept: () => void;
  onClear: () => void;
  onDismiss: () => void;
  onSetToday: () => void;
  open: boolean;
  // TODO: Mark as required
  PureDateInputComponent?: React.ComponentType<DateInputPropsLike>;
}
