import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let FilterList = props =>
  <SvgIconCustom {...props}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </SvgIconCustom>;

FilterList = pure(FilterList);
FilterList.muiName = 'SvgIcon';

export default FilterList;
