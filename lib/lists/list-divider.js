'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');

var ListDivider = React.createClass({
  displayName: 'ListDivider',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    inset: React.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var inset = _props.inset;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['inset', 'style']);

    var mergedStyles = this.mergeAndPrefix({
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: this.context.muiTheme.palette.borderColor
    }, style);

    return React.createElement('hr', _extends({}, other, { style: mergedStyles }));
  }
});

module.exports = ListDivider;