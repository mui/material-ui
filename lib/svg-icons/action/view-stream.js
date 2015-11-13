'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var ActionViewStream = React.createClass({
  displayName: 'ActionViewStream',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M4 18h17v-6H4v6zM4 5v6h17V5H4z' })
    );
  }

});

module.exports = ActionViewStream;