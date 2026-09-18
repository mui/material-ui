import type { ColorStates, StateGroup, ThemeState } from './createCssState';

interface ThemeLike {
  components?:
    | Record<string, { stateVariants?: Record<string, string> | undefined } | undefined>
    | undefined;
  vars?: { state?: ThemeState | undefined } | undefined;
  state?: ThemeState | undefined;
}

export function resolveStateGroup(
  theme: ThemeLike,
  componentName: string,
  variant: string = 'default',
): StateGroup | undefined {
  const group = theme.components?.[componentName]?.stateVariants?.[variant];
  if (!group) {
    return undefined;
  }
  return (theme.vars || theme).state?.[group];
}

export default function resolveColorStates(
  theme: ThemeLike,
  componentName: string,
  variant: string = 'default',
  color: string = 'default',
): ColorStates | undefined {
  return resolveStateGroup(theme, componentName, variant)?.[color as 'default'];
}
