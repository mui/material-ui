'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var EditorSpaceBar = React.createClass({
  displayName: 'EditorSpaceBar',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M18 9v4H6V9H4v6h16V9z' })
    );
  }

});

module.exports = EditorSpaceBar;