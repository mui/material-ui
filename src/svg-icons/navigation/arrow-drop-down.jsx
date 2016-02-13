import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let NavigationArrowDropDown = (props) => (
  <SvgIcon {...props}>
    <path d="M7 10l5 5 5-5z"/>
  </SvgIcon>
);
NavigationArrowDropDown = pure(NavigationArrowDropDown)
NavigationArrowDropDown.displayName = 'NavigationArrowDropDown';

export default NavigationArrowDropDown;
