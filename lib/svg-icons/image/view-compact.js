'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ImageViewCompact = React.createClass({
  displayName: 'ImageViewCompact',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z' })
    );
  }

});

module.exports = ImageViewCompact;