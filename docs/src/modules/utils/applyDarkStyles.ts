import type { CSSObject } from '@mui/system';
import type { Theme as MaterialTheme } from '@mui/material/styles';

interface ApplyDarkStyles {
  (scheme: CSSObject): CSSObject;
}

declare module '@mui/material/styles' {
  interface Theme {
    applyDarkStyles: ApplyDarkStyles;
  }
}

/**
 * This utility exists to help transitioning to CSS variables page by page (prevent dark mode flicker).
 * It will use the proper styling method based on the theme because the component might be on the page that does not support CSS variables yet.
 *
 * 😓 Without this utility:
 * {
 *   ...theme.vars ? {
 *     color: theme.vars.palette.primary.main,
 *     [theme.getColorScheme('dark')]: {
 *       color: '#fff',
 *     }
 *   } : {
 *     color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
 *   }
 * }
 *
 * 🤩 Using the utility:
 * {
 *   color: (theme.vars || theme).palette.primary.main,
 *   ...theme.applyDarkStyles({
 *     color: '#fff',
 *   }),
 * }
 *
 * -------------------------------------------------------------------------------------------------
 * 💡 This util should be used in an array if the styles contain psuedo classes or nested selectors:
 *
 * ❌ There is a chance that the upper selectors could be overridden
 * {
 *    // the whole selector could be overridden
 *   '&::before': {
 *     color: ...
 *   },
 *   ...theme.applyDarkStyles({
 *      '&::before': {
 *        color: ...
 *      }
 *   })
 * }
 *
 * ✅ use an array (supports in both emotion and styled-components)
 * Only the `color` will be overridden in dark mode.
 *  [
 *    '&::before': {
 *      color: ...
 *    },
 *    theme.applyDarkStyles({
 *      '&::before': {
 *        color: ...
 *      }
 *    })
 *  ]
 */
const applyDarkStyles = (theme: MaterialTheme, css: Parameters<ApplyDarkStyles>[0]) => {
  if (theme.vars) {
    // CssVarsProvider is used
    const selector = theme.getColorSchemeSelector('dark').replace(/(\[[^\]]+\])/, ':where($1)');
    return {
      [selector]: css,
    };
  }
  if (theme.palette.mode === 'dark') {
    return css;
  }

  return undefined;
};

export default applyDarkStyles;
