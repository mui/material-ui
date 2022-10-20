import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  Tooltip,
  IconButton,
  useColorScheme,
  Stack,
} from '@mui/material';
import { unstable_capitalize as capitalize } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button, { ButtonProps } from '@mui/material-next/Button';
import { extendTheme } from '@mui/material-next/styles';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';

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

const variants: ButtonProps['variant'][] = [
  'elevated',
  'filled',
  'filledTonal',
  'outlined',
  'text',
];
const colors: ButtonProps['color'][] = ['primary', 'secondary', 'tertiary'];
const sizes: ButtonProps['size'][] = ['small', 'medium', 'large'];

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
    </Stack>
  );
};

// default MD3 theme
const cssVarsTheme = extendTheme();

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mode, setMode] = React.useState('light');
  return (
    <React.Fragment>
      <CssVarsProvider theme={cssVarsTheme}>
        <ModeSwitcher setMode={setMode} />
        <DemoComponents />
      </CssVarsProvider>
    </React.Fragment>
  );
}
