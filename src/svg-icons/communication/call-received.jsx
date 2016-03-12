import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let CommunicationCallReceived = (props) => (
  <SvgIcon {...props}>
    <path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"/>
  </SvgIcon>
);
CommunicationCallReceived = pure(CommunicationCallReceived)
CommunicationCallReceived.displayName = 'CommunicationCallReceived';

export default CommunicationCallReceived;
