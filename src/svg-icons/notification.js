/* eslint-disable */

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../SvgIcon';

let Notification = (props) => (
  <SvgIcon {...props}>
    <path d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z"/>
  </SvgIcon>
);
Notification = pure(Notification);
Notification.muiName = 'SvgIcon';

export default Notification;
