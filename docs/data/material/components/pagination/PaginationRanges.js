import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRanges() {
  return (
    <Stack spacing={2}>
      <Pagination count={11} defaultPage={6} siblingCount={0} />
      <Pagination count={11} defaultPage={6} /> {/* Default ranges */}
      <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
      <Pagination count={11} defaultPage={6} boundaryCount={2} />
    </Stack>
  );
}
