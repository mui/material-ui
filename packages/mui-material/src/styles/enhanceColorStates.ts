import createStates, { ColorStatesConfig, StatefulTheme } from './createStates';
import applySharedStates from './sharedStateComponents';

/**
 * Define how palette colours behave under interaction.
 *
 * Apply LAST, on the final composed theme — a later `createTheme()` wrap rebuilds
 * the vars machinery and drops what this attaches:
 *
 *   const theme = enhanceColorStates(createTheme({ … }), {
 *     default: colorMix({ overlayStep: '5%' }),
 *     primary: colorMix({ step: '4.4%' }),
 *     warning: relativeColor({ lightness: 0.072, chroma: 0.014, hue: 4.15 }),
 *   });
 *
 * The config is FLAT and fully explicit: one entry per palette colour, each
 * naming the generator that produces its states. Nothing is derived for a colour
 * that is not listed, so:
 *
 *   - adoption is per colour, and zero-diff is provable per colour;
 *   - Material UI never chooses a magnitude, a ramp direction, or a CSS backend
 *     on the author's behalf;
 *   - the browser support a colour needs is readable at the call site, because
 *     `relativeColor` (Chrome 119+) is named where it is used.
 *
 * It:
 *   1. runs each generator once, producing `theme.states` — ready-to-use style
 *      objects keyed by state name (`hover`, `active`, `selected`, …);
 *   2. registers the shared component styles that consume them.
 *
 * Deliberately NOT wired into `createTheme`: the enhancer is the public seam,
 * exactly as it is for density.
 */
export default function enhanceColorStates<T extends StatefulTheme>(
  themeInput: T,
  config: ColorStatesConfig = {},
): T {
  const states = createStates(themeInput, config);
  if (!states) {
    return themeInput;
  }
  const theme = { ...themeInput, states };
  theme.components = { ...theme.components };
  applySharedStates(theme);
  return theme;
}
