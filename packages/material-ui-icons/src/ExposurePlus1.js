import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ExposurePlus1 = props =>
  <SvgIcon {...props}>
    <path d="M10 7H8v4H4v2h4v4h2v-4h4v-2h-4V7zm10 11h-2V7.38L15 8.4V6.7L19.7 5h.3v13z" />
  </SvgIcon>;

ExposurePlus1 = pure(ExposurePlus1);
ExposurePlus1.muiName = 'SvgIcon';

export default ExposurePlus1;
