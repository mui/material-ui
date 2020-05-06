import { DateInputProps } from '../_shared/PureDateInput';
import { StaticWrapper, StaticWrapperProps } from './StaticWrapper';
import { MobileWrapper, MobileWrapperProps } from './MobileWrapper';
import { DesktopWrapper, DesktopWrapperProps } from './DesktopWrapper';
import { ResponsiveWrapper, ResponsiveWrapperProps } from './ResponsiveWrapper';
import { DesktopPopperWrapper, DesktopPopperWrapperProps } from './DesktopPopperWrapper';

export type DateInputPropsLike<TInputValue, TDateValue> = Omit<
  DateInputProps<TInputValue, TDateValue>,
  'renderInput' | 'validationError'
> & {
  renderInput: (...args: any) => JSX.Element;
  validationError?: any;
};

export interface WrapperProps<TInputProps = DateInputPropsLike<any, any>> {
  open: boolean;
  onAccept: () => void;
  onDismiss: () => void;
  onClear: () => void;
  onSetToday: () => void;
  DateInputProps: TInputProps;
  KeyboardDateInputComponent?: React.ComponentType<TInputProps>;
  PureDateInputComponent?: React.ComponentType<TInputProps>;
}

export type OmitInnerWrapperProps<T extends WrapperProps<any>> = Omit<T, keyof WrapperProps<any>>;

export type SomeWrapper =
  | typeof ResponsiveWrapper
  | typeof StaticWrapper
  | typeof MobileWrapper
  | typeof DesktopWrapper
  | typeof DesktopPopperWrapper;

export type ExtendWrapper<TWrapper extends SomeWrapper> = TWrapper extends typeof StaticWrapper
  ? StaticWrapperProps
  : TWrapper extends typeof ResponsiveWrapper
  ? OmitInnerWrapperProps<ResponsiveWrapperProps>
  : TWrapper extends typeof MobileWrapper
  ? OmitInnerWrapperProps<MobileWrapperProps>
  : TWrapper extends typeof DesktopWrapper
  ? OmitInnerWrapperProps<DesktopWrapperProps>
  : TWrapper extends typeof DesktopWrapper
  ? OmitInnerWrapperProps<DesktopWrapperProps>
  : TWrapper extends typeof DesktopPopperWrapper
  ? OmitInnerWrapperProps<DesktopPopperWrapperProps>
  : never;

export function getWrapperVariant(wrapper: SomeWrapper) {
  if (wrapper === DesktopWrapper) {
    return 'desktop';
  } else if (wrapper === StaticWrapper) {
    return 'static';
  } else if (wrapper === MobileWrapper) {
    return 'mobile';
  } else {
    return null;
  }
}

export type WrapperVariant = ReturnType<typeof getWrapperVariant>;

export { StaticWrapper, MobileWrapper as ModalWrapper, DesktopWrapper as InlineWrapper };
