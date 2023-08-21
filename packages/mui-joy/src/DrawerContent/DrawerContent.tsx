'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { styled, useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import { SheetRoot } from '../Sheet/Sheet';
import { getDrawerContentUtilityClass } from './drawerContentClasses';
import {
  DrawerContentProps,
  DrawerContentOwnerState,
  DrawerContentTypeMap,
} from './DrawerContentProps';
import DrawerContentSizeContext from './DrawerContentSizeContext';
import DrawerContentVariantColorContext from './DrawerContentVariantColorContext';
import useSlot from '../utils/useSlot';
import DrawerOpenContext from '../Drawer/DrawerOpenContext';
import DrawerAnchorContext from '../Drawer/DrawerAnchorContext';

const useUtilityClasses = (ownerState: DrawerContentOwnerState) => {
  const { variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getDrawerContentUtilityClass, {});
};

const DrawerContentRoot = styled(SheetRoot, {
  name: 'JoyDrawerContent',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DrawerContentOwnerState }>(({ theme, ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    '--DrawerContent-padding': theme.spacing(2),
    '--DrawerContent-radius': theme.vars.radius.sm,
    '--DrawerContent-gap': theme.spacing(0.75),
    '--DrawerContent-titleOffset': theme.spacing(0.25),
    '--DrawerContent-descriptionOffset': theme.spacing(0.25),
    '--ModalClose-inset': theme.spacing(1.25),
  }),
  ...(ownerState.size === 'md' && {
    '--DrawerContent-padding': theme.spacing(2.5),
    '--DrawerContent-radius': theme.vars.radius.md,
    '--DrawerContent-gap': theme.spacing(1.5),
    '--DrawerContent-titleOffset': theme.spacing(0.25),
    '--DrawerContent-descriptionOffset': theme.spacing(0.75),
    '--ModalClose-inset': theme.spacing(1.5),
  }),
  ...(ownerState.size === 'lg' && {
    '--DrawerContent-padding': theme.spacing(3),
    '--DrawerContent-radius': theme.vars.radius.md,
    '--DrawerContent-gap': theme.spacing(2),
    '--DrawerContent-titleOffset': theme.spacing(0.5),
    '--DrawerContent-descriptionOffset': theme.spacing(1),
    '--ModalClose-inset': theme.spacing(1.5),
  }),
  boxShadow: theme.shadow.md,
  borderRadius: 'var(--DrawerContent-radius)',
  fontFamily: theme.vars.fontFamily.body,
  lineHeight: theme.vars.lineHeight.md,
  padding: 'var(--DrawerContent-padding)',
  minWidth:
    'min(calc(100vw - 2 * var(--DrawerContent-padding)), var(--DrawerContent-minWidth, 240px))',
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
 *
 * Demos:
 *
 * - [Drawer](https://mui.com/joy-ui/react-drawer/)
 *
 * API:
 *
 * - [DrawerContent API](https://mui.com/joy-ui/api/drawer-content/)
 */
const DrawerContent = React.forwardRef(function DrawerContent(inProps, ref) {
  const props = useThemeProps<typeof inProps & DrawerContentProps>({
    props: inProps,
    name: 'JoyDrawerContent',
  });

  const {
    className,
    children,
    color: colorProp = 'neutral',
    component = 'div',
    variant = 'outlined',
    size = 'md',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const anchor = React.useContext(DrawerAnchorContext);
  const open = React.useContext(DrawerOpenContext);

  const ownerState = {
    ...props,
    anchor,
    open,
    color,
    component,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const contextValue = React.useMemo(
    () => ({ variant, color: color === 'context' ? undefined : color }),
    [color, variant],
  );

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: DrawerContentRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: { as: component },
  });

  return (
    <DrawerContentSizeContext.Provider value={size}>
      <DrawerContentVariantColorContext.Provider value={contextValue}>
        <SlotRoot {...rootProps}>{children}</SlotRoot>
      </DrawerContentVariantColorContext.Provider>
    </DrawerContentSizeContext.Provider>
  );
}) as OverridableComponent<DrawerContentTypeMap>;

DrawerContent.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
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

export default DrawerContent;
