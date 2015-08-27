'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ClickAwayable = require('./mixins/click-awayable');
var FontIcon = require('./font-icon');
var Menu = require('./menu/menu');

var DropDownIcon = React.createClass({
  displayName: 'DropDownIcon',

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    closeOnMenuItemTouchTap: React.PropTypes.bool,
    iconStyle: React.PropTypes.object,
    iconClassName: React.PropTypes.string,
    iconLigature: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeOnMenuItemTouchTap: true
    };
  },

  componentDidMount: function componentDidMount() {
    // This component can be deprecated once ./menu/menu has been deprecated.
    // if (process.env.NODE_ENV !== 'production') {
    //   console.warn('DropDownIcon has been deprecated. Use IconMenu instead.');
    // }
  },

  componentClickAway: function componentClickAway() {
    this.setState({ open: false });
  },

  getStyles: function getStyles() {
    var spacing = this.context.muiTheme.spacing;
    var iconWidth = 48;
    var styles = {
      root: {
        display: 'inline-block',
        width: iconWidth + 'px !important',
        position: 'relative',
        height: spacing.desktopToolbarHeight,
        fontSize: spacing.desktopDropDownMenuFontSize,
        cursor: 'pointer'
      },
      menu: {
        transition: Transitions.easeOut(),
        right: '-14px !important',
        top: '9px !important',
        opacity: this.state.open ? 1 : 0
      },
      menuItem: { // similair to drop down menu's menu item styles
        paddingRight: spacing.iconSize + spacing.desktopGutterLess * 2,
        height: spacing.desktopDropDownMenuItemHeight,
        lineHeight: spacing.desktopDropDownMenuItemHeight + 'px'
      }
    };
    return styles;
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var children = _props.children;
    var menuItems = _props.menuItems;
    var closeOnMenuItemTouchTap = _props.closeOnMenuItemTouchTap;
    var iconStyle = _props.iconStyle;
    var iconClassName = _props.iconClassName;

    var other = _objectWithoutProperties(_props, ['style', 'children', 'menuItems', 'closeOnMenuItemTouchTap', 'iconStyle', 'iconClassName']);

    var styles = this.getStyles();

    return React.createElement(
      'div',
      _extends({}, other, { style: this.mergeAndPrefix(styles.root, this.props.style) }),
      React.createElement(
        'div',
        { onTouchTap: this._onControlClick },
        React.createElement(
          FontIcon,
          {
            className: iconClassName,
            style: iconStyle },
          this.props.iconLigature
        ),
        this.props.children
      ),
      React.createElement(Menu, {
        ref: 'menuItems',
        style: this.mergeAndPrefix(styles.menu),
        menuItems: menuItems,
        menuItemStyle: styles.menuItem,
        hideable: true,
        visible: this.state.open,
        onItemTap: this._onMenuItemClick })
    );
  },

  _onControlClick: function _onControlClick() {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function _onMenuItemClick(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);

    if (this.props.closeOnMenuItemTouchTap) {
      this.setState({ open: false });
    }
  }
});

module.exports = DropDownIcon;