import { paginationItemClasses } from '@mui/material/PaginationItem';

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "& .MuiPaginationItem-text.MuiPaginationItem-primary": {
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
        [`& .${paginationItemClasses.text}.${paginationItemClasses.primary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    "& .MuiPaginationItem-text.MuiPaginationItem-primary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`& .${paginationItemClasses.text}.${paginationItemClasses.primary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "& .MuiPaginationItem-text.MuiPaginationItem-primary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`& .${paginationItemClasses.text}.${paginationItemClasses.primary}`]: {
      color: 'red',
    },
  }}
/>;

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "& .MuiPaginationItem-text.MuiPaginationItem-secondary": {
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
        [`& .${paginationItemClasses.text}.${paginationItemClasses.secondary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    "& .MuiPaginationItem-text.MuiPaginationItem-secondary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`& .${paginationItemClasses.text}.${paginationItemClasses.secondary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "& .MuiPaginationItem-text.MuiPaginationItem-secondary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`& .${paginationItemClasses.text}.${paginationItemClasses.secondary}`]: {
      color: 'red',
    },
  }}
/>;

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "& .MuiPaginationItem-outlined.MuiPaginationItem-primary": {
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
        [`& .${paginationItemClasses.outlined}.${paginationItemClasses.primary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    "& .MuiPaginationItem-outlined.MuiPaginationItem-primary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`& .${paginationItemClasses.outlined}.${paginationItemClasses.primary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "& .MuiPaginationItem-outlined.MuiPaginationItem-primary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`& .${paginationItemClasses.outlined}.${paginationItemClasses.primary}`]: {
      color: 'red',
    },
  }}
/>;
fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "& .MuiPaginationItem-outlined.MuiPaginationItem-secondary": {
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
        [`& .${paginationItemClasses.outlined}.${paginationItemClasses.secondary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    "& .MuiPaginationItem-outlined.MuiPaginationItem-secondary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`& .${paginationItemClasses.outlined}.${paginationItemClasses.secondary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "& .MuiPaginationItem-outlined.MuiPaginationItem-secondary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`& .${paginationItemClasses.outlined}.${paginationItemClasses.secondary}`]: {
      color: 'red',
    },
  }}
/>;
