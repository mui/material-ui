'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
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