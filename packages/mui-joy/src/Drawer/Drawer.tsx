'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import Modal, { modalClasses } from '../Modal';
import Sheet from '@mui/joy/Sheet';
import { useThemeProps, Theme } from '../styles';
import styled from '../styles/styled';
import { getDrawerUtilityClass } from './drawerClasses';
import { DrawerProps, DrawerOwnerState, DrawerTypeMap } from './DrawerProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: DrawerOwnerState) => {
  const { variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
    sheet: ['sheet'],
  };

  return composeClasses(slots, getDrawerUtilityClass, {});
};

const DrawerRoot = styled(Modal, {
  name: 'JoyDrawer',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
  // Propagate all props to the underlaying Modal
  shouldForwardProp: () => true,
})<{ ownerState: DrawerOwnerState }>(({ ownerState }) => {
  return [
    {
      transitionProperty: 'visibility',
      transitionDelay: ownerState.open ? '0s' : '300ms',
      [`& .${modalClasses.backdrop}`]: {
        opacity: ownerState.open ? 1 : 0,
        transition: 'opacity 0.3s ease',
      },
    },
  ];
});

const DrawerSheet = styled(Sheet, {
  name: 'JoyDrawer',
  slot: 'Sheet',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DrawerOwnerState }>(({ ownerState }) => {
  return {
    boxSizing: 'border-box',
    position: 'fixed',
    overflow: 'auto',
    ...(ownerState.anchor === 'left' && {
      left: 0,
      transform: ownerState.open ? 'translateX(0)' : 'translateX(-100%)',
    }),
    ...(ownerState.anchor === 'right' && {
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
    height: ownerState.anchor!.match(/(left|right)/) ? '100%' : 'clamp(256px, 30vw, 378px)',
    width: ownerState.anchor!.match(/(top|bottom)/) ? '100vw' : 'clamp(256px, 30vw, 378px)',
    transition: 'transform 0.3s ease',
  };
});

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

export function isHorizontal(anchor: DrawerProps['anchor']) {
  return ['left', 'right'].indexOf(anchor!) !== -1;
}

export function getAnchor(theme: Theme, anchor: DrawerProps['anchor']) {
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
 * - [Drawer API](https://mui.com/joy-ui/api/drawer/)
 * - inherits [Modal API](https://mui.com/joy-ui/api/modal/)
 */
const Drawer = React.forwardRef(function Drawer(inProps, ref) {
  const props = useThemeProps<typeof inProps & DrawerProps>({ props: inProps, name: 'JoyDrawer' });
  const {
    children,
    className,
    anchor: anchorProp = 'left',
    open = false,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const anchor = anchorProp;

  const ownerState: DrawerOwnerState = {
    ...props,
    anchor,
    open,
  };

  const classes = useUtilityClasses(ownerState);

  const { sheet: sheetSlots, ...modalSlots } = slots;
  const { sheet: sheetSlotProps, ...modalSlotProps } = slotProps;
  const externalForwardedProps = {
    ...other,
    component,
    slots: { sheet: sheetSlots },
    slotProps: { sheet: sheetSlotProps },
  };

  const [SlotSheet, sheetProps] = useSlot('sheet', {
    className: classes.sheet,
    elementType: DrawerSheet,
    externalForwardedProps,
    ownerState,
  });

  return (
    <DrawerRoot
      ref={ref as React.ForwardedRef<HTMLDivElement>}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      open={open}
      keepMounted
      component={component}
      slots={modalSlots}
      // @ts-ignore ownerState is propagated to the Modal component
      slotProps={modalSlotProps}
      {...other}
    >
      <SlotSheet {...sheetProps}>{children}</SlotSheet>
    </DrawerRoot>
  );
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
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    sheet: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
    sheet: PropTypes.elementType,
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

export default Drawer;
