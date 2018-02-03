import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let Pause = props =>
  <SvgIconCustom {...props}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </SvgIconCustom>;

Pause = pure(Pause);
Pause.muiName = 'SvgIcon';

export default Pause;
