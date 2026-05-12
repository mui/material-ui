import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';

const COLORS = ['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];
const SELECTED = [false, true];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function ToggleButtonDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
        <Stack spacing={1}>
          {SELECTED.map((selected) => (
            <Stack key={String(selected)} direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <div key={color} data-color={color} data-selected={String(selected)}>
                  <ToggleButton value={color} color={color} selected={selected} onChange={() => {}}>
                    {color}
                  </ToggleButton>
                </div>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
