'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ClickAwayable = require('./mixins/click-awayable');
var FlatButton = require('./flat-button');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');
var ContextPure = require('./mixins/context-pure');
var StyleResizable = require('./mixins/style-resizable');

var Snackbar = React.createClass({
  displayName: 'Snackbar',

  mixins: [StylePropable, StyleResizable, ClickAwayable, ContextPure],

  manuallyBindClickAway: true,

  // ID of the active timer.
  _autoHideTimerId: undefined,

  _oneAtTheTimeTimerId: undefined,

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      openOnMount: false
    };
  },

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      var theme = muiTheme.snackbar;
      var spacing = muiTheme.rawTheme.spacing;

      return {
        textColor: theme.textColor,
        backgroundColor: theme.backgroundColor,
        desktopGutter: spacing.desktopGutter,
        desktopSubheaderHeight: spacing.desktopSubheaderHeight,
        actionColor: theme.actionColor
      };
    },
    getChildrenClasses: function getChildrenClasses() {
      return [FlatButton];
    }
  },

  propTypes: {
    message: React.PropTypes.node.isRequired,
    action: React.PropTypes.string,
    autoHideDuration: React.PropTypes.number,
    onActionTouchTap: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    openOnMount: React.PropTypes.bool,
    style: React.PropTypes.object,
    bodyStyle: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.openOnMount,
      message: this.props.message,
      action: this.props.action,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var _this = this;

    //to update theme inside state whenever a new theme is passed down
    //from the parent / owner using context
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (this.state.open && (nextProps.message !== this.props.message || nextProps.action !== this.props.action)) {
      this.setState({
        open: false
      });

      clearTimeout(this._oneAtTheTimeTimerId);
      this._oneAtTheTimeTimerId = setTimeout(function () {
        if (_this.isMounted()) {
          _this.setState({
            message: nextProps.message,
            action: nextProps.action,
            open: true
          });
        }
      }, 400);
    } else {
      this.setState({
        message: nextProps.message,
        action: nextProps.action
      });
    }
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
    var _this2 = this;

    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._setAutoHideTimer();

        //Only Bind clickaway after transition finishes
        setTimeout(function () {
          if (_this2.isMounted()) {
            _this2._bindClickAway();
          }
        }, 400);
      } else {
        clearTimeout(this._autoHideTimerId);
        this._unbindClickAway();
      }
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._autoHideTimerId);
    this._unbindClickAway();
  },

  getStyles: function getStyles() {
    var _constructor$getRelevantContextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var textColor = _constructor$getRelevantContextKeys.textColor;
    var backgroundColor = _constructor$getRelevantContextKeys.backgroundColor;
    var desktopGutter = _constructor$getRelevantContextKeys.desktopGutter;
    var desktopSubheaderHeight = _constructor$getRelevantContextKeys.desktopSubheaderHeight;
    var actionColor = _constructor$getRelevantContextKeys.actionColor;

    var isSmall = this.state.deviceSize === this.constructor.Sizes.SMALL;

    var styles = {
      root: {
        position: 'fixed',
        left: 0,
        display: '-webkit-box; display: -webkit-flex; display: flex',
        right: 0,
        bottom: 0,
        zIndex: 10,
        visibility: 'hidden',
        transform: 'translate3d(0, ' + desktopSubheaderHeight + 'px, 0)',
        transition: Transitions.easeOut('400ms', 'transform') + ',' + Transitions.easeOut('400ms', 'visibility')
      },
      rootWhenOpen: {
        visibility: 'visible',
        transform: 'translate3d(0, 0, 0)'
      },
      body: {
        backgroundColor: backgroundColor,
        padding: '0 ' + desktopGutter + 'px',
        height: desktopSubheaderHeight,
        lineHeight: desktopSubheaderHeight + 'px',
        borderRadius: isSmall ? 0 : 2,
        maxWidth: isSmall ? 'inherit' : 568,
        minWidth: isSmall ? 'inherit' : 288,
        flexGrow: isSmall ? 1 : 0,
        margin: 'auto'
      },
      content: {
        fontSize: 14,
        color: textColor,
        opacity: 0,
        transition: Transitions.easeOut('400ms', 'opacity')
      },
      contentWhenOpen: {
        opacity: 1,
        transition: Transitions.easeOut('500ms', 'opacity', '100ms')
      },
      action: {
        color: actionColor,
        float: 'right',
        marginTop: 6,
        marginRight: -16,
        marginLeft: desktopGutter,
        backgroundColor: 'transparent'
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var onActionTouchTap = _props.onActionTouchTap;
    var style = _props.style;
    var bodyStyle = _props.bodyStyle;

    var others = _objectWithoutProperties(_props, ['onActionTouchTap', 'style', 'bodyStyle']);

    var styles = this.getStyles();

    var _state = this.state;
    var open = _state.open;
    var action = _state.action;
    var message = _state.message;

    var rootStyles = open ? this.mergeStyles(styles.root, styles.rootWhenOpen, style) : this.mergeStyles(styles.root, style);

    var actionButton = undefined;
    if (action) {
      actionButton = React.createElement(FlatButton, {
        style: styles.action,
        label: action,
        onTouchTap: onActionTouchTap });
    }

    var mergedBodyStyle = this.mergeStyles(styles.body, bodyStyle);

    var contentStyle = open ? this.mergeStyles(styles.content, styles.contentWhenOpen) : styles.content;

    return React.createElement(
      'div',
      _extends({}, others, { style: rootStyles }),
      React.createElement(
        'div',
        { style: mergedBodyStyle },
        React.createElement(
          'div',
          { style: contentStyle },
          React.createElement(
            'span',
            null,
            message
          ),
          actionButton
        )
      )
    );
  },

  show: function show() {
    this.setState({
      open: true
    });

    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  dismiss: function dismiss() {
    this.setState({
      open: false
    });

    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _setAutoHideTimer: function _setAutoHideTimer() {
    var _this3 = this;

    if (this.props.autoHideDuration > 0) {
      clearTimeout(this._autoHideTimerId);
      this._autoHideTimerId = setTimeout(function () {
        if (_this3.isMounted()) {
          _this3.dismiss();
        }
      }, this.props.autoHideDuration);
    }
  }

});

module.exports = Snackbar;