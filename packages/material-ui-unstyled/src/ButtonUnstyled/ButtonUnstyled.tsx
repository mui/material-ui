import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef } from '@material-ui/utils';
import composeClasses from '../composeClasses';
import { getButtonUnstyledUtilityClass } from './buttonUnstyledClasses';
import ButtonUnstyledProps, {
  ButtonUnstyledOwnProps,
  ButtonUnstyledTypeMap,
} from './ButtonUnstyledProps';
import useButton from './useButton';
import appendOwnerState from '../utils/appendOwnerState';

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
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [ButtonUnstyled API](https://material-ui.com/api/button-unstyled/)
 */
const ButtonUnstyled = React.forwardRef(function ButtonUnstyled<
  D extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent'],
>(props: ButtonUnstyledProps<D>, ref: React.ForwardedRef<any>) {
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
  const handleRef = useForkRef(buttonRef, ref);

  const { active, focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef?.current?.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    active,
    focusVisible,
  };

  const ButtonRoot: React.ElementType = component ?? components.Root ?? 'button';
  const buttonRootProps = appendOwnerState(
    ButtonRoot,
    { ...other, ...componentsProps.root },
    ownerState,
  );

  const classes = useUtilityClasses(ownerState);

  return (
    <ButtonRoot
      {...getRootProps()}
      {...buttonRootProps}
      className={clsx(classes.root, className, buttonRootProps.className)}
    >
      {children}
    </ButtonRoot>
  );
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
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
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
   * @ignore
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
} as any;

export default ButtonUnstyled;
