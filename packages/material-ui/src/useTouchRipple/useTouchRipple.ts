import * as React from 'react';
import { TouchRippleActions } from '../ButtonBase/TouchRipple';
import { useEventCallback } from '../utils';

interface UseTouchRippleProps {
  disabled: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  disableTouchRipple?: boolean;
  focusVisible: boolean;
  rippleRef: React.RefObject<TouchRippleActions>;
}

interface RippleEventHandlers {
  onBlur: React.FocusEventHandler;
  onContextMenu: React.MouseEventHandler;
  onDragLeave: React.DragEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  onKeyUp: React.KeyboardEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
  onTouchEnd: React.TouchEventHandler;
  onTouchMove: React.TouchEventHandler;
  onTouchStart: React.TouchEventHandler;
}

const useTouchRipple = (props: UseTouchRippleProps) => {
  const {
    disabled,
    disableFocusRipple,
    disableRipple,
    disableTouchRipple,
    focusVisible,
    rippleRef,
  } = props;

  React.useEffect(() => {
    if (focusVisible && !disableFocusRipple && !disableRipple) {
      rippleRef.current?.pulsate();
    }
  }, [rippleRef, focusVisible, disableFocusRipple, disableRipple]);

  function useRippleHandler(
    rippleAction: keyof TouchRippleActions,
    eventCallback?: (event: React.SyntheticEvent) => void,
    skipRippleAction = disableTouchRipple,
  ) {
    return useEventCallback((event: React.SyntheticEvent) => {
      eventCallback?.(event);

      if (!skipRippleAction && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  const keydownRef = React.useRef(false);
  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (
      !disableFocusRipple &&
      !keydownRef.current &&
      focusVisible &&
      rippleRef.current &&
      event.key === ' '
    ) {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef?.current?.start(event);
      });
    }
  });

  const handleKeyUp = useEventCallback((event: React.KeyboardEvent) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (
      !disableFocusRipple &&
      event.key === ' ' &&
      rippleRef.current &&
      focusVisible &&
      !event.defaultPrevented
    ) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef?.current?.pulsate(event);
      });
    }
  });

  const handleBlur = useRippleHandler('stop');
  const handleMouseDown = useRippleHandler('start');
  const handleContextMenu = useRippleHandler('stop');
  const handleDragLeave = useRippleHandler('stop');
  const handleMouseUp = useRippleHandler('stop');
  const handleMouseLeave = useRippleHandler('stop');
  const handleTouchStart = useRippleHandler('start');
  const handleTouchEnd = useRippleHandler('stop');
  const handleTouchMove = useRippleHandler('stop');

  const [mountedState, setMountedState] = React.useState(false);

  React.useEffect(() => {
    setMountedState(true);
  }, []);

  const enableTouchRipple = mountedState && !disableRipple && !disabled;

  const getRippleHandlers = (componentProps: Partial<RippleEventHandlers>) => {
    return {
      onBlur(event: React.FocusEvent) {
        handleBlur(event);
        componentProps.onBlur?.(event);
      },
      onKeyDown(event: React.KeyboardEvent) {
        handleKeyDown(event);
        componentProps.onKeyDown?.(event);
      },
      onKeyUp(event: React.KeyboardEvent) {
        handleKeyUp(event);
        componentProps.onKeyUp?.(event);
      },
      onMouseDown(event: React.MouseEvent) {
        handleMouseDown(event);
        componentProps.onMouseDown?.(event);
      },
      onMouseUp(event: React.MouseEvent) {
        handleMouseUp(event);
        componentProps.onMouseUp?.(event);
      },
      onMouseLeave(event: React.MouseEvent) {
        handleMouseLeave(event);
        componentProps.onMouseLeave?.(event);
      },
      onContextMenu(event: React.MouseEvent) {
        handleContextMenu(event);
        componentProps.onContextMenu?.(event);
      },
      onDragLeave(event: React.DragEvent) {
        handleDragLeave(event);
        componentProps.onDragLeave?.(event);
      },
      onTouchStart(event: React.TouchEvent) {
        handleTouchStart(event);
        componentProps.onTouchStart?.(event);
      },
      onTouchEnd(event: React.TouchEvent) {
        handleTouchEnd(event);
        componentProps.onTouchEnd?.(event);
      },
      onTouchMove(event: React.TouchEvent) {
        handleTouchMove(event);
        componentProps.onTouchMove?.(event);
      },
    };
  };

  return {
    enableTouchRipple,
    getRippleHandlers,
  };
};

export default useTouchRipple;
