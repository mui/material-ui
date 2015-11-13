'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var ActionHome = React.createClass({
  displayName: 'ActionHome',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })
    );
  }

});

module.exports = ActionHome;