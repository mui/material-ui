import * as React from 'react';
import PropTypes from 'prop-types';
import useMenuButton from '@mui/base/useMenuButton';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/base/composeClasses';
import { OverridableComponent } from '@mui/types';
import { MenuButtonProps, MenuButtonOwnerState, MenuButtonTypeMap } from './MenuButtonProps';
import { getMenuButtonUtilityClass } from './menuButtonClasses';
import Button from '../Button';

const useUtilityClasses = (ownerState: MenuButtonOwnerState) => {
  const { active, disabled } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', active && 'active'],
  };

  return composeClasses(slots, getMenuButtonUtilityClass);
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [MenuButton API](https://mui.com/base-ui/react-menu/components-api/#menu-button)
 */
const MenuButton = React.forwardRef(function MenuButton(
  props: MenuButtonProps,
  forwardedRef: React.ForwardedRef<HTMLElement>,
) {
  const {
    children,
    color,
    label,
    slots = {},
    slotProps = {},
    size,
    focusableWhenDisabled = false,
    variant,
    ...other
  } = props;

  const { getRootProps, open, active } = useMenuButton({ rootRef: forwardedRef });

  const ownerState: MenuButtonOwnerState = {
    ...props,
    open,
    active,
    focusableWhenDisabled,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root || Button;
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
      color,
      size,
      variant,
    },
    ownerState,
    className: classes.root,
  });

  return <Root {...rootProps}>{children}</Root>;
}) as OverridableComponent<MenuButtonTypeMap>;

MenuButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: PropTypes.bool,
  /**
   * @ignore
   */
  label: PropTypes.string,
  /**
   * The components used for each slot inside the MenuButton.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * @ignore
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
} as any;

export default MenuButton;
