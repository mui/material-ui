import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TEXT_COLORS = ['inherit', 'primary', 'secondary'];
const INDICATOR_COLORS = ['primary', 'secondary'];

const theme = createTheme({ palette: { mode: 'light' } });

export default function TabsLight() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <Stack spacing={2}>
          {TEXT_COLORS.map((textColor) => (
            <Stack key={textColor} direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {INDICATOR_COLORS.map((indicatorColor) => (
                <div
                  key={indicatorColor}
                  data-textcolor={textColor}
                  data-indicatorcolor={indicatorColor}
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.12)', minWidth: 240 }}
                >
                  <Tabs value={1} textColor={textColor} indicatorColor={indicatorColor}>
                    <Tab label="One" />
                    <Tab label="Two" />
                  </Tabs>
                </div>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
