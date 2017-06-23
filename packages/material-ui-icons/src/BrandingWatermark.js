import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let BrandingWatermark = props =>
  <SvgIcon {...props}>
    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16h-9v-6h9v6z" />
  </SvgIcon>;

BrandingWatermark = pure(BrandingWatermark);
BrandingWatermark.muiName = 'SvgIcon';

export default BrandingWatermark;
