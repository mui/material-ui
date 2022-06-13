import * as React from 'react';
import clsx from 'clsx';
import { unstable_useEventCallback as useEventCallback } from '@mui/utils';
import ClickAwayListener from '../ClickAwayListener';
import { SnackbarCloseReason, SnackbarUnstyledProps } from './SnackbarUnstyled.types';

const SnackbarUnstyled = (props: SnackbarUnstyledProps) => {
  const {
    autoHideDuration = null,
    children,
    className,
    ClickAwayListenerProps,
    component,
    components = {},
    componentsProps = {},
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    resumeHideDuration,
    ...other
  } = props;

  const timerAutoHide = React.useRef<ReturnType<typeof setTimeout>>();

  const Root = component || components.Root || 'div';

  const TransitionComponent = components.Transition;

  const handleClose = useEventCallback(
    (event: Event | React.SyntheticEvent<any, Event> | null, reason: SnackbarCloseReason) => {
      if (onClose) {
        onClose(event, reason);
      }
    },
  );

  const setAutoHideTimer = useEventCallback((autoHideDurationParam: number) => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }

    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose(null, 'timeout');
    }, autoHideDurationParam);
  });

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

  const rootProps = {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...other,
    ...componentsProps.root,
    className: clsx(className, componentsProps.root?.className),
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
};

export default SnackbarUnstyled;
