'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var AvFastForward = React.createClass({
  displayName: 'AvFastForward',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z' })
    );
  }

});

module.exports = AvFastForward;