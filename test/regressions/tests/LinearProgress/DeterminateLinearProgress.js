import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

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
