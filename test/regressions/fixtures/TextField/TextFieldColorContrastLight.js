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
            <Stack key={variant} direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <div key={color} data-variant={variant} data-color={color}>
                  {/* `slotProps.inputLabel.shrink` forces the label to stay
                      *above* the input (not floating over it), so axe
                      doesn't see label/input bgOverlap. For outlined, we
                      also hide the notched fieldset since it overlaps the
                      input bounds — the contrast pair (input text vs page
                      bg) is what we want to measure, the border isn't. */}
                  <TextField
                    variant={variant}
                    color={color}
                    label={`${color} ${variant}`}
                    defaultValue="Sample"
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        sx: { '& .MuiOutlinedInput-notchedOutline': { display: 'none' } },
                      },
                    }}
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
