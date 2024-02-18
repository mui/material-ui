import { paginationItemClasses } from '@mui/material/PaginationItem';

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        '&.MuiPaginationItem-textPrimary': {
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
      },
    },
  },
});

styled(Component)(() => {
  return {
    '&.MuiPaginationItem-textPrimary': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.textPrimary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    '&.MuiPaginationItem-textPrimary': {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.textPrimary}`]: {
      color: 'red',
    },
  }}
/>;

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        '&.MuiPaginationItem-textSecondary': {
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
        [`&.${paginationItemClasses.textSecondary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    '&.MuiPaginationItem-textSecondary': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.textSecondary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    '&.MuiPaginationItem-textSecondary': {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.textSecondary}`]: {
      color: 'red',
    },
  }}
/>;

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        '&.MuiPaginationItem-outlinedPrimary': {
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
        [`&.${paginationItemClasses.outlinedPrimary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    '&.MuiPaginationItem-outlinedPrimary': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.outlinedPrimary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    '&.MuiPaginationItem-outlinedPrimary': {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.outlinedPrimary}`]: {
      color: 'red',
    },
  }}
/>;
fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
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
        [`&.${paginationItemClasses.outlinedSecondary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    '&.MuiPaginationItem-outlinedSecondary': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.outlinedSecondary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    '&.MuiPaginationItem-outlinedSecondary': {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.outlinedSecondary}`]: {
      color: 'red',
    },
  }}
/>;
