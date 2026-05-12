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
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
          {COLORS.map((color) => (
            <div key={color} data-color={color} style={{ padding: 8 }}>
              {/* See sibling Light fixture for why MailIcon is wrapped in a Box. */}
              <Badge badgeContent="new alert" color={color}>
                <Box sx={{ width: 140, height: 32, display: 'inline-flex', alignItems: 'center' }}>
                  <MailIcon color="action" />
                </Box>
              </Badge>
            </div>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
