'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var EditorVerticalAlignTop = React.createClass({
  displayName: 'EditorVerticalAlignTop',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z' })
    );
  }

});

module.exports = EditorVerticalAlignTop;