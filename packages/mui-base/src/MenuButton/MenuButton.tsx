import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuButtonProps } from './MenuButton.types';
import { useSlotProps } from '../utils';
import useMenuButton from '../useMenuButton';
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
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { children, label, slots = {}, slotProps = {}, ...other } = props;

  const { getRootProps, open } = useMenuButton();

  const Root = slots.root || 'button';
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref,
    },
    ownerState: { ...props, open },
  });

  return <Root {...rootProps}>{children}</Root>;
});

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
   * Label of the button
   */
  label: PropTypes.string,
  /**
   * The components used for each slot inside the MenuButton.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * The props used for each slot inside the MenuButton.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
} as any;

export default MenuButton;
