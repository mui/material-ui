import { createTheme, ThemeProvider, Theme } from '@material-ui/core/styles';

function App() {
  return <ThemeProvider theme={createTheme()}></ThemeProvider>;
}
