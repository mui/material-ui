import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ReplyAll = props =>
  <SvgIcon {...props}>
    <path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
  </SvgIcon>;

ReplyAll = pure(ReplyAll);
ReplyAll.muiName = 'SvgIcon';

export default ReplyAll;
