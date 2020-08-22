import * as React from 'react';

const useEnhancedEffect =
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'test'
    ? React.useLayoutEffect
    : React.useEffect;

export default useEnhancedEffect;
