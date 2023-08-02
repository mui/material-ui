import type { CSSObject } from '@emotion/css';
import { css, cache } from '@emotion/css';
// @TODO - Ideally, this should be replicated here instead of importing.
import styleFunctionSx from '@mui/system/styleFunctionSx';
import type { CustomOptions } from '../styled';

export default function processCssObject(cssObj: object, themeArgs?: CustomOptions['themeArgs']) {
  const { theme } = themeArgs ?? {};
  const processedObj = (
    theme
      ? styleFunctionSx({
          // Does not support shorthand as of now because
          // it also adds the spacing multiplier
          sx: cssObj,
          ...themeArgs,
        })
      : cssObj
  ) as CSSObject;
  const className = css(processedObj);
  return cache.registered[className];
}
