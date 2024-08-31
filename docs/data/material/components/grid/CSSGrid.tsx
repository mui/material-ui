import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function CSSGrid() {
  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Item>xs=8</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 4' }}>
          <Item>xs=4</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 4' }}>
          <Item>xs=4</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Item>xs=8</Item>
        </Box>
      </Box>
    </Box>
  );
}
