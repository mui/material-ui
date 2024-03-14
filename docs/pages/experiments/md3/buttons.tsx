import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MD2Button, { ButtonProps as MD2ButtonProps } from '@mui/material/Button';
import { unstable_capitalize as capitalize } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button, { ButtonProps } from '@mui/material-next/Button';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { customPalette, ModeSwitcher } from '.';

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

// custom M3 theme
const cssVarsTheme = extendTheme({
  ref: {
    palette: customPalette,
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
