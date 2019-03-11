import { Omit } from '@material-ui/core';
import { WrapperProps, WrapperVariant } from '.';
import { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { PureDateInputProps } from '../_shared/PureDateInput';
import { InlineWrapperProps } from './InlineWrapper';
import { ModalWrapperProps } from './ModalWrapper';

export type ExtendWrapper<
  TWrapper extends InlineWrapperProps | ModalWrapperProps,
  TInput extends PureDateInputProps | KeyboardDateInputProps
> = Omit<
  TWrapper,
  'open' | 'onAccept' | 'onDismiss' | 'onClear' | 'onSetToday' | 'InputComponent' | 'DateInputProps'
> &
  Omit<TInput, 'inputValue' | 'validationError'>;

type OmitInnerWrapperProps<T extends WrapperProps<any>> = Omit<T, keyof WrapperProps<any>>;

export type InlineRoot = {
  variant?: 'inline';
} & OmitInnerWrapperProps<InlineWrapperProps>;

export type ModalRoot = {
  variant?: 'dialog';
} & OmitInnerWrapperProps<ModalWrapperProps>;

// prettier-ignore
export type ExtendWrapper2<TInput extends PureDateInputProps | KeyboardDateInputProps> =
  Omit<TInput, 'inputValue' | 'validationError' | 'forwardedRef'> & (
    ModalRoot | InlineRoot
  )
