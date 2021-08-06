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
  onMouseDown?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  ref: React.Ref<any>;
  tabIndex?: string | number;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

function isAnchor(el: HTMLElement | undefined): el is HTMLAnchorElement {
  return el?.tagName === 'A';
}

function isNativeButton(el: HTMLElement | undefined): el is HTMLButtonElement {
  return (
    el?.tagName === 'BUTTON' ||
    (el?.tagName === 'INPUT' &&
      ['button', 'reset', 'submit'].includes((el as HTMLInputElement).type))
  );
}

export default function useButton(props: UseButtonProps) {
  const {
    component,
    components = {},
    disabled = false,
    href,
    onBlur,
    onClick,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    ref,
    tabIndex = 0,
    type,
  } = props;

  const buttonRef = React.useRef<
    HTMLButtonElement | HTMLAnchorElement | HTMLInputElement | HTMLElement
  >();

  //
  const [isActive, setActive] = React.useState<boolean>(false);

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

  const dispatchClickEvent = () => {
    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    buttonRef.current?.dispatchEvent(clickEvent);
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
    return !isNativeButton(button) && !(isAnchor(button) && button?.href);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target === event.currentTarget) {
      setActive(true);
    }

    onMouseDown?.(event);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target === event.currentTarget) {
      setActive(false);
    }

    onMouseUp?.(event);
  };

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (event.target === event.currentTarget && isNotNativeButtonOrLink() && event.key === ' ') {
      event.preventDefault();
    }

    onKeyDown?.(event);

    if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
      setActive(true);
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      isNotNativeButtonOrLink() &&
      event.key === 'Enter' &&
      !disabled
    ) {
      event.preventDefault();
      dispatchClickEvent();
    }
  });

  const handleKeyUp = useEventCallback((event: React.KeyboardEvent) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0

    onKeyUp?.(event);

    if (event.target === event.currentTarget) {
      setActive(false);
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      isNotNativeButtonOrLink() &&
      event.key === ' ' &&
      !event.defaultPrevented
    ) {
      dispatchClickEvent();
    }
  });

  const buttonProps: Record<string, unknown> = {};
  if (elementType === 'button') {
    buttonProps.type = type ?? 'button';
    buttonProps.disabled = disabled;
  } else {
    if (!href) {
      buttonProps.role = 'button';
      buttonProps.tabIndex = disabled ? -1 : tabIndex;
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  return {
    getRootProps: () => ({
      ...buttonProps,
      onBlur: handleBlur,
      onClick,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseLeave,
      onMouseUp: handleMouseUp,
      ref: handleRef as React.Ref<any>,
    }),
    focusVisible,
    setFocusVisible,
    disabled,
    active: isActive,
  };
}
