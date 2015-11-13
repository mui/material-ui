'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var ActionGif = React.createClass({
  displayName: 'ActionGif',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement(
        'defs',
        null,
        React.createElement('path', { id: 'a', d: 'M24 24H0V0h24v24z' })
      ),
      React.createElement(
        'clipPath',
        { id: 'b' },
        React.createElement('use', { overflow: 'visible' })
      ),
      React.createElement('path', { d: 'M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z', 'clip-path': 'url(#b)' })
    );
  }

});

module.exports = ActionGif;