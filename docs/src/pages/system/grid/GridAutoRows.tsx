import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function GridAutoColumns() {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <Box
        sx={{
          display: 'grid',
          gridAutoRows: '40px',
          gap: 1,
        }}
      >
        <Item sx={{ gridColumn: '1', gridRow: 'span 2' }}>span 2</Item>
        {/* The second non-visible row has height of 40px */}
        <Item sx={{ gridColumn: '1', gridRow: '4 / 5' }}>4 / 5</Item>
      </Box>
    </div>
  );
}
