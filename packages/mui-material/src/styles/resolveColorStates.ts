import type { ColorStates, StateGroup } from './createCssState';

type StateRecord = Record<string, StateGroup | undefined>;

interface ThemeLike {
  components?:
    Record<string, { stateVariants?: Record<string, string> | undefined } | undefined> | undefined;
  vars?: { state?: StateRecord | undefined } | undefined;
  state?: StateRecord | undefined;
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

export function authorsBorder(style: Record<string, unknown> | undefined): boolean {
  return Object.keys(style ?? {}).some(
    (key) => key.startsWith('border') && !key.includes('Radius'),
  );
}

export default function resolveColorStates(
  theme: ThemeLike,
  componentName: string,
  variant: string = 'default',
  color: string = 'default',
): ColorStates | undefined {
  return resolveStateGroup(theme, componentName, variant)?.[color as 'default'];
}
