import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let ImportExport = props =>
  <SvgIconCustom {...props}>
    <path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z" />
  </SvgIconCustom>;

ImportExport = pure(ImportExport);
ImportExport.muiName = 'SvgIcon';

export default ImportExport;
