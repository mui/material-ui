/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem from '@material-ui/lab/MasonryItem';
import Box from '@material-ui/core/Box';

export default function BasicMasonry(): JSX.Element {
  return (
    <Masonry cols={4} spacing={1}>
      {heights.map((height, idx) => (
        <MasonryItem key={idx}>
          <Box sx={{textAlign:"center", height, border: 1, bgcolor: 'background.paper'}}>
            {idx + 1}
          </Box>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

const heights = [
  '150px',
  '30px',
  '90px',
  '70px',
  '110px',
  '150px',
  '130px',
  '80px',
  '50px',
  '90px',
  '100px',
  '150px',
  '30px',
  '50px',
  '80px',
];
