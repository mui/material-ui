'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var CommunicationCallMade = React.createClass({
  displayName: 'CommunicationCallMade',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z' })
    );
  }

});

module.exports = CommunicationCallMade;