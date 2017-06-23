import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ExposureNeg1 = props =>
  <SvgIcon {...props}>
    <path d="M4 11v2h8v-2H4zm15 7h-2V7.38L14 8.4V6.7L18.7 5h.3v13z" />
  </SvgIcon>;

ExposureNeg1 = pure(ExposureNeg1);
ExposureNeg1.muiName = 'SvgIcon';

export default ExposureNeg1;
