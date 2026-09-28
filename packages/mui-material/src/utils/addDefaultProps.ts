import deepmerge from '@mui/utils/deepmerge';
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
  // Same merge as `createTheme` itself, so a user `slotProps.<slot>` keeps the
  // density keys it does not name instead of replacing the slot wholesale.
  (components as any)[name] = {
    ...component,
    defaultProps: deepmerge(defaults, component?.defaultProps ?? {}),
  };
}

export default addDefaultProps;
