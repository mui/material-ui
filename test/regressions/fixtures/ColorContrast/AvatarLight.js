import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const VARIANTS = ['circular', 'rounded', 'square'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function AvatarLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {VARIANTS.map((variant) => (
              <div key={variant} data-usage="initials" data-variant={variant}>
                <Avatar variant={variant}>OP</Avatar>
              </div>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            {VARIANTS.map((variant) => (
              <div key={variant} data-usage="surplus" data-variant={variant}>
                <AvatarGroup variant={variant} max={3}>
                  <Avatar variant={variant}>A</Avatar>
                  <Avatar variant={variant}>B</Avatar>
                  <Avatar variant={variant}>C</Avatar>
                  <Avatar variant={variant}>D</Avatar>
                  <Avatar variant={variant}>E</Avatar>
                </AvatarGroup>
              </div>
            ))}
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
