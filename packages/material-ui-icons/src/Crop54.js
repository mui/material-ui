import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Crop54 = props =>
  <SvgIcon {...props}>
    <path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z" />
  </SvgIcon>;

Crop54 = pure(Crop54);
Crop54.muiName = 'SvgIcon';

export default Crop54;
