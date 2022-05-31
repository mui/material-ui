import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface PaletteBackground {
    bodyEmail: string;
    componentBg: string;
  }
}

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          bodyEmail: 'var(--joy-palette-neutral-50)',
          componentBg: 'var(--joy-palette-common-white)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          bodyEmail: 'var(--joy-palette-common-black)',
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
