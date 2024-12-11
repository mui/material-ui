import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { palette, PaletteProps, spacing, SpacingProps } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const Div = styled.div<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export default function CombiningStyleFunctionsDemo() {
  return (
    <ThemeProvider theme={theme}>
      <Div color="white" bgcolor="palevioletred" p={1}>
        Styled components
      </Div>
    </ThemeProvider>
  );
}
