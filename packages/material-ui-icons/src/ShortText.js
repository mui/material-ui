import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ShortText = props =>
  <SvgIconCustom {...props}>
    <path d="M4 9h16v2H4zm0 4h10v2H4z" />
  </SvgIconCustom>;

ShortText = pure(ShortText);
ShortText.muiName = 'SvgIcon';

export default ShortText;
