import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ContentReply = (props) => (
  <SvgIcon {...props}>
    <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
  </SvgIcon>
);
ContentReply = pure(ContentReply);
ContentReply.displayName = 'ContentReply';
ContentReply.muiName = 'SvgIcon';

export default ContentReply;
