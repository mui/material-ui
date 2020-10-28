/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import useEnhancedEffect from './useEnhancedEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * @param {function} fn
 */
export default function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  // @ts-ignore
  return React.useCallback(((...args) => (0, ref.current)(...args)) as T, []);
}
