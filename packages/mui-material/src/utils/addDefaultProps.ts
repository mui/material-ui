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
  (components as any)[name] = {
    ...component,
    defaultProps: { ...defaults, ...component?.defaultProps },
  };
}

export default addDefaultProps;
