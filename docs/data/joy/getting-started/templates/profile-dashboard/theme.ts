import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-neutral-50)',
        },
      },
    },
  },
  fontFamily: {
    display: "'Inter', var(--joy-fontFamily-fallback)",
    body: "'Inter', var(--joy-fontFamily-fallback)",
  },
});
