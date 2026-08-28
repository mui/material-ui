import { Theme } from '../styles/createTheme';

type ThemeComponents = NonNullable<Theme['components']>;

/**
 * Attach a `styleOverrides` object to a component slot, preserving existing
 * overrides (array-wrapped). **Mutates `components` in place** — pass a
 * `components` object the caller owns.
 */
function addRootOverride(
  components: ThemeComponents,
  name: string,
  overrides: Record<string, unknown>,
  slot: string = 'root',
): void {
  const component = (components as any)[name];
  (components as any)[name] = {
    ...component,
    styleOverrides: {
      ...component?.styleOverrides,
      [slot]: [component?.styleOverrides?.[slot], overrides],
    },
  };
}

export default addRootOverride;
