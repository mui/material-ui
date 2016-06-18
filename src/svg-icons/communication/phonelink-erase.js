import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let CommunicationPhonelinkErase = (props) => (
  <SvgIcon {...props}>
    <path d="M13 8.2l-1-1-4 4-4-4-1 1 4 4-4 4 1 1 4-4 4 4 1-1-4-4 4-4zM19 1H9c-1.1 0-2 .9-2 2v3h2V4h10v16H9v-2H7v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2z"/>
  </SvgIcon>
);
CommunicationPhonelinkErase = pure(CommunicationPhonelinkErase);
CommunicationPhonelinkErase.displayName = 'CommunicationPhonelinkErase';
CommunicationPhonelinkErase.muiName = 'SvgIcon';

export default CommunicationPhonelinkErase;
