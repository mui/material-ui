import { MD3Palettes } from './Theme.types';

const createLightColorScheme = (
  getCssVar: (cssVar: string, defaultVal: string) => string,
  palette: MD3Palettes,
) => ({
  colors: {
    surfaceTint: getCssVar('palette-md3-primary-40', palette.primary[40]),
    onErrorContainer: getCssVar('palette-md3-error-10', palette.error[10]),
    onError: getCssVar('palette-md3-error-100', palette.error[100]),
    errorContainer: getCssVar('palette-md3-error-90', palette.error[90]),
    onTertiaryContainer: getCssVar('palette-md3-tertiary-10', palette.tertiary[10]),
    onTertiary: getCssVar('palette-md3-tertiary-100', palette.tertiary[100]),
    tertiaryContainer: getCssVar('palette-md3-tertiary-90', palette.tertiary[90]),
    tertiary: getCssVar('palette-md3-tertiary-40', palette.tertiary[40]),
    shadow: getCssVar('palette-md3-common-black', palette.common.black),
    error: getCssVar('palette-md3-error-40', palette.error[40]),
    outline: getCssVar('palette-md3-neutralVariant-50', palette.neutralVariant[50]),
    onBackground: getCssVar('palette-md3-neutral-10', palette.neutral[10]),
    background: getCssVar('palette-md3-neutral-99', palette.neutral[99]),
    inverseOnSurface: getCssVar('palette-md3-neutral-95', palette.neutral[95]),
    inverseSurface: getCssVar('palette-md3-neutral-20', palette.neutral[20]),
    onSurfaceVariant: getCssVar('palette-md3-neutralVariant-30', palette.neutralVariant[30]),
    onSurface: getCssVar('palette-md3-neutral-10', palette.neutral[10]),
    surfaceVariant: getCssVar('palette-md3-neutralVariant-90', palette.neutralVariant[90]),
    surface: getCssVar('palette-md3-neutral-99', palette.neutral[99]),
    onSecondaryContainer: getCssVar('palette-md3-secondary-10', palette.secondary[10]),
    onSecondary: getCssVar('palette-md3-secondary-100', palette.secondary[100]),
    secondaryContainer: getCssVar('palette-md3-secondary-90', palette.secondary[90]),
    secondary: getCssVar('palette-md3-secondary-40', palette.secondary[40]),
    inversePrimary: getCssVar('palette-md3-primary-80', palette.primary[80]),
    onPrimaryContainer: getCssVar('palette-md3-primary-10', palette.primary[10]),
    onPrimary: getCssVar('palette-md3-primary-100', palette.primary[100]),
    primaryContainer: getCssVar('palette-md3-primary-90', palette.primary[90]),
    primary: getCssVar('palette-md3-primary-40', palette.primary[40]),
  },
});

export default createLightColorScheme;
