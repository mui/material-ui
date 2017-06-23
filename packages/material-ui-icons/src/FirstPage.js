import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FirstPage = props =>
  <SvgIcon {...props}>
    <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
  </SvgIcon>;

FirstPage = pure(FirstPage);
FirstPage.muiName = 'SvgIcon';

export default FirstPage;
