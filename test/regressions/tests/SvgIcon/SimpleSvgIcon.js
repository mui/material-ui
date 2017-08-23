// @flow

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const HomeIcon = props =>
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>;

export default function SimpleSvgIcon() {
  return (
    <div>
      <HomeIcon style={{ margin: 10 }} />
      <HomeIcon style={{ margin: 10, fill: '#2196f3' }} />
    </div>
  );
}
