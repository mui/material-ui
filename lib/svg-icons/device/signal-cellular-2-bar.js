'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var DeviceSignalCellular2Bar = React.createClass({
  displayName: 'DeviceSignalCellular2Bar',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { 'fill-opacity': '.3', d: 'M2 22h20V2z' }),
      React.createElement('path', { d: 'M14 10L2 22h12z' })
    );
  }

});

module.exports = DeviceSignalCellular2Bar;