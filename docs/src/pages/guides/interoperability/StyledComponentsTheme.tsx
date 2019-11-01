import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme, darken, fade } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const StyledButton = styled.button`
  ${({ theme }) => `
  padding: 8px 12px;
  border: 1px solid;
  cursor: pointer;
  outline: none;
  border-radius: ${theme.shape.borderRadius}px;
  color: ${theme.palette.primary.contrastText};
  background-color: ${theme.palette.primary.main};
  border-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'box-shadow'])};
  font-family: ${[
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(',')};
  &:hover {
    background-color: ${darken(theme.palette.primary.main, 0.1)};
    border-color: ${darken(theme.palette.primary.main, 0.2)};
  }
  &:active {
    background-color: ${darken(theme.palette.primary.main, 0.2)};
    border-color: ${darken(theme.palette.primary.main, 0.3)};
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem ${fade(theme.palette.primary.main, 0.5)};
  }
  font-size: 18px;
  ${theme.breakpoints.up('md')} {
    font-size: 16px;
  }
  `}
`;

export default function StyledComponentsTheme() {
  return (
    <NoSsr>
      <ThemeProvider theme={defaultTheme}>
        <StyledButton>Styled Components</StyledButton>
      </ThemeProvider>
    </NoSsr>
  );
}
