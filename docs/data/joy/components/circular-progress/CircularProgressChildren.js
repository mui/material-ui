import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';

export default function CircularProgressChildren() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress color="warning">
        <WarningIcon color="warning" />
      </CircularProgress>
      <CircularProgress size="lg" determinate value={66.67}>
        2 / 3
      </CircularProgress>
      <CircularProgress color="danger" sx={{ '--CircularProgress-size': '80px' }}>
        <ReportIcon color="danger" />
      </CircularProgress>
    </Box>
  );
}
