import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import ClickAwayListener from '../ClickAwayListener';
import { capitalize, createChainedFunction } from '../utils/helpers';
import Grow from '../Grow';
import SnackbarContent from '../SnackbarContent';

export const styles = theme => {
  const top1 = { top: 8 };
  const bottom1 = { bottom: 8 };
  const right = { justifyContent: 'flex-end' };
  const left = { justifyContent: 'flex-start' };
  const top3 = { top: 24 };
  const bottom3 = { bottom: 24 };
  const right3 = { right: 24 };
  const left3 = { left: 24 };
  const center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  };

  return {
    /* Styles applied to the root element. */
    root: {
      zIndex: theme.zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 8,
      right: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`. */
    anchorOriginTopCenter: {
      ...top1,
      [theme.breakpoints.up('sm')]: {
        ...top3,
        ...center,
      },
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`. */
    anchorOriginBottomCenter: {
      ...bottom1,
      [theme.breakpoints.up('sm')]: {
        ...bottom3,
        ...center,
      },
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`. */
    anchorOriginTopRight: {
      ...top1,
      ...right,
      [theme.breakpoints.up('sm')]: {
        left: 'auto',
        ...top3,
        ...right3,
      },
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`. */
    anchorOriginBottomRight: {
      ...bottom1,
      ...right,
      [theme.breakpoints.up('sm')]: {
        left: 'auto',
        ...bottom3,
        ...right3,
      },
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`. */
    anchorOriginTopLeft: {
      ...top1,
      ...left,
      [theme.breakpoints.up('sm')]: {
        right: 'auto',
        ...top3,
        ...left3,
      },
    },
    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`. */
    anchorOriginBottomLeft: {
      ...bottom1,
      ...left,
      [theme.breakpoints.up('sm')]: {
        right: 'auto',
        ...bottom3,
        ...left3,
      },
    },
  };
};

const Snackbar = React.forwardRef(function Snackbar(props, ref) {
  const {
    action,
    anchorOrigin: { vertical, horizontal },
    autoHideDuration,
    children,
    classes,
    className,
    ClickAwayListenerProps,
    ContentProps,
    disableWindowBlurListener,
    message,
    onClose,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    TransitionComponent,
    transitionDuration,
    TransitionProps,
    ...other
  } = props;

  const timerAutoHide = React.useRef();
  const [exited, setExited] = React.useState(!open);

  // Timer that controls delay before snackbar auto hides
  const setAutoHideTimer = React.useCallback(
    autoHideDurationParam => {
      const autoHideDurationBefore =
        autoHideDurationParam != null ? autoHideDurationParam : autoHideDuration;

      if (!onClose || autoHideDurationBefore == null) {
        return;
      }

      clearTimeout(timerAutoHide.current);
      timerAutoHide.current = setTimeout(() => {
        const autoHideDurationAfter =
          autoHideDurationParam != null ? autoHideDurationParam : autoHideDuration;
        if (!onClose || autoHideDurationAfter == null) {
          return;
        }
        onClose(null, 'timeout');
      }, autoHideDurationBefore);
    },
    [autoHideDuration, onClose],
  );

  React.useEffect(() => {
    if (open) setAutoHideTimer();

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, setAutoHideTimer]);

  // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.
  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  };

  // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.
  const handleResume = React.useCallback(() => {
    if (autoHideDuration != null) {
      if (resumeHideDuration != null) {
        setAutoHideTimer(resumeHideDuration);
        return;
      }
      setAutoHideTimer(autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  const handleMouseEnter = event => {
    if (onMouseEnter) {
      onMouseEnter(event);
    }
    handlePause();
  };

  const handleMouseLeave = event => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }
    handleResume();
  };

  const handleClickAway = event => {
    if (onClose) {
      onClose(event, 'clickaway');
    }
  };

  const handleExited = () => {
    setExited(true);
  };

  const handleEnter = () => {
    setExited(false);
  };

  React.useEffect(() => {
    if (!disableWindowBlurListener) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);

      return () => {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }

    return undefined;
  }, [disableWindowBlurListener, handleResume]);

  // So we only render active snackbars.
  if (!open && exited) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
      <div
        className={clsx(
          classes.root,
          classes[`anchorOrigin${capitalize(vertical)}${capitalize(horizontal)}`],
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
        {...other}
      >
        <TransitionComponent
          appear
          in={open}
          onEnter={createChainedFunction(handleEnter, onEnter)}
          onEntered={onEntered}
          onEntering={onEntering}
          onExit={onExit}
          onExited={createChainedFunction(handleExited, onExited)}
          onExiting={onExiting}
          timeout={transitionDuration}
          direction={vertical === 'top' ? 'down' : 'up'}
          {...TransitionProps}
        >
          {children || <SnackbarContent message={message} action={action} {...ContentProps} />}
        </TransitionComponent>
      </div>
    </ClickAwayListener>
  );
});

Snackbar.propTypes = {
  /**
   * The action to display.
   */
  action: PropTypes.node,
  /**
   * The anchor of the `Snackbar`.
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    vertical: PropTypes.oneOf(['top', 'bottom']).isRequired,
  }),
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   */
  autoHideDuration: PropTypes.number,
  /**
   * Replace the `SnackbarContent` component.
   */
  children: PropTypes.element,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Properties applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: PropTypes.object,
  /**
   * Properties applied to the [`SnackbarContent`](/api/snackbar-content/) element.
   */
  ContentProps: PropTypes.object,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   */
  disableWindowBlurListener: PropTypes.bool,
  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key property to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   */
  key: PropTypes.any,
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
   */
  onClose: PropTypes.func,
  /**
   * Callback fired before the transition is entering.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired when the transition has entered.
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired when the transition is entering.
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired before the transition is exiting.
   */
  onExit: PropTypes.func,
  /**
   * Callback fired when the transition has exited.
   */
  onExited: PropTypes.func,
  /**
   * Callback fired when the transition is exiting.
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * If true, `Snackbar` is open.
   */
  open: PropTypes.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` property isn't specified, it does nothing.
   * If `autoHideDuration` property is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: PropTypes.number,
  /**
   * The component used for the transition.
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
  /**
   * Properties applied to the `Transition` element.
   */
  TransitionProps: PropTypes.object,
};

Snackbar.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  disableWindowBlurListener: false,
  TransitionComponent: Grow,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withStyles(styles, { flip: false, name: 'MuiSnackbar' })(Snackbar);
