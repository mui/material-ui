'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var FontIcon = require('../font-icon');
var Toggle = require('../toggle');

var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED'
};

var MenuItem = React.createClass({
  displayName: 'MenuItem',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    iconRightClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    iconRightStyle: React.PropTypes.object,
    attribute: React.PropTypes.string,
    number: React.PropTypes.string,
    data: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool,
    active: React.PropTypes.bool
  },

  statics: {
    Types: Types
  },

  getDefaultProps: function getDefaultProps() {
    return {
      toggle: false,
      disabled: false,
      active: false
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.menuItem;
  },

  getSpacing: function getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding,
        color: this.context.muiTheme.palette.textColor
      },
      number: {
        float: 'right',
        width: 24,
        textAlign: 'center'
      },
      attribute: {
        float: 'right'
      },
      iconRight: {
        lineHeight: this.getTheme().height + 'px',
        float: 'right'
      },
      icon: {
        float: 'left',
        lineHeight: this.getTheme().height + 'px',
        marginRight: this.getSpacing().desktopGutter
      },
      data: {
        display: 'block',
        paddingLeft: this.getSpacing().desktopGutter * 2,
        lineHeight: this.getTheme().dataHeight + 'px',
        height: this.getTheme().dataHeight + 'px',
        verticalAlign: 'top',
        top: -12,
        position: 'relative',
        fontWeight: 300,
        color: this.context.muiTheme.palette.textColor
      },
      toggle: {
        marginTop: (this.getTheme().height - this.context.muiTheme.component.radioButton.size) / 2,
        float: 'right',
        width: 42
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.muiTheme.palette.disabledColor
      }
    };

    return styles;
  },

  render: function render() {
    var icon = undefined;
    var data = undefined;
    var iconRight = undefined;
    var attribute = undefined;
    var number = undefined;
    var toggleElement = undefined;
    var styles = this.getStyles();

    if (this.props.iconClassName) icon = React.createElement(FontIcon, { style: this.mergeAndPrefix(styles.icon, this.props.iconStyle), className: this.props.iconClassName });
    if (this.props.iconRightClassName) iconRight = React.createElement(FontIcon, { style: this.mergeAndPrefix(styles.iconRight, this.props.iconRightStyle), className: this.props.iconRightClassName });
    if (this.props.data) data = React.createElement(
      'span',
      { style: this.mergeAndPrefix(styles.data) },
      this.props.data
    );
    if (this.props.number !== undefined) number = React.createElement(
      'span',
      { style: this.mergeAndPrefix(styles.number) },
      this.props.number
    );
    if (this.props.attribute !== undefined) attribute = React.createElement(
      'span',
      { style: this.mergeAndPrefix(styles.style) },
      this.props.attribute
    );
    if (this.props.icon) icon = this.props.icon;

    if (this.props.toggle) {
      var _props = this.props;
      var toggle = _props.toggle;
      var onTouchTap = _props.onTouchTap;
      var onToggle = _props.onToggle;
      var onMouseEnter = _props.onMouseEnter;
      var onMouseLeave = _props.onMouseLeave;
      var children = _props.children;
      var label = _props.label;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['toggle', 'onTouchTap', 'onToggle', 'onMouseEnter', 'onMouseLeave', 'children', 'label', 'style']);

      toggleElement = React.createElement(Toggle, _extends({}, other, { onToggle: this._handleToggle, style: styles.toggle }));
    }

    return React.createElement(
      'div',
      {
        key: this.props.index,
        className: this.props.className,
        onTouchTap: this._handleTouchTap,
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave,
        style: this.mergeAndPrefix(styles.root, this.props.selected && styles.rootWhenSelected, this.props.active && !this.props.disabled && styles.rootWhenHovered, this.props.style, this.props.disabled && styles.rootWhenDisabled) },
      icon,
      this.props.children,
      data,
      attribute,
      number,
      toggleElement,
      iconRight
    );
  },

  _handleTouchTap: function _handleTouchTap(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.index);
  },

  _handleToggle: function _handleToggle(e, toggled) {
    if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    if (!this.props.disabled && this.props.onMouseEnter) this.props.onMouseEnter(e, this.props.index);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    if (!this.props.disabled && this.props.onMouseLeave) this.props.onMouseLeave(e, this.props.index);
  }
});

module.exports = MenuItem;