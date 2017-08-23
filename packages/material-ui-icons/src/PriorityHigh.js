import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PriorityHigh = props =>
  <SvgIcon {...props}>
    <circle cx="12" cy="19" r="2" /><path d="M10 3h4v12h-4z" />
  </SvgIcon>;

PriorityHigh = pure(PriorityHigh);
PriorityHigh.muiName = 'SvgIcon';

export default PriorityHigh;
