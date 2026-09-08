import { Theme } from '../styles/createTheme';

type ThemeComponents = NonNullable<Theme['components']>;

/** Marks a layer array this helper built, and whether a user-authored override
 * rides at its tail. Symbols so the style engine's element iteration never
 * sees them. */
const DENSITY_LAYERS = Symbol('mui.densityLayers');
const USER_TAIL = Symbol('mui.userTail');

/**
 * Attach a `styleOverrides` object to a component slot, preserving existing
 * overrides (array-wrapped). **Mutates `components` in place** — pass a
 * `components` object the caller owns.
 *
 * Layer order is meaningful: emissions stack in call order so a later block
 * can re-assert an earlier one, but an override the USER authored on the
 * incoming theme always stays the last (winning) layer — enhancement provides
 * defaults, it does not beat explicit customization.
 */
function addRootOverride(
  components: ThemeComponents,
  name: string,
  overrides: Record<string, unknown>,
  slot: string = 'root',
): void {
  const component = (components as any)[name];
  const existing = component?.styleOverrides?.[slot];
  let layers: any[];
  if (Array.isArray(existing) && (existing as any)[DENSITY_LAYERS]) {
    const userTail = (existing as any)[USER_TAIL] === true;
    layers = existing.slice();
    layers.splice(layers.length - (userTail ? 1 : 0), 0, overrides);
    (layers as any)[USER_TAIL] = userTail;
  } else {
    layers = existing === undefined ? [overrides] : [overrides, existing];
    (layers as any)[USER_TAIL] = existing !== undefined;
  }
  (layers as any)[DENSITY_LAYERS] = true;
  (components as any)[name] = {
    ...component,
    styleOverrides: {
      ...component?.styleOverrides,
      [slot]: layers,
    },
  };
}

export default addRootOverride;
