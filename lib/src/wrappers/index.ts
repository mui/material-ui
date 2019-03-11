import InlineWrapper, { InlineWrapperProps } from './InlineWrapper';
import ModalWrapper, { ModalWrapperProps } from './ModalWrapper';

export type WrapperVariant = 'dialog' | 'inline';

export interface WrapperProps<T> {
  open: boolean;
  onAccept: () => void;
  onDismiss: () => void;
  onClear: () => void;
  onSetToday: () => void;
  InputComponent: React.FC<T>;
  DateInputProps: T;
  wider?: boolean;
}

export function getWrapperFromVariant<T>(
  variant?: WrapperVariant
): React.ComponentClass<InlineWrapperProps<T> | ModalWrapperProps<T>> {
  switch (variant) {
    case 'inline':
      return InlineWrapper as any;

    default:
      return ModalWrapper as any;
  }
}
