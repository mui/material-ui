import { withPigment } from '@pigment-css/nextjs-plugin';
import { createTheme } from '@mui/material';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPigment(nextConfig, {
  theme: createTheme({
    cssVariables: true,
    colorSchemes: { light: true, dark: true },
    defaultColorScheme: 'light',
    colorSchemeSelector: 'class',
    typography: {
      fontFamily: 'var(--font-roboto)',
    },
  }),
  transformLibraries: ['@mui/material'],
});
