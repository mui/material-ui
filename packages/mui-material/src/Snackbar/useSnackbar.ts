'use client';
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import useTimeout from '@mui/utils/useTimeout';
import extractEventHandlers from '@mui/utils/extractEventHandlers';
import {
  UseSnackbarParameters,
  SnackbarCloseReason,
  UseSnackbarReturnValue,
} from './useSnackbar.types';
import { EventHandlers } from '../utils/types';

function useSnackbar(parameters: UseSnackbarParameters = {}): UseSnackbarReturnValue {
  const {
    autoHideDuration = null,
    disableWindowBlurListener = false,
    onClose,
    open,
    resumeHideDuration,
  } = parameters;

  const timerAutoHide = useTimeout();
  const pauseReasons = React.useRef(new Set<'focus' | 'hover' | 'window'>());

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (!nativeEvent.defaultPrevented) {
        if (nativeEvent.key === 'Escape') {
          // not calling `preventDefault` since we don't know if people may ignore this event e.g. a permanently open snackbar
          onClose?.(nativeEvent, 'escapeKeyDown');
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const handleClose = useEventCallback((event: null, reason: SnackbarCloseReason) => {
    onClose?.(event, reason);
  });

  const setAutoHideTimer = useEventCallback((autoHideDurationParam: number | null) => {
    if (!open || !onClose || autoHideDurationParam == null || pauseReasons.current.size > 0) {
      return;
    }

    timerAutoHide.start(autoHideDurationParam, () => {
      handleClose(null, 'timeout');
    });
  });

  React.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    } else {
      pauseReasons.current.clear();
    }

    return timerAutoHide.clear;
  }, [open, autoHideDuration, setAutoHideTimer, timerAutoHide]);

  const handleClickAway = (event: React.SyntheticEvent<any> | Event) => {
    onClose?.(event, 'clickaway');
  };

  // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.
  const handlePause = useEventCallback((reason: 'focus' | 'hover' | 'window') => {
    if (open) {
      pauseReasons.current.add(reason);
      timerAutoHide.clear();
    }
  });

  // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.
  const handleResume = useEventCallback((reason: 'focus' | 'hover' | 'window') => {
    pauseReasons.current.delete(reason);
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  });

  const createHandleBlur =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLDivElement, Element>) => {
      const onBlurCallback = otherHandlers.onBlur;
      onBlurCallback?.(event);
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleResume('focus');
      }
    };

  const createHandleFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLDivElement, Element>) => {
      const onFocusCallback = otherHandlers.onFocus;
      onFocusCallback?.(event);
      handlePause('focus');
    };

  const createMouseEnter =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const onMouseEnterCallback = otherHandlers.onMouseEnter;
      onMouseEnterCallback?.(event);
      handlePause('hover');
    };

  const createMouseLeave =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const onMouseLeaveCallback = otherHandlers.onMouseLeave;
      onMouseLeaveCallback?.(event);
      handleResume('hover');
    };

  React.useEffect(() => {
    // TODO: window global should be refactored here
    if (!disableWindowBlurListener && open) {
      const handleWindowFocus = () => handleResume('window');
      const handleWindowBlur = () => handlePause('window');
      window.addEventListener('focus', handleWindowFocus);
      window.addEventListener('blur', handleWindowBlur);

      return () => {
        window.removeEventListener('focus', handleWindowFocus);
        window.removeEventListener('blur', handleWindowBlur);
      };
    }

    if (disableWindowBlurListener && open && pauseReasons.current.has('window')) {
      handleResume('window');
    }

    return undefined;
  }, [disableWindowBlurListener, open, handleResume, handlePause]);

  const getRootProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ) => {
    const externalEventHandlers = {
      ...extractEventHandlers(parameters),
      ...extractEventHandlers(externalProps),
    };

    return {
      // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
      // See https://github.com/mui/material-ui/issues/29080
      role: 'presentation',
      ...externalProps,
      ...externalEventHandlers,
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onMouseEnter: createMouseEnter(externalEventHandlers),
      onMouseLeave: createMouseLeave(externalEventHandlers),
    };
  };

  return { getRootProps, onClickAway: handleClickAway };
}

export default useSnackbar;
