'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType, unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { DrawerContent } from '../Drawer/Drawer';
import { useThemeProps, Theme, styled, useColorInversion } from '../styles';
import { getPermanentDrawerUtilityClass } from './permanentDrawerClasses';
import {
  PermanentDrawerProps,
  PermanentDrawerOwnerState,
  PermanentDrawerTypeMap,
} from './PermanentDrawerProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: PermanentDrawerOwnerState) => {
  const { variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    content: ['content'],
  };

  return composeClasses(slots, getPermanentDrawerUtilityClass, {});
};

const PermanentDrawerRoot = styled('div', {
  name: 'JoyPermanentDrawer',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.docked,
})({
  flex: '0 0 auto',
});

const PermanentDrawerContent = styled(DrawerContent as unknown as 'div', {
  name: 'JoyPermanentDrawer',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.backdrop,
})({});

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

export function isHorizontal(anchor: PermanentDrawerProps['anchor']) {
  return ['left', 'right'].indexOf(anchor!) !== -1;
}

export function getAnchor(theme: Theme, anchor: PermanentDrawerProps['anchor']) {
  // @ts-ignore TODO: How is the direction set in Joy UI?
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

/**
 * The navigation drawers (or "sidebars") provide ergonomic access to destinations in a site or app functionality such as switching accounts.
 *
 * Demos:
 *
 * - [Drawer](https://mui.com/joy-ui/react-drawer/)
 *
 * API:
 *
 * - [PermanentDrawer API](https://mui.com/joy-ui/api/permanent-drawer/)
 */
const Drawer = React.forwardRef(function Drawer(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyDrawer',
  });

  const {
    children,
    anchor = 'left',
    component,
    slots = {},
    slotProps = {},
    color: colorProp = 'neutral',
    variant = 'outlined',
    size = 'md',
    ...other
  } = props;

  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const ownerState: PermanentDrawerOwnerState = {
    ...props,
    open: true,
    anchor,
    color,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: PermanentDrawerRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotContent, contentProps] = useSlot('content', {
    className: classes.content,
    elementType: PermanentDrawerContent,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <SlotContent {...contentProps}>{children}</SlotContent>
    </SlotRoot>
  );
}) as OverridableComponent<PermanentDrawerTypeMap>;

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
} as any;

export default Drawer;
