import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let NavigationChevronRight = (props) => (
  <SvgIcon {...props}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </SvgIcon>
);
NavigationChevronRight = pure(NavigationChevronRight)
NavigationChevronRight.displayName = 'NavigationChevronRight';

export default NavigationChevronRight;
