import { listSubheaderClasses } from '@mui/material/ListSubheader';
import { listItemButtonClasses } from '@mui/material/ListItemButton';
import { typographyClasses } from '@mui/material/Typography';

/* eslint-disable import/prefer-default-export */
export const sidebarCustomizations = {
  MuiDrawer: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${listSubheaderClasses.root}`]: {
          lineHeight: 3,
        },
        [`& .${listItemButtonClasses.root}`]: {
          '&.Mui-selected': {
            [`& .${typographyClasses.root}`]: {
              color: (theme.vars ?? theme).palette.text.primary,
            },
          },
        },
      }),
    },
  },
};
