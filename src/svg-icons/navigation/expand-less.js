import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NavigationExpandLess = (props) => (
  <SvgIcon {...props}>
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
  </SvgIcon>
);
NavigationExpandLess = pure(NavigationExpandLess);
NavigationExpandLess.displayName = 'NavigationExpandLess';

export default NavigationExpandLess;
