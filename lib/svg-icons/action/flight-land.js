'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var ActionFlightLand = React.createClass({
  displayName: 'ActionFlightLand',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement(
        'defs',
        null,
        React.createElement('path', { id: 'a', d: 'M0 0h24v24H0V0z' })
      ),
      React.createElement(
        'defs',
        null,
        React.createElement('path', { id: 'c', d: 'M0 0h24v24H0V0z' })
      ),
      React.createElement(
        'clipPath',
        { id: 'b' },
        React.createElement('use', { overflow: 'visible' })
      ),
      React.createElement(
        'clipPath',
        { id: 'd', 'clip-path': 'url(#b)' },
        React.createElement('use', { overflow: 'visible' })
      ),
      React.createElement('path', { d: 'M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z', 'clip-path': 'url(#d)' })
    );
  }

});

module.exports = ActionFlightLand;