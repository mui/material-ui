import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let MarkunreadMailbox = props =>
  <SvgIconCustom {...props}>
    <path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
  </SvgIconCustom>;

MarkunreadMailbox = pure(MarkunreadMailbox);
MarkunreadMailbox.muiName = 'SvgIcon';

export default MarkunreadMailbox;
