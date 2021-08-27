import * as React from 'react';
import Box from '@material-ui/core/Box';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem from '@material-ui/lab/MasonryItem';

const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

export default function FixedColumns() {
  return (
    <Box sx={{ width: 500, minHeight: 253 }}>
      <Masonry columns={4} spacing={1}>
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
    </Box>
  );
}
