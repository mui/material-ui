import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let RemoveCircleOutline = props =>
  <SvgIcon {...props}>
    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </SvgIcon>;

RemoveCircleOutline = pure(RemoveCircleOutline);
RemoveCircleOutline.muiName = 'SvgIcon';

export default RemoveCircleOutline;
