'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var AvVolumeMute = React.createClass({
  displayName: 'AvVolumeMute',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M7 9v6h4l5 5V4l-5 5H7z' })
    );
  }

});

module.exports = AvVolumeMute;