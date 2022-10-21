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

// default MD3 theme
const cssVarsTheme = extendTheme();

export default function App() {
  return (
    <React.Fragment>
      <CssVarsProvider theme={cssVarsTheme}>
        <ModeSwitcher />
        <DemoComponents />
      </CssVarsProvider>
    </React.Fragment>
  );
}
