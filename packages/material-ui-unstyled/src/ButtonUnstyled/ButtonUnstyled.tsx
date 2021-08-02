import * as React from 'react';
import clsx from 'clsx';
import {
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@material-ui/utils';
import composeClasses from '../composeClasses';
import { getButtonUnstyledUtilityClass } from './buttonUnstyledClasses';
import ButtonUnstyledProps, {
  ButtonUnstyledOwnProps,
  ButtonUnstyledTypeMap,
} from './ButtonUnstyledProps';

const useUtilityClasses = (styleProps: ButtonUnstyledOwnProps & { focusVisible: boolean }) => {
  const { disabled, focusVisible } = styleProps;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  return composeClasses(slots, getButtonUnstyledUtilityClass, {});
};

function isAnchor(el: HTMLElement | undefined): el is HTMLAnchorElement {
  return el?.tagName === 'A';
}

const ButtonUnstyled = React.forwardRef(function ButtonUnstyled<
  D extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent'],
>(props: ButtonUnstyledProps<D>, ref: React.ForwardedRef<any>) {
  const {
    className,
    components = {},
    componentsProps,
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
    type,
    href,
    tabIndex = 0,
    ...otherProps
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

  const ButtonRoot: React.ElementType = components.Root ?? 'button';
  const buttonRootProps = componentsProps?.root ?? {};

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef?.current?.focus();
      },
    }),
    [],
  );

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (focusVisible) {
      event.preventDefault();
    }

    onMouseLeave?.(event);
  };

  const handleBlur = (event: React.FocusEvent) => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    onBlur?.(event);
  };

  const handleFocus = useEventCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }

    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible?.(event);
    }

    if (onFocus) {
      onFocus(event);
    }
  });

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return ButtonRoot && ButtonRoot !== 'button' && !(isAnchor(button) && button?.href);
  };

  /**
   * IE11 shim for https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
   */
  const keydownRef = React.useRef(false);
  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (!keydownRef.current && focusVisible && event.key === ' ') {
      keydownRef.current = true;
    }

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      isNonNativeButton() &&
      event.key === 'Enter' &&
      !disabled
    ) {
      event.preventDefault();
      if (onClick) {
        onClick(event as unknown as React.MouseEvent); // TODO: convert between event types properly
      }
    }
  });

  const handleKeyUp = useEventCallback((event: React.KeyboardEvent) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (event.key === ' ' && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
    }
    if (onKeyUp) {
      onKeyUp(event);
    }

    // Keyboard accessibility for non interactive elements
    if (
      onClick &&
      event.target === event.currentTarget &&
      isNonNativeButton() &&
      event.key === ' ' &&
      !event.defaultPrevented
    ) {
      onClick(event as unknown as React.MouseEvent); // TODO: convert between event types properly
    }
  });

  if (ButtonRoot === 'button') {
    const trueButtonProps = buttonRootProps as React.ComponentPropsWithRef<'button'>;
    trueButtonProps.type = type === undefined ? 'button' : type;
    trueButtonProps.disabled = disabled;
  } else {
    if (!href) {
      (buttonRootProps as Record<string, any>).role = 'button'; // TODO: improve this so ugly casting is not necessary
    }
    if (disabled) {
      (buttonRootProps as Record<string, any>)['aria-disabled'] = disabled; // TODO: as above
    }
  }

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  const styleProps = {
    ...props,
    focusVisible,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <ButtonRoot
      className={clsx(classes.root, className)}
      onBlur={handleBlur}
      onClick={onClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseLeave={handleMouseLeave}
      ref={handleRef}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
      {...buttonRootProps}
      {...otherProps}
    >
      {children}
    </ButtonRoot>
  );
});

export default ButtonUnstyled;
