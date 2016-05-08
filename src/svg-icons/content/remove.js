import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ContentRemove = (props) => (
  <SvgIcon {...props}>
    <path d="M19 13H5v-2h14v2z"/>
  </SvgIcon>
);
ContentRemove = pure(ContentRemove);
ContentRemove.displayName = 'ContentRemove';
ContentRemove.muiName = 'SvgIcon';

export default ContentRemove;
