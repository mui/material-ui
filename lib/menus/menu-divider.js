'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');
var ListDivider = require('../lists/list-divider');

var MenuDivider = React.createClass({
  displayName: 'MenuDivider',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['style']);

    var mergedStyles = this.mergeAndPrefix({
      marginTop: 7,
      marginBottom: 8
    }, style);

    return React.createElement(ListDivider, _extends({}, other, { style: mergedStyles }));
  }
});

module.exports = MenuDivider;