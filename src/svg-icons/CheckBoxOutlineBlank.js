// @flow

import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../SvgIcon';

/**
 * @ignore - internal component.
 */
let CheckBoxOutlineBlank = props => (
  <SvgIcon {...props}>
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </SvgIcon>
);
CheckBoxOutlineBlank = pure(CheckBoxOutlineBlank);
CheckBoxOutlineBlank.muiName = 'SvgIcon';

export default CheckBoxOutlineBlank;
