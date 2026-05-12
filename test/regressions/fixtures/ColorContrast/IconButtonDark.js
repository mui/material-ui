import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function IconButtonDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {COLORS.map((color) => (
            <div key={color} data-color={color}>
              <IconButton color={color} aria-label={`${color} delete`}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
