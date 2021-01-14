import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import { createMuiTheme } from '@material-ui/core/styles';

// Update the Button's extendable props options
declare module '@material-ui/core/Badge' {
  interface BadgePropsVariantOverrides {
    dashed: true;
  }
  interface BadgePropsColorOverrides {
    success: true;
  }
}

// theme typings should work as expected
const theme = createMuiTheme({
  components: {
    MuiBadge: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            border: `2px dashed grey`,
          },
        },
        {
          props: { color: 'success' },
          style: {
            backgroundColor: 'green',
          },
        },
      ],
    },
  },
});

<Badge variant="dashed" color="success" badgeContent={123} />;
