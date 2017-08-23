import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let RepeatOne = props =>
  <SvgIcon {...props}>
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z" />
  </SvgIcon>;

RepeatOne = pure(RepeatOne);
RepeatOne.muiName = 'SvgIcon';

export default RepeatOne;
