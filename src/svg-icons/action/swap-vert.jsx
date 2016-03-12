import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionSwapVert = (props) => (
  <SvgIcon {...props}>
    <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/>
  </SvgIcon>
);
ActionSwapVert = pure(ActionSwapVert)
ActionSwapVert.displayName = 'ActionSwapVert';

export default ActionSwapVert;
