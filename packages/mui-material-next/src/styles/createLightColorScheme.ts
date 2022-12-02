import { MD3Palettes } from './Theme.types';

const createLightColorScheme = (
  getCssVar: (cssVar: string, defaultVal: string) => string,
  palette: MD3Palettes,
) => ({
  surfaceTint: getCssVar('ref-palette-primary-40', palette.primary[40]),
  onErrorContainer: getCssVar('ref-palette-error-10', palette.error[10]),
  onError: getCssVar('ref-palette-error-100', palette.error[100]),
  errorContainer: getCssVar('ref-palette-error-90', palette.error[90]),
  onTertiaryContainer: getCssVar('ref-palette-tertiary-10', palette.tertiary[10]),
  onTertiary: getCssVar('ref-palette-tertiary-100', palette.tertiary[100]),
  tertiaryContainer: getCssVar('ref-palette-tertiary-90', palette.tertiary[90]),
  tertiary: getCssVar('ref-palette-tertiary-40', palette.tertiary[40]),
  shadow: getCssVar('ref-palette-common-black', palette.common.black),
  error: getCssVar('ref-palette-error-40', palette.error[40]),
  outline: getCssVar('ref-palette-neutralVariant-50', palette.neutralVariant[50]),
  onBackground: getCssVar('ref-palette-neutral-10', palette.neutral[10]),
  background: getCssVar('ref-palette-neutral-99', palette.neutral[99]),
  inverseOnSurface: getCssVar('ref-palette-neutral-95', palette.neutral[95]),
  inverseSurface: getCssVar('ref-palette-neutral-20', palette.neutral[20]),
  onSurfaceVariant: getCssVar('ref-palette-neutralVariant-30', palette.neutralVariant[30]),
  onSurface: getCssVar('ref-palette-neutral-10', palette.neutral[10]),
  surfaceVariant: getCssVar('ref-palette-neutralVariant-90', palette.neutralVariant[90]),
  surface: getCssVar('ref-palette-neutral-99', palette.neutral[99]),
  onSecondaryContainer: getCssVar('ref-palette-secondary-10', palette.secondary[10]),
  onSecondary: getCssVar('ref-palette-secondary-100', palette.secondary[100]),
  secondaryContainer: getCssVar('ref-palette-secondary-90', palette.secondary[90]),
  secondary: getCssVar('ref-palette-secondary-40', palette.secondary[40]),
  inversePrimary: getCssVar('ref-palette-primary-80', palette.primary[80]),
  onPrimaryContainer: getCssVar('ref-palette-primary-10', palette.primary[10]),
  onPrimary: getCssVar('ref-palette-primary-100', palette.primary[100]),
  primaryContainer: getCssVar('ref-palette-primary-90', palette.primary[90]),
  primary: getCssVar('ref-palette-primary-40', palette.primary[40]),
});

export default createLightColorScheme;
