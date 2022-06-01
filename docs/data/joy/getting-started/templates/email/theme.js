import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          appBody: 'var(--joy-palette-neutral-50)',
          componentBg: 'var(--joy-palette-common-white)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          appBody: 'var(--joy-palette-common-black)',
          componentBg: 'var(--joy-palette-background-level1)',
        },
      },
    },
  },
  fontFamily: {
    // display: "'Roboto Flex', var(--joy-fontFamily-fallback)",
    // body: "'Roboto Flex', var(--joy-fontFamily-fallback)",
  },
});
