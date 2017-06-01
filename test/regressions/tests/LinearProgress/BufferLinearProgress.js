// @flow

import React from 'react';
import LinearProgress from 'material-ui/Progress/LinearProgress';

export default function DeterminateLinearProgress() {
  return (
    <LinearProgress
      mode="buffer"
      value={60}
      valueBuffer={80}
      style={{
        width: 150,
      }}
    />
  );
}
