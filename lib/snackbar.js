'use strict';

var React = require('react');
var CssEvent = require('./utils/css-event');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ClickAwayable = require('./mixins/click-awayable');
var FlatButton = require('./flat-button');

var Snackbar = React.createClass({
  displayName: 'Snackbar',

  mixins: [StylePropable, ClickAwayable],

  manuallyBindClickAway: true,

  // ID of the active timer.
  _autoHideTimerId: undefined,

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    message: React.PropTypes.string.isRequired,
    action: React.PropTypes.string,
    autoHideDuration: React.PropTypes.number,
    onActionTouchTap: React.PropTypes.func,
    openOnMount: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.openOnMount || false
    };
  },

  componentClickAway: function componentClickAway() {
    this.dismiss();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var _this = this;

    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._setAutoHideTimer();

        //Only Bind clickaway after transition finishes
        CssEvent.onTransitionEnd(React.findDOMNode(this), function () {
          _this._bindClickAway();
        });
      } else {
        this._unbindClickAway();
      }
    }
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.snackbar;
  },

  getSpacing: function getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function getStyles() {
    var styles = {
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

        left: -10000,
        opacity: 0,
        transform: 'translate3d(0, 20px, 0)',
        transition: Transitions.easeOut('0ms', 'left', '400ms') + ',' + Transitions.easeOut('400ms', 'opacity') + ',' + Transitions.easeOut('400ms', 'transform')
      },
      action: {
        color: this.getTheme().actionColor,
        float: 'right',
        marginTop: 6,
        marginRight: -16,
        marginLeft: this.getSpacing().desktopGutter,
        backgroundColor: 'transparent'
      },
      rootWhenOpen: {
        left: '0px',
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        transition: Transitions.easeOut('0ms', 'left', '0ms') + ',' + Transitions.easeOut('400ms', 'opacity', '0ms') + ',' + Transitions.easeOut('400ms', 'transform', '0ms')
      }
    };

    return styles;
  },

  render: function render() {
    var styles = this.getStyles();

    var action = undefined;
    if (this.props.action) {
      action = React.createElement(FlatButton, {
        style: styles.action,
        label: this.props.action,
        onTouchTap: this.props.onActionTouchTap });
    }

    var rootStyles = this.state.open ? this.mergeStyles(styles.root, styles.rootWhenOpen, this.props.style) : this.mergeStyles(styles.root, this.props.style);

    return React.createElement(
      'span',
      { style: rootStyles },
      React.createElement(
        'span',
        null,
        this.props.message
      ),
      action
    );
  },

  show: function show() {
    this.setState({ open: true });
  },

  dismiss: function dismiss() {
    this._clearAutoHideTimer();
    this.setState({ open: false });
  },

  _clearAutoHideTimer: function _clearAutoHideTimer() {
    if (this._autoHideTimerId !== undefined) {
      this._autoHideTimerId = clearTimeout(this._autoHideTimerId);
    }
  },

  _setAutoHideTimer: function _setAutoHideTimer() {
    var _this2 = this;

    if (this.props.autoHideDuration > 0) {
      this._clearAutoHideTimer();
      this._autoHideTimerId = setTimeout(function () {
        _this2.dismiss();
      }, this.props.autoHideDuration);
    }
  }

});

module.exports = Snackbar;