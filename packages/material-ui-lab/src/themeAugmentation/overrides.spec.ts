import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
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
