import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let GetApp = props =>
  <SvgIconCustom {...props}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </SvgIconCustom>;

GetApp = pure(GetApp);
GetApp.muiName = 'SvgIcon';

export default GetApp;
