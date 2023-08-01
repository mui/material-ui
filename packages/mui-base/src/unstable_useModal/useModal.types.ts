import { ModalOwnProps, ariaHidden } from '../Modal';

export interface UseModalRootSlotOwnProps {
  role: React.AriaRole;
  onKeyDown: React.KeyboardEventHandler;
  ref: React.RefCallback<Element> | null;
}

export interface UseModalBackdropSlotOwnProps {
  'aria-hidden': React.AriaAttributes['aria-hidden'];
  onClick: React.MouseEventHandler;
  open?: boolean;
}

export type UseModalBackdropSlotProps<TOther = {}> = TOther & UseModalBackdropSlotOwnProps;

export type UseModalRootSlotProps<TOther = {}> = TOther & UseModalRootSlotOwnProps;

export type UseModalParameters = Pick<
  ModalOwnProps,
  'container' | 'disableEscapeKeyDown' | 'disableScrollLock' | 'open'
> & {
  'aria-hidden'?: React.AriaAttributes['aria-hidden'];
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'): void;
  }['bivarianceHack'];
  onKeyDown?: React.KeyboardEventHandler;
  ref: React.Ref<Element>;
  closeAfterTransition?: boolean;
  onTransitionEnter?: () => void;
  onTransitionExited?: () => void;
  children: ModalOwnProps['children'];
};

// TODO: add UseModalReturnValue type
