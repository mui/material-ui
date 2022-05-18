import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { GlobalStyles } from '@mui/system';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Key from '@mui/icons-material/Key';
import Info from '@mui/icons-material/InfoRounded';
import Verified from '@mui/icons-material/VerifiedRounded';

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
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function JoyTypography() {
  return (
    <CssVarsProvider>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 2 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 2,
            p: 2,
            alignItems: 'center',
          }}
        >
          <TextField required label="Label" placeholder="Placeholder" helperText="Helper text" />

          <TextField
            color="warning"
            label="Label"
            placeholder="Placeholder"
            helperText="Helper text"
          />

          <TextField
            variant="soft"
            color="primary"
            label="Label"
            placeholder="Placeholder"
            helperText={
              <React.Fragment>
                <Info fontSize="md" sx={{ mr: 0.5 }} /> Helper text
              </React.Fragment>
            }
          />

          <TextField
            required
            error
            label="Label"
            placeholder="Placeholder"
            helperText="Helper text"
            endDecorator={<Info />}
          />

          <TextField disabled label="Label" placeholder="Placeholder" helperText="Helper text" />

          <TextField
            color="primary"
            disabled
            label="Label"
            placeholder="Placeholder"
            helperText="Helper text"
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 2,
            p: 2,
            alignItems: 'center',
          }}
        >
          <TextField
            label="Label"
            required
            placeholder="Placeholder"
            defaultValue="Hello world"
            helperText="This is a helper text."
          />
          <TextField
            label="Label"
            required
            error
            variant="soft"
            size="sm"
            placeholder="Placeholder"
            defaultValue="Hello world"
            helperText="This is a helper text."
          />
          <TextField
            label="Label"
            required
            color="success"
            size="lg"
            placeholder="Placeholder"
            helperText="This is a helper text."
            startDecorator={<Key fontSize="lg" />}
            endDecorator={<Verified fontSize="lg" />}
          />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
