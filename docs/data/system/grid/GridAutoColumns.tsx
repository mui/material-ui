import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          bgcolor: '#fff',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

export default function GridAutoColumns() {
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'grid', gridAutoColumns: '1fr', gap: 1 }}>
        <Item sx={{ gridRow: '1', gridColumn: 'span 2' }}>span 2</Item>
        {/* The second non-visible column has width of 1/4 */}
        <Item sx={{ gridRow: '1', gridColumn: '4 / 5' }}>4 / 5</Item>
      </Box>
    </div>
  );
}
