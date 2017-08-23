import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FormatPaint = props =>
  <SvgIcon {...props}>
    <path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z" />
  </SvgIcon>;

FormatPaint = pure(FormatPaint);
FormatPaint.muiName = 'SvgIcon';

export default FormatPaint;
