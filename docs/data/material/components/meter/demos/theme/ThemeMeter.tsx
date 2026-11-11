import Box from '@mui/material/Box';
import Meter, { meterClasses } from '@mui/material/Meter';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

// @focus-start
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: { mode: outerTheme.palette.mode },
    components: {
      MuiMeter: {
        defaultProps: { showValue: true },
        styleOverrides: {
          track: { height: 8, borderRadius: 4 },
          indicator: { borderRadius: 4 },
          label: {
            [`.${meterClasses.root}:hover &`]: { textDecoration: 'underline' },
          },
        },
        variants: [
          {
            props: { color: 'warning' },
            style: { [`& .${meterClasses.value}`]: { fontWeight: 'bold' } },
          },
        ],
      },
    },
  });
// @focus-end

export default function ThemeMeter() {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Box sx={{ display: 'grid', gap: 3, width: 280 }}>
        <Meter value={40} label="Disk" locale="en-US" />
        <Meter value={85} color="warning" label="Quota" locale="en-US" />
      </Box>
    </ThemeProvider>
  );
}
