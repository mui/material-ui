'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var EditorStrikethroughS = React.createClass({
  displayName: 'EditorStrikethroughS',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M5.9 10h6.3c-.8-.3-1.5-.6-2-.9-.7-.4-1-1-1-1.6 0-.3.1-.6.2-.9.1-.3.3-.5.6-.7.3-.2.6-.4 1-.5.4-.1.8-.2 1.4-.2.5 0 1 .1 1.4.2.4.1.7.3 1 .6.3.2.5.5.6.9.1.3.2.7.2 1.1h4c0-.9-.2-1.7-.5-2.4s-.8-1.4-1.4-1.9c-.6-.5-1.4-1-2.3-1.2-1-.4-2-.5-3.1-.5s-2 .1-2.9.4c-.9.3-1.6.6-2.3 1.1-.6.5-1.1 1-1.4 1.7-.4.7-.6 1.4-.6 2.2 0 .8.2 1.6.5 2.2.1.2.2.3.3.4zM23 12H1v2h11.9c.2.1.5.2.7.3.5.2.9.5 1.2.7.3.2.5.5.6.8.1.3.1.6.1.9 0 .3-.1.6-.2.9-.1.3-.3.5-.6.7-.2.2-.6.3-.9.5-.4.1-.8.2-1.4.2-.6 0-1.1-.1-1.6-.2s-.9-.3-1.2-.6c-.3-.3-.6-.6-.8-1-.2-.4-.3-1-.3-1.6h-4c0 .7.1 1.5.3 2.1.2.6.5 1.1.9 1.6s.8.9 1.3 1.2c.5.3 1 .6 1.6.9.6.2 1.2.4 1.8.5.6.1 1.3.2 1.9.2 1.1 0 2-.1 2.9-.4.9-.2 1.6-.6 2.2-1.1.6-.5 1.1-1 1.4-1.7.3-.7.5-1.4.5-2.3 0-.8-.1-1.5-.4-2.2-.1-.2-.1-.3-.2-.4H23v-2z' })
    );
  }

});

module.exports = EditorStrikethroughS;