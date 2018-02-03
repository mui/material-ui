import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Publish = props =>
  <SvgIconCustom {...props}>
    <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" />
  </SvgIconCustom>;

Publish = pure(Publish);
Publish.muiName = 'SvgIcon';

export default Publish;
