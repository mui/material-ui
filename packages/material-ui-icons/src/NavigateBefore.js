import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let NavigateBefore = props =>
  <SvgIconCustom {...props}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </SvgIconCustom>;

NavigateBefore = pure(NavigateBefore);
NavigateBefore.muiName = 'SvgIcon';

export default NavigateBefore;
