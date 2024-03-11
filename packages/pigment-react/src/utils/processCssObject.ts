import { css, cache } from './emotion';
import type { PluginCustomOptions } from './cssFnValueToVariable';

export function processCssObject(
  cssObj: object,
  themeArgs?: PluginCustomOptions['themeArgs'],
  skipSx = true,
) {
  const processedObj = skipSx ? cssObj : themeArgs?.theme?.unstable_sx(cssObj);
  const className = css(processedObj as any);
  return cache.registered[className];
}
