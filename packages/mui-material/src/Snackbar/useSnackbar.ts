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

type MuiPreventableKeyboardEvent = KeyboardEvent & {
  defaultMuiPrevented?: boolean | undefined;
};

function useSnackbar(parameters: UseSnackbarParameters = {}): UseSnackbarReturnValue {
  const {
    autoHideDuration = null,
    disableWindowBlurListener = false,
    onClose,
    open,
    resumeHideDuration,
  } = parameters;

  const timerAutoHide = useTimeout();

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent: MuiPreventableKeyboardEvent) {
      if (nativeEvent.defaultMuiPrevented) {
        return;
      }

      if (nativeEvent.key === 'Escape') {
        let defaultPreventedByOnClose = false;
        const originalPreventDefault = nativeEvent.preventDefault;

        nativeEvent.preventDefault = () => {
          defaultPreventedByOnClose = true;
          originalPreventDefault.call(nativeEvent);
        };

        // Snackbar itself does not call `preventDefault`, since a caller may choose
        // to keep it open permanently.
        try {
          onClose?.(nativeEvent, 'escapeKeyDown');
        } finally {
          nativeEvent.preventDefault = originalPreventDefault;
        }

        // `preventDefault()` inside `onClose` should stop later Snackbars from
        // handling the same Escape event, even if the event was already
        // default-prevented before it reached this listener.
        if (defaultPreventedByOnClose) {
          nativeEvent.defaultMuiPrevented = true;
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
    if (!onClose || autoHideDurationParam == null) {
      return;
    }

    timerAutoHide.start(autoHideDurationParam, () => {
      handleClose(null, 'timeout');
    });
  });

  React.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }

    return timerAutoHide.clear;
  }, [open, autoHideDuration, setAutoHideTimer, timerAutoHide]);

  const handleClickAway = (event: React.SyntheticEvent<any> | Event) => {
    onClose?.(event, 'clickaway');
  };

  // Pause the timer when the user is interacting with the Snackbar
  // or when the window loses focus.
  const handlePause = timerAutoHide.clear;

  // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window regains focus.
  const handleResume = React.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  const createHandleBlur =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLDivElement, Element>) => {
      const onBlurCallback = otherHandlers.onBlur;
      onBlurCallback?.(event);
      handleResume();
    };

  const createHandleFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLDivElement, Element>) => {
      const onFocusCallback = otherHandlers.onFocus;
      onFocusCallback?.(event);
      handlePause();
    };

  const createMouseEnter =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const onMouseEnterCallback = otherHandlers.onMouseEnter;
      onMouseEnterCallback?.(event);
      handlePause();
    };

  const createMouseLeave =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const onMouseLeaveCallback = otherHandlers.onMouseLeave;
      onMouseLeaveCallback?.(event);
      handleResume();
    };

  React.useEffect(() => {
    // TODO: window global should be refactored here
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);

      return () => {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
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
