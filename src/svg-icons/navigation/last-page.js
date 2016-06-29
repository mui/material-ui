import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NavigationLastPage = (props) => (
  <SvgIcon {...props}>
    <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>
  </SvgIcon>
);
NavigationLastPage = pure(NavigationLastPage);
NavigationLastPage.displayName = 'NavigationLastPage';
NavigationLastPage.muiName = 'SvgIcon';

export default NavigationLastPage;
