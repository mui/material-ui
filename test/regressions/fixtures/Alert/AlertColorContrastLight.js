import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const VARIANTS = ['filled', 'outlined', 'standard'];
const SEVERITIES = ['success', 'info', 'warning', 'error'];

// Match the Dark fixture's overrides for symmetry — `backgroundImage: 'none'`
// is a no-op in light mode (Paper only sets `--Paper-overlay` in dark) but
// keeps the two files in lockstep.
const theme = createTheme({
  palette: { mode: 'light' },
  components: {
    MuiAlert: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default function AlertColorContrastLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={1}>
          {VARIANTS.map((variant) => (
            <Stack key={variant} direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {SEVERITIES.map((severity) => (
                <div key={severity} data-variant={variant} data-severity={severity}>
                  <Alert variant={variant} severity={severity}>
                    {severity} {variant}
                  </Alert>
                </div>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
