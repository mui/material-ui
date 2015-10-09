const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class CommunicationChatBubble extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </SvgIcon>
    );
  }
}

module.exports = CommunicationChatBubble;
