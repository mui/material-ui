import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let NavigationArrowDropUp = (props) => (
  <SvgIcon {...props}>
    <path d="M7 14l5-5 5 5z"/>
  </SvgIcon>
);
NavigationArrowDropUp = pure(NavigationArrowDropUp)
NavigationArrowDropUp.displayName = 'NavigationArrowDropUp';

export default NavigationArrowDropUp;
