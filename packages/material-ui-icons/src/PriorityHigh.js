import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let PriorityHigh = props =>
  <SvgIconCustom {...props}>
    <circle cx="12" cy="19" r="2" /><path d="M10 3h4v12h-4z" />
  </SvgIconCustom>;

PriorityHigh = pure(PriorityHigh);
PriorityHigh.muiName = 'SvgIcon';

export default PriorityHigh;
