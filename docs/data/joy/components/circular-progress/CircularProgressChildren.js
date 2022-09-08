import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';

export default function CircularProgressChildren() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress>
        <Typography fontSize="xs" fontWeight="md">
          82.5
        </Typography>
      </CircularProgress>
      <CircularProgress color="warning">
        <WarningIcon color="warning" />
      </CircularProgress>
      <CircularProgress color="danger">
        <ReportIcon color="danger" />
      </CircularProgress>
    </Box>
  );
}
