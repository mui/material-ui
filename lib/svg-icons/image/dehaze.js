'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ImageDehaze = React.createClass({
  displayName: 'ImageDehaze',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z' })
    );
  }

});

module.exports = ImageDehaze;