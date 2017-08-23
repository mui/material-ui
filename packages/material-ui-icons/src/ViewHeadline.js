import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ViewHeadline = props =>
  <SvgIcon {...props}>
    <path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z" />
  </SvgIcon>;

ViewHeadline = pure(ViewHeadline);
ViewHeadline.muiName = 'SvgIcon';

export default ViewHeadline;
