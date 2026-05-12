import { styled, createTheme, ThemeProvider } from '@mui/system';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: 'white',
    },
  },
});

const MyThemeComponent = styled('div')(({ theme }) =>
  theme.unstable_sx({
    color: 'primary.contrastText',
    backgroundColor: 'primary.main',
    padding: 1,
    borderRadius: 1,
  }),
);

export default function UsingWithSx() {
  // @focus-start @padding 1
  return (
    <ThemeProvider theme={customTheme}>
      <MyThemeComponent>Styled div with theme</MyThemeComponent>
    </ThemeProvider>
  );
  // @focus-end
}
