import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];
const CHECKED = [false, true];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function SwitchColorContrastDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={1}>
          {CHECKED.map((checked) => (
            <Stack key={String(checked)} direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <div key={color} data-color={color} data-checked={String(checked)}>
                  <Switch
                    color={color}
                    checked={checked}
                    onChange={() => {}}
                    inputProps={{ 'aria-label': `${color} ${checked ? 'on' : 'off'}` }}
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
