'use strict';

var React = require('react');
var WindowListenable = require('./mixins/window-listenable');
var CssEvent = require('./utils/css-event');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var FlatButton = require('./flat-button');
var Overlay = require('./overlay');
var Paper = require('./paper');

var DialogWindow = React.createClass({
  displayName: 'DialogWindow',

  closeable: false,

  mixins: [WindowListenable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    actions: React.PropTypes.array,
    actionFocus: React.PropTypes.string,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool,
    modal: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp',
    'resize': '_positionDialog'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      actions: [],
      repositionOnUpdate: true,
      modal: false
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
      this.show();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this._positionDialog();
    this._focusOnAction();
  },

  getTheme: function getTheme() {
    return this.context.muiTheme;
  },

  getSpacing: function getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        position: 'fixed',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        zIndex: 10,
        top: 0,
        left: -10000,
        width: '100%',
        height: '100%',
        transition: Transitions.easeOut('0ms', 'left', '450ms'),
        color: this.getTheme().palette.textColor
      },
      contents: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        transition: Transitions.easeOut(),
        position: 'relative',
        width: '75%',
        maxWidth: this.getSpacing().desktopKeylineIncrement * 12,
        margin: '0 auto',
        zIndex: 10,
        background: this.getTheme().palette.canvasColor,
        opacity: 0
      },
      rootWhenOpen: {
        left: 2,
        transition: Transitions.easeOut('0ms', 'left', '0ms')
      },
      contentsWhenOpen: {
        opacity: 1,
        top: 0,
        transform: 'translate3d(0, ' + this.getSpacing().desktopKeylineIncrement + 'px, 0)'
      }
    };
    return styles;
  },

  render: function render() {
    var actions = this._getActionsContainer(this.props.actions);
    var styles = this.getStyles();

    return React.createElement(
      'div',
      { ref: 'container', style: this.mergeAndPrefix(styles.root, this.props.style, this.state.open && styles.rootWhenOpen) },
      React.createElement(
        Paper,
        {
          ref: 'dialogWindow',
          style: this.mergeAndPrefix(styles.contents, this.props.contentStyle, this.state.open && styles.contentsWhenOpen),
          className: this.props.contentClassName,
          zDepth: 4 },
        this.props.children,
        actions
      ),
      React.createElement(Overlay, { ref: 'dialogOverlay', show: this.state.open, autoLockScrolling: false, onTouchTap: this._handleOverlayTouchTap })
    );
  },

  isOpen: function isOpen() {
    return this.state.open;
  },

  dismiss: function dismiss() {
    var _this = this;

    if (this.closeable) {
      CssEvent.onTransitionEnd(React.findDOMNode(this), function () {
        _this.refs.dialogOverlay.allowScrolling();
      });

      this.setState({ open: false });
      this._onDismiss();
    }
  },

  show: function show() {
    var _this2 = this;

    // prevent rapid show/hide
    setTimeout(function () {
      _this2.closeable = true;
    }, 250);

    this.refs.dialogOverlay.preventScrolling();
    this._focusOnAction();
    this.setState({ open: true });
    this._onShow();
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
    //json w/ refs
    var actionContainer = undefined;
    var actionObjects = [];
    var actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(s0,0,0,0)',
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
    var container = React.findDOMNode(this);
    var dialogWindow = React.findDOMNode(this.refs.dialogWindow);
    var containerHeight = container.offsetHeight;
    var dialogWindowHeight = dialogWindow.offsetHeight;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';

    var paddingTop = Math.max((containerHeight - dialogWindowHeight) / 2 - 64, 0);

    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
    }
  },

  _focusOnAction: function _focusOnAction() {
    if (this.props.actionFocus) {
      React.findDOMNode(this.refs[this.props.actionFocus]).focus();
    }
  },

  _onShow: function _onShow() {
    if (this.props.onShow) this.props.onShow();
  },

  _onDismiss: function _onDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleOverlayTouchTap: function _handleOverlayTouchTap() {
    if (!this.props.modal && this.closeable) {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    if (!this.props.modal && e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = DialogWindow;