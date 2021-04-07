import * as React from 'react';
import Pagination from '@material-ui/core/Pagination';
import Stack from '@material-ui/core/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}
