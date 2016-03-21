import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionEject = (props) => (
  <SvgIcon {...props}>
    <path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"/>
  </SvgIcon>
);
ActionEject = pure(ActionEject);
ActionEject.displayName = 'ActionEject';

export default ActionEject;
