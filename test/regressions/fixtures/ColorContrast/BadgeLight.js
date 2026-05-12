import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function BadgeLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
          {COLORS.map((color) => (
            <div key={color} data-color={color} style={{ padding: 8 }}>
              {/* The badge bubble paints outside MailIcon's 24x24 bounds, so
                  axe trips its `elmPartiallyObscured` guard. Wrapping in a
                  larger Box gives the badge a roomy anchor; the bubble now
                  sits entirely inside the Badge root and axe samples it
                  cleanly. */}
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
