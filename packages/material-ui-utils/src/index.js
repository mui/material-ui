export { default as chainPropTypes } from './chainPropTypes';
export { default as deepmerge } from './deepmerge';
export { default as elementAcceptingRef } from './elementAcceptingRef';
export { default as elementTypeAcceptingRef } from './elementTypeAcceptingRef';
export { default as exactProp } from './exactProp';
export { default as getDisplayName } from './getDisplayName';
export { default as HTMLElementType } from './HTMLElementType';
export { default as ponyfillGlobal } from './ponyfillGlobal';
export { default as refType } from './refType';

export function formatMuiErrorMessage(code, ...args) {
  let url = `https://material-ui.com/error-decoder/${code}/?`;
  args.forEach((arg) => {
    url += `args[]=${encodeURIComponent(arg)}&`;
  });
  return (
    `Minified Material-UI error #${code}; visit ${url} for the full message or ` +
    'use the non-minified dev environment for full errors and additional ' +
    'helpful warnings.'
  );
}
