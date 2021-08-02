/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import Box from '@material-ui/core/Box';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem from '@material-ui/lab/MasonryItem';

export default function FixedSpacing() {
  return (
    <Masonry columns={3} spacing={3} sx={{ height: 300 }}>
      {heights.map((height, index) => (
        <MasonryItem key={index}>
          <Box
            sx={{
              textAlign: 'center',
              height,
              border: 1,
              bgcolor: 'background.paper',
            }}
          >
            {index + 1}
          </Box>
        </MasonryItem>
      ))}
    </Masonry>
  );
}

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];
