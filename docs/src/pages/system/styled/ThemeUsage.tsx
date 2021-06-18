import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: 'white',
    },
  },
});

const MyThemeComponent = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

export default function ThemeUsage() {
  return (
    <ThemeProvider theme={theme}>
      <MyThemeComponent>Styled div with theme</MyThemeComponent>
    </ThemeProvider>
  );
}
