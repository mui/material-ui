import * as React from 'react';

export interface RootRefProps {
  rootRef?: React.RefObject<{}>;
}

declare const RootRef: React.ComponentType<RootRefProps>;

export default RootRef;
