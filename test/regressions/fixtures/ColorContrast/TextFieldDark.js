import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const VARIANTS = ['filled', 'outlined', 'standard'];
const COLORS = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function TextFieldDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
        <Stack spacing={2}>
          {VARIANTS.map((variant) => (
            <Stack key={variant} direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <div key={color} data-variant={variant} data-color={color}>
                  {/* See sibling Light fixture for why the label uses
                      `shrink` and the notched fieldset is hidden. */}
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
