import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Title = props =>
  <SvgIcon {...props}>
    <path d="M5 4v3h5.5v12h3V7H19V4z" />
  </SvgIcon>;

Title = pure(Title);
Title.muiName = 'SvgIcon';

export default Title;
