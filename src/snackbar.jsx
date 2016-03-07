import React from 'react';
import Transitions from './styles/transitions';
import ClickAwayListener from './ClickAwayListener';
import FlatButton from './flat-button';
import getMuiTheme from './styles/getMuiTheme';
import StyleResizable from './mixins/style-resizable';

function getStyles(props, state) {
  const {
    muiTheme: {
      baseTheme,
      snackbar,
      zIndex,
    },
    open,
  } = state;

  const {
    desktopGutter,
    desktopSubheaderHeight,
  } = baseTheme.spacing;

  const isSmall = state.deviceSize === StyleResizable.statics.Sizes.SMALL;

  const styles = {
    root: {
      position: 'fixed',
      left: 0,
      display: 'flex',
      right: 0,
      bottom: 0,
      zIndex: zIndex.snackbar,
      visibility: open ? 'visible' : 'hidden',
      transform: open ? 'translate3d(0, 0, 0)' : `translate3d(0, ${desktopSubheaderHeight}px, 0)`,
      transition: `${Transitions.easeOut('400ms', 'transform')}, ${
        Transitions.easeOut('400ms', 'visibility')}`,
    },
    body: {
      backgroundColor: snackbar.backgroundColor,
      padding: `0 ${desktopGutter}px`,
      height: desktopSubheaderHeight,
      lineHeight: `${desktopSubheaderHeight}px`,
      borderRadius: isSmall ? 0 : 2,
      maxWidth: isSmall ? 'inherit' : 568,
      minWidth: isSmall ? 'inherit' : 288,
      flexGrow: isSmall ? 1 : 0,
      margin: 'auto',
    },
    content: {
      fontSize: 14,
      color: snackbar.textColor,
      opacity: open ? 1 : 0,
      transition: open ? Transitions.easeOut('500ms', 'opacity', '100ms') : Transitions.easeOut('400ms', 'opacity'),
    },
    action: {
      color: snackbar.actionColor,
      float: 'right',
      marginTop: 6,
      marginRight: -16,
      marginLeft: desktopGutter,
      backgroundColor: 'transparent',
    },
  };

  return styles;
}

const Snackbar = React.createClass({

  propTypes: {
    /**
     * The label for the action on the snackbar.
     */
    action: React.PropTypes.string,

    /**
     * The number of milliseconds to wait before automatically dismissing.
     * If no value is specified the snackbar will dismiss normally.
     * If a value is provided the snackbar can still be dismissed normally.
     * If a snackbar is dismissed before the timer expires, the timer will be cleared.
     */
    autoHideDuration: React.PropTypes.number,

    /**
     * Override the inline-styles of the body element.
     */
    bodyStyle: React.PropTypes.object,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * The message to be displayed.
     *
     * (Note: If the message is an element or array, and the `Snackbar` may re-render while it is still open,
     * ensure that the same object remains as the `message` property if you want to avoid the `Snackbar` hiding and
     * showing again)
     */
    message: React.PropTypes.node.isRequired,

    /**
     * Fired when the action button is touchtapped.
     *
     * @param {object} event Action button event.
     */
    onActionTouchTap: React.PropTypes.func,

    /**
     * Fired when the `Snackbar` is requested to be closed by a click outside the `Snackbar`, or after the
     * `autoHideDuration` timer expires.
     *
     * Typically `onRequestClose` is used to set state in the parent component, which is used to control the `Snackbar`
     * `open` prop.
     *
     * The `reason` parameter can optionally be used to control the response to `onRequestClose`,
     * for example ignoring `clickaway`.
     *
     * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
     */
    onRequestClose: React.PropTypes.func.isRequired,

    /**
     * Controls whether the `Snackbar` is opened or not.
     */
    open: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StyleResizable,
  ],

  getInitialState() {
    return {
      open: this.props.open,
      message: this.props.message,
      action: this.props.action,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    if (this.state.open) {
      this.setAutoHideTimer();
      this.setTransitionTimer();
    }
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });

    if (this.state.open && nextProps.open === this.props.open &&
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
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.setAutoHideTimer();
        this.setTransitionTimer();
      } else {
        clearTimeout(this.timerAutoHideId);
      }
    }
  },

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    clearTimeout(this.timerTransitionId);
    clearTimeout(this.timerOneAtTheTimeId);
  },

  manuallyBindClickAway: true,

  timerAutoHideId: undefined,
  timerTransitionId: undefined,
  timerOneAtTheTimeId: undefined,

  componentClickAway() {
    if (this.timerTransitionId) return; // If transitioning, don't close snackbar

    if (this.props.open !== null && this.props.onRequestClose) {
      this.props.onRequestClose('clickaway');
    } else {
      this.setState({open: false});
    }
  },

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration;

    if (autoHideDuration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        if (this.props.open !== null && this.props.onRequestClose) {
          this.props.onRequestClose('timeout');
        } else {
          this.setState({open: false});
        }
      }, autoHideDuration);
    }
  },

  // Timer that controls delay before click-away events are captured (based on when animation completes)
  setTransitionTimer() {
    this.timerTransitionId = setTimeout(() => {
      this.timerTransitionId = undefined;
    }, 400);
  },

  render() {
    const {
      onActionTouchTap,
      style,
      bodyStyle,
      ...others,
    } = this.props;

    const {
      action,
      message,
      muiTheme: {
        prepareStyles,
      },
      open,
    } = this.state;

    const styles = getStyles(this.props, this.state);

    const actionButton = action && (
      <FlatButton
        style={styles.action}
        label={action}
        onTouchTap={onActionTouchTap}
      />
    );

    return (
      <ClickAwayListener onClickAway={open && this.componentClickAway}>
        <div {...others} style={prepareStyles(Object.assign(styles.root, style))}>
          <div style={prepareStyles(Object.assign(styles.body, bodyStyle))}>
            <div style={prepareStyles(styles.content)}>
              <span>{message}</span>
              {actionButton}
            </div>
          </div>
        </div>
      </ClickAwayListener>
    );
  },

});

export default Snackbar;
