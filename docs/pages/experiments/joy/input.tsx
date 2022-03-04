import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { GlobalStyles } from '@mui/system';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Mail from '@mui/icons-material/MailOutlined';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import Key from '@mui/icons-material/Key';
import Info from '@mui/icons-material/InfoRounded';
import Check from '@mui/icons-material/CheckRounded';

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
          <Input placeholder="Placeholder" />
          <Input placeholder="Placeholder" startAdornment={<Mail fontSize="lg" />} size="sm" />
          <Input placeholder="Placeholder" startAdornment={<Mail />} />
          <Input placeholder="Placeholder" startAdornment={<Mail fontSize="xl2" />} size="lg" />
          <Input
            placeholder="Placeholder"
            color="primary"
            type="password"
            startAdornment={<Key />}
            endAdornment={
              <IconButton size="sm" sx={{ mr: '-6px' }}>
                <Visibility />
              </IconButton>
            }
          />
          <Input
            placeholder="Placeholder"
            color="danger"
            endAdornment={
              <Button color="danger" size="sm" sx={{ mr: '-6px' }}>
                Delete
              </Button>
            }
          />
          <Input placeholder="Placeholder" color="danger" endAdornment={<Info />} />
          <Input
            placeholder="Placeholder"
            color="info"
            endAdornment={
              <Button variant="light" size="sm" sx={{ mr: '-6px' }}>
                Search
              </Button>
            }
          />
          <Box sx={{ display: 'flex' }}>
            <Input
              placeholder="Placeholder"
              color="success"
              endAdornment={<Check />}
              sx={{
                minWidth: 0,
                flex: 1,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <Button
              color="success"
              sx={{ px: '0.75rem', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Subscribe
            </Button>
          </Box>
          <Input
            placeholder="Placeholder"
            color="warning"
            startAdornment={<Typography sx={{ color: 'inherit' }}>$</Typography>}
          />
          <Input placeholder="Placeholder" disabled />
          <Input placeholder="Placeholder" disabled defaultValue="I am in disabled state" />
          <Input variant="text" placeholder="Text variant" defaultValue="Default Value" />
          <Input variant="text" placeholder="Text variant" />
          <Input variant="text" placeholder="Text variant" disabled />
          <Input variant="text" placeholder="Text variant" color="primary" />
          <Input variant="light" placeholder="Light variant" defaultValue="Default Value" />
          <Input variant="light" placeholder="Light variant" />
          <Input variant="light" placeholder="Light variant" disabled />
          <Input variant="light" placeholder="Light variant" color="primary" />
          <Input variant="contained" placeholder="Contained variant" defaultValue="Default Value" />
          <Input variant="contained" placeholder="Contained variant" />
          <Input variant="contained" placeholder="Contained variant" disabled />
          <Input variant="contained" placeholder="Contained variant" color="primary" />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
