import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import composeClasses from '../composeClasses';
import { getButtonUtilityClass } from './buttonClasses';
import { ButtonProps, ButtonOwnProps, ButtonTypeMap, ButtonRootSlotProps } from './Button.types';
import useButton from '../useButton';
import { WithOptionalOwnerState } from '../utils/types';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

export interface ButtonOwnerState extends ButtonOwnProps {
  focusVisible: boolean;
  active: boolean;
}

const useUtilityClasses = (ownerState: ButtonOwnerState) => {
  const { active, disabled, focusVisible } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active'],
  };

  return composeClasses(slots, useClassNamesOverride(getButtonUtilityClass));
};
/**
 * The foundation for building custom-styled buttons.
 *
 * Demos:
 *
 * - [Button](https://mui.com/base/react-button/)
 *
 * API:
 *
 * - [Button API](https://mui.com/base/react-button/components-api/#button)
 */
const Button = React.forwardRef(function Button<
  BaseComponentType extends React.ElementType = ButtonTypeMap['defaultComponent'],
>(props: ButtonProps<BaseComponentType>, forwardedRef: React.ForwardedRef<any>) {
  const {
    action,
    children,
    component,
    disabled,
    focusableWhenDisabled = false,
    onBlur,
    onClick,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseLeave,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

  const { active, focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    focusableWhenDisabled,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current!.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState: ButtonOwnerState = {
    ...props,
    active,
    focusableWhenDisabled,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  const defaultElement = other.href || other.to ? 'a' : 'button';
  const Root: React.ElementType = component ?? slots.root ?? defaultElement;
  const rootProps: WithOptionalOwnerState<ButtonRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  });

  return <Root {...rootProps}>{children}</Root>;
}) as OverridableComponent<ButtonTypeMap>;

Button.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * @ignore
   */
  href: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  to: PropTypes.string,
} as any;

export default Button;
