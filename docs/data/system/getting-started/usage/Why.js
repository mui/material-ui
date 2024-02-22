import * as React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/system/Box';

export default function Why() {
  return (
    <Box
      sx={{
        p: 2,
        minWidth: 300,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        borderRadius: 2,
      }}
    >
      <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
      <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
        98.3 K
      </Box>
      <Box
        component={TrendingUpIcon}
        sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }}
      />
      <Box
        sx={{
          display: 'inline',
          fontSize: 14,
          fontWeight: 'bold',
          color: 'success.dark',
          mx: 0.5,
        }}
      >
        18.7%
      </Box>
      <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
        vs. last week
      </Box>
    </Box>
  );
}
