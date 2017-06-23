import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FormatQuote = props =>
  <SvgIcon {...props}>
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </SvgIcon>;

FormatQuote = pure(FormatQuote);
FormatQuote.muiName = 'SvgIcon';

export default FormatQuote;
