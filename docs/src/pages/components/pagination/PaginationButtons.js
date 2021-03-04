import * as React from 'react';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/core/Pagination';

export default function PaginationButtons() {
  return (
    <Box
      sx={{
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 2 },
      }}
    >
      <Pagination count={10} showFirstButton showLastButton />
      <Pagination count={10} hidePrevButton hideNextButton />
    </Box>
  );
}
