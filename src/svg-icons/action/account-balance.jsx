import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionAccountBalance = (props) => (
  <SvgIcon {...props}>
    <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
  </SvgIcon>
);
ActionAccountBalance = pure(ActionAccountBalance)
ActionAccountBalance.displayName = 'ActionAccountBalance';

export default ActionAccountBalance;
