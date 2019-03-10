import { Omit } from '@material-ui/core';
import { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { PureDateInputProps } from '../_shared/PureDateInput';
import { InlineWrapperProps } from './InlineWrapper';
import { ModalWrapperProps } from './ModalWrapper';

export type ExtendWrapper<
  TWrapper extends InlineWrapperProps | ModalWrapperProps,
  TInput extends PureDateInputProps | KeyboardDateInputProps
> = Omit<
  TWrapper,
  | 'open'
  | 'onAccept'
  | 'onDismiss'
  | 'onClear'
  | 'onSetToday'
  | 'format'
  | 'InputComponent'
  | 'DateInputProps'
> &
  Omit<TInput, 'inputValue' | 'validationError'>;
