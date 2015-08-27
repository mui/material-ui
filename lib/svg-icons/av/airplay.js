'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var AvAirplay = React.createClass({
  displayName: 'AvAirplay',

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
      React.createElement('path', { d: 'M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z', 'clip-path': 'url(#d)' })
    );
  }

});

module.exports = AvAirplay;