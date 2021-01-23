import * as React from 'react';
import useEnhancedEffect from './useEnhancedEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export default function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Return {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  // tslint:disable-next-line:ban-comma-operator hide `this`
  return React.useCallback((...args: Args) => (0, ref.current!)(...args), []);
}
