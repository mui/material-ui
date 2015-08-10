'use strict';

var React = require('react');
var SvgIcon = require('../svg-icon');

var NavigationChevronLeftDouble = React.createClass({
  displayName: 'NavigationChevronLeftDouble',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M11.41 7.41 L10 6 l-6 6 6 6 1.41-1.41 L6.83 12z' }),
      React.createElement('path', { d: 'M18.41 7.41 L17 6 l-6 6 6 6 1.41-1.41 L13.83 12z' })
    );
  }

});

module.exports = NavigationChevronLeftDouble;