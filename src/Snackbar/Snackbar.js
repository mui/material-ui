import React from 'react';
import transitions from '../styles/transitions';
import ClickAwayListener from '../internal/ClickAwayListener';
import FlatButton from '../FlatButton';
import StyleResizable from '../utils/styleResizable';

function getStyles(props, context, state) {
  const {
    muiTheme: {
      baseTheme,
      snackbar,
      zIndex,
    },
  } = context;

  const {open} = state;

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
      transition: `${transitions.easeOut('400ms', 'transform')}, ${
        transitions.easeOut('400ms', 'visibility')}`,
    },
    body: {
      backgroundColor: snackbar.backgroundColor,
      padding: `0 ${desktopGutter}px`,
      height: props.multiline ? 'auto' : desktopSubheaderHeight,
      borderRadius: isSmall ? 0 : 2,
      maxWidth: isSmall ? 'inherit' : 568,
      minWidth: isSmall ? 'inherit' : 288,
      flexGrow: isSmall ? 1 : 0,
      lineHeight: props.multiline ? '16px' : '20px',
      margin: 'auto',
    },
    content: {
      fontSize: 14,
      display: 'flex',
      minHeight: '100%',
      color: snackbar.textColor,
      opacity: open ? 1 : 0,
      padding: props.multiline && props.action ? '22px 0' : props.multiline ? '24px 0' : '0',
      transition: open ? transitions.easeOut('500ms', 'opacity', '100ms') : transitions.easeOut('400ms', 'opacity'),
    },
    text: {
      flex: 1,
      alignSelf: 'center',
      display: 'inline-block',
    },
    action: {
      flexGrow: 0,
      flexShrink: 0,
      alignSelf: 'center',
      color: snackbar.actionColor,
      marginRight: -16,
      marginLeft: desktopGutter,
      backgroundColor: 'transparent',
    },
  };

  return styles;
}

class Snackbar extends React.Component {

  static propTypes = {
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
     * Controls whether the `Snackbar` is multi-line or single-line.
     */
    multiline: React.PropTypes.bool,

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
    onRequestClose: React.PropTypes.func,

    /**
     * Controls whether the `Snackbar` is opened or not.
     */
    open: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  static mixins = [
    StyleResizable,
  ];

  static defaultProps = {
    multiline: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      message: props.message,
      action: props.action,
    };
  }

  componentDidMount() {
    if (this.state.open) {
      this.setAutoHideTimer();
      this.setTransitionTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
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

  componentClickAway() {
    if (this.timerTransitionId) return; // If transitioning, don't close snackbar

    if (this.props.open !== null && this.props.onRequestClose) {
      this.props.onRequestClose('clickaway');
    } else {
      this.setState({open: false});
    }
  }

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
  }

  // Timer that controls delay before click-away events are captured (based on when animation completes)
  setTransitionTimer() {
    this.timerTransitionId = setTimeout(() => {
      this.timerTransitionId = undefined;
    }, 400);
  }

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
      open,
    } = this.state;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const actionButton = action && (
      <FlatButton
        style={styles.action}
        label={action}
        onTouchTap={onActionTouchTap}
      />
    );

    return (
      <ClickAwayListener onClickAway={open && this.componentClickAway.bind(this)}>
        <div {...others} style={prepareStyles(Object.assign(styles.root, style))}>
          <div style={prepareStyles(Object.assign(styles.body, bodyStyle))}>
            <div style={prepareStyles(styles.content)}>
              <span style={prepareStyles(styles.text)}>{message}</span>
              {actionButton}
            </div>
          </div>
        </div>
      </ClickAwayListener>
    );
  }
}

export default Snackbar;
