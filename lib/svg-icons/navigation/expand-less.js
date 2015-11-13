'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var NavigationExpandLess = React.createClass({
  displayName: 'NavigationExpandLess',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' })
    );
  }

});

module.exports = NavigationExpandLess;