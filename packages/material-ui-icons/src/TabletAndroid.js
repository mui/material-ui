import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let TabletAndroid = props =>
  <SvgIcon {...props}>
    <path d="M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z" />
  </SvgIcon>;

TabletAndroid = pure(TabletAndroid);
TabletAndroid.muiName = 'SvgIcon';

export default TabletAndroid;
