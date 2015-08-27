'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var AvPlayArrow = React.createClass({
  displayName: 'AvPlayArrow',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M8 5v14l11-7z' })
    );
  }

});

module.exports = AvPlayArrow;