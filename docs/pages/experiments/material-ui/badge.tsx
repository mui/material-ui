import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import MailIcon from '@mui/icons-material/Mail';

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

export default function BadgeCssVars() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Container sx={{ my: 5 }}>
        <Box sx={{ pb: 2 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))',
            gridAutoRows: 'minmax(160px, auto)',
            gap: 2,
            '& > div': {
              placeSelf: 'center',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Badge variant="dot" badgeContent={1}>
              <MailIcon color="action" />
            </Badge>
            <Badge badgeContent={1}>
              <MailIcon color="action" />
            </Badge>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Badge variant="dot" badgeContent={1} color="primary">
              <MailIcon color="action" />
            </Badge>
            <Badge badgeContent={1} color="primary">
              <MailIcon color="action" />
            </Badge>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Badge variant="dot" badgeContent={1} color="secondary">
              <MailIcon color="action" />
            </Badge>
            <Badge badgeContent={1} color="secondary">
              <MailIcon color="action" />
            </Badge>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Badge variant="dot" badgeContent={1} color="error">
              <MailIcon color="action" />
            </Badge>
            <Badge badgeContent={1} color="error">
              <MailIcon color="action" />
            </Badge>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Badge variant="dot" badgeContent={1} color="info">
              <MailIcon color="action" />
            </Badge>
            <Badge badgeContent={1} color="info">
              <MailIcon color="action" />
            </Badge>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Badge variant="dot" badgeContent={1} color="success">
              <MailIcon color="action" />
            </Badge>
            <Badge badgeContent={1} color="success">
              <MailIcon color="action" />
            </Badge>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <Badge variant="dot" badgeContent={1} color="warning">
              <MailIcon color="action" />
            </Badge>
            <Badge badgeContent={1} color="warning">
              <MailIcon color="action" />
            </Badge>
          </Box>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
