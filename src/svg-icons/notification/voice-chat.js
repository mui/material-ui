import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NotificationVoiceChat = (props) => (
  <SvgIcon {...props}>
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12l-4-3.2V14H6V6h8v3.2L18 6v8z"/>
  </SvgIcon>
);
NotificationVoiceChat = pure(NotificationVoiceChat);
NotificationVoiceChat.displayName = 'NotificationVoiceChat';

export default NotificationVoiceChat;
