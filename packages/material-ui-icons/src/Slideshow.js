import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Slideshow = props =>
  <SvgIcon {...props}>
    <path d="M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
  </SvgIcon>;

Slideshow = pure(Slideshow);
Slideshow.muiName = 'SvgIcon';

export default Slideshow;
