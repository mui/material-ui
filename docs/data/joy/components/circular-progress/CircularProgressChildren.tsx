import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';

export default function CircularProgressChildren() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress determinate value={82.5}>
        82.5%
      </CircularProgress>
      <CircularProgress size="lg" color="warning">
        <WarningIcon color="warning" />
      </CircularProgress>
      <CircularProgress
        size="lg"
        color="danger"
        sx={{ '--CircularProgress-size': '80px' }}
      >
        <ReportIcon color="danger" />
      </CircularProgress>
    </Box>
  );
}
