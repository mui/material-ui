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
    href,
    tabIndex = 0,
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();
  const handleRef = useForkRef(buttonRef, ref);

  const ButtonRoot: React.ElementType = components.Root ?? 'button';
  const buttonRootProps = { ...other, ...componentsProps.root };

  const button = useButton({
    ...props,
    ref: handleRef,
    tabIndex,
    elementType: ButtonRoot,
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

  /*
  if (ButtonRoot === 'button') {
    const nativeButtonProps = buttonRootProps as React.ComponentPropsWithRef<'button'>;
    nativeButtonProps.type = type ?? 'button';
    nativeButtonProps.disabled = disabled;
  } else {
    if (!href) {
      (buttonRootProps as Record<string, any>).role = 'button'; // TODO: improve this so ugly casting is not necessary
    }
    if (disabled) {
      (buttonRootProps as Record<string, any>)['aria-disabled'] = disabled; // TODO: as above
    }
  }
  */

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
      {...other}
    >
      {children}
    </ButtonRoot>
  );
});

export default ButtonUnstyled;
