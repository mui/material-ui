import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MD2Button, { ButtonProps as MD2ButtonProps } from '@mui/material/Button';
import { unstable_capitalize as capitalize } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button, { ButtonProps } from '@mui/material-next/Button';
import { CssVarsProvider, useColorScheme, extendTheme } from '@mui/material-next/styles';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';
import CssBaseline from '@mui/material/CssBaseline';

const ModeSwitcher = () => {
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
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <DarkIcon /> : <LightIcon />}
      </IconButton>
    </Tooltip>
  );
};

const variants: ButtonProps['variant'][] = [
  'elevated',
  'filled',
  'filledTonal',
  'outlined',
  'text',
];
const colors: ButtonProps['color'][] = ['primary', 'secondary', 'tertiary'];
const sizes: ButtonProps['size'][] = ['small', 'medium', 'large'];

const md2Variants: MD2ButtonProps['variant'][] = ['contained', 'outlined', 'text'];
const md2Colors: MD2ButtonProps['color'][] = [
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
];

const DemoComponents = () => {
  return (
    <Stack direction="column" gap={1}>
      <h4>Enabled</h4>
      <Stack direction="row" gap={1}>
        {variants.map((variant) => (
          <Button key={`${variant}-enabled`} variant={variant}>
            {capitalize(variant as string)}
          </Button>
        ))}
      </Stack>
      <h4>Disabled</h4>
      <Stack direction="row" gap={1}>
        {variants.map((variant) => (
          <Button key={`${variant}-disabled`} variant={variant} disabled>
            {capitalize(variant as string)}
          </Button>
        ))}
      </Stack>
      <h4>Colors</h4>
      <Stack direction="row" gap={1}>
        {colors.map((color) => (
          <Button key={color} variant="filled" color={color}>
            {capitalize(color as string)}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" gap={1}>
        {colors.map((color) => (
          <Button key={color} variant="outlined" color={color}>
            {capitalize(color as string)}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" gap={1}>
        {colors.map((color) => (
          <Button key={color} variant="text" color={color}>
            {capitalize(color as string)}
          </Button>
        ))}
      </Stack>
      <h4>Extended buttons</h4>
      <Stack direction="row" gap={1}>
        {colors.map((color) => (
          <Button key={color} variant="filled" color={color} endIcon={<SendIcon />}>
            Send
          </Button>
        ))}
        <Button variant="filled" disabled endIcon={<SendIcon />}>
          Send
        </Button>
      </Stack>
      <Stack direction="row" gap={1}>
        {colors.map((color) => (
          <Button key={color} variant="outlined" color={color} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        ))}
        <Button variant="outlined" disabled startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Stack>
      <h4>Sizes</h4>
      <Stack direction="row" gap={1} alignItems="end">
        {sizes.map((size) => (
          <Button key={size} variant="filled" size={size} endIcon={<SendIcon />}>
            {capitalize(size as string)}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" gap={1} alignItems="end">
        {sizes.map((size) => (
          <Button key={size} variant="outlined" size={size} startIcon={<DeleteIcon />}>
            {capitalize(size as string)}
          </Button>
        ))}
      </Stack>
      <h4>Material Design 2 Buttons</h4>
      <Stack direction="row" gap={1} alignItems="end">
        {md2Variants.map((variant) => (
          <MD2Button key={variant} variant={variant}>
            {capitalize(variant as string)}
          </MD2Button>
        ))}
      </Stack>
      <Stack direction="row" gap={1} alignItems="end">
        {md2Colors.map((color) => (
          <MD2Button key={color} variant="contained" color={color}>
            {capitalize(color as string)}
          </MD2Button>
        ))}
      </Stack>
    </Stack>
  );
};

const customPalette = {
  primary: {
    '0': '#000000',
    '10': '#1b1d00',
    '20': '#303300',
    '30': '#464a00',
    '40': '#5e6300',
    '50': '#777c0b',
    '60': '#919729',
    '70': '#abb242',
    '80': '#c7cd5a',
    '90': '#e3ea73',
    '95': '#f2f880',
    '99': '#ffffd3',
    '100': '#ffffff',
  },
  secondary: {
    '0': '#000000',
    '10': '#1c1d06',
    '20': '#313219',
    '30': '#47482e',
    '40': '#5f6043',
    '50': '#78795b',
    '60': '#929373',
    '70': '#adad8c',
    '80': '#c8c9a6',
    '90': '#e5e5c0',
    '95': '#f3f3ce',
    '99': '#fffed9',
    '100': '#ffffff',
  },
  tertiary: {
    '0': '#000000',
    '10': '#002118',
    '20': '#09372b',
    '30': '#244e41',
    '40': '#3c6658',
    '50': '#557f71',
    '60': '#6e9a8a',
    '70': '#88b4a4',
    '80': '#a3d0bf',
    '90': '#bfecdb',
    '95': '#ccfbe9',
    '99': '#f3fff8',
    '100': '#ffffff',
  },
  neutral: {
    '0': '#000000',
    '10': '#1c1c17',
    '20': '#31312b',
    '30': '#484741',
    '40': '#605e58',
    '50': '#797770',
    '60': '#929189',
    '70': '#adaba3',
    '80': '#c9c6be',
    '90': '#e5e2da',
    '95': '#f4f1e8',
    '99': '#ffffd3',
    '100': '#ffffff',
  },
  neutralVariant: {
    '0': '#000000',
    '10': '#1c1c12',
    '20': '#313125',
    '30': '#48473b',
    '40': '#5f5f51',
    '50': '#787869',
    '60': '#929182',
    '70': '#adac9c',
    '80': '#c9c7b6',
    '90': '#e5e3d2',
    '95': '#f4f1df',
    '99': '#ffffd3',
    '100': '#ffffff',
  },
  error: {
    '0': '#000000',
    '10': '#410002',
    '20': '#690005',
    '30': '#93000a',
    '40': '#ba1a1a',
    '50': '#de3730',
    '60': '#ff5449',
    '70': '#ff897d',
    '80': '#ffb4ab',
    '90': '#ffdad6',
    '95': '#ffedea',
    '99': '#fffbff',
    '100': '#ffffff',
  },
};

// custom MD3 theme
const cssVarsTheme = extendTheme({
  colorSchemes: {
    light: {
      ref: {
        palette: customPalette,
      },
    },
    dark: {
      ref: {
        palette: customPalette,
      },
    },
  },
});

export default function App() {
  return (
    <React.Fragment>
      <CssVarsProvider theme={cssVarsTheme}>
        <CssBaseline />
        <Stack sx={{ p: 1 }} alignItems="flex-start">
          <ModeSwitcher />
          <DemoComponents />
        </Stack>
      </CssVarsProvider>
    </React.Fragment>
  );
}
