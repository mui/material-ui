import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import {
  elementAcceptingRef,
  HTMLElementType,
  unstable_ownerDocument as ownerDocument,
  unstable_useForkRef as useForkRef,
  unstable_useEventCallback as useEventCallback,
} from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import Portal from '@mui/base/Portal';
import FocusTrap from '@mui/base/FocusTrap';
import { ModalManager } from '@mui/base/Modal';
import { styled, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import { getModalUtilityClass } from './modalClasses';
import { ModalOwnerState, ModalTypeMap } from './ModalProps';
import CloseModalContext from './CloseModalContext';

function ariaHidden(element: Element, show: boolean): void {
  if (show) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

const useUtilityClasses = (ownerState: ModalOwnerState) => {
  const { open } = ownerState;

  const slots = {
    root: ['root', !open && 'hidden'],
    backdrop: ['backdrop'],
  };

  return composeClasses(slots, getModalUtilityClass, {});
};

function getContainer(container: ModalOwnerState['container']) {
  return (typeof container === 'function' ? container() : container) as HTMLElement;
}

// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.
const manager = new ModalManager();

const ModalRoot = styled('div', {
  name: 'JoyModal',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalOwnerState }>(({ ownerState, theme }) => ({
  position: 'fixed',
  zIndex: theme.vars.zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  ...(!ownerState.open && {
    visibility: 'hidden',
  }),
}));

const ModalBackdrop = styled('div', {
  name: 'JoyModal',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => styles.backdrop,
})<{ ownerState: ModalOwnerState }>(({ theme, ownerState }) => ({
  zIndex: -1,
  position: 'fixed',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: theme.vars.palette.background.backdrop,
  WebkitTapHighlightColor: 'transparent',
  ...(ownerState.open && {
    backdropFilter: 'blur(8px)',
  }),
}));
/**
 *
 * Demos:
 *
 * - [Modal](https://mui.com/joy-ui/react-modal/)
 *
 * API:
 *
 * - [Modal API](https://mui.com/joy-ui/api/modal/)
 */
const Modal = React.forwardRef(function ModalU(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyModal',
  });

  const {
    children,
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onClose,
    onKeyDown,
    open,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  // @ts-ignore internal logic
  const modal = React.useRef<{ modalRef: HTMLDivElement; mount: HTMLElement }>({});
  const mountNodeRef = React.useRef<null | HTMLElement>(null);
  const modalRef = React.useRef<null | HTMLDivElement>(null);
  const handleRef = useForkRef(modalRef, ref);

  let ariaHiddenProp = true;
  if (
    props['aria-hidden'] === 'false' ||
    (typeof props['aria-hidden'] === 'boolean' && !props['aria-hidden'])
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

  const ownerState = {
    ...props,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

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

  const [SlotRoot, rootProps] = useSlot('root', {
    additionalProps: { role: 'presentation', onKeyDown: handleKeyDown },
    ref: handleRef,
    className: classes.root,
    elementType: ModalRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotBackdrop, backdropProps] = useSlot('backdrop', {
    additionalProps: {
      'aria-hidden': true,
      onClick: handleBackdropClick,
      open,
    },
    className: classes.backdrop,
    elementType: ModalBackdrop,
    externalForwardedProps,
    ownerState,
  });

  if (!keepMounted && !open) {
    return null;
  }

  return (
    <CloseModalContext.Provider value={onClose}>
      <Portal ref={handlePortalRef} container={container} disablePortal={disablePortal}>
        {/*
         * Marking an element with the role presentation indicates to assistive technology
         * that this element should be ignored; it exists to support the web application and
         * is not meant for humans to interact with directly.
         * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
         */}
        <SlotRoot {...rootProps}>
          {!hideBackdrop ? <SlotBackdrop {...backdropProps} /> : null}
          <FocusTrap
            disableEnforceFocus={disableEnforceFocus}
            disableAutoFocus={disableAutoFocus}
            disableRestoreFocus={disableRestoreFocus}
            isEnabled={isTopModal}
            open={open}
          >
            {React.Children.only(children) &&
              React.cloneElement(children, {
                ...(children.props.tabIndex === undefined && {
                  tabIndex: -1,
                }),
              })}
          </FocusTrap>
        </SlotRoot>
      </Portal>
    </CloseModalContext.Provider>
  );
}) as OverridableComponent<ModalTypeMap>;

Modal.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A single child content element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: PropTypes.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: PropTypes.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: PropTypes.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: PropTypes.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"closeClick"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Modal;
