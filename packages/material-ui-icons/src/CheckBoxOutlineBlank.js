import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let CheckBoxOutlineBlank = props =>
  <SvgIconCustom {...props}>
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </SvgIconCustom>;

CheckBoxOutlineBlank = pure(CheckBoxOutlineBlank);
CheckBoxOutlineBlank.muiName = 'SvgIcon';

export default CheckBoxOutlineBlank;
