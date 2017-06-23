import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FreeBreakfast = props =>
  <SvgIcon {...props}>
    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
  </SvgIcon>;

FreeBreakfast = pure(FreeBreakfast);
FreeBreakfast.muiName = 'SvgIcon';

export default FreeBreakfast;
