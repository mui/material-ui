// @flow

import * as React from 'react';
import LinearProgress from 'material-ui/Progress/LinearProgress';

export default function DeterminateLinearProgress() {
  return (
    <LinearProgress
      mode="determinate"
      value={60}
      style={{
        width: 150,
      }}
    />
  );
}
