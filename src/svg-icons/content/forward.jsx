import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ContentForward = (props) => (
  <SvgIcon {...props}>
    <path d="M12 8V4l8 8-8 8v-4H4V8z"/>
  </SvgIcon>
);
ContentForward = pure(ContentForward)
ContentForward.displayName = 'ContentForward';

export default ContentForward;
