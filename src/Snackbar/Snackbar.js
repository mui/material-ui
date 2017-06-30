// @flow

import React, { Component, createElement, cloneElement } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import ClickAwayListener from '../internal/ClickAwayListener';
import { capitalizeFirstLetter } from '../utils/helpers';
import Slide from '../transitions/Slide';
import SnackbarContent from './SnackbarContent';

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
  horizontal: 'left' | 'center' | 'right' | number,
  vertical: 'top' | 'center' | 'bottom' | number,
};

type DefaultProps = {
  anchorOrigin: Origin,
  autoHideDuration: ?number,
  enterTransitionDuration: number,
  leaveTransitionDuration: number,
};

type Props = DefaultProps & {
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
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Customizes duration of enter animation (ms)
   */
  enterTransitionDuration?: number,
  /**
   * Customizes duration of leave animation (ms)
   */
  leaveTransitionDuration?: number,
  /**
   * The message to display.
   */
  message?: Element<*>,
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
   * @param {event} event The event that triggered the close request
   * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
   */
  onRequestClose?: (event: ?SyntheticUIEvent, reason: string) => void,
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

type State = {
  exited: boolean,
};

class Snackbar extends Component<DefaultProps, Props, State> {
  props: Props;
  static defaultProps: DefaultProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    autoHideDuration: null,
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
    if (this.props.autoHideDuration === null) {
      return;
    }

    clearTimeout(this.timerAutoHide);
    this.timerAutoHide = setTimeout(() => {
      if (this.props.onRequestClose) {
        this.props.onRequestClose(null, 'timeout');
      }
    }, autoHideDuration || this.props.autoHideDuration);
  }

  handleMouseEnter = event => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
    clearTimeout(this.timerAutoHide);
  };

  handleMouseLeave = event => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
    this.setAutoHideTimer(2e3);
  };

  handleClickAway = event => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose(event, 'clickaway');
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
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div
          className={classNames(
            classes.root,
            classes[`anchor${capitalizeFirstLetter(vertical)}${capitalizeFirstLetter(horizontal)}`],
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
              onExited: this.handleTransitionExited,
            },
            children ||
              <SnackbarContent message={message} action={action} {...SnackbarContentProps} />,
          )}
        </div>
      </ClickAwayListener>
    );
  }
}

export default withStyles(styleSheet)(Snackbar);
