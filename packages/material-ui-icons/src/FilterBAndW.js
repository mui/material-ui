import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FilterBAndW = props =>
  <SvgIcon {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16l-7-8v8H5l7-8V5h7v14z" />
  </SvgIcon>;

FilterBAndW = pure(FilterBAndW);
FilterBAndW.muiName = 'SvgIcon';

export default FilterBAndW;
