import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
  components: {
    MuiAvatarGroup: {
      overrides: {
        avatar: {
          border: 'none',
        },
        // @ts-expect-error invalid class key
        wrong: {
          display: 'flex',
        },
      },
    },
  },
});
