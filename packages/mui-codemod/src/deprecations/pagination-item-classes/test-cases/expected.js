import { paginationItemClasses } from '@mui/material/PaginationItem';

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "&.MuiPaginationItem-text.MuiPaginationItem-colorPrimary": {
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
        [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    "&.MuiPaginationItem-text.MuiPaginationItem-colorPrimary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "&.MuiPaginationItem-text.MuiPaginationItem-colorPrimary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
      color: 'red',
    },
  }}
/>;

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "&.MuiPaginationItem-text.MuiPaginationItem-colorSecondary": {
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
        [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    "&.MuiPaginationItem-text.MuiPaginationItem-colorSecondary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "&.MuiPaginationItem-text.MuiPaginationItem-colorSecondary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
      color: 'red',
    },
  }}
/>;

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "&.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary": {
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
        [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    "&.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "&.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
      color: 'red',
    },
  }}
/>;
fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "&.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary": {
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
        [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    "&.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "&.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
      color: 'red',
    },
  }}
/>;
