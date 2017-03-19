// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import SnackbarContent from './SnackbarContent';
import ClickAwayListener from '../internal/ClickAwayListener';


export const styleSheet = createStyleSheet('MuiSnackbar', (theme) => {
  const { zIndex, transitions, breakpoints } = theme;

  const transitionString = `${transitions.create('transform', {
    duration: 400,
    easing: transitions.easing.easeInOut,
    delay: 0,
  })}, ${transitions.create('visibility', {
    duration: 400,
    easing: transitions.easing.easeInOut,
    delay: 0,
  })}`;
  return {
    root: {
      position: 'fixed',
      left: '50%',
      display: 'flex',
      bottom: 0,
      zIndex: zIndex.snackbar,
      transition: transitionString,
    },
    [breakpoints.down('sm')]: {
      root: {
        minWidth: 'inherit',
        maxWidth: 'inherit',
        width: '100%',
        display: 'block',
      },
    },
    [breakpoints.up('sm')]: {
      root: {
        minWidth: 288,
        maxWidth: 568,
        width: 50,
      },
    },
  };
});

export default class Snackbar extends Component {

  static propTypes = {
    /**
     * The label for the action on the snackbar.
     */
    action: PropTypes.node,
    /**
     * The number of milliseconds to wait before automatically dismissing.
     * If no value is specified the snackbar will dismiss normally.
     * If a value is provided the snackbar can still be dismissed normally.
     * If a snackbar is dismissed before the timer expires, the timer will be cleared.
     */
    autoHideDuration: PropTypes.number,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The message to be displayed.
     *
     * (Note: If the message is an element or array,
     *  and the `Snackbar` may re-render while it is still open,
     *  ensure that the same object remains as the `message` property
     *  if you want to avoid the `Snackbar` hiding and
     *  showing again)
     */
    message: PropTypes.node.isRequired,
    /**
     * Fired when the `Snackbar` is requested to be closed by a
     * click outside the `Snackbar`, or after the
     * `autoHideDuration` timer expires.
     *
     * Typically `onRequestClose` is used to set state in the parent component,
     * which is used to control the `Snackbar`
     * `open` prop.
     *
     * The `reason` parameter can optionally be used to control the response to `onRequestClose`,
     * for example ignoring `clickaway`.
     *
     * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
     */
    onRequestClose: PropTypes.func,
    /**
     * Controls whether the `Snackbar` is opened or not.
     */
    open: PropTypes.bool.isRequired,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,

  };

  state = {
    message: '',
    action: '',
    open: false,
  }
  componentWillMount() {
    this.setState({
      open: this.props.open,
      message: this.props.message,
      action: this.props.action,
    });
  }

  componentDidMount() {
    if (this.state.open) {
      this.setAutoHideTimer();
      this.setTransitionTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open && nextProps.open &&
        (nextProps.message !== this.props.message || nextProps.action !== this.props.action)) {
      this.setState({
        open: false,
      });

      clearTimeout(this.timerOneAtTheTimeId);
      this.timerOneAtTheTimeId = setTimeout(() => {
        this.setState({
          message: nextProps.message,
          action: nextProps.action,
          open: true,
        });
      }, 400);
    } else {
      const open = nextProps.open;

      this.setState({
        open: open !== null ? open : this.state.open,
        message: nextProps.message,
        action: nextProps.action,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.setAutoHideTimer();
        this.setTransitionTimer();
      } else {
        clearTimeout(this.timerAutoHideId);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    clearTimeout(this.timerTransitionId);
    clearTimeout(this.timerOneAtTheTimeId);
  }

  componentClickAway = () => {
    if (this.timerTransitionId) {
      // If transitioning, don't close the snackbar.
      return;
    }

    if (this.props.open !== null && this.props.onRequestClose) {
      this.props.onRequestClose('clickaway');
    } else {
      this.setState({ open: false });
    }
  };

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration;

    if (autoHideDuration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        if (this.props.open !== null && this.props.onRequestClose) {
          this.props.onRequestClose('timeout');
        } else {
          this.setState({ open: false });
        }
      }, autoHideDuration);
    }
  }

  /* Timer that controls delay before
   click-away events are captured (based on when animation completes)
  */
  setTransitionTimer() {
    this.timerTransitionId = setTimeout(() => {
      this.timerTransitionId = undefined;
    }, 400);
  }
  timerOneAtTheTimeId = undefined;
  timerAutoHideId = undefined;
  timerTransitionId = undefined;

  render() {
    const {
      action,
      message,
      open,
    } = this.state;

    const {
      autoHideDuration, // eslint-disable-line no-unused-vars
      onRequestClose, // eslint-disable-line no-unused-vars
      style,
      ...other // eslint-disable-line no-unused-vars
    } = this.props;

    const dynamicStyle = {
      visibility: open ? 'visible' : 'hidden',
      WebkitTransform: open ? 'translate(-50%, 0)' : 'translate(-50%, 48px)',
      msTransform: open ? 'translate(-50%, 0)' : 'translate(-50%, 48px)',
      transform: open ? 'translate(-50%, 0)' : 'translate(-50%, 48px)',
    };

    const classes = this.context.styleManager.render(styleSheet);
    return (
      <ClickAwayListener onClickAway={open ? this.componentClickAway : null}>
        <div
          className={classes.root}
          style={dynamicStyle}
        >
          <SnackbarContent
            action={action}
            message={message}
            open={open}
          />
        </div>
      </ClickAwayListener>
    );
  }
}
Snackbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
