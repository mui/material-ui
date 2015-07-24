let React = require('react');
let CssEvent = require('./utils/css-event');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let ClickAwayable = require('./mixins/click-awayable');
let FlatButton = require('./flat-button');


let Snackbar = React.createClass({

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
    openOnMount: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      open: this.props.openOnMount || false,
    };
  },

  componentClickAway() {
    this.dismiss();
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._setAutoHideTimer();

        //Only Bind clickaway after transition finishes
        CssEvent.onTransitionEnd(React.findDOMNode(this), () => {
          this._bindClickAway();
        });
      }
      else {
        this._unbindClickAway();
      }
    }
  },

  getTheme() {
    return this.context.muiTheme.component.snackbar;
  },

  getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles() {
    let styles = {
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
    let styles = this.getStyles();

    let actionButton;
    if (action) {
      actionButton = (
        <FlatButton
          style={styles.action}
          label={action}
          onTouchTap={onActionTouchTap} />
      );
    }

    let rootStyles = this.state.open ?
      this.mergeStyles(styles.root, styles.rootWhenOpen, style) :
      this.mergeStyles(styles.root, style);

    return (
      <span {...others} style={rootStyles}>
          <span>{message}</span>
          {actionButton}
      </span>
    );
  },

  show() {
    this.setState({ open: true });
  },

  dismiss() {
    this._clearAutoHideTimer();
    this.setState({ open: false });
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
