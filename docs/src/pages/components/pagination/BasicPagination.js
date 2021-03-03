import * as React from 'react';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/core/Pagination';

export default function BasicPagination() {
  return (
    <Box
      sx={{
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 2 },
      }}
    >
      <Pagination count={10} />
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} disabled />
    </Box>
  );
}
