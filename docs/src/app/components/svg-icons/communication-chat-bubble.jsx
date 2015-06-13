var React = require('react');
var mui = require('mui');
var SvgIcon = mui.SvgIcon;

var CommunicationChatBubble = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
      </SvgIcon>
    );
  }

});

module.exports = CommunicationChatBubble;
