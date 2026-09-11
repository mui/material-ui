import { Theme } from '../styles/createTheme';

type ThemeComponents = NonNullable<Theme['components']>;

/**
 * Attach theme `defaultProps`, the consuming theme's own defaults winning — for
 * values CSS cannot reach (those that feed component JS). **Mutates
 * `components` in place** — same contract as `addRootOverride`.
 */
function addDefaultProps(
  components: ThemeComponents,
  name: string,
  defaults: Record<string, unknown>,
): void {
  const component = (components as any)[name];
  const userDefaults = component?.defaultProps;
  // `slotProps` merges one level deep — a shallow spread would let any user
  // slotProps default silently drop every density slot default alongside it.
  const slotProps =
    defaults.slotProps || userDefaults?.slotProps
      ? {
          slotProps: {
            ...(defaults.slotProps as Record<string, unknown>),
            ...userDefaults?.slotProps,
          },
        }
      : null;
  (components as any)[name] = {
    ...component,
    defaultProps: { ...defaults, ...userDefaults, ...slotProps },
  };
}

export default addDefaultProps;
