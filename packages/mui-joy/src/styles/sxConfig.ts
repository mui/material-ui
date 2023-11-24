import { SxConfig, unstable_defaultSxConfig } from '@mui/system';

const sxConfig: SxConfig = {
  ...unstable_defaultSxConfig,
  // The default system themeKey is shape
  borderRadius: {
    themeKey: 'radius',
  },
  // The default system themeKey is shadows
  boxShadow: {
    themeKey: 'shadow',
  },
  // The default system themeKey is typography
  fontFamily: {
    themeKey: 'fontFamily',
  },
  // The default system themeKey is typography
  fontSize: {
    themeKey: 'fontSize',
  },
  // The default system themeKey is typography
  fontWeight: {
    themeKey: 'fontWeight',
  },
  // The default system themeKey is typography
  letterSpacing: {
    themeKey: 'letterSpacing',
  },
  // The default system themeKey is typography
  lineHeight: {
    themeKey: 'lineHeight',
  },
};

export default sxConfig;
