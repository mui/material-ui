'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ActionViewHeadline = React.createClass({
  displayName: 'ActionViewHeadline',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z' })
    );
  }

});

module.exports = ActionViewHeadline;