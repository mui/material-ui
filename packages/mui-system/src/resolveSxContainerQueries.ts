import { SxProps } from './styleFunctionSx';
import {Theme} from "@mui/material/styles";
import { Breakpoint } from './createBreakpoints/createBreakpoints'

type CssObject = Record<string, any>;

function isBreakpointKey(theme: Theme, key: string): key is Breakpoint {
  return theme.breakpoints.keys.includes(key as Breakpoint);
}

function resolveSxContainerQueries(
  sx: SxProps<Theme> | undefined,
  theme: Theme,
): CssObject {
  if (!sx) return {};

  const sxObject = typeof sx === 'function' ? sx(theme) : sx;

  if (typeof sxObject !== 'object' || Array.isArray(sxObject)) {
    return sxObject as CssObject;
  }

  const containerQueries: CssObject = {};
  const regularStyles: CssObject = {};

  Object.entries(sxObject).forEach(([key, value]) => {
    if (isBreakpointKey(theme, key)) {

      const containerQuery = theme.containerQueries?.up?.(key);

      if (containerQuery) {
        containerQueries[containerQuery] = resolveSxContainerQueries(
          value as SxProps<Theme>,
          theme,
        );
      } else {
        console.warn(
          `MUI: containerQueries.up("${key}") not available on the theme.`,
        );
      }
    } else {
      regularStyles[key] = value;
    }
  });

  return {
    ...regularStyles,
    ...containerQueries,
  };
}

export default resolveSxContainerQueries;
