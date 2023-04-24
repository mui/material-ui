import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper() {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        cursor: 'pointer',
        '& > :not(style)': {
          m: 1,
          p: 2,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper
        elevation={isHovered ? 12 : 2}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? 'Hovering' : 'Hover me'}
      </Paper>
    </Box>
  );
}
