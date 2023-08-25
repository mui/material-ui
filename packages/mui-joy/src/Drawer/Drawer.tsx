'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType, unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_useModal as useModal } from '@mui/base/unstable_useModal';
import { Portal } from '@mui/base/Portal';
import { FocusTrap } from '@mui/base/FocusTrap';
import { useThemeProps, Theme, styled, ColorInversionProvider, useColorInversion } from '../styles';
import { SheetRoot } from '../Sheet/Sheet';
import { ModalBackdrop } from '../Modal/Modal';
import CloseModalContext from '../Modal/CloseModalContext';
import useSlot from '../utils/useSlot';
import drawerClasses, { getDrawerUtilityClass } from './drawerClasses';
import { DrawerProps, DrawerOwnerState, DrawerTypeMap } from './DrawerProps';

const useUtilityClasses = (ownerState: DrawerOwnerState) => {
  const { open, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      !open && 'hidden',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    backdrop: ['backdrop'],
    content: ['content'],
  };

  return composeClasses(slots, getDrawerUtilityClass, {});
};

const DrawerRoot = styled('div', {
  name: 'JoyDrawer',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DrawerOwnerState }>(({ theme, ownerState }) => ({
  '--unstable_popup-zIndex': `calc(${theme.vars.zIndex.modal} + 1)`,
  '& ~ [role="listbox"]': {
    // target all the listbox (Autocomplete, Menu, Select, etc.) that uses portal
    '--unstable_popup-zIndex': `calc(${theme.vars.zIndex.modal} + 1)`,
  },
  position: 'fixed',
  zIndex: theme.vars.zIndex.modal,
  transitionProperty: 'visibility',
  transitionDelay: ownerState.open ? '0s' : '300ms',
  ...(!ownerState.open && {
    visibility: 'hidden',
  }),
  [`& .${drawerClasses.backdrop}`]: {
    opacity: ownerState.open ? 1 : 0,
    transition: 'opacity 0.3s ease',
  },
}));

const DrawerBackdrop = styled(ModalBackdrop as unknown as 'div', {
  name: 'JoyDrawer',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => styles.backdrop,
})({});

export const DrawerContent = styled(SheetRoot as unknown as 'div', {
  name: 'JoyDrawer',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DrawerOwnerState }>(({ theme, ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    '--Drawer-contentPadding': theme.spacing(2),
    '--Drawer-contentGap': theme.spacing(0.75),
    '--Drawer-contentTitleOffset': theme.spacing(0.25),
    '--Drawer-contentDescriptionOffset': theme.spacing(0.25),
    '--Drawer-contentMinWidth': theme.spacing(30),
  }),
  ...(ownerState.size === 'md' && {
    '--Drawer-contentPadding': theme.spacing(2.5),
    '--Drawer-contentGap': theme.spacing(1.5),
    '--Drawer-contentTitleOffset': theme.spacing(0.25),
    '--Drawer-contentDescriptionOffset': theme.spacing(0.75),
    '--Drawer-contentMinWidth': theme.spacing(35),
  }),
  ...(ownerState.size === 'lg' && {
    '--Drawer-contentPadding': theme.spacing(3),
    '--Drawer-contentGap': theme.spacing(2),
    '--Drawer-contentTitleOffset': theme.spacing(0.5),
    '--Drawer-contentDescriptionOffset': theme.spacing(1),
    '--Drawer-contentMinWidth': theme.spacing(40),
  }),
  boxShadow: theme.shadow.md,
  ...theme.typography[`body-${ownerState.size!}`],
  padding: 'var(--Drawer-contentPadding)',
  minWidth:
    'min(calc(100vw - 2 * var(--Drawer-contentPadding)), var(--Drawer-contentMinWidth, 240px))',
  outline: 0,
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  boxSizing: 'border-box',
  overflow: 'auto',
  ...(ownerState.anchor === 'left' && {
    top: 0,
    left: 0,
    transform: ownerState.open ? 'translateX(0)' : 'translateX(-100%)',
  }),
  ...(ownerState.anchor === 'right' && {
    top: 0,
    right: 0,
    transform: ownerState.open ? 'translateX(0)' : 'translateX(100%)',
  }),
  ...(ownerState.anchor === 'top' && {
    top: 0,
    transform: ownerState.open ? 'translateY(0)' : 'translateY(-100%)',
  }),
  ...(ownerState.anchor === 'bottom' && {
    bottom: 0,
    transform: ownerState.open ? 'translateY(0)' : 'translateY(100%)',
  }),
  height: ownerState.anchor!.match(/(left|right)/) ? '100%' : 'auto',
  width: ownerState.anchor!.match(/(top|bottom)/) ? '100vw' : 'auto',
  transition: 'transform 0.3s ease',
}));

/**
 * The navigation drawers (or "sidebars") provide ergonomic access to destinations in a site or app functionality such as switching accounts.
 *
 * Demos:
 *
 * - [Drawer](https://mui.com/joy-ui/react-drawer/)
 *
 * API:
 *
 * - [Drawer API](https://mui.com/joy-ui/api/drawer/)
 */
const Drawer = React.forwardRef(function Drawer(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyDrawer',
  });

  const {
    children,
    anchor = 'left',
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    color: colorProp = 'neutral',
    variant = 'outlined',
    invertedColors = false,
    size = 'md',
    onClose,
    onKeyDown,
    open,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const ownerState = {
    ...props,
    anchor,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    color,
    variant,
    size,
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
    elementType: DrawerRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
  });

  const [SlotBackdrop, backdropProps] = useSlot('backdrop', {
    className: classes.backdrop,
    elementType: DrawerBackdrop,
    externalForwardedProps,
    getSlotProps: getBackdropProps,
    ownerState,
  });

  const [SlotContent, contentProps] = useSlot('content', {
    className: classes.content,
    elementType: DrawerContent,
    additionalProps: {
      tabIndex: -1,
    },
    externalForwardedProps,
    ownerState,
  });

  const result = (
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
            <SlotContent {...contentProps}>{children}</SlotContent>
          </FocusTrap>
        </SlotRoot>
      </Portal>
    </CloseModalContext.Provider>
  );

  if (invertedColors) {
    return <ColorInversionProvider variant={variant}>{result}</ColorInversionProvider>;
  }
  return result;
}) as OverridableComponent<DrawerTypeMap>;

Drawer.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * A single child content element.
   */
  children: PropTypes.element.isRequired,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
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
   * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
   * @default false
   */
  invertedColors: PropTypes.bool,
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
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    content: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Drawer;
