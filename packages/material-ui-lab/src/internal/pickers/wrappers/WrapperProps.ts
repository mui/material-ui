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
  KeyboardDateInputComponent: React.ComponentType<
    DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> }
  >;
  onAccept: () => void;
  onClear: () => void;
  onDismiss: () => void;
  onSetToday: () => void;
  open: boolean;
  PureDateInputComponent: React.ComponentType<DateInputPropsLike>;
}
