'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var DeviceBluetoothConnected = React.createClass({
  displayName: 'DeviceBluetoothConnected',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M7 12l-2-2-2 2 2 2 2-2zm10.71-4.29L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88zM19 10l-2 2 2 2 2-2-2-2z' })
    );
  }

});

module.exports = DeviceBluetoothConnected;