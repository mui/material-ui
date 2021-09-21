import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function BasicMasonry() {
  return (
    <Box sx={{ width: 500, minHeight: 393 }}>
      <Masonry columns={4} spacing={1}>
        {heights.map((height, index) => (
          <MasonryItem key={index}>
            <Item sx={{ height }}>{index + 1}</Item>
          </MasonryItem>
        ))}
      </Masonry>
    </Box>
  );
}
