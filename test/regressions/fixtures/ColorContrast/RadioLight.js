import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];
const CHECKED = [false, true];

const theme = createTheme({ palette: { mode: 'light' } });

export default function RadioLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={1}>
          {CHECKED.map((checked) => (
            <Stack key={String(checked)} direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <div key={color} data-color={color} data-checked={String(checked)}>
                  {/* FormControlLabel wraps a real <label> around the input —
                      satisfies axe's `label` rule (a bare `aria-label` via
                      `inputProps` is dropped in v9). */}
                  <FormControlLabel
                    label={`${color} ${checked ? 'checked' : 'unchecked'}`}
                    control={<Radio color={color} checked={checked} onChange={() => {}} />}
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
