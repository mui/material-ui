import * as React from 'react';
import {
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@material-ui/utils';

type OtherEventHandler = () => void;

export interface UseButtonProps extends UseButtonEventHandlers {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   * @default 'button'
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  href?: string;
  ref: React.Ref<any>;
  tabIndex?: number;
  to?: string;
  /**
   * Type attribute applied when the `component` is `button`.
   * @default 'button'
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

interface UseButtonEventHandlers {
  onBlur?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onFocusVisible?: React.FocusEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  onMouseDown?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
}

function deduplicateArray<T>(array: Array<T>): Array<T> {
  const set = new Set(array);
  return Array.from(set);
}

function extractEventHandlers(obj: Record<string, any>, ignoreKeys?: string[]) {
  if (obj == null) {
    return {};
  }

  return Object.keys(obj)
    .filter(
      (prop) =>
        prop.match(/^on[A-Z]/) && typeof obj[prop] === 'function' && !ignoreKeys?.includes(prop),
    )
    .reduce((acc, prop) => {
      acc[prop] = obj[prop];
      return acc;
    }, {} as Record<string, React.EventHandler<any>>);
}

function chainEventHandlers(
  ownHandlers: Record<string, (event: any, otherHandler: () => void) => void>,
  externalProps: Record<string, unknown>,
  props: Record<string, unknown>,
) {
  const externalHandlers = extractEventHandlers(externalProps, ['onFocusVisible']);
  const handlersFromProps = extractEventHandlers(props, ['onFocusVisible']);

  const allHandlersKeys = deduplicateArray([
    ...Object.keys(externalHandlers),
    ...Object.keys(handlersFromProps),
    ...Object.keys(ownHandlers),
  ]);

  return [...allHandlersKeys]
    .map((key: string) => {
      return {
        key,
        handler: (e: React.EventHandler<any>) => {
          if (ownHandlers[key]) {
            ownHandlers[key](e, () => {
              externalHandlers[key]?.(e);
              handlersFromProps[key]?.(e);
            });
          } else {
            externalHandlers[key]?.(e);
            handlersFromProps[key]?.(e);
          }
        },
      };
    })
    .reduce((acc, { key, handler }) => {
      acc[key] = handler;
      return acc;
    }, {} as Record<string, React.EventHandler<any>>);
}

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
    if (event.target === event.currentTarget) {
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

  const getRootProps = (otherHandlers?: Record<string, unknown>) => ({
    tabIndex: disabled ? -1 : tabIndex,
    type,
    ref: handleRef as React.Ref<any>,
    ...buttonProps,
    ...chainEventHandlers(ownEventHandlers, otherHandlers ?? {}, props as any),
  });

  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active: isActive,
  };
}
