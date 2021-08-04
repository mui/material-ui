import * as React from 'react';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef } from '@material-ui/utils';
import composeClasses from '../composeClasses';
import { getButtonUnstyledUtilityClass } from './buttonUnstyledClasses';
import ButtonUnstyledProps, {
  ButtonUnstyledOwnProps,
  ButtonUnstyledTypeMap,
} from './ButtonUnstyledProps';
import useButton from './useButton';

const useUtilityClasses = (styleProps: ButtonUnstyledOwnProps & { focusVisible: boolean }) => {
  const { disabled, focusVisible } = styleProps;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  return composeClasses(slots, getButtonUnstyledUtilityClass, {});
};

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

  const ButtonRoot: React.ElementType = component ?? components.Root ?? 'button';
  const buttonRootProps = { ...other, ...componentsProps.root };

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

  const classes = useUtilityClasses(styleProps);

  return (
    <ButtonRoot
      className={clsx(classes.root, className)}
      {...button.getRootProps()}
      {...buttonRootProps}
    >
      {children}
    </ButtonRoot>
  );
});

export default ButtonUnstyled;
