import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import transitions from '../styles/transitions';
import ClickAwayListener from '../internal/ClickAwayListener';
import BottomSheetBody from './BottomSheetBody';
import Paper from '../Paper';

function getStyles(props, context, state) {
  const {
    muiTheme: {
      baseTheme: {
        spacing: {
          desktopSubheaderHeight,
        },
      },
      zIndex,
    },
  } = context;

  const {open} = state;
  const {action} = props;

  const styles = {
    root: {
      position: 'fixed',
      left: '50%',
      display: 'flex',
      bottom: 0,
      zIndex: zIndex.bottomSheet,
      maxHeight: '100%',
      visibility: open ? 'visible' : 'hidden',
      transform: open ?
        'translate(-50%, 0)' :
        `translate(-50%, ${desktopSubheaderHeight*6}px)`,
      transition: `${transitions.easeOut('400ms', 'transform')}, ${
        transitions.easeOut('400ms', 'visibility')}`,
      transitionDelay: !open && action ? '200ms' : '0ms',
    },
  };

  return styles;
}

class BottomSheet extends Component {
  static propTypes = {
     /**
     * The contents of the `BottomSheet`
     */
    children: PropTypes.node,
    /**
     * The name for the floating action button on the bottom sheet. Can be any Material Design Icon: https://design.google.com/icons/ . Note: substitute spaces with `_`
     */
    action: PropTypes.string,
    /**
     * Override the inline-styles of the body element.
     */
    bodyStyle: PropTypes.object,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Override the inline-styles of the content element.
     */
    contentStyle: PropTypes.object,
    /**
     * Fired when the action button is touchtapped.
     *
     * @param {object} event Action button event.
     */
    onActionTouchTap: PropTypes.func,
    /**
     * Fired when the `BottomSheet` is requested to be closed by a click outside the `BottomSheet`.
     *
     * Typically `onRequestClose` is used to set state in the parent component, which is used to control the `BottomSheet`
     * `open` prop.
     *
     * The `reason` parameter can optionally be used to control the response to `onRequestClose`,
     * for example ignoring `clickaway`.
     *
     * @param {string} reason Can be `"clickaway"`
     */
    onRequestClose: PropTypes.func,
    /**
     * Controls whether the `BottomSheet` is opened or not.
     */
    open: PropTypes.bool.isRequired,
    /**
     * Controls whether the `BottomSheet` is modular
     */
    modal: PropTypes.bool,
    /**
     * Controls whether the `BottomSheet` is persistent
     */
    persistent: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState({
      open: this.props.open
    });
  }

  componentDidMount() {
    if (this.state.open) {
      this.setTransitionTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open && nextProps.open) {
      this.setState({
        open: false,
      });
      clearTimeout(this.timerOneAtTheTimeId);
      this.timerOneAtTheTimeId = setTimeout(() => {
        this.setState({
          open: true,
        });
      }, 400);
    } else {
      const open = nextProps.open;
      if (open !== this.props.open){
        this.setState({
          open: open !== null ? open : this.state.open,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.setTransitionTimer();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerTransitionId);
    clearTimeout(this.timerOneAtTheTimeId);
  }

  componentClickAway = () => {
    if (this.timerTransitionId) {
      // If transitioning, don't close the bottom sheet.
      return;
    }

    if (this.props.open !== null && this.props.onRequestClose) {
      this.props.onRequestClose('clickaway');
    } else {
      this.setState({
        open: false
      });
    }
  };

  // Timer that controls delay before click-away events are captured (based on when animation completes)
  setTransitionTimer() {
    this.timerTransitionId = setTimeout(() => {
      this.timerTransitionId = undefined;
    }, 400);
  }

  render() {
    const {
      action,
      children,
      modal,
      persistent,
      contentStyle,
      bodyStyle,
      onRequestClose, // eslint-disable-line no-unused-vars
      onActionTouchTap,
      style,
      ...other,
    } = this.props;

    const {
      open,
    } = this.state;

    const styles = getStyles(this.props, this.context, this.state);

    return (
      <ClickAwayListener onClickAway={open && modal ? this.componentClickAway : null}>
        <Paper {...other} ref="sheet" rounded={false} style={Object.assign(styles.root, style)}>
          <BottomSheetBody
            action={action}
            contentStyle={contentStyle}
            open={open}
            modal={modal}
            persistent={persistent}
            onActionTouchTap={onActionTouchTap}
            style={bodyStyle}
          >
            {children}
          </BottomSheetBody>
        </Paper>
      </ClickAwayListener>
    );
  }
}

export default BottomSheet;
