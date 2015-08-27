'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var ContentRemove = React.createClass({
  displayName: 'ContentRemove',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M19 13H5v-2h14v2z' })
    );
  }

});

module.exports = ContentRemove;