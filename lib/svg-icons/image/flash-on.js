'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var ImageFlashOn = React.createClass({
  displayName: 'ImageFlashOn',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M7 2v11h3v9l7-12h-4l4-8z' })
    );
  }

});

module.exports = ImageFlashOn;