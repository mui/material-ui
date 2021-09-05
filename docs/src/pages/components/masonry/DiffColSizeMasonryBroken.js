import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function DiffColSizeMasonryBroken() {
  return (
    <Box sx={{ width: 500, minHeight: 503 }}>
      <Masonry columns={4} spacing={1}>
        {itemData.map((item, index) => (
          <MasonryItem key={index} columnSpan={item.span}>
            <Item sx={{ height: item.height }}>{index + 1}</Item>
          </MasonryItem>
        ))}
      </Masonry>
    </Box>
  );
}

const itemData = [
  { height: 150 },
  { height: 30 },
  { height: 90, span: 2 },
  { height: 70 },
  { height: 150 },
  { height: 120 },
  { height: 100, span: 2 },
  { height: 80, span: 2 },
  { height: 35 },
  { height: 70 },
  { height: 100, span: 2 },
  { height: 157 },
  { height: 50 },
  { height: 50, span: 2 },
  { height: 50 },
];
