/* eslint-disable @typescript-eslint/no-unused-vars */
import React = require('react');

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}
