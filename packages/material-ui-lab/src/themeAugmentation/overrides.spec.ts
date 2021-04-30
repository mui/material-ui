import { createTheme } from '@material-ui/core';

createTheme({
  overrides: {
    MuiAvatarGroup: {
      avatar: {
        border: 'none',
      },
      // @ts-expect-error invalid class key
      wrong: {
        display: 'flex',
      },
    },
  },
});
