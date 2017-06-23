import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let CallMissedOutgoing = props =>
  <SvgIcon {...props}>
    <path d="M3 8.41l9 9 7-7V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41z" />
  </SvgIcon>;

CallMissedOutgoing = pure(CallMissedOutgoing);
CallMissedOutgoing.muiName = 'SvgIcon';

export default CallMissedOutgoing;
