import * as React from 'react';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/core/Pagination';

export default function PaginationSize() {
  return (
    <Box
      sx={{
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 2 },
      }}
    >
      <Pagination count={10} size="small" />
      <Pagination count={10} />
      <Pagination count={10} size="large" />
    </Box>
  );
}
