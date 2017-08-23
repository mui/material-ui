import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FlashOff = props =>
  <SvgIcon {...props}>
    <path d="M3.27 3L2 4.27l5 5V13h3v9l3.58-6.14L17.73 20 19 18.73 3.27 3zM17 10h-4l4-8H7v2.18l8.46 8.46L17 10z" />
  </SvgIcon>;

FlashOff = pure(FlashOff);
FlashOff.muiName = 'SvgIcon';

export default FlashOff;
