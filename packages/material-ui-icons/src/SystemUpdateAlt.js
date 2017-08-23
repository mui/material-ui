import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SystemUpdateAlt = props =>
  <SvgIcon {...props}>
    <path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z" />
  </SvgIcon>;

SystemUpdateAlt = pure(SystemUpdateAlt);
SystemUpdateAlt.muiName = 'SvgIcon';

export default SystemUpdateAlt;
