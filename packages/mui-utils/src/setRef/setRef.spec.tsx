import * as React from 'react';
import setRef from './setRef';

function MyRef() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleRef = React.useCallback((node: HTMLDivElement) => {
    setRef(ref, node);
  }, []);

  return <div ref={handleRef} />;
}
