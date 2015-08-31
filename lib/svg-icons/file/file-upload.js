'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var FileFileUpload = React.createClass({
  displayName: 'FileFileUpload',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z' })
    );
  }

});

module.exports = FileFileUpload;