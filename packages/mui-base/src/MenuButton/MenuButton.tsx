'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuButtonOwnerState, MenuButtonProps } from './MenuButton.types';
import { useSlotProps } from '../utils';
import { useMenuButton } from '../useMenuButton';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getMenuButtonUtilityClass } from './menuButtonClasses';

const useUtilityClasses = (ownerState: MenuButtonOwnerState) => {
  const { active, disabled, open } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', active && 'active', open && 'expanded'],
  };

  return composeClasses(slots, useClassNamesOverride(getMenuButtonUtilityClass));
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
    disabled = false,
    label,
    slots = {},
    slotProps = {},
    focusableWhenDisabled = false,
    ...other
  } = props;

  const { getRootProps, open, active } = useMenuButton({
    disabled,
    focusableWhenDisabled,
    rootRef: forwardedRef,
  });

  const ownerState: MenuButtonOwnerState = {
    ...props,
    open,
    active,
    disabled,
    focusableWhenDisabled,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root || 'button';
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
      type: 'button',
    },
    ownerState,
    className: classes.root,
  });

  return <Root {...rootProps}>{children}</Root>;
});

MenuButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: PropTypes.bool,
  /**
   * Label of the button
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
   * The props used for each slot inside the MenuButton.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
} as any;

export { MenuButton };
