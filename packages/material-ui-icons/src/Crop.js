import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Crop = props =>
  <SvgIcon {...props}>
    <path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z" />
  </SvgIcon>;

Crop = pure(Crop);
Crop.muiName = 'SvgIcon';

export default Crop;
