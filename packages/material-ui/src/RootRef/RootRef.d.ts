import * as React from 'react';

export interface RootRefProps {
  rootRef?: () => React.HTMLAttributes<any>;
}

declare const RootRef: React.ComponentType<RootRefProps>;

export default RootRef;
