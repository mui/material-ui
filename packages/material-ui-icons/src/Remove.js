import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Remove = props =>
  <SvgIcon {...props}>
    <path d="M19 13H5v-2h14v2z" />
  </SvgIcon>;

Remove = pure(Remove);
Remove.muiName = 'SvgIcon';

export default Remove;
