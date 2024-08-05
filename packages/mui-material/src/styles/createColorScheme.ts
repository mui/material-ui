import type { ColorSystemOptions } from './createThemeWithVars';
import createPalette from './createPalette';
import getOverlayAlpha from './getOverlayAlpha';

const defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return undefined;
  }
  const overlay = getOverlayAlpha(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});

export function getOpacity(mode: 'light' | 'dark') {
  return {
    inputPlaceholder: mode === 'dark' ? 0.5 : 0.42,
    inputUnderline: mode === 'dark' ? 0.7 : 0.42,
    switchTrackDisabled: mode === 'dark' ? 0.2 : 0.12,
    switchTrack: mode === 'dark' ? 0.3 : 0.38,
  };
}
export function getOverlays(mode: 'light' | 'dark') {
  return mode === 'dark' ? defaultDarkOverlays : [];
}

export default function createColorScheme(options: ColorSystemOptions) {
  const { palette = {}, opacity, overlays, ...rest } = options;
  return {
    palette: createPalette(palette),
    opacity: { ...getOpacity(palette.mode || 'light'), ...opacity },
    overlays: overlays || getOverlays(palette.mode || 'light'),
    ...rest,
  } as unknown as ColorSystemOptions;
}
