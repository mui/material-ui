import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Reply = props =>
  <SvgIcon {...props}>
    <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
  </SvgIcon>;

Reply = pure(Reply);
Reply.muiName = 'SvgIcon';

export default Reply;
