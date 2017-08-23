import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PauseCircleOutline = props =>
  <SvgIcon {...props}>
    <path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z" />
  </SvgIcon>;

PauseCircleOutline = pure(PauseCircleOutline);
PauseCircleOutline.muiName = 'SvgIcon';

export default PauseCircleOutline;
