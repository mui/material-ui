'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var CommunicationCallMissed = React.createClass({
  displayName: 'CommunicationCallMissed',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z' })
    );
  }

});

module.exports = CommunicationCallMissed;