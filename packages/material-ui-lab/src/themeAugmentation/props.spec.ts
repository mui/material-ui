import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
  components: {
    MuiAvatarGroup: {
      defaultProps: {
        spacing: 'small',
        // @ts-expect-error invalid prop
        maximum: 5,
      },
    },
  },
});
