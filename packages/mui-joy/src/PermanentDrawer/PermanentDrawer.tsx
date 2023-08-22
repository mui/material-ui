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
const PermanentDrawer = React.forwardRef(function PermanentDrawer(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyPermanentDrawer',
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

PermanentDrawer.propTypes /* remove-proptypes */ = {
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
   * @ignore
   */
  children: PropTypes.node,
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
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    content: PropTypes.elementType,
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
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default PermanentDrawer;
