import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/core/Pagination';
import Stack from '@material-ui/core/Stack';

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}
