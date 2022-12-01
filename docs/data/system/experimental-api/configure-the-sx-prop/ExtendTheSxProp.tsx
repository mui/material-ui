import * as React from 'react';
import { createTheme, ThemeProvider, Box, handleBreakpoints } from '@mui/system';

const customTheme = createTheme({
  unstable_sxConfig: {
    size: {
      style: (props) => {
        const { size, theme } = props;

        const styleFromPropValue = (propValueFinal: number) => {
          const value = theme.spacing(propValueFinal);

          return {
            width: value,
            height: value,
          };
        };

        // Adding support for the breakpoints syntax
        return handleBreakpoints(props, size, styleFromPropValue);
      },
    },
  },
});

export default function ExtendSxProp() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          size: 10,
          border: '1px solid black',
        }}
      />
    </ThemeProvider>
  );
}
