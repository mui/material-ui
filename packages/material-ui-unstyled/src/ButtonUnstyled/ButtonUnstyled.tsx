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
import appendStyleProps from '../utils/appendStyleProps';

const useUtilityClasses = (styleProps: ButtonUnstyledOwnProps & { focusVisible: boolean }) => {
  const { disabled, focusVisible } = styleProps;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  return composeClasses(slots, getButtonUnstyledUtilityClass, {});
};
/**
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

  const button = useButton({
    ...props,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        button.setFocusVisible(true);
        buttonRef?.current?.focus();
      },
    }),
    [button],
  );

  const styleProps = {
    ...props,
    focusVisible: button.focusVisible,
  };

  const ButtonRoot: React.ElementType = component ?? components.Root ?? 'button';
  const buttonRootProps = appendStyleProps(
    ButtonRoot,
    { ...other, ...componentsProps.root },
    styleProps,
  );

  const classes = useUtilityClasses(styleProps);

  return (
    <ButtonRoot
      {...button.getRootProps()}
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
   * @ignore
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
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * @ignore
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.object,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
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
} as any;

export default ButtonUnstyled;
