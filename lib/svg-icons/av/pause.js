'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var AvPause = React.createClass({
  displayName: 'AvPause',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' })
    );
  }

});

module.exports = AvPause;