'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var ContentForward = React.createClass({
  displayName: 'ContentForward',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M12 8V4l8 8-8 8v-4H4V8z' })
    );
  }

});

module.exports = ContentForward;