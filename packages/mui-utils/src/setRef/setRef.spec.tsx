import * as React from 'react';
import setRef from './setRef';

function MyRef() {
  const ref = React.useRef<HTMLDivElement>(undefined);

  const handleRef = React.useCallback((node: HTMLDivElement) => {
    setRef(ref, node);
  }, []);

  return <div ref={handleRef} />;
}
