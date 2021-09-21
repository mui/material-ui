import { createTheme, MuiThemeProvider, Theme } from '@material-ui/core';

function App() {
  return (
    <MuiThemeProvider theme={createTheme()}>
      <div data-testid="foo" />
    </MuiThemeProvider>
  );
}
