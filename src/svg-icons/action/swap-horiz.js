import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionSwapHoriz = (props) => (
  <SvgIcon {...props}>
    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
  </SvgIcon>
);
ActionSwapHoriz = pure(ActionSwapHoriz);
ActionSwapHoriz.displayName = 'ActionSwapHoriz';
ActionSwapHoriz.muiName = 'SvgIcon';

export default ActionSwapHoriz;
