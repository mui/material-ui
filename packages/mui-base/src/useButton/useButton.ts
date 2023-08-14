'use client';
import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@mui/utils';
import {
  UseButtonParameters,
  UseButtonReturnValue,
  UseButtonRootSlotProps,
} from './useButton.types';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { EventHandlers } from '../utils/types';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
/**
 *
 * Demos:
 *
 * - [Button](https://mui.com/base-ui/react-button/#hook)
 *
 * API:
 *
 * - [useButton API](https://mui.com/base-ui/react-button/hooks-api/#use-button)
 */
export function useButton(parameters: UseButtonParameters = {}): UseButtonReturnValue {
  const {
    disabled = false,
    focusableWhenDisabled,
    href,
    rootRef: externalRef,
    tabIndex,
    to,
    type,
  } = parameters;
  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

  const [active, setActive] = React.useState<boolean>(false);

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);

  const [hostElementName, setHostElementName] = React.useState<string>('');

  const createHandleMouseLeave = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    if (focusVisible) {
      event.preventDefault();
    }

    otherHandlers.onMouseLeave?.(event);
  };

  const createHandleBlur = (otherHandlers: EventHandlers) => (event: React.FocusEvent) => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    otherHandlers.onBlur?.(event);
  };

  const createHandleFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLButtonElement>) => {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!buttonRef.current) {
        buttonRef.current = event.currentTarget;
      }

      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);
        otherHandlers.onFocusVisible?.(event);
      }

      otherHandlers.onFocus?.(event);
    };

  const isNativeButton = () => {
    const button = buttonRef.current;

    return (
      hostElementName === 'BUTTON' ||
      (hostElementName === 'INPUT' &&
        ['button', 'submit', 'reset'].includes((button as HTMLInputElement)?.type)) ||
      (hostElementName === 'A' && (button as HTMLAnchorElement)?.href)
    );
  };

  const createHandleClick = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    if (!disabled) {
      otherHandlers.onClick?.(event);
    }
  };

  const createHandleMouseDown = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    if (!disabled) {
      setActive(true);
      document.addEventListener(
        'mouseup',
        () => {
          setActive(false);
        },
        { once: true },
      );
    }

    otherHandlers.onMouseDown?.(event);
  };

  const createHandleKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);

      if (event.defaultMuiPrevented) {
        return;
      }

      if (event.target === event.currentTarget && !isNativeButton() && event.key === ' ') {
        event.preventDefault();
      }

      if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
        setActive(true);
      }

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        !isNativeButton() &&
        event.key === 'Enter' &&
        !disabled
      ) {
        otherHandlers.onClick?.(event);
        event.preventDefault();
      }
    };

  const createHandleKeyUp =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
      // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0

      if (event.target === event.currentTarget) {
        setActive(false);
      }

      otherHandlers.onKeyUp?.(event);

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        !isNativeButton() &&
        !disabled &&
        event.key === ' ' &&
        !event.defaultMuiPrevented
      ) {
        otherHandlers.onClick?.(event);
      }
    };

  const updateHostElementName = React.useCallback((instance: HTMLElement | null) => {
    setHostElementName(instance?.tagName ?? '');
  }, []);

  const handleRef = useForkRef(updateHostElementName, externalRef, focusVisibleRef, buttonRef);

  interface AdditionalButtonProps {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled?: boolean;
    role?: React.AriaRole;
    'aria-disabled'?: React.AriaAttributes['aria-disabled'];
    tabIndex?: number;
  }

  const buttonProps: AdditionalButtonProps = {};

  if (tabIndex !== undefined) {
    buttonProps.tabIndex = tabIndex;
  }

  if (hostElementName === 'BUTTON') {
    buttonProps.type = type ?? 'button';
    if (focusableWhenDisabled) {
      buttonProps['aria-disabled'] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (hostElementName !== '') {
    if (!href && !to) {
      buttonProps.role = 'button';
      buttonProps.tabIndex = tabIndex ?? 0;
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled as boolean;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex ?? 0 : -1;
    }
  }

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseButtonRootSlotProps<TOther> => {
    const propsEventHandlers = extractEventHandlers(parameters) as Partial<UseButtonParameters>;
    const externalEventHandlers = {
      ...propsEventHandlers,
      ...otherHandlers,
    };

    const props = {
      type,
      ...externalEventHandlers,
      ...buttonProps,
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      ref: handleRef,
    };

    // onFocusVisible can be present on the props or parameters,
    // but it's not a valid React event handler so it must not be forwarded to the inner component.
    // If present, it will be handled by the focus handler.
    delete props.onFocusVisible;

    return props;
  };

  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    active,
    rootRef: handleRef,
  };
}
