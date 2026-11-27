import OTPField from '@mui/material/OTPField';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

const customTheme = (outerTheme: Theme): Theme => ({
  ...outerTheme,
  components: {
    ...outerTheme.components,
    // @focus-start
    MuiOTPField: {
      defaultProps: { size: 'small', color: 'secondary' },
      styleOverrides: {
        input: { borderRadius: '50%' },
      },
    },
    // @focus-end
  },
});

export default function OTPFieldTheme() {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <OTPField
        label="Unlock code"
        length={4}
        helperText="Enter the four digits shown on your device."
      />
    </ThemeProvider>
  );
}
