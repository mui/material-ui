import * as React from 'react';
import {
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@material-ui/utils';
import UseButtonProps from './UseButtonProps';
import mergeEventHandlers from '../utils/mergeEventHandlers';

type OtherEventHandler = () => void;

export default function useButton(props: UseButtonProps) {
  const {
    component,
    components = {},
    disabled = false,
    href,
    onFocusVisible,
    ref,
    tabIndex = 0,
    to,
    type,
  } = props;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

  const [active, setActive] = React.useState<boolean>(false);

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

  const handleMouseLeave = (event: React.MouseEvent, otherHandler: OtherEventHandler) => {
    if (focusVisible) {
      event.preventDefault();
    }

    otherHandler();
  };

  const handleBlur = (event: React.FocusEvent, otherHandler: OtherEventHandler) => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    otherHandler();
  };

  const dispatchClickEvent = (preventDefault: boolean) => {
    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    if (preventDefault) {
      clickEvent.preventDefault();
    }

    buttonRef.current?.dispatchEvent(clickEvent);
  };

  const handleFocus = useEventCallback(
    (event: React.FocusEvent<HTMLButtonElement>, otherHandler: OtherEventHandler) => {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!buttonRef.current) {
        buttonRef.current = event.currentTarget;
      }

      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);
        onFocusVisible?.(event);
      }

      otherHandler();
    },
  );

  const elementType = component ?? components.Root ?? 'button';

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return (
      elementType !== 'button' && !(button?.tagName === 'A' && (button as HTMLAnchorElement)?.href)
    );
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement>,
    otherHandler: OtherEventHandler,
  ) => {
    if (event.target === event.currentTarget && !disabled) {
      setActive(true);
    }

    otherHandler();
  };

  const handleMouseUp = (
    event: React.MouseEvent<HTMLButtonElement>,
    otherHandler: OtherEventHandler,
  ) => {
    if (event.target === event.currentTarget) {
      setActive(false);
    }

    otherHandler();
  };

  const handleKeyDown = useEventCallback(
    (event: React.KeyboardEvent, otherHandler: OtherEventHandler) => {
      if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
        event.preventDefault();
      }

      if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
        setActive(true);
      }

      otherHandler();

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        isNonNativeButton() &&
        event.key === 'Enter' &&
        !disabled
      ) {
        event.preventDefault();
        dispatchClickEvent(true);
      }
    },
  );

  const handleKeyUp = useEventCallback(
    (event: React.KeyboardEvent, otherHandler: OtherEventHandler) => {
      // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
      // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0

      if (event.target === event.currentTarget) {
        setActive(false);
      }

      otherHandler();

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        isNonNativeButton() &&
        event.key === ' ' &&
        !event.defaultPrevented
      ) {
        dispatchClickEvent(false);
      }
    },
  );

  const buttonProps: Record<string, unknown> = {};
  if (elementType === 'button') {
    buttonProps.type = type ?? 'button';
    buttonProps.disabled = disabled;
  } else {
    if (!href && !to) {
      buttonProps.role = 'button';
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  const ownEventHandlers = {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
  };

  const getRootProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    const mergedEventHandlers = mergeEventHandlers(
      ownEventHandlers,
      props as any,
      otherHandlers ?? {},
    );

    // onFocusVisible can ber present on the props, but since it's not a valid React event handler,
    // it must not be forwarded to the inner component.
    delete mergedEventHandlers.onFocusVisible;

    return {
      tabIndex: disabled ? -1 : tabIndex,
      type,
      ref: handleRef as React.Ref<any>,
      ...buttonProps,
      ...mergedEventHandlers,
    };
  };

  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active,
  };
}
