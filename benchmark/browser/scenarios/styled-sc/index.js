import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import styledComponents, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

const Div = styledComponents('div')(
  ({ theme }) => `
  width: 200px;
  height: 200px;
  border-width: 3px;
  border-color: white;
  :hover {
    background-color: ${theme.palette.secondary.dark};
  }
  ${[theme.breakpoints.up('sm')]} {
    background-color: ${theme.palette.primary.main};
    border-style: 'dashed';
  }
`,
);

const theme = createTheme();

export default function StyledSC() {
  return (
    <StyledComponentsThemeProvider theme={theme}>
      {new Array(1000).fill().map(() => (
        <Div>test case</Div>
      ))}
    </StyledComponentsThemeProvider>
  );
}
