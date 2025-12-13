/* eslint-disable import/prefer-default-export */

export function isJsdom() {
  return window.navigator.userAgent.includes('jsdom');
}
