import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Polymer = props =>
  <SvgIcon {...props}>
    <path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z" />
  </SvgIcon>;

Polymer = pure(Polymer);
Polymer.muiName = 'SvgIcon';

export default Polymer;
