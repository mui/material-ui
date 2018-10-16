import * as React from 'react';

export interface RootRefProps<T = any> {
  rootRef?: ((instance: T | null) => void) | React.RefObject<T>;
}

declare const RootRef: React.ComponentType<RootRefProps>;

export default RootRef;
