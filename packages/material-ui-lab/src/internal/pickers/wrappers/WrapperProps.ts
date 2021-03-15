import { DateInputProps } from '../PureDateInput';
import { ExportedPickerPopperProps } from '../PickersPopper';
import { ExportedPickerModalProps } from '../PickersModalDialog';

export type DateInputPropsLike = Omit<
  DateInputProps<any, any>,
  'renderInput' | 'validationError'
> & {
  renderInput: (...args: any) => JSX.Element;
  validationError?: any;
};

export interface StaticWrapperProps {
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   * @default "static"
   */
  displayStaticWrapperAs?: 'desktop' | 'mobile';
}

export interface MobileWrapperProps extends ExportedPickerModalProps {}

export interface DesktopWrapperProps extends ExportedPickerPopperProps {}

export interface PrivateWrapperProps {
  open: boolean;
  onAccept: () => void;
  onDismiss: () => void;
  onClear: () => void;
  onSetToday: () => void;
  DateInputProps: DateInputPropsLike;
  // TODO: these are not optional
  KeyboardDateInputComponent?: React.ComponentType<DateInputPropsLike>;
  PureDateInputComponent?: React.ComponentType<DateInputPropsLike>;
}

export type WrapperProps = StaticWrapperProps &
  MobileWrapperProps &
  DesktopWrapperProps &
  PrivateWrapperProps;
