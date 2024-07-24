import { withPigment } from '@pigment-css/nextjs-plugin';
import { extendTheme } from '@mui/material';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPigment(nextConfig, {
  theme: extendTheme({
    typography: {
      fontFamily: 'var(--font-family)',
    },
  }),
  transformLibraries: ['@mui/material'],
});
