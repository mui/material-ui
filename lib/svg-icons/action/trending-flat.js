'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var ActionTrendingFlat = React.createClass({
  displayName: 'ActionTrendingFlat',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M22 12l-4-4v3H3v2h15v3z' })
    );
  }

});

module.exports = ActionTrendingFlat;