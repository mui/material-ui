'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var ContentFlag = React.createClass({
  displayName: 'ContentFlag',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z' })
    );
  }

});

module.exports = ContentFlag;