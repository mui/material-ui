import * as React from 'react';
import {
  experimental_extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  styled,
  Button,
  createTheme,
  ThemeProvider,
  useColorScheme,
  Stack,
} from '@mui/material';

const cssVarsTheme = experimental_extendTheme({
  useMaterialYou: true,
});

const lightTheme = createTheme({
  useMaterialYou: true,
});
const darkTheme = createTheme({
  palette: { mode: 'dark' },
  useMaterialYou: true,
});

const ModeSwitcher = ({ setMode: setModeProp }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
          setModeProp('dark');
        } else {
          setMode('light');
          setModeProp('light');
        }
      }}
    >
      {mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </Button>
  );
};

const DemoComponents = () => {
  return (
    <Stack direction="row" gap={1}>
      <Button variant="elevated">Elevated</Button>
      <Button variant="filled">Filled</Button>
      <Button variant="filledTonal">Filled tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  );
};

export default function App() {
  const [mode, setMode] = React.useState('light');
  return (
    <>
      <CssVarsProvider theme={cssVarsTheme}>
        <ModeSwitcher setMode={setMode} />
        <h1>Css variables - Material You theme</h1>
        <DemoComponents />
      </CssVarsProvider>
      <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
        <h1>Theme provider - Material You theme</h1>
        <DemoComponents />
      </ThemeProvider>
    </>
  );
}
