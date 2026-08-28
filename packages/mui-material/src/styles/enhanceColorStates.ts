import createStates, { StatesConfig, StatefulTheme } from './createStates';
import applySharedStates from './sharedStateComponents';

/**
 * Make every component's interaction colors derive from the palette.
 *
 * Apply LAST, on the final composed theme — a later `createTheme()` wrap rebuilds
 * the vars machinery and drops what this attaches:
 *
 *   const theme = enhanceColorStates(
 *     createTheme({
 *       colorSchemes: { light: { palette: { primary: { main: '#006DA2' } } } },
 *     }),
 *     { step: '4.5%' },
 *   );
 *
 * This call IS the opt-in — the whole feature, for the whole theme. It:
 *
 *   1. runs the generator once, producing `theme.states` — ready-to-use style
 *      objects keyed by state name (`hover`, `active`, `selected`, …);
 *   2. registers the shared component styles that consume them.
 *
 * A theme that never calls it is byte-identical to today, because every converted
 * component gates on `theme.states` being absent. Deliberately NOT wired into
 * `createTheme`: the enhancer is the public seam, exactly as it is for density.
 */
export default function enhanceColorStates<T extends StatefulTheme>(
  themeInput: T,
  config: StatesConfig = {},
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
