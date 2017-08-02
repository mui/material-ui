// @flow

import React, { Component, createElement, cloneElement } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import ClickAwayListener from '../internal/ClickAwayListener';
import { capitalizeFirstLetter, createChainedFunction } from '../utils/helpers';
import Slide from '../transitions/Slide';
import SnackbarContent from './SnackbarContent';
import type { TransitionCallback } from '../internal/Transition';

export const styleSheet = createStyleSheet('MuiSnackbar', theme => {
  const gutter = theme.spacing.unit * 3;
  const top = { top: 0 };
  const bottom = { bottom: 0 };
  const right = { justifyContent: 'flex-end' };
  const left = { justifyContent: 'flex-start' };
  const topSpace = { top: gutter };
  const bottomSpace = { bottom: gutter };
  const rightSpace = { right: gutter };
  const leftSpace = { left: gutter };

  return {
    root: {
      zIndex: theme.zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
    },
    anchorTopCenter: {
      extend: [top],
    },
    anchorBottomCenter: {
      extend: [bottom],
    },
    anchorTopRight: {
      extend: [top, right],
      [theme.breakpoints.up('md')]: {
        extend: [topSpace, rightSpace],
      },
    },
    anchorBottomRight: {
      extend: [bottom, right],
      [theme.breakpoints.up('md')]: {
        extend: [bottomSpace, rightSpace],
      },
    },
    anchorTopLeft: {
      extend: [top, left],
      [theme.breakpoints.up('md')]: {
        extend: [topSpace, leftSpace],
      },
    },
    anchorBottomLeft: {
      extend: [bottom, left],
      [theme.breakpoints.up('md')]: {
        extend: [bottomSpace, leftSpace],
      },
    },
  };
});

type Origin = {
  horizontal?: 'left' | 'center' | 'right' | number,
  vertical?: 'top' | 'center' | 'bottom' | number,
};

type DefaultProps = {
  anchorOrigin: Origin,
  autoHideDuration: ?number,
  classes: Object,
  enterTransitionDuration: number,
  leaveTransitionDuration: number,
};

export type Props = {
  /**
   * The action to display.
   */
  action?: Element<*>,
  /**
   * The anchor of the `Snackbar`.
   */
  anchorOrigin?: Origin,
  /**
   * The number of milliseconds to wait before automatically dismissing.
   * This behavior is disabled by default with the `null` value.
   */
  autoHideDuration?: number,
  /**
   * If you wish the take control over the children of the component you can use that property.
   * When using it, no `SnackbarContent` component will be rendered.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Customizes duration of enter animation (ms)
   */
  enterTransitionDuration?: number,
  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key property to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   */
  key?: any,
  /**
   * Customizes duration of leave animation (ms)
   */
  leaveTransitionDuration?: number,
  /**
   * The message to display.
   */
  message?: Element<*>,
  /**
   * Callback fired before the transition is entering.
   */
  onEnter?: TransitionCallback,
  /**
   * Callback fired when the transition is entering.
   */
  onEntering?: TransitionCallback,
  /**
   * Callback fired when the transition has entered.
   */
  onEntered?: TransitionCallback,
  /**
   * Callback fired before the transition is exiting.
   */
  onExit?: TransitionCallback,
  /**
   * Callback fired when the transition is exiting.
   */
  onExiting?: TransitionCallback,
  /**
   * Callback fired when the transition has exited.
   */
  onExited?: TransitionCallback,
  /**
   * @ignore
   */
  onMouseEnter?: Function,
  /**
   * @ignore
   */
  onMouseLeave?: Function,
  /**
   * Callback fired when the component requests to be closed.
   *
   * Typically `onRequestClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   *
   * The `reason` parameter can optionally be used to control the response to `onRequestClose`,
   * for example ignoring `clickaway`.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
   */
  onRequestClose?: (event: ?Event, reason: string) => void,
  /**
   * If true, `Snackbar` is open.
   */
  open: boolean,
  /**
   * Properties applied to the `SnackbarContent` element.
   */
  SnackbarContentProps?: Object,
  /**
   * Object with Transition component, props & create Fn.
   */
  transition?: Function | Element<*>,
};

type AllProps = DefaultProps & Props;

type State = {
  exited: boolean,
};

class Snackbar extends Component<DefaultProps, AllProps, State> {
  props: AllProps;
  static defaultProps: DefaultProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    autoHideDuration: null,
    classes: {},
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
  };

  state: State = {
    // Used to only render active snackbars.
    exited: false,
  };

  componentWillMount() {
    if (!this.props.open) {
      this.setState({ exited: true });
    }
  }

  componentDidMount() {
    if (this.props.open) {
      this.setAutoHideTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && this.state.exited) {
      this.setState({ exited: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHide);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide);
  }

  timerAutoHide = null;

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer(autoHideDuration = null) {
    if (!this.props.onRequestClose || this.props.autoHideDuration === null) {
      return;
    }

    clearTimeout(this.timerAutoHide);
    this.timerAutoHide = setTimeout(() => {
      if (!this.props.onRequestClose || this.props.autoHideDuration === null) {
        return;
      }

      this.props.onRequestClose(null, 'timeout');
    }, autoHideDuration || this.props.autoHideDuration);
  }

  handleMouseEnter = (event: SyntheticUIEvent) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
    this.handlePause();
  };

  handleMouseLeave = (event: SyntheticUIEvent) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
    this.handleResume();
  };

  handleClickAway = (event: Event) => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose(event, 'clickaway');
    }
  };

  // Pause the timer when the user is interacting with the Snackbar or when he can't see it.
  handlePause = () => {
    clearTimeout(this.timerAutoHide);
  };

  handleResume = () => {
    if (this.props.autoHideDuration !== null) {
      this.setAutoHideTimer(this.props.autoHideDuration * 0.5);
    }
  };

  handleTransitionExited = () => {
    this.setState({ exited: true });
  };

  render() {
    const {
      action,
      anchorOrigin: { vertical, horizontal },
      autoHideDuration,
      children,
      classes,
      className,
      enterTransitionDuration,
      leaveTransitionDuration,
      message,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onMouseEnter,
      onMouseLeave,
      onRequestClose,
      open,
      SnackbarContentProps,
      // $FlowFixMe - invalid error? Property cannot be accessed on any member of intersection type
      transition: transitionProp,
      ...other
    } = this.props;

    if (!open && this.state.exited) {
      return null;
    }

    const createTransitionFn = typeof transitionProp === 'function' ? createElement : cloneElement;
    const transition = transitionProp || <Slide direction={vertical === 'top' ? 'down' : 'up'} />;

    return (
      <EventListener target="window" onFocus={this.handleResume} onBlur={this.handlePause}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div
            className={classNames(
              classes.root,
              classes[
                `anchor${capitalizeFirstLetter(vertical)}${capitalizeFirstLetter(horizontal)}`
              ],
              className,
            )}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            {...other}
          >
            {createTransitionFn(
              transition,
              {
                in: open,
                transitionAppear: true,
                enterTransitionDuration,
                leaveTransitionDuration,
                onEnter,
                onEntering,
                onEntered,
                onExit,
                onExiting,
                onExited: createChainedFunction(this.handleTransitionExited, onExited),
              },
              children ||
                <SnackbarContent message={message} action={action} {...SnackbarContentProps} />,
            )}
          </div>
        </ClickAwayListener>
      </EventListener>
    );
  }
}

export default withStyles(styleSheet)(Snackbar);
