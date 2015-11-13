'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
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