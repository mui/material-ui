'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ActionTrendingFlat = React.createClass({
  displayName: 'ActionTrendingFlat',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M22 12l-4-4v3H3v2h15v3z' })
    );
  }

});

module.exports = ActionTrendingFlat;