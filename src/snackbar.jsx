const React = require('react');
const ReactDOM = require('react-dom');
const CssEvent = require('./utils/css-event');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const ClickAwayable = require('./mixins/click-awayable');
const FlatButton = require('./flat-button');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');

const Snackbar = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  manuallyBindClickAway: true,

  // ID of the active timer.
  _autoHideTimerId: undefined,

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    message: React.PropTypes.string.isRequired,
    action: React.PropTypes.string,
    autoHideDuration: React.PropTypes.number,
    onActionTouchTap: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    openOnMount: React.PropTypes.bool,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      open: this.props.openOnMount || false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentDidMount() {
    if (this.props.openOnMount) {
      this._setAutoHideTimer();
      this._bindClickAway();
    }
  },

  componentClickAway() {
    this.dismiss();
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._setAutoHideTimer();

        //Only Bind clickaway after transition finishes
        CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this), () => {
          this._bindClickAway();
        });
      }
      else {
        this._unbindClickAway();
      }
    }
  },

  componentWillUnmount() {
    this._clearAutoHideTimer();
    this._unbindClickAway();
  },

  getTheme() {
    return this.state.muiTheme.snackbar;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    const styles = {
      root: {
        color: this.getTheme().textColor,
        backgroundColor: this.getTheme().backgroundColor,
        borderRadius: 2,
        padding: '0px ' + this.getSpacing().desktopGutter + 'px',
        height: this.getSpacing().desktopSubheaderHeight,
        lineHeight: this.getSpacing().desktopSubheaderHeight + 'px',
        minWidth: 288,
        maxWidth: 568,

        position: 'fixed',
        zIndex: 10,
        bottom: this.getSpacing().desktopGutter,
        marginLeft: this.getSpacing().desktopGutter,

        left: 0,
        opacity: 0,
        visibility: 'hidden',
        transform: 'translate3d(0, 20px, 0)',
        transition:
          Transitions.easeOut('0ms', 'left', '400ms') + ',' +
          Transitions.easeOut('400ms', 'opacity') + ',' +
          Transitions.easeOut('400ms', 'transform') + ',' +
          Transitions.easeOut('400ms', 'visibility'),
      },
      action: {
        color: this.getTheme().actionColor,
        float: 'right',
        marginTop: 6,
        marginRight: -16,
        marginLeft: this.getSpacing().desktopGutter,
        backgroundColor: 'transparent',
      },
      rootWhenOpen: {
        opacity: 1,
        visibility: 'visible',
        transform: 'translate3d(0, 0, 0)',
        transition:
          Transitions.easeOut('0ms', 'left', '0ms') + ',' +
          Transitions.easeOut('400ms', 'opacity', '0ms') + ',' +
          Transitions.easeOut('400ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('400ms', 'visibility', '0ms'),
      },
    };

    return styles;
  },

  render() {
    const {action, message, onActionTouchTap, style, ...others } = this.props;
    const styles = this.getStyles();

    const rootStyles = this.state.open ?
      this.prepareStyles(styles.root, styles.rootWhenOpen, style) :
      this.prepareStyles(styles.root, style);

    let actionButton;
    if (action) {
      actionButton = (
        <FlatButton
          style={styles.action}
          label={action}
          onTouchTap={onActionTouchTap} />
      );
    }

    return (
      <span {...others} style={rootStyles}>
        <span>{message}</span>
        {actionButton}
      </span>
    );
  },

  show() {
    this.setState({ open: true });
    if (this.props.onShow) this.props.onShow();
  },

  dismiss() {
    this._clearAutoHideTimer();
    this.setState({ open: false });
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _clearAutoHideTimer() {
    if (this._autoHideTimerId !== undefined) {
      this._autoHideTimerId = clearTimeout(this._autoHideTimerId);
    }
  },

  _setAutoHideTimer() {
    if (this.props.autoHideDuration > 0) {
      this._clearAutoHideTimer();
      this._autoHideTimerId = setTimeout(() => { this.dismiss(); }, this.props.autoHideDuration);
    }
  },

});

module.exports = Snackbar;
