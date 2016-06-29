import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ContentSort = (props) => (
  <SvgIcon {...props}>
    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
  </SvgIcon>
);
ContentSort = pure(ContentSort);
ContentSort.displayName = 'ContentSort';
ContentSort.muiName = 'SvgIcon';

export default ContentSort;
