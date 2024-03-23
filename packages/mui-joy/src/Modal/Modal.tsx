'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { elementAcceptingRef, HTMLElementType } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { Portal } from '@mui/base/Portal';
import { FocusTrap } from '@mui/base/FocusTrap';
import { unstable_useModal as useModal } from '@mui/base/unstable_useModal';
import { styled, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import { getModalUtilityClass } from './modalClasses';
import { ModalOwnerState, ModalTypeMap } from './ModalProps';
import CloseModalContext from './CloseModalContext';

const useUtilityClasses = (ownerState: ModalOwnerState) => {
  const { open } = ownerState;

  const slots = {
    root: ['root', !open && 'hidden'],
    backdrop: ['backdrop'],
  };

  return composeClasses(slots, getModalUtilityClass, {});
};

export const StyledModalRoot = styled('div')<{ ownerState: ModalOwnerState }>(
  ({ ownerState, theme }) => ({
    '--unstable_popup-zIndex': `calc(${theme.vars.zIndex.modal} + 1)`,
    '& ~ [role="listbox"]': {
      // target all the listbox (Autocomplete, Menu, Select, etc.) that uses portal
      '--unstable_popup-zIndex': `calc(${theme.vars.zIndex.modal} + 1)`,
    },
    position: 'fixed',
    zIndex: theme.vars.zIndex.modal,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    ...(!ownerState.open && {
      visibility: 'hidden',
    }),
  }),
);

const ModalRoot = styled(StyledModalRoot, {
  name: 'JoyModal',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ModalOwnerState }>({});

export const StyledModalBackdrop = styled('div')<{ ownerState: ModalOwnerState }>(({ theme }) => ({
  zIndex: -1,
  position: 'fixed',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: theme.vars.palette.background.backdrop,
  WebkitTapHighlightColor: 'transparent',
  backdropFilter: 'blur(8px)',
}));

export const ModalBackdrop = styled(StyledModalBackdrop, {
  name: 'JoyModal',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => styles.backdrop,
})<{ ownerState: ModalOwnerState }>({});
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
const Modal = React.forwardRef(function Modal(inProps, ref) {
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

  const { getRootProps, getBackdropProps, rootRef, portalRef, isTopModal } = useModal({
    ...ownerState,
    rootRef: ref,
  });

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref: rootRef,
    className: classes.root,
    elementType: ModalRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
  });

  const [SlotBackdrop, backdropProps] = useSlot('backdrop', {
    className: classes.backdrop,
    elementType: ModalBackdrop,
    externalForwardedProps,
    getSlotProps: getBackdropProps,
    ownerState,
  });

  if (!keepMounted && !open) {
    return null;
  }

  return (
    <CloseModalContext.Provider value={onClose}>
      <Portal ref={portalRef} container={container} disablePortal={disablePortal}>
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
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
