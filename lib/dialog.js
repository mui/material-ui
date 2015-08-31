'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var WindowListenable = require('./mixins/window-listenable');
var CssEvent = require('./utils/css-event');
var KeyCode = require('./utils/key-code');
var Transitions = require('./styles/transitions');
var StylePropable = require('./mixins/style-propable');
var FlatButton = require('./flat-button');
var Overlay = require('./overlay');
var Paper = require('./paper');

var ReactTransitionGroup = React.addons.TransitionGroup;

var TransitionItem = React.createClass({
  displayName: 'TransitionItem',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      style: {}
    };
  },

  componentWillEnter: function componentWillEnter(callback) {
    var spacing = this.context.muiTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: 'translate3d(0, ' + spacing.desktopKeylineIncrement + 'px, 0)'
      }
    });

    setTimeout(callback, 450); // matches transition duration
  },

  componentWillLeave: function componentWillLeave(callback) {
    var _this = this;

    this.setState({
      style: {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)'
      }
    });

    setTimeout((function () {
      if (_this.isMounted()) callback();
    }).bind(this), 450); // matches transition duration
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['style']);

    return React.createElement(
      'div',
      _extends({}, other, { style: this.mergeAndPrefix(this.state.style, style) }),
      this.props.children
    );
  }
});

var Dialog = React.createClass({
  displayName: 'Dialog',

  mixins: [WindowListenable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    actions: React.PropTypes.array,
    autoDetectWindowHeight: React.PropTypes.bool,
    autoScrollBodyContent: React.PropTypes.bool,
    bodyStyle: React.PropTypes.object,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    modal: React.PropTypes.bool,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool,
    title: React.PropTypes.node
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
    resize: '_positionDialog'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoDetectWindowHeight: false,
      autoScrollBodyContent: false,
      actions: [],
      modal: false,
      repositionOnUpdate: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.openImmediately || false
    };
  },

  componentDidMount: function componentDidMount() {
    this._positionDialog();
    if (this.props.openImmediately) {
      this.refs.dialogOverlay.preventScrolling();
      this._onShow();
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    this._positionDialog();
  },

  getStyles: function getStyles() {
    var spacing = this.context.muiTheme.spacing;

    var main = {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      zIndex: 10,
      top: 0,
      left: -10000,
      width: '100%',
      height: '100%',
      transition: Transitions.easeOut('0ms', 'left', '450ms')
    };

    var content = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      transition: Transitions.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: 10
    };

    var body = {
      padding: spacing.desktopGutter,
      overflowY: this.props.autoScrollBodyContent ? 'auto' : 'hidden',
      overflowX: 'hidden'
    };

    var gutter = spacing.desktopGutter + 'px ';
    var title = {
      margin: 0,
      padding: gutter + gutter + '0 ' + gutter,
      color: this.context.muiTheme.palette.textColor,
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: '400'
    };

    if (this.state.open) {
      main = this.mergeAndPrefix(main, {
        left: 0,
        transition: Transitions.easeOut('0ms', 'left', '0ms')
      });
    }

    return {
      main: this.mergeAndPrefix(main, this.props.style),
      content: this.mergeAndPrefix(content, this.props.contentStyle),
      paper: {
        background: this.context.muiTheme.canvasColor
      },
      body: this.mergeStyles(body, this.props.bodyStyle),
      title: this.mergeStyles(title, this.props.titleStyle)
    };
  },

  render: function render() {
    var styles = this.getStyles();
    var actions = this._getActionsContainer(this.props.actions);
    var title = undefined;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ? React.createElement(
        'h3',
        { style: styles.title },
        this.props.title
      ) : this.props.title;
    }

    return React.createElement(
      'div',
      { ref: 'container', style: styles.main },
      React.createElement(
        ReactTransitionGroup,
        { component: 'div', ref: 'dialogWindow' },
        this.state.open && React.createElement(
          TransitionItem,
          {
            className: this.props.contentClassName,
            style: styles.content },
          React.createElement(
            Paper,
            {
              style: styles.paper,
              zDepth: 4 },
            title,
            React.createElement(
              'div',
              { ref: 'dialogContent', style: styles.body },
              this.props.children
            ),
            actions
          )
        )
      ),
      React.createElement(Overlay, {
        ref: 'dialogOverlay',
        show: this.state.open,
        autoLockScrolling: false,
        onTouchTap: this._handleOverlayTouchTap })
    );
  },

  isOpen: function isOpen() {
    return this.state.open;
  },

  dismiss: function dismiss() {
    var _this2 = this;

    CssEvent.onTransitionEnd(this.getDOMNode(), (function () {
      _this2.refs.dialogOverlay.allowScrolling();
    }).bind(this));

    this.setState({ open: false });
    this._onDismiss();
  },

  show: function show() {
    this.refs.dialogOverlay.preventScrolling();
    this.setState({ open: true }, this._onShow);
  },

  _getAction: function _getAction(actionJSON, key) {
    var _this3 = this;

    var styles = { marginRight: 8 };
    var props = {
      key: key,
      secondary: true,
      onClick: actionJSON.onClick,
      onTouchTap: function onTouchTap() {
        if (actionJSON.onTouchTap) {
          actionJSON.onTouchTap.call(undefined);
        }
        if (!(actionJSON.onClick || actionJSON.onTouchTap)) {
          _this3.dismiss();
        }
      },
      label: actionJSON.text,
      style: styles
    };
    if (actionJSON.ref) {
      props.ref = actionJSON.ref;
      props.keyboardFocused = actionJSON.ref === this.props.actionFocus;
    }

    return React.createElement(FlatButton, props);
  },

  _getActionsContainer: function _getActionsContainer(actions) {
    var actionContainer = undefined;
    var actionObjects = [];
    var actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      padding: 8,
      marginBottom: 8,
      width: '100%',
      textAlign: 'right'
    };

    if (actions.length) {
      for (var i = 0; i < actions.length; i++) {
        var currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }

        actionObjects.push(currentAction);
      }

      actionContainer = React.createElement(
        'div',
        { style: actionStyle },
        actionObjects
      );
    }

    return actionContainer;
  },

  _positionDialog: function _positionDialog() {
    if (this.state.open) {
      var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var container = this.getDOMNode();
      var dialogWindow = this.refs.dialogWindow.getDOMNode();
      var dialogContent = this.refs.dialogContent.getDOMNode();
      var minPaddingTop = 16;

      //Reset the height in case the window was resized.
      dialogWindow.style.height = '';
      dialogContent.style.height = '';

      var dialogWindowHeight = dialogWindow.offsetHeight;
      var paddingTop = (clientHeight - dialogWindowHeight) / 2 - 64;
      if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

      //Vertically center the dialog window, but make sure it doesn't
      //transition to that position.
      if (this.props.repositionOnUpdate || !container.style.paddingTop) {
        container.style.paddingTop = paddingTop + 'px';
      }

      // Force a height if the dialog is taller than clientHeight
      if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
        var styles = this.getStyles();
        var maxDialogContentHeight = clientHeight - 2 * (styles.body.padding + 64);

        if (this.props.title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;
        if (this.props.actions) maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;

        dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
      }
    }
  },

  _onShow: function _onShow() {
    if (this.props.onShow) this.props.onShow();
  },

  _onDismiss: function _onDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleOverlayTouchTap: function _handleOverlayTouchTap(e) {
    if (this.props.modal) {
      e.stopPropagation();
    } else {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    if (e.keyCode === KeyCode.ESC && !this.props.modal) {
      this.dismiss();
    }
  }

});

module.exports = Dialog;