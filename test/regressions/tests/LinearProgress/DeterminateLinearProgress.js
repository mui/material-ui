// @flow

import React from 'react';
import LinearProgress from '@material-ui/core/Progress/LinearProgress';

export default function DeterminateLinearProgress() {
  return (
    <LinearProgress
      variant="determinate"
      value={60}
      style={{
        width: 150,
      }}
    />
  );
}
