import * as React from 'react';
import List from '@mui/material/List';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/List' {
  interface ListPropsVariantOverrides {
    custom: true;
  }
}

// theme typings should work as expected
const theme = createTheme({
  components: {
    MuiList: {
      variants: [
        {
          props: { variant: 'custom' },
          style: {
            backgroundColor: '#ffa726',
            color: '#ffffff',
          },
        },
      ],
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'custom' && {}),
        }),
      },
    },
  },
});

<List variant="custom" />;

// @ts-expect-error unknown variant
<List variant="unknown" />;
