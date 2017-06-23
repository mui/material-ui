import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Shop = props =>
  <SvgIcon {...props}>
    <path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z" />
  </SvgIcon>;

Shop = pure(Shop);
Shop.muiName = 'SvgIcon';

export default Shop;
