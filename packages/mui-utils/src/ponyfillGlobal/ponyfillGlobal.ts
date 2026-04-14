/* eslint-disable */
/**
 * https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
 * @deprecated Use `globalThis` instead.
 */
export default typeof window != 'undefined' && window.Math == Math
  ? window
  : typeof self != 'undefined' && self.Math == Math
    ? self
    : Function('return this')();
