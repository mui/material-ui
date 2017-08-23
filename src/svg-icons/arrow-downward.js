// @flow weak

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../SvgIcon';

let ArrowDownward = props =>
  <SvgIcon {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>;
ArrowDownward = pure(ArrowDownward);
ArrowDownward.muiName = 'SvgIcon';

export default ArrowDownward;
