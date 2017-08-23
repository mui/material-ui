import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Kitchen = props =>
  <SvgIcon {...props}>
    <path d="M18 2.01L6 2c-1.1 0-2 .89-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6v-9.02h12V20zm0-11H6V4h12v5zM8 5h2v3H8zm0 7h2v5H8z" />
  </SvgIcon>;

Kitchen = pure(Kitchen);
Kitchen.muiName = 'SvgIcon';

export default Kitchen;
