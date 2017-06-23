import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let TrendingFlat = props =>
  <SvgIcon {...props}>
    <path d="M22 12l-4-4v3H3v2h15v3z" />
  </SvgIcon>;

TrendingFlat = pure(TrendingFlat);
TrendingFlat.muiName = 'SvgIcon';

export default TrendingFlat;
