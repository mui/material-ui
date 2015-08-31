'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var AvSkipNext = React.createClass({
  displayName: 'AvSkipNext',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z' })
    );
  }

});

module.exports = AvSkipNext;