import { paginationItemClasses } from '@mui/material/PaginationItem';

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        '&.MuiPaginationItem-textPrimary': {
          color: 'red',
        },
        '&.MuiPaginationItem-textSecondary': {
          color: 'red',
        },
        '&.MuiPaginationItem-outlinedPrimary': {
          color: 'red',
        },
        '&.MuiPaginationItem-outlinedSecondary': {
          color: 'red',
        },
      },
    },
  },
});

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        [`&.${paginationItemClasses.textPrimary}`]: {
          color: 'red',
        },
        [`&.${paginationItemClasses.textSecondary}`]: {
          color: 'red',
        },
        [`&.${paginationItemClasses.outlinedPrimary}`]: {
          color: 'red',
        },
        [`&.${paginationItemClasses.outlinedSecondary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    '&.MuiPaginationItem-textPrimary': {
      color: 'red',
    },
    '&.MuiPaginationItem-textSecondary': {
      color: 'red',
    },
    '&.MuiPaginationItem-outlinedPrimary': {
      color: 'red',
    },
    '&.MuiPaginationItem-outlinedSecondary': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.textPrimary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.textSecondary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.outlinedPrimary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.outlinedSecondary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    '&.MuiPaginationItem-textPrimary': {
      color: 'red',
    },
    '&.MuiPaginationItem-textSecondary': {
      color: 'red',
    },
    '&.MuiPaginationItem-outlinedPrimary': {
      color: 'red',
    },
    '&.MuiPaginationItem-outlinedSecondary': {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.textPrimary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.textSecondary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.outlinedPrimary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.outlinedSecondary}`]: {
      color: 'red',
    },
  }}
/>;
