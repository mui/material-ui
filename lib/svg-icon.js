'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');

var SvgIcon = React.createClass({
  displayName: 'SvgIcon',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    viewBox: React.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      viewBox: '0 0 24 24'
    };
  },

  render: function render() {
    var _props = this.props;
    var color = _props.color;
    var hoverColor = _props.hoverColor;
    var viewBox = _props.viewBox;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['color', 'hoverColor', 'viewBox', 'style']);

    var offColor = color ? color : style && style.fill ? style.fill : this.context.muiTheme.palette.textColor;
    var onColor = hoverColor ? hoverColor : offColor;

    var mergedStyles = this.mergeAndPrefix({
      display: 'inline-block',
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: Transitions.easeOut()
    }, style, {
      // Make sure our fill color overrides fill provided in props.style
      fill: this.state.hovered ? onColor : offColor
    });

    return React.createElement(
      'svg',
      _extends({}, other, {
        onMouseOut: this._handleMouseOut,
        onMouseOver: this._handleMouseOver,
        style: mergedStyles,
        viewBox: viewBox }),
      this.props.children
    );
  },

  _handleMouseOut: function _handleMouseOut(e) {
    this.setState({ hovered: false });
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  },

  _handleMouseOver: function _handleMouseOver(e) {
    this.setState({ hovered: true });
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  }
});

module.exports = SvgIcon;