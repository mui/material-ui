import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionGetApp = (props) => (
  <SvgIcon {...props}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </SvgIcon>
);
ActionGetApp = pure(ActionGetApp);
ActionGetApp.displayName = 'ActionGetApp';

export default ActionGetApp;
