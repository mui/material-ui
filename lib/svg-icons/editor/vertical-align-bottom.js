'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var EditorVerticalAlignBottom = React.createClass({
  displayName: 'EditorVerticalAlignBottom',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z' })
    );
  }

});

module.exports = EditorVerticalAlignBottom;