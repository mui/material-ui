import { JoyTheme, SxProps } from './defaultTheme';

/**
 * internal utility
 */
// eslint-disable-next-line import/prefer-default-export
export const resolveSxValue = (
  { theme, ownerState }: { theme: JoyTheme; ownerState: { sx?: SxProps } },
  key: string,
) => {
  if (!ownerState.sx) {
    return undefined;
  }
  let sxObject: Record<string, any> = {};
  function resolveSx(sxProp: SxProps) {
    if (typeof sxProp === 'function') {
      const result = sxProp(theme);
      resolveSx(result);
    } else if (Array.isArray(sxProp)) {
      sxProp.forEach((sxItem) => {
        if (typeof sxItem !== 'boolean') {
          resolveSx(sxItem);
        }
      });
    } else if (typeof sxProp === 'object') {
      sxObject = { ...sxObject, ...sxProp };
    }
  }
  resolveSx(ownerState.sx);
  const value = sxObject[key];
  if (typeof value !== 'string' && typeof value !== 'number') {
    // does not support responsive value
    return undefined;
  }
  if (key === 'borderRadius') {
    if (typeof value === 'number') {
      return `${value}px`;
    }
    const parsedValue = theme.vars.radius[value as keyof typeof theme.vars.radius];
    return parsedValue || value;
  }
  return undefined;
};
