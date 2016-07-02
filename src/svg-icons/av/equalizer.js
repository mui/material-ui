import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvEqualizer = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"/>
  </SvgIcon>
);
AvEqualizer = pure(AvEqualizer);
AvEqualizer.displayName = 'AvEqualizer';
AvEqualizer.muiName = 'SvgIcon';

export default AvEqualizer;
