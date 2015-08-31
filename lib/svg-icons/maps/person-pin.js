'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var MapsPersonPin = React.createClass({
  displayName: 'MapsPersonPin',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.3c1.49 0 2.7 1.21 2.7 2.7 0 1.49-1.21 2.7-2.7 2.7-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7zM18 16H6v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9z' })
    );
  }

});

module.exports = MapsPersonPin;