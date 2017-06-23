import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let UnfoldMore = props =>
  <SvgIcon {...props}>
    <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
  </SvgIcon>;

UnfoldMore = pure(UnfoldMore);
UnfoldMore.muiName = 'SvgIcon';

export default UnfoldMore;
