'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ImageDetails = React.createClass({
  displayName: 'ImageDetails',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z' })
    );
  }

});

module.exports = ImageDetails;