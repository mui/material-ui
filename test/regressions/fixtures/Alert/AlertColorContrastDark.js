import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const VARIANTS = ['filled', 'outlined', 'standard'];
const SEVERITIES = ['success', 'info', 'warning', 'error'];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function AlertColorContrastDark() {
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
