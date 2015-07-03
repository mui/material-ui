'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ActionGetApp = React.createClass({
  displayName: 'ActionGetApp',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' })
    );
  }

});

module.exports = ActionGetApp;