'use client';
import * as React from 'react';
import useEventCallback from '../utils/useEventCallback';

export interface UseButtonBaseParameters {
  /**
   * Whether the root should be treated as a native `<button>` for render-time semantics.
   */
  nativeButton: boolean;
  /**
   * The disabled state of the component.
   */
  disabled: boolean;
  /**
   * If `true`, calls `event.stopPropagation()` on click before the disabled guard runs.
   * @default false
   */
  stopEventPropagation?: boolean | undefined;
  /**
   * Additional keydown logic to run before the user's `onKeyDown`.
   */
  onBeforeKeyDown?: React.KeyboardEventHandler<any> | undefined;
  /**
   * Additional keyup logic to run before the user's `onKeyUp`.
   */
  onBeforeKeyUp?: React.KeyboardEventHandler<any> | undefined;
  /**
   * The primary click handler; only called when not disabled.
   */
  onClick?: React.MouseEventHandler<any> | undefined;
  /**
   * @ignore
   */
  onKeyDown?: React.KeyboardEventHandler<any> | undefined;
  /**
   * @ignore
   */
  onKeyUp?: React.KeyboardEventHandler<any> | undefined;
}

export interface UseButtonBaseReturnValue {
  eventHandlers: {
    onClick: React.MouseEventHandler<any>;
    onKeyDown: React.KeyboardEventHandler<any>;
    onKeyUp: React.KeyboardEventHandler<any>;
  };
  rootRef: React.RefObject<HTMLElement | null>;
}

export default function useButtonBase(
  parameters: UseButtonBaseParameters,
): UseButtonBaseReturnValue {
  const {
    nativeButton,
    disabled,
    stopEventPropagation = false,
    onBeforeKeyDown,
    onBeforeKeyUp,
    onClick,
    onKeyDown,
    onKeyUp,
  } = parameters;

  const rootRef = React.useRef<HTMLElement | null>(null);

  const isPseudoButton = () => {
    const root = rootRef.current;

    if (root == null) {
      return !nativeButton;
    }

    if (root.tagName === 'BUTTON') {
      return false;
    }

    return !(root.tagName === 'A' && (root as HTMLAnchorElement).href);
  };

  const handleClick: React.MouseEventHandler<any> = useEventCallback((event) => {
    if (stopEventPropagation) {
      event.stopPropagation();
    }

    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  });

  const handleKeyDown: React.KeyboardEventHandler<any> = useEventCallback((event) => {
    onBeforeKeyDown?.(event);
    onKeyDown?.(event);

    if (event.target !== event.currentTarget || !isPseudoButton()) {
      return;
    }

    if (event.key === ' ') {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter' && !disabled) {
      event.preventDefault();
      event.currentTarget.click();
    }
  });

  const handleKeyUp: React.KeyboardEventHandler<any> = useEventCallback((event) => {
    onBeforeKeyUp?.(event);
    onKeyUp?.(event);

    if (
      event.target === event.currentTarget &&
      isPseudoButton() &&
      event.key === ' ' &&
      !disabled &&
      !event.defaultPrevented
    ) {
      event.currentTarget.click();
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      const root = rootRef.current;

      if (root == null) {
        return;
      }

      const tagName = root.tagName.toLowerCase();
      const resolvesToNativeButton = tagName === 'button';

      if (nativeButton && !resolvesToNativeButton) {
        console.error(
          [
            'MUI: A component that acts as a button expected a native <button> because `nativeButton={true}`,',
            `but the resolved root is <${tagName}>.`,
            'Remove `nativeButton` or make the component render a <button> element.',
          ].join(' '),
        );
      }

      if (!nativeButton && resolvesToNativeButton) {
        console.error(
          [
            'MUI: A component that acts as a button expected a non-button host because `nativeButton={false}`,',
            'but the resolved root is <button>.',
            'Set `nativeButton` to true or make the component render a non-button element.',
          ].join(' '),
        );
      }
    });
  }

  return {
    eventHandlers: {
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    },
    rootRef,
  };
}
