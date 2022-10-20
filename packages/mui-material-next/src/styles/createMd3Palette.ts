import { deepmerge } from '@mui/utils';
import { MD3PaletteWithTokens } from './Theme.types';
import globalPalette from './palette';

const createMd3Palette = (palette: MD3PaletteWithTokens, mode = 'light'): MD3PaletteWithTokens => {
  const resolvedGlobalPalette = deepmerge(globalPalette, palette) as MD3PaletteWithTokens;

  return {
    ...resolvedGlobalPalette,
    colors: {
      ...(mode === 'light'
        ? {
            surfaceTint: resolvedGlobalPalette.primary['40'],
            onErrorContainer: resolvedGlobalPalette.error['10'],
            onError: resolvedGlobalPalette.error['100'],
            errorContainer: resolvedGlobalPalette.error['90'],
            onTertiaryContainer: resolvedGlobalPalette.tertiary['10'],
            onTertiary: resolvedGlobalPalette.tertiary['100'],
            tertiaryContainer: resolvedGlobalPalette.tertiary['90'],
            tertiary: resolvedGlobalPalette.tertiary['40'],
            shadow: resolvedGlobalPalette.common.black,
            error: resolvedGlobalPalette.error['40'],
            outline: resolvedGlobalPalette.neutralVariant['50'],
            onBackground: resolvedGlobalPalette.neutral['10'],
            background: resolvedGlobalPalette.neutral['99'],
            inverseOnSurface: resolvedGlobalPalette.neutral['95'],
            inverseSurface: resolvedGlobalPalette.neutral['20'],
            onSurfaceVariant: resolvedGlobalPalette.neutralVariant['30'],
            onSurface: resolvedGlobalPalette.neutral['10'],
            surfaceVariant: resolvedGlobalPalette.neutralVariant['90'],
            surface: resolvedGlobalPalette.neutral['99'],
            onSecondaryContainer: resolvedGlobalPalette.secondary['10'],
            onSecondary: resolvedGlobalPalette.secondary['100'],
            secondaryContainer: resolvedGlobalPalette.secondary['90'],
            secondary: resolvedGlobalPalette.secondary['40'],
            inversePrimary: resolvedGlobalPalette.primary['80'],
            onPrimaryContainer: resolvedGlobalPalette.primary['10'],
            onPrimary: resolvedGlobalPalette.primary['100'],
            primaryContainer: resolvedGlobalPalette.primary['90'],
            primary: resolvedGlobalPalette.primary['40'],
          }
        : {
            surfaceTint: resolvedGlobalPalette.primary['40'],
            onErrorContainer: resolvedGlobalPalette.error['80'],
            onError: resolvedGlobalPalette.error['20'],
            errorContainer: resolvedGlobalPalette.error['30'],
            onTertiaryContainer: resolvedGlobalPalette.tertiary['90'],
            onTertiary: resolvedGlobalPalette.tertiary['20'],
            tertiaryContainer: resolvedGlobalPalette.tertiary['30'],
            tertiary: resolvedGlobalPalette.tertiary['80'],
            shadow: resolvedGlobalPalette.common.black,
            error: resolvedGlobalPalette.error['80'],
            outline: resolvedGlobalPalette.neutralVariant['60'],
            onBackground: resolvedGlobalPalette.neutral['90'],
            background: resolvedGlobalPalette.neutral['10'],
            inverseOnSurface: resolvedGlobalPalette.neutral['20'],
            inverseSurface: resolvedGlobalPalette.neutral['90'],
            onSurfaceVariant: resolvedGlobalPalette.neutralVariant['80'],
            onSurface: resolvedGlobalPalette.neutral['90'],
            surfaceVariant: resolvedGlobalPalette.neutralVariant['30'],
            surface: resolvedGlobalPalette.neutral['10'],
            onSecondaryContainer: resolvedGlobalPalette.secondary['90'],
            onSecondary: resolvedGlobalPalette.secondary['20'],
            secondaryContainer: resolvedGlobalPalette.secondary['30'],
            secondary: resolvedGlobalPalette.secondary['80'],
            inversePrimary: resolvedGlobalPalette.primary['40'],
            onPrimaryContainer: resolvedGlobalPalette.primary['90'],
            onPrimary: resolvedGlobalPalette.primary['20'],
            primaryContainer: resolvedGlobalPalette.primary['30'],
            primary: resolvedGlobalPalette.primary['80'],
          }),
      ...resolvedGlobalPalette?.colors,
    },
  };
};

export default createMd3Palette;
