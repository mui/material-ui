import * as React from 'react';

/**
 * This function just calls to React's forwardRef and casts the result type to a one that allows generic components
 * to work properly. The original forwardRef's return type definition loses generic type information.
 */
export default function forwardRef<T, P>(
  render: (props: P, ref: React.ForwardedRef<T>) => React.ReactElement | null,
) {
  return React.forwardRef(render) as (
    props: React.PropsWithoutRef<P> & React.RefAttributes<T>,
  ) => React.ReactElement | null;
}
