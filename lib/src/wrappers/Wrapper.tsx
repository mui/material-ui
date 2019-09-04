import * as React from 'react';
import { Omit } from '../_helpers/utils';
import { StaticWrapper } from './StaticWrapper';
import { ModalWrapper, ModalWrapperProps } from './ModalWrapper';
import { InlineWrapper, InlineWrapperProps } from './InlineWrapper';
import { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { PureDateInputProps, NotOverridableProps } from '../_shared/PureDateInput';

export type WrapperVariant = 'dialog' | 'inline' | 'static';

export interface WrapperProps<T> {
  open: boolean;
  onAccept: () => void;
  onDismiss: () => void;
  onClear: () => void;
  onSetToday: () => void;
  InputComponent: React.FC<T>;
  DateInputProps: T;
  wider?: boolean;
  showTabs?: boolean;
}

type OmitInnerWrapperProps<T extends WrapperProps<any>> = Omit<
  T,
  keyof WrapperProps<any> | 'showTabs'
>;

export type ModalRoot = OmitInnerWrapperProps<ModalWrapperProps>;

export type InlineRoot = OmitInnerWrapperProps<InlineWrapperProps>;

// prettier-ignore
export type ExtendWrapper<TInput extends PureDateInputProps | KeyboardDateInputProps> = {
  /**
   * Picker container option
   * @default 'dialog'
   */
  variant?: WrapperVariant
} & ModalRoot
  & InlineRoot
  & Omit<TInput, NotOverridableProps>

export function getWrapperFromVariant<T>(
  variant?: WrapperVariant
): React.ComponentType<InlineWrapperProps<T> | ModalWrapperProps<T>> {
  switch (variant) {
    case 'inline':
      return InlineWrapper as any;

    case 'static':
      return StaticWrapper as any;

    default:
      return ModalWrapper as any;
  }
}

type Props<T> = {
  variant?: WrapperVariant;
  children?: React.ReactChild;
} & (ModalWrapperProps<T> | InlineWrapperProps<T>);

export const VariantContext = React.createContext<WrapperVariant | null>(null);

export const Wrapper: <T extends KeyboardDateInputProps | PureDateInputProps>(
  p: Props<T>
) => React.ReactElement<Props<T>> = ({ variant, ...props }) => {
  const Component = getWrapperFromVariant<typeof props.DateInputProps>(variant);

  return (
    <VariantContext.Provider value={variant || 'dialog'}>
      <Component {...props} />
    </VariantContext.Provider>
  );
};
