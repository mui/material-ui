'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var AvSkipPrevious = React.createClass({
  displayName: 'AvSkipPrevious',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M6 6h2v12H6zm3.5 6l8.5 6V6z' })
    );
  }

});

module.exports = AvSkipPrevious;