import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
  },
});

const Styledvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.secondary.main};
    transform: scale(1.3);
  }
  `}
`;

export default function TransitionHover() {
  return (
    <NoSsr>
      <MuiThemeProvider theme={customTheme}>
        <ThemeProvider theme={customTheme}>
          <Styledvatar>OP</Styledvatar>
        </ThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  );
}
