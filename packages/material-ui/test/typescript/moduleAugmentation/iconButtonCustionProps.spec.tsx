import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';

// Update the IconButton's extendable props options
declare module '@material-ui/core/IconButton' {
  interface IconButtonPropsVariantOverrides {
    dashed: true;
  }
  interface IconButtonPropsColorOverrides {
    success: true;
  }
  interface IconButtonPropsSizeOverrides {
    extraLarge: true;
  }
}

// theme typings should work as expected
const theme = createMuiTheme({
  components: {
    MuiIconButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            border: `2px dashed grey`,
          },
        },
        {
          props: { size: 'extraLarge' },
          style: {
            fontSize: 26,
          },
        },
      ],
    },
  },
});

<IconButton variant="dashed" color="success" size="extraLarge">
  Custom
</IconButton>;
