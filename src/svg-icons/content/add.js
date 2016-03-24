import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ContentAdd = (props) => (
  <SvgIcon {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </SvgIcon>
);
ContentAdd = pure(ContentAdd);
ContentAdd.displayName = 'ContentAdd';

export default ContentAdd;
