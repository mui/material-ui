import * as React from 'react';
import {
  experimental_extendMD3Theme as extendMD3Theme,
  Experimental_CssVarsProvider as CssVarsProvider,
  Tooltip,
  IconButton,
  experimental_createMD3Theme as createMD3Theme,
  ThemeProvider,
  useColorScheme,
  Stack,
} from '@mui/material';
import { unstable_capitalize as capitalize } from 'packages/mui-utils';
import { Button } from '@mui/material-next';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';

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
    <Tooltip title={`Change to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
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
        {mode === 'light' ? <DarkIcon /> : <LightIcon />}
      </IconButton>
    </Tooltip>
  );
};

const variants = ['elevated', 'filled', 'filledTonal', 'outlined', 'text'];
const DemoComponents = () => {
  return (
    <Stack direction="row" gap={1}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {capitalize(variant)}
        </Button>
      ))}
    </Stack>
  );
};

const cssVarsTheme = extendMD3Theme();

const lightTheme = createMD3Theme();
const darkTheme = createMD3Theme({ palette: { mode: 'dark' } });

export default function App() {
  const [mode, setMode] = React.useState('light');
  return (
    <React.Fragment>
      <CssVarsProvider theme={cssVarsTheme}>
        <ModeSwitcher setMode={setMode} />
        <h1>Css variables - Material You theme</h1>
        <DemoComponents />
      </CssVarsProvider>
      <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
        <h1>Theme provider - Material You theme</h1>
        <DemoComponents />
      </ThemeProvider>
    </React.Fragment>
  );
}
