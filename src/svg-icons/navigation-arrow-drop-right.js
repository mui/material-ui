import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../SvgIcon';

let NavigationArrowDropRight = (props) => (
  <SvgIcon {...props}>
    <path d="M9.5,7l5,5l-5,5V7z" />
  </SvgIcon>
);

NavigationArrowDropRight = pure(NavigationArrowDropRight);
NavigationArrowDropRight.displayName = 'NavigationArrowDropRight';

export default NavigationArrowDropRight;
