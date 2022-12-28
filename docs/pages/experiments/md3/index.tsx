import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
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

function ModeSwitcher() {
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
}

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

function DemoComponents() {
  const [radius, setRadius] = React.useState<string>('10');
  const [gap, setGap] = React.useState<string>('0.5');

  return (
    <Stack direction="column" gap={1}>
      <h4>Enabled</h4>
      <Stack direction="row" gap={1}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {capitalize(variant as string)}
          </Button>
        ))}
      </Stack>
      <h4>Enabled without a ripple effect</h4>
      <Stack direction="row" gap={1}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} disableRipple>
            {capitalize(variant as string)}
          </Button>
        ))}
      </Stack>
      <h4>Disabled</h4>
      <Stack direction="row" gap={1}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant} disabled>
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
      <h4>sx prop showcase</h4>
      <Stack>
        <Stack direction="row" gap={1} sx={{ py: 1 }}>
          <Button
            sx={{
              color: 'onError',
              bgcolor: 'error',
              border: 1,
              borderColor: 'tertiary',
              borderRadius: 'medium',
            }}
          >
            Button
          </Button>
          <Button
            sx={{
              color: 'error.100',
              bgcolor: 'error.40',
              border: 1,
              borderColor: 'tertiary.40',
              borderRadius: 2,
            }}
          >
            Button
          </Button>
          <MD2Button sx={{ borderRadius: 2, color: 'error.main' }}>MD2 Button</MD2Button>
        </Stack>
      </Stack>
      <h4>CSS vars playground</h4>
      <Stack>
        <Stack direction="row" gap={1} sx={{ py: 1 }}>
          <TextField
            label="--Button-radius"
            value={radius}
            type="number"
            onChange={(e) => {
              setRadius(e.target.value);
            }}
          />
          <TextField
            label="--Button-gap"
            value={gap}
            type="number"
            onChange={(e) => {
              setGap(e.target.value);
            }}
          />
        </Stack>
        <Stack direction="row" gap={1} alignItems="end">
          {sizes.map((size) => (
            <Button
              sx={{ '--Button-radius': `${radius}px`, '--Button-gap': `${gap}rem` }}
              key={size}
              variant="outlined"
              size={size}
              startIcon={<DeleteIcon />}
            >
              {capitalize(size as string)}
            </Button>
          ))}
        </Stack>
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
}

const customPalette = {
  primary: {
    '0': '#000000',
    '10': '#3e001f',
    '20': '#640036',
    '30': '#8d004e',
    '40': '#b70b68',
    '50': '#d83181',
    '60': '#fa4d9b',
    '70': '#ff83b3',
    '80': '#ffb0ca',
    '90': '#ffd9e3',
    '95': '#ffecf0',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  secondary: {
    '0': '#000000',
    '10': '#2b151d',
    '20': '#422932',
    '30': '#5a3f48',
    '40': '#74565f',
    '50': '#8e6f78',
    '60': '#a98892',
    '70': '#c5a2ac',
    '80': '#e2bdc7',
    '90': '#ffd9e3',
    '95': '#ffecf0',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  tertiary: {
    '0': '#000000',
    '10': '#2f1500',
    '20': '#48290c',
    '30': '#623f21',
    '40': '#7d5636',
    '50': '#996e4c',
    '60': '#b58763',
    '70': '#d2a17c',
    '80': '#f0bc95',
    '90': '#ffdcc3',
    '95': '#ffede3',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  neutral: {
    '0': '#000000',
    '10': '#201a1c',
    '20': '#352f30',
    '30': '#4c4546',
    '40': '#645c5e',
    '50': '#7e7577',
    '60': '#988e90',
    '70': '#b3a9aa',
    '80': '#cfc4c5',
    '90': '#ebe0e1',
    '95': '#faeef0',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  neutralVariant: {
    '0': '#000000',
    '10': '#23191c',
    '20': '#392d31',
    '30': '#514347',
    '40': '#695b5e',
    '50': '#837377',
    '60': '#9e8c91',
    '70': '#b9a7ab',
    '80': '#d5c2c6',
    '90': '#f2dde2',
    '95': '#ffecf0',
    '99': '#fffbff',
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
    <CssVarsProvider theme={cssVarsTheme}>
      <CssBaseline />
      <Stack sx={{ p: 1 }} alignItems="flex-start">
        <ModeSwitcher />
        <DemoComponents />
      </Stack>
    </CssVarsProvider>
  );
}
