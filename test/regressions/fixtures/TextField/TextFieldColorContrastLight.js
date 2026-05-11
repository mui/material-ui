import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const VARIANTS = ['filled', 'outlined', 'standard'];
const COLORS = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function TextFieldColorContrastLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={2}>
          {VARIANTS.map((variant) => (
            <Stack key={variant} direction="row" spacing={2} flexWrap="wrap">
              {COLORS.map((color) => (
                <div key={color} data-variant={variant} data-color={color}>
                  <TextField
                    variant={variant}
                    color={color}
                    label={`${color} ${variant}`}
                    defaultValue="Sample"
                    helperText={`${color} helper`}
                  />
                </div>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
