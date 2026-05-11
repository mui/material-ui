import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'dark' } });

export default function BadgeColorContrastDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          {COLORS.map((color) => (
            <div key={color} data-color={color} style={{ padding: 8 }}>
              <Badge badgeContent={4} color={color}>
                <MailIcon color="action" />
              </Badge>
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
