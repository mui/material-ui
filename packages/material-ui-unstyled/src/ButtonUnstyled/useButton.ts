import * as React from 'react';
import {
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@material-ui/utils';

export interface UseButtonProps {
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
  };
  disabled?: boolean;
  href?: string;
  onBlur?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onFocusVisible?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  ref: React.Ref<any>;
  tabIndex?: string | number;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

function isAnchor(el: HTMLElement | undefined): el is HTMLAnchorElement {
  return el?.tagName === 'A';
}

export default function useButton(props: UseButtonProps) {
  const {
    component,
    components = {},
    disabled = false,
    href,
    onClick,
    onBlur,
    onFocus,
    onMouseLeave,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    ref,
    tabIndex = 0,
    type,
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

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

  const elementType = component ?? components.Root ?? 'button';

  const isNotNativeButtonOrLink = () => {
    const button = buttonRef.current;
    return elementType !== 'button' && !(isAnchor(button) && button?.href);
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

    if (event.target === event.currentTarget && isNotNativeButtonOrLink() && event.key === ' ') {
      event.preventDefault();
    }

    onKeyDown?.(event);

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      isNotNativeButtonOrLink() &&
      event.key === 'Enter' &&
      !disabled
    ) {
      event.preventDefault();
      onClick?.(event as unknown as React.MouseEvent); // TODO: convert between event types properly
    }
  });

  const handleKeyUp = useEventCallback((event: React.KeyboardEvent) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (event.key === ' ' && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
    }

    onKeyUp?.(event);

    // Keyboard accessibility for non interactive elements
    if (
      onClick &&
      event.target === event.currentTarget &&
      isNotNativeButtonOrLink() &&
      event.key === ' ' &&
      !event.defaultPrevented
    ) {
      onClick(event as unknown as React.MouseEvent); // TODO: convert between event types properly
    }
  });

  const additionalProps: Record<string, unknown> = {};

  if (elementType === 'button') {
    additionalProps.type = type ?? 'button';
    additionalProps.disabled = disabled;
  } else {
    if (!href) {
      additionalProps.role = 'button';
      additionalProps.tabIndex = disabled ? -1 : tabIndex;
    }
    if (disabled) {
      additionalProps['aria-disabled'] = disabled;
    }
  }

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  return {
    getRootProps: () => ({
      ...additionalProps,
      onBlur: handleBlur,
      onClick,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onMouseLeave: handleMouseLeave,
      ref: handleRef as React.Ref<any>,
    }),
    focusVisible,
    setFocusVisible,
    disabled,
  };
}
