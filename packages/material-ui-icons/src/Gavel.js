import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Gavel = props =>
  <SvgIcon {...props}>
    <path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z" />
  </SvgIcon>;

Gavel = pure(Gavel);
Gavel.muiName = 'SvgIcon';

export default Gavel;
