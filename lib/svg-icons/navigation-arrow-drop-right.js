'use strict';

var React = require('react');
var SvgIcon = require('../svg-icon');

var NavigationArrowDropRight = React.createClass({
  displayName: 'NavigationArrowDropRight',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M9.5,7l5,5l-5,5V7z' })
    );
  }

});

module.exports = NavigationArrowDropRight;