import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let WatchLater = props =>
  <SvgIcon {...props}>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
  </SvgIcon>;

WatchLater = pure(WatchLater);
WatchLater.muiName = 'SvgIcon';

export default WatchLater;
