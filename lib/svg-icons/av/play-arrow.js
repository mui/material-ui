'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var AvPlayArrow = React.createClass({
  displayName: 'AvPlayArrow',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M8 5v14l11-7z' })
    );
  }

});

module.exports = AvPlayArrow;