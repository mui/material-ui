import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SwapHoriz = props =>
  <SvgIcon {...props}>
    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
  </SvgIcon>;

SwapHoriz = pure(SwapHoriz);
SwapHoriz.muiName = 'SvgIcon';

export default SwapHoriz;
