'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var DeviceSignalCellularNull = React.createClass({
  displayName: 'DeviceSignalCellularNull',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z' })
    );
  }

});

module.exports = DeviceSignalCellularNull;