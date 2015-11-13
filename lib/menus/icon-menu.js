'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTransitionGroup = require('react-addons-transition-group');
var ClickAwayable = require('../mixins/click-awayable');
var StylePropable = require('../mixins/style-propable');
var Events = require('../utils/events');
var PropTypes = require('../utils/prop-types');
var Menu = require('../menus/menu');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var IconMenu = React.createClass({
  displayName: 'IconMenu',

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    closeOnItemTouchTap: React.PropTypes.bool,
    iconButtonElement: React.PropTypes.element.isRequired,
    iconStyle: React.PropTypes.object,
    openDirection: PropTypes.corners,
    onItemTouchTap: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    menuStyle: React.PropTypes.object,
    style: React.PropTypes.object,
    touchTapCloseDelay: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeOnItemTouchTap: true,
      openDirection: 'bottom-left',
      onItemTouchTap: function onItemTouchTap() {},
      onKeyboardFocus: function onKeyboardFocus() {},
      onMouseDown: function onMouseDown() {},
      onMouseLeave: function onMouseLeave() {},
      onMouseEnter: function onMouseEnter() {},
      onMouseUp: function onMouseUp() {},
      onTouchTap: function onTouchTap() {},
      touchTapCloseDelay: 200
    };
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      menuInitiallyKeyboardFocused: false,
      open: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
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
    var className = _props.className;
    var closeOnItemTouchTap = _props.closeOnItemTouchTap;
    var iconButtonElement = _props.iconButtonElement;
    var iconStyle = _props.iconStyle;
    var openDirection = _props.openDirection;
    var onItemTouchTap = _props.onItemTouchTap;
    var onKeyboardFocus = _props.onKeyboardFocus;
    var onMouseDown = _props.onMouseDown;
    var onMouseLeave = _props.onMouseLeave;
    var onMouseEnter = _props.onMouseEnter;
    var onMouseUp = _props.onMouseUp;
    var onTouchTap = _props.onTouchTap;
    var menuStyle = _props.menuStyle;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'closeOnItemTouchTap', 'iconButtonElement', 'iconStyle', 'openDirection', 'onItemTouchTap', 'onKeyboardFocus', 'onMouseDown', 'onMouseLeave', 'onMouseEnter', 'onMouseUp', 'onTouchTap', 'menuStyle', 'style']);

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

    var mergedRootStyles = this.prepareStyles(styles.root, style);
    var mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    var iconButton = React.cloneElement(iconButtonElement, {
      onKeyboardFocus: this.props.onKeyboardFocus,
      iconStyle: this.mergeStyles(iconStyle, iconButtonElement.props.iconStyle),
      onTouchTap: function onTouchTap(e) {
        _this.open(Events.isKeyboard(e));
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      },
      ref: this.state.iconButtonRef
    });

    var menu = open ? React.createElement(
      Menu,
      _extends({}, other, {
        animated: true,
        initiallyKeyboardFocused: this.state.menuInitiallyKeyboardFocused,
        onEscKeyDown: this._handleMenuEscKeyDown,
        onItemTouchTap: this._handleItemTouchTap,
        openDirection: openDirection,
        style: mergedMenuStyles }),
      this.props.children
    ) : null;

    return React.createElement(
      'div',
      {
        className: className,
        onMouseDown: onMouseDown,
        onMouseLeave: onMouseLeave,
        onMouseEnter: onMouseEnter,
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

  isOpen: function isOpen() {
    return this.state.open;
  },

  close: function close(isKeyboard) {
    var _this2 = this;

    if (this.state.open) {
      this.setState({ open: false }, function () {
        //Set focus on the icon button when the menu close
        if (isKeyboard) {
          var iconButton = _this2.refs[_this2.state.iconButtonRef];
          ReactDOM.findDOMNode(iconButton).focus();
          iconButton.setKeyboardFocus();
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

    if (this.props.closeOnItemTouchTap) {
      (function () {
        var isKeyboard = Events.isKeyboard(e);

        _this3._timeout = setTimeout(function () {
          _this3.close(isKeyboard);
        }, _this3.props.touchTapCloseDelay);
      })();
    }

    this.props.onItemTouchTap(e, child);
  },

  _handleMenuEscKeyDown: function _handleMenuEscKeyDown() {
    this.close(true);
  }

});

module.exports = IconMenu;