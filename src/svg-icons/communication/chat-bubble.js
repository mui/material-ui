import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let CommunicationChatBubble = (props) => (
  <SvgIcon {...props}>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </SvgIcon>
);
CommunicationChatBubble = pure(CommunicationChatBubble);
CommunicationChatBubble.displayName = 'CommunicationChatBubble';
CommunicationChatBubble.muiName = 'SvgIcon';

export default CommunicationChatBubble;
