'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var AvVolumeMute = React.createClass({
  displayName: 'AvVolumeMute',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M7 9v6h4l5 5V4l-5 5H7z' })
    );
  }

});

module.exports = AvVolumeMute;