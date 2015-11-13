'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var SvgIcon = React.createClass({
  displayName: 'SvgIcon',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    viewBox: React.PropTypes.string,
    style: React.PropTypes.object
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
      hovered: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onMouseEnter: function onMouseEnter() {},
      onMouseLeave: function onMouseLeave() {},
      viewBox: '0 0 24 24'
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var color = _props.color;
    var hoverColor = _props.hoverColor;
    var onMouseEnter = _props.onMouseEnter;
    var onMouseLeave = _props.onMouseLeave;
    var style = _props.style;
    var viewBox = _props.viewBox;

    var other = _objectWithoutProperties(_props, ['children', 'color', 'hoverColor', 'onMouseEnter', 'onMouseLeave', 'style', 'viewBox']);

    var offColor = color ? color : style && style.fill ? style.fill : this.state.muiTheme.rawTheme.palette.textColor;
    var onColor = hoverColor ? hoverColor : offColor;

    var mergedStyles = this.prepareStyles({
      display: 'inline-block',
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: Transitions.easeOut()
    }, style, {
      // Make sure our fill color overrides fill provided in props.style
      fill: this.state.hovered ? onColor : offColor
    });

    var events = hoverColor ? {
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave
    } : {};

    return React.createElement(
      'svg',
      _extends({}, other, events, {
        style: mergedStyles,
        viewBox: viewBox }),
      children
    );
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(e);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    this.setState({ hovered: true });
    this.props.onMouseEnter(e);
  }
});

module.exports = SvgIcon;