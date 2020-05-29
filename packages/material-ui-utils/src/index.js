export { default as chainPropTypes } from './chainPropTypes';
export { default as deepmerge } from './deepmerge';
export { default as elementAcceptingRef } from './elementAcceptingRef';
export { default as elementTypeAcceptingRef } from './elementTypeAcceptingRef';
export { default as exactProp } from './exactProp';
export { default as getDisplayName } from './getDisplayName';
export { default as HTMLElementType } from './HTMLElementType';
export { default as ponyfillGlobal } from './ponyfillGlobal';
export { default as refType } from './refType';

/**
 * WARNING: Don't import this directly.
 * Use `MuiError` from `@material-ui/utils/macros/MuiError.macro` instead.
 * @param {number} code
 */
export function formatMuiErrorMessage(code) {
  let url = `https://material-ui.com/error-decoder/${code}/?`;
  for (let i = 1; i < arguments.length; i += 1) {
    // rest params over-transpile for this case
    // eslint-disable-next-line prefer-rest-params
    url += `args[]=${encodeURIComponent(arguments[i])}&`;
  }
  return `Minified Material-UI error #${code}; visit ${url} for the full message.`;
}
