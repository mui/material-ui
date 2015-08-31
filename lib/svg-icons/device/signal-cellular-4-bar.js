'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var DeviceSignalCellular4Bar = React.createClass({
  displayName: 'DeviceSignalCellular4Bar',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M2 22h20V2z' })
    );
  }

});

module.exports = DeviceSignalCellular4Bar;