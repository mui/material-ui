import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearQuery() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress aria-label="Loading…" variant="query" />
    </Box>
  );
}
