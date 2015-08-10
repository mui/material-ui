'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var CommunicationChatBubble = React.createClass({
  displayName: 'CommunicationChatBubble',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' })
    );
  }

});

module.exports = CommunicationChatBubble;