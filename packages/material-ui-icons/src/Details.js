import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Details = props =>
  <SvgIcon {...props}>
    <path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z" />
  </SvgIcon>;

Details = pure(Details);
Details.muiName = 'SvgIcon';

export default Details;
