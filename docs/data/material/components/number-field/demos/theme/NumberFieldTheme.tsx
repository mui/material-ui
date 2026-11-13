import NumberField from '@mui/material/NumberField';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

// @focus-start
const customTheme = (outerTheme: Theme): Theme => ({
  ...outerTheme,
  components: {
    ...outerTheme.components,
    MuiNumberField: {
      defaultProps: { size: 'small', controlsPosition: 'stacked' },
      styleOverrides: {
        incrementButton: {
          color: (outerTheme.vars ?? outerTheme).palette.success.main,
        },
        decrementButton: {
          color: (outerTheme.vars ?? outerTheme).palette.warning.main,
        },
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
