import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Laptop = props =>
  <SvgIcon {...props}>
    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
  </SvgIcon>;

Laptop = pure(Laptop);
Laptop.muiName = 'SvgIcon';

export default Laptop;
