'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
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