import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import composeClasses from '../composeClasses';
import { getButtonUnstyledUtilityClass } from './buttonUnstyledClasses';
import {
  ButtonUnstyledProps,
  ButtonUnstyledOwnProps,
  ButtonUnstyledTypeMap,
  ButtonUnstyledRootSlotProps,
} from './ButtonUnstyled.types';
import useButton from './useButton';
import appendOwnerState from '../utils/appendOwnerState';
import { WithOptionalOwnerState } from '../utils/types';

export interface ButtonUnstyledOwnerState extends ButtonUnstyledOwnProps {
  focusVisible: boolean;
  active: boolean;
}

const useUtilityClasses = (ownerState: ButtonUnstyledOwnerState) => {
  const { active, disabled, focusVisible } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active'],
  };

  return composeClasses(slots, getButtonUnstyledUtilityClass, {});
};
/**
 * The foundation for building custom-styled buttons.
 *
 * Demos:
 *
 * - [Buttons](https://mui.com/components/buttons/)
 *
 * API:
 *
 * - [ButtonUnstyled API](https://mui.com/api/button-unstyled/)
 */
const ButtonUnstyled = React.forwardRef(function ButtonUnstyled<
  D extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent'],
>(props: ButtonUnstyledProps<D>, forwardedRef: React.ForwardedRef<any>) {
  const {
    className,
    component,
    components = {},
    componentsProps = {},
    children,
    disabled,
    action,
    onBlur,
    onClick,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseLeave,
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();
  const handleRef = useForkRef(buttonRef, forwardedRef);

  const ButtonRoot: React.ElementType = component ?? components.Root ?? 'button';

  const { active, focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    component: ButtonRoot,
    ref: handleRef,
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

  const ownerState: ButtonUnstyledOwnerState = {
    ...props,
    active,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  const buttonRootProps: WithOptionalOwnerState<ButtonUnstyledRootSlotProps> = appendOwnerState(
    ButtonRoot,
    {
      ...getRootProps(),
      ...other,
      ...componentsProps.root,
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  );

  return <ButtonRoot {...buttonRootProps}>{children}</ButtonRoot>;
});

ButtonUnstyled.propTypes /* remove-proptypes */ = {
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
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * @default 'button'
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
} as any;

export default ButtonUnstyled;
