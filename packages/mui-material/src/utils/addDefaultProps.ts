import deepmerge from '@mui/utils/deepmerge';
import { Theme } from '../styles/createTheme';
import type { ThemeComponentName } from './addRootOverride';

type ThemeComponents = NonNullable<Theme['components']>;

type DefaultPropsOf<Name extends ThemeComponentName> =
  NonNullable<ThemeComponents[Name]> extends { defaultProps?: infer Props | undefined }
    ? NonNullable<Props>
    : never;

/**
 * Attach theme `defaultProps`, the consuming theme's own defaults winning — for
 * values CSS cannot reach (those that feed component JS). **Mutates
 * `components` in place** — same contract as `addRootOverride`.
 */
function addDefaultProps<Name extends ThemeComponentName>(
  components: ThemeComponents,
  name: Name,
  defaults: DefaultPropsOf<Name>,
): void {
  const component = components[name] as Record<string, any> | undefined;
  // Same merge as `createTheme` itself, so a user `slotProps.<slot>` keeps the
  // density keys it does not name instead of replacing the slot wholesale.
  (components as Record<string, any>)[name] = {
    ...component,
    defaultProps: deepmerge(defaults, component?.defaultProps ?? {}),
  };
}

export default addDefaultProps;
