import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NavigationCheck = (props) => (
  <SvgIcon {...props}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </SvgIcon>
);
NavigationCheck = pure(NavigationCheck);
NavigationCheck.displayName = 'NavigationCheck';
NavigationCheck.muiName = 'SvgIcon';

export default NavigationCheck;
