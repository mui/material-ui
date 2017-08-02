// @flow weak

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../SvgIcon';

let ArrowDropDown = props =>
  <SvgIcon {...props}>
    <path d="M7,10L12,15L17,10H7Z" />
  </SvgIcon>;
ArrowDropDown = pure(ArrowDropDown);
ArrowDropDown.muiName = 'SvgIcon';

export default ArrowDropDown;
