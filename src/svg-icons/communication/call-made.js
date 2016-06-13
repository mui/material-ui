import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let CommunicationCallMade = (props) => (
  <SvgIcon {...props}>
    <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>
  </SvgIcon>
);
CommunicationCallMade = pure(CommunicationCallMade);
CommunicationCallMade.displayName = 'CommunicationCallMade';
CommunicationCallMade.muiName = 'SvgIcon';

export default CommunicationCallMade;
