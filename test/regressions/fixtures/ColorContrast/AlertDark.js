import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const VARIANTS = ['filled', 'outlined', 'standard'];
const SEVERITIES = ['success', 'info', 'warning', 'error'];

// Alert extends Paper. In dark mode without CssVarsProvider, Paper sets
// `--Paper-overlay` to a degenerate `linear-gradient(...)` for elevation
// tint, which trips axe's color-contrast rule into `incomplete`
// (messageKey: "bgGradient"). Suppress it here so the probe can measure
// the actual fg/bg pair.
const theme = createTheme({
  palette: { mode: 'dark' },
  components: {
    MuiAlert: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default function AlertDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
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
