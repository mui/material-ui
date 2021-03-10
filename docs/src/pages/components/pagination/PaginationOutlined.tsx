import * as React from 'react';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/core/Pagination';

export default function PaginationOutlined() {
  return (
    <Box
      sx={{
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 2 },
      }}
    >
      <Pagination count={10} variant="outlined" />
      <Pagination count={10} variant="outlined" color="primary" />
      <Pagination count={10} variant="outlined" color="secondary" />
      <Pagination count={10} variant="outlined" disabled />
    </Box>
  );
}
