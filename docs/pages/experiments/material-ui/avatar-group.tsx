import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import { Avatar, AvatarGroup } from '@mui/material';

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

export default function AvatarGroupCssVars() {
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
            <AvatarGroup>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </AvatarGroup>
            <AvatarGroup variant="rounded">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </AvatarGroup>
            <AvatarGroup variant="square">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </AvatarGroup>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 1 }}>
            <AvatarGroup>
              <Avatar>H</Avatar>
              <Avatar>H</Avatar>
              <Avatar>H</Avatar>
            </AvatarGroup>
            <AvatarGroup variant="rounded">
              <Avatar variant="rounded">H</Avatar>
              <Avatar variant="rounded">H</Avatar>
              <Avatar variant="rounded">H</Avatar>
            </AvatarGroup>
            <AvatarGroup variant="square">
              <Avatar variant="square">H</Avatar>
              <Avatar variant="square">H</Avatar>
              <Avatar variant="square">H</Avatar>
            </AvatarGroup>
          </Box>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
