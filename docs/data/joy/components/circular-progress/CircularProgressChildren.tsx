import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';

export default function CircularProgressChildren() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress size="sm">
        <Typography fontSize="xs" fontWeight="md">
          82.5
        </Typography>
      </CircularProgress>
      <CircularProgress size="md" color="warning">
        <IconButton variant="plain" size="sm" color="warning">
          <WarningIcon />
        </IconButton>
      </CircularProgress>
      <CircularProgress size="lg" color="danger">
        <IconButton variant="plain" size="sm" color="danger">
          <ReportIcon />
        </IconButton>
      </CircularProgress>
    </Box>
  );
}