import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NotificationPriorityHigh = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="19" r="2"/><path d="M10 3h4v12h-4z"/>
  </SvgIcon>
);
NotificationPriorityHigh = pure(NotificationPriorityHigh);
NotificationPriorityHigh.displayName = 'NotificationPriorityHigh';
NotificationPriorityHigh.muiName = 'SvgIcon';

export default NotificationPriorityHigh;
