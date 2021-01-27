import * as React from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';

// Update the Button's extendable props options
declare module '@material-ui/core/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
  interface ButtonPropsColorOverrides {
    success: true;
  }
  interface ButtonPropsSizeOverrides {
    extraLarge: true;
  }
}

// theme typings should work as expected
const theme = createMuiTheme({
  components: {
    MuiButton: {
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

<Button variant="dashed" color="success" size="extraLarge">
  Custom
</Button>;
