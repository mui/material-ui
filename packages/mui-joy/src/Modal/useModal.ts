import * as React from 'react';
import {
  unstable_ownerDocument as ownerDocument,
  unstable_useForkRef as useForkRef,
  unstable_useEventCallback as useEventCallback,
} from '@mui/utils';
import { ModalManager, ModalOwnProps } from '@mui/base/Modal';
import { EventHandlers, extractEventHandlers } from '@mui/base/utils';

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

type UseModalParameters = Pick<
  ModalOwnProps,
  'container' | 'disableEscapeKeyDown' | 'disableScrollLock' | 'open'
> & {
  'aria-hidden'?: React.AriaAttributes['aria-hidden'];
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'): void;
  }['bivarianceHack'];
  onKeyDown?: React.KeyboardEventHandler;
  ref: React.Ref<HTMLElement>;
};

function ariaHidden(element: Element, show: boolean): void {
  if (show) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

function getContainer(container: UseModalParameters['container']) {
  return (typeof container === 'function' ? container() : container) as HTMLElement;
}

// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.
const manager = new ModalManager();

const useModal = (parameters: UseModalParameters) => {
  const {
    container,
    disableEscapeKeyDown = false,
    disableScrollLock = false,
    onClose,
    open,
    ref,
  } = parameters;

  // @ts-ignore internal logic
  const modal = React.useRef<{ modalRef: HTMLDivElement; mount: HTMLElement }>({});
  const mountNodeRef = React.useRef<null | HTMLElement>(null);
  const modalRef = React.useRef<null | HTMLDivElement>(null);
  const handleRef = useForkRef(modalRef, ref);

  let ariaHiddenProp = true;
  if (
    parameters['aria-hidden'] === 'false' ||
    (typeof parameters['aria-hidden'] === 'boolean' && !parameters['aria-hidden'])
  ) {
    ariaHiddenProp = false;
  }

  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current as HTMLDivElement;
    modal.current.mount = mountNodeRef.current as HTMLElement;
    return modal.current;
  };

  const handleMounted = () => {
    manager.mount(getModal(), { disableScrollLock });

    // Fix a bug on Chrome where the scroll isn't initially 0.
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };

  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;

    manager.add(getModal(), resolvedContainer);

    // The element was already mounted.
    if (modalRef.current) {
      handleMounted();
    }
  });

  const isTopModal = () => manager.isTopModal(getModal());

  const handlePortalRef = useEventCallback((node: HTMLElement) => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });

  const handleClose = React.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp]);

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open, handleClose, handleOpen]);

  const createHandleKeyDown = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent) => {
    otherHandlers.onKeyDown?.(event);

    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (event.key !== 'Escape' || !isTopModal()) {
      return;
    }

    if (!disableEscapeKeyDown) {
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();

      if (onClose) {
        onClose(event, 'escapeKeyDown');
      }
    }
  };

  const createHandleBackdropClick = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    otherHandlers.onClick?.(event);

    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseModalRootSlotProps<TOther> => {
    const propsEventHandlers = extractEventHandlers(parameters) as Partial<UseModalParameters>;
    const externalEventHandlers = {
      ...propsEventHandlers,
      ...otherHandlers,
    };

    return {
      role: 'presentation',
      ...externalEventHandlers,
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef,
    };
  };

  const getBackdropProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseModalBackdropSlotProps<TOther> => {
    const externalEventHandlers = otherHandlers;

    return {
      'aria-hidden': true,
      ...externalEventHandlers,
      onClick: createHandleBackdropClick(externalEventHandlers),
      open,
    };
  };

  return {
    getRootProps,
    getBackdropProps,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal,
  };
};

export default useModal;
