import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';

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

export default function JoyVariant() {
  return (
    <CssVarsProvider>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Box
        sx={{
          maxWidth: { md: 1152, xl: 1536 },
          py: 3,
          mx: 'auto',
        }}
      >
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 2,
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 2.5,
              boxShadow: 'md',
              borderRadius: 'sm',
            },
          }}
        >
          <Sheet variant="solid" color="primary" enableVariantOverride>
            <Sheet
              sx={{
                bgcolor: 'background.body',
                width: 64,
                height: 64,
                borderRadius: '50%',
                position: 'absolute',
                top: '1rem',
                right: '1rem',
              }}
            />
            <Typography>text.primary</Typography>
            <Typography level="body2">text.secondary</Typography>
            <Typography level="body3" mb={1}>
              text.tertiary
            </Typography>
            <Divider />
            <Button variant="solid">solid</Button>
            <Button variant="soft">soft</Button>
            <Button variant="outlined">outlined</Button>
            <Button variant="plain">plain</Button>
            <Box sx={{ height: 40, bgcolor: 'background.surface' }} />
            <Box sx={{ height: 40, bgcolor: 'background.level1' }} />
            <Box sx={{ height: 40, bgcolor: 'background.level2' }} />
            <Box sx={{ height: 40, bgcolor: 'background.level3' }} />
            <Box sx={{ height: 40, bgcolor: 'background.tooltip' }} />
          </Sheet>
          <Sheet variant="soft" color="primary" enableVariantOverride>
            <Sheet
              variant="soft"
              sx={{
                bgcolor: 'background.body',
                width: 64,
                height: 64,
                borderRadius: '50%',
                position: 'absolute',
                top: '1rem',
                right: '1rem',
              }}
            />
            <Typography>text.primary</Typography>
            <Typography level="body2">text.secondary</Typography>
            <Typography level="body3" mb={1}>
              text.tertiary
            </Typography>
            <Divider />
            <Button variant="solid">solid</Button>
            <Button variant="soft">soft</Button>
            <Button variant="outlined">outlined</Button>
            <Button variant="plain">plain</Button>
            <Box sx={{ height: 40, bgcolor: 'background.surface' }} />
            <Box sx={{ height: 40, bgcolor: 'background.level1' }} />
            <Box sx={{ height: 40, bgcolor: 'background.level2' }} />
            <Box sx={{ height: 40, bgcolor: 'background.level3' }} />
            <Box sx={{ height: 40, bgcolor: 'background.tooltip' }} />
          </Sheet>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
