import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Details = props =>
  <SvgIconCustom {...props}>
    <path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z" />
  </SvgIconCustom>;

Details = pure(Details);
Details.muiName = 'SvgIcon';

export default Details;
