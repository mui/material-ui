import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionViewQuilt = (props) => (
  <SvgIcon {...props}>
    <path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"/>
  </SvgIcon>
);
ActionViewQuilt = pure(ActionViewQuilt);
ActionViewQuilt.displayName = 'ActionViewQuilt';

export default ActionViewQuilt;
