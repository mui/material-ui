import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Crop75 = props =>
  <SvgIcon {...props}>
    <path d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
  </SvgIcon>;

Crop75 = pure(Crop75);
Crop75.muiName = 'SvgIcon';

export default Crop75;
