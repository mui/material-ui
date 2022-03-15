import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import LocationOn from '@mui/icons-material/LocationOn';
import Groups from '@mui/icons-material/Groups';

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
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'body3'] as const).map((level) => (
          <Typography gutterBottom level={level} key={level}>
            {`${level} - typography`}
          </Typography>
        ))}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(300px, 1fr))',
            gap: 2,
            mt: 4,
          }}
        >
          <Box>
            <Typography level="body2">
              <LocationOn sx={{ mr: '0.25em' }} /> Miami, Florida
            </Typography>
            <Typography level="body2">
              <Groups fontSize="lg" sx={{ mr: '0.25em' }} /> 5 - 10 people
            </Typography>
          </Box>
          <Box>
            <Typography>
              <LocationOn sx={{ mr: '0.25em' }} /> Miami, Florida
            </Typography>
            <Typography>
              <Groups fontSize="xl" sx={{ mr: '0.25em' }} /> 5 - 10 people
            </Typography>
          </Box>
          <Box>
            <Typography level="h5">
              <LocationOn sx={{ mr: '0.25em' }} /> Miami, Florida
            </Typography>
            <Typography level="h5">
              <Groups fontSize="xl2" sx={{ mr: '0.25em' }} /> 5 - 10 people
            </Typography>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
