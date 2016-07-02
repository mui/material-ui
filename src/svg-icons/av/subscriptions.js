import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvSubscriptions = (props) => (
  <SvgIcon {...props}>
    <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/>
  </SvgIcon>
);
AvSubscriptions = pure(AvSubscriptions);
AvSubscriptions.displayName = 'AvSubscriptions';
AvSubscriptions.muiName = 'SvgIcon';

export default AvSubscriptions;
