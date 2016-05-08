import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ContentFlag = (props) => (
  <SvgIcon {...props}>
    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
  </SvgIcon>
);
ContentFlag = pure(ContentFlag);
ContentFlag.displayName = 'ContentFlag';
ContentFlag.muiName = 'SvgIcon';

export default ContentFlag;
