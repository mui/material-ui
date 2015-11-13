'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var FontIcon = React.createClass({
  displayName: 'FontIcon',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
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

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    style: React.PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
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
    var color = _props.color;
    var hoverColor = _props.hoverColor;
    var onMouseLeave = _props.onMouseLeave;
    var onMouseEnter = _props.onMouseEnter;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['color', 'hoverColor', 'onMouseLeave', 'onMouseEnter', 'style']);

    var spacing = this.state.muiTheme.rawTheme.spacing;
    var offColor = color ? color : style && style.color ? style.color : this.state.muiTheme.rawTheme.palette.textColor;
    var onColor = hoverColor ? hoverColor : offColor;

    var mergedStyles = this.prepareStyles({
      position: 'relative',
      fontSize: spacing.iconSize,
      display: 'inline-block',
      userSelect: 'none',
      transition: Transitions.easeOut()
    }, style, {
      color: this.state.hovered ? onColor : offColor
    });

    return React.createElement('span', _extends({}, other, {
      onMouseLeave: this._handleMouseLeave,
      onMouseEnter: this._handleMouseEnter,
      style: mergedStyles }));
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined) this.setState({ hovered: false });
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined) this.setState({ hovered: true });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  }
});

module.exports = FontIcon;