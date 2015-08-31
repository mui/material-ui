'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var ImageBrightness1 = React.createClass({
  displayName: 'ImageBrightness1',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('circle', { cx: '12', cy: '12', r: '10' })
    );
  }

});

module.exports = ImageBrightness1;