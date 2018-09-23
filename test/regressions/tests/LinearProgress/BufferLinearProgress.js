import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function DeterminateLinearProgress() {
  return (
    <LinearProgress
      variant="buffer"
      value={60}
      valueBuffer={80}
      style={{
        width: 150,
      }}
    />
  );
}
