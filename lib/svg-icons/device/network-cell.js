'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var DeviceNetworkCell = React.createClass({
  displayName: 'DeviceNetworkCell',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { 'fill-opacity': '.3', d: 'M2 22h20V2z' }),
      React.createElement('path', { d: 'M17 7L2 22h15z' })
    );
  }

});

module.exports = DeviceNetworkCell;