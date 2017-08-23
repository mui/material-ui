import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Panorama = props =>
  <SvgIcon {...props}>
    <path d="M23 18V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z" />
  </SvgIcon>;

Panorama = pure(Panorama);
Panorama.muiName = 'SvgIcon';

export default Panorama;
