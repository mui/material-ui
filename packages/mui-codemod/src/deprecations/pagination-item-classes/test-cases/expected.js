import { paginationItemClasses } from '@mui/material/PaginationItem';

fn({
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        "&.MuiPaginationItem-text.MuiPaginationItem-colorPrimary": {
          color: 'red',
        },
        "&.MuiPaginationItem-text.MuiPaginationItem-colorSecondary": {
          color: 'red',
        },
        "&.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary": {
          color: 'red',
        },
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
        [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
          color: 'red',
        },
        [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
          color: 'red',
        },
        [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
          color: 'red',
        },
        [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
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
    "&.MuiPaginationItem-text.MuiPaginationItem-colorSecondary": {
      color: 'red',
    },
    "&.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary": {
      color: 'red',
    },
    "&.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary": {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
      color: 'red',
    },
  };
});

<PaginationItem
  sx={{
    "&.MuiPaginationItem-text.MuiPaginationItem-colorPrimary": {
      color: 'red',
    },
    "&.MuiPaginationItem-text.MuiPaginationItem-colorSecondary": {
      color: 'red',
    },
    "&.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary": {
      color: 'red',
    },
    "&.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary": {
      color: 'red',
    },
  }}
/>;

<PaginationItem
  sx={{
    [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
      color: 'red',
    },
    [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
      color: 'red',
    },
  }}
/>;
