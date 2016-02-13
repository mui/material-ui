import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ContentSend = (props) => (
  <SvgIcon {...props}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </SvgIcon>
);
ContentSend = pure(ContentSend)
ContentSend.displayName = 'ContentSend';

export default ContentSend;
