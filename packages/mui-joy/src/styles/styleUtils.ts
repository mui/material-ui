import { Theme, SxProps } from './types';

/**
 * internal utility
 */
// eslint-disable-next-line import/prefer-default-export
export const resolveSxValue = <K extends string>(
  { theme, ownerState }: { theme: Theme; ownerState: { sx?: SxProps } },
  keys: K[],
): Record<K, undefined | number | string> => {
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
    keys.forEach((key) => {
      const value = sxObject[key];
      if (typeof value === 'string' || typeof value === 'number') {
        if (key === 'borderRadius') {
          if (typeof value === 'number') {
            sxObject[key] = `${value}px`;
          } else {
            sxObject[key] = theme.vars?.radius[value as keyof typeof theme.vars.radius] || value;
          }
        } else if (
          ['p', 'padding', 'm', 'margin'].indexOf(key) !== -1 &&
          typeof value === 'number'
        ) {
          sxObject[key] = theme.spacing(value);
        } else {
          sxObject[key] = value;
        }
      } else if (typeof value === 'function') {
        sxObject[key] = value(theme);
      } else {
        sxObject[key] = undefined;
      }
    });
  }
  return sxObject;
};
