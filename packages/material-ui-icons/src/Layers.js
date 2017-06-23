import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Layers = props =>
  <SvgIcon {...props}>
    <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
  </SvgIcon>;

Layers = pure(Layers);
Layers.muiName = 'SvgIcon';

export default Layers;
