import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          outlinedBg: 'var(--joy-palette-neutral-50)',
        },
      },
    },
    dark: {
      palette: {
        neutral: {
          outlinedBorder: 'var(--joy-palette-neutral-700)',
          outlinedBg: 'var(--joy-palette-neutral-800)',
        },
        background: {
          body: 'var(--joy-palette-common-black)',
          surface: 'var(--joy-palette-neutral-900)',
        },
      },
    },
  },
  fontFamily: {
    display: "'Inter', var(--joy-fontFamily-fallback)",
    body: "'Inter', var(--joy-fontFamily-fallback)",
  },
});
