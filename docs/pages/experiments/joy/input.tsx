import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { GlobalStyles } from '@mui/system';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
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
import Search from '@mui/icons-material/SearchRounded';

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
          <Input placeholder="Placeholder" startDecorator={<Mail />} size="sm" />
          <Input placeholder="Placeholder" startDecorator={<Mail />} />
          <Input placeholder="Placeholder" startDecorator={<Mail />} size="lg" />
          <Input
            placeholder="Placeholder"
            color="primary"
            type="password"
            startDecorator={<Key />}
            endDecorator={
              <IconButton>
                <Visibility />
              </IconButton>
            }
          />
          <Input
            placeholder="Placeholder"
            color="danger"
            size="lg"
            endDecorator={
              <Button color="danger" size="sm" startIcon={<Info />}>
                Delete
              </Button>
            }
          />
          <Input placeholder="Placeholder" color="danger" endDecorator={<Info />} />
          <Input
            placeholder="Placeholder"
            color="info"
            endDecorator={
              <Button variant="soft" size="sm">
                Search
              </Button>
            }
          />
          <Box sx={{ display: 'flex', height: 56 }}>
            <Input
              placeholder="Placeholder"
              color="success"
              endDecorator={<Check />}
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
            startDecorator={<Typography sx={{ color: 'inherit' }}>$</Typography>}
          />
          <Input placeholder="Placeholder" disabled />
          <Input placeholder="Placeholder" disabled defaultValue="I am in disabled state" />
          <Input variant="plain" placeholder="Text variant" defaultValue="Default Value" />
          <Input variant="plain" placeholder="Text variant" />
          <Input variant="plain" placeholder="Text variant" disabled />
          <Input variant="plain" placeholder="Text variant" color="primary" />
          <Input variant="soft" placeholder="Light variant" defaultValue="Default Value" />
          <Input variant="soft" placeholder="Light variant" />
          <Input variant="soft" placeholder="Light variant" disabled />
          <Input variant="soft" placeholder="Light variant" color="primary" />
          <Input variant="solid" placeholder="Contained variant" defaultValue="Default Value" />
          <Input variant="solid" placeholder="Contained variant" />
          <Input variant="solid" placeholder="Contained variant" disabled />
          <Input variant="solid" placeholder="Contained variant" color="primary" />
          <Input
            size="sm"
            startDecorator={<Search />}
            placeholder="Search anything"
            endDecorator={
              <IconButton variant="outlined" color="neutral" size="sm">
                /
              </IconButton>
            }
          />
          <Input
            size="lg"
            startDecorator={<Search />}
            placeholder="Search anything"
            endDecorator={
              <IconButton variant="outlined" color="neutral">
                /
              </IconButton>
            }
          />
          <Input
            startDecorator={<Search />}
            placeholder="Search anything"
            endDecorator={<Chip size="sm">New</Chip>}
          />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
