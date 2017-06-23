import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Store = props =>
  <SvgIcon {...props}>
    <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
  </SvgIcon>;

Store = pure(Store);
Store.muiName = 'SvgIcon';

export default Store;
