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
    <CssVarsProvider
      theme={{
        components: {
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'xl',
            },
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: theme.vars.fontSize[ownerState.fontSize],
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' && {
                    color: theme.vars.palette[ownerState.color].textColor,
                  }),
              }),
            },
          },
        },
      }}
    >
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
          <Input placeholder="Placeholder" startAdornment={<Mail />} />
          <Input placeholder="Placeholder" startAdornment={<Mail fontSize="lg" />} size="sm" />
          <Input placeholder="Placeholder" startAdornment={<Mail />} size="lg" />
          <Input
            placeholder="Placeholder"
            color="primary"
            type="password"
            startAdornment={<Key />}
            endAdornment={
              <IconButton size="sm" sx={{ mr: '-5px' }}>
                <Visibility />
              </IconButton>
            }
          />
          <Input
            placeholder="Placeholder"
            color="danger"
            endAdornment={
              <Button color="danger" size="sm" sx={{ mr: '-5px' }}>
                Delete
              </Button>
            }
          />
          <Input
            placeholder="Placeholder"
            color="info"
            endAdornment={
              <Button variant="light" size="sm" sx={{ mr: '-5px' }}>
                Search
              </Button>
            }
          />
          <Box sx={{ display: 'flex' }}>
            <Input
              placeholder="Placeholder"
              color="success"
              sx={{
                minWidth: 0,
                flex: 1,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <Button sx={{ px: '0.75rem', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
              Subscribe
            </Button>
          </Box>
          <Input placeholder="Placeholder" color="warning" />
          <Input placeholder="Placeholder" disabled />
          <Input placeholder="Placeholder" disabled defaultValue="I am in disabled state" />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
