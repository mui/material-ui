'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var ClickAwayable = require('../mixins/click-awayable');
var Controllable = require('../mixins/controllable');
var StylePropable = require('../mixins/style-propable');
var Children = require('../utils/children');
var KeyCode = require('../utils/key-code');
var Menu = require('../menus/menu');

var IconMenu = React.createClass({
  displayName: 'IconMenu',

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    desktop: React.PropTypes.bool,
    iconButtonElement: React.PropTypes.element.isRequired,
    multiple: React.PropTypes.bool,
    openDirection: React.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    onItemTouchTap: React.PropTypes.func,
    menuListStyle: React.PropTypes.object,
    onKeyDown: React.PropTypes.func,
    width: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onKeyDown: function onKeyDown() {},
      onItemTouchTap: function onItemTouchTap() {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },

  componentClickAway: function componentClickAway() {
    this.close();
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var desktop = _props.desktop;
    var iconButtonElement = _props.iconButtonElement;
    var multiple = _props.multiple;
    var openDirection = _props.openDirection;
    var onChange = _props.onChange;
    var onKeyDown = _props.onKeyDown;
    var onItemTouchTap = _props.onItemTouchTap;
    var menuListStyle = _props.menuListStyle;
    var style = _props.style;
    var value = _props.value;
    var valueLink = _props.valueLink;
    var width = _props.width;

    var other = _objectWithoutProperties(_props, ['desktop', 'iconButtonElement', 'multiple', 'openDirection', 'onChange', 'onKeyDown', 'onItemTouchTap', 'menuListStyle', 'style', 'value', 'valueLink', 'width']);

    var open = this.state.open;

    var styles = {
      root: {
        display: 'inline-block',
        position: 'relative'
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);

    var iconButton = React.cloneElement(iconButtonElement, {
      onKeyboardActivate: this._handleIconButtonKeyboardActivate,
      onTouchTap: (function (e) {
        _this.open();
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      }).bind(this)
    });

    return React.createElement(
      'div',
      _extends({}, other, {
        style: mergedRootStyles,
        onKeyDown: this._handleKeyDown }),
      iconButton,
      React.createElement(
        Menu,
        {
          desktop: desktop,
          menuListStyle: menuListStyle,
          multiple: multiple,
          onItemTouchTap: this._handleItemTouchTap,
          onChange: onChange,
          open: open,
          openDirection: openDirection,
          ref: 'menu',
          value: value,
          valueLink: valueLink,
          width: width },
        this.props.children
      )
    );
  },

  close: function close() {
    if (!this.state.close) {
      this.setState({
        open: false
      });
    }
  },

  open: function open() {
    if (!this.state.open) {
      this.setState({
        open: true
      });
    }
  },

  _handleIconButtonKeyboardActivate: function _handleIconButtonKeyboardActivate(e) {
    this.refs.menu.setKeyboardFocusIndex(0);
  },

  _handleKeyDown: function _handleKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.ESC:
        this.close();
        break;
    }
    this.props.onKeyDown(e);
  },

  _handleItemTouchTap: function _handleItemTouchTap(e, child) {
    var _this2 = this;

    setTimeout(function () {
      _this2.close();
      _this2.props.onItemTouchTap(e, child);
    }, 200);
  }
});

module.exports = IconMenu;