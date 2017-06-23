import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let TrendingUp = props =>
  <SvgIcon {...props}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </SvgIcon>;

TrendingUp = pure(TrendingUp);
TrendingUp.muiName = 'SvgIcon';

export default TrendingUp;
