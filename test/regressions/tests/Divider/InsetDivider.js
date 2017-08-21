// @flow

import * as React from 'react';
import Divider from 'material-ui/Divider';

export default function InsetDivider() {
  return (
    <div style={{ padding: 2, width: 100 }}>
      <Divider inset />
    </div>
  );
}
