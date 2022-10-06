import * as React from 'react';
import {
  experimental_extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  Tooltip,
  IconButton,
  Button,
  createTheme,
  ThemeProvider,
  useColorScheme,
  Stack,
  ButtonProps,
} from '@mui/material';
import { unstable_capitalize as capitalize } from 'packages/mui-utils';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';
import type {} from '@mui/material/styles/MaterialYouModuleAugmentation';

const ModeSwitcher = ({ setMode: setModeProp }: { setMode: (arg: string) => void }) => {
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
        <Button key={variant} variant={variant as ButtonProps['variant']}>
          {capitalize(variant as string)}
        </Button>
      ))}
    </Stack>
  );
};

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
