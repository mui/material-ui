import { MD3Palettes } from './Theme.types';
// convert all these values to CSS vars
const createDarkColorScheme = (
  getCssVar: (cssVar: string, defaultVal: string) => string,
  palette: MD3Palettes,
) => ({
  surfaceTint: getCssVar('ref-palette-primary-40', palette.primary[40]),
  onErrorContainer: getCssVar('ref-palette-error-80', palette.error[80]),
  onError: getCssVar('ref-palette-error-20', palette.error[20]),
  errorContainer: getCssVar('ref-palette-error-30', palette.error[30]),
  onTertiaryContainer: getCssVar('ref-palette-tertiary-90', palette.tertiary[90]),
  onTertiary: getCssVar('ref-palette-tertiary-20', palette.tertiary[20]),
  tertiaryContainer: getCssVar('ref-palette-tertiary-30', palette.tertiary[30]),
  tertiary: getCssVar('ref-palette-tertiary-80', palette.tertiary[80]),
  shadow: getCssVar('ref-palette-common-black', palette.common.black),
  error: getCssVar('ref-palette-error-80', palette.error[80]),
  outline: getCssVar('ref-palette-neutralVariant-60', palette.neutralVariant[60]),
  onBackground: getCssVar('ref-palette-neutral-90', palette.neutral[90]),
  background: getCssVar('ref-palette-neutral-10', palette.neutral[10]),
  inverseOnSurface: getCssVar('ref-palette-neutral-20', palette.neutral[20]),
  inverseSurface: getCssVar('ref-palette-neutral-90', palette.neutral[90]),
  onSurfaceVariant: getCssVar('ref-palette-neutralVariant-80', palette.neutralVariant[80]),
  onSurface: getCssVar('ref-palette-neutral-90', palette.neutral[90]),
  surfaceVariant: getCssVar('ref-palette-neutralVariant-30', palette.neutralVariant[30]),
  surface: getCssVar('ref-palette-neutral-10', palette.neutral[10]),
  onSecondaryContainer: getCssVar('ref-palette-secondary-90', palette.secondary[90]),
  onSecondary: getCssVar('ref-palette-secondary-20', palette.secondary[20]),
  secondaryContainer: getCssVar('ref-palette-secondary-30', palette.secondary[30]),
  secondary: getCssVar('ref-palette-secondary-80', palette.secondary[80]),
  inversePrimary: getCssVar('ref-palette-primary-40', palette.primary[40]),
  onPrimaryContainer: getCssVar('ref-palette-primary-90', palette.primary[90]),
  onPrimary: getCssVar('ref-palette-primary-20', palette.primary[20]),
  primaryContainer: getCssVar('ref-palette-primary-30', palette.primary[30]),
  primary: getCssVar('ref-palette-primary-80', palette.primary[80]),
});

export default createDarkColorScheme;
