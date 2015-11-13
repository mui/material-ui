'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var ContentSend = React.createClass({
  displayName: 'ContentSend',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' })
    );
  }

});

module.exports = ContentSend;