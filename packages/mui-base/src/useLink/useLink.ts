'use client';
import * as React from 'react';
import {
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@mui/utils';
import { UseLinkParameters, UseLinkReturnValue, UseLinkRootSlotProps } from './useLink.types';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useRootElementName } from '../utils/useRootElementName';
import { EventHandlers } from '../utils/types';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
/**
 *
 * API:
 *
 * - [useLink API](https://mui.com/base-ui/api/use-link/)
 */
export function useLink(parameters: UseLinkParameters = {}): UseLinkReturnValue {
  const {
    disabled = false,
    focusableWhenDisabled,
    href,
    rootRef: externalRef,
    tabIndex,
    to,
    rootElementName: rootElementNameProp = 'a',
  } = parameters;
  const linkRef = React.useRef<HTMLLinkElement | HTMLAnchorElement | HTMLElement>();

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

  const [rootElementName, updateRootElementName] = useRootElementName({
    rootElementName: rootElementNameProp,
    componentName: 'Link',
  });

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
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLLinkElement>) => {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!linkRef.current) {
        linkRef.current = event.currentTarget;
      }

      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);
        otherHandlers.onFocusVisible?.(event);
      }

      otherHandlers.onFocus?.(event);
    };

  const isNativeLink = () => {
    const link = linkRef.current;

    return rootElementName === 'A' && (link as HTMLAnchorElement)?.href;
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

      if (event.target === event.currentTarget && !isNativeLink() && event.key === ' ') {
        event.preventDefault();
      }

      if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
        setActive(true);
      }

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        !isNativeLink() &&
        event.key === 'Enter' &&
        !disabled
      ) {
        otherHandlers.onClick?.(event);
        event.preventDefault();
      }
    };

  const createHandleKeyUp =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      // calling preventDefault in keyUp on a <link> will not dispatch a click event if Space is pressed
      // https://codesandbox.io/p/sandbox/link-keyup-preventdefault-tgr8f6

      if (event.target === event.currentTarget) {
        setActive(false);
      }

      otherHandlers.onKeyUp?.(event);

      // Keyboard accessibility for non interactive elements
      if (
        event.target === event.currentTarget &&
        !isNativeLink() &&
        !disabled &&
        event.key === ' ' &&
        !event.defaultMuiPrevented
      ) {
        otherHandlers.onClick?.(event);
      }
    };

  const handleRef = useForkRef(updateRootElementName, externalRef, focusVisibleRef, linkRef);

  interface AdditionalLinkProps {
    type?: React.LinkHTMLAttributes<HTMLLinkElement>['type'];
    disabled?: boolean;
    role?: React.AriaRole;
    'aria-disabled'?: React.AriaAttributes['aria-disabled'];
    tabIndex?: number;
  }

  const linkProps: AdditionalLinkProps = {};

  if (tabIndex !== undefined) {
    linkProps.tabIndex = tabIndex;
  }

  if (rootElementName !== 'A') {
    if (!href && !to) {
      linkProps.role = 'link';
    }
  }
  if (disabled) {
    linkProps['aria-disabled'] = disabled as boolean;
    linkProps.tabIndex = focusableWhenDisabled ? tabIndex ?? 0 : -1;
  }

  const getRootProps = <ExternalProps extends Record<string, any> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseLinkRootSlotProps<ExternalProps> => {
    const externalEventHandlers = {
      ...extractEventHandlers(parameters),
      ...extractEventHandlers(externalProps),
    };

    const props = {
      ...externalEventHandlers,
      ...linkProps,
      ...externalProps,
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
