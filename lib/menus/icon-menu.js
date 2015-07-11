'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var ClickAwayable = require('../mixins/click-awayable');
var StylePropable = require('../mixins/style-propable');
var Events = require('../utils/events');
var Menu = require('../menus/menu');

var IconMenu = React.createClass({
  displayName: 'IconMenu',

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    iconButtonElement: React.PropTypes.element.isRequired,
    openDirection: React.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    onItemKeyboardActivate: React.PropTypes.func,
    onItemTouchTap: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    menuStyle: React.PropTypes.object,
    touchTapCloseDelay: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      openDirection: 'bottom-left',
      onItemKeyboardActivate: function onItemKeyboardActivate() {},
      onItemTouchTap: function onItemTouchTap() {},
      onKeyboardFocus: function onKeyboardFocus() {},
      onMouseDown: function onMouseDown() {},
      onMouseOut: function onMouseOut() {},
      onMouseOver: function onMouseOver() {},
      onMouseUp: function onMouseUp() {},
      onTouchTap: function onTouchTap() {},
      touchTapCloseDelay: 200
    };
  },

  getInitialState: function getInitialState() {
    return {
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      menuInitiallyKeyboardFocused: false,
      open: false
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this._timeout) clearTimeout(this._timeout);
  },

  componentClickAway: function componentClickAway() {
    this.close();
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var iconButtonElement = _props.iconButtonElement;
    var openDirection = _props.openDirection;
    var onItemTouchTap = _props.onItemTouchTap;
    var onKeyboardFocus = _props.onKeyboardFocus;
    var onMouseDown = _props.onMouseDown;
    var onMouseOut = _props.onMouseOut;
    var onMouseOver = _props.onMouseOver;
    var onMouseUp = _props.onMouseUp;
    var onTouchTap = _props.onTouchTap;
    var menuStyle = _props.menuStyle;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['iconButtonElement', 'openDirection', 'onItemTouchTap', 'onKeyboardFocus', 'onMouseDown', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onTouchTap', 'menuStyle', 'style']);

    var open = this.state.open;
    var openDown = openDirection.split('-')[0] === 'bottom';
    var openLeft = openDirection.split('-')[1] === 'left';

    var styles = {
      root: {
        display: 'inline-block',
        position: 'relative'
      },

      menu: {
        top: openDown ? 12 : null,
        bottom: !openDown ? 12 : null,
        left: !openLeft ? 12 : null,
        right: openLeft ? 12 : null
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    var iconButton = React.cloneElement(iconButtonElement, {
      onKeyboardFocus: this.props.onKeyboardFocus,
      onTouchTap: (function (e) {
        _this.open(Events.isKeyboard(e));
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      }).bind(this),
      ref: this.state.iconButtonRef
    });

    var menu = open ? React.createElement(
      Menu,
      _extends({}, other, {
        initiallyKeyboardFocused: this.state.menuInitiallyKeyboardFocused,
        onEscKeyDown: this.close,
        onItemTouchTap: this._handleItemTouchTap,
        openDirection: openDirection,
        style: mergedMenuStyles }),
      this.props.children
    ) : null;

    return React.createElement(
      'div',
      {
        onMouseDown: onMouseDown,
        onMouseOut: onMouseOut,
        onMouseOver: onMouseOver,
        onMouseUp: onMouseUp,
        onTouchTap: onTouchTap,
        style: mergedRootStyles },
      iconButton,
      React.createElement(
        ReactTransitionGroup,
        null,
        menu
      )
    );
  },

  close: function close(isKeyboard) {
    var _this2 = this;

    if (this.state.open) {
      this.setState({ open: false }, function () {
        //Set focus on the icon button when the menu close
        if (isKeyboard) {
          var iconButton = _this2.refs[_this2.state.iconButtonRef];
          React.findDOMNode(iconButton).focus();
        }
      });
    }
  },

  open: function open(menuInitiallyKeyboardFocused) {
    if (!this.state.open) {
      this.setState({
        open: true,
        menuInitiallyKeyboardFocused: menuInitiallyKeyboardFocused
      });
    }
  },

  _handleItemTouchTap: function _handleItemTouchTap(e, child) {
    var _this3 = this;

    var isKeyboard = Events.isKeyboard(e);

    this._timeout = setTimeout(function () {
      _this3.close(isKeyboard);
    }, this.props.touchTapCloseDelay);

    if (isKeyboard) {
      this.refs[this.state.iconButtonRef].setKeyboardFocus();
    }

    this.props.onItemTouchTap(e, child);
  }
});

module.exports = IconMenu;