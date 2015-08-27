'use strict';

var React = require('react');
var SvgIcon = require('../svg-icon');

var NavigationChevronRightDouble = React.createClass({
  displayName: 'NavigationChevronRightDouble',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M6 6 L4.59  7.41 9.17 12 l-4.58 4.59 L6 18 l6 -6z' }),
      React.createElement('path', { d: 'M13 6 L11.59 7.41 16.17 12 l-4.58 4.59 L13 18 l6 -6z' })
    );
  }

});

module.exports = NavigationChevronRightDouble;