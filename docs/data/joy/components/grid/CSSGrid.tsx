import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.level1,
  }),
}));

export default function CSSGrid() {
  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Item>size=8</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 4' }}>
          <Item>size=4</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 4' }}>
          <Item>size=4</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Item>size=8</Item>
        </Box>
      </Box>
    </Box>
  );
}
