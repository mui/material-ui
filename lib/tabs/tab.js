'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');

var Tab = React.createClass({
  displayName: 'Tab',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    onTouchTap: React.PropTypes.func,
    label: React.PropTypes.string,
    onActive: React.PropTypes.func,
    selected: React.PropTypes.bool,
    width: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onActive: function onActive() {},
      onTouchTap: function onTouchTap() {}
    };
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;
    var onActive = _props.onActive;
    var onTouchTap = _props.onTouchTap;
    var selected = _props.selected;
    var style = _props.style;
    var value = _props.value;
    var width = _props.width;

    var other = _objectWithoutProperties(_props, ['label', 'onActive', 'onTouchTap', 'selected', 'style', 'value', 'width']);

    var styles = this.mergeAndPrefix({
      display: 'table-cell',
      cursor: 'pointer',
      textAlign: 'center',
      verticalAlign: 'middle',
      height: 48,
      color: selected ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)',
      outline: 'none',
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'initial',
      fontFamily: this.context.muiTheme.contentFontFamily,
      boxSizing: 'border-box',
      width: width
    }, style);

    return React.createElement(
      'div',
      _extends({}, other, {
        style: styles,
        onTouchTap: this._handleTouchTap }),
      label
    );
  },

  _handleTouchTap: function _handleTouchTap(e) {
    this.props.onTouchTap(this.props.value, e, this);
  }

});

module.exports = Tab;