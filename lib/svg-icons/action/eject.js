'use strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var SvgIcon = require('../../svg-icon');

var ActionEject = React.createClass({
  displayName: 'ActionEject',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M5 17h14v2H5zm7-12L5.33 15h13.34z' })
    );
  }

});

module.exports = ActionEject;