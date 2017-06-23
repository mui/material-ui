import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Tablet = props =>
  <SvgIcon {...props}>
    <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z" />
  </SvgIcon>;

Tablet = pure(Tablet);
Tablet.muiName = 'SvgIcon';

export default Tablet;
