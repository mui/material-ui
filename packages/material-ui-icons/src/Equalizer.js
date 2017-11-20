import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Equalizer = props =>
  <SvgIconCustom {...props}>
    <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z" />
  </SvgIconCustom>;

Equalizer = pure(Equalizer);
Equalizer.muiName = 'SvgIcon';

export default Equalizer;
