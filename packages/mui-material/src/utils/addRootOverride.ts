import { Theme } from '../styles/createTheme';

type ThemeComponents = NonNullable<Theme['components']>;

/** A component the theme knows how to style, e.g. `'MuiButton'`. */
export type ThemeComponentName = Exclude<keyof ThemeComponents, 'mergeClassNameAndStyle'>;

type StyleOverridesOf<Name extends ThemeComponentName> =
  NonNullable<ThemeComponents[Name]> extends { styleOverrides?: infer Overrides | undefined }
    ? NonNullable<Overrides>
    : never;

/** The slots (class keys) a component's `styleOverrides` accepts. */
export type ThemeComponentSlot<Name extends ThemeComponentName> = Extract<
  keyof StyleOverridesOf<Name>,
  string
>;

/**
 * Attach a `styleOverrides` object to a component slot as the first layer,
 * with any override the incoming theme already had as the last (winning) one:
 * enhancement provides defaults, it does not beat explicit customization.
 * Call it once per slot — a second call would wrap the first, putting the
 * user's layer between the two emissions. **Mutates `components` in place** —
 * pass a `components` object the caller owns.
 */
function addRootOverride<
  Name extends ThemeComponentName,
  Slot extends ThemeComponentSlot<Name> = Extract<ThemeComponentSlot<Name>, 'root'>,
>(
  components: ThemeComponents,
  name: Name,
  overrides: NonNullable<StyleOverridesOf<Name>[Slot]>,
  slot: Slot = 'root' as Slot,
): void {
  const component = components[name] as Record<string, any> | undefined;
  const existing = component?.styleOverrides?.[slot];
  (components as Record<string, any>)[name] = {
    ...component,
    styleOverrides: {
      ...component?.styleOverrides,
      [slot]: existing === undefined ? [overrides] : [overrides, existing],
    },
  };
}

export default addRootOverride;
