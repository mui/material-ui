import { paginationItemClasses } from '@mui/material/PaginationItem';

fn({
  PaginationItem: {
    styleOverrides: {
      root: {
        '& .MuiPaginationItem-textPrimary': {
          color: 'red',
        },
      },
    },
  },
});

fn({
  PaginationItem: {
    styleOverrides: {
      root: {
        [`& .${paginationItemClasses.textPrimary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    '& .MuiPaginationItem-textPrimary': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`& .${paginationItemClasses.textPrimary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    '& .MuiPaginationItem-textPrimary': {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`& .${paginationItemClasses.textPrimary}`]: {
      color: 'red',
    },
  }}
/>;
