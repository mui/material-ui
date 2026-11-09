import NumberField from '@mui/material/NumberField';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

// @focus-start
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: { mode: outerTheme.palette.mode },
    direction: outerTheme.direction,
    components: {
      MuiNumberField: {
        defaultProps: { size: 'small', controlsPosition: 'stacked' },
        styleOverrides: {
          incrementButton: { color: outerTheme.palette.success.main },
          decrementButton: { color: outerTheme.palette.warning.main },
        },
      },
    },
  });
// @focus-end

export default function NumberFieldTheme() {
  const outerTheme = useTheme();
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <NumberField label="Quantity" defaultValue={5} min={0} max={10} />
    </ThemeProvider>
  );
}
