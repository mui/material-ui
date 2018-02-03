import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let TrendingFlat = props =>
  <SvgIconCustom {...props}>
    <path d="M22 12l-4-4v3H3v2h15v3z" />
  </SvgIconCustom>;

TrendingFlat = pure(TrendingFlat);
TrendingFlat.muiName = 'SvgIcon';

export default TrendingFlat;
