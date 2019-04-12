import * as React from 'react';

/**
 * passes {value} to {ref}
 *
 * useful if you want to expose the ref of an inner component to the public api
 * while still using it inside the component
 *
 * @param ref a ref callback or ref object if anything falsy this is a no-op
 */
export default function setRef<T>(
  ref: React.RefObject<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null,
): void;
