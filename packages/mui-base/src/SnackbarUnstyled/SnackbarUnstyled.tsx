import * as React from 'react';
import clsx from 'clsx';
import { unstable_useEventCallback as useEventCallback } from '@mui/utils';
import ClickAwayListener from '../ClickAwayListener';
import { SnackbarCloseReason, SnackbarUnstyledProps } from './SnackbarUnstyled.types';

const SnackbarUnstyled = React.forwardRef(function SnackbarUnstyled(
  props: SnackbarUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const {
    autoHideDuration = null,
    children,
    className,
    ClickAwayListenerProps,
    component,
    components = {},
    componentsProps = {},
    disableWindowBlurListener = false,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    ...other
  } = props;

  const timerAutoHide = React.useRef<ReturnType<typeof setTimeout>>();

  const Root = component || components.Root || 'div';

  const TransitionComponent = components.Transition;

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (!nativeEvent.defaultPrevented) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
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

  const handleBlur = (event: React.FocusEvent) => {
    const onBlurCallback = componentsProps.root?.onBlur || onBlur;
    if (onBlurCallback) {
      onBlurCallback(event);
    }
    handleResume();
  };

  const handleFocus = (event: React.FocusEvent) => {
    const onFocusCallback = componentsProps.root?.onFocus || onFocus;
    if (onFocusCallback) {
      onFocusCallback(event);
    }
    handlePause();
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    const onMouseEnterCallback = componentsProps.root?.onMouseEnter || onMouseEnter;
    if (onMouseEnterCallback) {
      onMouseEnterCallback(event);
    }
    handlePause();
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const onMouseLeaveCallback = componentsProps.root?.onMouseLeave || onMouseLeave;
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

  // So we only render active snackbars.
  if (!open) {
    return null;
  }

  const rootProps = {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...other,
    ...componentsProps.root,
    className: clsx(className, componentsProps.root?.className),
    ref,
    // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
    // See https://github.com/mui/material-ui/issues/29080
    role: 'presentation',
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
      <Root {...rootProps}>
        {TransitionComponent ? (
          <TransitionComponent {...componentsProps.transition}>{children}</TransitionComponent>
        ) : (
          children
        )}
      </Root>
    </ClickAwayListener>
  );
});

export default SnackbarUnstyled;
