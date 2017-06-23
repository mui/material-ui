import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FilterList = props =>
  <SvgIcon {...props}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </SvgIcon>;

FilterList = pure(FilterList);
FilterList.muiName = 'SvgIcon';

export default FilterList;
