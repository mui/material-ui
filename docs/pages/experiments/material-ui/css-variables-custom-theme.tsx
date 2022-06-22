import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
  experimental_extendTheme,
} from '@mui/material/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { teal, deepOrange, orange, cyan } from '@mui/material/colors';

const COLORS = ['primary', 'secondary', 'error', 'info', 'warning', 'success'];

const overrideCssVariables = {
  '--mui-palette-primary-main': '#FF0000',
  '--mui-palette-primary-mainChannel': '255 0 0',
  '--mui-palette-primary-dark': '#8b0000',
};

const ColorSchemePicker = () => {
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
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const theme = experimental_extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },
});

export default function Page() {
  return (
    <CssVarsProvider theme={theme}>
      <Box bgcolor="background.paper">
        <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
          <Box sx={{ pb: 4 }}>
            <ColorSchemePicker />
          </Box>
          {COLORS.map((color: any) => (
            <Box key={`button-${color}`} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
              <Button color={color} variant="contained">
                Text
              </Button>
              <Button color={color} variant="outlined">
                Text
              </Button>
              <Button color={color}>Text</Button>
            </Box>
          ))}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Button sx={overrideCssVariables} variant="contained">
              Text
            </Button>
            <Button sx={overrideCssVariables} variant="outlined">
              Text
            </Button>
            <Button sx={overrideCssVariables}>Text</Button>
          </Box>
        </Box>

        <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
          {COLORS.map((color: any) => (
            <Box key={`chip-${color}`} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
              <Chip color={color} variant="filled" label="Text" />
              <Chip color={color} variant="outlined" label="Text" />
              <Chip color={color} variant="notification" label="Text" />
            </Box>
          ))}
        </Box>

        <Box
          component="form"
          sx={{
            mb: 1,
            py: 5,
            maxWidth: { md: 1152, xl: 1536 },
            mx: 'auto',
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          {COLORS.map((color: any) => (
            <Input key={`input-${color}`} color={color} placeholder={color} />
          ))}
          <Input sx={overrideCssVariables} placeholder="custom" />
        </Box>
        <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar variant="rounded" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar variant="square" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Avatar>H</Avatar>
            <Avatar variant="rounded">H</Avatar>
            <Avatar variant="square">H</Avatar>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
