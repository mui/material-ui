import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];
const CHECKED = [false, true];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function CheckboxColorContrastDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={1}>
          {CHECKED.map((checked) => (
            <Stack key={String(checked)} direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <div key={color} data-color={color} data-checked={String(checked)}>
                  {/* See sibling Light fixture for why FormControlLabel is used. */}
                  <FormControlLabel
                    label={`${color} ${checked ? 'checked' : 'unchecked'}`}
                    control={<Checkbox color={color} checked={checked} onChange={() => {}} />}
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
