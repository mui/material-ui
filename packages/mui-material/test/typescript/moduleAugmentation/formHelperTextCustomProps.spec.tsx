import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/FormHelperText' {
  interface FormHelperTextPropsVariantOverrides {
    myvariant: true;
  }
}

// theme typings should work as expected
const theme = createTheme({
  components: {
    MuiFormHelperText: {
        variants: [
            {
              props: { variant: 'standard' },
              style: {
                backgroundColor: '#e70000',
              },
            },
            {
                props: { variant: 'myvariant' },
                style: {
                  backgroundColor: '#e70000',
                },
              },
          ],
    }
  },
});

<FormHelperText variant="myvariant">
Invalid
</FormHelperText>;

// @ts-expect-error The contained variant was disabled
<FormHelperText variant="standard">
  Invalid
</FormHelperText>;

