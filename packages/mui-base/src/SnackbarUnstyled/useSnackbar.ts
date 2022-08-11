import * as React from 'react';
import { unstable_useEventCallback as useEventCallback } from '@mui/utils';
import {
  UseSnackbarParameters,
  SnackbarCloseReason,
  UseSnackbarRootSlotProps,
} from './useSnackbar.types';
import extractEventHandlers from '../utils/extractEventHandlers';

/**
 * The basic building block for creating custom snackbar.
 *
 * Demos:
 *
 * - [Snackbar](https://mui.com/base/react-snackbar/)
 */
export default function useSnackbar(parameters: UseSnackbarParameters) {
  const {
    autoHideDuration = null,
    disableWindowBlurListener = false,
    onClose,
    open,
    ref,
    resumeHideDuration,
  } = parameters;

  const timerAutoHide = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (!nativeEvent.defaultPrevented) {
        // IE11, Edge (prior to using Blink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          // not calling `preventDefault` since we don't know if people may ignore this event e.g. a permanently open snackbar
          if (onClose) {
            onClose(nativeEvent, 'escapeKeyDown');
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const handleClose = useEventCallback(
    (event: Event | React.SyntheticEvent<any, Event> | null, reason: SnackbarCloseReason) => {
      if (onClose) {
        onClose(event, reason);
      }
    },
  );

  const setAutoHideTimer = useEventCallback((autoHideDurationParam: number | null) => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }

    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose(null, 'timeout');
    }, autoHideDurationParam);
  });

  React.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]);

  const handleClickAway = (event: React.SyntheticEvent<any> | Event) => {
    if (onClose) {
      onClose(event, 'clickaway');
    }
  };

  // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.
  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  };

  // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.
  const handleResume = React.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  const createHandleBlur =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLDivElement, Element>) => {
      const onBlurCallback = otherHandlers.onBlur;
      if (onBlurCallback) {
        onBlurCallback(event);
      }
      handleResume();
    };

  const createHandleFocus =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.FocusEvent<HTMLDivElement, Element>) => {
      const onFocusCallback = otherHandlers.onFocus;
      if (onFocusCallback) {
        onFocusCallback(event);
      }
      handlePause();
    };

  const createMouseEnter =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const onMouseEnterCallback = otherHandlers.onMouseEnter;
      if (onMouseEnterCallback) {
        onMouseEnterCallback(event);
      }
      handlePause();
    };

  const createMouseLeave =
    (otherHandlers: Record<string, React.EventHandler<any> | undefined>) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const onMouseLeaveCallback = otherHandlers.onMouseLeave;
      if (onMouseLeaveCallback) {
        onMouseLeaveCallback(event);
      }
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
  }, [disableWindowBlurListener, handleResume, open]);

  const getRootProps = <TOther extends Record<string, React.EventHandler<any> | undefined> = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseSnackbarRootSlotProps<TOther> => {
    const propsEventHandlers = extractEventHandlers(parameters) as Partial<UseSnackbarParameters>;
    const externalEventHandlers = {
      ...propsEventHandlers,
      ...otherHandlers,
    };

    return {
      ref,
      // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
      // See https://github.com/mui/material-ui/issues/29080
      role: 'presentation',
      ...externalEventHandlers,
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onMouseEnter: createMouseEnter(externalEventHandlers),
      onMouseLeave: createMouseLeave(externalEventHandlers),
    };
  };

  return { getRootProps, onClickAway: handleClickAway };
}
