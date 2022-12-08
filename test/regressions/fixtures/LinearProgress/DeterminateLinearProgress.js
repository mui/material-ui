import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export default function DeterminateLinearProgress() {
  return (
    <div>
      <LinearProgress variant="determinate" value={60} style={{ width: 150 }} />
      <LinearProgress variant="determinate" value={60} style={{ width: 150 }} color="inherit" />
    </div>
  );
}
