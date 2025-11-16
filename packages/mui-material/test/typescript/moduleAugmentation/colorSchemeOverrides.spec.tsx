import { createTheme, styled } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface ColorSchemeOverrides {
    superDark: true;
  }
}

// Test theme creation without CSS variables
// When cssVariables is false, applyStyles should still work with custom color schemes
const theme = createTheme({
  cssVariables: false,
});

// Test that applyStyles works with custom color schemes
theme.applyStyles('superDark', { color: 'red' });
theme.applyStyles('light', { color: 'blue' });
theme.applyStyles('dark', { color: 'green' });

// @ts-expect-error - 'invalid' is not a valid color scheme
theme.applyStyles('invalid', { color: 'yellow' });

// Test that applyStyles works with custom color schemes in styled components
const StyledDiv = styled('div')(({ theme: t }) => [
  {
    backgroundColor: '#fff',
  },
  t.applyStyles('superDark', {
    backgroundColor: '#000',
  }),
]);

// Test that applyStyles can be used in sx callback
const sxCallback = (t: typeof theme) =>
  t.applyStyles('superDark', {
    backgroundColor: '#000',
  });
