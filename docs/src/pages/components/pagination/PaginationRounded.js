import * as React from 'react';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/core/Pagination';

export default function PaginationRounded() {
  return (
    <Box
      sx={{
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 2 },
      }}
    >
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Box>
  );
}
