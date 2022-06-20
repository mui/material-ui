import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useEventCallback as useEventCallback } from '@mui/utils';
import ClickAwayListener from '../ClickAwayListener';
import { SnackbarCloseReason, SnackbarUnstyledProps } from './SnackbarUnstyled.types';
import composeClasses from '../composeClasses';
import { getSnackbarUnstyledUtilityClass } from './snackbarUnstyledClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getSnackbarUnstyledUtilityClass, undefined);
};
/**
 *
 * Demos:
 *
 * - [Snackbar](https://mui.com/base/react-snackbar/)
 *
 * API:
 *
 * - [SnackbarUnstyled API](https://mui.com/base/api/snackbar-unstyled/)
 */
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

  const classes = useUtilityClasses();

  const timerAutoHide = React.useRef<ReturnType<typeof setTimeout>>();
  const [exited, setExited] = React.useState(true);

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
  }, [exited, open, onClose]);

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

  const handleExited = () => {
    setExited(true);
  };

  const handleEnter = () => {
    setExited(false);
  };

  // So we only render active snackbars.
  if (!open && exited) {
    return null;
  }

  const rootProps = {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...other,
    ...componentsProps.root,
    className: clsx(classes.root, className, componentsProps.root?.className),
    ref,
    // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
    // See https://github.com/mui/material-ui/issues/29080
    role: 'presentation',
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
      <Root {...rootProps}>
        {TransitionComponent ? (
          <TransitionComponent
            onEnter={handleEnter}
            onExited={handleExited}
            {...componentsProps.transition}
          >
            {children}
          </TransitionComponent>
        ) : (
          children
        )}
      </Root>
    </ClickAwayListener>
  );
});

SnackbarUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: PropTypes.number,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: PropTypes.object,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
    Transition: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
    transition: PropTypes.object,
  }),
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: PropTypes.number,
} as any;

export default SnackbarUnstyled;
