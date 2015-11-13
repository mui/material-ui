'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var DeviceSignalCellularConnectedNoInternet2Bar = React.createClass({
  displayName: 'DeviceSignalCellularConnectedNoInternet2Bar',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { 'fill-opacity': '.3', d: 'M22 8V2L2 22h16V8z' }),
      React.createElement('path', { d: 'M14 22V10L2 22h12zm6-12v8h2v-8h-2zm0 12h2v-2h-2v2z' })
    );
  }

});

module.exports = DeviceSignalCellularConnectedNoInternet2Bar;