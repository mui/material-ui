import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const COLORS = ['primary', 'secondary', 'error', 'info', 'warning', 'success'];

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

export default function Page() {
  return (
    <CssVarsProvider>
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
            <Button>Text</Button>
          </Box>
        ))}
      </Box>

      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box
          component="form"
          sx={{
            mb: 1,
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          {COLORS.map((color: any) => (
            <Input key={`input-${color}`} color={color} placeholder={color} />
          ))}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
