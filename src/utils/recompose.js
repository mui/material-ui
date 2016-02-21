import {shallowEqual} from 'recompose';
import reduce from 'lodash.reduce';

/**
 * Creates a function to shallow compare props
 * with an extra shallow level for the
 * specified props.
 */
export function withShallow(...shallowProps) {
  return function(props, nextProps) {
    return reduce(nextProps, (res, val, key) => {
      if (shallowProps.indexOf(key) !== -1) {
        return res || !shallowEqual(val, props[key]);
      }
      return res || val !== props[key];
    }, false);
  };
}


