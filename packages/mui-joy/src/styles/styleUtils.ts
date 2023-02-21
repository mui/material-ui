import { Theme, SxProps } from './types';

/**
 * internal utility
 */
// eslint-disable-next-line import/prefer-default-export
export const resolveSxValue = (
  { theme, ownerState }: { theme: Theme; ownerState: { sx?: SxProps } },
  key: string,
  defaultValue?: string | number,
) => {
  let parsedValue;
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
  if (ownerState.sx) {
    resolveSx(ownerState.sx);
    const value = sxObject[key];
    if (typeof value === 'string' || typeof value === 'number') {
      if (key === 'borderRadius') {
        if (typeof value === 'number') {
          return `${value}px`;
        }
        parsedValue = theme.vars?.radius[value as keyof typeof theme.vars.radius] || value;
      } else {
        parsedValue = value;
      }
    }
    if (typeof value === 'function') {
      parsedValue = value(theme);
    }
  }
  return parsedValue || defaultValue;
};
