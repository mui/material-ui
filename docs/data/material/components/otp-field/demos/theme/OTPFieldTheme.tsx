import OTPField, {
  otpFieldClasses,
  OTPFieldRootDataAttributes,
} from '@mui/material/OTPField';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

// @focus-start
const customTheme = (outerTheme: Theme): Theme => ({
  ...outerTheme,
  components: {
    ...outerTheme.components,
    MuiOTPField: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        input: { borderRadius: '50%' },
        group: {
          [`&[${OTPFieldRootDataAttributes.complete}] .${otpFieldClasses.input}`]: {
            borderColor: (outerTheme.vars ?? outerTheme).palette.primary.main,
          },
        },
      },
    },
  },
});
// @focus-end

export default function OTPFieldTheme() {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <OTPField
        label="Unlock code"
        length={4}
        helperText="Fill all four inputs to highlight their borders."
      />
    </ThemeProvider>
  );
}
