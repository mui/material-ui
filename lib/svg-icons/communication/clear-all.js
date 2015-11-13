'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SvgIcon = require('../../svg-icon');

var CommunicationClearAll = React.createClass({
  displayName: 'CommunicationClearAll',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z' })
    );
  }

});

module.exports = CommunicationClearAll;