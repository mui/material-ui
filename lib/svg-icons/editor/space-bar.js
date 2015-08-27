'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var EditorSpaceBar = React.createClass({
  displayName: 'EditorSpaceBar',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M18 9v4H6V9H4v6h16V9z' })
    );
  }

});

module.exports = EditorSpaceBar;