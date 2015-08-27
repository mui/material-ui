'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    openOnMount: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.openOnMount || false
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.openOnMount) {
      this._setAutoHideTimer();
      this._bindClickAway();
    }
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

  componentWillUnmount: function componentWillUnmount() {
    this._clearAutoHideTimer();
    this._unbindClickAway();
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

        left: 0,
        opacity: 0,
        visibility: 'hidden',
        transform: 'translate3d(0, 20px, 0)',
        transition: Transitions.easeOut('0ms', 'left', '400ms') + ',' + Transitions.easeOut('400ms', 'opacity') + ',' + Transitions.easeOut('400ms', 'transform') + ',' + Transitions.easeOut('400ms', 'visibility')
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
        opacity: 1,
        visibility: 'visible',
        transform: 'translate3d(0, 0, 0)',
        transition: Transitions.easeOut('0ms', 'left', '0ms') + ',' + Transitions.easeOut('400ms', 'opacity', '0ms') + ',' + Transitions.easeOut('400ms', 'transform', '0ms') + ',' + Transitions.easeOut('400ms', 'visibility', '0ms')
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var action = _props.action;
    var message = _props.message;
    var onActionTouchTap = _props.onActionTouchTap;
    var style = _props.style;

    var others = _objectWithoutProperties(_props, ['action', 'message', 'onActionTouchTap', 'style']);

    var styles = this.getStyles();

    var rootStyles = this.state.open ? this.mergeStyles(styles.root, styles.rootWhenOpen, style) : this.mergeStyles(styles.root, style);

    var actionButton = undefined;
    if (action) {
      actionButton = React.createElement(FlatButton, {
        style: styles.action,
        label: action,
        onTouchTap: onActionTouchTap });
    }

    return React.createElement(
      'span',
      _extends({}, others, { style: rootStyles }),
      React.createElement(
        'span',
        null,
        message
      ),
      actionButton
    );
  },

  show: function show() {
    this.setState({ open: true });
    if (this.props.onShow) this.props.onShow();
  },

  dismiss: function dismiss() {
    this._clearAutoHideTimer();
    this.setState({ open: false });
    if (this.props.onDismiss) this.props.onDismiss();
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