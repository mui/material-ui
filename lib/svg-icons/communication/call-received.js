'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var CommunicationCallReceived = React.createClass({
  displayName: 'CommunicationCallReceived',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z' })
    );
  }

});

module.exports = CommunicationCallReceived;