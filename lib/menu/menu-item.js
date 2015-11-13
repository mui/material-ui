'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var FontIcon = require('../font-icon');
var Toggle = require('../toggle');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

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
    style: React.PropTypes.object,
    active: React.PropTypes.bool
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
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
    return this.state.muiTheme.menuItem;
  },

  getSpacing: function getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles: function getStyles() {
    var _data;

    var isRtl = this.context.muiTheme.isRtl;

    var right = isRtl ? 'left' : 'right';
    var left = isRtl ? 'right' : 'left';

    var marginRight = isRtl ? 'marginLeft' : 'marginRight';
    var paddingLeft = isRtl ? 'paddingRight' : 'paddingLeft';

    var styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding,
        color: this.state.muiTheme.rawTheme.palette.textColor
      },
      number: {
        float: right,
        width: 24,
        textAlign: 'center'
      },
      attribute: {
        float: right
      },
      iconRight: {
        lineHeight: this.getTheme().height + 'px',
        float: right
      },
      icon: _defineProperty({
        float: left,
        lineHeight: this.getTheme().height + 'px'
      }, marginRight, this.getSpacing().desktopGutter),
      data: (_data = {
        display: 'block'
      }, _defineProperty(_data, paddingLeft, this.getSpacing().desktopGutter * 2), _defineProperty(_data, 'lineHeight', this.getTheme().dataHeight + 'px'), _defineProperty(_data, 'height', this.getTheme().dataHeight + 'px'), _defineProperty(_data, 'verticalAlign', 'top'), _defineProperty(_data, 'top', -12), _defineProperty(_data, 'position', 'relative'), _defineProperty(_data, 'fontWeight', 300), _defineProperty(_data, 'color', this.state.muiTheme.rawTheme.palette.textColor), _data),
      toggle: {
        marginTop: (this.getTheme().height - this.state.muiTheme.radioButton.size) / 2,
        float: right,
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
        color: this.state.muiTheme.rawTheme.palette.disabledColor
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

    if (this.props.iconClassName) icon = React.createElement(FontIcon, { style: this.mergeStyles(styles.icon, this.props.iconStyle, this.props.selected && styles.rootWhenSelected), className: this.props.iconClassName });
    if (this.props.iconRightClassName) iconRight = React.createElement(FontIcon, { style: this.mergeStyles(styles.iconRight, this.props.iconRightStyle), className: this.props.iconRightClassName });
    if (this.props.data) data = React.createElement(
      'span',
      { style: this.prepareStyles(styles.data) },
      this.props.data
    );
    if (this.props.number !== undefined) number = React.createElement(
      'span',
      { style: this.prepareStyles(styles.number) },
      this.props.number
    );
    if (this.props.attribute !== undefined) attribute = React.createElement(
      'span',
      { style: this.prepareStyles(styles.style) },
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
        style: this.prepareStyles(styles.root, this.props.selected && styles.rootWhenSelected, this.props.active && !this.props.disabled && styles.rootWhenHovered, this.props.style, this.props.disabled && styles.rootWhenDisabled) },
      icon,
      this.props.children,
      number,
      attribute,
      data,
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