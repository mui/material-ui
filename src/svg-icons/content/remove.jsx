import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ContentRemove = (props) => (
  <SvgIcon {...props}>
    <path d="M19 13H5v-2h14v2z"/>
  </SvgIcon>
);
ContentRemove = pure(ContentRemove)
ContentRemove.displayName = 'ContentRemove';

export default ContentRemove;
